import { z } from "zod";

export const recipeTypeSchema = z.enum(["curry", "salad", "dessert"]);
export type RecipeType = z.infer<typeof recipeTypeSchema>;

export const recipeIngredientSchema = z.object({
  ingredientId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  image: z.url(),
});
export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>;

export const recipeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  type: recipeTypeSchema,
  image: z.url(),
  ingredients: z.array(recipeIngredientSchema),
});
export type Recipe = z.infer<typeof recipeSchema>;

/** What the create/edit form submits: ingredients only need an id + quantity,
 * their name/image are resolved server-side from the ingredients store. */
export const recipeIngredientInputSchema = z.object({
  ingredientId: z.string().min(1, "Select an ingredient"),
  quantity: z.coerce.number().int().positive("Quantity must be at least 1"),
});

export const recipeInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim(),
  type: recipeTypeSchema,
  image: z.url("Image must be a valid URL"),
  ingredients: z
    .array(recipeIngredientInputSchema)
    .refine(
      (items) => new Set(items.map((i) => i.ingredientId)).size === items.length,
      { message: "Each ingredient can only be used once per recipe" }
    ),
});
export type RecipeInput = z.infer<typeof recipeInputSchema>;
