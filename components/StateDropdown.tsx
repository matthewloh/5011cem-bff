"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { STATE_OPTIONS } from "@/lib/stateOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Map } from "lucide-react";

type StateDropdownProps = {
  queryKey: string,
  selectedStateLabel: string
}

export function StateDropdown({
  queryKey,
  selectedStateLabel
}: StateDropdownProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setState(state: keyof typeof STATE_OPTIONS | string) {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, state);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-row gap-2"
          variant="outline"
        >
          <Map size={16} />
          <span className="inline-block align-middle">
            {selectedStateLabel || "Select State"}
          </span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          Object.entries(STATE_OPTIONS).map(([key, value]) => (
            <DropdownMenuItem
              onClick={() => setState(key as keyof typeof STATE_OPTIONS)}
              key={key}
            >
              {value.label}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}