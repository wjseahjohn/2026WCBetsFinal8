# ⚽ World Cup 2026 Family Bets

A family betting app for the 2026 FIFA World Cup with SGPools-style odds, virtual points, and a live leaderboard.

## Features
- 🗓 **48 Group Stage Matches** — Bet Win/Draw/Win with real odds
- 🏆 **Tournament Winner** — Pick the champion (14 teams)
- 👟 **Top Scorer** — Guess the Golden Boot winner
- 💰 **Points-based system** — Stake 10–500 pts, win based on odds
- 📋 **Personal bet history** — Track all your bets
- 🥇 **Family Leaderboard** — See who's up and who's down
- ⚙️ **Admin panel** — Set results at `/admin` to auto-settle bets

---

## 🚀 Deploy to Vercel (Step-by-Step)

### 1. Push to GitHub

```bash
cd worldcup-bets
git init
git add .
git commit -m "WC2026 family bets app"
gh repo create worldcup-bets --public --source=. --push
# Or: git remote add origin https://github.com/YOUR_USER/worldcup-bets.git && git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy**

### 3. Add Vercel KV (Database)

1. In your Vercel dashboard → your project → **Storage** tab
2. Click **Connect Store** → **KV** → **Create New**
3. Name it `wc2026-bets` → **Create & Connect**
4. Vercel auto-injects `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` env vars

### 4. Set Environment Variables

In Vercel → Project → **Settings** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `ADMIN_KEY` | A secret password of your choice (e.g. `famil@2026`) |

Redeploy after adding env vars (Vercel → Deployments → Redeploy).

---

## 📱 Usage

### For family members:
1. Open the app URL
2. Type your name and click **Let's Go**
3. Browse Matches / Winner / Top Scorer tabs
4. Click any odds button to add to your **Bet Slip**
5. Set your stake (10–500 points) per bet
6. Click **Place Bets** — done!

### For the admin (you):
1. Go to `/admin` on the app URL
2. Enter your `ADMIN_KEY`
3. After a match finishes, click the correct result
4. Bets settle automatically and points update on the leaderboard!

---

## 🏗 Local Development

```bash
npm install

# Create .env.local with your KV credentials from Vercel dashboard:
# KV_REST_API_URL=https://...
# KV_REST_API_TOKEN=...
# ADMIN_KEY=yourkey

npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Tech Stack
- **Next.js 14** (App Router)
- **Vercel KV** (Redis-backed persistence)
- **Tailwind CSS**
- **TypeScript**

## Points System
- Each player starts with unlimited virtual points to bet with
- Stake between **10 and 500 points** per bet
- Win = Stake × Odds (SGPools-style decimal odds)
- Leaderboard ranks by **net profit** (total won − total staked)
