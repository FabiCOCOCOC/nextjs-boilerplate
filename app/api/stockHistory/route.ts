import { NextRequest, NextResponse } from "next/server";
import yfinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const selectedPeriod = searchParams.get("period") || "1y";

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const periodMap: Record<
    string,
    { period: Date; interval: "1d" | "1wk" | "1mo" | undefined }
  > = {
    "1d": {
      period: new Date(Date.now() - 24 * 60 * 60 * 1000),
      interval: "1d",
    },

    "1w": {
      period: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      interval: "1wk",
    },
    "1mo": {
      period: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      interval: "1mo",
    },
    "1y": {
      period: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      interval: "1mo",
    },
  };

  const config = periodMap[selectedPeriod] || periodMap["1y"];

  const historical = await yfinance.chart(symbol, {
    period1: config.period,
    period2: new Date(),
    interval: config.interval,
  });

  const historicalData = historical.quotes.map((data) => ({
    dates: data.date.toLocaleDateString("en-GB", {
      month: "short",
    }),
    value: data.close,
  }));

  return NextResponse.json(historicalData);
}
