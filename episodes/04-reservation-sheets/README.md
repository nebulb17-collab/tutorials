# Épisode 4 · Un formulaire de réservation qui remplit Google Sheets tout seul

**Mon 12 Oct** · Demo business: Salon Jasmin (fictional beauty salon)

| | |
|---|---|
| Hook (first 3 s) | « Votre agenda est encore dans vos messages Instagram ? » |
| Caption CTA | « Commentez AGENDA pour recevoir le modèle » |
| Demo | [`index.html`](index.html), [`apps-script.gs`](apps-script.gs) |

## On-screen steps

1. Créez un Google Sheets « Réservations » avec une colonne par information.
2. Dans Extensions → Apps Script, collez le petit script qui ajoute une ligne.
3. Déployez-le en « Application Web » et copiez le lien.
4. Collez ce lien dans le formulaire : chaque réservation remplit le tableau toute seule.

## Proof shot to record

Best shot: split screen with the form on the phone and the real Google Sheet on the computer, and the row appearing a second after « Réserver ». Without the sheet set up, the on-page preview flashes the new row in yellow.

## Make it real

1. Create a Google Sheet, open **Extensions → Apps Script** and paste [`apps-script.gs`](apps-script.gs).
2. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*.
3. Copy the `/exec` URL into `SCRIPT_URL` in `index.html`.

The script creates the « Réservations » tab, refuses a slot that is already taken, and also serves episodes 5, 6 and 12. This is the « modèle » to send to people who comment AGENDA.

## Caption (draft)

```text
Votre agenda est encore dans vos messages Instagram ? 📅

Un simple formulaire, et chaque réservation s'ajoute toute seule dans Google Sheets : nom, téléphone, prestation, date, heure. Plus aucun rendez-vous perdu dans les DM.

Commentez AGENDA pour recevoir le modèle 👇

#automatisation #nocode #petitscommerces #entrepreneur #digitalisation #astucebusiness
```
