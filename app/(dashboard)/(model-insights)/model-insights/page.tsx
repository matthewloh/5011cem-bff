// import React from "react";

// export const dynamic = "force-dynamic";

// export default async function ModelInsightPage() {
//   const data = await fetch(
//     `${"http://127.0.0.1:3000/api/python/Pulau Pinang"}`,
//   ).then((response) => response.json());
//   Console.log(data);
//   return <div>ModelInsightPage</div>;
// }

import Link from "next/link";

import { LSTMChart } from "@/components/charts/model-insights/LSTMLineChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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
  PREDICTION_RANGE_OPTIONS,
  RANGE_OPTIONS,
  getPredictionRangeOption,
} from "@/lib/rangeOptions";
import { getLSTMForecastData } from "./getLSTMForecastData";
import { PredictChartCard } from "@/components/charts/PredictChartCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getRFRForecastData } from "./getRandForestForecastData";
import { getARIMAForecastData } from "./getARIMAForecastData";

type Forecast = Record<string, number>;
export default async function ModelInsightsPage({
  searchParams: {
    totalLSTMRange,
    totalLSTMRangeFrom,
    totalLSTMRangeTo,
    totalRFRRange,
    totalRFRRangeFrom,
    totalRFRRangeTo,
    totalARIMARange,
    totalARIMARangeFrom,
    totalARIMARangeTo,
  },
}: {
  searchParams: {
    totalLSTMRange?: string;
    totalLSTMRangeFrom?: string;
    totalLSTMRangeTo?: string;
    totalRFRRange?: string;
    totalRFRRangeFrom?: string;
    totalRFRRangeTo?: string;
    totalARIMARange?: string;
    totalARIMARangeFrom?: string;
    totalARIMARangeTo?: string;
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
  const defaultRangeOption = PREDICTION_RANGE_OPTIONS.predict_range;
  const totalLSTMRangeOption =
    getPredictionRangeOption(
      totalLSTMRange,
      totalLSTMRangeFrom,
      totalLSTMRangeTo,
    ) || defaultRangeOption;

  const totalRFRRangeOption =
    getPredictionRangeOption(
      totalRFRRange,
      totalRFRRangeFrom,
      totalRFRRangeTo,
    ) || defaultRangeOption;

  const totalARIMARangeOption =
    getPredictionRangeOption(
      totalARIMARange,
      totalARIMARangeFrom,
      totalARIMARangeTo,
    ) || defaultRangeOption;

  const { chartDataFormatted: chartDataFormattedLSTM, comments: LSTMComments } =
    await getLSTMForecastData(
      totalLSTMRangeOption.startDate,
      totalLSTMRangeOption.endDate,
    );
  const { chartDataFormatted: chartDataFormattedRFR, comments: RFRComments } =
    await getRFRForecastData(
      totalRFRRangeOption.startDate,
      totalRFRRangeOption.endDate,
    );
  const {
    chartDataFormatted: chartDataFormattedARIMA,
    comments: ARIMAComments,
  } = await getARIMAForecastData(
    totalARIMARangeOption.startDate,
    totalARIMARangeOption.endDate,
  );

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
          <div className="relative ml-auto flex-1 md:grow-0"></div>
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
                  <TabsTrigger value="Random Forest Regression">
                    Random Forest Regression
                  </TabsTrigger>
                  <TabsTrigger value="ARIMA">ARIMA</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2"></div>
              </div>
              <TabsContent value="LSTM">
                <PredictChartCard
                  title="LSTM Forecasting of New COVID-19 Cases (Not Affected by Filter)"
                  description="Machine learning forecasting provides estimates based on historical data and patterns. Forecast accuracy diminishes as the forecast extends. Long-term forecasts are prone to higher uncertainty and potential error due to the compounding of prediction inaccuracies and the influence of unforeseen events."
                  footer={LSTMComments}
                  queryKey="totalLSTMRange"
                  selectedRangeLabel={totalLSTMRangeOption.label}
                >
                  <LSTMChart data={chartDataFormattedLSTM} />
                </PredictChartCard>
              </TabsContent>
              <TabsContent value="Random Forest Regression">
                <PredictChartCard
                  title="Random Forest Regression Forecasting of New COVID-19 Cases"
                  description="Forecast Cases using Random Forest Regression, a machine learning algorithm that uses an ensemble of decision trees to predict outcomes. In this example, the output is 90 days ahead by default"
                  footer={RFRComments}
                  queryKey="totalRFRRange"
                  selectedRangeLabel={totalRFRRangeOption.label}
                >
                  <LSTMChart data={chartDataFormattedRFR} />
                </PredictChartCard>
              </TabsContent>
              <TabsContent value="ARIMA">
                <PredictChartCard
                  title="ARIMA"
                  description="Forecasting New Cases using ARIMA"
                  footer={ARIMAComments}
                  queryKey="totalARIMARange"
                  selectedRangeLabel={totalARIMARangeOption.label}
                >
                  <LSTMChart data={chartDataFormattedARIMA} />
                </PredictChartCard>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
