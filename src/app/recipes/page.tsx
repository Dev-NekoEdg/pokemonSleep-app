import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { listRecipes } from "@/features/recipes/services/recipe.service";
import { recipeTypeSchema } from "@/features/recipes/schemas/recipe.schema";
import { RecipeList } from "@/features/recipes/components/RecipeList";
import { RecipeTypeFilter } from "@/features/recipes/components/RecipeTypeFilter";
import { LinkButton } from "@/shared/components/LinkButton";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type: typeParam } = await searchParams;
  const parsedType = recipeTypeSchema.safeParse(typeParam);
  const type = parsedType.success ? parsedType.data : undefined;

  const recipes = await listRecipes({ type });

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Recipes
        </Typography>
        <LinkButton href="/recipes/new" variant="contained" startIcon={<AddIcon />}>
          New Recipe
        </LinkButton>
      </Stack>
      <RecipeTypeFilter value={type ?? "all"} />
      <RecipeList recipes={recipes} />
    </Stack>
  );
}
