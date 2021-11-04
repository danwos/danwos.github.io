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
    'sphinx_panels'
]

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
  "github_url": "https://github.com/danwos/",
  "twitter_url": "https://twitter.com/danwos",
  "search_bar_text": "Search this site...",
  "google_analytics_id": "",
  "navbar_end": ["search-field.html", "navbar-icon-links"],
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
myst_enable_extensions = [
    "deflist",
    "colon_fence",
]
