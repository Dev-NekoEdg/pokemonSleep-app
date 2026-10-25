"use client";

import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import { initialActionState, type ActionState } from "@/shared/types/actionState";
import type { Ingredient } from "../schemas/ingredient.schema";

type IngredientFormProps = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Pick<Ingredient, "name" | "description" | "image">;
  submitLabel: string;
};

export function IngredientForm({ action, defaultValues, submitLabel }: IngredientFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  return (
    <form action={formAction}>
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
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
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isPending}>
            {submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
