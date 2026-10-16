# danwos.dev

Website of Daniel Woste / danwos. Static site built with [Astro](https://astro.build),
deployed to GitHub Pages.

Concept, decisions and project facts live in the brain
(`~/brain/danwos/20_facts/projects/website/`), not in this repository.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Structure

| Path | Content |
|---|---|
| `src/pages/index.astro` | `/` – picks the language (saved choice → browser → German) |
| `src/pages/[lang]/` | start page and project pages per language |
| `src/content/<collection>/<lang>/` | projects and ideas, one Markdown file each |
| `src/i18n/` | languages and UI strings (`de.json` is the master) |
| `src/styles/tokens.css` | colours, fonts, radii from the danwos branding paper |
| `src/assets/monsters/` | cut-out monsters, downscaled from the brain masters |
| `legacy/` | the old Sphinx site, source for the blog migration |

## Feedback

`npm run dev` shows the Astro toolbar at the bottom of the page. Its
**Feedback** app (speech bubble) lets you click any element and leave a
comment; open comments show as numbered pins. Comments land in
`.feedback/feedback.json` (git-ignored) with page, element, nearby heading,
viewport and theme – an agent works through them and marks them done.

## Languages

German is the master. Every other language is a translation of the German
file and stores its hash in `translated_from` (`_translated_from` in the UI
strings), so outdated translations can be found.

## Before release

- remove `<meta name="robots" content="noindex">` in `src/layouts/Base.astro`
- add `public/CNAME` with `danwos.dev`, set Pages source to "GitHub Actions"
- imprint and privacy pages
- redirect pages for old Sphinx URLs, remove `legacy/`
