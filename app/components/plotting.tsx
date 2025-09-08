"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface StockChartData {
  dates: string;
  value: number;
  percentage?: number;
}

interface StockChartProps {
  symbol: string;
  stockName?: string;
}

type TimePeriod = "1d" | "1wk" | "1mo" | "6mo" | "1y" | "5y" | "max";

export default function StockChart({ symbol, stockName }: StockChartProps) {
  const [historicalData, setHistoricalData] = useState<StockChartData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1y");

  const timePeriods = [
    { label: "1d", value: "1d" },
    { label: "1w", value: "1wk" },
    { label: "1m", value: "1mo" },
    { label: "6m", value: "6mo" },
    { label: "1y", value: "1y" },
    { label: "5y", value: "5y" },
    { label: "max", value: "max" },
  ] as const;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/stockHistory?symbol=${symbol}&period=${selectedPeriod}`
      );
      const data = await response.json();
      setHistoricalData(data);
    };

    fetchData();
  }, [symbol, selectedPeriod]);

  const periodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="bg-white w-full max-w-screen-xl min-w-0 min-h-[300px] md:min-h-[650px] p-2 md:p-10 rounded-lg shadow-lg">
      <Link href={`/stockInfo/${symbol}`}>
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">
          {" "}
          {stockName}
        </h3>
      </Link>

      <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4 overflow-x-auto">
        {timePeriods.map((period) => (
          <button
            key={period.value}
            className={`px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md ${
              selectedPeriod === period.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => periodChange(period.value)}
          >
            {period.label}
          </button>
        ))}
      </div>
      <div className="w-full h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="dates"
              angle={-45}
              textAnchor="end"
              height={60}
              interval="preserveStartEnd"
              fontSize={10}
            />
            <YAxis yAxisId="left" orientation="left" fontSize={10} />
            <YAxis yAxisId="right" orientation="right" fontSize={10} />

            <Tooltip
              formatter={(value: any, name: string) => {
                const baseValue = historicalData[0]?.value || 1;
                const percentageValue = (value / baseValue - 1).toFixed(2);

                return [
                  <div key="tooltip" className="text-xs">
                    <div>Price: ${value}</div>
                    <div>Change: {percentageValue}%</div>
                  </div>,
                ];
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              stroke="#001effff"
              strokeWidth={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
