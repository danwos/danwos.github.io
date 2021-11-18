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

## Need data

{{sphinx_needs}} already provides the fields `id`, `tags`. It also handles the `title` and the `content`
for us.

The used need type `meta` is new, so we need to configure it in our `conf.py` file.
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
.. meta:: {{copy("section")}}
```

As we do not want to set this ``copy``-line on every meta-need by hand, we can configure a global option:
```python
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False')
}
```

## Intermediate result
The above config sets the `title` only for needs of type `meta` and if the title is not set.
So the user is still able to manually set a specific title.

Let's see how a current meta-need would look like.
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

## Dropdown

This already looks good, regarding the data. 
But layout and style is not so nice. Also we to hide it from the user.

First, lets hide it by using {{sphinx_panels}} and its
[Dropwdown feature](https://sphinx-panels.readthedocs.io/en/latest/#dropdown-usage).

```rst
.. dropdown:: Page meta data

    .. metadata::
       :id: META_DATA_2
       :author: danwos
       :tags: sphinx, sphinx-needs, meta
       :last_changed: 18.11.2021 
       
       Explains how to set meta data for a Sphinx page.

```
**Result**:
```{eval-rst}
.. dropdown:: Page meta data

    .. metadata::
       :id: META_DATA_2
       :author: danwos
       :tags: sphinx, sphinx-needs, meta
       :last_changed: 18.11.2021 
       
       Explains how to set meta data for a Sphinx page.
```
## Need Template

But we do not want to set the `dropdown` directive by hand on each page, so that we can use the
[Sphinx-Needs template feature](https://sphinxcontrib-needs.readthedocs.io/en/latest/directives/need.html?highlight=pre%20content#template)
to do it for use.

Create a folder ``needs_templates`` on the root folder of your sphinx project.
Then add a file called ``metadata_template.need`` with the following content:
```rst
.. dropdown:: Page meta data

   
```

To use this template, ``pre_template`` must be set. We do this again by setting it via
 [Global Options](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-global-options).
```python
# conf.py
needs_global_options = {
   'title': ('{{copy("section_name")}}', 'type == "metadata" and title is False'),
   'pre_template': ('metadata_template', 'type == "metadata"') # This line is new
   }  

```

```{eval-rst}
.. metadata::
   :id: META_DATA_3
   :author: danwos
   :tags: sphinx, sphinx-needs, meta, dropdown
   :last_changed: 18.11.2021 
   
   Explains how to set meta data for a Sphinx page.
```


