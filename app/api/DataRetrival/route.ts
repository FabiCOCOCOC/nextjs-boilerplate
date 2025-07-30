import { NextRequest, NextResponse } from "next/server";
import yfinance from 'yahoo-finance2';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    
    if (!query) {
        return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }
    
    try {
        const result = await yfinance.quote(query);
        
        const stockData = {
            name: result.longName,
            symbol: result.symbol,
            date: result.regularMarketTime ? new Date(Number(result.regularMarketTime) * 1000) : new Date(),
            open: result.regularMarketOpen ?? 0,
            high: result.regularMarketDayHigh ?? 0,
            low: result.regularMarketDayLow ?? 0,
            close: result.regularMarketPreviousClose ?? 0,
            currentPrice: result.regularMarketPrice ?? 0,
            volume: result.regularMarketVolume ?? 0,
            change: result.regularMarketChange ?? 0,
            changePercent: result.regularMarketChangePercent ?? 0
        };
        
        return NextResponse.json(stockData);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
    }
}
