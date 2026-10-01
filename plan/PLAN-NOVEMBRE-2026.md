# Plan de contenu — Novembre 2026 · Saison 2

Préparé le 1 oct. 2026 · @bors ab

Season 2 of « Automatise ça »: 12 more French tutorials, Monday, Wednesday and Friday from 2 to 27 November. Season 1 showed single automations. Season 2 shows **systems**: the AI drafts, sorts, follows up and reports while the owner decides. Every video still ends by pointing to you and ClickVente.

## What we take from @nick_saraev

[Nick Saraev](https://www.instagram.com/nick_saraev/) (about 550K followers on Instagram) teaches AI automation (Claude Code, n8n, Make) to people who sell automations to businesses. His content is practical and tool-specific: workflow walkthroughs of systems that bring in or keep revenue.

> Instagram could not be opened from the build environment, so this section is based on public descriptions of his content (sources at the end), not on watching the reels. Before filming, scroll his last 20 reels yourself and note the 3 hooks that made you stop.

| His pattern | Our version | Episodes |
|---|---|---|
| Hooks built on hard numbers | Numbers the viewer can check on screen (« 60 secondes », « 5 minutes », « 11 jours ») or computes for their own shop with a calculator. Never income claims. | all, calculators in 16, 18, 24 |
| Benefit questions and staged dialogue (« "…" ») | The client's own words as the hook: « "Je vous envoie le devis ce soir." » | 13, 20, 22 |
| Mini-stories of a deal that went wrong | Hook B of most episodes: the 3-second story of the lost client | 13, 16, 19 |
| Blunt contrarian takes | « Arrêtez de répondre aux demandes dans l'ordre d'arrivée. » | 14, 15, 17, 22 |
| Numbered frameworks, low fluff | The 4 on-screen steps (kept) and a « 5 automatisations » framework episode | 24 |
| Systems that sell: proposal generator, lead qualification, deep personalisation, payment processing, content repurposing, lead scraping, AI agents | The same systems, rebuilt for a café, a salon, a boutique or a tradesman | 13–23 |
| Free templates as lead magnets | Comment keyword → you send the template by DM (already our system) | all |

**What we leave out:** income and revenue claims, the « start an AI agency » pitch (our viewers own the business), heavy tool stacks (n8n, Apollo, Instantly) when Google Sheets and Apps Script do the job, and cold email at scale, which local rules restrict in France, Belgium and Canada. Episode 21 builds a B2B call and visit list instead.

## Strategy

- **Same series, same cadence:** « Automatise ça », Mon/Wed/Fri, same intro card, same structure (problem in 3 s, result in motion, 3–4 build steps, CTA).
- **New: two hooks per episode.** Hook A is a number or a question, hook B is a story or a contrarian take. Post A on Instagram and B on TikTok; after 48 h keep the better one for YouTube Shorts and LinkedIn, and note the winner in the weekly check.
- **Positioning for season 2:** « votre premier employé IA ». The AI prepares, the owner validates. That is the line that sells ClickVente's bigger projects (systems rather than single automations).
- **Seasonality:** Black Friday is Friday 27 November and companies order end-of-year gifts in November, so week 3 is a Black Friday and year-end special, posted early enough for viewers to set it up.
- **Weekly themes:** week 1 AI at work, week 2 the money already in your customer list, week 3 Black Friday and year-end, week 4 your AI employee and the 5-automation framework.

Each episode's demo lives in [`../episodes/`](../episodes/) (13 to 24), with the 4 on-screen steps, the proof shot to record, the setup and a draft caption in its README.

## Week 1 · L'IA au travail (2 to 6 Nov)

The AI writes the first draft; the owner stays in control. Proposal, sorting, content.

| Date | Episode | Hook A | Hook B | What the video shows | Caption CTA |
|---|---|---|---|---|---|
| Mon 2 Nov | [13. Le devis personnalisé envoyé en 60 secondes](../episodes/13-devis-ia-60-secondes/) | « Ce devis s'est écrit tout seul en 60 secondes. » | « "Je vous envoie le devis ce soir." Trois jours plus tard, le couple avait signé ailleurs. » | After a call, a photographer fills 6 fields; prices are calculated, the AI writes the text, and a clean proposal is ready to send as PDF or WhatsApp | « Commentez PROPOSITION et je vous envoie le modèle » |
| Wed 4 Nov | [14. Le tri automatique des demandes : chaud, tiède, froid](../episodes/14-tri-prospects/) | « 30 demandes de devis cette semaine. Lesquelles rappeler en premier ? » | « Arrêtez de répondre aux demandes dans l'ordre d'arrivée. » | New requests get a score out of 100 and land in 🔥 Chaud, Tiède or Froid, with the reason and the next action | « Commentez TRI pour recevoir la grille de points » |
| Fri 6 Nov | [15. Une photo, une semaine de posts](../episodes/15-photo-semaine-posts/) | « Une photo de votre produit. Sept jours de contenu. Deux minutes. » | « Vous ne manquez pas d'idées. Vous manquez de temps pour les écrire. » | One photo and one sentence become an Instagram post, 3 stories, a WhatsApp status, a Google post, a Reel script and a 7-day plan | « Commentez POST pour tester l'outil » |

## Week 2 · L'argent qui dort dans votre fichier clients (9 to 13 Nov)

Before chasing new clients, bring back the old ones, collect reviews and get paid faster.

| Date | Episode | Hook A | Hook B | What the video shows | Caption CTA |
|---|---|---|---|---|---|
| Mon 9 Nov | [16. Le message qui fait revenir les clientes perdues](../episodes/16-clients-perdus/) | « 23 clientes ne sont pas revenues depuis 2 mois. Voici le message qui les fait revenir. » | « Elle venait chaque mois. Puis plus rien. Personne ne lui a écrit. » | The client list from the booking sheet, filtered to « pas venue depuis 60 jours »; each client gets a personal message based on her last service; one tap per WhatsApp | « Commentez RETOUR et je vous envoie le modèle » |
| Wed 11 Nov | [17. La demande d'avis qui part toute seule](../episodes/17-demande-avis-auto/) | « Vos clientes adorent votre travail. Pourquoi si peu d'avis Google ? » | « Ne demandez plus d'avis. Programmez-les. » | 2 hours after each appointment, a thank-you message with the direct Google review link goes out; plus a counter QR code | « Commentez AVIS pour recevoir le message et le QR code » |
| Fri 13 Nov | [18. La facture qui se fait toute seule](../episodes/18-facture-auto/) | « Une facture propre, numérotée et envoyée en 30 secondes. » | « Encore une soirée à faire vos factures sur Word ? » | Pick the client and the services: numbered invoice, totals, payment link, PDF, sent by WhatsApp or email, logged as « En attente » until paid | « Commentez FACTURE pour le modèle » |

## Week 3 · Spécial Black Friday et fin d'année (16 to 20 Nov)

Posted 7 to 11 days before Black Friday, so viewers have time to set it up.

| Date | Episode | Hook A | Hook B | What the video shows | Caption CTA |
|---|---|---|---|---|---|
| Mon 16 Nov | [19. La liste d'attente Black Friday sur WhatsApp](../episodes/19-liste-attente-black-friday/) | « Black Friday dans 11 jours. Votre liste d'attente est prête ? » | « Une promo postée le jour J, c'est déjà trop tard. » | A countdown page where clients sign up (first name, WhatsApp, consent); the list fills a sheet; on D-day, one tap per message | « Commentez BLACK et je vous envoie la page » |
| Wed 18 Nov | [20. Le catalogue qui se met à jour depuis Google Sheets](../episodes/20-catalogue-google-sheets/) | « Je change un chiffre dans Google Sheets… et le site se met à jour. » | « "C'est encore disponible ?" La question que vous lisez toute la journée. » | Prices and stock come from a sheet; « Plus que 2 » and « Épuisé — me prévenir » appear on their own; when stock returns, the owner gets the list to notify | « Commentez STOCK pour le modèle » |
| Fri 20 Nov | [21. 50 entreprises à contacter pour vos commandes de fin d'année](../episodes/21-prospects-entreprises/) | « 50 entreprises à contacter pour vos commandes de fin d'année. Trouvées en 5 minutes. » | « Vous attendez les commandes de fin d'année ? Les autres vont les chercher. » | A pastry shop searches « agences immobilières, Oran »: name, phone, rating, website; filter, a personal call script per company, export | « Commentez PROSPECT pour le script » |

## Week 4 · Votre employé IA (23 to 27 Nov)

From a chatbot that answers to an agent that acts, then the framework that ties the two seasons together.

| Date | Episode | Hook A | Hook B | What the video shows | Caption CTA |
|---|---|---|---|---|---|
| Mon 23 Nov | [22. L'agent IA qui prend les commandes](../episodes/22-agent-commandes-ia/) | « Ce client a écrit "2 cappu et un croissant pour 8h30". L'IA a fait le reste. » | « Un chatbot répond. Un agent agit. Voici la différence. » | A customer writes a normal sentence; the agent matches the menu, asks what is missing, totals, confirms and sends the ready order to the café's WhatsApp | « Commentez AGENT pour la démo » |
| Wed 25 Nov | [23. Le rapport du lundi matin](../episodes/23-rapport-du-lundi/) | « Chaque lundi à 8h, ce message arrive tout seul. » | « Vous ne pouvez pas améliorer ce que vous ne mesurez pas. » | Monday 8:00: last week in one message (appointments, revenue, no-shows, new clients, sources, reviews) with arrows versus the week before and one suggestion | « Commentez LUNDI pour le modèle » |
| Fri 27 Nov | [24. Les 5 automatisations que je mettrais en place demain](../episodes/24-diagnostic-5-automatisations/) | « Si j'ouvrais un commerce demain, voici les 5 automatisations que je mettrais en place. » | « 24 épisodes en 2 mois. Si vous ne gardez que 5 automatisations, gardez celles-là. » | A 6-question diagnostic picks the viewer's top 5 from the 22 automations of both seasons, estimates the hours saved per week, and sends the result to you on WhatsApp | « Faites votre diagnostic : lien en bio (ClickVente) » |

Episode 24 is also a lead magnet: every diagnostic sent to you is a warm lead with their business type and needs already written.

## Production notes for season 2

The workflow from the October plan stays the same (build, proof shot, `/brag-slim`, CapCut, subtitles). Three additions:

1. **Show the machinery for 2 seconds.** In every episode with a backend, cut to the Google Sheet or the script for a moment. It proves the automation is real.
2. **Numbers rule.** Only numbers that are visible in the demo or computed for the viewer. The calculators in episodes 16, 18 and 24 turn « vous perdez de l'argent » into their own figure.
3. **Face first.** Try 2 seconds of you on camera saying hook A or B, then cut to the screen. Compare retention with the October screen-only videos in the weekly check.

Batch suggestion: Sun 1 Nov (episodes 13–16), Sun 8 Nov (17–20), Sun 15 Nov (21–24).

**Ready-made motion videos.** [`../videos/`](../videos/) has a motion video for every episode (hook A and hook B for episodes 13–24) and a « Quelle semaine 🤯 » recap for every week, a format inspired by [@drcintas](https://www.instagram.com/drcintas/)'s « What a crazy week in AI » roundups. Post the recap on Saturday: it gives the week's 3 keywords a second chance and is the most saveable video of the week. Add a trending sound in the app; the videos are silent on purpose.

## CTAs and DM replies

The October rules still apply: reply to every keyword comment yourself within a few hours. New keywords: PROPOSITION, TRI, POST, RETOUR, AVIS, FACTURE, BLACK, STOCK, PROSPECT, AGENT, LUNDI.

**DM reply to a diagnostic (episode 24):**

```text
Bonjour [Prénom] ! Merci pour votre diagnostic 🙂
Pour un(e) [activité], je commencerais par « [automatisation n°1] » :
c'est celle qui vous fera gagner le plus de temps.
Je peux vous montrer à quoi elle ressemblerait avec le nom de votre
commerce, gratuitement, en 15 minutes. Quel jour vous arrange ?
```

## Weekly check

Same four numbers as October (saves and shares, keyword comments, DM conversations, calls booked), plus the hook test.

| Week | Saves + shares | Keyword comments | DM conversations | Calls booked | Winning hook (A or B) | One change for next week |
|---|---|---|---|---|---|---|
| 1 (2–6 Nov) | | | | | | |
| 2 (9–13 Nov) | | | | | | |
| 3 (16–20 Nov) | | | | | | |
| 4 (23–27 Nov) | | | | | | |

- [ ] Week 1 check (Sun 8 Nov)
- [ ] Week 2 check (Sun 15 Nov)
- [ ] Week 3 check (Sun 22 Nov)
- [ ] Month review and December plan (Sun 29 Nov)

## Sources

- [Nick Saraev on Instagram](https://www.instagram.com/nick_saraev/) and his [YouTube channel](https://www.youtube.com/@nicksaraev)
- [Nick Saraev's LinkedIn strategy (ViralBrain)](https://www.viralbrain.ai/heroes/nick-saraev-7ge3obz4): hook styles and formatting
- [Nick Saraev's Automations (Dee7 Studio)](https://www.dee7studio.com/stories/nick-saraevs-automations): proposal generation, lead qualification, payment processing
- [5 More Automations You Can Sell Today](https://nicksaraev.com/5-more-automations-you-can-sell-today-for-1-500-or-10-000/): deep personalisation, search-intent lead scraping
- [Nick Saraev AI Automation Master Report (BULDRR)](https://buldrr.com/nick-saraev-ai-automation-master-report/): Google Maps lead engines, personalised outreach
- [n8n workflow: Instagram content discovery and repurposing](https://n8n.io/workflows/4658-automate-instagram-content-discovery-and-repurposing-w-apify-gpt-4o-and-perplexity/)
