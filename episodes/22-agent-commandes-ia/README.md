# Épisode 22 · L'agent IA qui prend les commandes

**Mon 23 Nov** · Demo business: Café Lumière

| | |
|---|---|
| Hook A (number or question) | « Ce client a écrit "2 cappu et un croissant pour 8h30". L'IA a fait le reste. » |
| Hook B (story or contrarian) | « Un chatbot répond. Un agent agit. Voici la différence. » |
| Caption CTA | « Commentez AGENT pour la démo » |
| Demo | [`index.html`](index.html) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Donnez votre carte à l'agent, et ce qu'il doit obtenir : produits, heure, prénom.
2. Le client écrit comme il parle : l'agent comprend et remplit la commande.
3. Il manque quelque chose ? L'agent pose une seule question.
4. Tout est bon : la commande, prête à préparer, arrive sur votre WhatsApp.

## Proof shot to record

Tap the 4 suggestions in order: the order fills, the agent asks for the name, adds the juice and removes the croissant. Type « pour 23h » to show it refuses times outside opening hours. Open « Ce que l'agent a compris », then « Confirmer ».

## Make it real

Without a server, a keyword agent built on the same menu runs the demo. With [`outils/ia-worker`](../../outils/ia-worker/) and `AI_ENDPOINT`, Claude reads the whole conversation and returns the order as structured JSON (mode `commande`), limited to the menu's ids. The page then recalculates the prices itself and checks the time format. Keep the menu in `index.html` and in `src/commerces.ts` (`cafe-lumiere`) in sync.

## Caption (draft)

```text
"2 cappu et un croissant pour 8h30." L'IA a fait le reste. ☕

Un chatbot répond. Un agent agit : il comprend la commande, demande ce qui manque, calcule le total et l'envoie au café, prête à préparer.

👉 Commentez AGENT pour la démo.

#IA #agentIA #automatisation #cafe #restaurant #whatsappbusiness
```
