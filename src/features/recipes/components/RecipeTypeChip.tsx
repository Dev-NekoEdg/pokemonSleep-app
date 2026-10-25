import Chip from "@mui/material/Chip";
import type { RecipeType } from "../schemas/recipe.schema";

const COLOR_BY_TYPE: Record<RecipeType, "warning" | "success" | "secondary"> = {
  curry: "warning",
  salad: "success",
  dessert: "secondary",
};

const LABEL_BY_TYPE: Record<RecipeType, string> = {
  curry: "Curry",
  salad: "Salad",
  dessert: "Dessert",
};

export function RecipeTypeChip({ type }: { type: RecipeType }) {
  return <Chip size="small" label={LABEL_BY_TYPE[type]} color={COLOR_BY_TYPE[type]} variant="outlined" />;
}
