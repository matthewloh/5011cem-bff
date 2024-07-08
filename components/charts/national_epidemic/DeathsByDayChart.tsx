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

type TestingByDayChartProps = {
  data: {
    id: number;
    date: string;
    deaths_new: number | null;
    deaths_bid: number | null;
    deaths_new_dod: number | null;
    deaths_bid_dod: number | null;
    deaths_unvax: number | null;
    deaths_pvax: number | null;
    deaths_fvax: number | null;
    deaths_boost: number | null;
  }[];
};

export default function DeathsByDayChart({ data }: TestingByDayChartProps) {
  return (
    <ResponsiveContainer width="100%" minHeight={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="hsl(var(--primary))" />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          stroke="hsl(var(--primary))"
        />
        <Tooltip />
        <Legend />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_new"
          name="New Deaths"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_bid"
          name="Brought-in Dead"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_new_dod"
          name="New Deaths (DoD)"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_bid_dod"
          name="Brought-in Dead (DoD)"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_unvax"
          name="Unvaccinated Deaths"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_pvax"
          name="Partially Vaccinated Deaths"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_fvax"
          name="Fully Vaccinated Deaths"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_boost"
          name="Booster Dose Deaths"
          stroke="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
