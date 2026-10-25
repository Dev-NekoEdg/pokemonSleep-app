import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IngredientForm } from "@/features/ingredients/components/IngredientForm";
import { createIngredientAction } from "@/features/ingredients/actions/ingredient.actions";

export default function NewIngredientPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        New Ingredient
      </Typography>
      <IngredientForm action={createIngredientAction} submitLabel="Create Ingredient" />
    </Stack>
  );
}
