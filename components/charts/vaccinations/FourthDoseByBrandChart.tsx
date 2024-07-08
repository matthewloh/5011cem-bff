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

type FourthDoseByBrandData = {
  date: string | null;
  pfizer4: number | null;
  sinovac4: number | null;
  astra4: number | null;
  sinopharm4: number | null;
  cansino4: number | null;
  pending4: number | null;
}[];

type FourthDoseByBrandChartProps = {
  data: FourthDoseByBrandData;
};

export default function FourthDoseByBrandChart({ data }: FourthDoseByBrandChartProps) {
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
          dataKey="pfizer4"
          name="Pfizer"
          stroke="#0088FE"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinovac4"
          name="Sinovac"
          stroke="#00C49F"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="astra4"
          name="AstraZeneca"
          stroke="#FFBB28"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="sinopharm4"
          name="Sinopharm"
          stroke="#FF8042"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cansino4"
          name="Cansino"
          stroke="#8884d8"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="pending4"
          name="Pending"
          stroke="#777777"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
