import { describe, expect, it } from "vitest";
import { myLogFiltersSchema } from "./log.schema";

describe("myLogFiltersSchema", () => {
  it("defaults both filters to 'all' when nothing is provided", () => {
    const result = myLogFiltersSchema.parse({});
    expect(result).toEqual({ type: "all", registered: "all" });
  });

  it("accepts a valid recipe type alongside a registered filter", () => {
    const result = myLogFiltersSchema.parse({ type: "curry", registered: "registered" });
    expect(result).toEqual({ type: "curry", registered: "registered" });
  });

  it("rejects a registered value outside the known set", () => {
    const result = myLogFiltersSchema.safeParse({ registered: "maybe" });
    expect(result.success).toBe(false);
  });
});
