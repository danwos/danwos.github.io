// @ts-check
import { defineConfig } from 'astro/config';
import { locales, defaultLocale } from './src/i18n/locales.mjs';

export default defineConfig({
  site: 'https://danwos.dev',
  trailingSlash: 'always',
  i18n: {
    locales,
    defaultLocale,
    // "/" is our own page that picks the language from the browser.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
