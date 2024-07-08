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

type CasesByDayChartProps = {
  data: {
    date: string | null;
    cases_new: number | null;
    cases_import: number | null;
    cases_recovered: number | null;
    cases_active: number | null;
    cases_cluster: number | null;
    cases_unvax: number | null;
    cases_boost: number | null;
    cases_pvax: number | null;
    cases_fvax: number | null;
  }[];
};

const chartConfig = {
  cases_new: {
    label: "New Cases",
    color: "hsl(var(--chart-1))",
  },
  cases_import: {
    label: "Imported Cases",
    color: "hsl(var(--chart-2))",
  },
  cases_recovered: {
    label: "Recovered Cases",
    color: "hsl(var(--chart-3))",
  },
  cases_active: {
    label: "Active Cases",
    color: "hsl(var(--chart-4))",
  },
  cases_cluster: {
    label: "Cluster Cases",
    color: "hsl(var(--chart-5))",
  },
  cases_unvax: {
    label: "Unvaccinated Cases",
    color: "hsl(var(--chart-6))",
  },
  cases_boost: {
    label: "Boosted Cases",
    color: "hsl(var(--chart-7))",
  },
  cases_pvax: {
    label: "Partially Vaccinated Cases",
    color: "hsl(var(--chart-8))",
  },
  cases_fvax: {
    label: "Fully Vaccinated Cases",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig;

export function AreaChartClient({ data }: CasesByDayChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
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
          dataKey="cases_new"
          type="natural"
          fill="var(--color-cases_new)"
          fillOpacity={0.4}
          stroke="var(--color-cases_new)"
          stackId="a"
        />
        <Area
          dataKey="cases_import"
          type="natural"
          fill="var(--color-cases_import)"
          fillOpacity={0.4}
          stroke="var(--color-cases_import)"
          stackId="a"
        />
        <Area
          dataKey="cases_recovered"
          type="natural"
          fill="var(--color-cases_recovered)"
          fillOpacity={0.4}
          stroke="var(--color-cases_recovered)"
          stackId="a"
        />
        <Area
          dataKey="cases_active"
          type="natural"
          fill="var(--color-cases_active)"
          fillOpacity={0.4}
          stroke="var(--color-cases_active)"
          stackId="a"
        />
        <Area
          dataKey="cases_cluster"
          type="natural"
          fill="var(--color-cases_cluster)"
          fillOpacity={0.4}
          stroke="var(--color-cases_cluster)"
          stackId="a"
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
          dataKey="cases_boost"
          type="natural"
          fill="var(--color-cases_boost)"
          fillOpacity={0.4}
          stroke="var(--color-cases_boost)"
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
      </AreaChart>
    </ChartContainer>
  );
}
