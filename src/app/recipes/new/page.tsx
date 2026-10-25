import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { listIngredients } from "@/features/ingredients/services/ingredient.service";
import { RecipeForm } from "@/features/recipes/components/RecipeForm";
import { createRecipeAction } from "@/features/recipes/actions/recipe.actions";

export default async function NewRecipePage() {
  const ingredients = await listIngredients();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        New Recipe
      </Typography>
      <RecipeForm action={createRecipeAction} ingredients={ingredients} submitLabel="Create Recipe" />
    </Stack>
  );
}
