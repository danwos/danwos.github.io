---
title: "Sphinx-Autosar"
summary: "Document AUTOSAR architectures from ARXML files and link them to requirements."
status: unlikely
order: 30
problem: |
  In automotive projects, the software architecture lives in AUTOSAR ARXML files. Requirements, specifications and tests live elsewhere. Linking the two is mostly manual work.
solution: |
  A Sphinx extension reads ARXML files and generates architecture documentation from them, similar to an API reference. Software components, runnables and co. become Sphinx-Needs objects that can be linked to requirements and tests.
tech: |
  Python, an ARXML parser, Sphinx-Needs for objects and traceability.
translated_from: "6474019cc810"
---
