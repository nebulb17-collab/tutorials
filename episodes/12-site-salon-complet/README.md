# Épisode 12 · Un site de salon complet, de A à Z, avec toutes les automatisations

**Fri 30 Oct** · Demo business: Salon Jasmin

| | |
|---|---|
| Hook (first 3 s) | « Voici tout ce qu'on a construit ce mois-ci, dans un seul site. » |
| Caption CTA | « Vous voulez le même pour votre entreprise ? Lien en bio : ClickVente » |
| Demo | [`index.html`](index.html) |

## On-screen steps

1. Une page d'accueil claire : prestations, prix, avis et infos pratiques.
2. La réservation n'affiche que les créneaux libres et remplit Google Sheets.
3. La confirmation part tout de suite, puis le rappel la veille à 18h.
4. Un assistant IA et un bouton WhatsApp répondent à tout le reste.

## Proof shot to record

Scroll the whole site, choose « Couleur », book a slot, show the confirmation and reminder, then « Côté salon » where the sheet row appears and the 4 steps light up. Finish on the 💬 assistant and the WhatsApp button.

## Make it real

Everything from the month in one page: WhatsApp button (ep. 1), bookings into Google Sheets (ep. 4), reminder the day before (ep. 5), free slots only (ep. 6) and the assistant (ep. 10). Set `WHATSAPP`, `SCRIPT_URL` (episode 4 + 5 Apps Script project) and `AI_ENDPOINT` (episode 10 server) at the top of the script. With all three empty it runs as a self-contained demo, which is what the launch video needs.

## Caption (draft)

```text
Voici tout ce qu'on a construit ce mois-ci, dans un seul site. 🚀

✅ Réservation en ligne 24h/24
✅ Agenda Google Sheets qui se remplit tout seul
✅ Rappel automatique la veille
✅ Assistant IA pour les questions
✅ Bouton WhatsApp partout

Vous voulez le même pour votre entreprise ? Lien en bio : ClickVente.

#siteweb #automatisation #IA #petitscommerces #entrepreneur #whatsappbusiness #digitalisation
```
