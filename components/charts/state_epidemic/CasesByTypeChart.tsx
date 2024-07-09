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

type CasesByTypeChartProps = {
  data: {
    date: string | null;
    cases_new: number | null;
    cases_import: number | null;
    cases_recovered: number | null;
    cases_active: number | null;
    cases_cluster: number | null;
  }[];
};

const chartConfig = {
  cases_new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  cases_import: {
    label: "Imported",
    color: "hsl(var(--chart-2))",
  },
  cases_recovered: {
    label: "Recovered",
    color: "hsl(var(--chart-3))",
  },
  cases_active: {
    label: "Active",
    color: "hsl(var(--chart-4))",
  },
  cases_cluster: {
    label: "Cluster",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function CasesByTypeChart({ data }: CasesByTypeChartProps) {
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
          dataKey="cases_new"
          type="natural"
          fill="var(--color-cases_new)"
          fillOpacity={0.4}
          stroke="var(--color-cases_new)"
          stackId="a"
        />
        <Area
          dataKey="cases_imported"
          type="natural"
          fill="var(--color-cases_imported)"
          fillOpacity={0.4}
          stroke="var(--color-cases_imported)"
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
      </AreaChart>
    </ChartContainer>
  );
}
