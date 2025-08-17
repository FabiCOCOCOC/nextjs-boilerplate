"use client";
import React from "react";

interface StockData {
  longName?: string;
  fullExchangeName?: string;
  regularMarketPrice?: number;
  currency?: string;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
}

interface InfoBoxProps {
  StockData: StockData;
}

export default function InfoBox({ StockData }: InfoBoxProps) {
  return (
    <div className="bg-white w-full max-w-4xl min-h-[250px] p-10 rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-lg font-bold mb-0 text-left">
          {StockData.longName} {StockData.fullExchangeName}
        </h1>
        <p className="pt-8">
          <span className="text-3xl">{StockData.regularMarketPrice}</span>
          <span className="text-gray-600 mr-20">{StockData.currency}</span>
          {typeof StockData.regularMarketChange === "number" ? (
            <span
              className={
                StockData.regularMarketChange < 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              <span className="text-3xl">
                {" "}
                {StockData.regularMarketChange < 0 ? "" : "+"}
                {StockData.regularMarketChange}
              </span>
              <span className="mr-20">{StockData.currency}</span>
            </span>
          ) : null}
          {typeof StockData.regularMarketChangePercent === "number" ? (
            <span
              className={
                StockData.regularMarketChangePercent < 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              <span className="text-3xl">
                {" "}
                {StockData.regularMarketChangePercent < 0 ? "" : "+"}
                {StockData.regularMarketChangePercent}
              </span>
              <span className="mr-20">%</span>
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
