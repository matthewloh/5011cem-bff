import { ARIMAData } from "@/api/model_outputs/arima_forecasts";
import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

type Forecast = Record<string, number>;

export async function getARIMAForecastData(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
) {
  // Building URL for the date range
  const params = new URLSearchParams();
  if (recordedAfter)
    params.append("recordedAfter", recordedAfter.toISOString());
  if (recordedBefore)
    params.append("recordedBefore", recordedBefore.toISOString());

  // const urlString = `${"http://127.0.0.1:3000/api/predict/arima"}?${params.toString()}`;

  // const data = await fetch(urlString, {
  //   cache: "no-cache",
  // }).then((response) => response.json());
  // Since data fetching from FastAPI is not working, will use loaded data from ./api/model_outputs/<model>_forecast_2022-03-09_2024-04-20.json
  // converting recordedBefore into 2024-04-20 format
  // keys are 2022-03-09_2024-04-20
  if (!recordedBefore) {
    recordedBefore = new Date("2024-04-20");
  }
  const recordedBeforeString = recordedBefore?.toISOString().split("T")[0];
  let finalDateString = `2022-03-09_${recordedBeforeString}`;
  // if final date string not in ARIMAData, then use the last date in ARIMAData
  if (!ARIMAData[finalDateString as keyof typeof ARIMAData]) {
    const keys = Object.keys(ARIMAData);
    finalDateString = keys[keys.length - 1];
  }
  const data =
    ARIMAData[finalDateString as keyof typeof ARIMAData];

  const forecast = data.message.Forecast as Forecast;
  const comments = data.comments as string;

  const recordedatQuery: Prisma.MalaysiaEpidemicWhereInput["date"] = {};

  if (recordedAfter) recordedatQuery.gte = new Date("2020-01-25");
  if (recordedBefore) recordedatQuery.lte = recordedBefore;

  // Converting the forecast object to an array of objects
  const forecastData = Object.entries(forecast).map(([key, value]) => ({
    date: key.split(" ")[0],
    value: value,
  }));
  const forecastDataAsDate = forecastData.map((item) => ({
    date: new Date(item.date),
    value: item.value,
  }));
  // console.log(forecastDataAsDate);
  // console.log(forecastData);
  const actualData = await prisma.malaysiaEpidemic.findMany({
    select: {
      date: true,
      cases_new: true,
    },
    where: {
      date: recordedatQuery,
    },
    orderBy: {
      date: "asc",
    },
  });

  const forecastMap = new Map(
    forecastData.map((item) => [item.date, item.value]),
  );
  const forecastMapDateType = new Map(
    forecastDataAsDate.map((item) => [item.date, item.value]),
  );
  const latestForecastDate =
    forecastDataAsDate[forecastDataAsDate.length - 1].date;
  const latestActualDate = actualData[actualData.length - 1].date!;
  const isForecastAfterActual = latestForecastDate > latestActualDate;

  const chartData = actualData.map((actual) => ({
    date: actual.date,
    value: forecastMap.get(actual.date!.toISOString().split("T")[0]) || null,
    actual_value: actual.cases_new,
  }));
  // Append forecast data to actual data if forecast is after actual
  if (isForecastAfterActual) {
    const forecastDataAfterActual = forecastDataAsDate.filter(
      (item) => item.date > latestActualDate,
    );
    const forecastDataAfterActualMap = new Map(
      forecastDataAfterActual.map((item) => [item.date, item.value]),
    );
    const forecastDataAfterActualChart = forecastDataAfterActual.map(
      (item) => ({
        date: item.date,
        value: item.value,
        actual_value: null,
      }),
    );
    chartData.push(...forecastDataAfterActualChart);
  }

  const { format } = getChartDateArray(
    recordedAfter || startOfDay(chartData[0].date!),
    recordedBefore || new Date(),
  );
  const chartDataFormatted = chartData.map((day) => ({
    ...day,
    date: format(day.date!),
  }));
  return {
    chartDataFormatted,
    comments,
  };
}
