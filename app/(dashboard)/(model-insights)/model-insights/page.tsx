import Link from "next/link";

import { LSTMChart } from "@/components/charts/model-insights/LSTMLineChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PREDICTION_RANGE_OPTIONS,
  getPredictionRangeOption,
} from "@/lib/rangeOptions";
import { getLSTMForecastData } from "./getLSTMForecastData";
import { PredictChartCard } from "@/components/charts/PredictChartCard";
import { getRFRForecastData } from "./getRandForestForecastData";
import { getARIMAForecastData } from "./getARIMAForecastData";

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
        <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background pl-6">
          <h2 className="text-2xl font-semibold">Model Insights</h2>
        </header>
        <main className="flex-1 items-start gap-4 p-4">
          <div className="w-full rounded-xl bg-background/30 p-6 align-text-top leading-loose">
            <p className="font-sans text-lg text-foreground">
              Due to resource constraints, the models are currently hard-coded.
              The model&apos;s overall size is too large to be hosted on Vercel.
              The additional limitations of filtering are described in the
              descriptions below.
            </p>
          </div>

          <div className="items-start gap-4">
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
                  description="Machine learning forecasting provides estimates based on historical data and patterns. Forecast accuracy diminishes as the forecast extends. Long-term forecasts are prone to higher uncertainty and potential error due to the compounding of prediction inaccuracies and the influence of unforeseen events. The current implementation does not allow for filtering."
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
                  description="Forecast Cases using Random Forest Regression, a machine learning algorithm that uses an ensemble of decision trees to predict outcomes. In this example, the output is 90 days ahead by default. It does allow filtering, but only as additional days."
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
                  description="Forecasting New Cases using ARIMA, a statistical model that uses time series data to predict future values. The model is based on the assumption that the future values of a time series can be predicted based on its past values. The current implementation allows for filtering by the few options, but not custom. Custom filtering is only supported with a long-running server hosting the model. It currently defaults to the next year upon reading a custom filter range."
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
