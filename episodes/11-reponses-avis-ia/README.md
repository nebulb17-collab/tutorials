# Épisode 11 · L'IA qui prépare vos réponses aux avis clients

**Wed 28 Oct** · Demo business: Restaurant Le Figuier (fictional restaurant)

| | |
|---|---|
| Hook (first 3 s) | « Un avis négatif sans réponse fait fuir les clients. » |
| Caption CTA | « Enregistrez cette astuce » |
| Demo | [`index.html`](index.html) |

## On-screen steps

1. Chaque nouvel avis arrive dans une liste « à répondre ».
2. L'IA écrit un brouillon : merci, le détail précis, et une solution si l'avis est négatif.
3. Vous relisez et corrigez si besoin. Rien ne part sans votre accord.
4. Un clic pour publier : tous vos avis ont une réponse, même les mauvais.

## Proof shot to record

On Leïla's 2★ review, tap « ✨ Préparer une réponse », let the draft type itself, change one word, then « Approuver et publier ». The counters at the top update.

## Make it real

Without a server, the drafts are written from templates. With [`outils/ia-worker`](../../outils/ia-worker/) deployed and `AI_ENDPOINT` set, Claude writes each draft (it never promises refunds or compensation; that stays the owner's call). « Approuver et publier » copies the reply to the clipboard: paste it into Google Business Profile. Posting directly would need the Google Business Profile API.

## Caption (draft)

```text
Un avis négatif sans réponse fait fuir les clients. ⭐

L'IA prépare une réponse polie et précise pour chaque avis, vous relisez, vous validez. 30 secondes par avis, et plus aucun avis sans réponse.

📌 Enregistrez cette astuce.

#IA #automatisation #petitscommerces #astucebusiness #entrepreneur #digitalisation
```
