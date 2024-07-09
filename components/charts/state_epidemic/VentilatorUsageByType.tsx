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

type VentilatorUsageByTypeChartProps = {
  data: {
    date: string | null;
    vent_pui: number | null;
    vent_covid: number | null;
    vent_noncovid: number | null;
  }[];
};

const chartConfig = {
  vent_pui: {
    label: "Patient Under Investigation",
    color: "hsl(var(--chart-1))",
  },
  vent_covid: {
    label: "COVID Patients",
    color: "hsl(var(--chart-2))",
  },
  vent_noncovid: {
    label: "Non-COVID Patients",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function VentilatorUsageByTypeChart({ data }: VentilatorUsageByTypeChartProps) {
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
          dataKey="vent_pui"
          type="natural"
          fill="var(--color-vent_pui)"
          fillOpacity={0.4}
          stroke="var(--color-vent_pui)"
          stackId="a"
        />
        <Area
          dataKey="vent_covid"
          type="natural"
          fill="var(--color-vent_covid)"
          fillOpacity={0.4}
          stroke="var(--color-vent_covid)"
          stackId="a"
        />
        <Area
          dataKey="vent_noncovid"
          type="natural"
          fill="var(--color-vent_noncovid)"
          fillOpacity={0.4}
          stroke="var(--color-vent_noncovid)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
