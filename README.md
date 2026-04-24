# GenX AI — Multi-Modal Generation Dashboard

Ultra-modern dark-mode SaaS dashboard for generating websites, mobile apps, images, and videos.

## Stack
- Next.js (React)
- Framer Motion
- Lucide Icons
- Shadcn-inspired UI components

## Run locally
```bash
npm install
npm run dev
```

## Project structure
- `/components`: UI building blocks (sidebar, studio prompt, workspace, pricing, gallery)
- `/lib`: provider clients (OpenAI/Anthropic wiring point)
- `/app/api`: backend generation endpoints
- `/types`: typed contracts for language/output modes

## Vercel + GitHub deployment (L-Khochibat)
1. In v0, click **Add to Codebase** or **Deploy** and connect GitHub.
2. Clone locally:
   ```bash
   git clone [repo-link]
   cd [project-name]
   npm install
   ```
3. Add generation backend in `app/api/generate/route.ts`.
4. Add OpenAI/Anthropic API keys to Vercel Environment Variables.
5. Deploy with Vercel.
