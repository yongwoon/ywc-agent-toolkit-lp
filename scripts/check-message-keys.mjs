import { readFile } from "node:fs/promises";
import path from "node:path";

const messagesDir = path.join(process.cwd(), "src/messages");
const sourceLocale = "en";
const targetLocales = ["ja", "ko", "zh", "es"];

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function collectLeafKeys(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectLeafKeys(item, `${prefix}[${index}]`));
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      collectLeafKeys(child, prefix ? `${prefix}.${key}` : key)
    );
  }

  return [prefix];
}

function hasKey(value, keyPath) {
  const parts = keyPath.match(/[^.[\]]+|\[\d+\]/g) ?? [];
  let current = value;

  for (const part of parts) {
    if (part.startsWith("[")) {
      const index = Number(part.slice(1, -1));
      if (!Array.isArray(current) || current[index] === undefined) {
        return false;
      }
      current = current[index];
      continue;
    }

    if (current === null || typeof current !== "object" || !(part in current)) {
      return false;
    }
    current = current[part];
  }

  return true;
}

const sourceMessages = await readJson(path.join(messagesDir, `${sourceLocale}.json`));
const sourceKeys = collectLeafKeys(sourceMessages).sort((a, b) => a.localeCompare(b, "en"));
const failures = [];

for (const locale of targetLocales) {
  const messages = await readJson(path.join(messagesDir, `${locale}.json`));
  const missing = sourceKeys.filter((key) => !hasKey(messages, key));

  if (missing.length > 0) {
    failures.push({ locale, missing });
  }
}

if (failures.length > 0) {
  console.error("[check-message-keys] missing translation keys:");
  for (const failure of failures) {
    for (const key of failure.missing) {
      console.error(`  ${failure.locale}: ${key}`);
    }
  }
  process.exit(1);
}

console.log(
  `[check-message-keys] ${targetLocales.length} locales match ${sourceKeys.length} ${sourceLocale} leaf keys.`
);
