# LLM Proxy Backend

Small Node.js Express proxy that forwards requests to an LLM provider using an API key stored in environment.

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Create `.env` (do not commit) from `.env.example` and set `LLM_API_KEY` and `LLM_API_URL`.

3. Run

```bash
npm start
```

Endpoints

- `GET /health` — returns { status: 'ok' }
- `POST /generate` — forwards the JSON body to `LLM_API_URL` with `Authorization: Bearer <LLM_API_KEY>`

Security notes

- Never commit your API key. Use environment vars or a secrets manager.
- Add auth, rate-limiting, and validation before using in production.

Next steps I can implement

- Add request validation and examples for common LLM providers.
- Add auth (API key for clients) and rate limiting.
- Add streaming responses (if provider supports it).
