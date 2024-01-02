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
import os

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
    'sphinx.ext.intersphinx',
    'sphinxcontrib.plantuml',
    'ablog',
    'myst_parser',
    'sphinx_design',
    'sphinx_needs',
]

needs_title_optional = True
needs_id_regex = r'^[A-Z0-9_]{2,}'

needs_types = [dict(directive="req", title="Requirement", prefix="R_", color="#BFD8D2", style="node"),
               dict(directive="spec", title="Specification", prefix="S_", color="#FEDCD2", style="node"),
               dict(directive="impl", title="Implementation", prefix="I_", color="#DF744A", style="node"),
               dict(directive="test", title="Test Case", prefix="T_", color="#DCB239", style="node"),
               dict(directive="uc", title="Use case", prefix="UC_", color="#9856a5", style="node"),
               dict(directive="metadata", title="Meta data", prefix="M_", color="#9856a5", style="node"),
               # Used by process post 2021
               dict(directive="wor", title="Workflow", prefix="W_", color="#FFCC00", style="node"),
               dict(directive="act", title="Activity", prefix="ACT_", color="#BFD8D2", style="rectangle"),
               dict(directive="art", title="Artifact", prefix="ART_", color="#FEDCD2", style="artifact"),
               dict(directive="sto", title="Storage", prefix="STO_", color="#DF744A", style="database"),
               ]

needs_layouts = {
    'usecase': {
        'grid': 'content_side_left',
        'layout': {
            'side': ['Use Case'],
        }
    },
    'meta': {
        'grid': 'content_footer',
        'layout': {
            'footer': [
                '<<collapse_button("content", '
                'collapsed="Hide page metadata", visible="Show page metadata", initial=True)>> ']
        }
    },
    'meta_example': {
        'grid': 'content_footer',
        'layout': {
            'footer': [
                '<<collapse_button("content", '
                'collapsed="Hide metadata", visible="Show metadata", initial=True)>> ']
        }
    }
}

needs_global_options = {
    'collapse': 'True',
    'layout': [('usecase', 'type == "uc"'),
               ('meta', 'type == "metadata" and example in [""]')  # Used by meta data post
               ],
    'title': ('[[copy("section_name")]]', 'type == "metadata"'),  # Used by meta data post
    'template': ('metadata_template', 'type == "metadata" and example in ["","content"]'),
    'pre_template': ('hr_line_template', 'type == "metadata" and example in ["","content"]'),
    'post_template': ('hr_line_template', 'type == "metadata" and example in ["","content"]'),
    'style': [
        ('clean', 'type == "metadata" and example in ["", "style"]'),  # Used by meta data post
        # process post 2021
        ('yellow_border', 'type == "wor"'),
        ('green_border', 'type == "act"'),
        ('red_border', 'type == "art"'),
        ('blue_border', 'type == "sto"'),
    ],
}

needs_extra_options = [
    'github',  # Used by string2link post
    'last_changed',  # Used by meta_data post
    'author',  # Used by meta_data post
    'role',  # Used by post process 2021
    'example',  # Used to identify example needs, which shall act differently
]

# Now some configuration, so that the number gets transformed to a link to the issue page of sphinx-needs
needs_string_links = {
    # Links to the related github issue
    'github_link': {  # Used by string2link post
        'regex': r'^(?P<value>\w+)$',
        'link_url': 'https://github.com/useblocks/sphinxcontrib-needs/issues/{{value}}',
        'link_name': 'GitHub #{{value}}',
        'options': ['github']
    }
}

needs_extra_links = [
    {
        # workflow <-> activity
        "option": "executes",
        "incoming": "is executed by",
        "outgoing": "executes",
        "style": "#777777"
    },
    {
        # activity -> activity
        "option": "needs",
        "incoming": "is needed by",
        "outgoing": "needs",
        "style": "#AA4444",
        "style_start": "-",
        "style_end": ">"
    },
    {
        # activity -> artifact
        "option": "produces",
        "incoming": "is produced by",
        "outgoing": "produces",
        "style": "#AA0000"
    },
    {
        # activity <- artifact
        "option": "consumes",
        "incoming": "is consumed by",
        "outgoing": "consumes",
        "style": "#00AA00",
        "style_start": "<-",
        "style_end": "-",
    },
    {
        # storage -> artifact
        "option": "stores",
        "incoming": "stored inside",
        "outgoing": "stores",
        "style": "#0000AA",
        "style_start": "-",
        "style_end": ">"
    },
    {
        # workflow/activity -> storage
        "option": "uses",
        "incoming": "used by",
        "outgoing": "uses",
        "style": "#000000"
    }
]
needs_warnings = {
      'workflow_with_wrong_prefix': "type == 'wor' and not id.startswith('WOR_')",
      'workflow_with_wrong_link_types': "type == 'wor' and any([produces, consumes, stores, uses])",
    }

# PlantUML configuration
local_plantuml_path = os.path.join(os.path.dirname(__file__), "utils", "plantuml.jar")
on_ci = os.environ.get('ON_CI') == 'True'
if on_ci:
    plantuml = 'plantuml'
else:
    plantuml = 'java -jar {}'.format(local_plantuml_path)

plantuml_output_format = 'svg_img'

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
    "show_toc_level": 3,
    "search_bar_text": "Search this site...",
    "analytics": {
        "google_analytics_id": "G-0MZ0221M7W"
    },
    "navbar_end": ["theme-switcher", "navbar-icon-links"],
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/danwos/",
            "icon": "fa-brands fa-square-github",
            "type": "fontawesome",
        },
        {
            "name": "Twitter",
            "url": "https://twitter.com/danwos",
            "icon": "fa-brands fa-twitter",
            "type": "fontawesome",
        },
        {
            "name": "LinkedIn",
            "url": "https://www.linkedin.com/in/daniel-woste-362b6252/",
            "icon": "fa-brands fa-linkedin",
            "type": "fontawesome",
        },
        {
            "name": "Xing",
            "url": "https://www.xing.com/profile/Daniel_Woste/",
            "icon": "fa-brands fa-xing",
            "type": "fontawesome",
        },
        {
            "name": "My company useblocks",
            "url": "https://useblocks.com",
            "icon": "fa-solid fa-briefcase",
            "type": "fontawesome",
        },
    ],
}

html_sidebars = {
    "index": ["me.html"],
    "about": ["me.html"],
    "publications": ["me.html"],
    "projects": ["me.html"],
    "talks": ["me.html"],
    "posts/**": ['ablog/postcard.html', 'ablog/recentposts.html', 'ablog/archives.html'],
    "blog": ['ablog/tagcloud.html', 'ablog/archives.html'],
    "blog/**": ['ablog/postcard.html', 'ablog/recentposts.html', 'ablog/archives.html']
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
    "sphinx_needs": "[Sphinx-Needs](https://sphinx-needs.com)",
    "sphinx_needs_docs": "[Sphinx-Needs Docs](https://sphinxcontrib-needs.readthedocs.io/en/latest/)",
    "sphinx_panels": "[Sphinx-Panels](https://sphinx-panels.readthedocs.io)",
}
