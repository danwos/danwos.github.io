// Old Sphinx URLs (e.g. /posts/2025/toolchain_comparison.html) keep working:
// after the build, write a small redirect page for every post with a `legacy` path.
// Old posts were English, so they point to the English version.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const page = (to) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved</title><meta name="robots" content="noindex">
<link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0; url=${to}">
</head><body><p>This post moved to <a href="${to}">${to}</a>.</p></body></html>`;

const DROPPED = [
  'posts/2021/job_advertisement_sphinx_needs',
  'posts/2021/page_reactivation',
  'posts/mega_sphinx_enterprise/01_planing',
  'blog',
];

export function legacyRedirects() {
  return {
    name: 'legacy-redirects',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const base = fileURLToPath(new URL('../content/blog/en/', import.meta.url));
        let count = 0;
        for (const slug of await readdir(base)) {
          let text;
          try { text = await readFile(join(base, slug, 'index.md'), 'utf8'); } catch { continue; }
          const legacy = text.match(/^legacy:\s*"?([^"\n]+)"?$/m)?.[1];
          if (!legacy) continue;
          const file = join(out, `${legacy}.html`);
          await mkdir(dirname(file), { recursive: true });
          await writeFile(file, page(`/en/blog/${slug}/`));
          count++;
        }
        // Old pages that were not migrated land on the blog overview.
        for (const legacy of DROPPED) {
          const file = join(out, `${legacy}.html`);
          await mkdir(dirname(file), { recursive: true });
          await writeFile(file, page('/en/blog/'));
          count++;
        }
        logger.info(`${count} legacy redirects written`);
      },
    },
  };
}
