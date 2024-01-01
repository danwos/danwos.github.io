# Projects

A collection of projects I have 
{bdg-success}`created`, 
{bdg-primary}`maintained` 
or simply was {bdg-dark}`hired` for.


## Open Source

### Active projects

`````{grid} 1 1 2 2
````{grid-item-card}
**Sphinx-Needs** {bdg-success}`created` {bdg-primary}`maintained` 
^^^^^^^^^^^^
Brings life cycle management to Sphinx.

Create Requirements, Specifications, Test and cases and more.
Link them, add data and present the result in list, tables and flowchart.

Totally configurable and ready for any kind of use case.  

```{image}  https://img.shields.io/github/stars/useblocks/sphinx-needs?style=social
:target: https://github.com/useblocks/sphinx-needs
:alt: Sphinx-Needs github stars
```  

```{image}  https://img.shields.io/pypi/dd/sphinx-needs.svg
:target: https://pypistats.org/packages/sphinx-needs
:alt: Sphinx-Needs downloads daily
```

```{image}  https://img.shields.io/pypi/dm/sphinx-needs.svg
:target: https://pypistats.org/packages/sphinx-needs
:alt: Sphinx-Needs downloads monthly
```

+++
[Sphinx-Needs Website](https://sphinx-needs.com)  
[Sphinx-Needs Documentation](https://sphinx-needs.readthedocs.io/en/latest/)

````
````{grid-item-card}

**Sphinx-Collections** {bdg-success}`created` {bdg-primary}`maintained`
^^^^^^^^^^^^^^^^^^
A package to collect or generate documentation files from different sources and make them avaialbe 
in the Sphinx source folder.

Nice if you have multiple, shared documentation projects or if want to create different variants of a 
documentation.  

```{image}  https://img.shields.io/github/stars/useblocks/sphinx-collections?style=social
:target: https://github.com/useblocks/sphinx-collections
:alt: Sphinx-Collections github stars
```

```{image}  https://img.shields.io/pypi/dd/sphinx-collections.svg
:target: https://pypistats.org/packages/sphinx-collections
:alt: Sphinx-Collections downloads daily
```

```{image}  https://img.shields.io/pypi/dm/sphinx-collections.svg
:target: https://pypistats.org/packages/sphinx-collections
:alt: Sphinx-Collections downloads monthly
```

+++
[Sphinx-Collections Documentation](https://sphinx-collections.readthedocs.io/en/latest/)

````
````{grid-item-card}

**Sphinx-Test-Reports** {bdg-success}`created` {bdg-primary}`maintained`
^^^^^^^^^^^^^^^^^^^
Shows Test-Results inside [Sphinx](https://www.sphinx-doc.org) based documentation.

It uses [Sphinx-Needs](https://sphinxcontrib-needs.readthedocs.io/en/latest/) to create need objects for each
found test case in a `junit-based` xml file.  

```{image}  https://img.shields.io/github/stars/useblocks/sphinx-test-reports?style=social
:target: https://github.com/useblocks/sphinx-test-reports
:alt: Sphinx-Test-Reports github stars
```

```{image}  https://img.shields.io/pypi/dd/sphinx-test-reports.svg
:target: https://pypistats.org/packages/sphinx-test-reports
:alt: Sphinx-Test-Reports downloads daily
```

```{image}  https://img.shields.io/pypi/dm/sphinx-test-reports.svg
:target: https://pypistats.org/packages/sphinx-test-reports
:alt: Sphinx-Test-Reports downloads monthly
```

+++
[Sphinx-Test-Reports Documentation](https://sphinx-test-reports.readthedocs.io/en/latest/)


````
````{grid-item-card}

**Sphinx-Data-Viewer** {bdg-success}`created` {bdg-primary}`maintained`
^^^^^^^^^^^^^^^^^^^
A simple data viewer for data of type json or python object, which shows the data in an interactive 
list-view on HTML pages.

```{image}  https://img.shields.io/github/stars/useblocks/sphinx-data-viewer?style=social
:target: https://github.com/useblocks/sphinx-data-viewer
:alt: Sphinx-Data-Viewer github stars
```

```{image}  https://img.shields.io/pypi/dd/sphinx-data-viewer.svg
:target: https://pypistats.org/packages/sphinx-data-viewer
:alt: Sphinx-Data-Viewer downloads daily
```

```{image}  https://img.shields.io/pypi/dm/sphinx-data-viewer.svg
:target: https://pypistats.org/packages/sphinx-data-viewer
:alt: Sphinx-Data-Viewer downloads monthly
```

+++
[Sphinx-Data-Viewer Documentation](https://sphinx-data-viewer.readthedocs.io/en/latest/)

````
````{grid-item-card}

**Sphinx-Preview** {bdg-success}`created` {bdg-primary}`maintained`
^^^^^^^^^^^^^^^^^^^
A simple data viewer for data of type json or python object, which shows the data in an interactive 
list-view on HTML pages.

```{image}  https://img.shields.io/github/stars/useblocks/sphinx-preview?style=social
:target: https://github.com/useblocks/sphinx-preview
:alt: Sphinx-Preview github stars
```

```{image}  https://img.shields.io/pypi/dd/sphinx-preview.svg
:target: https://pypistats.org/packages/sphinx-preview
:alt: Sphinx-Preview downloads daily
```

```{image}  https://img.shields.io/pypi/dm/sphinx-preview.svg
:target: https://pypistats.org/packages/sphinx-preview
:alt: Sphinx-Preview downloads monthly
```

+++
[Sphinx-Preview Documentation](https://sphinx-preview.readthedocs.io/en/latest/)

````
`````

### Deprecated projects

`````{grid}

````{grid-item-card}
**Groundwork** {bdg-success}`created` {bdg-primary}`maintained`
^^^^^^^^^^
groundwork is a Python based microframework for highly reusable applications and their components.
Its functionality is based on exchangeable, well-documented and well-tested plugins and patterns.

Quite old and unmaintained. But I put some months into it, so it is worth beeing mentioned here :) 

```{image}  https://img.shields.io/github/stars/useblocks/groundwork?style=social
:target: https://github.com/useblocks/groundwork
:alt: Groundwork github stars
```

```{image}  https://img.shields.io/pypi/dd/groundwork.svg
:target: https://pypistats.org/packages/groundwork
:alt: Groundworks downloads daily
```

```{image}  https://img.shields.io/pypi/dm/groundwork.svg
:target: https://pypistats.org/packages/groundwork
:alt: Groundwork downloads monthly

+++
[Groundwork Documentation](https://groundwork.readthedocs.io/en/latest/)
````
`````

## Customer internal

`````{grid} 1 1 2 2 

````{grid-item-card}
**ReleaseNotes Creator** {bdg-dark}`created` 
^^^^^^^^^^
A script to create a HTML/PDF report of content between two given git tags.

Collects and reports also all related JIRA issues, GitHub PRs and Commits and touched files.

````
````{grid-item-card}

**DeltaReport** {bdg-dark}`created` 
^^^^^^^^^^
Creates a delta report of commit-based content on different, technical unrelated  branches.

Compares commits based on content, author and other indicators to identify matching commits.

Report is an interactive but static HTML page.

````
````{grid-item-card}
**SyncMonitor** {bdg-dark}`created` 
^^^^^^^^^^
Compares the planned dates of JIRA issues with the related commits and their "release tags".

Identifies problems like:

* Issue was planned for release X but related commits got integrated into release Y.
* Issue is already closed but there are not integrated commits referencing this issue.
* Issue is open but release date is in the past.
* Commit with no linked issues got integrated into a release.  

````
````{grid-item-card}

**AWS Integration**  
^^^^^^^^^^
Integration of several scripts and apps into AWS cloud.

Used and configuread services: EC2, DoucumentDB, DynamoDB, CloudWatch, S3, ApiGateway, Cognito.

Used infrastructure-as-code frameworks: 

* serverless
* AWS CloudFormation
 

````
`````


```{eval-rst}
.. metadata::
   :id: PROJECTS
   :author: danwos
   :last_changed: 01.01.2024
   
   Short list of my projects
```

&nbsp;
