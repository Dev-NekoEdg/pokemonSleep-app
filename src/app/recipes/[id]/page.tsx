import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { getRecipe } from "@/features/recipes/services/recipe.service";
import { listIngredients } from "@/features/ingredients/services/ingredient.service";
import { RecipeForm } from "@/features/recipes/components/RecipeForm";
import { updateRecipeAction } from "@/features/recipes/actions/recipe.actions";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [recipe, ingredients] = await Promise.all([getRecipe(id), listIngredients()]);
  if (!recipe) notFound();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Edit {recipe.name}
      </Typography>
      <RecipeForm
        action={updateRecipeAction.bind(null, id)}
        ingredients={ingredients}
        defaultValues={recipe}
        submitLabel="Save Changes"
      />
    </Stack>
  );
}
