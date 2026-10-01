# Épisode 13 · Le devis personnalisé envoyé en 60 secondes

**Mon 2 Nov** · Demo business: Studio Nour (fictional wedding and event photographer)

| | |
|---|---|
| Hook A (number or question) | « Ce devis s'est écrit tout seul en 60 secondes. » |
| Hook B (story or contrarian) | « "Je vous envoie le devis ce soir." Trois jours plus tard, le couple avait signé ailleurs. » |
| Caption CTA | « Commentez PROPOSITION et je vous envoie le modèle » |
| Demo | [`index.html`](index.html) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Après l'appel, remplissez la fiche : 6 champs, une minute.
2. Les prix se calculent tout seuls à partir de vos formules.
3. L'IA écrit le texte personnalisé : vous relisez, vous corrigez.
4. PDF ou WhatsApp : la proposition part pendant que le client est encore emballé.

## Proof shot to record

Touch a field to start the chrono, fill the 6 fields, tap « Générer la proposition »: the text types itself, the price table and the deposit appear. Show « 📄 PDF » and the WhatsApp message, and end on the chrono (under a minute).

## Make it real

Prices live in `FORMULES` and `OPTIONS` at the bottom of `index.html`: replace them with the client's. Without a server, the texts come from templates. With [`outils/ia-worker`](../../outils/ia-worker/) deployed and `AI_ENDPOINT` set, Claude writes the intro, the description of the day, the 3 strong points and the next step (mode `devis`). It never writes the prices: the page calculates them. Edit the `studio-nour` entry in `src/commerces.ts`. « PDF » uses the browser's print to PDF, and « Modifier le texte » lets you correct any sentence before sending.

## Caption (draft)

```text
Ce devis s'est écrit tout seul en 60 secondes. ⏱️

Après l'appel, 6 champs : les prix se calculent, l'IA écrit le texte personnalisé, et la proposition part en PDF ou sur WhatsApp, pendant que le client est encore emballé.

L'IA écrit, vous relisez, vous décidez.
👉 Commentez PROPOSITION et je vous envoie le modèle.

#automatisation #IA #entrepreneur #photographe #nocode #digitalisation
```
