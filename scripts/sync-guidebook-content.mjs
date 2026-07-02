import { access, copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const sourceDir = path.resolve(
  process.env.GUIDEBOOK_SOURCE_DIR ?? "../develop-with-llm/docs/guides/guidebook"
);
const targetDir = path.resolve(
  process.env.GUIDEBOOK_TARGET_DIR ?? path.join(cwd, "src/content/guidebook/ko")
);

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en"));
}

async function preserveSnapshot(reason) {
  if (await pathExists(targetDir)) {
    const existingFiles = await listMarkdownFiles(targetDir);

    if (existingFiles.length > 0) {
      console.warn(
        `[sync-guidebook-content] ${reason}; preserving ${existingFiles.length} existing markdown files in ${targetDir}.`
      );
      return;
    }
  }

  console.warn(
    `[sync-guidebook-content] ${reason}; no existing snapshot found in ${targetDir}.`
  );
}

if (!(await pathExists(sourceDir))) {
  await preserveSnapshot(`source directory not found: ${sourceDir}`);
  process.exit(0);
}

if (!(await pathExists(path.join(sourceDir, "README.md")))) {
  await preserveSnapshot(`source README.md not found in: ${sourceDir}`);
  process.exit(0);
}

const sourceFiles = await listMarkdownFiles(sourceDir);

if (sourceFiles.length === 0) {
  await preserveSnapshot(`no markdown files found in source directory: ${sourceDir}`);
  process.exit(0);
}

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });

for (const fileName of sourceFiles) {
  await copyFile(path.join(sourceDir, fileName), path.join(targetDir, fileName));
}

console.log(
  `[sync-guidebook-content] copied ${sourceFiles.length} markdown files from ${sourceDir} to ${targetDir}.`
);
