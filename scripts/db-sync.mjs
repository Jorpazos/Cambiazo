// Runs at build time on Vercel.
// If a Postgres URL is present, sync the Prisma schema to the DB so we never
// ship code that expects tables the DB hasn't seen.
// If no URL is present yet (first deploy before the DB is created) we skip
// silently so the build still succeeds — the app will boot but API routes
// that hit Prisma will simply fail at runtime until the DB is hooked up.

import { spawnSync } from "node:child_process";

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL;

if (!url) {
  console.log("[db-sync] No DATABASE_URL / POSTGRES_PRISMA_URL set — skipping schema sync.");
  process.exit(0);
}

console.log("[db-sync] Syncing Prisma schema to database...");
const result = spawnSync("npx", ["prisma", "db", "push", "--skip-generate", "--accept-data-loss"], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 0);
