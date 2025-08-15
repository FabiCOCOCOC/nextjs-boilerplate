import yahooFinance from "yahoo-finance2";
import StockChart from "@/app/components/plotting";




export default async function Home() {

  const defaultMarkets = [
    { code: "US"},
    { code: "DE"},
    { code: "JP"}
  ]


  return (
    <div className = "flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">
      Trending Stocks 
      </h1>

              <div className="overflow-x-auto pb-6">
          <div className="flex space-x-8" style={{ width: 'max-content' }}>
        
          </div>
          </div>
      

    </div>
  );
}

