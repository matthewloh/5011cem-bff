"use client";
import { Button } from "./ui/button";
import { DatePickerWithRange } from "./ui/datepickerwithrange";

export default function DatasetViewOptions() {
  return (
    <div className="flex flex-col items-start justify-center bg-slate-200 p-2 dark:bg-slate-500">
      <DatePickerWithRange />
    </div>
  );
}
