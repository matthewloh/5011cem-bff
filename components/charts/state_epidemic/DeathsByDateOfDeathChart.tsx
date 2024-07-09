"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DeathsByDateOfDeathChartProps = {
  data: {
    date: string | null;
    deaths_new_dod: number | null;
    deaths_bid_dod: number | null;
  }[];
};

const chartConfig = {
  deaths_new_dod: {
    label: "New Death",
    color: "hsl(var(--chart-1))",
  },
  deaths_bid_dod: {
    label: "Brought In Death",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DeathsByDateOfDeathChart({ data }: DeathsByDateOfDeathChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey="date" tickLine={true} axisLine={false} tickMargin={8} />
        <YAxis tickLine={true} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend
          align="center"
          iconType="cross"
          content={<ChartLegendContent verticalAlign="top" />}
          wrapperStyle={{ paddingTop: 12 }}
        />
        <Area
          dataKey="deaths_new_dod"
          type="natural"
          fill="var(--color-deaths_new_dod)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_new_dod)"
          stackId="a"
        />
        <Area
          dataKey="deaths_bid_dod"
          type="natural"
          fill="var(--color-deaths_bid_dod)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_bid_dod)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
