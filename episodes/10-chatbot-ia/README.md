# Épisode 10 · Un chatbot IA qui répond aux questions fréquentes

**Mon 26 Oct** · Demo business: Salon Jasmin

| | |
|---|---|
| Hook (first 3 s) | « Horaires, prix, adresse : vous répondez encore à la main ? » |
| Caption CTA | « Commentez IA pour voir la démo » |
| Demo | [`index.html`](index.html) |

## On-screen steps

1. Écrivez vos infos une fois : horaires, prix, adresse, paiement, annulation.
2. Donnez-les à l'IA avec une règle : répondre seulement avec ces infos.
3. Ajoutez la petite fenêtre de discussion sur votre site.
4. Les clients ont la réponse en 2 secondes, et le reste arrive sur votre WhatsApp.

## Proof shot to record

Tap the suggested questions, then type one the salon cannot answer (« vous faites les extensions ? ») to show the assistant handing over to WhatsApp instead of inventing. Open « Ce que l'assistant sait » to show where the answers come from.

## Make it real

Without a server, the page answers with keyword rules built from the same information, which is enough for the video. For real AI answers, deploy [`outils/ia-worker`](../../outils/ia-worker/) and put its URL in `AI_ENDPOINT`. The business information lives on the server in `src/commerces.ts`, and Claude is told to answer only from it. If the server is unreachable, the page falls back to the keyword answers.

## Caption (draft)

```text
Horaires, prix, adresse : vous répondez encore à la main ? 📱

Ce petit assistant répond à vos clients en 2 secondes, uniquement avec VOS infos. Il n'invente rien : pour le reste, il les envoie sur votre WhatsApp.

Commentez IA pour voir la démo 👇

#IA #automatisation #siteweb #petitscommerces #entrepreneur #digitalisation
```
