"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { Calendar } from "@/components/ui/calendar";


const chartConfig = {
  views: {
    label: "Total",
  },
  rtk_ag: {
    label: "RTK Antigen",
    color: "hsl(var(--chart-1))",
  },
  pcr: {
    label: "PCR Test",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartCardProps = {
  title: string;
  description: string;
  queryKey: string;
  selectedRangeLabel: string;
  children?: React.ReactNode;
  chartData: TestingByDayChartProps;
};

type TestingByDayChartProps = {
  id: number;
  date: string | null;
  rtk_ag: number | null;
  pcr: number | null;
}[];
export function InteractiveLineChart({
  title,
  description,
  queryKey,
  selectedRangeLabel,
  children,
  chartData,
}: ChartCardProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("rtk_ag");

  const total = React.useMemo(
    () => ({
      rtk_ag: chartData.reduce((acc, curr) => acc + curr.rtk_ag!, 0),
      pcr: chartData.reduce((acc, curr) => acc + curr.pcr!, 0),
    }),
    [chartData],
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  function setRange(range: keyof typeof RANGE_OPTIONS | DateRange) {
    const params = new URLSearchParams(searchParams);
    if (typeof range === "string") {
      params.set(queryKey, range);
      params.delete(`${queryKey}From`);
      params.delete(`${queryKey}To`);
    } else {
      if (range.from == null || range.to == null) return;
      params.delete(queryKey);
      params.set(`${queryKey}From`, range.from?.toISOString());
      params.set(`${queryKey}To`, range.to?.toISOString());
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <div className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  {selectedRangeLabel || "Select Range"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(RANGE_OPTIONS).map(([key, value]) => (
                  <DropdownMenuItem
                    onClick={() => setRange(key as keyof typeof RANGE_OPTIONS)}
                    key={key}
                  >
                    {value.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <div>
                      <Calendar
                        mode="range"
                        disabled={{ after: new Date() }}
                        selected={dateRange}
                        defaultMonth={dateRange?.from}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                      <DropdownMenuItem className="hover:bg-auto">
                        <Button
                          onClick={() => {
                            if (dateRange == null) return;
                            setRange(dateRange);
                          }}
                          disabled={dateRange == null}
                          className="w-full"
                        >
                          Submit
                        </Button>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex">
          {["rtk_ag", "pcr"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
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
          className="aspect-auto h-[400px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="hsl(var(--primary))" />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              stroke="hsl(var(--primary))"
            />
            <YAxis
              tickFormatter={(number) => number.toLocaleString()}
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              stroke="hsl(var(--primary))"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-[150px]" nameKey="views" />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
