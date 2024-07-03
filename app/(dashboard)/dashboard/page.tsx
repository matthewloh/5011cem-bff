"use client";
import React from "react";
import { BarChart } from "@/components/BarChart";
import { LineChart } from "@/components/LineChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold">
        What is the COVID-19 Situation Like?
      </h1>
      <div className="flex flex-col h-full w-full space-y-6">
        <BarChart
          className="h-80 w-[50%]"
          data={chartdata}
          index="date"
          categories={["SolarPanels", "Inverters"]}
          valueFormatter={(number: number) =>
            `$${Intl.NumberFormat("us").format(number).toString()}`
          }
          onValueChange={(v) => console.log(v)}
          xAxisLabel="Month"
          yAxisLabel="Spend Category"
          colors={["amber", "violet"]}
          legendPosition={"center"}
          showLegend={false}
        />
        <LineChart
          className="h-80"
          data={chartdata}
          index="date"
          categories={["SolarPanels", "Inverters"]}
          valueFormatter={(number: number) =>
            `$${Intl.NumberFormat("us").format(number).toString()}`
          }
          onValueChange={(v) => console.log(v)}
        />
      </div>
    </div>
  );
}

const chartdata = [
  {
    date: "Jan 23",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 23",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 23",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: "Apr 23",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 23",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 23",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 23",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 23",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 23",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 23",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 23",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 23",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];