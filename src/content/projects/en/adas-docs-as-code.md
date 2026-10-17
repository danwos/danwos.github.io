---
title: "Docs-as-code for an ADAS project"
summary: "In the central team of a Tier-1 supplier, I introduced docs-as-code in an ADAS project for an OEM – from data migration, tooling and CI to processes, monitoring and training."
industry: "Automotive, Tier-1 supplier and OEM, advanced driver assistance systems (ADAS)"
team: "ADAS project with about 750 people at the Tier-1 and as many at the OEM; central docs-as-code team"
period: "2021–2024"
role: "Consulting, tool development, CI, training and support"
order: 30
problem: |
  An ADAS project for an OEM, with about 750 people on each side. Requirements and tickets lived in classic requirements and ticket tools, and those were not going away overnight.

  Docs-as-code was to become the base for requirements, specifications and evidence. That took more than a tool: legacy data, interfaces to the existing tools, a CI that stays fast at this size, and teams willing to come along.
approach: |
  I was part of the central team that introduced docs-as-code in the project. We moved the legacy data from the requirements and ticket tools into Sphinx-Needs, and I built importers and exporters to keep those tools in sync.

  Then came a CI system that builds and checks the documentation. With this much data, performance quickly mattered: I analyzed where Sphinx and Sphinx-Needs lose time and built features and optimizations right into Sphinx, Sphinx-Needs and Sphinx-Test-Reports. To make work in the editor easier, an IDE plugin for Sphinx-Needs came out of it.

  Beyond tooling, it was about how people work: I advised on, defined and implemented processes and workflows with the teams. Metrics from CI and the project come together in Grafana dashboards. Trainings and first-level support helped the teams make the switch.
result: |
  Requirements and evidence live as docs-as-code in the repository, linked and built automatically. The existing tools stay connected through importers and exporters.

  The improvements to Sphinx, Sphinx-Needs and Sphinx-Test-Reports went into the open-source projects, so they help others too.
tools: [sphinx-needs, sphinx-test-reports]
translated_from: "7101aa9fdd00"
---
