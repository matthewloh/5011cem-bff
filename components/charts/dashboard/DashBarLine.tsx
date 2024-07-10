"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Total No.",
  },
  cases_new: {
    label: "New Cases",
    color: "hsl(var(--chart-2))",
  },
  deaths_new: {
    label: "Deaths",
    color: "hsl(var(--chart-3))",
  },
  cases_recovered: {
    label: "Recovered",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type ChartDataProps = {
  date: Date | null;
  state: string;
  cases_new: number | null;
  deaths_new: number | null;
  cases_recovered: number | null;
}[];

export function DashBarInteractive({
  randomData,
}: {
  randomData: ChartDataProps;
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("cases_new");

  const total = React.useMemo(
    () => ({
      cases_new: randomData.reduce((acc, curr) => acc + curr.cases_new!, 0),
      deaths_new: randomData.reduce((acc, curr) => acc + curr.deaths_new!, 0),
      cases_recovered: randomData.reduce(
        (acc, curr) => acc + curr.cases_recovered!,
        0,
      ),
    }),
    [randomData],
  );

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>New Cases in Descending Order - Last 90 Days</CardTitle>
          <CardDescription>
            {/* Data collected up to{" "}
            {randomData[randomData.length - 1].date!.toLocaleDateString()} */}
          </CardDescription>
        </div>
        <div className="flex">
          {["cases_new", "deaths_new", "cases_recovered"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={randomData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-[150px]" nameKey="views" />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
