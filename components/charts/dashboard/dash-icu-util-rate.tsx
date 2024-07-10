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

type ICUBedUtilizationRateChartProps = {
  data: {
    state: string | null;
    utilization_rate: number | null;
  }[];
};

const chartConfig = {
  utilization_rate: {
    label: "Utilization Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ICUBedUtilizationRateChart({
  data,
}: ICUBedUtilizationRateChartProps) {
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
        <YAxis
          domain={[0, 100]}
          tickLine={true}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="utilization_rate"
          fill="var(--color-utilization_rate)"
          radius={4}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) => value.toFixed(0).concat("%")}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
