---
title: "Sphinx extension development: tips & tricks"
date: 2021-11-22
summary: "What I learned from writing Sphinx extensions: learn from other extensions, use a namespace, support parallel builds, manipulate the node tree – and let your docs be your test."
tags: [sphinx, docs-as-code, python]
cover: ../../../../assets/blog/sphinx-extension-dev/sphinx_extension_dev.png
original: en
legacy: posts/2021/sphinx_extension_dev
translated_from: "5c5f8975c3ce"
---

Over the last year I have written several Sphinx extensions and figured out a few things I want to share here.

## Copy and learn

First of all, the documentation for Sphinx extension development is not very detailed. The Sphinx team provides a [tutorial](https://www.sphinx-doc.org/en/1.0/extensions.html), but its example project is quite simple.

Some important information is only described on the API pages of Sphinx – for instance the [Sphinx core events](https://www.sphinx-doc.org/en/master/extdev/appapi.html#sphinx-core-events), which are the entry point for many handlers you may write.

To be honest, I learned most from other extensions. I asked myself which extensions solve a problem similar to mine, and then I tried to understand their code.

But be a little careful. Sphinx often allows solving a problem in two or three different ways. Some may be outdated or have drawbacks. So look at three or four extensions to understand what different solutions look like.

## Namespace

You often need to register your own configuration parameters, store values on the Sphinx environment (`env`) or application (`app`) object, and set CSS classes.

In **all** these cases, use a prefix, e.g. `my_plugin_config`.

The reason is simple: your extension is not the only one in the project. Users can add as many extensions as they like. So make sure you don't overwrite anything – or get overwritten.

## Parallel build support

Consider supporting parallel builds in your extension – in both directions, `write` and `read`.

`write` is activated by default. `read` must be declared by your extension in its return value:

```python
return {
    "version": VERSION,
    "parallel_read_safe": True,
    "parallel_write_safe": True,
}
```

Depending on what your extension does, you may need a merge function to support parallel `read`. Sphinx starts multiple workers, and the data each one collects is isolated from the others. So you need to merge the data from each worker into a shared object.

Small projects usually don't need parallel builds. But if your extension is meant for company projects, keep in mind that these often have hundreds of pages, and a parallel build often cuts the build time to less than 20% – under 10 minutes instead of a full hour.

If your extension is the only one that doesn't support parallel builds, it won't stand a chance in bigger projects.

See the [details in the Sphinx docs](https://www.sphinx-doc.org/en/1.3.1/extdev/index.html#extension-metadata).

## Content manipulation

Usually your extension changes the content somehow when one of its directives or roles is used.

As far as I know, there are three ways to do it:

1. Add rst code to the state machine.
2. Manipulate the final docutils node tree.
3. Provide an output-specific visitor function.

The first one, the state machine, is the easiest: you simply hand Sphinx additional rst code, which it renders at the position of your directive or role.

The drawback: you can only use rst. That may be enough if your extension saves users time, e.g. with a shorter way to describe a table. Also, the rst code must be valid, which is sometimes tricky because of whitespace handling.

The last one, a visitor function, gives you full access and allows everything the output format allows. You can do amazing things with it. But it has one big drawback: the function supports only one output format. If your extension should work with PDF and HTML, you have to implement the output part twice. And believe me, maintaining more, nearly identical code costs a lot of motivation.

Manipulating the docutils node tree is the way to go. It gives you more flexibility than the state machine. And as long as the node tree is valid, every builder can handle it – your extension directly supports HTML, PDF, JSON and more. Just make sure you replace all your extension-specific nodes with common docutils nodes.

## Documentation as the main test case

One point that saves you a lot of time: your extension's documentation is already your best (and maybe only) test case.

My Sphinx extensions are the only projects where I work test-first. I usually start by writing the documentation, which becomes a kind of specification and helps me find problems in my concept. Then I add real examples for each function, which Sphinx renders. So Sphinx already runs all my functions and shows the results in the documentation.

If your documentation builds, your extension looks fine.

## Test widely

Even if functional testing can be shortened (see above), testing with different Python and Sphinx versions is a must. Use [tox](https://tox.wiki/en/latest/index.html) or [nox](https://nox.thea.codes/en/stable/) in your CI. Luckily, this configuration can often be copied from other projects.

And please test your extension with different themes. Some themes do their own voodoo on HTML.

The **Read the Docs** theme manipulates **all tables** with JavaScript, which may break your layout or functionality. At the time of writing, there was no way to deactivate it (a pull request was waiting to be merged).

**Sphinx-Material** removes most CSS classes from **all tables**, unless a table has a specific class that disables this behavior.

So there is a risk that you need theme-specific workarounds.

## Dependency handling

Pin your dependencies as loosely as possible.

If you pin your project to a specific Sphinx version like `4.1.1`, other packages that pin Sphinx to another version can't be installed alongside yours.

Even if you have only tested one version, trust semantic versioning: as long as the *major* number doesn't change, a newer version should work.

Otherwise, users will ask you to update the version number every time a new release comes out.

A matrix build in your CI makes sure certain versions are supported.

## Documentation as a showcase

You write a Sphinx extension and use Sphinx for its documentation – so the docs are your showcase.

Your index page should show an impressive example right away, instead of diving straight into technical details.

## Curated lists

There are curated lists of Sphinx extensions. Add yours there, for example to [awesome-sphinxdoc](https://github.com/yoloseem/awesome-sphinxdoc).

## GitHub topics

If your project is hosted on GitHub or GitLab, set the right topics, e.g. `python` and `sphinx`. Some people follow these topics and watch for new projects.
