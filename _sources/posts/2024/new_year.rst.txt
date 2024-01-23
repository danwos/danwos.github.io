
:author: Daniel Woste
:tags: update
:date: 2024-01-01


New years cleaning
==================


.. image:: _images/01_post_new_year.png
   :align: center

During the Christmas holidays, I had some time to think about new topics for the blog.

So I checked out the latest version, installed the requirements and tried to build the documentation.
But Bang! Dozens of warnings and error messages flew over my terminal.
The reason was mainly updated libraries like Sphinx and related extensions. 
Not a big problem, but for sure my fault, as I haven't pinned the versions in the requirements file.

So, this forces me to make my existing documentation code valid with the latest sphinx + extension versions:

1. Replace `Sphinx-Panels <https://sphinx-panels.readthedocs.io/en/latest/>`__ with 
   `Sphinx-Design <https://sphinx-design.readthedocs.io/en/latest/>`__ and update the code.
   Thanks to a well-written piece of docs for migrating from Sphinx-Panels to sphinx-Design, this was a no-brainer
   But still some (annoying) work.
2. Update some paths for the Sphinx-ABlog extensions, all done in the ``conf.py`` file, so it took only 5 min including
   research.
3. Update also some theme config, as the search box showed up twice in the navigation bar.
4. Reactivate and check the GitHub Action for build and deployment, as my last chance is quite old (2022) and GitHub deactivates
   the CI after 6 months of inactivity.
5. Fix the Sphinx-Needs installation, as I need to request "plotting features" explicitly. 

Hopefully, that's it. Looking forward to writing 1-2 new blog posts in the next few days. And for sure, mainly about docs-as-code.
