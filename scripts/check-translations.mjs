// Lists translations whose German master changed since they were made.
// Every translated file stores the first 12 hex chars of the SHA-256 of its
// German master in `translated_from` (UI strings: `_translated_from`).
// Usage: node scripts/check-translations.mjs [--strict]   (--strict: exit 1 if outdated)
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const master = 'de';
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 12);

async function* files(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else if (/\.(md|mdx)$/.test(e.name)) yield p;
  }
}

const problems = [];
let checked = 0;

// Content: src/content/<collection>/<lang>/... mirrors src/content/<collection>/de/...
const content = join(root, 'src/content');
for (const collection of await readdir(content)) {
  const base = join(content, collection);
  let langs;
  try { langs = (await readdir(base, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name); } catch { continue; }
  for (const lang of langs.filter((l) => l !== master)) {
    for await (const file of files(join(base, lang))) {
      const rel = relative(join(base, lang), file);
      if (rel.startsWith('_')) continue;
      const text = await readFile(file, 'utf8');
      const stored = text.match(/^translated_from:\s*"?([0-9a-f]*)"?\s*$/m)?.[1];
      let de;
      try { de = await readFile(join(base, master, rel)); } catch { problems.push(`${collection}/${lang}/${rel}: no German master`); continue; }
      checked++;
      if (stored !== hash(de)) problems.push(`${collection}/${lang}/${rel}: ${stored ? 'German master changed' : 'no translated_from'}`);
    }
  }
}

// UI strings: src/i18n/<lang>.json
const i18n = join(root, 'src/i18n');
const deStrings = await readFile(join(i18n, `${master}.json`));
for (const f of (await readdir(i18n)).filter((f) => f.endsWith('.json') && f !== `${master}.json`)) {
  checked++;
  const stored = JSON.parse(await readFile(join(i18n, f), 'utf8'))._translated_from;
  if (stored !== hash(deStrings)) problems.push(`i18n/${f}: German master changed`);
}

if (problems.length) {
  console.log(`${problems.length} of ${checked} translations are outdated:`);
  for (const p of problems) console.log(`  - ${p}`);
  if (process.argv.includes('--strict')) process.exit(1);
} else {
  console.log(`All ${checked} translations are up to date.`);
}
