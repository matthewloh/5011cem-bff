"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DailyVaccinationDoseData = {
  id: number;
  date: string | null;
  daily_partial: number | null;
  daily_full: number | null;
  daily_booster: number | null;
  daily_booster2: number | null;
}[];

type DailyVaccinationDoseChartProps = {
  data: DailyVaccinationDoseData;
};

export default function DailyVaccinationDoseChart({
  data,
}: DailyVaccinationDoseChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="hsl(var(--primary))" />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          width={85}
          stroke="hsl(var(--primary))"
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="daily_partial"
          name="Partial"
          stackId="a"
          fill="#0088FE"
        />
        <Bar dataKey="daily_full" name="Full" stackId="a" fill="#00C49F" />
        <Bar
          dataKey="daily_booster"
          name="Booster"
          stackId="a"
          fill="#FFBB28"
        />
        <Bar
          dataKey="daily_booster2"
          name="Booster 2"
          stackId="a"
          fill="#FF8042"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
