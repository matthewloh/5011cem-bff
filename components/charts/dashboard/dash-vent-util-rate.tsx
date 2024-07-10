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

type VentilatorUtilizationRateChartProps = {
  data: {
    state: string | null;
    vent_util_rate: number | null;
    ventport_util_rate: number | null;
  }[];
};

const chartConfig = {
  vent_util_rate: {
    label: "Ventilator",
    color: "hsl(var(--chart-1))"
  },
  ventport_util_rate: {
    label: "Portable Ventilator",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig

export function VentilatorUtilizationRateChart({ data }: VentilatorUtilizationRateChartProps) {
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
          dataKey="vent_util_rate"
          fill="var(--color-vent_util_rate)"
          radius={4}
        />
        <Bar
          dataKey="ventport_util_rate"
          fill="var(--color-ventport_util_rate)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  )
}
