import "server-only";
import { z } from "zod";
import { jsonFileStore } from "@/shared/db/jsonFileStore";
import { uniqueSlug } from "@/shared/utils/slugify";
import { listIngredients } from "@/features/ingredients/services/ingredient.service";
import {
  recipeSchema,
  type Recipe,
  type RecipeInput,
  type RecipeType,
} from "../schemas/recipe.schema";

const store = jsonFileStore<Recipe>("recipes.json");
const recipeListSchema = z.array(recipeSchema);

export class RecipeNotFoundError extends Error {
  constructor(id: string) {
    super(`Recipe "${id}" was not found`);
    this.name = "RecipeNotFoundError";
  }
}

export async function listRecipes(filters?: { type?: RecipeType }): Promise<Recipe[]> {
  const raw = await store.readAll();
  const recipes = recipeListSchema.parse(raw);
  if (!filters?.type) return recipes;
  return recipes.filter((r) => r.type === filters.type);
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const recipes = await listRecipes();
  return recipes.find((r) => r.id === id) ?? null;
}

/** Resolves each `ingredientId` from the form against the ingredients store,
 * so the recipe record stays denormalized with name/image like the seed data. */
async function resolveIngredients(input: RecipeInput["ingredients"]) {
  const ingredients = await listIngredients();
  const byId = new Map(ingredients.map((i) => [i.id, i]));

  return input.map(({ ingredientId, quantity }) => {
    const ingredient = byId.get(ingredientId);
    if (!ingredient) {
      throw new Error(`Ingredient "${ingredientId}" was not found`);
    }
    return {
      ingredientId: ingredient.id,
      name: ingredient.name,
      quantity,
      image: ingredient.image,
    };
  });
}

export async function createRecipe(input: RecipeInput): Promise<Recipe> {
  const [recipes, resolvedIngredients] = await Promise.all([
    listRecipes(),
    resolveIngredients(input.ingredients),
  ]);
  const id = uniqueSlug(input.name, new Set(recipes.map((r) => r.id)));
  const created: Recipe = { id, ...input, ingredients: resolvedIngredients };
  await store.writeAll([...recipes, created]);
  return created;
}

export async function updateRecipe(id: string, input: RecipeInput): Promise<Recipe> {
  const [recipes, resolvedIngredients] = await Promise.all([
    listRecipes(),
    resolveIngredients(input.ingredients),
  ]);
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) throw new RecipeNotFoundError(id);

  const updated: Recipe = { id, ...input, ingredients: resolvedIngredients };
  const next = [...recipes];
  next[index] = updated;
  await store.writeAll(next);
  return updated;
}

export async function deleteRecipe(id: string): Promise<void> {
  const recipes = await listRecipes();
  await store.writeAll(recipes.filter((r) => r.id !== id));
}
