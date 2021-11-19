---
author: Daniel Woste
tags: sphinx, sphinx-needs, meta
---

# Page meta data in Sphinx

In bigger Sphinx projects, written hundreds of authors, you often need to store additional data to somehow
have the overall page creation and update process under control.

The main questions about page are often:

* Who is responsible?
* Who has made the last changes?
* When was the last change?
* What is the content/goal of the page (short excerpt)?
* What is the status? Still a draft?
* Is there any critical content? Internal use only?

You can answer these questions on the page itself as part of the normal content.
But that normally does not look nice and the information can not be reused.

A better approach is to use {{sphinx_needs}}, which allows us to set a need-object at the beginning 
of each page. This object is highly configurable and can be presented in filterable tables.

So what are our goals?

1. We need an object, which represents the current page
2. The object shall be able to store information for author, last_changed date and tags
3. The object shall have a title, which is the same as the one of the current page
4. It shall be possible to write a short excerpt
5. The user can hide/show the related object details

So the final result in a rst file would look like:

```rst   
General theory of relativity
============================

.. metadata::
   :id: PAGE_001
   :author: Mr. Einstein
   :last_changed: 24.12.2021
   :tags: sphinx, meta, awesome
   
   This page explains a concept of really complex physical stuff.

.. concept details ..
```

{{sphinx_needs}} already provides the fields `id`, `tags`. It also handles the `title` and the `content`
for us.

The used need type `metadata` is new, so we need to configure it in our `conf.py` file.
We also need to create the additional fields.

By default, Sphinx-Needs forces the user to set a title for a need. This we need to deactivate as well.

```python
# conf.py

# Allows needs without a title, as it will be set automatically
needs_title_optional = True

# Meta need type
needs_types = [dict(directive="metadata", title="Meta data", prefix="M_", color="#BFD8D2", style="node"),
               # Other directives
              ]

# author and last_changed option
needs_extra_options = ['author', 'last_changed']
```

Now, we already can create the meta-need and build the docs without any warning.

What is missing is a title, which should be copied from the page directly.
For this we can use the Sphinx-Needs feature 
[Dynamic functions](https://sphinxcontrib-needs.readthedocs.io/en/latest/dynamic_functions.html)
and [Global Options](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-global-options).

We use the `copy` function to use the values of the already collected `section` name also for `title`.
```rst
.. meta:: {{copy("section_name")}}
```

As we do not want to set this ``copy``-line on every meta-need by hand, we can configure a global option:
```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False')
}
```

The above config sets the `title` only for needs of type `metadata` and if the title is not set.
So the user is still able to manually set a specific title.

Let's see how a current metadata-need would look like.
```rst
.. metadata::
   :id: META_DATA
   :author: danwos
   :tags: sphinx, sphinx-needs, meta
   :last_changed: 18.11.2021 
   
   Explains how to set meta data for a Sphinx page.
```

**Result**:

```{eval-rst}
.. metadata::
   :id: META_DATA
   :author: danwos
   :tags: sphinx, sphinx-needs, meta
   :last_changed: 18.11.2021 
   
   Explains how to set meta data for a Sphinx page.
```

This already looks good, regarding the data. 
But layout and style is not so nice. Also we want to hide it from the user.

Both problems can be solved by configuring and using a custom
[Sphinx-Needs layout](https://sphinxcontrib-needs.readthedocs.io/en/latest/layout_styles.html)
, which hides all unnecessary options and gives us full control fo the content.

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

The grid `content_footer` contains 2 areas for content and a footer only.
So no area for a title or for the option values is available.

We will use the content-area to show the needed data only.
The footer is used to show or hide the content part.

All we need to do, is to set ``meta`` as value for `layout` for each `metadata` need.

```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'layout': ('meta', 'type == "metadata"')  # This line is new
}
```

```{eval-rst}
.. metadata::
   :id: META_DATA_2
   :author: danwos
   :tags: sphinx, sphinx-needs, meta, collapse
   :last_changed: 18.11.2021 
   
   Explains how to set meta data for a Sphinx page.
```
Okay, the collapse feature works, if you click on "show metadata".

But the content area is only showing the content of the need.
We need to replace it with some more information.
Lets use the 
[Sphinx-Needs template feature](https://sphinxcontrib-needs.readthedocs.io/en/latest/directives/need.html#need-template)
to define the correct content.

Create a folder ``needs_templates`` on the root folder of your sphinx project.
Then add a file called ``metadata_template.need`` with the following content:
```rst
:Title: {{title}}
:Author: {{author}}
:Tags: {{tags|join(", ")}}
:Last changed: {{last_changed}}

{{content}}
```
And again we need to use 
[Global Options](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-global-options)
to activate it for all `metadata` needs.
```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'layout': ('meta', 'type == "metadata"'),
   'template': ('metadata_template', 'type == "metadata"')  # This line is new
}
```

**Result**
```{eval-rst}
.. metadata::
   :id: META_DATA_3
   :author: danwos
   :tags: sphinx, sphinx-needs, meta, collapse, content
   :last_changed: 18.11.2021
   
   Explains how to set meta data for a Sphinx page.
```
Nice, now the metadata need shows required data only.

Last thing we can do is to present the metadata not so prominent, so that it does not
disturb the reader.

For this we can use the `style` `clean`.
```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'layout': ('meta', 'type == "metadata"'),
   'template': ('metadata_template', 'type == "metadata"'),
   'style': ('clean', 'type == "metadata"')  # This line is new
}
```

**Result**
```{eval-rst}
.. metadata::
   :id: META_DATA_4
   :author: danwos
   :tags: sphinx, sphinx-needs, meta, collapse, content, style
   :last_changed: 18.11.2021
   
   Explains how to set meta data for a Sphinx page.
```

That's it. We now have a discreet `metadata` need, which shows required data only.


## Headlines
Another nice thing is, that we can use the ``metadata`` need also for additional headlines/chapters
on the same page, because the title is always set to the last headline.

So we can define different authors and other data in a single file.

### Headlines Example

**Example**
```{eval-rst}
.. metadata::
   :id: META_DATA_5
   :author: Mr. Nice Guy
   :tags: sphinx, sphinx-needs, meta, collapse, content, style
   :last_changed: 21.21.2020
   
   Chapter to explain the usage of ``metadata`` on headline/chapter level.
```

