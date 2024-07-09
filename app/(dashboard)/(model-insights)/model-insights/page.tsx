// import React from "react";

// export const dynamic = "force-dynamic";

// export default async function ModelInsightPage() {
//   const data = await fetch(
//     `${"http://127.0.0.1:3000/api/python/Pulau Pinang"}`,
//   ).then((response) => response.json());
//   console.log(data);
//   return <div>ModelInsightPage</div>;
// }

import Link from "next/link";

import { LSTMChart } from "@/components/charts/model-insights/LSTMLineChart";
import {
  Breadcrumb,
  BreadcrumbItem, BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RANGE_OPTIONS,
  getPredictionRangeOption
} from "@/lib/rangeOptions";
import { getLSTMForecastData } from "./getLSTMForecastData";
import { PredictChartCard } from "@/components/charts/PredictChartCard";

type Forecast = Record<string, number>;
export default async function ModelInsightsPage({
  searchParams: { totalLSTMRange, totalLSTMRangeFrom, totalLSTMRangeTo },
}: {
  searchParams: {
    totalLSTMRange?: string;
    totalLSTMRangeFrom?: string;
    totalLSTMRangeTo?: string;
  };
}) {
  // const data = await fetch(
  //   `${"http://127.0.0.1:3000/api/predict/lstm_model"}`,
  //   {
  //     cache: "no-cache",
  //   },
  // ).then((response) => response.json());
  // const forecast = data.message.Forecast as Forecast;
  // Converting the forecast object to an array of objects
  // const forecastData = Object.entries(forecast).map(([key, value]) => ({
  //   date: key,
  //   value: value,
  // }));
  const defaultRangeOption = RANGE_OPTIONS.last_90_days;
  const totalLSTMRangeOption =
    getPredictionRangeOption(
      totalLSTMRange,
      totalLSTMRangeFrom,
      totalLSTMRangeTo,
    ) || defaultRangeOption;

  const { chartDataFormatted } = await getLSTMForecastData(
    totalLSTMRangeOption.startDate,
    totalLSTMRangeOption.endDate,
  );
  // console.log(forecastData);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background pl-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link href="/model-insights">Model Insights</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div> */}
        </header>
        <main className="flex-1 items-start gap-4 p-4">
          <div className="items-start gap-4">
            {/* <div className="flex justify-start gap-4">
              <Card className="">
                <CardHeader className="pb-3">
                  <CardTitle>Your Insights</CardTitle>
                  <CardDescription className="text-balance max-w-lg leading-relaxed">
                    Introducing Our Dynamic COVID-19 Analytics Dashboard for
                    Seamless Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="mx-auto flex w-full flex-row justify-between">
                    <Button>Select a Model to Train</Button>
                    <Button>Harness Predictive Analytics</Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Case Numbers This Week</CardDescription>
                  <CardTitle className="text-4xl">1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Case Numbers This Month</CardDescription>
                  <CardTitle className="text-4xl">5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div> */}
            <Tabs defaultValue="LSTM">
              <div className="my-6 flex items-center">
                <TabsList>
                  <TabsTrigger value="LSTM">LSTM</TabsTrigger>
                  <TabsTrigger value="Prophet">Prophet</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button> */}
                </div>
              </div>
              <TabsContent value="LSTM">
                <PredictChartCard
                  title="Forecast"
                  description="Forecast Cases using LSTM"
                  queryKey="totalLSTMRange"
                  selectedRangeLabel={totalLSTMRangeOption.label}
                >
                  <LSTMChart data={chartDataFormatted} />
                </PredictChartCard>
              </TabsContent>
              <TabsContent value="Prophet"></TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
