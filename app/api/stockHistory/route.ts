import { Percent } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import yfinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const selectedPeriod = searchParams.get("period") || "1y";

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const oneDay = 24 * 60 * 60 * 1000;
  //TODO add return days sometimes it has 28 30 0r 31 days

  const periodMap: Record<
    string,
    {
      period: Date;
      interval:
        | "2m"
        | "90m"
        | "60m"
        | "30m"
        | "1d"
        | "1wk"
        | "1mo"
        | "1h"
        | "3mo"
        | undefined;
    }
  > = {
    "1d": {
      period: new Date(Date.now() - oneDay),
      interval: "1h",
    },

    "1wk": {
      period: new Date(Date.now() - 7 * oneDay),
      interval: "1d",
    },
    "1mo": {
      period: new Date(Date.now() - 30 * oneDay),
      interval: "1d",
    },
    "6mo": {
      period: new Date(Date.now() - 6 * 30 * oneDay),
      interval: "1wk",
    },

    "1y": {
      period: new Date(Date.now() - 365 * oneDay),
      interval: "1mo",
    },
    "5y": {
      period: new Date(Date.now() - 5 * 365 * oneDay),
      interval: "1mo",
    },
    max: {
      period: new Date(Date.now() - 200 * 365 * oneDay), //200 years max
      interval: "3mo",
    },
  };

  const config = periodMap[selectedPeriod] || periodMap["1y"];

  const historical = await yfinance.chart(symbol, {
    period1: config.period,
    period2: new Date(),
    interval: config.interval,
  });

  const firstDataPoint = historical.quotes[0];
  const lastDataPoint = historical.quotes[historical.quotes.length - 1];

  const historicalData = historical.quotes.map((data) => ({
    dates:
      selectedPeriod === "1d"
        ? data.date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : data.date.toLocaleDateString("en-GB"),
    value: data.close !== null ? data.close.toFixed(2) : null,
    percentage:
      data.close !== null && firstDataPoint.close !== null
        ? (data.close / firstDataPoint.close).toFixed(2)
        : null,
  }));

  return NextResponse.json(historicalData);
}
