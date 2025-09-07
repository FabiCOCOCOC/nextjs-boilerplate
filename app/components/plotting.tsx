"use client";
import React, { useEffect, useState } from "react";

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
  options?: {
    viewPercentage: boolean;
  };
}

type TimePeriod = "1d" | "1wk" | "1mo" | "6mo" | "1y" | "5y" | "max";

export default function StockChart({
  symbol,
  stockName,
  options,
}: StockChartProps) {
  const [historicalData, setHistoricalData] = useState<StockChartData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1y");
  const [showPercentage, setShowPercentage] = useState<boolean>(false);

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
    <div className="bg-white w-full max-w-screen-xl min-w-0 min-h-[400px] md:min-h-[650px] p-4 md:p-10 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4"> {stockName}</h3>
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            showPercentage ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowPercentage(!showPercentage)}
        >
          {showPercentage ? "Hide" : "Show"} % Change
        </button>
      </div>
      <div className="flex space-x-2">
        {timePeriods.map((period) => (
          <button
            key={period.value}
            className={`px-4 py-2 rounded-md ${
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
      <div className="w-full h-64">
        <ResponsiveContainer width={500} height={500}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="dates"
              angle={-45}
              textAnchor="end"
              height={80}
              interval="preserveStartEnd"
            />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip formatter={(value) => [`Value: ${value}`, "USD"]} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              stroke="#001effff"
            />
            {showPercentage && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="percentage"
                stroke="#ff0000ff"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
