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

type BedAllocationChartProps = {
  data: {
    date: string | null;
    beds: number | null;
    beds_covid: number | null;
    beds_noncrit: number | null;
  }[];
};

const chartConfig = {
  beds: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  beds_covid: {
    label: "Allocated for COVID cases",
    color: "hsl(var(--chart-2))",
  },
  beds_noncrit: {
    label: "Allocated for non-critical care",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BedAllocationChart({ data }: BedAllocationChartProps) {
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
          dataKey="beds"
          type="natural"
          fill="var(--color-beds)"
          fillOpacity={0}
          stroke="var(--color-beds)"
          stackId="a"
        />
        <Area
          dataKey="beds_covid"
          type="natural"
          fill="var(--color-beds_covid)"
          fillOpacity={0.2}
          stroke="var(--color-beds_covid)"
          stackId="b"
        />
        <Area
          dataKey="beds_noncrit"
          type="natural"
          fill="var(--color-beds_noncrit)"
          fillOpacity={0.2}
          stroke="var(--color-beds_noncrit)"
          stackId="c"
        />
      </AreaChart>
    </ChartContainer>
  );
}
