import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getMyLog } from "@/features/my-log/services/log.service";
import { myLogFiltersSchema } from "@/features/my-log/schemas/log.schema";
import { MyLogFilters } from "@/features/my-log/components/MyLogFilters";
import { MyLogTable } from "@/features/my-log/components/MyLogTable";

export default async function MyLogPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; registered?: string }>;
}) {
  const rawParams = await searchParams;
  const filters = myLogFiltersSchema.parse(rawParams);
  const items = await getMyLog(filters);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        My Log
      </Typography>
      <Typography color="text.secondary">
        Check off every recipe you&apos;ve actually cooked in Pokémon Sleep.
      </Typography>
      <MyLogFilters filters={filters} />
      <MyLogTable items={items} />
    </Stack>
  );
}
