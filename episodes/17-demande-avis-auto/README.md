# Épisode 17 · La demande d'avis qui part toute seule

**Wed 11 Nov** · Demo business: Salon Jasmin

| | |
|---|---|
| Hook A (number or question) | « Vos clientes adorent votre travail. Pourquoi si peu d'avis Google ? » |
| Hook B (story or contrarian) | « Ne demandez plus d'avis. Programmez-les. » |
| Caption CTA | « Commentez AVIS pour recevoir le message et le QR code » |
| Demo | [`index.html`](index.html), [`avis.gs`](avis.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Récupérez le lien direct vers l'avis Google de votre fiche.
2. Écrivez un merci court, avec le prénom de la cliente.
3. Le script l'envoie 2 heures après chaque rendez-vous, à toutes les clientes.
4. Ajoutez le QR code au comptoir : les avis arrivent sans que vous y pensiez.

## Proof shot to record

Tap « Avancer d'une heure » three times: each appointment switches to « Avis demandé ✓ » 2 hours after it started and the message lands in the phone. End on the counter QR code.

## Make it real

Add [`avis.gs`](avis.gs) to the **same** Apps Script project as episode 4, set `PLACE_ID` (find it with Google's Place ID finder) and your email, and run `installerAvis()` once. Every hour, clients who left an email get the thank-you 2 hours after their appointment; at 19h you get WhatsApp links for the others. Column K « Avis demandé » prevents asking twice. Everyone gets the same message: Google's policies forbid asking only satisfied customers for reviews (« review gating »), so don't filter by satisfaction.

## Caption (draft)

```text
Vos clientes adorent votre travail. Pourquoi si peu d'avis Google ? ⭐

2 heures après chaque rendez-vous, un merci part tout seul avec le lien direct vers votre fiche. Et un QR code au comptoir pour les autres.

Le même message pour toutes : c'est la règle de Google.
👉 Commentez AVIS pour recevoir le message et le QR code.

#avisgoogle #automatisation #petitscommerces #entrepreneur #astucebusiness #digitalisation
```
