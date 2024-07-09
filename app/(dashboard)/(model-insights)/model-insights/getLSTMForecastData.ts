import prisma from "@/lib/db";
import { getChartDateArray } from "@/utils/formatters";
import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

type Forecast = Record<string, number>;

export async function getLSTMForecastData(
  recordedAfter: Date | null,
  recordedBefore: Date | null,
) {
  // Building URL for the date range
  const params = new URLSearchParams();
  if (recordedAfter)
    params.append("recordedAfter", recordedAfter.toISOString());
  if (recordedBefore)
    params.append("recordedBefore", recordedBefore.toISOString());

  const urlString = `${"http://127.0.0.1:3000/api/predict/lstm_model"}?${params.toString()}`;

  const data = await fetch(urlString, {
    cache: "no-cache",
  }).then((response) => response.json());

  const forecast = data.message.Forecast as Forecast;
  const recordedatQuery: Prisma.MalaysiaEpidemicWhereInput["date"] = {};
  if (recordedAfter) recordedatQuery.gte = recordedAfter;
  if (recordedBefore) recordedatQuery.lte = recordedBefore;
  // Converting the forecast object to an array of objects
  const forecastData = Object.entries(forecast).map(([key, value]) => ({
    date: key,
    value: value,
  }));

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
  /* 
  type LSTMForecastProps = {
    date: string;
    value: number;
    actual_value: number;
  }[]; 
  */

  // const chartData = {
  //   date,
  //   value,
  //   actual_value
  // }

  const chartData = forecastData.map((forecast, index) => {
    const actualValue = actualData[index]?.cases_new || 0;
    return {
      date: forecast.date,
      value: forecast.value,
      actual_value: actualValue,
    };
  });
  const { format } = getChartDateArray(
    recordedAfter || startOfDay(chartData[0].date),
    recordedBefore || new Date(),
  );

  const chartDataFormatted = chartData.map((day) => ({
    ...day,
    date: format(new Date(day.date)),
  }));
  return {
    chartDataFormatted,
  };
}
