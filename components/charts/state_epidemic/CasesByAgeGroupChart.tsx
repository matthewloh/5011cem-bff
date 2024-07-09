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
          dataKey="cases_0_4"
          type="monotone"
          fill="var(--color-cases_0_4)"
          stroke="var(--color-cases_0_4)"
        />
        <Line
          dot={false}
          dataKey="cases_5_11"
          type="monotone"
          fill="var(--color-cases_5_11)"
          stroke="var(--color-cases_5_11)"
        />
        <Line
          dot={false}
          dataKey="cases_12_17"
          type="monotone"
          fill="var(--color-cases_12_17)"
          stroke="var(--color-cases_12_17)"
        />
        <Line
          dot={false}
          dataKey="cases_18_29"
          type="monotone"
          fill="var(--color-cases_18_29)"
          stroke="var(--color-cases_18_29)"
        />
        <Line
          dot={false}
          dataKey="cases_30_39"
          type="monotone"
          fill="var(--color-cases_30_39)"
          stroke="var(--color-cases_30_39)"
        />
        <Line
          dot={false}
          dataKey="cases_40_49"
          type="monotone"
          fill="var(--color-cases_40_49)"
          stroke="var(--color-cases_40_49)"
        />
        <Line
          dot={false}
          dataKey="cases_50_59"
          type="monotone"
          fill="var(--color-cases_50_59)"
          stroke="var(--color-cases_50_59)"
        />
        <Line
          dot={false}
          dataKey="cases_60_69"
          type="monotone"
          fill="var(--color-cases_60_69)"
          stroke="var(--color-cases_60_69)"
        />
        <Line
          dot={false}
          dataKey="cases_70_79"
          type="monotone"
          fill="var(--color-cases_70_79)"
          stroke="var(--color-cases_70_79)"
        />
        <Line
          dot={false}
          dataKey="cases_80"
          type="monotone"
          fill="var(--color-cases_80)"
          stroke="var(--color-cases_80)"
        />
      </LineChart>
    </ChartContainer>
  );
}
