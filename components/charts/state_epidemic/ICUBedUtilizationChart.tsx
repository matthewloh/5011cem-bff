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

type ICUBedUtilizationChartProps = {
  data: {
    date: string | null;
    beds_icu: number | null;
    icu_covid: number | null;
    icu_pui: number | null;
    icu_noncovid: number | null;
  }[];
};

const chartConfig = {
  beds_icu: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  icu_covid: {
    label: "COVID",
    color: "hsl(var(--chart-2))",
  },
  icu_pui: {
    label: "Patient Under Investigation",
    color: "hsl(var(--chart-3))",
  },
  icu_noncovid: {
    label: "Non-COVID",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig;

export function ICUBedUtilizationChart({ data }: ICUBedUtilizationChartProps) {
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
          dataKey="beds_icu"
          type="natural"
          fill="var(--color-beds_icu)"
          fillOpacity={0}
          stroke="var(--color-beds_icu)"
          stackId="a"
        />
        <Area
          dataKey="icu_pui"
          type="natural"
          fill="var(--color-icu_pui)"
          fillOpacity={0.4}
          stroke="var(--color-icu_pui)"
          stackId="b"
        />
        <Area
          dataKey="icu_covid"
          type="natural"
          fill="var(--color-icu_covid)"
          fillOpacity={0.4}
          stroke="var(--color-icu_covid)"
          stackId="b"
        />
        <Area
          dataKey="icu_noncovid"
          type="natural"
          fill="var(--color-icu_noncovid)"
          fillOpacity={0.4}
          stroke="var(--color-icu_noncovid)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
