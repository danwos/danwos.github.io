---
author: Daniel Woste
tags: sphinx-needs, sphinx, job
category: tutorial
---

# Sphinx Mega Tutorial for Companies

I use Sphinx since several years and while the setup for standalone Open-Source projects
is often straight forward, it becomes quite complex for huge company internal projects.

And with huge I mean >1.000 developers, 2-3 hours of overall build time, multiple Sphinx 
projects, variation handling, different types of input data, synchronization with company
internal apps and services, intellectual property handling, ...

You can imagine that the default solutions for Sphinx do not scale well in such scenarios.
And finding any guidelines or advices for these kinds of problems on the internet is nearly
impossible. It seems like most companies do not share such knowledge with the outer world.

This tutorial tries to document some solutions I have seen during my work with and inside
such teams of different companies.

And to make it more easily to understand why some technical solutions are needed,
this tutorial uses real life situations of the below scenario.

## Scenario
The scenario is based on an ECU (electronic control unit) development project in the
automotive area. The realization is done by 2 companies, one OEM and one TIER-1 supplier.
Both companies are providing ~500 developers, who are sitting on different locations.

```{list-table}
:header-rows: 1
- * Company
  * Position
  * Developers
- * MegaCar Inc.
  * OEM / Manufactor
  * 1.000 employees 
- * Automotive Electronics AG
  * TIER-1 / Supplier
  * 1.000 employees
```

### Project setup
Such a huge project follows for sure a standardized process. In this scenario 
both companies are using the [V-Model](https://en.wikipedia.org/wiki/V-Model_(software_development)).

```{figure} _images/v-model2.svg
:align: center
:width: 70%
```

During each step different kind of documentation needs to be written and often multiple expert tools 
are used to handle this specific information (E.g. Jira for specifications).

### Team setup
Such huge projects get realised by multiple teams of different types. 

There are teams, which are completely responsible for
a product module, from collecting the requirements, over implementation to final unit/module tests.

Other teams are more topic specific, e.g. the Integration and Test team, which collects all final 
implementations from each team, "put" it together and is responsible for a working release.

So some teams need to be productive directly when the project starts.
Others may have some time to set up their tool environment and discuss some process details.

But all I want to tell you with this example: **Documentation is a living object**, which grows 
and needs to transform rapidly in a more or less changing (often even chaotic) environment.
And this tutorial tries to help you by finding the most efficient way for your company/team
by using a Docs-as-Code approach with a bunch of great Open-Source tools and some smart
configurations.

### Needed documentation
So what kind of documentations is really needed?

Honestly, I can't tell. It depends on the used process, toolchains, existing support and 
consulting contracts, team skills, "political" decisions and so much more.

So this tutorial is not following the project timeline of the above example and tries to give an
answer for each phase. Instead, it will describe different technical solutions and uses the above scenario
to explain, for what it is good for and why it saves time, money or provide better quality.
This will be done by using the use case box :)

```{uc} Use case example
:id: UC_Example

Boxes like this will be used to create a link between the technical described solution and a real world
example.
```

## Content

**Project infrastructure setup** 

1. Setup first project with Sphinx  
Already implement little extensions: Copy Python ,Markdown support, PDF via rinotype
2. Importable, versioned and clustered config  
One base config, which gets imported by team specific configs
3. Get the toolchain to the users  
Docker Dev Environment for Sphinx  
VS Code Docker integration
4. IDE Support for more Productivity  
Vs Code wit Sphinx and MyST extension
PyCharm with File Watchers
5. Custom doc builds and own Makefile
HTML, PDF, linkcheck, typo check, needs build, fast build, parallel build, clean build
6. CI Build support  
Github Actions + Page and Sphinx Build  
ReadTheDocs service  
Apache with versioned subfolders

**Project content setup**

1. Theme selection and customizations  
sidebars
custom.css
Own templates
2. Cookiecutter for default structures
3. ARC 42 for sw architecture
4. Meta-Data presentation  
Resp. Person, tags  
Page / folder specific sidebars (E.g show specific team/module infos)
5. Automatic meta-data from git  
Get last committer, history, changes from commit and add this to each page
6. Dynamic content  
Using Jinja
Using tags

**Life cycle management with Sphinx-Needs**
1. Requirements and co.  
Create objects  
Present objects
2. Ex/Import with needs.json  
needimport
needextract  
Export table results
external needs
3. Process specific customizations  
Own types and links  
Own warnings  
Own layout and style
4. Filtering needs  
Simple filter  
Filter string  
Filter via Python code
5. Automation  
Dynamic fields
6. External data  
Own needs.json files  
Sphinx-Needs Enterprise
7. Test reports
Sphinx-Test-Reports
8. Creating dashboards
Combine count-role, needtable and co.

**Multi project / builds**
1. Multi project setup  
shared config  
Master project for integration  
sphinx-collection
2. Builds for variations
sphinx-collection tag support
Different config files/part (e.g. other sphinx-needs layouts)

**Code language support**

All with extra post about Sphinx-Needs integration

1. Python docstring
2. C docstring via Breathe
3. JS with sphinx-js
