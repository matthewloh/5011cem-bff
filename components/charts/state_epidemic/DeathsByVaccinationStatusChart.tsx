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

type DeathsByVaccinationStatusChartProps = {
  data: {
    date: string | null;
    deaths_unvax: number | null;
    deaths_pvax: number | null;
    deaths_fvax: number | null;
    deaths_boost: number | null;
  }[];
};

const chartConfig = {
  deaths_unvax: {
    label: "Unvaccinated",
    color: "hsl(var(--chart-1))",
  },
  deaths_pvax: {
    label: "Partially Vaccinated",
    color: "hsl(var(--chart-2))",
  },
  deaths_fvax: {
    label: "Fully Vaccinated",
    color: "hsl(var(--chart-3))",
  },
  deaths_boost: {
    label: "Boosted",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function DeathsByVaccinationStatusChart({ data }: DeathsByVaccinationStatusChartProps) {
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
          dataKey="deaths_unvax"
          type="natural"
          fill="var(--color-deaths_unvax)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_unvax)"
          stackId="a"
        />
        <Area
          dataKey="deaths_pvax"
          type="natural"
          fill="var(--color-deaths_pvax)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_pvax)"
          stackId="a"
        />
        <Area
          dataKey="deaths_fvax"
          type="natural"
          fill="var(--color-deaths_fvax)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_fvax)"
          stackId="a"
        />
        <Area
          dataKey="deaths_boost"
          type="natural"
          fill="var(--color-deaths_boost)"
          fillOpacity={0.4}
          stroke="var(--color-deaths_boost)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
