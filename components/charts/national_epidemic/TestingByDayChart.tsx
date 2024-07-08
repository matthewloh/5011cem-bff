"use client";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TestingByDayChartProps = {
  data: {
    id: number;
    date: string | null;
    rtk_ag: number | null;
    pcr: number | null;
  }[];
};

export default function TestingByDayChart({ data }: TestingByDayChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="hsl(var(--primary))" />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          stroke="hsl(var(--primary))"
        />
        <Tooltip />
        <Legend />
        <Line
          dot={false}
          type="monotone"
          dataKey="pcr"
          name="RT-PCR Tests"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="rtk_ag"
          name="RTK-AG Tests"
          stroke="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
