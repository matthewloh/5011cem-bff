import BarChart from "@/components/nivo/bar";
import Geomap from "@/components/nivo/geomap";
import React from "react";

export default function NivoDashboard() {
  return (
    <div className="p-16">
      <h1> tests</h1>
      <BarChart />
      <Geomap />
    </div>
  );
}
