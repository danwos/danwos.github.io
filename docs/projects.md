# Projects

A collection of projects I have 
{badge}`created,badge-success`, 
{badge}`maintained,badge-primary` 
or simply was {badge}`hired,badge-dark` for.


## Open Source

### Active projects

````{panels}
:card: border-1
---
**Sphinx-Needs** {badge}`created,badge-success` {badge}`maintained,badge-primary` 
^^^^^^^^^^^^
Brings life cycle management to Sphinx.

Create Requirements, Specifications, Test and cases and more.
Link them, add data and present the result in list, tables and flowchart.

Totally configurable and ready for any kind of use case.  

```{image}  https://img.shields.io/github/stars/useblocks/sphinxcontrib-needs?style=social
:target: https://github.com/useblocks/sphinxcontrib-needs
:alt: Sphinx-Needs github stars
```  

```{image}  https://img.shields.io/pypi/dd/sphinxcontrib-needs.svg
:target: https://pypistats.org/packages/sphinxcontrib-needs
:alt: Sphinx-Needs downloads daily
```

```{image}  https://img.shields.io/pypi/dm/sphinxcontrib-needs.svg
:target: https://pypistats.org/packages/sphinxcontrib-needs
:alt: Sphinx-Needs downloads monthly
```

+++
[Sphinx-Needs Website](https://sphinx-needs.com)  
[Sphinx-Needs Documentation](https://sphinxcontrib-needs.readthedocs.io/en/latest/)

---

**Sphinx-Collections** {badge}`created,badge-success` {badge}`maintained,badge-primary`
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

---

**Sphinx-Test-Reports** {badge}`created,badge-success` {badge}`maintained,badge-primary`
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


---

**Sphinx-Data-Viewer** {badge}`created,badge-success` {badge}`maintained,badge-primary`
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

### Deprecated projects

````{panels}
:card: border-1
---
**Groundwork** {badge}`created,badge-success` {badge}`maintained,badge-primary`
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

## Customer internal
````{panels}
:card: border-1
---
**ReleaseNotes Creator** {badge}`created,badge-dark` 
^^^^^^^^^^
A script to create a HTML/PDF report of content between two given git tags.

Collects and reports also all related JIRA issues, GitHub PRs and Commits and touched files.

---

**DeltaReport** {badge}`created,badge-dark` 
^^^^^^^^^^
Creates a delta report of commit-based content on different, technical unrelated  branches.

Compares commits based on content, author and other indicators to identify matching commits.

Report is an interactive but static HTML page.

---
**SyncMonitor** {badge}`created,badge-dark` 
^^^^^^^^^^
Compares the planned dates of JIRA issues with the related commits and their "release tags".

Identifies problems like:

* Issue was planned for release X but related commits got integrated into release Y.
* Issue is already closed but there are not integrated commits referencing this issue.
* Issue is open but release date is in the past.
* Commit with no linked issues got integrated into a release.  

---

**AWS Integration**  
^^^^^^^^^^
Integration of several scripts and apps into AWS cloud.

Used and configuread services: EC2, DoucumentDB, DynamoDB, CloudWatch, S3, ApiGateway, Cognito.

Used infrastructure-as-code frameworks: 

* serverless
* AWS CloudFormation
 

````


```{eval-rst}
.. metadata::
   :id: PROJECTS
   :author: danwos
   :last_changed: 01.12.2021
   
   Short list of my projects
```
