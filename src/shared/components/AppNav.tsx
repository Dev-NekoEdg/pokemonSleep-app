"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/ingredients", label: "Ingredients" },
  { href: "/recipes", label: "Recipes" },
  { href: "/my-log", label: "My Log" },
] as const;

export function AppNav() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, color: "inherit", textDecoration: "none", fontWeight: 700 }}
        >
          Pokémon Sleep Cookbook
        </Typography>
        <Stack direction="row" spacing={1}>
          {NAV_LINKS.map((link) => (
            <Button key={link.href} component={Link} href={link.href} color="inherit">
              {link.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
