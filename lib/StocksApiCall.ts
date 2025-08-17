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

export interface StockSuggestion {
  name: string;
  symbol: string;
}

async function getStockSuggestions(query: string): Promise<StockSuggestion[]> {
  const result = await fetch(`/api/AutoCompletion?query=${query}`);
  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }
  const suggestions: StockSuggestion[] = await result.json();
  return suggestions;
}

export default getStockSuggestions;
