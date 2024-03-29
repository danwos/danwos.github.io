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
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'Sphinx-Needs Enterprise License'
copyright = '2021, team useblocks'
author = 'team useblocks'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinxcontrib.plantuml',
    'sphinx_needs',
    'sphinx_revealjs',
    'sphinx.ext.mathjax'
]

revealjs_script_conf = """
{
    controls: true,
    transition: 'slide',
}
"""

needs_css = "blank.css"
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
html_theme = 'alabaster'
# html_theme = 'sphinx_material'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

revealjs_style_theme = "moon"
revealjs_static_path = ['_static']
revealjs_css_files = ['custom.css']

on_rtd = os.environ.get('READTHEDOCS') == 'True'
local_plantuml_path = os.path.join(os.path.dirname(__file__), "utils", "plantuml.jar")

if on_rtd:
    # Deactivated using rtd plantuml version as it looks quite old.
    # plantuml = 'java -Djava.awt.headless=true -jar /usr/share/plantuml/plantuml.jar'
    plantuml = 'java -Djava.awt.headless=true -jar {}'.format(local_plantuml_path)
else:
    plantuml = 'java -jar {}'.format(local_plantuml_path)

# plantuml_output_format = 'png'
plantuml_output_format = 'svg_img'
