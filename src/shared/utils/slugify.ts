export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['".]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Appends -2, -3, ... until `candidate` isn't in `existingIds`. */
export function uniqueSlug(name: string, existingIds: ReadonlySet<string>): string {
  const base = slugify(name);
  if (!existingIds.has(base)) return base;
  let n = 2;
  while (existingIds.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
