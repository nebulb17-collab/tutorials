# Épisode 23 · Le rapport du lundi matin

**Wed 25 Nov** · Demo business: Salon Jasmin

| | |
|---|---|
| Hook A (number or question) | « Chaque lundi à 8h, ce message arrive tout seul. » |
| Hook B (story or contrarian) | « Vous ne pouvez pas améliorer ce que vous ne mesurez pas. » |
| Caption CTA | « Commentez LUNDI pour le modèle » |
| Demo | [`index.html`](index.html), [`rapport.gs`](rapport.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Vos rendez-vous et vos clientes sont déjà dans Google Sheets.
2. Le script compte la semaine : rendez-vous, chiffre, absences, nouvelles clientes.
3. Il compare avec la semaine d'avant et propose une action.
4. Chaque lundi à 8h, le résumé arrive tout seul dans votre boîte.

## Proof shot to record

Show the Monday email, then switch weeks: every number recalculates. Zoom in on the green and red arrows and on « Une action pour cette semaine ».

## Make it real

Add [`rapport.gs`](rapport.gs) to the **same** Apps Script project as episode 4, set `EMAIL_RAPPORT` and the prices in `PRIX_PRESTATIONS`, and run `installerRapport()` once. Every Monday around 8h you get last week (Monday to Sunday) compared with the week before. Mark no-shows by setting a booking's status to « Absente ». The page's numbers are computed from generated sample bookings. Reviews are not in the sheet, so the real email leaves them out.

## Caption (draft)

```text
Chaque lundi à 8h, ce message arrive tout seul. 📊

Rendez-vous, chiffre d'affaires, absences, nouvelles clientes, d'où elles viennent… comparé à la semaine d'avant, avec une action pour la semaine.

Vous ne pouvez pas améliorer ce que vous ne mesurez pas.
👉 Commentez LUNDI pour le modèle.

#automatisation #entrepreneur #googlesheets #petitscommerces #gestion #nocode
```
