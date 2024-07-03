"use client";

import React from "react";
import { BarChart } from "../BarChart";

type EpidemicData = {
  id: number;
  date: string | null;
  deaths_new: number | null;
  cases_new: number | null;
  cases_recovered: number | null;
  cases_active: number | null;
}[];
type BarChartClientProps = {
  data: EpidemicData;
};
export default function BarChartClient({ data }: BarChartClientProps) {
  return (
    <>
      <BarChart
        className="container h-80 w-full"
        data={data}
        index="date"
        categories={[
          "cases_new",
          "deaths_new",
          "cases_recovered",
          "cases_active",
        ]}
        valueFormatter={(number: number) =>
          `$${Intl.NumberFormat("us").format(number).toString()}`
        }
        onValueChange={(v) => console.log(v)}
        xAxisLabel="Date"
        yAxisLabel="Cases"
        colors={["amber", "violet"]}
        legendPosition={"center"}
        showLegend={false}
      />
    </>
  );
}
