import "server-only";
import { readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";

const LOCAL_DB_DIR = path.join(process.cwd(), "local-db-json");

/**
 * Thin file-backed store standing in for the not-yet-built backend.
 * Every feature service reads/writes through this so swapping it for a
 * real API client later only touches this one module.
 */
export function jsonFileStore<T>(fileName: string) {
  const filePath = path.join(LOCAL_DB_DIR, fileName);

  return {
    async readAll(): Promise<T[]> {
      const raw = await readFile(filePath, "utf-8");
      return JSON.parse(raw) as T[];
    },

    async writeAll(items: T[]): Promise<void> {
      // Write to a temp file then rename, so a crash mid-write can't
      // leave the JSON file truncated/corrupted.
      const tmpPath = `${filePath}.${process.pid}.tmp`;
      await writeFile(tmpPath, JSON.stringify(items, null, 2) + "\n", "utf-8");
      await rename(tmpPath, filePath);
    },
  };
}
