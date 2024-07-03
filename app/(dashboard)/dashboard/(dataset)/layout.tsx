import DatasetViewOptions from "@/components/datasetviewheader";
import { Button } from "@/components/ui/button";

export default function DatasetViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="">{children}</div>
    </div>
  );
}
