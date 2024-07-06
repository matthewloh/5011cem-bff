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

type ThirdDoseByBrandData = {
  date: string | null;
  pfizer3: number | null;
  sinovac3: number | null;
  astra3: number | null;
  sinopharm3: number | null;
  cansino3: number | null;
  pending3: number | null;
}[];

type ThirdDoseByBrandChartProps = {
  data: ThirdDoseByBrandData;
};

export default function ThirdDoseByBrandChart({ data }: ThirdDoseByBrandChartProps) {
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
          dataKey="pfizer3"
          name="Pfizer"
          stroke="#0088FE"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinovac3"
          name="Sinovac"
          stroke="#00C49F"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="astra3"
          name="AstraZeneca"
          stroke="#FFBB28"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinopharm3"
          name="Sinopharm"
          stroke="#FF8042"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cansino3"
          name="Cansino"
          stroke="#8884d8"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="pending3"
          name="Pending"
          stroke="#777777"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
