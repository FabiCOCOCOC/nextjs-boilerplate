//Shows the infos of the designated stock!
import yfinance from 'yahoo-finance2';
import StockChart from '@/app/components/plotting';
import InfoBox from '@/app/components/InfoBox';

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
                <InfoBox StockData={stockData} />
                <div className = "mt-8">    {/* distance between the chart and the infos  */}
                    put here later the plottingn 
                    <StockChart symbol={symbol} stockName={stockData.longName} />
                </div>
        </div>
    </div>

    );
}