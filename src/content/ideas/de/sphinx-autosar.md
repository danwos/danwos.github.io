---
title: "Sphinx-Autosar"
summary: "AUTOSAR-Architekturen aus ARXML-Dateien dokumentieren und mit Anforderungen verlinken."
status: unlikely
order: 30
problem: |
  In Automotive-Projekten steckt die Softwarearchitektur in ARXML-Dateien von AUTOSAR. Anforderungen, Spezifikationen und Tests liegen woanders. Eine Verbindung zwischen beiden gibt es meist nur von Hand.
solution: |
  Eine Sphinx-Erweiterung liest ARXML-Dateien und erzeugt daraus eine Architektur-Dokumentation, ähnlich einer API-Doku. Software-Komponenten, Runnables und Co. werden zu Sphinx-Needs-Objekten, die sich mit Anforderungen und Tests verlinken lassen.
tech: |
  Python, ARXML-Parser, Sphinx-Needs für Objekte und Traceability.
---
