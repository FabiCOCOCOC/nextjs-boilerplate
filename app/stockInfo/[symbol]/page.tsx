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
                <div className="bg-white w-full max-w-2xl p-10 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-lg font-bold mb-4">{symbol.toUpperCase()}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}