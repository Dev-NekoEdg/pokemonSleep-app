import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim(),
  image: z.url("Image must be a valid URL"),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

/** Fields collected from the create/edit form, before an `id` exists. */
export const ingredientInputSchema = ingredientSchema.omit({ id: true });

export type IngredientInput = z.infer<typeof ingredientInputSchema>;
