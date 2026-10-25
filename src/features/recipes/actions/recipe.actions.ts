"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recipeInputSchema } from "../schemas/recipe.schema";
import * as recipeService from "../services/recipe.service";
import type { ActionState } from "@/shared/types/actionState";

/** The recipe form renders one <input name="ingredientId"> + <input
 * name="quantity"> pair per row, so the parallel arrays line up by index. */
function parseFormData(formData: FormData) {
  const ingredientIds = formData.getAll("ingredientId").map(String);
  const quantities = formData.getAll("quantity").map(String);

  return recipeInputSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"),
    image: formData.get("image"),
    ingredients: ingredientIds.map((ingredientId, i) => ({
      ingredientId,
      quantity: quantities[i],
    })),
  });
}

export async function createRecipeAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await recipeService.createRecipe(parsed.data);
  revalidatePath("/recipes");
  revalidatePath("/my-log");
  redirect("/recipes");
}

export async function updateRecipeAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await recipeService.updateRecipe(id, parsed.data);
  revalidatePath("/recipes");
  revalidatePath("/my-log");
  redirect("/recipes");
}

export async function deleteRecipeAction(id: string): Promise<void> {
  await recipeService.deleteRecipe(id);
  revalidatePath("/recipes");
  revalidatePath("/my-log");
}
