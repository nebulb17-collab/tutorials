# Épisode 6 · Des créneaux en ligne, sans appel ni message

**Fri 16 Oct** · Demo business: Salon Jasmin

| | |
|---|---|
| Hook (first 3 s) | « Vos clients réservent pendant que vous dormez. » |
| Caption CTA | « Vous voulez ça pour votre salon ? Écrivez RDV » |
| Demo | [`index.html`](index.html) |

## On-screen steps

1. Fixez vos horaires et la durée de chaque créneau.
2. La page lit les rendez-vous déjà pris et n'affiche que les créneaux libres.
3. Le client choisit, laisse son nom : le créneau disparaît pour les autres.
4. La confirmation part tout de suite, même à 23h, même le dimanche.

## Proof shot to record

Record at night so the « maintenant » clock shows 23h. Pick a service, a day, a free slot, confirm: the confirmation arrives at once and the slot disappears from the list.

## Make it real

Works as a demo on its own: booked slots are kept in the browser. To share real availability, set `SCRIPT_URL` to the episode 4 Web app: the page reads taken slots with `?action=creneaux` and posts each booking to the same sheet. Opening hours, closed days and services are at the top of the script in `index.html`.

The episode 4 script only refuses a booking with exactly the same date and time. Overlaps between services of different lengths are checked on the page, not on the server.

## Caption (draft)

```text
Vos clients réservent pendant que vous dormez. 🌙

Une page qui n'affiche que vos créneaux libres : la cliente choisit à 23h, la confirmation part tout de suite, et le créneau disparaît pour les autres. Ni appel, ni message.

Vous voulez ça pour votre salon ? Écrivez RDV 👇

#automatisation #siteweb #petitscommerces #entrepreneur #digitalisation #nocode
```
