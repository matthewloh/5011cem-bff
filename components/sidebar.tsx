"use client";
import { cx, focusRing } from "@/lib/utils";
import {
  RiHome2Line,
  RiLinkM,
  RiListCheck,
  RiSettings5Line,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Overview", href: "/home", icon: RiHome2Line },
  { name: "Dashboard", href: "/dashboard", icon: RiListCheck },
] as const;

const shortcuts = [
  {
    name: "State Epidemic Dataset",
    href: "/dashboard/state-epidemic",
    icon: RiLinkM,
  },
  {
    name: "State Vaccinations Dataset",
    href: "/dashboard/state-vaccinations",
    icon: RiLinkM,
  },
  {
    name: "National Epidemic Dataset",
    href: "/dashboard/national-epidemic",
    icon: RiLinkM,
  },
  {
    name: "National Vaccinations Dataset",
    href: "/dashboard/national-vaccinations",
    icon: RiLinkM,
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref);
  };
  // const isActive = (itemHref: string) => {
  //   if (itemHref === siteConfig.baseLinks.settings) {
  //     return pathname.startsWith("/settings");
  //   }
  //   return pathname === itemHref || pathname.startsWith(itemHref);
  // };
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      isActive(item.href)
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                Shortcuts
              </span>
              <ul aria-label="shortcuts" role="list" className="space-y-6">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cx(
                        pathname === item.href || pathname.startsWith(item.href)
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>
      </nav>
    </>
  );
}
