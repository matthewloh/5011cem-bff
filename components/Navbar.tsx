import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

import React from "react";

export default function Navbar() {
  return (
    <header className="relative z-10 bg-gray-100 py-2 pl-72 dark:bg-gray-900">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}
