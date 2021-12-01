Ideas
=====
This page contains some ideas for (upcoming) projects and blog posts.
I wish they were already realized. But as the day has 24 hours only, it will take some time :).

Feel free to contact me, if you have any ideas or want to join the party for a new project.

Projects
--------

Sphinx-Data-Viewer
~~~~~~~~~~~~~~~~~~
Small Sphinx extension, which allows to present data structures in a tree-like view.
Can be based on https://www.cssscript.com/json-data-tree-view/ (MIT License) or other libs.

Data sources: content area (json-string), json file, conf var

**Use case**: I need to present json-data, which is too big to show it as plain text in sphinx (> 500 lines).

Sphinx-Metrics
~~~~~~~~~~~~~~
Extension for Sphinx to collect and present metrics from different sources like Google Analytics, Grafana and co.
Extendable by "drivers" to support additional sources.

**Use case**: I want to show some numbers from Google Analytics on my page and have an easy access for everybody on
page views.

Sphinx-Image-Creator
~~~~~~~~~~~~~~~~~~~~
Programmatically create images via "code" in rst documents.
May be based on `Pillow <https://pillow.readthedocs.io/en/stable/index.html>`_.

But maybe it is already possible by directly execute Python code
or by `nbsphinx <https://nbsphinx.readthedocs.io/en/0.8.7/>`_ to code via Jupyter notebook.

**Use case**: My blog posts shall always have an image as introduction.
Some background plus some text. Should be quite easy to generate by just giving an image url and the final
text. Would save some time.

Sphinx-Autosar
~~~~~~~~~~~~~~
An extension to automatically document ARXML files and create an API-like document or something
based on `Sphinx-Needs <https://sphinxcontrib-needs.readthedocs.io/en/latest/>`_.

**Use case**: Get the AUTOSAR architecture into a Sphinx documentation.
Requirements and specification objects could be linked to SWCs, Runnables and co.


Sphinx-Autosar-Docs
~~~~~~~~~~~~~~~~~~~
An extraction of requirements and co. from the official `AUTOSAR <https://www.autosar.org/standards/>`_ docs.

**Use case**: Using `Sphinx-Needs <https://sphinxcontrib-needs.readthedocs.io/en/latest/>`_
to create Autosar requirement objects, which
can later be reused and linked by project specific requirement, specifications and test cases.

Not sure if this is possible without being AUTOSAR member.

Blog posts
----------
Some time ago I planned to write a "Sphinx-Enterprise-Mega-Tutorial" and I started to write down some ideas
for chapters. But this all got quite complex and would take months to finalize it. So I started to keep things
easy and started this page/blog to provide "snippets" whenever I find some time.

Project infrastructure setup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| **Setup first project with Sphinx**
| Already implement little extensions: Copy Python ,Markdown support, PDF via rinotype

| **Importable, versioned and clustered config**
| One base config, which gets imported by team specific configs

| **Get the toolchain to the users**
| Docker Dev Environment for Sphinx
| VS Code Docker integration


| **IDE Support for more Productivity**
| Vs Code wit Sphinx and MyST extension
| :ref:`pycharm_file_watchers`

| **Custom doc builds and own Makefile**
| HTML, PDF, linkcheck, typo check, needs build, fast build, parallel build, clean build

| **CI Build support**
| Github Actions + Page and Sphinx Build
| ReadTheDocs service
| Apache with versioned subfolders

Project content setup
~~~~~~~~~~~~~~~~~~~~~

| **Theme selection and customizations**
| sidebars
| custom.css
| Own templates

**Cookiecutter for default structures**

**ARC 42 for sw architecture**

| **Meta-Data presentation**
| Resp. Person, tags
| Page / folder specific sidebars (E.g show specific team/module infos)


| **Automatic meta-data from git**
| Get last committer, history, changes from commit and add this to each page

| **Dynamic content**
| Using Jinja
| Using tags

Life cycle management with Sphinx-Needs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| **Requirements and co.**
| Create objects
| Present objects

| **Ex/Import with needs.json**
| needimport
| needextract
| Export table results
| external needs

| **Process specific customizations**
| Own types and links
| Own warnings
| Own layout and style

| **Filtering needs**
| Simple filter
| Filter string
| Filter via Python code

| **Automation**
| Dynamic fields

| **External data**
| Own needs.json files
| Sphinx-Needs Enterprise

| **Test reports**
| Sphinx-Test-Reports

| **Creating dashboards**
| Combine count-role, needtable and co.

Multi project / builds
~~~~~~~~~~~~~~~~~~~~~~
| **Multi project setup**
| shared config
| Master project for integration
| sphinx-collection

| **Builds for variations**
| sphinx-collection tag support
| Different config files/part (e.g. other sphinx-needs layouts)

Code language support
~~~~~~~~~~~~~~~~~~~~~
All with extra post about Sphinx-Needs integration

**Python docstring**

**C docstring via Breathe**

**JS with sphinx-js**
