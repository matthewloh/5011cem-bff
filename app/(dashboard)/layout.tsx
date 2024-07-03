import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p">
      {/* <Navbar/> */}
      <Sidebar />
      <div className="pl-72">{children}</div>
    </div>
  );
}
