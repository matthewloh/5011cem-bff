"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type AverageDeathsChartProp = {
  data: {
    state: string | null;
    avg_deaths: number | null;
  }[];
};

const chartConfig = {
  avg_deaths: {
    label: "Average New Deaths",
    color: "hsl(var(--chart-1))"
  },
} satisfies ChartConfig

export function AverageDeathsChart({ data }: AverageDeathsChartProp) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          bottom: 12
        }}
      >
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis
          dataKey="state"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          interval={0}
          angle={-20}
        />
        <YAxis
          tickLine={true}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="avg_deaths"
          fill="var(--color-avg_deaths)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  )
}
