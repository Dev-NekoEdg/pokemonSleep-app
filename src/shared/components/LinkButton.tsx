"use client";

import Button, { type ButtonProps } from "@mui/material/Button";
import Link from "next/link";

/** MUI's `component={Link}` pattern passes a function across the RSC
 * boundary, which fails when the caller is a Server Component. Importing
 * `Link` here, inside a Client Component, keeps that wiring client-side. */
export function LinkButton({ href, ...props }: ButtonProps & { href: string }) {
  return <Button component={Link} href={href} {...props} />;
}
