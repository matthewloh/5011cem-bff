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

type SecondDoseByBrandData = {
  date: string | null;
  pfizer2: number | null;
  sinovac2: number | null;
  astra2: number | null;
  sinopharm2: number | null;
  cansino: number | null;
  pending2: number | null;
}[];

type SecondDoseByBrandChartProps = {
  data: SecondDoseByBrandData;
};

export default function SecondDoseByBrandChart({ data }: SecondDoseByBrandChartProps) {
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
          dataKey="pfizer2"
          name="Pfizer"
          stroke="#0088FE"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinovac2"
          name="Sinovac"
          stroke="#00C49F"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="astra2"
          name="AstraZeneca"
          stroke="#FFBB28"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinopharm2"
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
          dataKey="pending2"
          name="Pending"
          stroke="#777777"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
