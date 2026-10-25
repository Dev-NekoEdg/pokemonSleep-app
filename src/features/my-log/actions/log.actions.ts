"use server";

import { revalidatePath } from "next/cache";
import * as logService from "../services/log.service";

export async function toggleRecipeRegisteredAction(
  recipeId: string,
  isRegistered: boolean
): Promise<void> {
  await logService.setRecipeRegistered(recipeId, isRegistered);
  revalidatePath("/my-log");
}
