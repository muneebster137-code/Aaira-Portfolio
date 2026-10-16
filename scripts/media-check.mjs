// Verifies every slot in src/data/media.ts has a matching file in /public.
// Run: npm run media:check   (Node 22.18+ / 23.6+, which can import .ts directly)
import fs from "node:fs";
import path from "node:path";
import { media } from "../src/data/media.ts";

const PUBLIC = path.resolve(import.meta.dirname, "../public");

// Magic bytes: catches an .mp4 or .png renamed to .webm / .jpg.
const SIGNATURES = {
  ".jpg": [0xff, 0xd8, 0xff],
  ".webm": [0x1a, 0x45, 0xdf, 0xa3],
  ".pdf": [0x25, 0x50, 0x44, 0x46],
};

const slots = [];
(function walk(node, trail) {
  if (typeof node === "string") slots.push({ url: node, where: trail.join(".") });
  else if (node && typeof node === "object")
    for (const [k, v] of Object.entries(node)) walk(v, [...trail, k]);
})(media, ["media"]);

let problems = 0;
for (const { url, where } of slots) {
  const file = path.join(PUBLIC, url);
  const ext = path.extname(file).toLowerCase();
  if (!fs.existsSync(file)) {
    const base = path.basename(file, ext);
    const near = fs.existsSync(path.dirname(file))
      ? fs.readdirSync(path.dirname(file)).filter((f) => path.parse(f).name === base)
      : [];
    console.log(`MISSING  ${url}  (${where})${near.length ? `  found ${near.join(", ")} instead; rename/convert it to ${ext}` : ""}`);
    problems++;
    continue;
  }
  const sig = SIGNATURES[ext];
  const head = fs.readFileSync(file).subarray(0, 4);
  if (sig && !sig.every((b, i) => head[i] === b)) {
    console.log(`WRONG TYPE  ${url}  is not a real ${ext} file (export/convert it, don't just rename)`);
    problems++;
  }
}

console.log(`\n${slots.length} media slots checked, ${problems} problem(s).`);
process.exit(problems ? 1 : 0);
