# Policy Career Navigator — Public Policy India

Interactive career discovery tool for India's policy, social impact, and governance ecosystem.
50+ roles, 12 career spaces, 72 skills, career ladders, role comparison, and a career quiz.

---

## Deploy to Vercel (5 minutes, free)

### Step 1: Push to GitHub
1. Go to [github.com/new](https://github.com/new) and create a new repository (e.g., `policy-career-navigator`)
2. Make it **Public** (or Private, both work)
3. On your computer, open Terminal and run:

```bash
cd policy-navigator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yashcontactemail-maker/policy-career-navigator.git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username)

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Select your `policy-career-navigator` repository
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **"Deploy"**
6. Wait ~60 seconds. Done. You'll get a URL like `policy-career-navigator.vercel.app`

### Step 3: Custom Domain (optional)
- In Vercel dashboard → your project → Settings → Domains
- Add `careernavigator.publicpolicyindia.com` or any subdomain you own
- Vercel will give you DNS records to add to your domain registrar

---

## Run Locally (for testing/editing)

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

---

## Tech Stack
- **Next.js 14** (React framework)
- **Google Fonts** (Fraunces + Manrope)
- **No external dependencies** beyond React and Next.js
- **No database** — all data is embedded in the component (fast, no API calls)

---

## Capacity
Vercel's free tier handles:
- 100 GB bandwidth/month (~500K+ page loads)
- Serverless functions (not needed here but available)
- Global CDN (fast load times worldwide)
- Auto-scaling (handles traffic spikes from LinkedIn/Twitter)

For a LinkedIn post going viral, this is more than sufficient.
