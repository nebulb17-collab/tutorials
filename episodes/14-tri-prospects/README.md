# Épisode 14 · Le tri automatique des demandes : chaud, tiède, froid

**Wed 4 Nov** · Demo business: Rénov' Express (fictional renovation company)

| | |
|---|---|
| Hook A (number or question) | « 30 demandes de devis cette semaine. Lesquelles rappeler en premier ? » |
| Hook B (story or contrarian) | « Arrêtez de répondre aux demandes dans l'ordre d'arrivée. » |
| Caption CTA | « Commentez TRI pour recevoir la grille de points » |
| Demo | [`index.html`](index.html), [`score.gs`](score.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Listez ce qui fait un bon client pour vous : budget, délai, taille du chantier.
2. Donnez des points à chaque réponse du formulaire, pour un total sur 100.
3. Chaque nouvelle demande est notée et rangée toute seule : chaud, tiède, froid.
4. Vous rappelez les chauds d'abord. Les autres reçoivent le bon message au bon moment.

## Proof shot to record

Tap « Tout trier »: the 8 requests drop into Chaud, Tiède and Froid one by one, each with its score ring and its points. Then move « Chaud à partir de » to show the rules belong to the owner.

## Make it real

Add [`score.gs`](score.gs) to the **same** Apps Script project as episode 7 and run `installerTri()` once. Every 5 minutes, each new request gets a score out of 100 (column M), a priority (column N) and a row colour, and hot ones trigger a « 🔥 À rappeler maintenant » email. Adapt `GRILLE` and the thresholds to the trade: the answers must match the form's options exactly. The grid is deliberately a points table rather than an AI score, so every number can be explained to the client.

## Caption (draft)

```text
30 demandes de devis cette semaine. Lesquelles rappeler en premier ? 🔥

Chaque demande reçoit une note sur 100 (budget, délai, taille du chantier, coordonnées) et se range toute seule : chaud, tiède ou froid, avec la bonne action.

Vos règles, pas celles d'une IA : chaque point s'explique.
👉 Commentez TRI pour recevoir la grille de points.

#automatisation #entrepreneur #nocode #artisan #astucebusiness #digitalisation
```
