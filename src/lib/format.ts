import type { Lang } from '../i18n';

export const formatDate = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(date);

/** Rough reading time at 200 words per minute. */
export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 200));
