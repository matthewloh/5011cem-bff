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

type TotalDeathsChartProps = {
  data: {
    date: string | null;
    deaths_new: number | null;
    deaths_bid: number | null;
  }[];
};

const chartConfig = {
  deaths_new: {
    label: "New Death",
    color: "hsl(var(--chart-1))",
  },
  deaths_bid: {
    label: "Brought In Death",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TotalDeathsChart({ data }: TotalDeathsChartProps) {
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
          dataKey="deaths_new"
          type="natural"
          fill="var(--color-deaths_new)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_new)"
          stackId="a"
        />
        <Area
          dataKey="deaths_bid"
          type="natural"
          fill="var(--color-deaths_bid)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_bid)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
