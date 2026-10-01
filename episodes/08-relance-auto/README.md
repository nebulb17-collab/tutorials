# Épisode 8 · La relance automatique après 2 jours sans réponse

**Wed 21 Oct** · Demo business: Rénov' Express

| | |
|---|---|
| Hook (first 3 s) | « 80 % des ventes se font après la relance. Vous relancez ? »  (safer: « La plupart des ventes se font après la relance. Vous relancez ? ») |
| Caption CTA | « Enregistrez pour ne plus jamais oublier une relance » |
| Demo | [`index.html`](index.html), [`relance.gs`](relance.gs) |

## On-screen steps

1. Tous vos prospects sont dans un tableau, avec un statut : Nouveau, Répondu, Relancé.
2. Quand quelqu'un vous répond, passez-le en « Répondu ».
3. Chaque matin, le script repère ceux qui sont « Nouveau » depuis 2 jours.
4. Il leur envoie une relance polie, une seule fois, et note la date.

## Proof shot to record

Tap « Jour suivant » twice: Samia is followed up on day 1, Karim on day 2, and Mehdi, who replied, gets nothing. Edit the message template first to show it is yours.

## Make it real

Add [`relance.gs`](relance.gs) to the **same** Apps Script project as episode 7, then run `installerRelance()` once. Every morning around 10h:

- prospects still « Nouveau » after 2 days who left an email get a polite follow-up, then switch to « Relancé »;
- the ones without an email are sent to you in one email with ready-to-send WhatsApp links (one tap each). Sending WhatsApp messages automatically would need the WhatsApp Cloud API and an approved template, as in episode 5.

Set a prospect to « Répondu » as soon as they reply so they are never followed up.

## Caption (draft)

```text
La plupart des ventes se font après une relance. Mais qui a le temps de relancer tout le monde ? 🤯

Ce petit script relance poliment chaque prospect resté sans réponse depuis 2 jours. Une seule fois, jamais de harcèlement, et ceux qui ont répondu ne reçoivent rien.

📌 Enregistrez pour ne plus jamais oublier une relance.

#automatisation #entrepreneur #astucebusiness #nocode #digitalisation #petitscommerces
```
