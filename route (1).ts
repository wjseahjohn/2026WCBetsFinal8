/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --pitch: #071f10;
  --grass: #0d3d1c;
  --grass-mid: #145c2a;
  --grass-light: #1a7a38;
  --gold: #f5c842;
  --gold-dim: #c9a032;
  --amber: #e8901a;
  --red: #d93a2b;
  --chalk: #f0ede4;
  --chalk-dim: #b8b5ac;
  --card-bg: rgba(255,255,255,0.05);
  --card-border: rgba(255,255,255,0.10);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body), sans-serif;
  background-color: var(--pitch);
  color: var(--chalk);
  min-height: 100vh;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 60px,
      rgba(255,255,255,0.015) 60px,
      rgba(255,255,255,0.015) 120px
    );
}

/* Pitch stripe background */
.pitch-bg {
  background:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 80px,
      rgba(255,255,255,0.012) 80px,
      rgba(255,255,255,0.012) 160px
    ),
    linear-gradient(180deg, var(--pitch) 0%, var(--grass) 100%);
}

/* Card styles */
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(8px);
  border-radius: 12px;
}

.card-hover {
  transition: all 0.2s ease;
}
.card-hover:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(245,200,66,0.3);
  transform: translateY(-2px);
}

/* Odds badge */
.odds-badge {
  font-family: var(--font-display);
  letter-spacing: 0.05em;
}

/* Tab styles */
.tab-active {
  background: var(--gold);
  color: var(--pitch);
}

/* Gold text */
.text-gold { color: var(--gold); }
.text-amber { color: var(--amber); }
.text-chalk { color: var(--chalk); }
.text-chalk-dim { color: var(--chalk-dim); }

/* Selection highlight */
.selected-home { border-color: #4ade80 !important; background: rgba(74,222,128,0.12) !important; }
.selected-draw { border-color: var(--gold) !important; background: rgba(245,200,66,0.12) !important; }
.selected-away { border-color: #f87171 !important; background: rgba(248,113,113,0.12) !important; }
.selected-pick { border-color: var(--gold) !important; background: rgba(245,200,66,0.12) !important; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }

/* Input styles */
input, select {
  font-family: var(--font-body), sans-serif;
}

/* Animation utilities */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.animate-slide-up { animation: slideUp 0.4s ease forwards; }
.animate-fade-in { animation: fadeIn 0.3s ease forwards; }

.gold-shimmer {
  background: linear-gradient(90deg, var(--gold), #fff8d0, var(--gold));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

/* Bet slip */
.bet-slip {
  background: linear-gradient(135deg, #1a2f1e 0%, #0d1f10 100%);
  border: 1px solid rgba(245,200,66,0.3);
}

/* Rank medals */
.rank-1 { color: #ffd700; }
.rank-2 { color: #c0c0c0; }
.rank-3 { color: #cd7f32; }
