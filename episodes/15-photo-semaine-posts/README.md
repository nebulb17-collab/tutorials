# Épisode 15 · Une photo, une semaine de posts

**Fri 6 Nov** · Demo business: Café Lumière (fictional café)

| | |
|---|---|
| Hook A (number or question) | « Une photo de votre produit. Sept jours de contenu. Deux minutes. » |
| Hook B (story or contrarian) | « Vous ne manquez pas d'idées. Vous manquez de temps pour les écrire. » |
| Caption CTA | « Commentez POST pour tester l'outil » |
| Demo | [`index.html`](index.html) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Prenez une photo de votre produit, à la lumière du jour.
2. Écrivez votre idée en une phrase : le produit, la nouveauté, la date.
3. L'IA écrit tout : post, stories, statut WhatsApp, post Google et Reel.
4. Vous copiez, vous publiez, et le planning vous dit quoi poster chaque jour.

## Proof shot to record

Tap « Ma photo » and pick a real photo from your phone, write one sentence, tap « Créer ma semaine »: 6 cards appear (post, 3 stories, WhatsApp status, Google post, Reel script, weekly plan). Tap « Copier » on one.

## Make it real

Without a server, the texts are templates built around the sentence. With [`outils/ia-worker`](../../outils/ia-worker/) and `AI_ENDPOINT`, Claude writes everything (mode `contenu`) and looks at the photo, which the page shrinks to 768 px before sending. The brand tone lives in the `cafe-lumiere` entry of `src/commerces.ts`. The AI is told to describe only what is in the photo or the sentence, so it never invents a price or a promotion.

## Caption (draft)

```text
Une photo de votre produit. Sept jours de contenu. Deux minutes. 📸

Une phrase suffit : l'IA écrit le post Instagram, 3 stories, le statut WhatsApp, le post Google, le script du Reel… et le planning de la semaine.

Vous n'avez plus qu'à copier-coller.
👉 Commentez POST pour tester l'outil.

#IA #contenu #petitscommerces #instagram #entrepreneur #astucebusiness
```
