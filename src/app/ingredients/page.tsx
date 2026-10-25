import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { listIngredients } from "@/features/ingredients/services/ingredient.service";
import { IngredientList } from "@/features/ingredients/components/IngredientList";
import { LinkButton } from "@/shared/components/LinkButton";

export default async function IngredientsPage() {
  const ingredients = await listIngredients();

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Ingredients
        </Typography>
        <LinkButton href="/ingredients/new" variant="contained" startIcon={<AddIcon />}>
          New Ingredient
        </LinkButton>
      </Stack>
      <IngredientList ingredients={ingredients} />
    </Stack>
  );
}
