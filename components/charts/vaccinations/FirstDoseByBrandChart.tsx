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

type FirstDoseByBrandData = {
  date: string | null;
  pfizer1: number | null;
  sinovac1: number | null;
  astra1: number | null;
  sinopharm1: number | null;
  cansino: number | null;
  pending1: number | null;
}[];

type FirstDoseByBrandChartProps = {
  data: FirstDoseByBrandData;
};

export default function FirstDoseByBrandChart({ data }: FirstDoseByBrandChartProps) {
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
          stroke="hsl(var(--primary))"
        />
        <Tooltip />
        <Legend />
        <Line
          dot={false}
          type="monotone"
          dataKey="pfizer1"
          name="Pfizer"
          stroke="#0088FE"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinovac1"
          name="Sinovac"
          stroke="#00C49F"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="astra1"
          name="AstraZeneca"
          stroke="#FFBB28"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinopharm1"
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
          dataKey="pending1"
          name="Pending"
          stroke="#777777"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
