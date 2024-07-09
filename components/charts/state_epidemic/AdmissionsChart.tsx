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

type AdmissionsChartProps = {
  data: {
    date: string | null;
    admitted_total: number | null;
    admitted_covid: number | null;
    admitted_pui: number | null;
  }[];
};

const chartConfig = {
  admitted_total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  admitted_covid: {
    label: "COVID-related",
    color: "hsl(var(--chart-2))",
  },
  admitted_pui: {
    label: "Patients Under Investigation",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function AdmissionsChart({ data }: AdmissionsChartProps) {
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
          dataKey="admitted_total"
          type="natural"
          fill="var(--color-admitted_total)"
          fillOpacity={0}
          stroke="var(--color-admitted_total)"
          stackId="a"
        />
        <Area
          dataKey="admitted_covid"
          type="natural"
          fill="var(--color-admitted_covid)"
          fillOpacity={0.4}
          stroke="var(--color-admitted_covid)"
          stackId="b"
        />
        <Area
          dataKey="admitted_pui"
          type="natural"
          fill="var(--color-admitted_pui)"
          fillOpacity={0.4}
          stroke="var(--color-admitted_pui)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
