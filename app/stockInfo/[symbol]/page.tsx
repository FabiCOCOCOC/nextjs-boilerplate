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
            Test PAGE
            stockdata: {JSON.stringify(stockData)}
            <br />
        </div>
    );
}