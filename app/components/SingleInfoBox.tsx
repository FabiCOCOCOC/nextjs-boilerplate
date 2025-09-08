"use client";
import React, { useEffect, useState } from "react";

const US: MarketData[] = [
  { name: "S&P 500", symbol: "^GSPC", price: 0 },
  { name: "Dow Jones", symbol: "^DJI", price: 0 },
  { name: "NASDAQ", symbol: "^IXIC", price: 0 },
  { name: "VIX", symbol: "^VIX", price: 0 },
  { name: "Russell 2000", symbol: "^RUT", price: 0 },
];

interface MarketData {
  symbol: string;
  name: string;
  price: number;
}

export default function SingleInfoBox({ market }: { market: string }) {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<MarketData[]>([]);

  useEffect(() => {
    switch (market) {
      case "US":
        setSelectedMarket(US);
        break;
    }
  }, [market]);

  useEffect(() => {
    if (selectedMarket.length === 0) return;

    const fetchData = async () => {
      try {
        const fetchPromises = selectedMarket.map(async (item) => {
          const response = await fetch(
            `/api/stockHistory?symbol=${item.symbol}&period=1wk`
          );
          const data = await response.json();
          return {
            symbol: item.symbol,
            name: item.name,
            price: data.price ?? item.price,
          };
        });

        const results = await Promise.all(fetchPromises);
        setMarketData(results);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, [selectedMarket]);

  return (
    <div className="bg-white w-full max-w-xl min-h-[250px] p-10 rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-lg font-bold mb-4 text-left">{market}</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Symbol</th>
                <th className="text-right py-3 px-4 font-semibold">Price</th>
                <th className="text-right py-3 px-4 font-semibold">%</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item) => (
                <tr
                  key={item.symbol}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-blue-600 font-medium">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-right">{item.price}</td>
                  <td className="py-3 px-4 text-right text-green-500">
                    +0.00%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
