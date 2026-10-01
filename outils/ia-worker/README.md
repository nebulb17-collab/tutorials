# AI worker (episodes 10, 11, 12, 13, 15, 22)

A small Cloudflare Worker that calls the Claude API for:

- **FAQ chatbot** (episodes 10 and 12): `POST { mode: "faq", commerce, question, historique? }` → `{ reponse }`
- **Review reply drafts** (episode 11): `POST { mode: "avis", commerce, avis: { auteur, note, texte } }` → `{ reponse }`
- **Proposal texts** (episode 13): `POST { mode: "devis", commerce, devis: { client, evenement, date, lieu, invites, formule, options, notes } }` → `{ resultat: { intro, prestation, points_forts, prochaines_etapes } }`
- **A week of posts from one photo** (episode 15): `POST { mode: "contenu", commerce, idee, image? }` → `{ resultat: { instagram, stories, whatsapp, google, reel, planning } }`
- **Ordering agent** (episode 22): `POST { mode: "commande", commerce, historique }` → `{ resultat: { articles, heure_retrait, prenom, remarque, complet, reponse } }`

The API key stays on the server, never in the page. Each business's information (and, for the ordering agent, its menu) lives in [`src/commerces.ts`](src/commerces.ts). The prompts tell Claude to answer only from it, to hand anything else over to WhatsApp, never to promise refunds or compensation in review replies, and never to write prices: the pages calculate every amount themselves. The `devis`, `contenu` and `commande` modes use structured outputs (a JSON schema), so the pages always get the fields they expect.

## Deploy

```bash
cd outils/ia-worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY   # paste your key from console.anthropic.com
npx wrangler deploy                         # prints https://automatise-ca-ia.<you>.workers.dev
```

Then:

1. Put the deployed URL in `AI_ENDPOINT` in the pages of episodes 10, 11, 12, 13, 15 and 22.
2. Set `ALLOWED_ORIGINS` in [`wrangler.toml`](wrangler.toml) to the site addresses that may call it (comma-separated), and deploy again. Requests from other sites are refused.
3. For a real client, replace their entry in `src/commerces.ts` (hours, prices, address, WhatsApp, signature) and keep the page's `INFOS` in sync.

Local run: put `ANTHROPIC_API_KEY=…` in a `.dev.vars` file (git-ignored), run `npm run dev`, and use `http://localhost:8787` as `AI_ENDPOINT` while serving the pages from `http://localhost:8000`.

## Details

- Model `claude-opus-5-5`: low effort for the chatbot, review replies and ordering agent (short, simple answers), medium effort for proposals and content, where the writing matters more. Claude Opus 5.5 is billed $4 per million input tokens and $20 per million output tokens; watch real usage in the Anthropic Console.
- Server-side refusal fallback is on (`fallbacks: "default"`), so a request a safety check declines is retried on the recommended fallback model. If it is still declined, the visitor gets a polite « écrivez-nous sur WhatsApp ».
- The chat history sent by the page is trimmed to the last 10 turns, 500 characters each, and cleaned before it reaches the API. Photos (episode 15) must be JPEG, PNG or WebP under about 1 MB; the page shrinks them to 768 px before sending.
- If the worker is down or returns an error, the pages fall back to their built-in keyword answers, template texts or keyword ordering agent, so the demo never breaks on camera.
- The endpoint is public to the allowed sites. For a busy public site, add a Cloudflare rate-limiting rule on the worker route.

`npm run typecheck` checks the TypeScript.
