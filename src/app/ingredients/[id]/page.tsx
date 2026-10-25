import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { getIngredient } from "@/features/ingredients/services/ingredient.service";
import { IngredientForm } from "@/features/ingredients/components/IngredientForm";
import { updateIngredientAction } from "@/features/ingredients/actions/ingredient.actions";

export default async function EditIngredientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ingredient = await getIngredient(id);
  if (!ingredient) notFound();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Edit {ingredient.name}
      </Typography>
      <IngredientForm
        action={updateIngredientAction.bind(null, id)}
        defaultValues={ingredient}
        submitLabel="Save Changes"
      />
    </Stack>
  );
}
