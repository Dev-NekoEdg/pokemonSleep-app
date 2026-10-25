import "server-only";
import { z } from "zod";
import { jsonFileStore } from "@/shared/db/jsonFileStore";
import { uniqueSlug } from "@/shared/utils/slugify";
import { ingredientSchema, type Ingredient, type IngredientInput } from "../schemas/ingredient.schema";

const store = jsonFileStore<Ingredient>("ingredients.json");
const ingredientListSchema = z.array(ingredientSchema);

export class IngredientNotFoundError extends Error {
  constructor(id: string) {
    super(`Ingredient "${id}" was not found`);
    this.name = "IngredientNotFoundError";
  }
}

export async function listIngredients(): Promise<Ingredient[]> {
  const raw = await store.readAll();
  return ingredientListSchema.parse(raw);
}

export async function getIngredient(id: string): Promise<Ingredient | null> {
  const ingredients = await listIngredients();
  return ingredients.find((i) => i.id === id) ?? null;
}

export async function createIngredient(input: IngredientInput): Promise<Ingredient> {
  const ingredients = await listIngredients();
  const id = uniqueSlug(input.name, new Set(ingredients.map((i) => i.id)));
  const created: Ingredient = { id, ...input };
  await store.writeAll([...ingredients, created]);
  return created;
}

export async function updateIngredient(id: string, input: IngredientInput): Promise<Ingredient> {
  const ingredients = await listIngredients();
  const index = ingredients.findIndex((i) => i.id === id);
  if (index === -1) throw new IngredientNotFoundError(id);

  const updated: Ingredient = { id, ...input };
  const next = [...ingredients];
  next[index] = updated;
  await store.writeAll(next);
  return updated;
}

export async function deleteIngredient(id: string): Promise<void> {
  const ingredients = await listIngredients();
  await store.writeAll(ingredients.filter((i) => i.id !== id));
}
