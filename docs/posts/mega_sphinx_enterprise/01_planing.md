---
author: Daniel Woste
tags: sphinx-needs, sphinx, job
category: tutorial
---

# Sphinx Enterprise Mega Tutorial

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
this tutorial follows a setup from the reality through all steps of a project. 

## Scenario
The scenario is based on an ECU (electronic control unit) development project in the
automotive area. The realization is done by 2 companies, one OEM and one TIER-1 supplier.
Both companies are providing ~1.000 developers, who are sitting on different locations.

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


### Team setup
