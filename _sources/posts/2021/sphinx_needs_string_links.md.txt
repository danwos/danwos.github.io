---
author: Daniel Woste
tags: sphinx, sphinx-needs, links
date: 2021-11-16
---

# String2Link transformation with Sphinx-Needs
[Sphinx-Needs](https://www.sphinx-needs.com/) got a new cool feature to easily create links of a given string for 
options. The [string-links feature](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-string-links).

This allows to just set e.g. a github issue id and get a link to exactly this issue in the final docs.

It only needs to be configured once and then each author will use it automatically, if he or she writes down e.g.
a username, which then gets transformed to the user page on JIRA.

This makes it really easy to use a docs-as-code solution like sphinx and reference external data sources.

## Example


**conf.py**

```python
# Lets create an additional custom option, called "github", which shall take the issue id.
needs_extra_options = ['github']

# Now some configuration, so that the number gets transformed to a link to the isse page of sphinx-needs 
needs_string_links = {
    # Links to the related github issue
    'github_link': {
        'regex': r'^(?P<value>\w+)$',
        'link_url': 'https://github.com/useblocks/sphinxcontrib-needs/issues/{{value}}',
        'link_name': 'GitHub #{{value}}',
        'options': ['github']
    }
}
```
The most important parameter is `regex`. There you can define how data shall be extracted from the string.
It's supporting named 
[capture groups](https://docs.python.org/3/howto/regex.html#non-capturing-and-named-groups) 
and the matched values get injected into `link_name` and `link_url`,
which support [Jinja](https://jinja.palletsprojects.com)  syntax.


**Inside any rst/md file**

`````{tab-set}
````{tab-item} rst
```rst
.. spec:: Implement the string2linkfeature
   :id: SPEC_123
   :github: 404
   
   See above issue on github for a detailed specification 
```
````

`````{tab-item} MyST
````
```{spec} Implement the string2linkfeature
:id: SPEC_123
:github: 404
See above issue on github for a detailed specification
```
````
````
`````

**Result**

```{spec} Implement the string2linkfeature
:id: SPEC_123
:github: 404
See above issue on github for a detailed specification
```

```{eval-rst}
.. metadata::
   :id: S2L
   :author: danwos
   :tags: page
   :last_changed: 20.11.2021
   
   Sphinx-Needs String2Link feature details 
```


