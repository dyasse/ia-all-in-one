# GenX AI — Multi-Modal Generation Dashboard

Ultra-modern dark-mode SaaS dashboard for generating websites, mobile apps, media, backend APIs, automation flows, and marketing copy.

## Stack
- Next.js (React)
- Framer Motion
- Lucide Icons
- Shadcn-inspired UI components

## AI Modules (multi-provider)
- `openai` (Responses API)
- `anthropic` (Messages API)
- `gemini` (Google Generative Language API)
- `groq` (OpenAI-compatible chat endpoint)
- `auto` routing mode based on requested outputs

If a provider API key is missing, the app runs in demo mode and still returns complete mock deliverables.

## Run locally
```bash
npm install
npm run dev
```

## Environment variables
```bash
AI_PROVIDER=auto
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=
```

Optional model overrides:
- `OPENAI_MODEL`
- `ANTHROPIC_MODEL`
- `GEMINI_MODEL`
- `GROQ_MODEL`

## Project structure
- `/components`: UI building blocks and dashboard modules
- `/lib`: provider clients and IA model routing
- `/app/api`: backend generation endpoints
- `/types`: typed contracts for language/output/provider modes

## Vercel + GitHub deployment (L-Khochibat)
1. In v0, click **Add to Codebase** or **Deploy** and connect GitHub.
2. Clone locally:
   ```bash
   git clone [repo-link]
   cd [project-name]
   npm install
   ```
3. Add API keys to Vercel Environment Variables.
4. Deploy with Vercel.
