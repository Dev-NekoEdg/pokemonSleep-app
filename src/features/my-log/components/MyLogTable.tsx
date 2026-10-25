import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { MyLogItem } from "../schemas/log.schema";
import { MyLogRow } from "./MyLogRow";

export function MyLogTable({ items }: { items: MyLogItem[] }) {
  if (items.length === 0) {
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
            <TableCell align="center">Cooked?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <MyLogRow key={item.recipeId} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
