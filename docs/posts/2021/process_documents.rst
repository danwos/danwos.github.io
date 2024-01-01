:author: Daniel Woste
:tags: sphinx, sphinx-needs, process, workflow
:date: 2021-12-02

Process documents with Sphinx-Needs
===================================

.. image:: _images/post_icons/processes_with_sphinx_needs.png
   :align: center

Documenting processes is often a separate task in companies. Done by an extra department/team for processes, workflows
and tools (PMT). And published in specific formats, which are not reusable or referencable by project specific
documentations. But being able to link project requirements to process steps would help developers to understand
the need for such requirements.

This post explains how the docs-as-code approach can be used to document processes and workflows.

In most cases process descriptions are often not so detailed. They are tool-unspecific and it shall be the task
of a project specific team to define the used tools and break down the high level processes to tool specific workflows.

For such a break-down is makes sense to have all information from each level of process definition available in one
single documentation, so that everything can be linked, referenced and becoming level by level more project specific.

Process Model
-------------
The used process model is a simplified one, which is used this way inside development departs of a german
automotive company. It has the following elements:

* **workflow**: Defines a collection of activities, which must be performed in a specific order to get the needed result
* **activity**: Atomic tasks description, which can be used in different workflows.
* **artifact**: Some resource, which can be used as input for or output by activities.
* **storage**: The location of a resource where it can be accessed or must be stored.

And there are relationships between these elements:

* Workflow:

  * Can have one or more activities
  * Can use the same activity multiple times
  * Can have multiple storages
  * Needed artifacts are defined by the used activities

* Activity:

  * Is used by one or multiple workflows
  * Uses 0-n artifacts as input or output
  * Uses workflow specific or activity specific storages

* Artifacts:

  * Can be used by 0-n activities
  * Is not related to a storage (this is defined by workflow or activity)

* Storage

  * Is defined / used by workflow or activity

Model configuration
-------------------

Lets configure Sphinx-Needs to provide these **need types** for our documentation:

.. code-block:: python

    needs_types = [
        dict(directive="wor", title="Workflow", prefix="W_", color="#FFCC00", style="node"),
        dict(directive="act", title="Activity", prefix="ACT_", color="#BFD8D2", style="node"),
        dict(directive="art", title="Artifact", prefix="ART_", color="#FEDCD2", style="node"),
        dict(directive="sto", title="Storage", prefix="STO_", color="#DF744A", style="node"),
    ]

I also want to **identify the different object** quite easily.
So lets set a colorful border as well:

.. code-block:: python

   needs_global_options = {
       'style' = [
           ('yellow_border', 'type == "wor"'),
           ('green_border', 'type == "act"'),
           ('red_border', 'type == "art"'),
           ('blue_border', 'type == "sto"')
      ]
   }

We also want to be sure, that the user provides an ID for each created need.
And also each ID must contain a specific prefix followed by a number.

.. code-block:: python

   needs_id_required = True

   # Must start with WOR or ACT or .. followed by a "_" and min. 3 digits.
   # E.g. ART_143
   needs_id_regex = u'^(WOR|ACT|ART|STO)_[\d]{3,}'

Also the relationships have been described, so lets set specific link types as well:

.. code-block:: python

    needs_extra_links = [
       {
          # workflow -> activity
          "option": "executes",
          "incoming": "is executed by",
          "outgoing": "executes"
          "style": "#777777"
       },
       {
          # activity -> artifact
          "option": "produces",
          "incoming": "is produced by",
          "outgoing": "produces",
          "style": "#AA0000"
       },
       {
          # activity <- artifact
          "option": "consumes",
          "incoming": "is consumed by",
          "outgoing": "consumes",
          "style": "#00AA00",
          "style_start": "<-",
          "style_end": "-",
       },
       {
          # storage -> artifact
          "option": "stores",
          "incoming": "stored inside",
          "outgoing": "stores",
          "style": "#0000AA"
       },
       {
          # workflow/activity -> storage
          "option": "uses",
          "incoming": "used by",
          "outgoing": "uses",
          "style": "#000000"
       }
    ]

Model documentation
-------------------
This whole configuration allows us to describe our model with the help of Sphinx-Needs.

.. tab-set::

   .. tab-item:: result

      .. wor:: Workflow object
         :id: WOR_001
         :executes: ACT_001
         :tags: post_process

         Defines a collection of activities, which must be performed in a specific order to get the needed result.

      .. act:: Activity object
         :id: ACT_001
         :uses: STO_001
         :consumes: ART_001
         :produces: ART_001
         :tags: post_process

         Atomic tasks description, which can be used in different workflows.

      .. art:: Artifact object
         :id: ART_001
         :tags: post_process

         Some resource, which can be used as input for or output by activities.

      .. sto:: Storage object
         :id: STO_001
         :tags: post_process
         :stores: ART_001

         The location of a resource where it can be access or must be stored.

   .. tab-item:: rst code

      .. code-block:: rst

         .. wor:: Workflow object
            :id: WOR_001
            :executes: ACT_001
            :tags: post_process

            Defines a collection of activities, which must be performed in a specific order to get the needed result.

         .. act:: Activity object
            :id: ACT_001
            :uses: STO_001
            :consumes: ART_001
            :produces: ART_001
            :tags: post_process

            Atomic tasks description, which can be used in different workflows.

         .. art:: Artifact object
            :id: ART_001
            :tags: post_process

            Some resource, which can be used as input for or output by activities.

         .. sto:: Storage object
            :id: STO_001
            :tags: post_process
            :stores: ART_001

            The location of a resource where it can be access or must be stored.

Looks all good, lets see how a graphical representation looks like:

.. tab-set::

   .. tab-item:: result

      .. needflow::
         :tags: post_process
         :show_link_names:

   .. tab-item:: rst code

      .. code-block:: rst

         .. needflow::
            :tags: post_process
            :show_link_names:

Process hardening
-----------------
Sphinx-Needs allows to define regular expressions for need IDs or the definition of additional link types.
But these configurations are not forced to be used for a specific need type only.
So I can create a need from type **workflow**, set as id **ART_123** and use the link type **stores**.

Lets use ``needs_warnings`` to throw warnings, if such internal rules are not followed:

.. code-block:: python

   needs_warnings = {
      # Check for wrong ID prefixes
      'workflow_with_wrong_prefix': "type == 'wor' and not id.startswith('WOR_')",
      'activity_with_wrong_prefix': "type == 'act' and not id.startswith('ACT_')",
      'artifact_with_wrong_prefix': "type == 'art' and not id.startswith('ART_')",
      'storage_with_wrong_prefix': "type == 'sto' and not id.startswith('STO_')",
      # Check for wrong used links
      'workflows_with_wrong_link_types': "type == 'wor' and any([produces, consumes, stores, uses])",
      'activity_with_wrong_link_types': "type == 'act' and any([executes, stores])",
      'artifact_with_wrong_link_types': "type == 'art' and any([executes, produces, consumes, stores, uses])",
      'storage_with_wrong_link_types': "type == 'stor' and any([executes, produces, consumes, uses])",
   }

A violation of our process rules looks on the console like this:

.. code-block:: text

    Checking sphinx-needs warnings
    workflow_with_wrong_prefix: passed
    workflow_with_wrong_link_types: failed
            failed needs: 1 (WOR_001)
            used filter: type == 'wor' and any([produces, consumes, stores, uses])
    WARNING: Sphinx-Needs warnings were raised. See console / log output for details.

If the ``sphinx-build`` command is used to build the documentation, the option ``-W`` can be set. This handles
all warnings as errors, so that the build gets stopped.

So this can be used inside an CI build, to stop the user from integrating of a not process compliant documentation.

Better process model
--------------------
For sure this process model is not complete and does not follow any standards.

One important point, which we also have not configured are additional options like a "role", which executes an
activity. Or an "artifact_type" like "document" or  "binary".

So here are some ideas:

* Additional **need types**:

  * **employee**: Assign people to activities or clarify ownership
  * **process** and **process step**: A level above workflows and co.

* Additional **need options**:

  * **duration**: time window for activity execution
  * **path/url**: Location of a storage
  * **name**: Name schema to use for an artifact

* Additional **link types**:

  * **employee**: Link to an "employee" need type
  * **department**: Link to a "department" need type
  * **tools**: Links to "tools", which are used by an activity

As you see, there is a lot of room for optimization.

Example
-------
We have our model configured, so we can start to play with it.
Lets describe a *documentation update and build workflow*.

workflows
~~~~~~~~~
This is an small example, so we only have one workflow:

.. wor:: Documentation update, build and deploy
   :id: WOR_002
   :tags: post_process_example
   :executes: ACT_002,ACT_003,ACT_004,ACT_005,ACT_006

   Describes how to update our project handbook and how build and deploy looks like.

storages
~~~~~~~~
We need to store somewhere your source files and the final HTML documentation:

.. sto:: Git repo github.company.com/team_x/project_y
   :id: STO_002
   :tags: post_process_example
   :stores: ART_002

   All files for project Y are available at github.company.com/team_x/project_y.

.. sto:: Apache Documentation Webserver
   :id: STO_003
   :tags: post_process_example
   :stores: ART_003

   Stores all HTML documentations.

artifacts
~~~~~~~~~
In our workflow we need to work with the following artifacts:

.. art:: Sphinx documentation sources
   :id: ART_002
   :tags: post_process_example

   All data inside ``/docs/`` of the project files.

.. art:: Sphinx documentation HTML files
   :id: ART_003
   :tags: post_process_example

   The generated, final documentation as HTML page.

activities
~~~~~~~~~~
And finally here are our activities, which are needed to finish the above workflow.

.. act:: Get documentation
   :id: ACT_002
   :tags: post_process_example
   :role: developer
   :consumes: ART_002

   Use `git` to clone the project files

.. act:: Update documentation
   :id: ACT_003
   :tags: post_process_example
   :needs: ACT_002
   :consumes: ART_002
   :produces: ART_002

   Use our IDE ``PyCharm`` to change needed files under ``/docs/``.

.. act:: Upload documentation
   :id: ACT_004
   :tags: post_process_example
   :role: developer
   :needs: ACT_003

   Use ``git push`` to upload all commits, which include the documentation changes.

.. act:: Build and test doc change
   :id: ACT_005
   :tags: post_process_example
   :role: CI
   :needs: ACT_004
   :consumes: ART_002
   :produces: ART_003

   Builds the documentation and runs some checks on it.


.. act:: Deploy docs
   :id: ACT_006
   :tags: post_process_example
   :role: CI
   :needs: ACT_005
   :consumes: ART_003

   Deploys the documentation to _need:`STO_003`

Example Metrics and Problems
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. hint::

   I use `Sphinx-Panels <https://sphinx-panels.readthedocs.io>`_ a lot here, to provide also the rst code of the
   showed features.
   In reality this "report" would not have any *tabs* and would look much smoother.

.. tab-set::

   .. tab-item:: result

      The numbers here are for :need:`WOR_002`, which includes
      :need_count:`type=="act" and "post_process_example" in tags`
      activities and :need_count:`type=="art" and "post_process_example" in tags` artifacts, stored on
      :need_count:`type=="sto" and "post_process_example" in tags` storages.

   .. tab-item:: rst code

      .. code-block:: rst

         The numbers here are for :need:`WOR_002`,
         which includes :need_count:`type=="act" and "post_process_example" in tags`
         activities and :need_count:`type=="art" and "post_process_example" in tags` artifacts,
         stored on :need_count:`type=="sto" and "post_process_example" in tags` storages.

The overall workflow diagram is:

.. tab-set::

   .. tab-item:: result

      .. needflow::
         :tags: post_process_example
         :show_link_names:

      Hint: Open the image in a new tab. Each "box" is then a link to the related need in the documentation.

   .. tab-item:: rst code

      .. code-block:: rst

         .. needflow::
            :tags: post_process_example
            :show_link_names:

Table with all objects:

.. tab-set::

   .. tab-item:: result

      .. needtable::
         :tags: post_process_example
         :columns: id, title, type_name, role

   .. tab-item:: rst code

      .. code-block:: rst

         .. needtable::
            :tags: post_process_example
            :columns: id, title, type_name, role

Metrics
+++++++

.. tab-set::

   .. tab-item:: result

      .. needpie:: Comparison of used need types
         :shadow:
         :labels: Workflow, Activity, Artifact, Storage

         type=="wor" and "post_process_example" in tags
         type=="act" and "post_process_example" in tags
         type=="art" and "post_process_example" in tags
         type=="sto" and "post_process_example" in tags


   .. tab-item:: rst code

      .. code-block:: rst

         .. needpie:: Comparison of used need types
            :shadow:
            :labels: Workflow, Activity, Artifact, Storage

            type=="wor" and "post_process_example" in tags
            type=="act" and "post_process_example" in tags
            type=="art" and "post_process_example" in tags
            type=="sto" and "post_process_example" in tags

   .. tab-item:: result

      Overall :need_count:`type=="act" and role=="developer" ? type=="act"` % of activities are done by **developer**.
      And :need_count:`type=="act" and role=="CI" ? type=="act"` % by **CI**.

   .. tab-item:: rst code

      .. code-block:: rst

         Overall :need_count:`type=="act" and role=="developer" ? type=="act"` % of activities are done by **developer**.
         And :need_count:`type=="act" and role=="CI" ? type=="act"` % by **CI**.

Hint: See **problems** to identify, why the sum of the above numbers is not 100%.

Problems
++++++++

.. tab-set::

   .. tab-item:: result

      **Activities** without a set role: :need_count:`type=="act" and not role and "post_process_example" in tags`

      .. needtable::
         :filter: type=="act" and not role and "post_process_example" in tags
         :style: table
         :columns: id, title, needs, role

   .. tab-item:: rst code

      .. code-block::

         **Activities** without a set role: :need_count:`type=="act" and not role and "post_process_example" in tags`s

         .. needtable::
            :filter: type=="act" and not role and "post_process_example" in tags
            :style: table
            :columns: id, title, needs, role

Final words
-----------
I hope the above example and the described configuration is helpful for your use cases and gives you some
impressions about Sphinx-Needs and its features.

And for sure, this configuration can be easily extended to build the documentation of a sw development project.
Sphinx-Needs supports by default requirements, specification and test cases.

And with the above configuration, you can easily link sw requirements to activities and other elements.



