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
  ResponsiveContainer
} from 'recharts';

type CumulVaccinationsChildData = {
  id: number;
  date: string | null;
  cumul_partial_child: number | null;
  cumul_full_child: number | null;
  cumul_booster_child: number | null;
  cumul_booster2_child: number | null;
}[];

type CumulVaccinationsChildChartProps = {
  data: CumulVaccinationsChildData;
};

export default function CumulVaccinationsChildChart({ data }: CumulVaccinationsChildChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          stroke="hsl(var(--primary))"
        />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          width={85}
          stroke="hsl(var(--primary))"
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="cumul_partial_child"
          name="Partial"
          stackId="a"
          fill="#0088FE"
        />
        <Bar
          dataKey="cumul_full_child"
          name="Full"
          stackId="a"
          fill="#00C49F"
        />
        <Bar
          dataKey="cumul_booster_child"
          name="Booster"
          stackId="a"
          fill="#FFBB28"
        />
        <Bar
          dataKey="cumul_booster2_child"
          name="Booster 2"
          stackId="a"
          fill="#FF8042"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
