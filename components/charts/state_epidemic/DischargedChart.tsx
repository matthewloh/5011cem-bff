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

type DischargedChartProps = {
  data: {
    date: string | null;
    discharged_total: number | null;
    discharged_covid: number | null;
    discharged_pui: number | null;
  }[];
};

const chartConfig = {
  discharged_total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  discharged_covid: {
    label: "Confirmed COVID",
    color: "hsl(var(--chart-2))",
  },
  discharged_pui: {
    label: "Patients Under Investigation",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DischargedChart({ data }: DischargedChartProps) {
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
          dataKey="discharged_pui"
          type="natural"
          fill="var(--color-discharged_pui)"
          fillOpacity={0.4}
          stroke="var(--color-discharged_pui)"
          stackId="a"
        />
        <Area
          dataKey="discharged_covid"
          type="natural"
          fill="var(--color-discharged_covid)"
          fillOpacity={0.4}
          stroke="var(--color-discharged_covid)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
