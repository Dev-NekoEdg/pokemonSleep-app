// One-off migration: adds stable slug `id`s to the seed data and writes it
// into local-db-json/. Run with `node scripts/seed-local-db.mjs`.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(rootDir, "..");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['".]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withUniqueIds(items) {
  const seen = new Map();
  return items.map((item) => {
    const base = slugify(item.name);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    return { id, ...item };
  });
}

const ingredientsRaw = JSON.parse(
  await readFile(path.join(projectRoot, "ingredients.json"), "utf-8")
);
const recipesRaw = JSON.parse(
  await readFile(path.join(projectRoot, "recipes.json"), "utf-8")
);

const ingredients = withUniqueIds(ingredientsRaw);
const ingredientIdByName = new Map(ingredients.map((i) => [i.name, i.id]));

const recipes = withUniqueIds(recipesRaw).map((recipe) => ({
  ...recipe,
  ingredients: recipe.ingredients.map((ing) => ({
    ingredientId: ingredientIdByName.get(ing.name) ?? slugify(ing.name),
    name: ing.name,
    quantity: ing.quantity,
    image: ing.image,
  })),
}));

const outDir = path.join(projectRoot, "local-db-json");
await writeFile(
  path.join(outDir, "ingredients.json"),
  JSON.stringify(ingredients, null, 2) + "\n",
  "utf-8"
);
await writeFile(
  path.join(outDir, "recipes.json"),
  JSON.stringify(recipes, null, 2) + "\n",
  "utf-8"
);
await writeFile(path.join(outDir, "localLog.json"), "[]\n", "utf-8");

console.log(
  `Seeded local-db-json: ${ingredients.length} ingredients, ${recipes.length} recipes, localLog.json initialized.`
);
