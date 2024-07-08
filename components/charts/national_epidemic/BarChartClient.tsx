"use client";

import React from "react";
import { BarChart } from "../../BarChart";

type CasesData = {
  id: number;
  date: string | null;
  cases_new: number | null;
  cases_import: number | null;
  cases_recovered: number | null;
  cases_active: number | null;
  cases_cluster: number | null;
  cases_unvax: number | null;
  cases_boost: number | null;
  cases_pvax: number | null;
  cases_fvax: number | null;
  // deaths_new: number | null;
  // cases_new: number | null;
  // cases_recovered: number | null;
  // cases_active: number | null;
}[];
type BarChartClientProps = {
  data: CasesData;
};
export default function CasesTremorClientChart({ data }: BarChartClientProps) {
  return (
    <>
      <BarChart
        className="container h-80 w-full bg-white p-6 rounded-xl"
        data={data}
        index="date"
        categories={[
          "cases_new",
          "cases_import",
          "cases_recovered",
          "cases_active",
          "cases_cluster",
          "cases_unvax",
          "cases_boost",
          "cases_pvax",
          "cases_fvax",
        ]}
        // valueFormatter={(number: number) =>
        //   `$${Intl.NumberFormat("us").format(number).toString()}`
        // }
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
