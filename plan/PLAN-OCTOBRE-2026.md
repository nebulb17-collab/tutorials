# Plan de contenu — Octobre 2026

1 oct. 2026 · @bors ab

## Strategy

In October you post 12 short tutorials in French, Monday, Wednesday and Friday, each showing one automation a small business can use today. Every video ends by pointing to you and ClickVente.

- **Series name:** « Automatise ça » (one automation per video, always the same intro card so people recognise the series)
- **Positioning:** you are the person who shows small businesses how to stop losing customers in their DMs. ClickVente is where they hire you to do it for them.
- **Audience:** owners of cafés, restaurants, boutiques, salons, clinics and service businesses, French-speaking (Maghreb, France, Belgium, Canada).
- **Platforms:** Instagram Reels and TikTok first, the same video on YouTube Shorts, and a LinkedIn repost with a longer caption.
- **Format:** vertical 9:16, 30 to 60 seconds, French on-screen text and subtitles. Voiceover optional.
- **Structure of every video:** problem in 3 seconds, the result shown in motion, 3 to 4 build steps, call to action.
- **Weekly themes:** week 1 WhatsApp orders, week 2 bookings, week 3 leads and follow-up, week 4 AI plus a full site from A to Z.

Each episode's demo lives in [`../episodes/`](../episodes/): open its `index.html`, and read its `README.md` for the 4 on-screen steps and a draft caption.

## Week 1 · Commandes WhatsApp (5 to 9 Oct)

Quick wins any café or boutique can copy, so the series starts with high saves and shares.

| Date | Episode | Hook (first 3 s) | What the video shows | Caption CTA |
|---|---|---|---|---|
| Mon 5 Oct | [1. Bouton « Commander sur WhatsApp » pour un menu de café](../episodes/01-menu-whatsapp/) | « Vos clients vous écrivent "c'est combien ?" 50 fois par jour ? » | A café menu where each item opens WhatsApp with the order already written | « Commentez MENU et je vous envoie la démo » |
| Wed 7 Oct | [2. Un formulaire de commande complet pour une boutique](../episodes/02-commande-boutique/) | « Fini les 10 messages pour une seule commande. » | Product page with size, color, quantity and address, sent as one clean WhatsApp message | « Enregistrez cette vidéo pour votre boutique » |
| Fri 9 Oct | [3. Un QR code WhatsApp pour votre vitrine](../episodes/03-qr-code-whatsapp/) | « Ce QR code m'a pris 2 minutes. » | Pre-filled WhatsApp link turned into a QR code on a table card and a shop window | « Vous voulez le vôtre ? Écrivez QR en commentaire » |

## Week 2 · Réservations (12 to 16 Oct)

Salons, barbers and clinics lose the most time to booking messages, and they pay for fixes.

| Date | Episode | Hook (first 3 s) | What the video shows | Caption CTA |
|---|---|---|---|---|
| Mon 12 Oct | [4. Un formulaire de réservation qui remplit Google Sheets tout seul](../episodes/04-reservation-sheets/) | « Votre agenda est encore dans vos messages Instagram ? » | Salon booking form; each booking appears as a new row in a sheet in real time | « Commentez AGENDA pour recevoir le modèle » |
| Wed 14 Oct | [5. Le rappel automatique la veille du rendez-vous](../episodes/05-rappel-veille/) | « Les rendez-vous oubliés vous coûtent combien par mois ? » | A booking triggers a reminder message scheduled for the day before | « Partagez à un salon qui en a besoin » |
| Fri 16 Oct | [6. Des créneaux en ligne, sans appel ni message](../episodes/06-creneaux-en-ligne/) | « Vos clients réservent pendant que vous dormez. » | Calendar page showing only free slots; booking at 23h, confirmation sent at once | « Vous voulez ça pour votre salon ? Écrivez RDV » |

## Week 3 · Prospects et relances (19 to 23 Oct)

This week targets service businesses with bigger budgets, and it leads into ClickVente's CRM work.

| Date | Episode | Hook (first 3 s) | What the video shows | Caption CTA |
|---|---|---|---|---|
| Mon 19 Oct | [7. Un formulaire de devis avec alerte instantanée](../episodes/07-devis-alerte/) | « Un client demande un devis. Vous répondez 2 jours après. Il est déjà parti. » | Quote form sends an instant alert to the owner and saves the lead with its details | « Commentez DEVIS pour la démo » |
| Wed 21 Oct | [8. La relance automatique après 2 jours sans réponse](../episodes/08-relance-auto/) | « 80 % des ventes se font après la relance. Vous relancez ? » | A lead with no reply gets a polite follow-up message 2 days later, automatically | « Enregistrez pour ne plus jamais oublier une relance » |
| Fri 23 Oct | [9. D'où viennent vos clients ? Le tableau de bord des prospects](../episodes/09-tableau-prospects/) | « Instagram, Google ou bouche-à-oreille : vous savez ce qui marche ? » | Every form records its source; a simple dashboard counts leads per channel | « Vous voulez ce tableau ? Écrivez CLIENTS » |

> The 80 % figure in episode 8 is a widely repeated sales claim, not a measured number. Swap it for « La plupart des ventes » if you prefer to stay safe.

## Week 4 · IA et site complet (26 to 30 Oct)

The month ends on AI, which gets the most curiosity, and on one full build that ties every episode together.

| Date | Episode | Hook (first 3 s) | What the video shows | Caption CTA |
|---|---|---|---|---|
| Mon 26 Oct | [10. Un chatbot IA qui répond aux questions fréquentes](../episodes/10-chatbot-ia/) | « Horaires, prix, adresse : vous répondez encore à la main ? » | A small chat on a site answering opening hours, prices and address from the business's own info | « Commentez IA pour voir la démo » |
| Wed 28 Oct | [11. L'IA qui prépare vos réponses aux avis clients](../episodes/11-reponses-avis-ia/) | « Un avis négatif sans réponse fait fuir les clients. » | AI drafts a reply to each new review; the owner approves before it is posted | « Enregistrez cette astuce » |
| Fri 30 Oct | [12. Un site de salon complet, de A à Z, avec toutes les automatisations](../episodes/12-site-salon-complet/) | « Voici tout ce qu'on a construit ce mois-ci, dans un seul site. » | The full launch video made with /brag-slim: booking, reminder, sheet, chatbot | « Vous voulez le même pour votre entreprise ? Lien en bio : ClickVente » |

## Production workflow

Each episode takes about 1 to 2 hours: build the mini project, turn it into a motion video with /brag-slim, then add subtitles and post. Batch two or three episodes per session.

1. Build the mini project with Claude, using the build prompt below with that episode's details. *(Done for all 12 episodes — see `episodes/`.)*
2. Record a short screen capture of the result working (the WhatsApp message arriving, the sheet filling). This is your proof shot.
3. Run /brag-slim in the project folder with the tone prompt below, to get the motion video, music and share copy. *(Or use the ready-made motion video for the episode in [`../videos/`](../videos/), rendered from code with the same brand.)*
4. Assemble in CapCut or a similar editor: intro card « Automatise ça », hook, the /brag video, your screen capture, CTA card.
5. Add French subtitles, export in 9:16 and schedule the post.

**Build prompt** (change the bracketed parts per episode):

```text
Build a small demo project for my French tutorial series « Automatise ça ».
Episode: [Bouton « Commander sur WhatsApp » pour un menu de café].
Business: a fictional [café] called « [Café Lumière] ».
All visible text in French. One HTML file, mobile-first, clean and premium,
using my brand color #CF7652.
The automation: [each menu item opens WhatsApp with a pre-filled order
message to +213 000 000 000].
Keep it simple enough to explain in 4 steps, and list those 4 steps at the end
so I can use them as on-screen text.
```

**/brag-slim tone prompt:**

```text
/brag --tone "tutoriel rapide et premium pour petits commerces, texte à l'écran en français, rythme vif, couleur de marque #CF7652"
```

Then ask in the same chat: « Format vertical 9:16, 30 à 45 secondes, et écris la légende du post en français ». If the video comes out 16:9, reframe it to vertical in your editor.

## CTAs, hashtags and DM replies

Every comment with a keyword (MENU, AGENDA, DEVIS…) is a warm lead: reply by DM yourself within a few hours, never with a bot.

**End cards to rotate:**

- « Je construis ces automatisations pour les entreprises. Lien en bio. »
- « Suivez « Automatise ça » : une automatisation par vidéo, 3 fois par semaine. »
- « Vous voulez la même chose pour votre commerce ? Écrivez-moi. »

**Hashtags** (pick 5 to 8 per post): #automatisation #petitscommerces #siteweb #whatsappbusiness #entrepreneur #IA #nocode #commerceenligne #astucebusiness #digitalisation

**DM reply to a keyword comment:**

```text
Bonjour [Prénom] ! Merci pour votre commentaire 🙂
Voici la démo : [lien].
Vous avez quel type d'activité ? Je peux vous montrer à quoi ça
ressemblerait pour vous, gratuitement, en 15 minutes.
```

**Follow-up 3 days later if no reply:**

```text
Bonjour [Prénom], je me permets de revenir vers vous.
Vous avez pu regarder la démo ? Si vous voulez, je vous prépare
une version avec le nom de votre commerce.
```

## Weekly check

Every Sunday, spend 15 minutes on these four numbers and change one thing for the next week. Clients come from keyword comments and DMs, so those matter more than views.

| Metric | What it tells you | If it's low |
|---|---|---|
| Saves and shares per video | Whether the tutorial is useful | Make the result clearer and show it earlier |
| Keyword comments (MENU, RDV…) | How many people want the demo | Make the CTA one word and say it out loud on screen |
| DM conversations started | How many leads you're really talking to | Reply faster, ask about their business first |
| Calls booked | Whether content turns into clients | Offer a free mock-up with their business name |

- [ ] Week 1 check (Sun 11 Oct)
- [ ] Week 2 check (Sun 18 Oct)
- [ ] Week 3 check (Sun 25 Oct)
- [ ] Month review and November plan (Sun 1 Nov): draft ready in [`PLAN-NOVEMBRE-2026.md`](PLAN-NOVEMBRE-2026.md)

### Weekly numbers

| Week | Saves + shares | Keyword comments | DM conversations | Calls booked | One change for next week |
|---|---|---|---|---|---|
| 1 (5–9 Oct) | | | | | |
| 2 (12–16 Oct) | | | | | |
| 3 (19–23 Oct) | | | | | |
| 4 (26–30 Oct) | | | | | |
