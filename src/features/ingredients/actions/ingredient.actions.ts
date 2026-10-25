"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ingredientInputSchema } from "../schemas/ingredient.schema";
import * as ingredientService from "../services/ingredient.service";
import type { ActionState } from "@/shared/types/actionState";

function parseFormData(formData: FormData) {
  return ingredientInputSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
  });
}

export async function createIngredientAction(
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

  await ingredientService.createIngredient(parsed.data);
  revalidatePath("/ingredients");
  redirect("/ingredients");
}

export async function updateIngredientAction(
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

  await ingredientService.updateIngredient(id, parsed.data);
  revalidatePath("/ingredients");
  redirect("/ingredients");
}

export async function deleteIngredientAction(id: string): Promise<void> {
  await ingredientService.deleteIngredient(id);
  revalidatePath("/ingredients");
}
