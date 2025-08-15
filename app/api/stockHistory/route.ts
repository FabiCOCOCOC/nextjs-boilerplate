import { NextRequest, NextResponse } from 'next/server';
import yfinance from 'yahoo-finance2';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const historical = await yfinance.historical(symbol, {
      period1: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000), // 12 months
      period2: new Date(),
      interval: '1mo',
    });

    const historicalData = historical.map((data) => ({
      dates: data.date.toLocaleDateString('en-GB', {
        month: 'short'
      }),
      value: data.close,
    }));

    return NextResponse.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical data' }, 
      { status: 500 }
    );
  }
}