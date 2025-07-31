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
                <div className="flex justify-start items-start mb-6">
                    <h1 className="text-lg font-bold mb-0 text-left">{stockData.longName?.toUpperCase()}</h1>
                </div>
            </div>
        </div>
    </div>

    );
}