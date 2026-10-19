---
title: "Smart Code Block"
summary: "Code und sein Ergebnis aus einer einzigen Quelle zeigen."
status: likely
order: 20
problem: |
  Wer Dokumentation über rst oder Markdown schreibt, zeigt oft den Code und das Ergebnis daneben. Dafür steht derselbe Code zweimal in der Datei: einmal als Code-Block, einmal zum Ausführen. Ändert man nur eine Stelle, passen beide nicht mehr zusammen.
solution: |
  Ein „smarter“ Code-Block, der aus einer Quelle beides erzeugt: den Code und das gerenderte Ergebnis – zum Beispiel in zwei Tabs „Ergebnis“ und „Code“.
tech: |
  Python, Sphinx-Directive, die ihren Inhalt parst und zusätzlich als Code-Block ausgibt; Tabs über sphinx-design.
---
