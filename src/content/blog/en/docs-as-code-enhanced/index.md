---
title: "Docs-as-code enhanced"
date: 2021-11-19
summary: "Docs-as-code is more than storing docs in Git: with Sphinx-Needs, the content itself becomes code – reusable, linkable objects right inside your text."
tags: [docs-as-code, sphinx, sphinx-needs]
cover: ../../../../assets/blog/docs-as-code-enhanced/docs_as_code_enhanced.png
original: en
legacy: posts/2021/docs-as-code-enhanced
translated_from: "491b62f1f6f0"
---

For most of us, "docs-as-code" means storing the documentation files next to the project sources in Git. Editing the sources in the IDE you already use and building them in the CI system are two more reasons why docs-as-code is chosen.

But these features have nothing to do with the documentation content itself. What if the content itself could be treated as code? What if the documentation language provided features we already know from programming languages?

## Textual and technical representation

Most documentation exists in one of two ways:

1. A pure **textual representation**, readable by humans, with some markup to make it look nice (e.g. MS Word).
2. A pure **technical representation**, stored as objects in a database and available to humans only through a graphical user interface (e.g. a ticket system like Jira).

The **textual representation** must be used as it is. There is no easy way to reorganize it on the fly, no way to reuse specific chapters without copy and paste, and no way to enrich the content with metadata that makes filtering and searching so much easier.

The **technical representation** makes all this possible. Add data to an object, link it to another object, filter for it, and react programmatically to data changes. The drawback: as a writer, you only have objects. You can change an object, but you can't add information that doesn't follow the rules of an object. For example, you can't add headlines between issue objects. You can have different filters, but you can't create a page with 10 headlines, each followed by a different set of objects. You don't have the freedom to organize your content the way a **textual representation** allows.

## Documentation with objects inside

But what if you could have both?

The freedom to structure your documentation the way you need it – plus reusable, linkable, extendable objects at any position in your document?

### Use case: requirements in the software architecture

An example: you are responsible for describing the software architecture of an upcoming project. Your goal is not only to present UML models, but also to explain in text why specific decisions were made – decisions based on technical and functional requirements. Requirements you will need to extend, because your architecture tells the developers how things need to be implemented.

A requirement is best represented as an object with different kinds of information. It can be linked to other requirements and is accessible across the whole documentation, to create tables of open requirements or a topic-centric list. And it's ready to be exported to external systems or suppliers, without any internal content.

## Sphinx and Sphinx-Needs

This idea has already been realized by an extension for the documentation framework [Sphinx](https://www.sphinx-doc.org). The extension is called **[Sphinx-Needs](https://sphinx-needs.com)**.

The original version of this post was built with Sphinx and showed the objects live on the page. Here you see them as they were rendered.

### Creating objects

This is an embedded requirement object:

<div class="need">
  <div class="need-head"><span class="need-type">Requirement</span> <strong>Objects in documentation</strong> <code>REQ_001</code></div>
  <div class="need-meta">status: done · tags: objects, documentation, sphinx-needs · incoming: REQ_002</div>

For our overall SW development documentation we need a way to create and reuse objects.

We need them for **Requirements**, **Specifications**, **Test Cases**, **Test Case Runs** and maybe more.

</div>

The code for this object sits inside the normal rst or Markdown documentation:

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

The same in MyST Markdown:

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

### Linking objects

Of course, objects can be linked to each other:

<div class="need">
  <div class="need-head"><span class="need-type">Requirement</span> <strong>Object linking</strong> <code>REQ_002</code></div>
  <div class="need-meta">status: done · tags: objects, documentation, sphinx-needs · links: REQ_001</div>

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

### Tables

To analyze objects, you can use `needtable`:

```rst
.. needtable::
   :types: req
   :style: table
```

Result:

| ID | Title | Status | Links |
|---|---|---|---|
| REQ_001 | Objects in documentation | done | |
| REQ_002 | Object linking | done | REQ_001 |

The table has access to **all** objects of the complete documentation – on the original site, including objects from other blog posts. You can select the columns, and by default the table uses DataTables for sorting, filtering and searching:

```rst
.. needtable::
   :columns: id,title,status,docname,section_name,incoming,outgoing
```

### Flowcharts

Or show the objects and their connections in a flowchart:

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

### Export and import

All objects of a documentation can be exported to a JSON file called `needs.json` with the [needs builder](https://sphinxcontrib-needs.readthedocs.io/en/latest/builders.html): `make needs`

An excerpt of such a file:

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

This file – and any other file with the same structure – can be imported with `needimport`. That lets you extract data from external systems like Jira, write it to a `needs.json`-compatible file, and import it into your project.

### More features

Sphinx-Needs provides many more features, like dynamic field values, pie charts, need parts, and filters based on Python statements or even Python files. It also has over **40** configuration options, so it can be adapted to almost any existing process or toolchain.

See more examples and the details in the [Sphinx-Needs documentation](https://sphinx-needs.readthedocs.io).

## User story

Sphinx-Needs is used worldwide by engineering companies to document their software and hardware development.

One of my favorite projects is the ECU development of a German automotive company. Nearly 2,000 engineers work on it, and they use Sphinx and Sphinx-Needs to document software requirements, write specifications, plan test cases, and document test run results.

They have multiple Sphinx projects, all linked together with intersphinx and the `external_needs` feature of Sphinx-Needs. Overall they plan to create 130,000 need objects in their documentation.

Their benefits from a docs-as-code approach:

- More flexibility and full control.
- Faster documentation.
- Higher motivation for developers to write docs.
- Team-specific analysis and documentation.
- No or lower license fees for other requirements tools.
- Import and export of data from external systems.
- A single documentation that can be deployed and safely archived for the next 10–20 years.

So **documentation with objects inside** is here to stay.

![The crew of objects in the documentation](../../../../assets/blog/docs-as-code-enhanced/docs_as_code_enhanced_end.png)
