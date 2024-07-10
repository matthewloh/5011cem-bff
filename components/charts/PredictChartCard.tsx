"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { RANGE_OPTIONS, PREDICTION_RANGE_OPTIONS } from "@/lib/rangeOptions";
import { ReactNode, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "../ui/calendar";

import type { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { DatePickerDemo } from "./model-insights/date-picker-insight";

type ChartCardProps = {
  title: string;
  description: string;
  footer?: string | null;
  queryKey: string;
  selectedRangeLabel: string;
  children: ReactNode;
};

export function PredictChartCard({
  title,
  description,
  footer,
  children,
  queryKey,
  selectedRangeLabel,
}: ChartCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    // Choose from 2022-03-09 onwards to 2024-04-20 by default
    from: new Date("2022-03-09"),
    to: new Date("2024-04-20"),
  });
  function setRange(range: keyof typeof PREDICTION_RANGE_OPTIONS | DateRange) {
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
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                {selectedRangeLabel || "Select Range"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(PREDICTION_RANGE_OPTIONS).map(([key, value]) => (
                <DropdownMenuItem
                  onClick={() =>
                    setRange(key as keyof typeof PREDICTION_RANGE_OPTIONS)
                  }
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
                      disabled={{ before: new Date("2022-03-09") }}
                      selected={dateRange}
                      defaultMonth={dateRange?.from}
                      onSelect={setDateRange}
                      numberOfMonths={3}
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
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {footer && (
          <div className="text-sm text-secondary-foreground">{footer}</div>
        )}
      </CardFooter>
    </Card>
  );
}
