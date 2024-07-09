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

type TestsByTypeChart = {
  data: {
    date: string | null;
    rtk_ag: number | null;
    pcr: number | null;
  }[];
};

const chartConfig = {
  rtk_ag: {
    label: "RTK-Ag",
    color: "hsl(var(--chart-1))",
  },
  pcr: {
    label: "PCR",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TestsByTypeChart({ data }: TestsByTypeChart) {
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
          dataKey="rtk_ag"
          type="natural"
          fill="var(--color-rtk_ag)"
          fillOpacity={0.4}
          stroke="var(--color-rtk_ag)"
          stackId="a"
        />
        <Area
          dataKey="pcr"
          type="natural"
          fill="var(--color-pcr)"
          fillOpacity={0.4}
          stroke="var(--color-pcr)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
