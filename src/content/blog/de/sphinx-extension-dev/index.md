---
title: "Sphinx-Erweiterungen entwickeln: Tipps und Tricks"
date: 2021-11-22
summary: "Was ich beim Schreiben von Sphinx-Erweiterungen gelernt habe: von anderen Erweiterungen lernen, einen Namensraum nutzen, parallele Builds unterstützen, den Node-Tree bearbeiten – und die Doku als Test nutzen."
tags: [sphinx, docs-as-code, python]
cover: ../../../../assets/blog/sphinx-extension-dev/sphinx_extension_dev.png
original: en
legacy: posts/2021/sphinx_extension_dev
---

Im letzten Jahr habe ich einige Sphinx-Erweiterungen geschrieben und dabei ein paar Dinge gelernt, die ich hier teilen will.

## Abschauen und lernen

Vorweg: Die Dokumentation zur Entwicklung von Sphinx-Erweiterungen ist nicht sehr ausführlich. Das Sphinx-Team bietet ein [Tutorial](https://www.sphinx-doc.org/en/1.0/extensions.html) an, aber das Beispielprojekt darin ist recht einfach.

Manche wichtigen Informationen stehen nur auf den API-Seiten von Sphinx – etwa die [Core Events](https://www.sphinx-doc.org/en/master/extdev/appapi.html#sphinx-core-events), der Einstiegspunkt für viele Handler, die du schreiben wirst.

Ehrlich gesagt habe ich am meisten von anderen Erweiterungen gelernt. Ich habe mich gefragt, welche Erweiterungen ein ähnliches Problem lösen wie meine, und dann versucht, ihren Code zu verstehen.

Aber Vorsicht: Sphinx erlaubt oft zwei, drei Wege zum selben Ziel. Manche sind veraltet oder haben Nachteile. Schau dir deshalb drei oder vier Erweiterungen an, um zu sehen, wie unterschiedlich Lösungen aussehen können.

## Namensraum

Oft musst du eigene Konfigurationsparameter registrieren, Werte am Environment (`env`) oder am Application-Objekt (`app`) von Sphinx speichern und CSS-Klassen setzen.

Nutze dabei **immer** ein Präfix, zum Beispiel `my_plugin_config`.

Der Grund ist einfach: Deine Erweiterung ist nicht die einzige im Projekt. Nutzer können so viele Erweiterungen einbinden, wie sie wollen. Stell also sicher, dass du nichts überschreibst – und nicht überschrieben wirst.

## Parallele Builds

Unterstütze parallele Builds in deiner Erweiterung – in beide Richtungen, `write` und `read`.

`write` ist standardmäßig aktiv. `read` muss deine Erweiterung im Rückgabewert angeben:

```python
return {
    "version": VERSION,
    "parallel_read_safe": True,
    "parallel_write_safe": True,
}
```

Je nachdem, was deine Erweiterung tut, brauchst du für paralleles `read` eine Merge-Funktion. Sphinx startet mehrere Worker, und die Daten, die jeder sammelt, sind voneinander getrennt. Du musst sie also in einem gemeinsamen Objekt zusammenführen.

Kleine Projekte brauchen meist keine parallelen Builds. Wenn deine Erweiterung aber in Firmenprojekten laufen soll: Die haben oft Hunderte Seiten, und ein paralleler Build senkt die Build-Zeit oft auf unter 20 % – unter 10 Minuten statt einer ganzen Stunde.

Ist deine Erweiterung die einzige ohne parallelen Build, hat sie in großen Projekten keine Chance.

Details stehen in der [Sphinx-Dokumentation](https://www.sphinx-doc.org/en/1.3.1/extdev/index.html#extension-metadata).

## Inhalte verändern

Meist verändert deine Erweiterung den Inhalt, wenn eine ihrer Directives oder Roles genutzt wird.

Soweit ich weiß, gibt es dafür drei Wege:

1. rst-Code an die State Machine übergeben.
2. Den fertigen Docutils-Node-Tree bearbeiten.
3. Eine Visitor-Funktion für ein bestimmtes Ausgabeformat schreiben.

Der erste Weg, die State Machine, ist der einfachste: Du gibst Sphinx zusätzlichen rst-Code, den es an der Stelle deiner Directive oder Role rendert.

Der Nachteil: Du kannst nur rst nutzen. Das reicht, wenn deine Erweiterung Zeit sparen soll, etwa mit einer kürzeren Schreibweise für Tabellen. Außerdem muss der rst-Code gültig sein, was wegen der Leerzeichen manchmal knifflig ist.

Der letzte Weg, eine Visitor-Funktion, gibt dir vollen Zugriff und erlaubt alles, was das Ausgabeformat kann. Damit lassen sich tolle Dinge bauen. Aber es gibt einen großen Nachteil: Die Funktion unterstützt nur ein Ausgabeformat. Soll deine Erweiterung mit PDF und HTML funktionieren, schreibst du den Ausgabeteil zweimal. Und glaub mir: Mehr fast gleichen Code zu pflegen, kostet viel Motivation.

Den Docutils-Node-Tree zu bearbeiten, ist der richtige Weg. Er ist flexibler als die State Machine. Und solange der Node-Tree gültig ist, kommt jeder Builder damit klar – deine Erweiterung unterstützt direkt HTML, PDF, JSON und mehr. Achte nur darauf, alle eigenen Nodes durch normale Docutils-Nodes zu ersetzen.

## Die Doku als wichtigster Test

Ein Punkt, der dir viel Zeit spart: Die Dokumentation deiner Erweiterung ist schon dein bester (und vielleicht einziger) Testfall.

Meine Sphinx-Erweiterungen sind die einzigen Projekte, in denen ich test-first arbeite. Ich beginne meist mit der Dokumentation. Sie wird eine Art Spezifikation und hilft mir, Lücken im Konzept zu finden. Dann füge ich für jede Funktion echte Beispiele ein, die Sphinx rendert. So führt Sphinx schon alle Funktionen aus und zeigt die Ergebnisse in der Doku.

Wenn deine Doku baut, ist deine Erweiterung in Ordnung.

## Breit testen

Auch wenn sich das funktionale Testen abkürzen lässt (siehe oben): Tests mit verschiedenen Python- und Sphinx-Versionen sind Pflicht. Nutze [tox](https://tox.wiki/en/latest/index.html) oder [nox](https://nox.thea.codes/en/stable/) in deiner CI. Die Konfiguration lässt sich zum Glück oft aus anderen Projekten übernehmen.

Und bitte teste deine Erweiterung mit verschiedenen Themes. Manche Themes treiben ihr eigenes Voodoo mit dem HTML.

Das Theme **Read the Docs** verändert **alle Tabellen** per JavaScript, was Layout oder Funktion kaputt machen kann. Als ich das schrieb, ließ sich das nicht abschalten (ein Pull Request wartete auf den Merge).

**Sphinx-Material** entfernt bei **allen Tabellen** die meisten CSS-Klassen – außer eine Tabelle hat eine bestimmte Klasse, die das abschaltet.

Es kann also sein, dass du Workarounds für einzelne Themes brauchst.

## Abhängigkeiten

Leg deine Abhängigkeiten so locker wie möglich fest.

Pinnst du dein Projekt auf eine bestimmte Sphinx-Version wie `4.1.1`, lassen sich andere Pakete, die Sphinx auf eine andere Version pinnen, nicht mehr daneben installieren.

Auch wenn du nur eine Version getestet hast: Vertrau der semantischen Versionierung. Solange sich die *Major*-Nummer nicht ändert, sollte eine neuere Version funktionieren.

Sonst bitten dich Nutzer bei jedem neuen Release, die Versionsnummer anzupassen.

Ein Matrix-Build in der CI stellt sicher, dass bestimmte Versionen unterstützt werden.

## Die Doku als Schaufenster

Du schreibst eine Sphinx-Erweiterung und nutzt Sphinx für ihre Doku – die Doku ist also dein Schaufenster.

Deine Startseite sollte gleich ein beeindruckendes Beispiel zeigen, statt direkt in technische Details einzusteigen.

## Kuratierte Listen

Es gibt kuratierte Listen mit Sphinx-Erweiterungen. Trag deine dort ein, zum Beispiel bei [awesome-sphinxdoc](https://github.com/yoloseem/awesome-sphinxdoc).

## GitHub-Topics

Liegt dein Projekt auf GitHub oder GitLab, setz die passenden Topics, etwa `python` und `sphinx`. Manche Leute folgen diesen Topics und achten auf neue Projekte.
