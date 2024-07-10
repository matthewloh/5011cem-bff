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

type DailyVaccinationsChildData = {
  id: number;
  date: string | null;
  daily_partial_child: number | null;
  daily_full_child: number | null;
  daily_booster_child: number | null;
  daily_booster2_child: number | null;
}[];

type DailyVaccinationsChildChartProps = {
  data: DailyVaccinationsChildData;
};

export default function DailyVaccinationsChildChart({
  data,
}: DailyVaccinationsChildChartProps) {
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
          dataKey="daily_partial_child"
          name="Partial"
          stackId="a"
          fill="#0088FE"
        />
        <Bar
          dataKey="daily_full_child"
          name="Full"
          stackId="a"
          fill="#00C49F"
        />
        <Bar
          dataKey="daily_booster_child"
          name="Booster"
          stackId="a"
          fill="#FFBB28"
        />
        <Bar
          dataKey="daily_booster2_child"
          name="Booster 2"
          stackId="a"
          fill="#FF8042"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
