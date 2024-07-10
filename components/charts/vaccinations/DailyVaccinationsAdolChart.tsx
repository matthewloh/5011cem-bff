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

type DailyVaccinationsAdolData = {
  id: number;
  date: string | null;
  daily_partial_adol: number | null;
  daily_full_adol: number | null;
  daily_booster_adol: number | null;
  daily_booster2_adol: number | null;
}[];

type DailyVaccinationsAdolChartProps = {
  data: DailyVaccinationsAdolData;
};

export default function DailyVaccinationsAdolChart({
  data,
}: DailyVaccinationsAdolChartProps) {
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
          dataKey="daily_partial_adol"
          name="Partial"
          stackId="a"
          fill="#0088FE"
        />
        <Bar dataKey="daily_full_adol" name="Full" stackId="a" fill="#00C49F" />
        <Bar
          dataKey="daily_booster_adol"
          name="Booster"
          stackId="a"
          fill="#FFBB28"
        />
        <Bar
          dataKey="daily_booster2_adol"
          name="Booster 2"
          stackId="a"
          fill="#FF8042"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
