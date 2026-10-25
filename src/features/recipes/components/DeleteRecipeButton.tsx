"use client";

import { useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deleteRecipeAction } from "../actions/recipe.actions";

export function DeleteRecipeButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <IconButton
      aria-label={`Delete ${name}`}
      color="error"
      disabled={isPending}
      onClick={() => {
        if (confirm(`Delete "${name}"? This can't be undone.`)) {
          startTransition(() => {
            deleteRecipeAction(id);
          });
        }
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
