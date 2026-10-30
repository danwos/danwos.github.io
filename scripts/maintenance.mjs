// Runs after `astro build`. With MAINTENANCE=1 every page in dist/ shows the
// maintenance page (src/pages/maintenance.astro); imprint and privacy stay.
// Images (/og/…png), favicon, CNAME and robots.txt stay as built. RSS feeds go.
// Without MAINTENANCE=1 only the maintenance page itself is removed from dist/.
// Usage: MAINTENANCE=1 node scripts/maintenance.mjs
import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;
const source = join(dist, 'maintenance');
const keep = ['de/imprint/index.html', 'en/imprint/index.html', 'de/privacy/index.html', 'en/privacy/index.html'];

async function* files(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else yield p;
  }
}

if (process.env.MAINTENANCE === '1') {
  const page = await readFile(join(source, 'index.html'));
  let pages = 0;
  for await (const f of files(dist)) {
    const rel = relative(dist, f);
    if (rel.startsWith('maintenance/') || keep.includes(rel)) continue;
    if (rel.endsWith('.html')) { await writeFile(f, page); pages++; }
    else if (rel.endsWith('rss.xml')) await rm(f);
  }
  console.log(`maintenance: on – ${pages} pages replaced, imprint and privacy kept`);
} else {
  console.log('maintenance: off');
}
await rm(source, { recursive: true, force: true });
