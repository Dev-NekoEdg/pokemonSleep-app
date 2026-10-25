import "server-only";
import { z } from "zod";
import { jsonFileStore } from "@/shared/db/jsonFileStore";
import { listRecipes } from "@/features/recipes/services/recipe.service";
import { logEntrySchema, type LogEntry, type MyLogFilters, type MyLogItem } from "../schemas/log.schema";

const store = jsonFileStore<LogEntry>("localLog.json");
const logEntryListSchema = z.array(logEntrySchema);

async function listLogEntries(): Promise<LogEntry[]> {
  const raw = await store.readAll();
  return logEntryListSchema.parse(raw);
}

/** Joins every recipe with its log entry (defaulting to "not registered"),
 * then applies the type/registered filters. */
export async function getMyLog(filters: MyLogFilters): Promise<MyLogItem[]> {
  const [recipes, entries] = await Promise.all([listRecipes(), listLogEntries()]);
  const entryByRecipeId = new Map(entries.map((e) => [e.recipeId, e]));

  const items: MyLogItem[] = recipes.map((recipe) => {
    const entry = entryByRecipeId.get(recipe.id);
    return {
      recipeId: recipe.id,
      name: recipe.name,
      description: recipe.description,
      type: recipe.type,
      image: recipe.image,
      ingredients: recipe.ingredients,
      isRegistered: entry?.isRegistered ?? false,
      registeredAt: entry?.registeredAt ?? null,
    };
  });

  return items.filter((item) => {
    const matchesType = filters.type === "all" || item.type === filters.type;
    const matchesRegistered =
      filters.registered === "all" ||
      (filters.registered === "registered" ? item.isRegistered : !item.isRegistered);
    return matchesType && matchesRegistered;
  });
}

export async function setRecipeRegistered(recipeId: string, isRegistered: boolean): Promise<void> {
  const entries = await listLogEntries();
  const index = entries.findIndex((e) => e.recipeId === recipeId);
  const nextEntry: LogEntry = {
    recipeId,
    isRegistered,
    registeredAt: isRegistered ? new Date().toISOString() : null,
  };

  const next = [...entries];
  if (index === -1) {
    next.push(nextEntry);
  } else {
    next[index] = nextEntry;
  }
  await store.writeAll(next);
}
