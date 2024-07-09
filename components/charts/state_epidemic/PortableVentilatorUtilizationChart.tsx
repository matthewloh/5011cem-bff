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

type PortableVentilatorUtilizationChartProps = {
  data: {
    date: string | null;
    vent_port: number | null;
    vent_port_used: number | null;
  }[];
};

const chartConfig = {
  vent_port: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  vent_port_used: {
    label: "Used",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig;

export function PortableVentilatorUtilizationChart({ data }: PortableVentilatorUtilizationChartProps) {
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
          dataKey="vent_port"
          type="natural"
          fill="var(--color-vent_port)"
          fillOpacity={0}
          stroke="var(--color-vent_port)"
          stackId="a"
        />
        <Area
          dataKey="vent_port_used"
          type="natural"
          fill="var(--color-vent_port_used)"
          fillOpacity={0.4}
          stroke="var(--color-vent_port_used)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
