"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { Recipe } from "../schemas/recipe.schema";
import { RecipeTypeChip } from "./RecipeTypeChip";
import { DeleteRecipeButton } from "./DeleteRecipeButton";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return <Typography color="text.secondary">No recipes match this filter.</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell aria-label="Image" />
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Ingredients</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.id} hover>
              <TableCell>
                <Avatar src={recipe.image} alt={recipe.name} variant="rounded" />
              </TableCell>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>
                <RecipeTypeChip type={recipe.type} />
              </TableCell>
              <TableCell sx={{ color: "text.secondary" }}>
                {recipe.ingredients.length === 0
                  ? "Any ingredients"
                  : recipe.ingredients.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  component={Link}
                  href={`/recipes/${recipe.id}`}
                  aria-label={`Edit ${recipe.name}`}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <DeleteRecipeButton id={recipe.id} name={recipe.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
