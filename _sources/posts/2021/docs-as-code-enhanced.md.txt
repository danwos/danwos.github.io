---
author: Daniel Woste
tags: docs-as-code, sphinx, sphinx-needs 
date: 2021-11-19
image: 1
---

# Docs-as-Code Enhanced

```{image} _images/post_icons/docs_as_code_enhanced.png
:align: center
```
For most of us "Docs-as-Code" mostly means to store the documentation files beside the project sources in git. 
Also editing the sources in an already used IDE and using the CI system to build it, are 2 important use cases why
docs-as-code is chosen to create documentation.

But these features have nothing to do with the documentation content itself.
What if the content itself can be treated as code? What if the content / documentation language provides features, 
which we already know from our programming languages?

## Textual and technical representation
Most documentation exist in two ways out there:
1. A pure **textual representation**, readable by human and with some markup to make it nice looking (e.g, MS Word).
2. A pure **technical representation**, stored as objects in database and available for humans via graphical 
   user interface only (e.g. a ticket system like JIRA).

The **textual representation** must be used as it is. No way to easily reorganize it on the fly. 
No way to easily reuse specific chapters, without the need to copy&paste them.
And no way to enhance the content with meta data, to make filtering/searching so much easier.

The **technical representation** makes all this possible.
Add additional data to an object, link it to another object. Filter for it and react programmatically on data changes.
All this is possible, with the drawback that you as writer only have objects.
You can change the object itself, but there is no way to add information, which are not following the rules of 
an object. E.g. you can't add headlines between issue objects. You can have different filters. But you can not create 
a page with 10 headlines, each filled with a different amount of objects.
You don't have the freedom to organize your content the way a **textual representation** has. 

## Objects included documentation 
But what, if you can have both?

The freedom to structure your documentation the way you need it.
Plus the possibility to add reusable, linkable, extendable objects on every position of your document?

### Use case: Requirements in SW Architecture
Here an example:  
You are responsible for describing the SW architecture of the upcoming project.
And your goal is to not only present UML-models, but also to explain textual why specific decisions were made.
Decisions based on technical and functional requirements. Requirements, which you will need to extend, as your 
SW Architecture will tell the SW developers how stuff needs to get implemented.

And a requirement can be best represented as an object, with different kind of information. Able to be linked to other 
requirements. And accessible all over the documentation to create tables of open requirements or a topic-centric list of 
requirements. Ready to get exported to external systems or suppliers, without any internal content.

## Sphinx & Sphinx-Needs
This idea got already realised by an extension for the documentation framework {{sphinx}}.  
The extension is called **{{sphinx_needs}}** and because this page is based on Sphinx, I can present you all features
of {{sphinx_needs}} right on this page.

### Object creation

So here is an embedded requirement object:

```{eval-rst}
.. req:: Objects in documentation
   :id: REQ_001
   :status: done
   :tags: objects, documentation, sphinx-needs
   :collapse: True
   :example: True
   
   For our overall SW development documentation we need a way to create and reuse objects.
   
   We need them for **Requirements**, **Specifications**, **Test Cases**, **Test Case Runs** and maybe more.
```

*Click the arrow on the right side of the title to show the meta-data.*

The code for this object is embedded inside the normal rst/md documentation code:
````{tabbed} rst
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

````

`````{tabbed} md / MyST
````md
Some text before the requirement object.

```{req}Objects in documentation
:id: REQ_001
:status: done
:tags: objects, documentation, sphinx-needs
:collapse: True

For our overall SW development documentation we need a way to create and reuse objects.

We need them for **Requirements**, **Specifications**, **Test Cases**, **Test Case Runs** and maybe more.
```
Some text after the requirement object.
````
`````

### Object Linking
And for sure objects can be linked to each other:

```{req} Object linking
:id: REQ_002
:status: done
:tags: objects, documentation, sphinx-needs
:links: REQ_001
:example: True

Objects must be linkable and all incoming and outgoing links shall get documented.

This is based on {need}`REQ_001`

```

````{tabbed} rst
```rst
.. req:: Object linking
   :id: REQ_002
   :status: done
   :tags: objects, documentation, sphinx-needs
   :links: REQ_001

   Objects must be linkable and all incoming and outgoing links shall get documented.
   
   This is based on :need:`REQ_001`
```
````


`````{tabbed} md / MyST
````md
```{req} Object linking
:id: REQ_002
:status: done
:tags: objects, documentation, sphinx-needs
:links: REQ_001

Objects must be linkable and all incoming and outgoing links shall get documented.

This is based on {need}`REQ_001`
```
````
`````

### Tables
To perform some analysis on objects, we can use `needtable`.

```{needtable}
:types: req
:style: table
```

````{tabbed} rst
```rst
.. needtable::
   :types: req
   :style: table 
```
````

`````{tabbed} md / MyST
````md
```{needtable}
:types: req
:style: table
```
````
`````

And for sure we have access to **all** objects from the complete documentation (in this case objects 
created by other blog posts).

The following table is configured to show selected columns and uses the default DataTables 
for a more "dynamic" view.

```{needtable}
:columns: id,title,status,docname,section_name,incoming,outgoing
```

````{tabbed} rst
```rst
.. needtable::
   :columns: id,title,status,docname,section_name,incoming,outgoing 
```
````

`````{tabbed} md / MyST
````md
```{needtable}
:columns: id,title,status,docname,section_name,incoming,outgoing
```
````
`````

### Flowcharts

Or maybe present the objects and their connections in a flowchart:

```{needflow}
:types: req
```

````{tabbed} rst
```rst
.. needflow::
   :types: req
```
````

`````{tabbed} md / MyST
````md
```{needflow}
:types: req
```
````
`````

### Export and Import

All the objects of a documentation can be exported to a json file called ``needs.json`` by using the builder
[needs](https://sphinxcontrib-needs.readthedocs.io/en/latest/builders.html): ``make needs``

This is an example of a ``needs.json`` file containing 10 needs (including the two from above):

```{literalinclude} data/needs.json
:class: needs-json-example
```

And this file and any other file following the same syntax, can be imported by using ``needimport``.
This allows you to extract data from external systems like JIRA, write it to a ``needs.json`` compatible file
and import this into your project.

### More Features
{{sphinx_needs}} provides much more features, like dynamic field values, pie charts, need parts, filters based on
Python statements or even Python files.
It also has over **40** configuration options, so that it can be adopted to each existing process or tool chain.

See more examples and get the details by reading the {{sphinx_needs_docs}}.

## User story
Sphinx-Needs is used worldwide by engineering related companies to document their development of software and hardware.

One of my favored project is an ECU development project of a german automotive company.
Nearly 2.000 engineers are working on it and they use {{sphinx}} and {{sphinx_needs}} for documenting their Software
Requirements, creating Specifications, planning Test Cases and documenting final Test Case Run Results.

They have multiple Sphinx projects, all linked together using intersphinx and the 
`external_needs` feature of {{sphinx_needs}}.
Overall they plan to create 130.000 need objects in their documentation.

Their benefit for using a docs-as-code approach are:
* More flexibility and full control. 
* Faster documentation creation.
* Higher motivation for developers to write docs.
* Team specific analysis and documentations.
* No or less license fees for other Requirement tools.
* Im/Export of data from external systems.
* Single documentation, which can be deployed and safely archived for the next 10-20 years.

So **Objects included documentation** is come to stay :)

```{image} _images/post_icons/docs_as_code_enhanced_end.png
:align: center
```

```{eval-rst}
.. metadata::
   :id: DACE
   :author: danwos
   :tags: sphinx, sphinx-needs, objects
   :last_changed: 20.11.2021
   
   Explains the reason for and features of object orientated documentations.
```




















