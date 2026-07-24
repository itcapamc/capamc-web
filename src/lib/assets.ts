import fs from "node:fs";
import path from "node:path";

/** Whether a `/images/...` path actually exists under `public/`. */
export function publicImageExists(src?: string): boolean {
  if (!src || !src.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
