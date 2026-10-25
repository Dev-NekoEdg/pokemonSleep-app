"use client";

import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import { RecipeTypeChip } from "@/features/recipes/components/RecipeTypeChip";
import { RecipeDetailsDialog } from "@/features/recipes/components/RecipeDetailsDialog";
import type { MyLogItem } from "../schemas/log.schema";
import { RegisteredCheckbox } from "./RegisteredCheckbox";

export function MyLogRow({ item }: { item: MyLogItem }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <TableRow hover onClick={() => setDetailsOpen(true)} sx={{ cursor: "pointer" }}>
        <TableCell>
          <Avatar src={item.image} alt={item.name} variant="rounded" />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <RecipeTypeChip type={item.type} />
        </TableCell>
        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
          <RegisteredCheckbox recipeId={item.recipeId} isRegistered={item.isRegistered} />
        </TableCell>
      </TableRow>
      <RecipeDetailsDialog
        recipe={item}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}
