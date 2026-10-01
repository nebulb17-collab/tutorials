# Épisode 7 · Un formulaire de devis avec alerte instantanée

**Mon 19 Oct** · Demo business: Rénov' Express (fictional renovation company)

| | |
|---|---|
| Hook (first 3 s) | « Un client demande un devis. Vous répondez 2 jours après. Il est déjà parti. » |
| Caption CTA | « Commentez DEVIS pour la démo » |
| Demo | [`index.html`](index.html), [`apps-script.gs`](apps-script.gs) |

## On-screen steps

1. Un formulaire de devis avec les bonnes questions : travaux, surface, budget, délai.
2. Chaque demande est enregistrée dans un tableau « Prospects ».
3. Au même moment, une alerte arrive sur votre téléphone avec tous les détails.
4. Vous rappelez en 5 minutes, pas en 2 jours : le client est encore chaud.

## Proof shot to record

Submit the quote: on the page, the alert drops onto the « téléphone du patron » with a « Répondre sur WhatsApp » button. With the real script, film your own phone receiving the Gmail notification.

## Make it real

1. New Google Sheet → **Extensions → Apps Script** → paste [`apps-script.gs`](apps-script.gs) and set `ALERTE_EMAIL`.
2. Deploy as a Web app (same settings as episode 4) and put the URL in `SCRIPT_URL`.
3. Turn on Gmail notifications on your phone: the alert arrives within seconds, with a link that opens WhatsApp to the client.

Each request becomes a row in the « Prospects » tab, with a status drop-down used by episode 8.

## Caption (draft)

```text
Un client demande un devis. Vous répondez 2 jours après. Il est déjà parti. 🏃

Avec ce formulaire, vous recevez une alerte sur votre téléphone à la seconde où la demande arrive : travaux, surface, budget, délai. Vous rappelez en 5 minutes, pendant que le client est encore motivé.

Commentez DEVIS pour la démo 👇

#automatisation #entrepreneur #nocode #digitalisation #astucebusiness #siteweb
```
