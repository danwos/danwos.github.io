---
# Facts from Daniel (2026-10-17), wording by Claude.
title: "Feature-Planung mit Sphinx-Needs"
summary: "Bei useblocks läuft die Bedarfsplanung für Produkt-Features in Sphinx-Needs – vom Kundenwunsch über das Problem bis zum Feature, zur Roadmap und zu den Aufgaben der Entwicklungsteams."
industry: "Software-Tools, useblocks (intern)"
role: "Konzept und Umsetzung"
order: 40
problem: |
  Kundenwünsche kommen über viele Wege: aus Projekten, Gesprächen, Supportanfragen. Schnell geht dabei verloren, woher ein Wunsch kam, welches Problem dahintersteckt und was am Ende daraus geworden ist.

  Für die Produktplanung bei useblocks brauchte es einen Ort, an dem Wünsche, Probleme und Features zusammenhängen – nachvollziehbar vom ersten Kundengespräch bis in die Entwicklung.
approach: |
  Ich habe die Bedarfsplanung mit Sphinx-Needs aufgebaut. Kundenwünsche, Probleme und Features sind eigene Objekte, die miteinander verlinkt sind. Ein Workflow regelt, wie ein Wunsch geprüft, einem Problem zugeordnet und in ein Feature überführt wird. Ein CI-System baut und prüft das Ganze bei jeder Änderung.

  Features werden aus Sicht der Nutzenden beschrieben: Wer braucht was, und warum? Von dort werden sie heruntergebrochen und in Aufgaben für die Entwicklungsteams abgeleitet. Aus denselben Daten entstehen die Feature-Roadmaps.
result: |
  Jeder Kundenwunsch ist nachverfolgbar: welchem Problem er zugeordnet ist, welches Feature ihn löst und wann es kommt. Die Entwicklungsteams sehen, warum sie etwas bauen, und die Roadmap bleibt mit den Wünschen dahinter verbunden.
tools: [sphinx-needs]
---
