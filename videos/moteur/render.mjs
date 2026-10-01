/**
 * Rendu des vidéos « Automatise ça » : storyboard → images (Chromium) → MP4 H.264 (ffmpeg).
 *
 *   npm install                       # une fois (polices, émojis, Playwright)
 *   npx playwright install chromium   # une fois, si Chromium n'est pas déjà installé
 *   node render.mjs                   # toutes les vidéos
 *   node render.mjs ep01 semaine-1    # seulement celles dont le nom commence par…
 *   node render.mjs --liste           # affiche les vidéos disponibles
 *
 * Sortie : ../out/<nom>.mp4 (1080 × 1920, 30 i/s, sans son) et ../out/couvertures/<nom>.jpg.
 * Il faut ffmpeg dans le PATH. CHROMIUM_PATH=/chemin/vers/chrome pour utiliser un autre Chromium.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { episodes } from "../storyboards/episodes.mjs";
import { semaines } from "../storyboards/semaines.mjs";

const ICI = dirname(fileURLToPath(import.meta.url));
const SORTIE = join(ICI, "..", "out");
const FPS = 30;
const EN_PARALLELE = Number(process.env.PARALLELE) || 3;

const toutes = [
  { nom: "carte-intro", video: { type: "intro" } },
  { nom: "carte-fin", video: { type: "fin" } },
  ...episodes.flatMap((e) => [
    { nom: e.nom, video: { type: "episode", ...e } },
    ...(e.accrocheB ? [{ nom: `${e.nom}-accroche-B`, video: { type: "episode", ...e, accroche: e.accrocheB } }] : []),
  ]),
  ...semaines.map((s) => ({ nom: s.nom, video: { type: "semaine", ...s } })),
];

const args = process.argv.slice(2);
if (args.includes("--liste")) {
  toutes.forEach((v) => console.log(v.nom));
  process.exit(0);
}
const choisies = args.length ? toutes.filter((v) => args.some((a) => v.nom.startsWith(a))) : toutes;
if (!choisies.length) {
  console.error("Aucune vidéo ne correspond. Essayez : node render.mjs --liste");
  process.exit(1);
}

mkdirSync(join(SORTIE, "couvertures"), { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const lecteur = pathToFileURL(join(ICI, "player.html")).href;

async function rendre({ nom, video }) {
  const debut = Date.now();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(e.message));
  await page.goto(lecteur);
  const duree = await page.evaluate((v) => window.prepare(v), video);
  if (erreurs.length) throw new Error(`${nom} : ${erreurs.join(" / ")}`);

  // Couverture (accroche entièrement affichée) pour choisir la miniature du Reel.
  await page.evaluate(() => window.seek(window.couverture));
  await page.screenshot({ path: join(SORTIE, "couvertures", `${nom}.jpg`), type: "jpeg", quality: 90 });

  const ffmpeg = spawn("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p",
    "-r", String(FPS), "-movflags", "+faststart",
    join(SORTIE, `${nom}.mp4`),
  ], { stdio: ["pipe", "inherit", "inherit"] });

  const images = Math.round(duree * FPS);
  for (let i = 0; i < images; i++) {
    await page.evaluate((t) => window.seek(t), i / FPS);
    const jpg = await page.screenshot({ type: "jpeg", quality: 93 });
    if (!ffmpeg.stdin.write(jpg)) await once(ffmpeg.stdin, "drain");
  }
  ffmpeg.stdin.end();
  const [code] = await once(ffmpeg, "close");
  await page.close();
  if (code !== 0) throw new Error(`${nom} : ffmpeg a échoué (code ${code})`);
  console.log(`✓ ${nom}.mp4 — ${duree.toFixed(1)} s, ${images} images, rendu en ${Math.round((Date.now() - debut) / 1000)} s`);
}

const file = [...choisies];
let echecs = 0;
await Promise.all(Array.from({ length: Math.min(EN_PARALLELE, file.length) }, async () => {
  while (file.length) {
    const v = file.shift();
    try { await rendre(v); } catch (e) { echecs++; console.error(`✗ ${e.message}`); }
  }
}));
await browser.close();
console.log(`\n${choisies.length - echecs}/${choisies.length} vidéo(s) dans ${SORTIE}`);
process.exit(echecs ? 1 : 0);
