// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/integrations/legacy-redirects.mjs';
import { feedback } from './src/integrations/feedback.mjs';
import { locales, defaultLocale } from './src/i18n/locales.mjs';

export default defineConfig({
  site: 'https://danwos.dev',
  integrations: [
    mdx(),
    // "/" only picks the language, so it stays out of the sitemap.
    sitemap({ filter: (page) => page !== 'https://danwos.dev/' }),
    legacyRedirects(),
    feedback(),
  ],
  trailingSlash: 'always',
  i18n: {
    locales,
    defaultLocale,
    // "/" is our own page that picks the language from the browser.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
