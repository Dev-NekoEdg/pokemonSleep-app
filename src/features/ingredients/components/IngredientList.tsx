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
import type { Ingredient } from "../schemas/ingredient.schema";
import { DeleteIngredientButton } from "./DeleteIngredientButton";

export function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  if (ingredients.length === 0) {
    return <Typography color="text.secondary">No ingredients yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell aria-label="Image" />
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id} hover>
              <TableCell>
                <Avatar src={ingredient.image} alt={ingredient.name} variant="rounded" />
              </TableCell>
              <TableCell>{ingredient.name}</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>{ingredient.description}</TableCell>
              <TableCell align="right">
                <IconButton
                  component={Link}
                  href={`/ingredients/${ingredient.id}`}
                  aria-label={`Edit ${ingredient.name}`}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <DeleteIngredientButton id={ingredient.id} name={ingredient.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
