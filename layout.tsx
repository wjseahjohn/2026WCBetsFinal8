// app/api/matches/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getResults, setResult } from '@/lib/db';
import { GROUP_STAGE_MATCHES, TOURNAMENT_WINNER_BETS, TOP_SCORER_BETS } from '@/lib/matches';

export async function GET() {
  const results = await getResults();
  return NextResponse.json({ matches: GROUP_STAGE_MATCHES, results, tournamentWinners: TOURNAMENT_WINNER_BETS, topScorers: TOP_SCORER_BETS });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { targetId, result, adminKey } = body;

  // Simple admin protection via env variable
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await setResult(targetId, result);
  return NextResponse.json({ success: true });
}
