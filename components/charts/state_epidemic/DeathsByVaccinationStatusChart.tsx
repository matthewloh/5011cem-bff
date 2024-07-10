"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

export function DeathsByVaccinationStatusChart({
  data,
}: DeathsByVaccinationStatusChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <LineChart
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
        <Line
          dot={false}
          dataKey="deaths_unvax"
          type="monotone"
          fill="var(--color-deaths_unvax)"
          stroke="var(--color-deaths_unvax)"
        />
        <Line
          dot={false}
          dataKey="deaths_pvax"
          type="monotone"
          fill="var(--color-deaths_pvax)"
          stroke="var(--color-deaths_pvax)"
        />
        <Line
          dot={false}
          dataKey="deaths_fvax"
          type="monotone"
          fill="var(--color-deaths_fvax)"
          stroke="var(--color-deaths_fvax)"
        />
        <Line
          dot={false}
          dataKey="deaths_boost"
          type="monotone"
          fill="var(--color-deaths_boost)"
          stroke="var(--color-deaths_boost)"
        />
      </LineChart>
    </ChartContainer>
  );
}
