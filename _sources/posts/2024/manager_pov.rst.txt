
:author: Daniel Woste
:tags: manager, docs-as-code, dac, pov
:date: 2024-01-02


Manager POV: What's the benefit of docs-as-code?
================================================


.. image:: _images/02_manager_pov.png
   :align: center

In the last 2-3 years one of my main tasks was to convince people to use a docs-as-code approach for their SW project.
The hard part is not to convince SW developers to use it, as they are often already doing it. 
But team leaders and managers, as their concerns are often not related to single features, but more about process 
and toolchain compliance and integration. And for sure the question of all questions: What's the monetary benefit?

So if you are a CEO, a manager, a team leader or just want to understand the big picture, grab a coffee/tea, sit back and let me explain: 
How docs-as-code will save you money and still increase the product quality.

Let's create a fictitious, shortened conversation, between a Project manager and me. That's make it much easier for you to skip certain questions and
use it also as some kind of reference book for later needed arguments in possible further discussions.

The content will be based on discussions I already had in the past with multiple SW teams.

**The scenario**: A German Automotive company (TIER-1: direct supplier for several car manufacturers (OEMs)) needs to create embedded software 
for an electronic control unit (ECU). Team size is **~500 SW Engineers**, sitting at **3 locations** (Germany, India, USA).

My contact person is Peter Heinzel, the project manager, responsible for the in-time delivery, the budget and the compliance with the legal requirements of such a SW development.

----

**Me:** Mr. Heinzel, thanks for the invitation and the possibility to talk about docs-as-code with you. I'm really looking forward to understand your project and the special 
requirements it may have.

**Mr. Heinzel:**  Thanks for beeing here. Our project is quite complex, 500 SW engineers, sitting at 3 locations in 3 different time zones. Luckily they are all using the same
technical infrastructure. I have been asked by some of my core developers, if docs-as-code could be used to document and steer our SW projects.
And honestly, I have never heard about it before.

**Me:** I will give you a short introduction, but before I know where to put the focus, let me allow 1-2 questions. **I guess your company or team already
has solutions for documentation and project steering. Why the change?**.

**Mr. Heinzel:** Well, let's say it like this: The preliminary project didn't go so well. We fulfilled all legal requirements, but with a lot of rework at the end of the project
to create the needed documentation or fix the quality issues we had in the existing data. This has cost us some extra weeks of work with multiple internal and external audits until
everybody was happy with at least the lowest possible level of compliance. 

**Me:** Was this situation based on the **usage of the wrong tools, which were not capable of providing the needed features?**

**Mr. Heinzel:** Oh no, we have **spent a lot of money for licenses, to get the best of the best.** So for most expert tools, we were using solutions from market leaders, which were all capable
of providing the needed features. However, the data quality inside these tools was poor, which sounds like a problem on our side, as we were responsible to input and maintain the data. But yes, looks
like nobody did this job often enough. We tried to change processes and put more manpower into the process maintenance part, it helped a little bit but getting the budget for such long going, not planned actions
was also not easy.
And honestly speaking, I'm not sure **how a tool switch may change this situation?!**

**Me:** The docs-as-code approach can help you here. But first of all, **your problem was not missing features, but missing usability and attractiveness.** 
Most expert tools are just this, tools for experts. Written to be used on a daily base and with detailed knowledge of the tool interface. Providing solutions for every possible requirement, even if not used
by a project. This makes it hard for users, who are mostly responsible for something else. May I ask, **who writes the SW requirements and what does the change process look like?**

**Mr. Heinzel:** We have requirements of different levels. For System Requirements, a Requirement Engineer is responsible. She or he defines the requirement in our expert tool and marks the SW components, 
which need to implement something. The SW component leaders get informed and their team needs to break the system requirement down and describe their component's internal architecture. 
These component requirements and any updates are rechecked by the System engineer and need to be approved. After that, the team can start to use our ticket system to plan the component's internal implementation.

**Me:** Oh, this means a None-Requirement-Expert is forced to work inside the export tool of a Requirement Engineer. And Requirement changes of a SW component are not so often, it may be needed only 
3-4 times per month. Is there often a single person in a component team, who is responsible for maintaining the related requirements, **or must every team member be able to update requirements on their own?**

**Mr. Heinzel:** Well as there can be domain-specific developers in a component team, these SW experts need to update their related requirements on their own.

**Me:** To be honest, I like this approach, but this means that each single SW developer needs to understand the Requirement engineering tool, and the process and must be familar with the tool interfaces.
**And that's all besides their needed knowledge for their tools and processes.**

**Mr. Heinzel:** **You mean they are living in 2 worlds, where the used data may be related to each other, but tools and processes are not?**

**Me:** Exactly, I call it the "tool and process-cut". A situation, which makes it uncomfortable for a user to maintain the needed data in tool A, to prepare it for the final usage in tool B.
So the motivation to maintain such data is low and therefore also the data quality will be low. This is what happened to the last project.

**Mr. Heinzel:** **So we must change our process, to make sure that a person with a certain process role needs only to use the related expert tool?**

**Me:** Would be nice, but that's not doable. For instance, developers have domain-specific knowledge, so they care about everything in this domain. From the first idea, the SW architecture and implementation,
till the final tests and maybe also customer documentation. This can't be split, but he/she should not be forced to use a different tool for each of the needed actions.

**Mr. Heinzel:** **So a new tool is needed, which combines everything in it? Requirements, Architecture, Code, Tests, ... ?**

**Me**: Why not use one of the existing tools? For SW developers this would be their editor of choice. Or short **IDE** for **I**\ ntegrated **D**\ evelopment **E**\ nvironment. 
**And that's where the docs-as-code approach shows up.**

**Mr. Heinzel:** You mean because the documentation is treated as code, also **the already used code editor can be used?**

**Me:** Yes, but not only the editor. Most of the tools and also processes and workflows can be reused.

For instance, performing a code review. Because the docs are part of the code repository you can check the docs in the same review. A feature got implemented, but the Change Request only contains source code, no tests, no docs? Reject it.

The CI is running the tests, why not check the docs, if all references are still valid?

You can even reuse parts of your source code in the documentation. No need to explain an API twice, in the code and later in the user documentation. Docs-as-code makes it easily possible to follow "single-source-of-truth".

**Mr. Heinzel:** And that's possible? All the needed features inside the editor?

**Me:** Yes, we use for instance the Sphinx documentation generator, which can produce HTML-websites, PDF, and other formats out of the same documentation input.
There are also over 600 extensions and themes available, to provide new features and layouts. And the best, most of it is Open-Source, so no license fees.

**Mr. Heinzel:** I can imagine that this approach is possible for end user documentation, which needs to be created only once and gets not so often updated.
But how about project documentation, including for instance requirements and test results. Ohh and think about traceability features and compliance to common standards. Can this be done with the editor as well?

**Me:** Well, yes. For instance allows the extension `Sphinx-Needs <https://sphinx-needs.com>`__ to create, configure and link different kinds of objects. It is 
used already now for Automotive SW projects with over 40.000 requirements + plus related objects like specifications and test cases, so overall ~150.000 objects.
All are linked together and can be represented in tables, flow charts and much more. So yes, I think docs-as-code is capable to support you also with a dynamic project documentation.

**Mr. Heinzel:** Sounds good, but **I can't believe that all the features from expert tools can be realized with docs-as-code** or here Sphinx.

**Me:** That's right, not everything is possible. Especially analyzing specific historical data is not so easy, but doable. With docs-as-code you normally work on a checked-out branch of 
the project repository. So you only use the data from a specific point in time. The docs-as-code tools are only using this data, they have no idea about older data or data on a parallel branch.
That's an expert feature, but some extensions like Sphinx-Needs are already working on features like this.


I'm sorry to say but for the moment: **To be continued...**