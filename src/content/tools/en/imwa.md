---
title: "imwa"
subtitle: "impact watcher"
summary: "Shows me every day how far my work reaches – stars, visitors and where they come from."
era: "internal"
status: "prototype"
monster: "imwa"
role: [created]
order: 10
translated_from: "36f1d04941d4"
---

## Why imwa

I write blog posts and publish docs and code on GitHub. Whether any of it
lands is spread across many places: stars and traffic on GitHub, visitors in
GoatCounter, reactions on LinkedIn. Each place shows its own slice, and GitHub
forgets its traffic after two weeks.

imwa collects all of it once a day and keeps it. So months later I can still
see whether a post pushed up the visits to the docs and where people came
from.

## How it works

- **Every morning at eight** a small Python collector fetches the numbers:
  stars, forks and traffic of the danwos repositories, visitors and referrers
  of danwos.dev and the tool docs. If the machine was off, it catches up.
- **The data lives in my [monsterbrain](/en/tools/monsterbrain/)** as JSON
  Lines, one file per source and month, and gets committed. The history stays
  readable and versioned.
- **Datasette** turns it into charts and tables; SQLite is only a cache.
- **Agents** query the same numbers through a skill: "How many visitors did
  the deciwa docs get since the post?"

## Why it stays internal

imwa fits danwos exactly: my accounts, my sites and my monsterbrain. It runs
locally, without a server and without fees. As a product for others it
wouldn't work like this – and it doesn't have to.

## What's missing

LinkedIn, with both the profile and the company page, and Google Search
Console come next. npm and PyPI follow once the first package is published.
