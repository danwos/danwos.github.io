---
title: "Sphinx-Metrics"
summary: "Metrics from Google Analytics, Grafana and co. right inside the documentation."
status: unlikely
order: 10
problem: |
  How often a page is read or how a project develops lives in tools like Google Analytics or Grafana. Readers of the docs see none of it – and anyone looking for the numbers first needs access to those tools.
solution: |
  A Sphinx extension fetches metrics from external sources and shows them right in the documentation, e.g. page views per chapter or build times. New sources plug in as exchangeable "drivers".
tech: |
  Python, Sphinx extension with its own directives; drivers for the APIs of Google Analytics, Grafana and co.; fetched at build time with a cache.
translated_from: "ca9db7a322d4"
---
