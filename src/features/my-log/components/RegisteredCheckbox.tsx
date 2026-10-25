"use client";

import { useState, useTransition } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toggleRecipeRegisteredAction } from "../actions/log.actions";

export function RegisteredCheckbox({
  recipeId,
  isRegistered,
}: {
  recipeId: string;
  isRegistered: boolean;
}) {
  const [checked, setChecked] = useState(isRegistered);
  const [isPending, startTransition] = useTransition();

  return (
    <Checkbox
      checked={checked}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.checked;
        setChecked(next);
        startTransition(() => {
          toggleRecipeRegisteredAction(recipeId, next);
        });
      }}
      slotProps={{ input: { "aria-label": "Mark as cooked" } }}
    />
  );
}
