// Link preview images: /og/<lang>/default.png, /og/<lang>/blog/<slug>.png,
// /og/<lang>/tools/<slug>.png – referenced from the og:image tag in Base.astro.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { card, crewCard, picture } from '../../lib/og';
import { langOf, slugOf } from '../../lib/content';
import { formatDate } from '../../lib/format';
import { locales } from '../../i18n/locales.mjs';
import { t, type Lang } from '../../i18n';

const monsterFile = (name: string) => resolve(`src/assets/monsters/${name}.webp`);

/** The cover path as written in the post's frontmatter, resolved from the post file. */
function coverFile(filePath: string | undefined) {
  if (!filePath) return undefined;
  const cover = readFileSync(filePath, 'utf8').match(/^cover:\s*["']?([^"'\n]+)/m)?.[1];
  return cover ? resolve(dirname(filePath), cover.trim()) : undefined;
}

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', (e) => !e.data.draft);
  const tools = await getCollection('tools');
  return [
    ...locales.map((lang: string) => ({ params: { path: `${lang}/default` }, props: { kind: 'default', lang } })),
    ...posts.map((e) => ({ params: { path: `${langOf(e.id)}/blog/${slugOf(e.id)}` }, props: { kind: 'blog', lang: langOf(e.id), entry: e } })),
    ...tools.map((e) => ({ params: { path: `${langOf(e.id)}/tools/${slugOf(e.id)}` }, props: { kind: 'tool', lang: langOf(e.id), entry: e } })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { kind, lang, entry } = props as { kind: string; lang: Lang; entry?: any };
  const s = t(lang);
  let png: Buffer;
  if (kind === 'blog') {
    const d = entry.data;
    // posts without a cover show the danwos monster sitting (monsters.md)
    const pic = await picture(coverFile(entry.filePath) ?? monsterFile('danwos-sitting'), 900, true);
    png = await card(`danwos · ${s.nav.blog}`, d.title, formatDate(d.date, lang), pic);
  } else if (kind === 'tool') {
    const d = entry.data;
    const art = d.era === 'archive' ? 'grandma' : d.monster ?? 'danwos';
    png = await card(`danwos · ${s.nav.tools}`, d.title, d.summary, await picture(monsterFile(art), 900, true));
  } else {
    const crew = Object.fromEntries(await Promise.all(
      ['danwos', 'monsterbrain', 'deciwa', 'quawa', 'faktwerk'].map(async (m) => [m, await picture(monsterFile(m), 700, true)])));
    png = await crewCard(s.hero.eyebrow, s.hero.title, crew);
  }
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
