:author: Daniel Woste
:tags: openneeds, requirements, sphinx
:date: 2025-11-28

Open-Needs-DB gets funded
=========================

The `Prototype Fund <https://prototypefund.de/>`_ supports and finances Open-Needs-DB from March to September 2022.

The `Federal Ministry of Education and Research <https://www.bmbf.de/bmbf/en/home/home_node.html>`_ created this program
to support developers in Germany by the creation of digital prototypes for topics in the area of
Civic Tech, Data Literacy, IT Security and Software Infrastructure.

``Open-Neeeds-DB`` shall be a REST based database for requirements and co..
It does not provide a single graphical user interface, instead it shall support the creation of interfaces in
different tools and areas. Currently planned are:

* **WebApp**: Simply React based application to create and show elements of the database.
* **Sphinx-Needs**: Read needs from or import them to a Sphinx project from an Open-Needs DB.
* **VS Code Plugin**: Get information of existing needs during the creation of needs-based content in Sphinx and other
  documentation projects.

The development of ``Open-Needs-DB`` may start a little bit earlier as March 2022. Mainly because there is a high
need in the ``Sphinx-Needs`` community to have a central service to store and maintain requirements and co.
in bigger projects.

I plan to use the following technologies for ``Open-Needs-DB``:

* `FastAPI <https://fastapi.tiangolo.com/>`_
* `SQLModel <https://sqlmodel.tiangolo.com/>`_
* `ReactJS <https://reactjs.org/>`_
* `Python Language Server <https://github.com/palantir/python-language-server>`_
