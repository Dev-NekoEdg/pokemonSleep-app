"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import type { MyLogFilters as MyLogFiltersValue } from "../schemas/log.schema";

const TYPE_OPTIONS: Array<{ value: MyLogFiltersValue["type"]; label: string }> = [
  { value: "all", label: "All" },
  { value: "curry", label: "Curry" },
  { value: "salad", label: "Salad" },
  { value: "dessert", label: "Dessert" },
];

const REGISTERED_OPTIONS: Array<{ value: MyLogFiltersValue["registered"]; label: string }> = [
  { value: "all", label: "All" },
  { value: "registered", label: "Cooked" },
  { value: "unregistered", label: "Not Cooked" },
];

export function MyLogFilters({ filters }: { filters: MyLogFiltersValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: "type" | "registered", value: string, defaultValue: string) {
    const params = new URLSearchParams(searchParams);
    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <ToggleButtonGroup
        value={filters.type}
        exclusive
        size="small"
        onChange={(_, next) => next && setParam("type", next, "all")}
      >
        {TYPE_OPTIONS.map((opt) => (
          <ToggleButton key={opt.value} value={opt.value}>
            {opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={filters.registered}
        exclusive
        size="small"
        onChange={(_, next) => next && setParam("registered", next, "all")}
      >
        {REGISTERED_OPTIONS.map((opt) => (
          <ToggleButton key={opt.value} value={opt.value}>
            {opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
