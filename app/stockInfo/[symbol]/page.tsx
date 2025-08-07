//Shows the infos of the designated stock!
import yfinance from 'yahoo-finance2';
import StockChart from '@/lib/plotting';
//import ApiTest from '@/tests/ApiTest';


interface StockInfoPageProps {
    params: Promise<{
        symbol: string;
    }>;
}

export default async function StockInfoPage({ params }: StockInfoPageProps) {
    const { symbol } = await params;
    const stockData = await yfinance.quote(symbol);

    const historical = await yfinance.historical(symbol, {
        period1: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000),
        period2: new Date(),
        interval: '1mo',
    });

    const historicalData = historical.map((data) => ({
        dates: data.date.toLocaleDateString('en-GB', {
            month: 'short'
        }),
        value: data.close,
    }));

    return (
    <div>
    <div className="bg-gray-200 min-h-screen flex flex-col items-center pt-8">
        <div className="bg-white w-full max-w-4xl min-h-[250px] p-10 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h1 className="text-lg font-bold mb-0 text-left">{stockData.longName?.toUpperCase()} {stockData.fullExchangeName}</h1>
                    <p className="pt-8">
                        <span className="text-3xl">{stockData?.regularMarketPrice}</span>
                        <span className="text-gray-600 mr-20">{stockData?.currency}</span>
                        {typeof stockData?.regularMarketChange === 'number' ? (
                            <span className={stockData.regularMarketChange < 0 ? 'text-red-500' : 'text-green-500'}>
                                <span className="text-3xl"> {stockData.regularMarketChange < 0 ? "" : "+"}{stockData.regularMarketChange}</span>
                                <span className="mr-20">{stockData.currency}</span>
                            </span>
                        ) : null}
                        {typeof stockData?.regularMarketChangePercent === 'number' ? (
                        <span className={stockData.regularMarketChangePercent < 0 ? 'text-red-500' : 'text-green-500'}>
                                <span className="text-3xl"> {stockData.regularMarketChangePercent < 0 ? "" : "+"}{stockData.regularMarketChangePercent}</span>
                                <span className="mr-20">%</span>
                        </span>
                        ) : null}
                    </p>
                </div>
            </div>
                <div className = "mt-8">    {/* distance between the chart and the infos  */}
                    <StockChart data={historicalData} />
                </div>
        </div>
    </div>

    );
}