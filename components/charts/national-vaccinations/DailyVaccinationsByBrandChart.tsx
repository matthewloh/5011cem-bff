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

type DailyVaccinationsByBrandData = {
  date: string | null;
  pfizer: number | null;
  sinovac: number | null;
  astra: number | null;
  sinopharm: number | null;
  cansino: number | null;
  pending: number | null;
}[];

type DailyVaccinationsByBrandChartProps = {
  data: DailyVaccinationsByBrandData;
};

export default function DailyVaccinationsByBrandChart({ data }: DailyVaccinationsByBrandChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <LineChart data={data}>
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
        <Line
          dot={false}
          type="monotone"
          dataKey="pfizer"
          name="Pfizer"
          stroke="#0088FE"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinovac"
          name="Sinovac"
          stroke="#00C49F"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="astra"
          name="AstraZeneca"
          stroke="#FFBB28"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinopharm"
          name="Sinopharm"
          stroke="#FF8042"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cansino"
          name="Cansino"
          stroke="#8884d8"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="pending"
          name="Pending"
          stroke="#777777"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
