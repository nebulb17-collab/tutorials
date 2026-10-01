# Automatise ça — Octobre et novembre 2026

A French short-video series: automations a small business can use today, posted Monday, Wednesday and Friday. Season 1 (October 2026, episodes 1–12) shows single automations; season 2 (November 2026, episodes 13–24, inspired by [@nick_saraev](https://www.instagram.com/nick_saraev/)'s formats) shows AI-assisted systems. Each video ends by pointing to you and ClickVente.

This repo holds the content plans and one working demo per episode, ready to screen-record and to run through `/brag-slim`.

- **The plans:** [`plan/PLAN-OCTOBRE-2026.md`](plan/PLAN-OCTOBRE-2026.md) covers strategy, the calendar, the production workflow, CTAs, DM replies and the weekly check. [`plan/PLAN-NOVEMBRE-2026.md`](plan/PLAN-NOVEMBRE-2026.md) adds season 2: what we take from @nick_saraev, two hooks per episode to A/B test, and the Black Friday week.
- **The motion videos:** [`videos/`](videos/), 46 vertical videos generated from code (one per episode, hook B versions for season 2, and « Quelle semaine 🤯 » weekly recaps inspired by [@drcintas](https://www.instagram.com/drcintas/)), with the engine to re-render or edit them.
- **The demos:** [`episodes/`](episodes/), one folder per episode. Each has an `index.html` (one file, mobile-first, French, brand colour `#CF7652`, with the on-screen steps at the bottom) and a `README.md` with the hook, the proof shot to record, how to make it real, and a draft caption with hashtags.

## Season 1 · October

| # | Date | Episode | Demo business | Backend to make it real |
|---|---|---|---|---|
| 1 | Mon 5 Oct | [Bouton « Commander sur WhatsApp »](episodes/01-menu-whatsapp/) | Café Lumière | none |
| 2 | Wed 7 Oct | [Formulaire de commande boutique](episodes/02-commande-boutique/) | Boutique Atlas | none |
| 3 | Fri 9 Oct | [QR code WhatsApp](episodes/03-qr-code-whatsapp/) | Café Lumière | none |
| 4 | Mon 12 Oct | [Réservations → Google Sheets](episodes/04-reservation-sheets/) | Salon Jasmin | Apps Script |
| 5 | Wed 14 Oct | [Rappel la veille](episodes/05-rappel-veille/) | Salon Jasmin | Apps Script (+ WhatsApp Cloud API, optional) |
| 6 | Fri 16 Oct | [Créneaux en ligne](episodes/06-creneaux-en-ligne/) | Salon Jasmin | Apps Script (from ep. 4), optional |
| 7 | Mon 19 Oct | [Devis + alerte instantanée](episodes/07-devis-alerte/) | Rénov' Express | Apps Script |
| 8 | Wed 21 Oct | [Relance après 2 jours](episodes/08-relance-auto/) | Rénov' Express | Apps Script |
| 9 | Fri 23 Oct | [Tableau des sources](episodes/09-tableau-prospects/) | Rénov' Express | a Google Sheets formula |
| 10 | Mon 26 Oct | [Chatbot IA](episodes/10-chatbot-ia/) | Salon Jasmin | [AI worker](outils/ia-worker/), optional |
| 11 | Wed 28 Oct | [Réponses aux avis par IA](episodes/11-reponses-avis-ia/) | Le Figuier | [AI worker](outils/ia-worker/), optional |
| 12 | Fri 30 Oct | [Site de salon complet](episodes/12-site-salon-complet/) | Salon Jasmin | all of the above, optional |

## Season 2 · November

| # | Date | Episode | Demo business | Backend to make it real |
|---|---|---|---|---|
| 13 | Mon 2 Nov | [Devis personnalisé en 60 secondes](episodes/13-devis-ia-60-secondes/) | Studio Nour | [AI worker](outils/ia-worker/), optional |
| 14 | Wed 4 Nov | [Tri des demandes : chaud, tiède, froid](episodes/14-tri-prospects/) | Rénov' Express | Apps Script (with ep. 7) |
| 15 | Fri 6 Nov | [Une photo, une semaine de posts](episodes/15-photo-semaine-posts/) | Café Lumière | [AI worker](outils/ia-worker/), optional |
| 16 | Mon 9 Nov | [Les clientes perdues](episodes/16-clients-perdus/) | Salon Jasmin | Apps Script (with ep. 4) |
| 17 | Wed 11 Nov | [Demande d'avis automatique](episodes/17-demande-avis-auto/) | Salon Jasmin | Apps Script (with ep. 4) |
| 18 | Fri 13 Nov | [Facture automatique](episodes/18-facture-auto/) | Studio Nour | Apps Script + Google Docs template |
| 19 | Mon 16 Nov | [Liste d'attente Black Friday](episodes/19-liste-attente-black-friday/) | Boutique Atlas | Apps Script |
| 20 | Wed 18 Nov | [Catalogue depuis Google Sheets](episodes/20-catalogue-google-sheets/) | Boutique Atlas | published sheet + Apps Script |
| 21 | Fri 20 Nov | [Prospects entreprises de fin d'année](episodes/21-prospects-entreprises/) | Pâtisserie Les Délices | Apps Script + Google Places API |
| 22 | Mon 23 Nov | [Agent IA de commande](episodes/22-agent-commandes-ia/) | Café Lumière | [AI worker](outils/ia-worker/), optional |
| 23 | Wed 25 Nov | [Rapport du lundi](episodes/23-rapport-du-lundi/) | Salon Jasmin | Apps Script (with ep. 4) |
| 24 | Fri 27 Nov | [Diagnostic : vos 5 automatisations](episodes/24-diagnostic-5-automatisations/) | the viewer's business | none (sends the result to your WhatsApp) |

Every demo works on its own with no setup, which is all the videos need. The backends are for when a lead says « je veux ça » and you build the real thing.

## Preview and record

```bash
python3 -m http.server 8000
# then open http://localhost:8000/episodes/01-menu-whatsapp/
```

Opening the files directly (`file://`) also works, except for calling the AI worker, which only accepts the origins listed in its `wrangler.toml`. For clean 9:16 captures, use Chrome's device toolbar at 390 × 844, or open the page on your phone.

Then follow the production workflow in the plan: record the proof shot, run `/brag-slim` in the episode folder with the tone prompt, assemble in CapCut, subtitle and schedule.

## Before you show a demo to a real client

- Replace the placeholder number `+213 000 000 000` (`WHATSAPP` in each page, `213000000000` without the `+`).
- Replace the fictional business details with theirs: « une version avec le nom de votre commerce » is the offer in the follow-up DM.
- Fill `SCRIPT_URL` (Apps Script Web app) and/or `AI_ENDPOINT` (AI worker) where the episode README says so.
- Episode 24 sends each diagnostic to `CLICKVENTE`: put your own WhatsApp number there before posting it.

## Layout

```text
plan/PLAN-OCTOBRE-2026.md   season 1 plan + weekly numbers
plan/PLAN-NOVEMBRE-2026.md  season 2 plan (inspired by @nick_saraev) + weekly numbers
episodes/NN-…/index.html    the demo page (one file)
episodes/NN-…/README.md     hook, steps, proof shot, setup, caption
episodes/NN-…/*.gs          Google Apps Script backends (episodes 4, 5, 7, 8, 14, 16–21, 23)
outils/ia-worker/           Cloudflare Worker calling the Claude API (episodes 10–13, 15, 22)
videos/storyboards/         text and animation data for the 46 motion videos
videos/moteur/              motion-design engine: render.mjs (MP4s) and galerie.mjs (preview page)
```
