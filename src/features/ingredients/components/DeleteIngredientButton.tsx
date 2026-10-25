"use client";

import { useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deleteIngredientAction } from "../actions/ingredient.actions";

export function DeleteIngredientButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <IconButton
      aria-label={`Delete ${name}`}
      color="error"
      disabled={isPending}
      onClick={() => {
        if (confirm(`Delete "${name}"? This can't be undone.`)) {
          startTransition(() => {
            deleteIngredientAction(id);
          });
        }
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
