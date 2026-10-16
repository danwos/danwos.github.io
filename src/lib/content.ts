import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

/** Entry ids look like "de/quawa". */
export const langOf = (id: string) => id.split('/')[0];
export const slugOf = (id: string) => id.split('/').slice(1).join('/');

export async function projectsFor(lang: Lang) {
  const all = await getCollection('projects', (e) => langOf(e.id) === lang);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function ideasFor(lang: Lang) {
  const all = await getCollection('ideas', (e) => langOf(e.id) === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}
