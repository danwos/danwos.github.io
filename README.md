# danwos.dev

Website of Daniel Woste / danwos. Static site built with [Astro](https://astro.build),
deployed to GitHub Pages. German is the master language, English is a
reviewed translation.

Concept, decisions and project facts live in the brain
(`~/brain/danwos/20_facts/projects/website/`), not in this repository.

## Get started

Requirements: Git, Node.js 22 or newer (tested with 24), npm.

```bash
git clone git@github.com:danwos/danwos.github.io.git
cd danwos.github.io
npm install
npm run dev        # dev server with hot reload: http://localhost:4321
```

Other commands:

```bash
npm run build                # static site in dist/
npm run preview              # serve dist/ locally: http://localhost:4321
npm run check:translations   # list English pages whose German master changed
```

`/` picks the language from the browser; `/de/` and `/en/` open a language
directly.

## Structure

| Path | Content |
|---|---|
| `src/pages/index.astro` | `/` – picks the language (saved choice → browser → German) |
| `src/pages/[lang]/` | start page and all pages per language |
| `src/content/tools/<lang>/` | tools (current and archive), one file each → `/<lang>/tools/` |
| `src/content/projects/<lang>/` | stories from consulting work → `/<lang>/projects/` (template: `de/_template.md`) |
| `src/content/views/<lang>/` | views page text → `/<lang>/views/` |
| `src/content/blog/<lang>/<slug>/` | blog posts → `/<lang>/blog/`, RSS at `/<lang>/rss.xml` |
| `src/content/ideas/<lang>/` | ideas with problem, solution, tech, status → `/<lang>/ideas/` |
| `src/content/about/`, `src/content/cv/` | about text and career stations → `/<lang>/about/` |
| `src/content/legal/<lang>/` | imprint and privacy |
| `src/i18n/` | languages and UI strings (`de.json` is the master) |
| `src/styles/tokens.css` | colours, fonts, radii from the danwos branding paper |
| `src/assets/monsters/`, `src/assets/people/` | cut-out monsters and portraits, downscaled from the brain |
| `src/integrations/` | redirects for old Sphinx URLs, dev-only feedback app |

## Languages

German is the master. Every translation stores the hash of its German file
in `translated_from` (UI strings: `_translated_from`).
`npm run check:translations` lists outdated translations; the CI runs it on
every build. A new language: add its code to `src/i18n/locales.mjs`, add
`src/i18n/<code>.json` and `src/content/*/<code>/`.

## Feedback

`npm run dev` shows the Astro toolbar at the bottom of the page. Its
**Feedback** app (speech bubble) lets you click any element and leave a
comment; open comments show as numbered pins. Comments land in
`.feedback/feedback.json` (git-ignored) with page, element, nearby heading,
viewport and theme – an agent works through them and marks them done.

## Deployment

`.github/workflows/website.yml` builds every push and pull request and
deploys to GitHub Pages **only from `main`** (Pages source "GitHub Actions").
The site is `https://danwos.dev` (`public/CNAME`); `www.danwos.dev` points to
it. A sitemap (`/sitemap-index.xml`) is built with every deploy and named in
`public/robots.txt`.

## Maintenance mode

The repository variable `MAINTENANCE` (Settings → Secrets and variables →
Actions → Variables) switches the published site to a maintenance page:
danwos monster, a short note in German and English, email and LinkedIn.

```bash
gh variable set MAINTENANCE --body 1   # on
gh variable set MAINTENANCE --body 0   # off – the site is back as built from main
gh workflow run website                # deploy now
```

With `MAINTENANCE=1`, `scripts/maintenance.mjs` copies the page built from
`src/pages/maintenance.astro` over every HTML file in `dist/` after the build.
Imprint and privacy stay, as do the link preview images (`/og/`), favicon,
`CNAME` and `robots.txt`; the RSS feeds go. The page carries `noindex` and
no visit counter. Pushes to `main` keep deploying the maintenance page while
the variable is `1`. Locally: `MAINTENANCE=1 npm run build`.

## Open after release

- postal address in `src/content/legal/` (imprint, privacy)
- forward `danwos.de` and `daniel-woste.de` (keeping the path) to `https://danwos.dev`
