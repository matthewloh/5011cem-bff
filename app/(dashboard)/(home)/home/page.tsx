import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FooterCredits from "@/components/FooterCredits";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <div className="flex flex-1 flex-col items-center justify-center pb-16">
        <div className="animate-in-index animate-fade-in mx-auto max-w-4xl">
          <LandingPage />
        </div>
      </div>
      <FooterCredits />
    </div>
  );
}
