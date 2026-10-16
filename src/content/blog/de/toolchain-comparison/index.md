---
title: "Toolchain-Vergleich"
date: 2025-07-15
summary: "Eine kostenlose Tabelle für den Toolchain-Vergleich mit über 160 Anforderungen aus Docs-as-Code-Projekten im Automotive-Umfeld – damit Tool-Entscheidungen auf Fakten beruhen statt auf Bauchgefühl."
tags: [docs-as-code, tools, requirements]
cover: ../../../../assets/blog/toolchain-comparison/01_toolchain_comparison.png
original: en
legacy: posts/2025/toolchain_comparison
---

Früher oder später muss jedes Projekt ein Tool auswählen – oder, wenn Systeme komplexer werden, eine ganze Toolchain. Wer sich für eine Toolchain entscheidet, entscheidet sich auch gegen eine oder mehrere Alternativen. Leider beruhen diese Entscheidungen oft auf subjektiven Kriterien statt auf Fakten: persönliche Erfahrung, fehlende Features, Erfolgsgeschichten anderer Teams oder schlicht fehlender Zugang zu vollständigen Informationen und den Anforderungen der Nutzer.

Dieser Beitrag stellt eine **kostenlose Tabelle für den Toolchain-Vergleich** vor. Du darfst sie anpassen und intern nutzen. Sie ist mit Tools aus dem Docs-as-Code-Umfeld vorbefüllt und enthält vor allem **über 160 Anforderungen von Nutzern**, die ich in den letzten Jahren in Automotive-Softwareprojekten (150–1.500 Nutzer) gesammelt habe.

[![Screenshot der Tabelle für den Toolchain-Vergleich](../../../../assets/blog/toolchain-comparison/02_tool_comparison_screenshot.png)](https://docs.google.com/spreadsheets/d/13MwtKcdgjgT5v-j7CKwhIIQ9zKbR5_G-N56Uhz-0QaM)

## Vorbefüllt mit Docs-as-Code-Daten

Die Tabelle enthält bereits Prozessrollen, Tools und weitere Kriterien, die in Docs-as-Code-Projekten üblich sind. Gesammelt habe ich sie in Automotive-Projekten bei internationalen OEMs und Tier-1-Zulieferern.

Frühere Versionen der Tabelle haben bereits in mehreren Projekten bei der Bewertung von Toolchains geholfen.

### Anforderungen

Über 160 Anforderungen sind schon enthalten, jeweils mit Prozessrolle, kurzer Aufgabenbeschreibung und einer ersten Gewichtung.

Ein paar Beispiele:

- Als **Req. Manager** will ich **Versionen und Baselines anlegen**.
- Als **Architect** will ich **PlantUML-Diagramme im Inhalt von Objekten schreiben**.
- Als **SW Developer** will ich **die Links in der Dokumentation testen**.
- Als **Req. Manager** will ich **frei konfigurierbare Objekttypen**.
- Als **Process Eng.** will ich **die Regeln für Anforderungs-IDs festlegen**.
- Als **DevOps** will ich **in einem Build HTML erzeugen und Daten in Dateien exportieren**.
- Als **Req. Manager** will ich **IBM-Doors-Einträge als Objekte in meine Doku einbinden oder kopieren**.
- Als **Project Lead** will ich **die Auslöser für Performance-Probleme finden (Engpässe)**.

Die vollständige Liste findest du in der [Tabelle](https://docs.google.com/spreadsheets/d/13MwtKcdgjgT5v-j7CKwhIIQ9zKbR5_G-N56Uhz-0QaM/edit?gid=955912988#gid=955912988).

### Konfiguration

Vorbefüllte Prozessrollen:

- DevOps
- Manager
- Process Eng.
- Project Lead
- Quality Eng.
- Req. Manager
- SW Architect
- SW Developer
- SW Tester
- System Eng.

Enthaltene (und erweiterbare) Tools:

- AsciiDoc – <https://asciidoc.org/>
- Docker – <https://docs.docker.com/>
- Doxygen – <https://www.doxygen.nl/manual/>
- Git – <https://git-scm.com/doc>
- GitHub – <https://docs.github.com/>
- Isso – <https://posativ.org/isso/docs/>
- Jupyter – <https://docs.jupyter.org/>
- Open-Needs IDE
- SNE
- Sphinx – <https://www.sphinx-doc.org/>
- Sphinx-Needs – <https://sphinx-needs.readthedocs.io/>
- Sphinx-PlantUML – <https://sphinxcontrib-plantuml.readthedocs.io/>
- Sphinx-Preview
- Sphinx-Test-Reports – <https://sphinx-test-reports.readthedocs.io/>
- VS Code RST Preview – <https://marketplace.visualstudio.com/items?itemName=lextudio.restructuredtext>
- ubCode – <https://useblocks.com/products/ubcode/>
- ubTrace – <https://useblocks.com/products/ubtrace>
- ubc – <https://useblocks.com/>
- ubConnect – <https://useblocks.com/>

## So nutzt du die Tabelle

Das Ausfüllen besteht aus zwei Teilen. Meist kümmern sich unterschiedliche Personen darum – je nach Wissen und Rolle im Projekt.

Das Blatt **Requirements** sammelt alle Anforderungen und wird am besten gemeinsam ausgefüllt. Ein Systemarchitekt hat andere Bedürfnisse als eine Softwareentwicklerin, und Safety Engineers oder Projektleitungen setzen wieder eigene Prioritäten.

Das Blatt **Comparison** füllen danach die Verantwortlichen für die Toolchains aus, die die Tools bereits bewertet oder getestet haben. Wichtig: Ob eine Anforderung erfüllt ist, richtet sich nach dem, was die Toolchain heute kann – nicht nach versprochenen Features. Fehlt Toolchain A ein Feature, das für später geplant ist, dann denk daran: Die Entwickler von Toolchain B können diese Zeit ebenfalls nutzen, um ihre Lücken zu schließen. Wer sich auf Versprechen verlässt, bekommt unklare Ergebnisse und löst keine Probleme von heute.

### Das Blatt „Requirements“

![Das Blatt Requirements](../../../../assets/blog/toolchain-comparison/03_requirements_sheet.png)

In diesem [Blatt](https://docs.google.com/spreadsheets/d/13MwtKcdgjgT5v-j7CKwhIIQ9zKbR5_G-N56Uhz-0QaM/edit?gid=955912988#gid=955912988) werden die Anforderungen gesammelt und gewichtet.

Anforderungen sind wie User Stories geschrieben, mit **Prozessrolle** und **Prozessaufgabe** in eigenen Spalten. Beispiel: Als **Process Engineer** will ich **interne Objekte verlinken**.

Jeder Anforderung kannst du ein Thema zuordnen, um besser sortieren und filtern zu können.

Danach legst du den Nutzen für das Projekt fest. Dafür vergibst du **Points** von 1 bis 5: **1** heißt **nice-to-have**, **5** ist ein **Muss** oder sogar ein **Showstopper**.

Dazu kommt ein **Factor** von **5 bis 100 %**. Er zeigt den echten Nutzen eines Features. Ein Feature, das 2 Projektleitern 60 Minuten pro Woche spart, kann weniger wichtig sein als eines, das 200 Entwicklern 10 Minuten spart: 120 Minuten gegen 2.000 Minuten gesparte Projektzeit.

**Points** und **Factor** hängen stark vom Projekt ab. Lass sie vom Prozessteam prüfen, damit die Gewichtung nicht verzerrt wird – denn jeder bewertet die eigenen Aufgaben gern höher als die der anderen Rollen.

Am Ende steht für jede Anforderung ein **Result**: einfach **Points** mal **Factor**. Das ist der tatsächliche Wert der Anforderung für dein Projekt.

Zum Schluss kannst du eine Nutzenkategorie setzen, die zeigt, warum die Anforderung wichtig ist – zum Beispiel, weil sie die Entwicklung beschleunigt oder die Qualität des Produkts verbessert.

<aside class="adm tip">

**Fang nicht bei null an!**

Die meisten Projekte haben fast dieselben Anforderungen. Sie unterscheiden sich um etwa 10 %, und die Gewichtung ist meist projektspezifisch.

Die über 160 enthaltenen Anforderungen helfen dir, schnell zu starten und in kurzer Zeit eine solide Entscheidungsmatrix aufzubauen.

</aside>

### Das Blatt „Comparison“

![Das Blatt Comparison](../../../../assets/blog/toolchain-comparison/04_comparion_sheet.png)

Die Anforderungen landen automatisch im [Blatt Comparison](https://docs.google.com/spreadsheets/d/13MwtKcdgjgT5v-j7CKwhIIQ9zKbR5_G-N56Uhz-0QaM/edit?gid=1557903405#gid=1557903405) und werden dort nicht mehr verändert.

Für beide Toolchains trägst du in der Spalte **Support** ein, ob eine Anforderung zu **100 %, 50 % oder 0 %** erfüllt ist.

**100 %** heißt: voll erfüllt. **0 %** steht für nicht erfüllt. **50 %** ist für seltene Fälle, in denen es einen Workaround gibt, mit dem du das Ziel – vielleicht mit etwas Mehraufwand – trotzdem erreichst.

Die Spalte **Points** enthält die erreichten Punkte: **Points** aus dem Blatt **Requirements** mal dem Wert in **Support**.

Zusätzlich kannst du jeder Anforderung das passende Tool zuordnen.

Das Endergebnis – die erreichten Punkte insgesamt – steht in Zeile 3, im Vergleich zu den maximal möglichen Punkten.

![Das Ergebnis des Vergleichs](../../../../assets/blog/toolchain-comparison/05_comparison_result.png)

### Das Blatt „Analysis“

![Das Blatt Analysis](../../../../assets/blog/toolchain-comparison/06_analysis_sheet.png)

Das [Blatt Analysis](https://docs.google.com/spreadsheets/d/13MwtKcdgjgT5v-j7CKwhIIQ9zKbR5_G-N56Uhz-0QaM/edit?gid=1318461535#gid=1318461535) zeigt, welchen Nutzen jedes Tool vor allem bringt.

Hilft ein Tool, schneller zu entwickeln, oder liefert es eher Einblicke in die Daten?

So erkennst du, wie wichtig ein Tool für deinen Prozess ist und welche Verbesserungen du von ihm in der Toolchain erwarten kannst.

### Weitere Blätter

Außerdem enthalten:

- **Overview**: die Startseite der Tabelle.
- **Help**: Anleitung und Tipps zur Nutzung.
- **Config**: Einstellungen für Auswahllisten und Ähnliches.
- **License**: die Lizenzinformationen.

## Motivation

Ich habe die Tabelle erstellt und teile sie, weil die meisten Tool-Entscheidungen hinter verschlossenen Türen fallen – oft in einer kleinen Gruppe, die das echte Projekt nicht vollständig abbildet. Häufig treibt ein einzelner Tool-Anbieter oder ein Team mit besonderem Zugang die Entscheidung und legt Anforderungen so fest – oder lässt sie weg –, dass er im Vorteil ist.

Ein Toolchain-Vergleich beendet keine Diskussionen über Politik oder Budget. Er bietet aber einen transparenten Weg, die vorhandenen Features gegen eine umfassende Liste projektspezifischer Anforderungen zu prüfen.

Und später hilft eine solche Liste, frühere Entscheidungen noch einmal zu prüfen und zu begründen.

## Mitmachen

Die Liste der Anforderungen und Tools wird nie vollständig sein. Ich freue mich über jede weitere Anforderung und jeden Vorschlag, der die Liste erweitert.

Du kannst beitragen, indem du deine ausgefüllte Tabelle teilst – öffentlich oder per E-Mail an mich.

Kleineres Feedback kannst du direkt als Kommentar in die Tabelle schreiben. Beachte aber: Diese Kommentare sieht jeder.
