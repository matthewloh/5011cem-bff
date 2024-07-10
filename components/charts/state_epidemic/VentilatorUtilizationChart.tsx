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

type VentilatorUtilizationChartProps = {
  data: {
    date: string | null;
    vent: number | null;
    vent_used: number | null;
  }[];
};

const chartConfig = {
  vent: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  vent_used: {
    label: "Used",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function VentilatorUtilizationChart({
  data,
}: VentilatorUtilizationChartProps) {
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
          dataKey="vent"
          type="natural"
          fill="var(--color-vent)"
          fillOpacity={0}
          stroke="var(--color-vent)"
          stackId="a"
        />
        <Area
          dataKey="vent_used"
          type="natural"
          fill="var(--color-vent_used)"
          fillOpacity={0.4}
          stroke="var(--color-vent_used)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
