---
title: "String2Link transformation with Sphinx-Needs"
date: 2021-11-16
summary: "Write an issue ID or a user name, get a link: the string-links feature of Sphinx-Needs turns option values into links to external tools."
tags: [sphinx, sphinx-needs, docs-as-code]
original: en
legacy: posts/2021/sphinx_needs_string_links
translated_from: "6f7967bc3d6c"
---

[Sphinx-Needs](https://www.sphinx-needs.com/) got a new feature that turns option values into links: the [string-links feature](https://sphinxcontrib-needs.readthedocs.io/en/latest/configuration.html#needs-string-links).

You just set, for example, a GitHub issue ID and get a link to exactly this issue in the final docs.

It only needs to be configured once. After that, every author uses it automatically – for example when writing down a user name, which then becomes a link to the user's page in Jira.

This makes it really easy to use a docs-as-code solution like Sphinx and reference external data sources.

## Example

**conf.py**

```python
# Create an additional custom option called "github", which takes the issue ID.
needs_extra_options = ['github']

# Turn the number into a link to the issue page of Sphinx-Needs
needs_string_links = {
    # Links to the related GitHub issue
    'github_link': {
        'regex': r'^(?P<value>\w+)$',
        'link_url': 'https://github.com/useblocks/sphinxcontrib-needs/issues/{{value}}',
        'link_name': 'GitHub #{{value}}',
        'options': ['github']
    }
}
```

The most important parameter is `regex`. It defines how data is extracted from the string. It supports named [capture groups](https://docs.python.org/3/howto/regex.html#non-capturing-and-named-groups), and the matched values are injected into `link_name` and `link_url`, which support [Jinja](https://jinja.palletsprojects.com) syntax.

**In any rst file**

```rst
.. spec:: Implement the string2link feature
   :id: SPEC_123
   :github: 404

   See the issue above on GitHub for a detailed specification.
```

**Or in MyST Markdown**

````markdown
```{spec} Implement the string2link feature
:id: SPEC_123
:github: 404

See the issue above on GitHub for a detailed specification.
```
````

**Result**

<div class="need">
  <div class="need-head"><span class="need-type">Specification</span> <strong>Implement the string2link feature</strong> <code>SPEC_123</code></div>
  <div class="need-meta">github: <a href="https://github.com/useblocks/sphinxcontrib-needs/issues/404">GitHub #404</a></div>
  <p>See the issue above on GitHub for a detailed specification.</p>
</div>
