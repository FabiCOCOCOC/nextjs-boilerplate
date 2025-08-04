//Shows the infos of the designated stock!
import yfinance from 'yahoo-finance2';
//import ApiTest from '@/tests/ApiTest';


interface StockInfoPageProps {
    params: Promise<{
        symbol: string;
    }>;
}

export default async function StockInfoPage({ params }: StockInfoPageProps) {
    const { symbol } = await params;
    const stockData = await yfinance.quote(symbol);

    return (
        <div>
    <div className="bg-gray-200 min-h-screen flex flex-col items-center pt-8">
        <div className="bg-white w-full max-w-4xl min-h-[250px] p-10 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h1 className="text-lg font-bold mb-0 text-left">{stockData.longName?.toUpperCase()}</h1>
                    <p className="pt-8">
                        <span className="text-3xl">{stockData?.regularMarketPrice}</span>
                        <span className="text-gray-600 mr-20">{stockData?.currency}</span>
                        {typeof stockData?.regularMarketChange === 'number' ? (
                            <span className={stockData.regularMarketChange < 0 ? 'text-red-500' : 'text-green-500'}>
                                <span className="text-3xl"> {stockData.regularMarketChange < 0 ? "" : "+"}{stockData.regularMarketChange}</span>
                                <span className="mr-20">{stockData.currency}</span>
                            </span>
                        ) : null}
                    </p>
                </div>
            </div>
        </div>
    </div>

    );
}