"use client";

import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { initialActionState, type ActionState } from "@/shared/types/actionState";
import type { Ingredient } from "@/features/ingredients/schemas/ingredient.schema";
import type { Recipe } from "../schemas/recipe.schema";
import { RecipeIngredientsField } from "./RecipeIngredientsField";

const RECIPE_TYPES = [
  { value: "curry", label: "Curry" },
  { value: "salad", label: "Salad" },
  { value: "dessert", label: "Dessert" },
] as const;

type RecipeFormProps = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  ingredients: Ingredient[];
  defaultValues?: Pick<Recipe, "name" | "description" | "type" | "image" | "ingredients">;
  submitLabel: string;
};

export function RecipeForm({ action, ingredients, defaultValues, submitLabel }: RecipeFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  return (
    <form action={formAction}>
      <Stack spacing={2} sx={{ maxWidth: 560 }}>
        {state.message && <Alert severity="error">{state.message}</Alert>}
        <TextField
          name="name"
          label="Name"
          defaultValue={defaultValues?.name}
          error={!!state.errors?.name}
          helperText={state.errors?.name?.[0]}
          required
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          defaultValue={defaultValues?.description}
          error={!!state.errors?.description}
          helperText={state.errors?.description?.[0]}
          multiline
          minRows={2}
          fullWidth
        />
        <TextField
          select
          name="type"
          label="Type"
          defaultValue={defaultValues?.type ?? ""}
          error={!!state.errors?.type}
          helperText={state.errors?.type?.[0]}
          required
          fullWidth
        >
          {RECIPE_TYPES.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="image"
          label="Image URL"
          defaultValue={defaultValues?.image}
          error={!!state.errors?.image}
          helperText={state.errors?.image?.[0]}
          required
          fullWidth
        />
        {defaultValues?.image && (
          <Avatar src={defaultValues.image} variant="rounded" sx={{ width: 56, height: 56 }} />
        )}

        <Divider />

        <RecipeIngredientsField
          ingredients={ingredients}
          defaultValue={defaultValues?.ingredients}
          error={state.errors?.ingredients?.[0]}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isPending}>
            {submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
