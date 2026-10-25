"use client";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";

const MODULES = [
  {
    href: "/ingredients",
    title: "Ingredients",
    description: "Browse and manage every cooking ingredient.",
  },
  {
    href: "/recipes",
    title: "Recipes",
    description: "Browse and manage curry, salad, and dessert recipes.",
  },
  {
    href: "/my-log",
    title: "My Log",
    description: "Track which recipes you've actually cooked in-game.",
  },
] as const;

export default function HomePage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Welcome, Trainer
      </Typography>
      <Typography color="text.secondary">
        Manage your Pokémon Sleep ingredients and recipes, and keep a log of what you&apos;ve cooked.
      </Typography>
      <Grid container spacing={2}>
        {MODULES.map((mod) => (
          <Grid key={mod.href} size={{ xs: 12, sm: 4 }}>
            <Card>
              <CardActionArea component={Link} href={mod.href} sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {mod.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mod.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
