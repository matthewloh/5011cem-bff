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

type CasesByVaccinationStatusChartProps = {
  data: {
    date: string | null;
    cases_unvax: number | null;
    cases_pvax: number | null;
    cases_fvax: number | null;
    cases_boost: number | null;
  }[];
};

const chartConfig = {
  cases_unvax: {
    label: "Unvaccinated",
    color: "hsl(var(--chart-1))",
  },
  cases_pvax: {
    label: "Partially Vaccinated",
    color: "hsl(var(--chart-2))",
  },
  cases_fvax: {
    label: "Fully Vaccinated",
    color: "hsl(var(--chart-3))",
  },
  cases_boost: {
    label: "Boosted",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function CasesByVaccinationStatusChart({ data }: CasesByVaccinationStatusChartProps) {
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
          dataKey="cases_unvax"
          type="natural"
          fill="var(--color-cases_unvax)"
          fillOpacity={0.4}
          stroke="var(--color-cases_unvax)"
          stackId="a"
        />
        <Area
          dataKey="cases_pvax"
          type="natural"
          fill="var(--color-cases_pvax)"
          fillOpacity={0.4}
          stroke="var(--color-cases_pvax)"
          stackId="a"
        />
        <Area
          dataKey="cases_fvax"
          type="natural"
          fill="var(--color-cases_fvax)"
          fillOpacity={0.4}
          stroke="var(--color-cases_fvax)"
          stackId="a"
        />
        <Area
          dataKey="cases_boost"
          type="natural"
          fill="var(--color-cases_boost)"
          fillOpacity={0.4}
          stroke="var(--color-cases_boost)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
