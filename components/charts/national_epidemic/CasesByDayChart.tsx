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

type CasesByDayChartProps = {
  data: {
    date: string | null;
    cases_new: number | null;
    cases_import: number | null;
    cases_recovered: number | null;
    cases_active: number | null;
    cases_cluster: number | null;
    cases_unvax: number | null;
    cases_boost: number | null;
    cases_pvax: number | null;
    cases_fvax: number | null;
  }[];
};

export default function CasesByDayChart({ data }: CasesByDayChartProps) {
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
          dataKey="cases_new"
          name="New Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_import"
          name="Imported Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_recovered"
          name="Recovered Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_active"
          name="Active Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_cluster"
          name="Cluster Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_unvax"
          name="Unvaccinated Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_boost"
          name="Booster Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_pvax"
          name="Partially Vaccinated Cases"
          stroke="hsl(var(--primary))"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="cases_fvax"
          name="Fully Vaccinated Cases"
          stroke="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
