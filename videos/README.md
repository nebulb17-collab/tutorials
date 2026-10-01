# Vidéos motion design « Automatise ça »

46 vertical videos (1080 × 1920, 30 fps, H.264), generated from code: a small motion-design engine renders every frame of an animated page with Chromium, then ffmpeg encodes the MP4. Same brand as the demos (terracotta `#CF7652`, Fraunces + Inter), same structure as the plan: hook, result in motion, steps, call to action.

The new formats are inspired by [@drcintas](https://www.instagram.com/drcintas/) (Dr. Alvaro Cintas, a computer-science professor who explains AI tools to beginners):

| His format | Our version |
|---|---|
| « What a crazy week in AI 🤯 … Here's EVERYTHING you need to know » | **« Quelle semaine 🤯 »**: one recap video per week (8), the list first, then one card per episode, then « Enregistrez cette vidéo » |
| « This new AI is a HUGE game-changer for 3D artists » | The sticker on every hook: « ☕ Pour les cafés et restos », « 🔨 Pour les artisans et services »… |
| Numbered breakdowns (1/, 2/, 3/) | « En 4 étapes 👇 » with numbered steps, and « 1/3, 2/3, 3/3 » in the recaps |
| « You can try it here » + free tools highlighted | « 100 % gratuit » badge on the automations that cost nothing |
| « These posts take time to create, so if you enjoyed it, a like/repost helps :) » | « Ces vidéos prennent du temps à créer : si celle-ci vous a aidé, un like ou un partage m'aide énormément 🙏 » |

> Instagram and Threads could not be opened from the build environment, so these formats come from his public posts on X and from search results (sources at the end).

## The 46 videos

| Files | What | When to post |
|---|---|---|
| `ep01-…` to `ep24-…` | One « tuto express » per episode (24–26 s): intro card, hook with audience sticker, the result animated in a phone, the steps, the keyword CTA | Mon / Wed / Fri, as in the plans |
| `ep13-…-accroche-B` to `ep24-…-accroche-B` | Season 2 only: the same video with hook B | Hook A on Instagram, hook B on TikTok; keep the winner (November plan) |
| `semaine-1-…` to `semaine-8-…` | « Quelle semaine 🤯 » recap of the week's 3 episodes (24–25 s) | Saturday or Sunday, after the 3 episodes |
| `carte-intro`, `carte-fin` | The « Automatise ça » intro card (1.4 s) and an end card (4.2 s) | To drop into CapCut around your own screen recordings |

Each video also has a cover image in `out/couvertures/` (the frame where the hook is fully on screen): pick it as the Reel cover.

The videos have **no sound on purpose**: add a trending sound in Instagram or TikTok (in-app sounds help reach), at low volume. They work as they are, or as the motion part of the CapCut assembly described in the plans (intro card, hook, your screen recording of the real demo, CTA).

### Recap captions (draft)

```text
Quelle semaine 🤯
3 automatisations à copier pour votre commerce :
1. …
2. …
3. …
Voici TOUT ce qu'il faut savoir 👇 (et le mot à commenter pour recevoir chaque démo)
📌 Enregistrez pour plus tard · Suivez « Automatise ça » : une automatisation par vidéo, 3 fois par semaine.
```

Fill the 3 lines with the week's titles (they are in `storyboards/semaines.mjs`).

## Render or change a video

You need Node 18+ and ffmpeg.

```bash
cd videos/moteur
npm install                      # fonts, Twemoji, QR code, Playwright
npx playwright install chromium  # once, if Chromium is not installed
node render.mjs --liste          # all video names
node render.mjs ep13 semaine-5   # only those (prefix match)
node render.mjs                  # all 46 (about 40 minutes on 4 cores; PARALLELE=3 by default)
```

Videos land in `videos/out/` (about 90 MB; the rendered set is committed, so you can download any MP4 straight from GitHub). Then `node galerie.mjs` writes `videos/out/index.html`, a page to watch every video, switch between hook A and hook B, and open each file. To preview the engine live, open `moteur/player.html?demo` in Chrome.

- **Text, hooks, steps, keywords:** `storyboards/episodes.mjs` and `storyboards/semaines.mjs`. Wrap words in `*stars*` to colour them.
- **What animates in the phone:** the `comp` of each episode, one of `chat`, `notif`, `sheet`, `cards`, `doc`, `stats`, `slots`, `qr`, with its data and timings (seconds from the start of the scene).
- **Look and timing:** `moteur/moteur.css` (colours, sizes, animations) and `moteur/moteur.js` (scene order and durations).

Key text stays out of the zones that Instagram and TikTok cover (top bar, caption and buttons at the bottom); the phone deliberately runs off the bottom of the frame so its text stays readable on a real screen.

## AI B-roll to cut in (optional)

@drcintas covers AI video tools constantly (Veo, Kling, Runway, Higgsfield, Midjourney video). Short AI clips make good 1–2 s cutaways between the hook and the result. Prompts in English, which these tools follow best; ask for 9:16, 5 seconds, no text, and check that nothing looks like a real brand.

| Ep. | Prompt |
|---|---|
| 1 | Close-up of a barista's hands pouring latte art into a ceramic cup on a sunlit café counter, warm terracotta tones, shallow depth of field, slow push-in, vertical 9:16, no text |
| 2 | A boutique owner folding a terracotta kaftan dress into a gift box on a wooden table, soft daylight, handheld, vertical 9:16, no text |
| 3 | Macro shot of a phone camera scanning a small card on a café table, the screen glowing, cozy evening light, vertical 9:16, no readable text |
| 4 | Hairdresser at the front desk of a bright modern salon glancing at a tablet, plants and warm light, slow dolly, vertical 9:16 |
| 5 | Smartphone on a nightstand lighting up with a notification at dusk, warm lamp light, static close-up, vertical 9:16 |
| 6 | Woman in bed at night booking on her phone, face softly lit by the screen, calm and cozy, vertical 9:16 |
| 7 | Contractor in a half-finished bathroom checking his phone and smiling, natural light, handheld, vertical 9:16 |
| 8 | Hand picking up a phone from a desk next to a coffee in the morning, sending a message, soft light, vertical 9:16 |
| 9 | Over-the-shoulder shot of a shop owner looking at colourful bar charts on a laptop, warm office light, vertical 9:16 |
| 10 | Customer in a café typing a question on her phone and smiling at the instant reply, shallow depth of field, vertical 9:16 |
| 11 | Restaurant manager reading on a tablet after closing, empty dining room with warm string lights, vertical 9:16 |
| 12 | Gimbal walk-through of an elegant beauty salon interior in terracotta and cream, morning light, vertical 9:16 |
| 13 | Wedding photographer reviewing shots on a camera screen at a golden-hour outdoor ceremony, bokeh, vertical 9:16 |
| 14 | Hands quickly sorting coloured folders into three trays on a desk, top light, energetic, vertical 9:16 |
| 15 | Overhead shot of a pistachio latte on a marble table while a phone takes a photo of it, soft daylight, vertical 9:16 |
| 16 | Salon owner sending a message on her phone, a client walking back through the door in the background, warm light, vertical 9:16 |
| 17 | Happy client leaving a salon, pausing on the doorstep to tap on her phone, golden hour, vertical 9:16 |
| 18 | Laptop next to a camera and a coffee in a creative studio, a hand clicking send, warm light, vertical 9:16 |
| 19 | Slow-motion shopping bags in a chic boutique, dark moody lighting with terracotta accents, vertical 9:16 |
| 20 | Boutique owner folding silk scarves next to an open laptop, cozy shop interior, vertical 9:16 |
| 21 | Pastry chef placing pastries into elegant gift boxes for corporate orders, festive lights, vertical 9:16 |
| 22 | Barista glancing at a tablet order and starting two cappuccinos during the morning rush, vertical 9:16 |
| 23 | Monday sunrise: a coffee cup and a phone lighting up with a notification on a café table, vertical 9:16 |
| 24 | Confident shop owner arranging five sticky notes on a wall, warm office light, vertical 9:16, no readable text |

## Credits

- Fonts: [Inter](https://rsms.me/inter/) and [Fraunces](https://github.com/undercasetype/Fraunces), SIL Open Font License, via Fontsource.
- Emoji: [Twemoji](https://github.com/jdecked/twemoji) graphics, CC-BY 4.0 (Twitter, Inc and other contributors). Mention « Émojis : Twemoji (CC-BY 4.0) » in a description or your site's credits.
- QR codes: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), MIT.

## Sources (@drcintas)

- [Dr. Alvaro Cintas on Instagram](https://www.instagram.com/drcintas/) and [on X](https://x.com/dr_cintas)
- « What a crazy week in AI 🤯 … Here's EVERYTHING you need to know » posts: [June 2025](https://x.com/dr_cintas/status/1936114712749441326), [September 2025](https://x.com/dr_cintas/status/1964727686179541096)
- « Follow me for more AI news. These type of posts take a bit of time to do… »: [post](https://x.com/dr_cintas/status/1887592511012790611)
- [Top 25 AI & Tech Influencers to Follow on Instagram (2026)](https://www.fixieit.com/top-25-ai-tech-influencers-to-follow-on-instagram-2026-level-up-your-ai-game/)
