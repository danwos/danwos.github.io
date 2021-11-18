# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'danwos'
copyright = '2021, Daniel Woste'
author = 'Daniel Woste'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'ablog',
    'myst_parser',
    'sphinx_panels',
    'sphinxcontrib.needs',
]

needs_title_optional = True
needs_id_regex = r'^[A-Z0-9_]{2,}'

needs_types = [dict(directive="req", title="Requirement", prefix="R_", color="#BFD8D2", style="node"),
               dict(directive="spec", title="Specification", prefix="S_", color="#FEDCD2", style="node"),
               dict(directive="impl", title="Implementation", prefix="I_", color="#DF744A", style="node"),
               dict(directive="test", title="Test Case", prefix="T_", color="#DCB239", style="node"),
               dict(directive="uc", title="Use case", prefix="UC_", color="#9856a5", style="node"),
               dict(directive="metadata", title="Meta data", prefix="M_", color="#9856a5", style="node"),
               ]

needs_layouts = {
    'usecase': {
        'grid': 'content_side_left',
        'layout': {
            'side': ['Use Case'],
        }
    }
}

needs_global_options = {
    'layout': ('usecase', 'type == "uc"'),
    'title': ('[[copy("section_name")]]', 'type == "metadata"'),  # Used by meta data post
    'pre_template': ('metadata_template', 'type == "metadata" and "dropdown" in tags')   # Used by meta data post
}


needs_extra_options = [
    'github',  # Used by string2link post
    'last_changed',  # Used by meta_data post
    'author',  # Used by meta_data post
]

# Now some configuration, so that the number gets transformed to a link to the isse page of sphinx-needs
needs_string_links = {
    # Links to the related github issue
    'github_link': {  # Used by string2link post
        'regex': r'^(?P<value>\w+)$',
        'link_url': 'https://github.com/useblocks/sphinxcontrib-needs/issues/{{value}}',
        'link_name': 'GitHub #{{value}}',
        'options': ['github']
    }
}

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
# html_theme = 'alabaster'
html_theme = "pydata_sphinx_theme"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_css_files = [
    'custom.css'
]

html_logo = "_static/danwos_white.png"
# html_extra_path = ["feed.xml"]

html_theme_options = {
    "search_bar_text": "Search this site...",
    "google_analytics_id": "G-0MZ0221M7W",
    "navbar_end": ["search-field.html", "navbar-icon-links"],
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/danwos/",
            "icon": "fab fa-github-square",
        },
        {
            "name": "Twitter",
            "url": "https://twitter.com/danwos",
            "icon": "fab fa-twitter-square",
        },
        {
            "name": "LinkedIn",
            "url": "https://www.linkedin.com/in/daniel-woste-362b6252/",
            "icon": "fab fa-linkedin",
        },
        {
            "name": "Xing",
            "url": "https://www.xing.com/profile/Daniel_Woste/",
            "icon": "fab fa-xing",
        },
        {
            "name": "My company useblocks",
            "url": "https://useblocks.com",
            "icon": "fab fa-briefcase",
        },
    ],
}

html_sidebars = {
    "index": ["me.html"],
    "about": ["me.html"],
    "publications": ["me.html"],
    "projects": ["me.html"],
    "talks": ["me.html"],
    "posts/**": ['postcard.html', 'recentposts.html', 'archives.html'],
    "blog": ['tagcloud.html', 'archives.html'],
    "blog/**": ['postcard.html', 'recentposts.html', 'archives.html']
}

# Sphinx-panels config
panels_add_bootstrap_css = False

# ABlog config
blog_baseurl = "https://daniel-woste.de"
blog_title = "danwos"
blog_path = "blog"
disqus_shortname = "danwos"

fontawesome_included = True
blog_post_pattern = "posts/*/*"
post_redirect_refresh = 1
post_auto_image = 1
post_auto_excerpt = 2

# MyST config
# https://myst-parser.readthedocs.io/en/latest/syntax/optional.html
myst_enable_extensions = [
    "amsmath",
    "colon_fence",
    "deflist",
    "dollarmath",
    "html_admonition",
    "html_image",
    "replacements",
    "smartquotes",
    "substitution",
    "tasklist",
]

# https://myst-parser.readthedocs.io/en/latest/syntax/optional.html#substitutions-with-jinja2
myst_substitutions = {
  "sphinx": "[Sphinx](https://www.sphinx-doc.org)",
  "sphinx_needs": "[Sphinx-Needs](<https://sphinx-needs.com)",
  "sphinx_needs_docs": "[Sphinx-Needs Docs](https://sphinxcontrib-needs.readthedocs.io/en/latest/)",
  "sphinx_panels": "[Sphinx-Panels](https://sphinx-panels.readthedocs.io)",
}
