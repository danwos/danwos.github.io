import de from './de.json';
import en from './en.json';
import { locales, defaultLocale } from './locales.mjs';

export type Lang = 'de' | 'en';
export type Strings = typeof de;
export { locales, defaultLocale };

const strings: Record<Lang, Strings> = { de, en };

export const t = (lang: Lang): Strings => strings[lang];

/** Path in the given language, e.g. path('en', 'projects/quawa/') → "/en/projects/quawa/". */
export const path = (lang: Lang, rest = '') => `/${lang}/${rest}`;

/** The same page in another language: swaps the first path segment. */
export function switchPath(pathname: string, to: Lang) {
  const parts = pathname.split('/');
  parts[1] = to;
  return parts.join('/');
}
