import { describe, expect, it } from "vitest";
import { ingredientInputSchema, ingredientSchema } from "./ingredient.schema";

describe("ingredientInputSchema", () => {
  it("accepts a valid ingredient", () => {
    const result = ingredientInputSchema.safeParse({
      name: "Fancy Apple",
      description: "A crisp apple.",
      image: "https://www.serebii.net/pokemonsleep/ingredients/fancyapple.png",
    });
    expect(result.success).toBe(true);
  });

  it("trims whitespace-only names down to a required-field error", () => {
    const result = ingredientInputSchema.safeParse({
      name: "   ",
      description: "",
      image: "https://example.com/a.png",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-URL image", () => {
    const result = ingredientInputSchema.safeParse({
      name: "Fancy Apple",
      description: "",
      image: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("allows an empty description", () => {
    const result = ingredientInputSchema.safeParse({
      name: "Honey",
      description: "",
      image: "https://example.com/honey.png",
    });
    expect(result.success).toBe(true);
  });
});

describe("ingredientSchema", () => {
  it("requires an id in addition to the input fields", () => {
    const result = ingredientSchema.safeParse({
      name: "Honey",
      description: "",
      image: "https://example.com/honey.png",
    });
    expect(result.success).toBe(false);
  });
});
