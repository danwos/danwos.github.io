---
title: "Metadaten für Seiten in Sphinx"
date: 2021-11-18
summary: "Wer ist für eine Seite verantwortlich, und wann hat sie sich zuletzt geändert? Sphinx-Needs speichert das als unauffälliges Metadaten-Objekt auf jeder Seite – wiederverwendbar in Tabellen und Filtern."
tags: [sphinx, sphinx-needs, docs-as-code]
cover: ../../../../assets/blog/page-meta-data/page_meta_data.png
original: en
legacy: posts/2021/meta_data_per_page
---

In größeren Sphinx-Projekten mit Hunderten Autorinnen und Autoren musst du oft zusätzliche Daten speichern, damit das Anlegen und Aktualisieren von Seiten unter Kontrolle bleibt.

Diese Daten lassen sich als Metadaten oben in jeder rst-Datei pflegen.

Die wichtigsten Fragen zu einer Seite sind oft:

- Wer ist verantwortlich?
- Wer hat zuletzt etwas geändert?
- Wann war die letzte Änderung?
- Worum geht es auf der Seite (kurzer Auszug)?
- Welchen Status hat sie? Noch ein Entwurf?
- Gibt es kritische Inhalte? Nur für den internen Gebrauch?

Du kannst diese Fragen auf der Seite selbst beantworten, als Teil des normalen Inhalts. Das sieht aber meist nicht gut aus, und die Informationen lassen sich nicht wiederverwenden.

Besser geht es mit [Sphinx-Needs](https://sphinx-needs.com): Damit setzt du an den Anfang jeder Seite ein Need-Objekt. Es ist frei konfigurierbar und lässt sich in filterbaren Tabellen anzeigen.

Was wollen wir erreichen?

1. Ein Objekt, das die aktuelle Seite darstellt.
2. Das Objekt speichert Autor, Datum der letzten Änderung und Tags.
3. Das Objekt hat denselben Titel wie die Seite.
4. Man kann einen kurzen Auszug schreiben.
5. Leser können die Details ein- und ausblenden.

In einer rst-Datei könnte das Ergebnis so aussehen:

```rst
Page Meta Data in Sphinx
========================

.. metadata::
   :id: META_DATA
   :author: Mr. Nice Guy
   :tags: sphinx, sphinx-needs, meta, collapse, content, style
   :last_changed: 21.12.2020

   Chapter to explain the usage of ``metadata`` on headline/chapter level.

.. and more ..
```

Und in der Dokumentation sieht es so aus:

![Das fertige Metadaten-Objekt](../../../../assets/blog/page-meta-data/page_meta_data_final.png)

Sphinx-Needs bringt die Felder `id` und `tags` schon mit. Auch `title` und `content` erledigt es für uns.

Der Need-Typ `metadata` ist neu, also konfigurieren wir ihn in `conf.py` – zusammen mit den zusätzlichen Feldern.

Standardmäßig verlangt Sphinx-Needs einen Titel für jedes Need. Das schalten wir ebenfalls ab.

```python
# conf.py

# Allows needs without a title, as it will be set automatically
needs_title_optional = True

# Meta need type
needs_types = [dict(directive="metadata", title="Meta data", prefix="M_", color="#BFD8D2", style="node"),
               # Other need types
              ]

# author and last_changed option
needs_extra_options = ['author', 'last_changed']
```

Jetzt können wir das Metadaten-Need anlegen und die Doku ohne Warnung bauen.

Es fehlt noch der Titel, der von der Seite übernommen werden soll. Dafür nutzen wir zwei Features von Sphinx-Needs: [dynamische Funktionen](https://sphinxcontrib-needs.readthedocs.io/en/latest/dynamic_functions.html) und [globale Optionen](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-global-options).

Die Funktion `copy` nimmt den Wert des bereits erfassten `section_name` und nutzt ihn als `title`:

```rst
.. metadata:: {{copy("section_name")}}
```

Damit wir diese `copy`-Zeile nicht in jedes Metadaten-Need schreiben müssen, legen wir eine globale Option an:

```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False')
}
```

Das setzt den `title` nur für Needs vom Typ `metadata` und nur, wenn kein Titel gesetzt ist. Autoren können also weiterhin selbst einen Titel vergeben.

So sieht ein Metadaten-Need jetzt aus:

```rst
.. metadata::
   :id: META_DATA
   :author: danwos
   :tags: sphinx, sphinx-needs, meta
   :last_changed: 18.11.2021

   Explains how to set meta data for a Sphinx page.
```

**Ergebnis:**

<div class="need">
  <div class="need-head"><span class="need-type">Metadaten</span> <strong>Page meta data in Sphinx</strong> <code>META_DATA</code></div>
  <div class="need-meta">Autor: danwos · Tags: sphinx, sphinx-needs, meta · last_changed: 18.11.2021</div>

Explains how to set meta data for a Sphinx page.

</div>

Die Daten passen schon. Aber das Layout ist nicht schön, und wir wollen es vor den Lesern verbergen.

Beides lösen wir mit einem eigenen [Layout für Sphinx-Needs](https://sphinxcontrib-needs.readthedocs.io/en/latest/layout_styles.html). Es blendet alle unnötigen Optionen aus und gibt uns volle Kontrolle über den Inhalt.

```python
# conf.py
needs_layouts = {
    'meta': {
        'grid': 'content_footer',
        'layout': {
            'footer': [
                '<<collapse_button("content", '
                'collapsed="Hide metadata", visible="Show metadata", initial=False)>> ']
        }
    }
}
```

Das Grid `content_footer` hat nur zwei Bereiche: Inhalt und Fußzeile. Platz für Titel oder Optionswerte gibt es nicht.

Im Inhaltsbereich zeigen wir nur die nötigen Daten. Die Fußzeile blendet den Inhalt ein und aus.

Wir müssen nur noch für jedes `metadata`-Need `meta` als `layout` setzen:

```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'layout': ('meta', 'type == "metadata"')  # This line is new
}
```

**Ergebnis:**

<details class="meta-demo ">
<summary>Show metadata</summary>

Explains how to set meta data for a Sphinx page.

</details>

Das Ein- und Ausblenden funktioniert, wenn du auf „Show metadata“ klickst. Der Inhaltsbereich zeigt aber nur den Inhalt des Needs. Wir brauchen dort mehr.

Also nutzen wir die [Templates von Sphinx-Needs](https://sphinxcontrib-needs.readthedocs.io/en/latest/directives/need.html#need-template), um den Inhalt festzulegen.

Leg im Hauptordner deines Sphinx-Projekts einen Ordner `needs_templates` an und darin eine Datei `metadata_template.need`:

```rst
:Title: {{title}}
:Author: {{author}}
:Tags: {{tags|join(", ")}}
:Last changed: {{last_changed}}

{{content}}
```

Und wieder aktiviert eine [globale Option](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-global-options) das für alle `metadata`-Needs:

```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'layout': ('meta', 'type == "metadata"'),
   'template': ('metadata_template', 'type == "metadata"')  # This line is new
}
```

**Ergebnis:**

<details class="meta-demo ">
<summary>Show metadata</summary>

<dl>
<dt>Title</dt><dd>Page meta data in Sphinx</dd>
<dt>Author</dt><dd>danwos</dd>
<dt>Tags</dt><dd>sphinx, sphinx-needs, meta, collapse, content</dd>
<dt>Last changed</dt><dd>18.11.2021</dd>
</dl>

Explains how to set meta data for a Sphinx page.

</details>

Gut – das Metadaten-Need zeigt jetzt nur noch die nötigen Daten.

Ein letzter Schritt: Die Metadaten sollen weniger auffallen, damit sie beim Lesen nicht stören. Dafür nutzen wir den Style `clean`:

```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'layout': ('meta', 'type == "metadata"'),
   'template': ('metadata_template', 'type == "metadata"'),
   'style': ('clean', 'type == "metadata"')  # This line is new
}
```

**Ergebnis:**

<details class="meta-demo clean">
<summary>Show metadata</summary>

<dl>
<dt>Title</dt><dd>Page meta data in Sphinx</dd>
<dt>Author</dt><dd>danwos</dd>
<dt>Tags</dt><dd>sphinx, sphinx-needs, meta, collapse, content</dd>
<dt>Last changed</dt><dd>18.11.2021</dd>
</dl>

Explains how to set meta data for a Sphinx page.

</details>

Fertig: ein unauffälliges `metadata`-Need, das nur die nötigen Daten zeigt.

Mit etwas CSS wird aus „Show metadata“ ein kleiner Button:

```python
# conf.py
html_css_files = [
    'custom.css'
]
```

```css
/* _static/custom.css */
table.needs_layout_meta span.collapse span {
    color: #555;
    border: 2px solid #aaa;
    border-radius: 10px;
    padding: 2px 10px;
}
```

**Ergebnis:**

<details class="meta-demo clean button">
<summary>Show metadata</summary>

<dl>
<dt>Title</dt><dd>Page meta data in Sphinx</dd>
<dt>Author</dt><dd>danwos</dd>
<dt>Tags</dt><dd>sphinx, sphinx-needs, meta, collapse, content</dd>
<dt>Last changed</dt><dd>18.11.2021</dd>
</dl>

Explains how to set meta data for a Sphinx page.

</details>

## Überschriften

Noch ein Vorteil: Du kannst das `metadata`-Need auch unter weiteren Überschriften auf derselben Seite einsetzen, denn der Titel kommt immer von der letzten Überschrift. So kannst du in einer Datei verschiedene Autoren und andere Daten festhalten.

## Ausblick

Im Moment müssen fast alle Daten von Hand gesetzt werden, zum Beispiel der Autor. Sphinx und Sphinx-Needs folgen aber dem Docs-as-Code-Ansatz – die Doku liegt also meist in einer Versionsverwaltung wie **Git**.

Und Git weiß schon viel: den letzten Commit auf der Datei, die letzte Autorin, das Datum der letzten Änderung.

Der nächste Schritt für dieses Metadaten-Konzept wäre also, diese Informationen automatisch aus Git zu holen. Aber das ist ein Thema für einen anderen Beitrag.
