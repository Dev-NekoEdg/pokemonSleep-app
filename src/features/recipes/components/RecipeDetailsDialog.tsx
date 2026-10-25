"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import type { RecipeIngredient } from "../schemas/recipe.schema";

export type RecipeDetails = {
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
};

export function RecipeDetailsDialog({
  recipe,
  open,
  onClose,
}: {
  recipe: RecipeDetails | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{recipe?.name}</DialogTitle>
      <DialogContent>
        {recipe?.description && (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {recipe.description}
          </Typography>
        )}
        {recipe?.ingredients.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Accepts any ingredients.
          </Typography>
        ) : (
          <List disablePadding>
            {recipe?.ingredients.map((ingredient) => (
              <ListItem key={ingredient.ingredientId} disableGutters>
                <ListItemAvatar>
                  <Avatar src={ingredient.image} alt={ingredient.name} variant="rounded" />
                </ListItemAvatar>
                <ListItemText primary={ingredient.name} secondary={`×${ingredient.quantity}`} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
