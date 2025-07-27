export interface StockSearchResult {
    name: string;
    symbol: string;
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    currentPrice: number;
    volume: number;
    change: number;
    changePercent: number;
}

async function APICall(query: string): Promise<StockSearchResult> {
    const result = await fetch(`/api/stocks?query=${query}`);

    if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
    }
    
    const data = await result.json();
        
    return {
        ...data,
        date: new Date(data.date)
    };
}

export default APICall;