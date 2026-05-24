// app/api/bets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllBets, addBet } from '@/lib/db';

export async function GET() {
  const bets = await getAllBets();
  return NextResponse.json(bets);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { playerName, betType, targetId, selection, odds, stake } = body;

  if (!playerName || !betType || !targetId || !selection || !odds || !stake) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (stake < 10 || stake > 500) {
    return NextResponse.json({ error: 'Stake must be between 10 and 500 points' }, { status: 400 });
  }

  const bet = await addBet({
    playerName: playerName.trim(),
    betType,
    targetId,
    selection,
    odds,
    stake,
    potentialWin: Math.round(stake * odds),
  });

  return NextResponse.json(bet, { status: 201 });
}
