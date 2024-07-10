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

type TotalVaccinationsData = {
  date: string | null;
  daily: number | null;
  cumul: number | null;
}[];

type TotalVaccinationsChartProps = {
  data: TotalVaccinationsData;
};

export default function TotalVaccinationsChart({
  data,
}: TotalVaccinationsChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="hsl(var(--primary))" />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          width={95}
          stroke="hsl(var(--primary))"
        />
        <Tooltip />
        <Legend />
        <Line
          dot={false}
          type="monotone"
          dataKey="daily"
          name="Daily New Vaccinations"
          stroke="#0088FE"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cumul"
          name="Cumulative Vaccinations"
          stroke="#00C49F"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
