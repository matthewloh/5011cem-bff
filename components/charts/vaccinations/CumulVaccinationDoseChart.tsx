"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type CumulVaccinationDoseData = {
  id: number;
  date: string | null;
  cumul_partial: number | null;
  cumul_full: number | null;
  cumul_booster: number | null;
  cumul_booster2: number | null;
}[];

type CumulVaccinationDoseChartProps = {
  data: CumulVaccinationDoseData;
};
const chartConfig = {
  cumul_partial: {
    label: "Partial",
    color: "hsl(var(--chart-1))",
  },
  cumul_full: {
    label: "Full",
    color: "#0088FE",
  },
  cumul_booster: {
    label: "Booster 1",
    color: "#FFBB28",
  },
  cumul_booster2: {
    label: "Booster 2",
    color: "green",
  },
} satisfies ChartConfig;

export default function CumulVaccinationDoseChart({
  data,
}: CumulVaccinationDoseChartProps) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
      <AreaChart
        data={data}
        accessibilityLayer
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="hsl(var(--primary))" />
        <YAxis
          tickFormatter={(number) => number.toLocaleString()}
          // width={100}
          stroke="hsl(var(--primary))"
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend
          align="center"
          iconType="cross"
          content={<ChartLegendContent />}
        />
        <Legend />
        {/* <Bar
          dataKey="cumul_partial"
          name="Partial"
          stackId="a"
          fill="#0088FE"
        />
        <Bar dataKey="cumul_full" name="Full" stackId="a" fill="#00C49F" />
        <Bar
          dataKey="cumul_booster"
          name="Booster"
          stackId="a"
          fill="#FFBB28"
        />
        <Bar
          dataKey="cumul_booster2"
          name="Booster 2"
          stackId="a"
          fill="#FF8042"
        /> */}
        <Area
          dataKey="cumul_partial"
          type="natural"
          stackId="a"
          fill="var(--color-cumul_partial)"
          fillOpacity={0.4}
          stroke="var(--color-cumul_partial)"
        />
        <Area
          dataKey="cumul_full"
          type="natural"
          stackId="b"
          fill="var(--color-cumul_full)"
          fillOpacity={0.4}
          stroke="var(--color-cumul_full)"
        />
        <Area
          dataKey="cumul_booster"
          type="natural"
          stackId="c"
          fill="var(--color-cumul_booster)"
          fillOpacity={0.4}
          stroke="var(--color-cumul_booster)"
        />
        <Area
          dataKey="cumul_booster2"
          type="natural"
          stackId="c"
          fill="var(--color-cumul_booster2)"
          fillOpacity={0.4}
          stroke="var(--color-cumul_booster2)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
