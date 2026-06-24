# DopaPick — ADHD Dopamine Menu Picker

A production-ready Next.js mini-tool funnel for **DopaPick — ADHD Dopamine Menu Picker** by **dias studio**.

## What this app does
DopaPick helps visitors choose their energy, time, and vibe, then receive one tiny ADHD-friendly dopamine reset. It also includes a task unfreezer, no-scroll replacement mode, local favorites, VIP unlock for PDF buyers, and a printable sales page.

## Funnel strategy
The free mini-tool warms traffic with useful reset ideas, saves favorites in the browser, and routes engaged users to the paid Etsy PDF: **The ADHD Dopamine Menu + Action Picker System**.

## Routes
- `/` landing page and homepage picker preview
- `/picker` full dopamine reset picker
- `/task-unfreezer` tiny task starter
- `/no-scroll` no-scroll replacement cards
- `/favorites` local saved resets
- `/vip` buyer code unlock
- `/printable` PDF sales page
- `/share` share page and copy snippets
- `/privacy` privacy notes
- `/terms` terms and disclaimer

## Setup
```bash
npm install
```

## Environment variables
Copy `.env.example` to `.env.local` and update:
```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_ETSY_LISTING_URL="https://www.etsy.com/listing/your-listing"
NEXT_PUBLIC_ETSY_BUNDLE_URL="https://www.etsy.com/listing/your-bundle"
NEXT_PUBLIC_VIP_CODE="DOPA-MENU-VIP"
```
All values are public CTA/config values. No server-only secrets are required.

## How to run locally
```bash
npm run dev
npm run lint
npm run build
```

## How to deploy on Vercel
1. Push repo to GitHub.
2. Import repo into Vercel.
3. Add env variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ETSY_LISTING_URL`, `NEXT_PUBLIC_ETSY_BUNDLE_URL`, `NEXT_PUBLIC_VIP_CODE`.
4. Deploy.
5. Copy the production URL.
6. Use the production URL in the PDF QR code and Etsy description.

Deployment URL: provided by Vercel preview deployments.
Production URL: set this as `NEXT_PUBLIC_SITE_URL` after assigning your domain.

## How to connect Etsy links
Set `NEXT_PUBLIC_ETSY_LISTING_URL` for the printable CTA and `NEXT_PUBLIC_ETSY_BUNDLE_URL` for the bundle CTA. Fallbacks are `#printable` and `#bundle`.

## How to replace images/videos
Add production assets in `public/images` and `public/videos` following the placeholder READMEs. The app uses CSS mockups until final imagery is added.

## How VIP mode works
PDF buyers enter the code from `NEXT_PUBLIC_VIP_CODE` on `/vip`. A successful unlock stores `localStorage.vipUnlocked = "true"` and enables VIP reset items.

## Share link
The share URL format is:
```txt
${NEXT_PUBLIC_SITE_URL}/share
```

## Legal/disclaimer
This app and printable are ADHD-friendly organization and routine support tools. They are not medical, psychological, therapeutic, or diagnostic advice.

## Next improvements
- Add final product images and Open Graph image.
- Add optional privacy-friendly analytics in `lib/analytics.ts`.
- Add more VIP reset categories after customer feedback.
- Connect final Etsy listing and bundle URLs.
