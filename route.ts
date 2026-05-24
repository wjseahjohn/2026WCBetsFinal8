'use client';

import { useState, useEffect } from 'react';
import type { Match } from '@/lib/matches';
import type { TournamentBet, TopScorerBet } from '@/lib/matches';

interface AppData {
  matches: Match[];
  tournamentWinners: TournamentBet[];
  topScorers: TopScorerBet[];
  results: Record<string, string>;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<AppData | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (authed) {
      fetch('/api/matches').then(r => r.json()).then(setData);
    }
  }, [authed]);

  async function setResult(targetId: string, result: string, label: string) {
    setSaving(targetId);
    const res = await fetch('/api/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetId, result, adminKey }),
    });
    setSaving(null);
    if (res.ok) {
      setMsg(`✅ Result set: ${label} → ${result}`);
      const fresh = await fetch('/api/matches').then(r => r.json());
      setData(fresh);
      setTimeout(() => setMsg(''), 3000);
    } else {
      setMsg('❌ Failed. Check admin key.');
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen pitch-bg flex items-center justify-center p-4">
        <div className="card p-8 max-w-sm w-full text-center">
          <h1 className="font-display text-3xl text-gold mb-6 tracking-wider">🔐 ADMIN</h1>
          <input
            type="password"
            placeholder="Admin key..."
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-pitch mb-4"
            style={{ background: 'var(--chalk)' }}
          />
          <button
            onClick={() => { if (adminKey) setAuthed(true); }}
            className="w-full py-3 rounded-lg font-display text-xl tracking-wider"
            style={{ background: 'var(--gold)', color: 'var(--pitch)' }}
          >
            ENTER
          </button>
          <p className="text-xs text-chalk-dim mt-4">Set ADMIN_KEY in your Vercel environment variables</p>
        </div>
      </div>
    );
  }

  const GROUPS = ['A','B','C','D','E','F','G','H'];

  return (
    <div className="min-h-screen pitch-bg p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-gold tracking-wider mb-2">⚙️ ADMIN PANEL</h1>
        <p className="text-chalk-dim mb-6 text-sm">Set match results to auto-settle bets and update points</p>

        {msg && (
          <div className="mb-4 p-3 rounded-xl text-sm font-semibold" style={{ background: msg.startsWith('✅') ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)', color: msg.startsWith('✅') ? '#4ade80' : '#f87171', border: `1px solid ${msg.startsWith('✅') ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}` }}>
            {msg}
          </div>
        )}

        <h2 className="font-display text-2xl text-gold tracking-wider mb-4">MATCHES</h2>
        {GROUPS.map(g => (
          <div key={g} className="mb-6">
            <h3 className="font-display text-lg text-chalk-dim mb-2 tracking-wider">GROUP {g}</h3>
            <div className="space-y-2">
              {data?.matches.filter(m => m.group === g).map(match => {
                const result = data.results[match.id];
                return (
                  <div key={match.id} className="card p-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm font-semibold text-chalk">
                        {match.homeFlag} {match.homeTeam} vs {match.awayFlag} {match.awayTeam}
                      </span>
                      {result ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
                          ✓ {result === 'home' ? match.homeTeam : result === 'away' ? match.awayTeam : 'Draw'}
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          {(['home', 'draw', 'away'] as const).map(sel => (
                            <button
                              key={sel}
                              onClick={() => setResult(match.id, sel, `${match.homeTeam} vs ${match.awayTeam}`)}
                              disabled={saving === match.id}
                              className="px-3 py-1 rounded-lg text-xs font-semibold text-pitch transition-all"
                              style={{ background: sel === 'home' ? '#4ade80' : sel === 'draw' ? 'var(--gold)' : '#f87171' }}
                            >
                              {sel === 'home' ? match.homeTeam : sel === 'draw' ? 'Draw' : match.awayTeam}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <h2 className="font-display text-2xl text-gold tracking-wider mb-4">TOURNAMENT WINNER</h2>
        <div className="card p-4 mb-6">
          {data?.results['tw_final'] ? (
            <p className="text-green-400 font-semibold">✓ Winner set: {data.results['tw_final']}</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {data?.tournamentWinners.map(tw => (
                <button
                  key={tw.id}
                  onClick={() => setResult(tw.id, tw.team, 'Tournament Winner')}
                  className="p-2 rounded-lg text-sm font-semibold text-pitch text-center"
                  style={{ background: 'var(--gold)' }}
                >
                  {tw.flag} {tw.team}
                </button>
              ))}
            </div>
          )}
        </div>

        <h2 className="font-display text-2xl text-gold tracking-wider mb-4">TOP SCORER</h2>
        <div className="card p-4">
          <div className="grid grid-cols-2 gap-2">
            {data?.topScorers.map(ts => {
              const result = data.results[ts.id];
              return (
                <button
                  key={ts.id}
                  onClick={() => !result && setResult(ts.id, ts.player, 'Top Scorer')}
                  disabled={!!result}
                  className="p-2 rounded-lg text-sm font-semibold text-pitch text-left flex items-center gap-2"
                  style={{ background: result ? '#4ade80' : 'var(--gold)', opacity: result ? 0.7 : 1 }}
                >
                  <span>{ts.flag}</span>
                  <span className="truncate">{ts.player}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
