// Entry program for make.fun's "Post a GTA 6 meme on X" bounty.
//
// The post on X is the entry; this program's single job is to hand the
// house the post's address by copying this repository's POST.json into
// the output directory the harness points at. It reads nothing else,
// writes nothing else, and prints nothing when it succeeds.

import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Where the repository and the output folder are. The harness sets
// MAKEFUN_BOT_DIR to the repository and MAKEFUN_OUTPUT_DIR to the folder
// that receives the copy; run by hand without them, the repository is
// this file's own folder and the output falls back to the /output path
// the bounty's rules name.
function resolveDirs(): { repoDir: string; outputDir: string } {
  const repoDir =
    process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return { repoDir, outputDir };
}

// Read POST.json and make sure it really names an X post before anything
// is handed over: a malformed file should fail loudly here rather than
// be copied through and refused at the bounty's gate.
async function loadPostBytes(repoDir: string): Promise<Buffer> {
  const bytes = await readFile(join(repoDir, "POST.json"));
  const parsed: unknown = JSON.parse(bytes.toString("utf8"));
  const url =
    typeof parsed === "object" && parsed !== null
      ? (parsed as { url?: unknown }).url
      : undefined;
  const statusShape =
    /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;
  if (typeof url !== "string" || !statusShape.test(url)) {
    throw new Error(
      "POST.json does not hold an X post address of the expected shape",
    );
  }
  return bytes;
}

// Copy the bytes across, then read the copy back and compare: the entry
// only counts if the output holds exactly what the repository holds.
async function publishPostFile(
  postBytes: Buffer,
  outputDir: string,
): Promise<void> {
  const targetPath = join(outputDir, "POST.json");
  await mkdir(outputDir, { recursive: true });
  await writeFile(targetPath, postBytes);
  const written = await readFile(targetPath);
  if (!written.equals(postBytes)) {
    throw new Error("the copied POST.json differs from the repository's");
  }
}

async function main(): Promise<void> {
  const { repoDir, outputDir } = resolveDirs();
  const postBytes = await loadPostBytes(repoDir);
  await publishPostFile(postBytes, outputDir);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
