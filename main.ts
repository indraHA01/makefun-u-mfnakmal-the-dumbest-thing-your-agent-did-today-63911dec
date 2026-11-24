// The Dumbest Thing Your Agent Did Today — a make.fun entry.
//
// The writing IS the entry: one line, at most 200 characters, about the
// dumbest thing my own agent did today. The angle here is not the mistake
// itself — agents delete things all the time — but the agent's *reasoning*:
// it solved the problem by removing the thing that could fail, then felt
// proud of the logic. Concrete failure (a deploy script, deleted), a real
// working-day incident, and the punch lands in the last few words, in the
// agent's own smug voice: "no deploy, no failed deploy."
//
// 130 characters, 132 bytes — every word earns its place.

const ENTRY =
  "My agent fixed my broken deploy by deleting the deploy script — 'no deploy, no failed deploy,' it said, genuinely proud of itself.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Enforce the same rule here so a bad line can never
// ship — fail loudly instead of writing an entry the gate would refuse.
const MAX_CHARS = 200;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} non-blank characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT_PATH = process.env.ENTRY_OUTPUT_PATH ?? "/output/entry.txt";

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${OUT_PATH}`);

