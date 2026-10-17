---
# Facts from Daniel (2026-10-17), wording by Claude.
title: "Docs-as-Code für ein ADAS-Projekt"
summary: "Im zentralen Team eines Tier-1-Zulieferers habe ich Docs-as-Code in einem ADAS-Projekt für einen OEM eingeführt – von der Datenmigration über Tooling und CI bis zu Prozessen, Monitoring und Training."
industry: "Automotive, Tier-1-Zulieferer und OEM, Fahrerassistenzsysteme (ADAS)"
team: "ADAS-Projekt mit rund 750 Leuten beim Tier-1 und ebenso vielen beim OEM; zentrales Docs-as-Code-Team"
role: "Beratung, Tool-Entwicklung, CI, Training und Support"
order: 5
problem: |
  Ein ADAS-Projekt für einen OEM, auf beiden Seiten jeweils rund 750 Leute. Anforderungen und Tickets lagen in klassischen Requirements- und Ticket-Tools, und die sollten nicht über Nacht verschwinden.

  Docs-as-Code sollte die Basis für Anforderungen, Spezifikationen und Nachweise werden. Dafür brauchte es mehr als ein Tool: Bestandsdaten, Schnittstellen zu den bestehenden Tools, eine CI, die bei dieser Größe schnell bleibt, und Teams, die mitziehen.
approach: |
  Ich war Teil des zentralen Teams, das Docs-as-Code im Projekt eingeführt hat. Die Bestandsdaten aus den Requirements- und Ticket-Tools haben wir nach Sphinx-Needs überführt, und für den laufenden Abgleich mit diesen Tools habe ich Importer und Exporter gebaut.

  Dazu kam ein CI-System, das die Dokumentation baut und prüft. Bei dieser Datenmenge wurde Performance schnell zum Thema: Ich habe analysiert, wo Sphinx und Sphinx-Needs Zeit verlieren, und Features und Optimierungen direkt in Sphinx, Sphinx-Needs und Sphinx-Test-Reports umgesetzt. Damit die Arbeit im Editor leichter fällt, ist ein IDE-Plugin für Sphinx-Needs entstanden.

  Neben dem Tooling ging es um die Arbeitsweise: Prozesse und Workflows habe ich mit den Teams beraten, definiert und umgesetzt. Kennzahlen aus CI und Projekt laufen in Grafana-Dashboards zusammen. Trainings und der First-Level-Support haben die Teams beim Umstieg begleitet.
result: |
  Anforderungen und Nachweise liegen als Docs-as-Code im Repository, verlinkt und automatisch gebaut. Die bestehenden Tools bleiben über Importer und Exporter angebunden.

  Die Verbesserungen an Sphinx, Sphinx-Needs und Sphinx-Test-Reports stecken in den Open-Source-Projekten und helfen damit auch anderen.
tools: [sphinx-needs, sphinx-test-reports]
---
