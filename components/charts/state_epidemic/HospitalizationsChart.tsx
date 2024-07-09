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

type HospitalizationsChartProps = {
  data: {
    date: string | null;
    hosp_pui: number | null;
    hosp_covid: number | null;
    hosp_noncovid: number | null;
  }[];
};

const chartConfig = {
  hosp_pui: {
    label: "Patients Under Investigaiton",
    color: "hsl(var(--chart-1))",
  },
  hosp_covid: {
    label: "Confirmed COVID",
    color: "hsl(var(--chart-2))",
  },
  hosp_noncovid: {
    label: "Non-COVID related",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function HospitalizationsChart({ data }: HospitalizationsChartProps) {
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
          dataKey="hosp_pui"
          type="natural"
          fill="var(--color-hosp_pui)"
          fillOpacity={0.4}
          stroke="var(--color-hosp_pui)"
          stackId="a"
        />
        <Area
          dataKey="hosp_covid"
          type="natural"
          fill="var(--color-hosp_covid)"
          fillOpacity={0.4}
          stroke="var(--color-hosp_covid)"
          stackId="a"
        />
        <Area
          dataKey="hosp_noncovid"
          type="natural"
          fill="var(--color-hosp_noncovid)"
          fillOpacity={0.4}
          stroke="var(--color-hosp_noncovid)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
