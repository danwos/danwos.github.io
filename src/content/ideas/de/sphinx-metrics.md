---
title: "Sphinx-Metrics"
summary: "Kennzahlen aus Google Analytics, Grafana und Co. direkt in der Dokumentation."
status: unlikely
order: 10
problem: |
  Wie oft eine Seite gelesen wird oder wie sich ein Projekt entwickelt, steht in Tools wie Google Analytics oder Grafana. Wer die Doku liest, sieht davon nichts – und wer die Zahlen sucht, muss erst Zugang zu diesen Tools bekommen.
solution: |
  Eine Sphinx-Erweiterung holt Kennzahlen aus externen Quellen und zeigt sie direkt in der Dokumentation an, zum Beispiel Seitenaufrufe pro Kapitel oder Build-Zeiten. Neue Quellen kommen über austauschbare „Treiber“ dazu.
tech: |
  Python, Sphinx-Erweiterung mit eigenen Directives; Treiber für die APIs von Google Analytics, Grafana und Co.; Abruf beim Build mit Cache.
---
