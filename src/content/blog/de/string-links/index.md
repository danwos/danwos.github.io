---
title: "Aus Text wird ein Link: String2Link mit Sphinx-Needs"
date: 2021-11-16
summary: "Eine Issue-ID oder einen Nutzernamen hinschreiben und einen Link bekommen: Das String-Links-Feature von Sphinx-Needs macht aus Optionswerten Links in externe Tools."
tags: [sphinx, sphinx-needs, docs-as-code]
original: en
legacy: posts/2021/sphinx_needs_string_links
---

[Sphinx-Needs](https://www.sphinx-needs.com/) hat ein neues Feature, das Optionswerte in Links verwandelt: das [String-Links-Feature](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-string-links).

Du trägst zum Beispiel nur die ID eines GitHub-Issues ein und bekommst in der fertigen Doku einen Link genau auf dieses Issue.

Konfigurieren musst du das nur einmal. Danach nutzt es jeder automatisch – etwa, wenn jemand einen Nutzernamen hinschreibt, der dann auf die Profilseite in Jira verlinkt.

So lässt sich mit einer Docs-as-Code-Lösung wie Sphinx sehr einfach auf externe Datenquellen verweisen.

## Beispiel

**conf.py**

```python
# Eine zusätzliche Option "github" anlegen, die die Issue-ID aufnimmt.
needs_extra_options = ['github']

# Aus der Nummer einen Link auf die Issue-Seite von Sphinx-Needs machen
needs_string_links = {
    # Link auf das passende GitHub-Issue
    'github_link': {
        'regex': r'^(?P<value>\w+)$',
        'link_url': 'https://github.com/useblocks/sphinxcontrib-needs/issues/{{value}}',
        'link_name': 'GitHub #{{value}}',
        'options': ['github']
    }
}
```

Der wichtigste Parameter ist `regex`. Er legt fest, wie die Daten aus dem Text gelesen werden. Er unterstützt benannte [Capture Groups](https://docs.python.org/3/howto/regex.html#non-capturing-and-named-groups); die gefundenen Werte landen in `link_name` und `link_url`, die [Jinja](https://jinja.palletsprojects.com)-Syntax verstehen.

**In einer beliebigen rst-Datei**

```rst
.. spec:: Implement the string2link feature
   :id: SPEC_123
   :github: 404

   See the issue above on GitHub for a detailed specification.
```

**Oder in MyST Markdown**

````markdown
```{spec} Implement the string2link feature
:id: SPEC_123
:github: 404

See the issue above on GitHub for a detailed specification.
```
````

**Ergebnis**

<div class="need">
  <div class="need-head"><span class="need-type">Specification</span> <strong>Implement the string2link feature</strong> <code>SPEC_123</code></div>
  <div class="need-meta">github: <a href="https://github.com/useblocks/sphinxcontrib-needs/issues/404">GitHub #404</a></div>
  <p>See the issue above on GitHub for a detailed specification.</p>
</div>
