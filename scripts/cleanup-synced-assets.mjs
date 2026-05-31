import { access, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const targetDir = path.join(rootDir, "public", "assets");
const markerPath = path.join(targetDir, ".synced-from-root-assets");

try {
  await access(markerPath);
} catch {
  console.log("[cleanup-assets] Skipped: no generated assets to clean");
  process.exit(0);
}

await rm(targetDir, { recursive: true, force: true });
console.log("[cleanup-assets] Removed generated ./public/assets");
