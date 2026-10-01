# AI worker (episodes 10, 11, 12)

A small Cloudflare Worker that calls the Claude API for:

- **FAQ chatbot** (episodes 10 and 12): `POST { mode: "faq", commerce, question, historique? }` → `{ reponse }`
- **Review reply drafts** (episode 11): `POST { mode: "avis", commerce, avis: { auteur, note, texte } }` → `{ reponse }`

The API key stays on the server, never in the page. Each business's information lives in [`src/commerces.ts`](src/commerces.ts), and the prompts tell Claude to answer only from it, to hand anything else over to WhatsApp, and never to promise refunds or compensation in review replies.

## Deploy

```bash
cd outils/ia-worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY   # paste your key from console.anthropic.com
npx wrangler deploy                         # prints https://automatise-ca-ia.<you>.workers.dev
```

Then:

1. Put the deployed URL in `AI_ENDPOINT` in `episodes/10-chatbot-ia/index.html`, `episodes/11-reponses-avis-ia/index.html` and `episodes/12-site-salon-complet/index.html`.
2. Set `ALLOWED_ORIGINS` in [`wrangler.toml`](wrangler.toml) to the site addresses that may call it (comma-separated), and deploy again. Requests from other sites are refused.
3. For a real client, replace their entry in `src/commerces.ts` (hours, prices, address, WhatsApp, signature) and keep the page's `INFOS` in sync.

Local run: put `ANTHROPIC_API_KEY=…` in a `.dev.vars` file (git-ignored), run `npm run dev`, and use `http://localhost:8787` as `AI_ENDPOINT` while serving the pages from `http://localhost:8000`.

## Details

- Model `claude-opus-5-5` at low effort: answers are short and simple, so low effort keeps them fast and cheap. Claude Opus 5.5 is billed $4 per million input tokens and $20 per million output tokens; watch real usage in the Anthropic Console.
- Server-side refusal fallback is on (`fallbacks: "default"`), so a request a safety check declines is retried on the recommended fallback model. If it is still declined, the visitor gets a polite « écrivez-nous sur WhatsApp ».
- The chat history sent by the page is trimmed to the last 10 turns, 500 characters each, and cleaned before it reaches the API.
- If the worker is down or returns an error, the pages fall back to their built-in keyword answers or template drafts, so the demo never breaks on camera.
- The endpoint is public to the allowed sites. For a busy public site, add a Cloudflare rate-limiting rule on the worker route.

`npm run typecheck` checks the TypeScript.
