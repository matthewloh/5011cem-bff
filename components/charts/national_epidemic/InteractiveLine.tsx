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

const chartData = [
  { date: "2024-04-01", rtk_ag: 222, pcr: 150 },
  { date: "2024-04-02", rtk_ag: 97, pcr: 180 },
  { date: "2024-04-03", rtk_ag: 167, pcr: 120 },
  { date: "2024-04-04", rtk_ag: 242, pcr: 260 },
  { date: "2024-04-05", rtk_ag: 373, pcr: 290 },
  { date: "2024-04-06", rtk_ag: 301, pcr: 340 },
  { date: "2024-04-07", rtk_ag: 245, pcr: 180 },
  { date: "2024-04-08", rtk_ag: 409, pcr: 320 },
  { date: "2024-04-09", rtk_ag: 59, pcr: 110 },
  { date: "2024-04-10", rtk_ag: 261, pcr: 190 },
  { date: "2024-04-11", rtk_ag: 327, pcr: 350 },
  { date: "2024-04-12", rtk_ag: 292, pcr: 210 },
  { date: "2024-04-13", rtk_ag: 342, pcr: 380 },
  { date: "2024-04-14", rtk_ag: 137, pcr: 220 },
  { date: "2024-04-15", rtk_ag: 120, pcr: 170 },
  { date: "2024-04-16", rtk_ag: 138, pcr: 190 },
  { date: "2024-04-17", rtk_ag: 446, pcr: 360 },
  { date: "2024-04-18", rtk_ag: 364, pcr: 410 },
  { date: "2024-04-19", rtk_ag: 243, pcr: 180 },
  { date: "2024-04-20", rtk_ag: 89, pcr: 150 },
  { date: "2024-04-21", rtk_ag: 137, pcr: 200 },
  { date: "2024-04-22", rtk_ag: 224, pcr: 170 },
  { date: "2024-04-23", rtk_ag: 138, pcr: 230 },
  { date: "2024-04-24", rtk_ag: 387, pcr: 290 },
  { date: "2024-04-25", rtk_ag: 215, pcr: 250 },
  { date: "2024-04-26", rtk_ag: 75, pcr: 130 },
  { date: "2024-04-27", rtk_ag: 383, pcr: 420 },
  { date: "2024-04-28", rtk_ag: 122, pcr: 180 },
  { date: "2024-04-29", rtk_ag: 315, pcr: 240 },
  { date: "2024-04-30", rtk_ag: 454, pcr: 380 },
  { date: "2024-05-01", rtk_ag: 165, pcr: 220 },
  { date: "2024-05-02", rtk_ag: 293, pcr: 310 },
  { date: "2024-05-03", rtk_ag: 247, pcr: 190 },
  { date: "2024-05-04", rtk_ag: 385, pcr: 420 },
  { date: "2024-05-05", rtk_ag: 481, pcr: 390 },
  { date: "2024-05-06", rtk_ag: 498, pcr: 520 },
  { date: "2024-05-07", rtk_ag: 388, pcr: 300 },
  { date: "2024-05-08", rtk_ag: 149, pcr: 210 },
  { date: "2024-05-09", rtk_ag: 227, pcr: 180 },
  { date: "2024-05-10", rtk_ag: 293, pcr: 330 },
  { date: "2024-05-11", rtk_ag: 335, pcr: 270 },
  { date: "2024-05-12", rtk_ag: 197, pcr: 240 },
  { date: "2024-05-13", rtk_ag: 197, pcr: 160 },
  { date: "2024-05-14", rtk_ag: 448, pcr: 490 },
  { date: "2024-05-15", rtk_ag: 473, pcr: 380 },
  { date: "2024-05-16", rtk_ag: 338, pcr: 400 },
  { date: "2024-05-17", rtk_ag: 499, pcr: 420 },
  { date: "2024-05-18", rtk_ag: 315, pcr: 350 },
  { date: "2024-05-19", rtk_ag: 235, pcr: 180 },
  { date: "2024-05-20", rtk_ag: 177, pcr: 230 },
  { date: "2024-05-21", rtk_ag: 82, pcr: 140 },
  { date: "2024-05-22", rtk_ag: 81, pcr: 120 },
  { date: "2024-05-23", rtk_ag: 252, pcr: 290 },
  { date: "2024-05-24", rtk_ag: 294, pcr: 220 },
  { date: "2024-05-25", rtk_ag: 201, pcr: 250 },
  { date: "2024-05-26", rtk_ag: 213, pcr: 170 },
  { date: "2024-05-27", rtk_ag: 420, pcr: 460 },
  { date: "2024-05-28", rtk_ag: 233, pcr: 190 },
  { date: "2024-05-29", rtk_ag: 78, pcr: 130 },
  { date: "2024-05-30", rtk_ag: 340, pcr: 280 },
  { date: "2024-05-31", rtk_ag: 178, pcr: 230 },
  { date: "2024-06-01", rtk_ag: 178, pcr: 200 },
  { date: "2024-06-02", rtk_ag: 470, pcr: 410 },
  { date: "2024-06-03", rtk_ag: 103, pcr: 160 },
  { date: "2024-06-04", rtk_ag: 439, pcr: 380 },
  { date: "2024-06-05", rtk_ag: 88, pcr: 140 },
  { date: "2024-06-06", rtk_ag: 294, pcr: 250 },
  { date: "2024-06-07", rtk_ag: 323, pcr: 370 },
  { date: "2024-06-08", rtk_ag: 385, pcr: 320 },
  { date: "2024-06-09", rtk_ag: 438, pcr: 480 },
  { date: "2024-06-10", rtk_ag: 155, pcr: 200 },
  { date: "2024-06-11", rtk_ag: 92, pcr: 150 },
  { date: "2024-06-12", rtk_ag: 492, pcr: 420 },
  { date: "2024-06-13", rtk_ag: 81, pcr: 130 },
  { date: "2024-06-14", rtk_ag: 426, pcr: 380 },
  { date: "2024-06-15", rtk_ag: 307, pcr: 350 },
  { date: "2024-06-16", rtk_ag: 371, pcr: 310 },
  { date: "2024-06-17", rtk_ag: 475, pcr: 520 },
  { date: "2024-06-18", rtk_ag: 107, pcr: 170 },
  { date: "2024-06-19", rtk_ag: 341, pcr: 290 },
  { date: "2024-06-20", rtk_ag: 408, pcr: 450 },
  { date: "2024-06-21", rtk_ag: 169, pcr: 210 },
  { date: "2024-06-22", rtk_ag: 317, pcr: 270 },
  { date: "2024-06-23", rtk_ag: 480, pcr: 530 },
  { date: "2024-06-24", rtk_ag: 132, pcr: 180 },
  { date: "2024-06-25", rtk_ag: 141, pcr: 190 },
  { date: "2024-06-26", rtk_ag: 434, pcr: 380 },
  { date: "2024-06-27", rtk_ag: 448, pcr: 490 },
  { date: "2024-06-28", rtk_ag: 149, pcr: 200 },
  { date: "2024-06-29", rtk_ag: 103, pcr: 160 },
  { date: "2024-06-30", rtk_ag: 446, pcr: 400 },
];

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
