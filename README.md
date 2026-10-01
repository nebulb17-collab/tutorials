# Automatise ça — Octobre 2026

A French short-video series: 12 automations a small business can use today, posted Monday, Wednesday and Friday in October 2026. Each video ends by pointing to you and ClickVente.

This repo holds the content plan and one working demo per episode, ready to screen-record and to run through `/brag-slim`.

- **The plan:** [`plan/PLAN-OCTOBRE-2026.md`](plan/PLAN-OCTOBRE-2026.md) covers strategy, the calendar, the production workflow, CTAs, DM replies and the weekly check.
- **The demos:** [`episodes/`](episodes/), one folder per episode. Each has an `index.html` (one file, mobile-first, French, brand colour `#CF7652`, with the 4 on-screen steps at the bottom) and a `README.md` with the hook, the proof shot to record, how to make it real, and a draft caption with hashtags.

## Calendar

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

## Layout

```text
plan/PLAN-OCTOBRE-2026.md   content plan + weekly numbers
episodes/NN-…/index.html    the demo page (one file)
episodes/NN-…/README.md     hook, steps, proof shot, setup, caption
episodes/NN-…/*.gs          Google Apps Script backends (episodes 4, 5, 7, 8)
outils/ia-worker/           Cloudflare Worker calling the Claude API (episodes 10–12)
```
