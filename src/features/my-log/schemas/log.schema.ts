import { z } from "zod";
import { recipeIngredientSchema, recipeTypeSchema } from "@/features/recipes/schemas/recipe.schema";

/** A row in local-db-json/localLog.json. Only recipes the user has
 * interacted with need an entry; anything absent counts as not registered. */
export const logEntrySchema = z.object({
  recipeId: z.string().min(1),
  isRegistered: z.boolean(),
  registeredAt: z.iso.datetime().nullable(),
});
export type LogEntry = z.infer<typeof logEntrySchema>;

/** Recipe + log state, joined together for the MyLog view. */
export const myLogItemSchema = z.object({
  recipeId: z.string(),
  name: z.string(),
  description: z.string(),
  type: recipeTypeSchema,
  image: z.url(),
  ingredients: z.array(recipeIngredientSchema),
  isRegistered: z.boolean(),
  registeredAt: z.iso.datetime().nullable(),
});
export type MyLogItem = z.infer<typeof myLogItemSchema>;

export const myLogFiltersSchema = z.object({
  type: z.union([recipeTypeSchema, z.literal("all")]).default("all"),
  registered: z.union([z.literal("registered"), z.literal("unregistered"), z.literal("all")]).default("all"),
});
export type MyLogFilters = z.infer<typeof myLogFiltersSchema>;
