# Épisode 16 · Le message qui fait revenir les clientes perdues

**Mon 9 Nov** · Demo business: Salon Jasmin (fictional beauty salon)

| | |
|---|---|
| Hook A (number or question) | « 23 clientes ne sont pas revenues depuis 2 mois. Voici le message qui les fait revenir. » |
| Hook B (story or contrarian) | « Elle venait chaque mois. Puis plus rien. Personne ne lui a écrit. » |
| Caption CTA | « Commentez RETOUR et je vous envoie le modèle » |
| Demo | [`index.html`](index.html), [`retour.gs`](retour.gs) |

Post hook A on Instagram and hook B on TikTok; keep the winner for YouTube Shorts and LinkedIn (see the November plan).

## On-screen steps

1. Partez de votre fichier de rendez-vous : chaque cliente, sa dernière visite et sa dernière prestation.
2. Filtrez celles qui ne sont pas revenues depuis 60 jours.
3. Le message se personnalise tout seul : prénom, prestation, le bon conseil.
4. Un geste par cliente pour l'envoyer. Chaque lundi, la liste se met à jour.

## Proof shot to record

Show the counter (23 clients, 60 days), slide « Pas venues depuis » to 90 days, edit one word of the message, then tap « Envoyer » on the first client: WhatsApp opens with her personal message and the progress bar moves.

## Make it real

Add [`retour.gs`](retour.gs) to the **same** Apps Script project as episode 4, set `EMAIL_GERANTE` and run `installerRetour()` once. Every Monday at 9h you get one email with a WhatsApp link per client absent for 60 days or more (visits grouped by phone number), message already written. Each client is suggested at most once every 60 days (tab « Relances clientes »). Sending without a tap would need the WhatsApp Cloud API and an approved template (see episode 5). The page uses sample data, and the return rate is a hypothesis for the viewer to set.

## Caption (draft)

```text
23 clientes ne sont pas revenues depuis 2 mois. 💌

Le tableau les retrouve tout seul, et chacune reçoit un message personnel : son prénom, sa dernière prestation, le bon conseil. Un geste par cliente pour l'envoyer.

L'argent qui dort dans votre fichier clients, il est là.
👉 Commentez RETOUR et je vous envoie le modèle.

#automatisation #petitscommerces #salondecoiffure #fidelisation #entrepreneur #whatsappbusiness
```
