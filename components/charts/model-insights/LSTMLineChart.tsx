"use client";

import { Area, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDate } from "@/utils/formatters";
import { Line } from "recharts";
/* 
[
  { date: '2024-04-20T00:00:00', value: 361.21142578125 },
  { date: '2024-04-21T00:00:00', value: 357.4638671875 },
  { date: '2024-04-22T00:00:00', value: 351.9580078125 },
  { date: '2024-04-23T00:00:00', value: 345.3466796875 },
  { date: '2024-04-24T00:00:00', value: 341.64599609375 },
  { date: '2024-04-25T00:00:00', value: 337.65234375 },
  { date: '2024-04-26T00:00:00', value: 335.31787109375 },
  { date: '2024-04-27T00:00:00', value: 334.0302734375 },
  { date: '2024-04-28T00:00:00', value: 334.18798828125 },
  { date: '2024-04-29T00:00:00', value: 344.66015625 },
  { date: '2024-04-30T00:00:00', value: 354.89501953125 },
  { date: '2024-05-01T00:00:00', value: 371.519775390625 },
  { date: '2024-05-02T00:00:00', value: 382.31005859375 },
  { date: '2024-05-03T00:00:00', value: 385.4365234375 }
]
*/

type LSTMForecastProps = {
  date: string;
  value: number;
  actual_value: number;
}[];

const chartConfig = {
  value: {
    label: "Predicted/Forecasted Cases",
    color: "hsl(var(--chart-1))",
  },
  actual_value: {
    label: "Actual Cases",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LSTMChart({ data }: { data: LSTMForecastProps }) {
  return (
    <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis
          dataKey="date"
          tickLine={true}
          axisLine={false}
          tickMargin={8}
          // tickFormatter={(value) => {
          //   // Receives string in the format
          //   const date ;
          // }}
        />
        <YAxis
          tickLine={true}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(number) => number.toLocaleString()}
        />
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
          dataKey="value"
          type="natural"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
        />
        <Line
          dot={false}
          dataKey="actual_value"
          type="natural"
          fill="var(--color-actual_value)"
          fillOpacity={0.4}
          stroke="var(--color-actual_value)"
        />
      </LineChart>
    </ChartContainer>
  );
}
