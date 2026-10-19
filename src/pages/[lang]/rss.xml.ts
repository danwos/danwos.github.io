import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { postsFor, slugOf } from '../../lib/content';
import { t, locales, type Lang } from '../../i18n';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const s = t(lang);
  const posts = await postsFor(lang);
  return rss({
    title: `danwos – ${s.blog.title}`,
    description: s.blog.pageLead,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: `/${lang}/blog/${slugOf(p.id)}/`,
    })),
    customData: `<language>${lang}</language>`,
  });
}
