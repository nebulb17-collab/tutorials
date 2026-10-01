# Épisode 19 · La liste d'attente Black Friday sur WhatsApp

**Mon 16 Nov** · Demo business: Boutique Atlas (fictional clothing shop)

| | |
|---|---|
| Hook A (number or question) | « Black Friday dans 11 jours. Votre liste d'attente est prête ? » |
| Hook B (story or contrarian) | « Une promo postée le jour J, c'est déjà trop tard. » |
| Caption CTA | « Commentez BLACK et je vous envoie la page » |
| Demo | [`index.html`](index.html), [`attente.gs`](attente.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Une page avec le compte à rebours et un formulaire : prénom, WhatsApp, accord.
2. Chaque inscription arrive dans Google Sheets, avec la date et l'accord.
3. Partagez le lien en story et en bio dès maintenant, pas le jour J.
4. Le jour J, un geste par inscrite : elles achètent avant tout le monde.

## Proof shot to record

Film the countdown, sign up (try once without ticking the box: the form refuses), watch the new row arrive in the sheet, then « Simuler le jour J » and tap « Envoyer » on one person.

## Make it real

Put [`attente.gs`](attente.gs) in a new Google Sheets, deploy it as a Web app and paste the URL into `SCRIPT_URL` (the page also reads the live counter). Only people who ticked the consent box are saved, phone numbers are de-duplicated, and `installerJourJ()` emails you the list with ready WhatsApp links at 7h on 27 November. Add `?source=story` or `?source=bio` to the link to see where sign-ups come from, and note « STOP » replies in the Désinscrite column. The -30 % offer in the message is an example: write the client's real offer.

## Caption (draft)

```text
Black Friday dans 11 jours. Votre liste d'attente est prête ? 🖤

Une page avec compte à rebours, un formulaire (prénom, WhatsApp, accord), et chaque inscription arrive dans Google Sheets. Le jour J, vos inscrites sont prévenues en premier.

Partagez-la dès aujourd'hui, pas le jour J.
👉 Commentez BLACK et je vous envoie la page.

#blackfriday #whatsappbusiness #commerceenligne #petitscommerces #automatisation #marketing
```
