"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type AverageCasesChartProps = {
  data: {
    state: string | null;
    avg_cases: number | null;
  }[];
};

const chartConfig = {
  avg_cases: {
    label: "Average New Cases",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AverageCasesChart({ data }: AverageCasesChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis
          dataKey="state"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          interval={0}
          angle={-20}
        />
        <YAxis tickLine={true} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="avg_cases" fill="var(--color-avg_cases)" radius={4}>
          <LabelList
            position="insideTop"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) => value.toFixed(0)}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
