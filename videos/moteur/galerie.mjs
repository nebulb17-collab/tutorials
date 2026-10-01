/**
 * Galerie des vidéos rendues : node galerie.mjs → ../out/index.html
 * Une page à ouvrir dans le navigateur pour regarder toutes les vidéos, comparer les accroches A et B
 * des épisodes de la saison 2, et ouvrir chaque fichier pour l'enregistrer.
 */
import { existsSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { episodes } from "../storyboards/episodes.mjs";
import { semaines } from "../storyboards/semaines.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "out");

const TITRES = ["Bouton « Commander sur WhatsApp »", "Formulaire de commande boutique", "QR code WhatsApp", "Réservations → Google Sheets",
  "Rappel la veille", "Créneaux en ligne", "Devis + alerte instantanée", "Relance après 2 jours", "Tableau des sources", "Chatbot IA",
  "Réponses aux avis par IA", "Site de salon complet", "Devis personnalisé en 60 secondes", "Tri des demandes : chaud, tiède, froid",
  "Une photo, une semaine de posts", "Les clientes perdues", "Demande d'avis automatique", "Facture automatique", "Liste d'attente Black Friday",
  "Catalogue depuis Google Sheets", "Prospects entreprises de fin d'année", "Agent IA de commande", "Rapport du lundi", "Diagnostic : vos 5 automatisations"];
// Jours de publication : lundi, mercredi, vendredi (plans d'octobre et de novembre), récaps le samedi.
const DATES = ["Mon 5 Oct", "Wed 7 Oct", "Fri 9 Oct", "Mon 12 Oct", "Wed 14 Oct", "Fri 16 Oct", "Mon 19 Oct", "Wed 21 Oct", "Fri 23 Oct",
  "Mon 26 Oct", "Wed 28 Oct", "Fri 30 Oct", "Mon 2 Nov", "Wed 4 Nov", "Fri 6 Nov", "Mon 9 Nov", "Wed 11 Nov", "Fri 13 Nov",
  "Mon 16 Nov", "Wed 18 Nov", "Fri 20 Nov", "Mon 23 Nov", "Wed 25 Nov", "Fri 27 Nov"];
const SAMEDIS = ["Sat 10 Oct", "Sat 17 Oct", "Sat 24 Oct", "Sat 31 Oct", "Sat 7 Nov", "Sat 14 Nov", "Sat 21 Nov", "Sat 28 Nov"];
const THEMES = ["Commandes WhatsApp", "Réservations", "Prospects et relances", "IA et site complet", "L'IA au travail",
  "L'argent qui dort dans votre fichier clients", "Black Friday et fin d'année", "Votre employé IA"];

const plain = (s) => s.replace(/\*/g, "");
function fichier(nom) {
  const f = join(OUT, `${nom}.mp4`);
  if (!existsSync(f)) return null;
  let duree;
  try {
    duree = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim());
  } catch {
    return null; // fichier en cours de rendu
  }
  return { src: `${nom}.mp4`, poster: `couvertures/${nom}.jpg`, duree: Math.round(duree * 10) / 10 };
}

const items = [
  ...episodes.map((e) => ({
    groupe: e.num <= 12 ? "s1" : "s2", badge: `EP ${String(e.num).padStart(2, "0")}`, titre: TITRES[e.num - 1], date: DATES[e.num - 1],
    mot: e.cta.type === "keyword" ? e.cta.mot : { save: "📌 Save", share: "📤 Share", bio: "🔗 Link in bio" }[e.cta.type],
    variantes: [
      { label: "Hook A", accroche: plain(e.accroche), ...fichier(e.nom) },
      ...(e.accrocheB ? [{ label: "Hook B", accroche: plain(e.accrocheB), ...fichier(`${e.nom}-accroche-B`) }] : []),
    ],
  })),
  ...semaines.map((s, i) => ({
    groupe: "recap", badge: `WEEK ${s.num}`, titre: `Quelle semaine 🤯 · ${THEMES[i]}`, date: SAMEDIS[i], mot: "📌 Save",
    variantes: [{ label: "Recap", accroche: s.items.map((it) => it.titre).join(" · "), ...fichier(s.nom) }],
  })),
  { groupe: "cards", badge: "INTRO", titre: "Carte d'intro « Automatise ça »", date: "Every video", mot: "1.4 s", variantes: [{ label: "Intro", accroche: "To open your own screen recordings in CapCut.", ...fichier("carte-intro") }] },
  { groupe: "cards", badge: "END", titre: "Carte de fin · lien en bio", date: "Every video", mot: "ClickVente", variantes: [{ label: "End", accroche: "Je construis ces automatisations pour votre commerce · Lien en bio · ClickVente", ...fichier("carte-fin") }] },
].map((it) => ({ ...it, variantes: it.variantes.filter((v) => v.src) })).filter((it) => it.variantes.length);

const total = items.reduce((n, it) => n + it.variantes.length, 0);
const html = `<meta charset="utf-8">
<title>Vidéos Automatise ça</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* Layout: an editor's media bin. A slim header, one filter row, then a wrapping grid of 9:16 clips with timecode-style metadata. */
  :root {
    color-scheme: dark;
    --bg: #15110E; --panel: #1F1915; --line: #3A2F28; --fg: #F2E9E1; --muted: #A99A8E; --accent: #E58C68; --on-accent: #1B120D; --chip: #2A221D;
    --display: "Fraunces", Georgia, serif; --body: "Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif; --mono: "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;
  }
  @media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) {
    --bg: #F6F1EC; --panel: #FFFFFF; --line: #E4D8CD; --fg: #231B16; --muted: #6F6157; --accent: #B05A39; --on-accent: #FFFFFF; --chip: #F0E6DD; color-scheme: light; } }
  :root[data-theme="light"] { --bg: #F6F1EC; --panel: #FFFFFF; --line: #E4D8CD; --fg: #231B16; --muted: #6F6157; --accent: #B05A39; --on-accent: #FFFFFF; --chip: #F0E6DD; color-scheme: light; }
  * { box-sizing: border-box; }
  [hidden] { display: none !important; }
  body { margin: 0; background: var(--bg); color: var(--fg); font: 15px/1.5 var(--body); padding: 28px 20px 56px; }
  .wrap { max-width: 1240px; margin: 0 auto; display: grid; gap: 22px; }
  header { display: grid; gap: 8px; }
  .eyebrow, .meta, .file, .badge, .time, .date { font-family: var(--mono); letter-spacing: .04em; }
  .eyebrow { font-size: 12px; color: var(--accent); text-transform: uppercase; letter-spacing: .14em; }
  h1 { font: 600 clamp(30px, 5vw, 46px)/1.05 var(--display); margin: 0; text-wrap: balance; }
  .lede { margin: 0; color: var(--muted); max-width: 68ch; }
  .meta { font-size: 12px; color: var(--muted); }
  .filters { display: flex; flex-wrap: wrap; gap: 8px; }
  .filters button { font: 500 14px var(--body); color: var(--fg); background: var(--chip); border: 1px solid var(--line); border-radius: 999px; padding: 7px 14px; cursor: pointer; }
  .filters button span { color: var(--muted); font-family: var(--mono); font-size: 12px; margin-left: 6px; }
  .filters button[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
  .filters button[aria-pressed="true"] span { color: var(--on-accent); }
  button:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(150px, 100%), 1fr)); gap: 16px; }
  @media (min-width: 700px) { .grid { grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 18px; } }
  .clip { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; display: grid; grid-template-rows: auto 1fr; min-width: 0; }
  .screen { position: relative; aspect-ratio: 9 / 16; max-width: 100%; background: #000; }
  .screen video { width: 100%; height: 100%; display: block; object-fit: cover; }
  .badge, .time { position: absolute; top: 8px; font-size: 11px; background: #000000b3; color: #fff; border-radius: 6px; padding: 3px 7px; pointer-events: none; }
  .badge { left: 8px; } .time { right: 8px; font-variant-numeric: tabular-nums; }
  .info { padding: 12px 12px 14px; display: grid; gap: 8px; align-content: start; min-width: 0; }
  .row { display: flex; justify-content: space-between; align-items: center; gap: 8px; min-width: 0; }
  .date { font-size: 12px; color: var(--muted); }
  .kw { font: 600 11px var(--mono); letter-spacing: .06em; color: var(--accent); border: 1px solid var(--accent); border-radius: 999px; padding: 2px 8px; white-space: nowrap; }
  h2 { font: 600 16px/1.25 var(--body); margin: 0; text-wrap: balance; }
  .hook { margin: 0; font-size: 13px; color: var(--muted); }
  .toggle { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; width: max-content; }
  .toggle button { font: 500 12px var(--mono); background: transparent; color: var(--muted); border: 0; padding: 5px 10px; cursor: pointer; }
  .toggle button[aria-pressed="true"] { background: var(--chip); color: var(--fg); }
  .file { font-size: 11px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .open { font: 600 12px var(--body); color: var(--accent); text-decoration: none; white-space: nowrap; }
  .open:hover { text-decoration: underline; }
  .note { font-size: 13px; color: var(--muted); border-top: 1px solid var(--line); padding-top: 16px; max-width: 80ch; }
  .empty { color: var(--muted); }
</style>
<div class="wrap">
  <header>
    <div class="eyebrow">Automatise ça · Oct – Nov 2026</div>
    <h1>Vidéos Automatise ça</h1>
    <p class="lede">One motion video per episode, hook B versions for season 2, and the « Quelle semaine 🤯 » weekly recaps. Hover or tap a clip to play it; the file name is what you upload.</p>
    <div class="meta">${total} files · 1080 × 1920 · 30 fps · H.264 · no sound (add a trending audio in the app)</div>
  </header>
  <div class="filters" role="group" aria-label="Filter videos" id="filters"></div>
  <div class="grid" id="grid"></div>
  <p class="note">To save a video, use « Open ↗ », then your browser's save option (or right-click → Save video as). Covers for each Reel are in <span class="file">couvertures/</span>. Re-render or edit any video with <span class="file">videos/moteur/render.mjs</span> in the tutorials repo.</p>
</div>
<script>
  const ITEMS = ${JSON.stringify(items)};
  const GROUPES = [["all", "All"], ["s1", "Season 1"], ["s2", "Season 2"], ["recap", "Weekly recaps"], ["cards", "Cards"]];
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  let groupe = "all";
  const fmt = (s) => \`0:\${String(Math.round(s)).padStart(2, "0")}\`;

  function card(it) {
    const el = document.createElement("article");
    el.className = "clip";
    el.innerHTML = '<div class="screen"><video muted playsinline preload="none" controls></video><span class="badge"></span><span class="time"></span></div>' +
      '<div class="info"><div class="row"><span class="date"></span><span class="kw"></span></div><h2></h2><div class="toggle" role="group" aria-label="Hook version" hidden></div><p class="hook"></p><div class="row"><span class="file"></span><a class="open" target="_blank" rel="noopener">Open ↗</a></div></div>';
    const video = el.querySelector("video");
    el.querySelector(".badge").textContent = it.badge;
    el.querySelector(".date").textContent = it.date;
    el.querySelector(".kw").textContent = it.mot;
    el.querySelector("h2").textContent = it.titre;
    const toggle = el.querySelector(".toggle");
    const show = (v) => {
      video.poster = v.poster;
      video.src = v.src;
      el.querySelector(".time").textContent = fmt(v.duree);
      el.querySelector(".hook").textContent = "« " + v.accroche + " »";
      el.querySelector(".file").textContent = v.src;
      el.querySelector(".file").title = v.src;
      el.querySelector(".open").href = v.src;
    };
    if (it.variantes.length > 1) {
      toggle.hidden = false;
      it.variantes.forEach((v, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = v.label;
        b.setAttribute("aria-pressed", String(i === 0));
        b.onclick = () => { toggle.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); show(v); };
        toggle.append(b);
      });
    }
    show(it.variantes[0]);
    if (hover && !reduce) {
      el.addEventListener("mouseenter", () => { video.muted = true; video.play().catch(() => {}); });
      el.addEventListener("mouseleave", () => video.pause());
    }
    return el;
  }

  function render() {
    grid.replaceChildren(...ITEMS.filter((it) => groupe === "all" || it.groupe === groupe).map(card));
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.g === groupe)));
  }
  GROUPES.forEach(([g, label]) => {
    const n = g === "all" ? ITEMS.length : ITEMS.filter((it) => it.groupe === g).length;
    if (!n) return;
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.g = g;
    b.innerHTML = label + "<span>" + n + "</span>";
    b.onclick = () => { groupe = g; render(); };
    filters.append(b);
  });
  render();
</script>
`;
writeFileSync(join(OUT, "index.html"), html);
console.log(`Galerie : ${join(OUT, "index.html")} (${items.length} cartes, ${total} vidéos)`);
