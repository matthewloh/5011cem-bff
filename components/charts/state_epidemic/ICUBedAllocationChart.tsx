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

type ICUBedAllocationChartProps = {
  data: {
    date: string | null;
    beds_icu_total: number | null;
    beds_icu_covid: number | null;
    beds_icu_rep: number | null;
  }[];
};

const chartConfig = {
  beds_icu_total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  beds_icu_covid: {
    label: "COVID",
    color: "hsl(var(--chart-2))",
  },
  beds_icu_rep: {
    label: "Anaesthesiology & Critical Care",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig;

export function ICUBedAllocationChart({ data }: ICUBedAllocationChartProps) {
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
          dataKey="beds_icu_total"
          type="natural"
          fill="var(--color-beds_icu_total)"
          fillOpacity={0}
          stroke="var(--color-beds_icu_total)"
          stackId="a"
        />
        <Area
          dataKey="beds_icu_covid"
          type="natural"
          fill="var(--color-beds_icu_covid)"
          fillOpacity={0.4}
          stroke="var(--color-beds_icu_covid)"
          stackId="b"
        />
        <Area
          dataKey="beds_icu_rep"
          type="natural"
          fill="var(--color-beds_icu_rep)"
          fillOpacity={0.4}
          stroke="var(--color-beds_icu_rep)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
