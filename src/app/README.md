# Policy Career Navigator

A knowledge product of **Public Policy India + STRIDE Policy Institute**.

Live at `policy-career-navigator.vercel.app`

500+ roles · 700+ entry points · 100+ skills · 12 career spaces · AI-exposure scored.

## What this is

A free, zero-login, single-page tool mapping India's public policy, social impact, governance, and development sector careers. Serves school students, undergraduates, and early-career professionals exploring the field. The entire dataset and UI live in one file: `src/app/PolicyCareerNavigator.jsx`.

## Stack

- Next.js 14 (App Router)
- React 18
- Google Fonts (Fraunces + Manrope)
- Zero external dependencies beyond the above
- No database, no authentication, no API key, no monthly bill

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Sign in to vercel.com with GitHub
3. Import the repository, click Deploy
4. Live in 60-90 seconds at `your-repo-name.vercel.app`

Vercel auto-detects Next.js. No configuration needed.

## Edit content

The data lives in `src/app/PolicyCareerNavigator.jsx`:

- Lines 17-520: 500+ distinct roles (RD array)
- Lines 523-1246: 700+ entry points (PD array)
- Lines 1249-1302: skills, quiz, profiles, frameworks
- Lines 1330+: UI components, tabs, layout

Edit on GitHub (pencil icon → make change → commit). Vercel redeploys automatically in 60-90 seconds.

## Run locally

```
npm install
npm run dev
# http://localhost:3000
```

## Maintenance reference

See `Navigator_Deployment_Guide.docx` for the complete maintenance cadence, ecosystem integration plan, disaster recovery procedure, and content-edit reference.

## About PPI + STRIDE

**Public Policy India** is India's first and largest pan-India community for public policy and social impact: 150,000+ community members, 35 chapters across India's 20 largest cities, 35+ university partners, 120+ in-person engagements over six years.

**STRIDE Policy Institute** is PPI's specialist arm, delivering capacity-building, training, research, and consulting under the same parent organisation.

Together, they cover community engagement, capacity building, and consulting across India's policy and social impact sector.

- Website: https://publicpolicyindia.com
- Newsletter (The Policy Post): https://newsletter.publicpolicyindia.com
- LinkedIn: https://linkedin.com/company/public-policy-india/
