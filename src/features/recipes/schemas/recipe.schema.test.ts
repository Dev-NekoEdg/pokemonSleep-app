import { describe, expect, it } from "vitest";
import { recipeInputSchema } from "./recipe.schema";

const baseRecipe = {
  name: "Fancy Apple Curry",
  description: "A simple curry.",
  type: "curry" as const,
  image: "https://www.serebii.net/pokemonsleep/meals/fancyapplecurry.png",
};

describe("recipeInputSchema", () => {
  it("accepts a recipe with ingredients", () => {
    const result = recipeInputSchema.safeParse({
      ...baseRecipe,
      ingredients: [{ ingredientId: "fancy-apple", quantity: 7 }],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a 'Mixed' recipe with no fixed ingredients", () => {
    const result = recipeInputSchema.safeParse({ ...baseRecipe, ingredients: [] });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown recipe type", () => {
    const result = recipeInputSchema.safeParse({
      ...baseRecipe,
      type: "dinner",
      ingredients: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects duplicate ingredients in the same recipe", () => {
    const result = recipeInputSchema.safeParse({
      ...baseRecipe,
      ingredients: [
        { ingredientId: "fancy-apple", quantity: 7 },
        { ingredientId: "fancy-apple", quantity: 3 },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("coerces string quantities from form data and rejects non-positive ones", () => {
    const ok = recipeInputSchema.safeParse({
      ...baseRecipe,
      ingredients: [{ ingredientId: "fancy-apple", quantity: "7" }],
    });
    expect(ok.success).toBe(true);

    const bad = recipeInputSchema.safeParse({
      ...baseRecipe,
      ingredients: [{ ingredientId: "fancy-apple", quantity: "0" }],
    });
    expect(bad.success).toBe(false);
  });
});
