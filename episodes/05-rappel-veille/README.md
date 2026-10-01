# Épisode 5 · Le rappel automatique la veille du rendez-vous

**Wed 14 Oct** · Demo business: Salon Jasmin

| | |
|---|---|
| Hook (first 3 s) | « Les rendez-vous oubliés vous coûtent combien par mois ? » |
| Caption CTA | « Partagez à un salon qui en a besoin » |
| Demo | [`index.html`](index.html), [`rappel.gs`](rappel.gs) |

## On-screen steps

1. Partez du tableau de réservations de l'épisode 4.
2. Ajoutez le script de rappel dans Apps Script.
3. Écrivez votre message : prénom, prestation, heure, et « répondez pour décaler ».
4. Programmez-le chaque jour à 18h : il prévient tous les clients du lendemain.

## Proof shot to record

Book, then tap « ⏩ Avancer à la veille, 18h00 »: the phone clock runs to 18:00 and the reminder drops in. End on the « Combien vous coûtent les oublis ? » calculator.

## Make it real

Add [`rappel.gs`](rappel.gs) to the **same** Apps Script project as episode 4, then run `installerDeclencheur()` once. Every day around 18h it reminds everyone booked for the next day and writes the date in the « Rappel envoyé » column.

- **Email** works with no extra setup, as long as the client left an email.
- **WhatsApp** needs the WhatsApp Cloud API (Meta): put `WA_TOKEN` and `WA_PHONE_ID` in *Project settings → Script properties*, and get a message template named `rappel_rdv` approved by Meta. Business-initiated WhatsApp messages must use an approved template, so this cannot be a free-text message.
- Bookings made after 18h for the next day miss that day's run. The confirmation message covers them.

## Caption (draft)

```text
Les rendez-vous oubliés vous coûtent combien par mois ? 💸

Un rappel part tout seul la veille à 18h, avec un mot pour décaler si besoin. Vous n'y pensez plus, vos clientes non plus… sauf pour venir 😉

Partagez à un salon qui en a besoin.

#automatisation #petitscommerces #nocode #entrepreneur #astucebusiness #digitalisation
```
