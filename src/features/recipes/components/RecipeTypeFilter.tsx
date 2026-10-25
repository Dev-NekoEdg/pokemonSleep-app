"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import type { RecipeType } from "../schemas/recipe.schema";

const OPTIONS: Array<{ value: RecipeType | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "curry", label: "Curry" },
  { value: "salad", label: "Salad" },
  { value: "dessert", label: "Dessert" },
];

export function RecipeTypeFilter({ value }: { value: RecipeType | "all" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(_: unknown, next: RecipeType | "all" | null) {
    if (!next) return;
    const params = new URLSearchParams(searchParams);
    if (next === "all") {
      params.delete("type");
    } else {
      params.set("type", next);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <ToggleButtonGroup value={value} exclusive onChange={handleChange} size="small">
      {OPTIONS.map((opt) => (
        <ToggleButton key={opt.value} value={opt.value}>
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
