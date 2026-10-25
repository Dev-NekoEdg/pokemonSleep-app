import { describe, expect, it } from "vitest";
import { slugify, uniqueSlug } from "./slugify";

describe("slugify", () => {
  it("lowercases and dashes spaces", () => {
    expect(slugify("Fancy Apple Curry")).toBe("fancy-apple-curry");
  });

  it("strips quotes and apostrophes without leaving a dash", () => {
    expect(slugify('"Solar Power" Tomato Curry')).toBe("solar-power-tomato-curry");
    expect(slugify("Neroli's Restorative Tea")).toBe("nerolis-restorative-tea");
  });

  it("collapses punctuation runs into a single dash", () => {
    expect(slugify("Apple Acid Yogurt-Dressed Salad")).toBe("apple-acid-yogurt-dressed-salad");
  });
});

describe("uniqueSlug", () => {
  it("returns the base slug when it's free", () => {
    expect(uniqueSlug("Fancy Apple", new Set())).toBe("fancy-apple");
  });

  it("appends -2, -3, ... on collision", () => {
    const existing = new Set(["fancy-apple", "fancy-apple-2"]);
    expect(uniqueSlug("Fancy Apple", existing)).toBe("fancy-apple-3");
  });
});
