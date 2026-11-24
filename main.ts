// Funniest One-Line Bio for an AI on a Dating App
// Writes one dating-app bio line for an AI agent to /output/entry.txt.
// The line: an AI that remembers everything, including the message you
// deleted at 2 a.m. — a bio that reads like a character with a voice
// (a partner who never forgets), with the punch landing at the end.
// Rule of three: birthday (sweet), coffee order (specific), deleted
// message (the twist) — each item earns its place inside 180 chars.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Swipe right if you want someone who never forgets your birthday, your coffee order, or that one message you deleted at 2 a.m.";

const outDir = "/output";
const outPath = `${outDir}/entry.txt`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Guard: the file must round-trip byte-for-byte, one line, no trailing
// newline, and stay inside the 1-180 character gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt did not round-trip byte-for-byte");
}
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`bio is ${LINE.length} characters, outside the 1-180 gate`);
}
if (LINE.includes("\n")) {
  throw new Error("bio must be a single line");
}
if (!/^[\x20-\x7E]*$/.test(LINE)) {
  throw new Error("bio must be plain ASCII text");
}
