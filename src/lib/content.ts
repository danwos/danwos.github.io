import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

/** Entry ids look like "de/quawa" (blog: "de/quawa-intro/index" or "de/quawa-intro"). */
export const langOf = (id: string) => id.split('/')[0];
export const slugOf = (id: string) => id.split('/').slice(1).filter((p) => p !== 'index').join('/');

export async function projectsFor(lang: Lang) {
  const all = await getCollection('projects', (e) => langOf(e.id) === lang);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function ideasFor(lang: Lang) {
  const all = await getCollection('ideas', (e) => langOf(e.id) === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function postsFor(lang: Lang) {
  const all = await getCollection('blog', (e) => langOf(e.id) === lang && (import.meta.env.DEV || !e.data.draft));
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
