import yahooFinance from "yahoo-finance2";
import StockChart from "@/app/components/plotting";
import SingleInfoBox from "./components/SingleInfoBox";

export default async function Home() {
  const defaultMarkets = [{ code: "US" }, { code: "DE" }];

  const allMarkets = [];

  for (const market of defaultMarkets) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const trendingData = await yahooFinance.trendingSymbols(market.code); //here sometimes there is a await issue.

      if (
        trendingData &&
        trendingData.quotes &&
        trendingData.quotes.length > 0
      ) {
        const topStock = trendingData.quotes[0];
        allMarkets.push({
          symbol: topStock.symbol,
          name: topStock.symbol,
          marketCode: market.code,
        });
      }
    } catch (error) {
      console.error(
        `Error fetching trending symbols for ${market.code}:`,
        error
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-16">Trending Stocks</h1>

      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-8" style={{ width: "max-content" }}>
          {allMarkets.map((market, index) => (
            <div key={market.symbol}>
              <h2 className="text-xl font-semibold">{market.marketCode}</h2>
              <StockChart symbol={market.symbol} stockName={market.name} />
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-4xl font-bold">Global Indices</h1>
      <SingleInfoBox market={"US"} />
    </div>
  );
}
