import { NextRequest, NextResponse } from "next/server";
import yfinance from "yahoo-finance2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const result = await yfinance.search(query);

    const suggestions = result.quotes.slice(0, 11).map((quote: any) => ({
      name: quote.shortname,
      symbol: quote.symbol,
    }));

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
