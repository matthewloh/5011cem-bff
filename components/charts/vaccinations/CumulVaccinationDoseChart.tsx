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

type CumulVaccinationDoseData = {
  id: number;
  date: string | null;
  cumul_partial: number | null;
  cumul_full: number | null;
  cumul_booster: number | null;
  cumul_booster2: number | null;
}[];

type CumulVaccinationDoseChartProps = {
  data: CumulVaccinationDoseData;
};

export default function CumulVaccinationDoseChart({ data }: CumulVaccinationDoseChartProps) {
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
          dataKey="cumul_partial"
          name="Partial"
          stackId="a"
          fill="#0088FE"
        />
        <Bar
          dataKey="cumul_full"
          name="Full"
          stackId="a"
          fill="#00C49F"
        />
        <Bar
          dataKey="cumul_booster"
          name="Booster"
          stackId="a"
          fill="#FFBB28"
        />
        <Bar
          dataKey="cumul_booster2"
          name="Booster 2"
          stackId="a"
          fill="#FF8042"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
