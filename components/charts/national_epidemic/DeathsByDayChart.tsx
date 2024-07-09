"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

const chartConfig = {
  deaths_new: {
    label: "New Deaths",
    color: "hsl(var(--chart-1))",
  },
  deaths_bid: {
    label: "Brought-in Dead",
    color: "hsl(var(--chart-2))",
  },
  deaths_new_dod: {
    label: "New Deaths (DoD)",
    color: "hsl(var(--chart-3))",
  },
  deaths_bid_dod: {
    label: "Brought-in Dead (DoD)",
    color: "hsl(var(--chart-4))",
  },
  deaths_unvax: {
    label: "Unvaccinated Deaths",
    color: "hsl(var(--chart-5))",
  },
  deaths_pvax: {
    label: "Partially Vaccinated Deaths",
    color: "hsl(var(--chart-6))",
  },
  deaths_fvax: {
    label: "Fully Vaccinated Deaths",
    color: "hsl(var(--chart-7))",
  },
  deaths_boost: {
    label: "Booster Dose Deaths",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig;

export default function DeathsByDayChart({ data }: TestingByDayChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[500px] w-full text-base"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="10 5" stroke="rgba(0,0,0, 0.5)" />
        <XAxis
          dataKey="date"
          stroke="hsl(var(--primary))"
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          style={{ fontSize: "0.75rem" }}
        />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          stroke="hsl(var(--primary))"
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend
          align="center"
          iconType="cross"
          content={<ChartLegendContent verticalAlign="top" />}
          wrapperStyle={{ paddingTop: 12 }}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_new"
          name="New Deaths"
          strokeWidth={2}
          stroke="var(--color-deaths_new)"
          fill="var(--color-deaths_new)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_bid"
          strokeWidth={2}
          stroke="var(--color-deaths_bid)"
          fill="var(--color-deaths_bid)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_new_dod"
          strokeWidth={2}
          stroke="var(--color-deaths_new_dod)"
          fill="var(--color-deaths_new_dod)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_bid_dod"
          strokeWidth={2}
          stroke="var(--color-deaths_bid_dod)"
          fill="var(--color-deaths_bid_dod)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_unvax"
          strokeWidth={2}
          stroke="var(--color-deaths_unvax)"
          fill="var(--color-deaths_unvax)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_pvax"
          strokeWidth={2}
          stroke="var(--color-deaths_pvax)"
          fill="var(--color-deaths_pvax)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_fvax"
          strokeWidth={2}
          stroke="var(--color-deaths_fvax)"
          fill="var(--color-deaths_fvax)"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="deaths_boost"
          strokeWidth={2}
          stroke="var(--color-deaths_boost)"
          fill="var(--color-deaths_boost)"
        />
      </LineChart>
    </ChartContainer>
  );
}
