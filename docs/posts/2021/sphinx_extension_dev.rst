:author: Daniel Woste
:tags: docs-as-code, sphinx, extensions, tips
:date: 2021-11-22

Sphinx Extension Development: Tips & Tricks
===========================================

.. image:: _images/post_icons/sphinx_extension_dev.png
   :align: center

In the last year I have written some Sphinx extensions and figured out some stuff, which I want to share here.

Copy and Learn
--------------
First of all, the documentation for Sphinx extension development is not so detailed.
There is a `tutorial available <https://www.sphinx-doc.org/en/1.0/extensions.html>`_ by the Sphinx team,
but the used example project is quite simple.

Also some important information is only described on the API pages of Sphinx.
For instance the `Sphinx core events <https://www.sphinx-doc.org/en/master/extdev/appapi.html#sphinx-core-events>`_,
which are the entry point for a lot of handlers you may write.

To be honest, I learned most from other extensions.
I was asking my self, which extensions are solving a similar problem to mine, and then I tried to understand
their code.

But be a little careful. Sphinx allows to solve some problems in 2-3 different ways.
Some may be outdated or have some drawbacks. So try to take a look in 3-4 extensions, to understand how different
solutions may look like.

Namespace
---------
You often need to register own configuration parameters, store values on the Sphinx environment (env) or
application (app) object and set classes, which later are configured via CSS.

In **all** these cases, use a prefix! E.g. ``my_plugin_config``.

The reason is simple: Your are not the only Sphinx extension in the current project.
The user is free to use as many extension as he/she likes. So you should really be sure to not
overwrite anything, or get overwritten :)

Content manipulation mechanisms
-------------------------------
Normally your extension will change somehow the content, when one of your registered directives or roles is used.

As far as I know, there are 3 three ways how you can do it.

1. Add rst-code to the state machine
2. Manipulate the final docutils node-tree
3. Provide an output specific `visitor` function

The first one, using the state machine, is the easiest one. Simply because you can just give Sphinx additional rst-code,
which it will render and place it at the current position of your directive/role.

The drawback is, that you can only use rst-code. This may be enough, if your extension shall save some time for the
user, by e.g. providing a better/shorter way to describe a table.
Also the rst-code must be valid, which is sometimes not so easy because of a correct whitespace-handling.

The last one, a `visitor` function, gives you full access and allows everything, what the final output format allows.
You can do amazing stuff with it. But it has one big drawback, the function supports only one output format.
So if your extension shall work with e.g. PDF and HTML, then you have to implement your functionality twice (at least
the output part). And believe me, this costs a lot of motivation, as you need to maintain more, but nearly similar code.

Manipulating the docutils node-tree is the way to go.
It allows you more flexibility as the state machine solution. And as long as the docutils node tree is valid, every
builder can handle it and your extension directly supports HTML, PDF, JSON and more.
Just make sure, that you replace all of your extension specific nodes with common docutils nodes.

Documentation as main test case
-------------------------------
On short point, which saves you a lot of time.
Your extension documentation is already your best (and maybe only) test case.

My Sphinx extension projects are the only projects, where I use a test-driven / test-first approach.
I normally start by writing the documentation, which becomes some kind of a specification and helps me to find
problems in my concept. Then I add real code examples for each function, which gets rendered by Sphinx.
So Sphinx already executes all my functions and presents the results in the project documentation.

So if your project documentation gets build, your extension looks fine.

Test widely
-----------
Even if functional testing can be somehow shorten (see above), testing your code with different Python and Sphinx versions
is mandatory. Try to use `tox <https://tox.wiki/en/latest/index.html>`_ or `nox <https://nox.thea.codes/en/stable/>`_
on your CI to get this done. Luckily this configuration can be copied often nicely from other projects ;)

Ohh, and please test your extension with different themes!
There are themes out there, which do their own voodoo on HTML objects.

**ReadTheDocs** theme is manipulating **all tables** via JavaScript, which may destroy your layout or function.
No way to get this deactivated right now (But PR is waiting for merge).

**Sphinx-Material** deletes most CSS classes from **all tables**, if a table does not contain a specific class, which
deactivates this behavior for this specific table.

So there is some risk, that you need to implement theme specific solutions / workarounds.

Correct dependency handling
---------------------------
Please be so unspecific as possible with your dependency pinning.

If you e.g. pin your project to a specific Sphinx version like ``4.1.1``, you exclude other dependencies from being
installable, if they have pinned Sphinx to another version.

Even if you have tested it only for a specific version, please trust the semantic versioning scheme.
So if there is no raise in the *major* number, the newer version should work.

Also other users will contact you to update the dependency number everytime a new version is out there.

You can also use a matrix-test build on your CI, to make sure certain versions are supported.

Documentation as show case
--------------------------
As you write a Sphinx extension and use Sphinx for your documentation, you can easily use the docs as show case.

So your index page should already show an overwhelming example instead of going directly into technical details.

Curated lists
-------------
There are curated list out there, which collect Sphinx extensions. You should mention your extension also there.

One is https://github.com/yoloseem/awesome-sphinxdoc

github keywords
---------------
If your project is hosted ony github / gitlab.
Set the right keywords for your project, e.g. `python` and `sphinx`.

There are users out there, who are following these topics and are watching for new entries.
