---
title: "Docs-as-Code, weitergedacht"
date: 2021-11-19
summary: "Docs-as-Code heißt mehr, als Doku in Git abzulegen: Mit Sphinx-Needs wird der Inhalt selbst zu Code – wiederverwendbare, verlinkbare Objekte mitten im Text."
tags: [docs-as-code, sphinx, sphinx-needs]
cover: ../../../../assets/blog/docs-as-code-enhanced/docs_as_code_enhanced.png
original: en
legacy: posts/2021/docs-as-code-enhanced
---

Für die meisten heißt „Docs-as-Code“: Die Dokumentation liegt neben den Quellen des Projekts in Git. Dass man die Quellen in der gewohnten IDE bearbeitet und im CI-System baut, sind zwei weitere Gründe, warum Teams sich für Docs-as-Code entscheiden.

Mit dem Inhalt der Dokumentation hat das aber nichts zu tun. Was wäre, wenn man den Inhalt selbst wie Code behandeln könnte? Wenn die Sprache der Dokumentation Features böte, die wir aus Programmiersprachen kennen?

## Textuelle und technische Darstellung

Die meiste Dokumentation gibt es in einer von zwei Formen:

1. Als rein **textuelle Darstellung**: für Menschen lesbar, mit etwas Auszeichnung, damit es gut aussieht (z. B. MS Word).
2. Als rein **technische Darstellung**: als Objekte in einer Datenbank gespeichert und für Menschen nur über eine Oberfläche zugänglich (z. B. ein Ticketsystem wie Jira).

Die **textuelle Darstellung** muss man nehmen, wie sie ist. Man kann sie nicht mal eben umsortieren, einzelne Kapitel nicht ohne Kopieren wiederverwenden und den Inhalt nicht mit Metadaten anreichern, die Filtern und Suchen so viel leichter machen.

Die **technische Darstellung** kann all das. Daten an ein Objekt hängen, es mit einem anderen verlinken, danach filtern und automatisch auf Änderungen reagieren. Der Haken: Als Autor hast du nur Objekte. Du kannst ein Objekt ändern, aber keine Information hinzufügen, die nicht den Regeln eines Objekts folgt. Zwischen Issue-Objekten kannst du zum Beispiel keine Überschriften einfügen. Du kannst verschiedene Filter haben, aber keine Seite mit 10 Überschriften bauen, unter denen jeweils andere Objekte stehen. Die Freiheit, Inhalte zu ordnen, hast du nur in der **textuellen Darstellung**.

## Dokumentation mit Objekten darin

Und wenn du beides haben könntest?

Die Freiheit, deine Dokumentation so zu gliedern, wie du sie brauchst – plus wiederverwendbare, verlinkbare, erweiterbare Objekte an jeder Stelle im Dokument?

### Anwendungsfall: Anforderungen in der Softwarearchitektur

Ein Beispiel: Du beschreibst die Softwarearchitektur eines neuen Projekts. Du willst nicht nur UML-Modelle zeigen, sondern im Text erklären, warum bestimmte Entscheidungen gefallen sind – Entscheidungen auf Basis technischer und funktionaler Anforderungen. Anforderungen, die du erweitern musst, weil deine Architektur den Entwicklern sagt, wie etwas umzusetzen ist.

Eine Anforderung lässt sich am besten als Objekt mit verschiedenen Informationen darstellen. Sie lässt sich mit anderen Anforderungen verlinken und ist in der ganzen Dokumentation verfügbar – für Tabellen offener Anforderungen oder eine Liste nach Themen. Und sie lässt sich an externe Systeme oder Zulieferer exportieren, ohne interne Inhalte.

## Sphinx und Sphinx-Needs

Diese Idee gibt es schon, als Erweiterung für das Dokumentations-Framework [Sphinx](https://www.sphinx-doc.org). Die Erweiterung heißt **[Sphinx-Needs](https://sphinx-needs.com)**.

Die ursprüngliche Fassung dieses Beitrags wurde mit Sphinx gebaut und zeigte die Objekte live auf der Seite. Hier siehst du sie so, wie sie dargestellt wurden.

### Objekte anlegen

Das ist ein eingebettetes Anforderungsobjekt:

<div class="need">
  <div class="need-head"><span class="need-type">Anforderung</span> <strong>Objects in documentation</strong> <code>REQ_001</code></div>
  <div class="need-meta">Status: done · Tags: objects, documentation, sphinx-needs · eingehend: REQ_002</div>

For our overall SW development documentation we need a way to create and reuse objects.

We need them for **Requirements**, **Specifications**, **Test Cases**, **Test Case Runs** and maybe more.

</div>

Der Code dafür steht mitten in der normalen rst- oder Markdown-Dokumentation:

```rst
Some text before the requirement object.

.. req:: Objects in documentation
   :id: REQ_001
   :status: done
   :tags: objects, documentation, sphinx-needs
   :collapse: True

   For our overall SW development documentation we need a way to create and reuse objects.

   We need them for **Requirements**, **Specifications**, **Test Cases**, **Test Case Runs** and maybe more.

Some text after the requirement object.
```

Dasselbe in MyST Markdown:

````markdown
Some text before the requirement object.

```{req} Objects in documentation
:id: REQ_001
:status: done
:tags: objects, documentation, sphinx-needs
:collapse: True

For our overall SW development documentation we need a way to create and reuse objects.

We need them for **Requirements**, **Specifications**, **Test Cases**, **Test Case Runs** and maybe more.
```

Some text after the requirement object.
````

### Objekte verlinken

Natürlich lassen sich Objekte miteinander verlinken:

<div class="need">
  <div class="need-head"><span class="need-type">Anforderung</span> <strong>Object linking</strong> <code>REQ_002</code></div>
  <div class="need-meta">Status: done · Tags: objects, documentation, sphinx-needs · Links: REQ_001</div>

Objects must be linkable and all incoming and outgoing links shall get documented.

This is based on REQ_001.

</div>

```rst
.. req:: Object linking
   :id: REQ_002
   :status: done
   :tags: objects, documentation, sphinx-needs
   :links: REQ_001

   Objects must be linkable and all incoming and outgoing links shall get documented.

   This is based on :need:`REQ_001`.
```

````markdown
```{req} Object linking
:id: REQ_002
:status: done
:tags: objects, documentation, sphinx-needs
:links: REQ_001

Objects must be linkable and all incoming and outgoing links shall get documented.

This is based on {need}`REQ_001`.
```
````

### Tabellen

Für Auswertungen gibt es `needtable`:

```rst
.. needtable::
   :types: req
   :style: table
```

Ergebnis:

| ID | Titel | Status | Links |
|---|---|---|---|
| REQ_001 | Objects in documentation | done | |
| REQ_002 | Object linking | done | REQ_001 |

Die Tabelle hat Zugriff auf **alle** Objekte der gesamten Dokumentation – auf der ursprünglichen Seite auch auf Objekte aus anderen Blogbeiträgen. Du kannst die Spalten wählen, und standardmäßig nutzt die Tabelle DataTables zum Sortieren, Filtern und Suchen:

```rst
.. needtable::
   :columns: id,title,status,docname,section_name,incoming,outgoing
```

### Flussdiagramme

Oder du zeigst die Objekte und ihre Verbindungen als Flussdiagramm:

```rst
.. needflow::
   :types: req
```

<figure class="flow">
<svg viewBox="0 0 460 80" role="img" aria-label="REQ_002 → REQ_001">
  <rect x="2" y="16" width="170" height="48" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="87" y="46" text-anchor="middle" fill="currentColor" font-size="15" font-family="var(--font-mono)">REQ_002</text>
  <rect x="288" y="16" width="170" height="48" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="373" y="46" text-anchor="middle" fill="currentColor" font-size="15" font-family="var(--font-mono)">REQ_001</text>
  <line x1="176" y1="40" x2="278" y2="40" stroke="currentColor" stroke-width="2"/>
  <path d="M278 33 L288 40 L278 47 Z" fill="currentColor"/>
  <text x="230" y="30" text-anchor="middle" fill="currentColor" font-size="12" font-family="var(--font-body)">links</text>
</svg>
</figure>

### Export und Import

Alle Objekte einer Dokumentation lassen sich mit dem [needs-Builder](https://sphinxcontrib-needs.readthedocs.io/en/latest/builders.html) in eine JSON-Datei namens `needs.json` exportieren: `make needs`

Ein Ausschnitt aus so einer Datei:

```json
{
  "current_version": "",
  "project": "danwos",
  "versions": {
    "": {
      "needs_amount": 10,
      "needs": {
        "REQ_001": {
          "id": "REQ_001",
          "type": "req",
          "title": "Objects in documentation",
          "status": "done",
          "tags": ["objects", "documentation", "sphinx-needs"],
          "links": [],
          "links_back": ["REQ_002"],
          "docname": "posts/2021/docs-as-code-enhanced",
          "description": "For our overall SW development documentation we need a way to create and reuse objects. …"
        },
        "…": "nine more objects"
      }
    }
  }
}
```

Diese Datei – und jede andere mit derselben Struktur – lässt sich mit `needimport` wieder einlesen. So kannst du Daten aus externen Systemen wie Jira holen, in eine `needs.json`-kompatible Datei schreiben und in dein Projekt importieren.

### Weitere Features

Sphinx-Needs kann noch viel mehr: dynamische Feldwerte, Tortendiagramme, Need Parts und Filter auf Basis von Python-Ausdrücken oder sogar Python-Dateien. Mit über **40** Konfigurationsoptionen lässt es sich an fast jeden Prozess und jede Toolchain anpassen.

Mehr Beispiele und alle Details findest du in der [Dokumentation von Sphinx-Needs](https://sphinx-needs.readthedocs.io).

## Aus der Praxis

Sphinx-Needs wird weltweit von Engineering-Unternehmen genutzt, um die Entwicklung von Software und Hardware zu dokumentieren.

Eines meiner Lieblingsprojekte ist die Steuergeräte-Entwicklung eines deutschen Automobilunternehmens. Fast 2.000 Engineers arbeiten daran. Sie nutzen Sphinx und Sphinx-Needs, um Software-Anforderungen zu dokumentieren, Spezifikationen zu schreiben, Testfälle zu planen und Testergebnisse festzuhalten.

Sie haben mehrere Sphinx-Projekte, die über intersphinx und das Feature `external_needs` von Sphinx-Needs verbunden sind. Insgesamt planen sie 130.000 Need-Objekte in ihrer Dokumentation.

Was ihnen Docs-as-Code bringt:

- Mehr Flexibilität und volle Kontrolle.
- Schneller fertige Dokumentation.
- Mehr Motivation bei Entwicklern, Doku zu schreiben.
- Auswertungen und Dokumentation pro Team.
- Keine oder geringere Lizenzkosten für andere Anforderungstools.
- Import und Export von Daten aus externen Systemen.
- Eine einzige Dokumentation, die sich veröffentlichen und für die nächsten 10–20 Jahre sicher archivieren lässt.

**Dokumentation mit Objekten darin** ist also gekommen, um zu bleiben.

![Die Objekte in der Dokumentation](../../../../assets/blog/docs-as-code-enhanced/docs_as_code_enhanced_end.png)
