"use client";

import { useId, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import type { Ingredient } from "@/features/ingredients/schemas/ingredient.schema";
import type { RecipeIngredient } from "../schemas/recipe.schema";

type Row = { key: string; ingredientId: string; quantity: number };

function toRows(defaultValue?: RecipeIngredient[]): Row[] {
  if (!defaultValue?.length) return [];
  return defaultValue.map((ing, i) => ({
    key: `existing-${i}`,
    ingredientId: ing.ingredientId,
    quantity: ing.quantity,
  }));
}

export function RecipeIngredientsField({
  ingredients,
  defaultValue,
  error,
}: {
  ingredients: Ingredient[];
  defaultValue?: RecipeIngredient[];
  error?: string;
}) {
  const idPrefix = useId();
  const [rows, setRows] = useState<Row[]>(() => toRows(defaultValue));
  let nextKey = rows.length;

  function addRow() {
    setRows((prev) => [
      ...prev,
      { key: `${idPrefix}-${nextKey++}`, ingredientId: "", quantity: 1 },
    ]);
  }

  function removeRow(key: string) {
    setRows((prev) => prev.filter((r) => r.key !== key));
  }

  function updateRow(key: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">Ingredients</Typography>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
      {rows.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No fixed ingredients (e.g. a &quot;Mixed&quot; dish that accepts anything).
        </Typography>
      )}
      {rows.map((row) => (
        <Stack key={row.key} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <TextField
            select
            name="ingredientId"
            label="Ingredient"
            size="small"
            value={row.ingredientId}
            onChange={(e) => updateRow(row.key, { ingredientId: e.target.value })}
            sx={{ flexGrow: 1 }}
          >
            {ingredients.map((ingredient) => (
              <MenuItem key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            name="quantity"
            label="Qty"
            size="small"
            value={row.quantity}
            onChange={(e) => updateRow(row.key, { quantity: Number(e.target.value) })}
            slotProps={{ htmlInput: { min: 1 } }}
            sx={{ width: 96 }}
          />
          <IconButton aria-label="Remove ingredient" onClick={() => removeRow(row.key)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        type="button"
        onClick={addRow}
        startIcon={<AddIcon />}
        size="small"
        sx={{ alignSelf: "flex-start" }}
      >
        Add Ingredient
      </Button>
    </Stack>
  );
}
