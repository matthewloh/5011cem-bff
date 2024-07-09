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

type CasesByAgeGroupChartProps = {
  data: {
    date: string | null;
    cases_0_4: number | null;
    cases_5_11: number | null;
    cases_12_17: number | null;
    cases_18_29: number | null;
    cases_30_39: number | null;
    cases_40_49: number | null;
    cases_50_59: number | null;
    cases_60_69: number | null;
    cases_70_79: number | null;
    cases_80: number | null;
  }[];
};

const chartConfig = {
  cases_0_4: {
    label: "0-4",
    color: "hsl(var(--chart-1))",
  },
  cases_5_11: {
    label: "5-11",
    color: "hsl(var(--chart-2))",
  },
  cases_12_17: {
    label: "12-17",
    color: "hsl(var(--chart-3))",
  },
  cases_18_29: {
    label: "18-29",
    color: "hsl(var(--chart-4))",
  },
  cases_30_39: {
    label: "30-39",
    color: "hsl(var(--chart-5))",
  },
  cases_40_49: {
    label: "40-49",
    color: "hsl(var(--chart-6))",
  },
  cases_50_59: {
    label: "50-59",
    color: "hsl(var(--chart-7))",
  },
  cases_60_69: {
    label: "60-69",
    color: "hsl(var(--chart-8))",
  },
  cases_70_79: {
    label: "70-79",
    color: "hsl(var(--chart-9))",
  },
  cases_80: {
    label: ">80",
    color: "hsl(var(--chart-10))",
  },
} satisfies ChartConfig;

export function CasesByAgeGroupChart({ data }: CasesByAgeGroupChartProps) {
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
          dataKey="cases_0_4"
          type="natural"
          fill="var(--color-cases_0_4)"
          fillOpacity={0.4}
          stroke="var(--color-cases_0_4)"
          stackId="a"
        />
        <Area
          dataKey="cases_5_11"
          type="natural"
          fill="var(--color-cases_5_11)"
          fillOpacity={0.4}
          stroke="var(--color-cases_5_11)"
          stackId="a"
        />
        <Area
          dataKey="cases_12_17"
          type="natural"
          fill="var(--color-cases_12_17)"
          fillOpacity={0.4}
          stroke="var(--color-cases_12_17)"
          stackId="a"
        />
        <Area
          dataKey="cases_18_29"
          type="natural"
          fill="var(--color-cases_18_29)"
          fillOpacity={0.4}
          stroke="var(--color-cases_18_29)"
          stackId="a"
        />
        <Area
          dataKey="cases_30_39"
          type="natural"
          fill="var(--color-cases_30_39)"
          fillOpacity={0.4}
          stroke="var(--color-cases_30_39)"
          stackId="a"
        />
        <Area
          dataKey="cases_40_49"
          type="natural"
          fill="var(--color-cases_40_49)"
          fillOpacity={0.4}
          stroke="var(--color-cases_40_49)"
          stackId="a"
        />
        <Area
          dataKey="cases_50_59"
          type="natural"
          fill="var(--color-cases_50_59)"
          fillOpacity={0.4}
          stroke="var(--color-cases_50_59)"
          stackId="a"
        />
        <Area
          dataKey="cases_60_69"
          type="natural"
          fill="var(--color-cases_60_69)"
          fillOpacity={0.4}
          stroke="var(--color-cases_60_69)"
          stackId="a"
        />
        <Area
          dataKey="cases_70_79"
          type="natural"
          fill="var(--color-cases_70_79)"
          fillOpacity={0.4}
          stroke="var(--color-cases_70_79)"
          stackId="a"
        />
        <Area
          dataKey="cases_80"
          type="natural"
          fill="var(--color-cases_80)"
          fillOpacity={0.4}
          stroke="var(--color-cases_80)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
