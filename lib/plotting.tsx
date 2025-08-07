'use client';
import React, { useEffect, useState } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from 'recharts';

interface StockChartData {
  dates: string;
  value: number;
}

interface StockChartProps {
  data: StockChartData[];
}

export default function StockChart({ data }: StockChartProps) {
  return (
    <div className="bg-white w-full max-w-screen-xl min-w-0 min-h-[400px] md:min-h-[650px] p-4 md:p-10 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4"> -chart</h3>
      <div className="w-full h-64">
      <ResponsiveContainer width={500} height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
        dataKey="dates" 
        angle = {-45}
        textAnchor="end"
        height={80}
        interval = "preserveStartEnd"
        />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`Value: ${value}`, 'USD']}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>    
    </div>
    </div>
  );
}
