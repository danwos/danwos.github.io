---
title: "Manager POV: What's the benefit of docs-as-code?"
date: 2024-01-02
summary: "A fictitious conversation with a project manager of a 500-person automotive software project: why documentation quality suffers in expert tools and how docs-as-code helps."
tags: [docs-as-code, management, automotive]
cover: ../../../../assets/blog/manager-pov/02_manager_pov.png
original: en
legacy: posts/2024/manager_pov
translated_from: "fd0623b69c8e"
---

In the last 2–3 years, one of my main tasks was to convince people to use a docs-as-code approach for their software projects. The hard part is not convincing software developers – they often already do it. It's team leads and managers, because their concerns are rarely about single features but about process and toolchain compliance and integration. And of course the question of all questions: what's the monetary benefit?

So if you are a CEO, a manager, a team lead, or just want to understand the big picture, grab a coffee or tea, sit back, and let me explain how docs-as-code saves you money and still increases product quality.

Let's create a fictitious, shortened conversation between a project manager and me. That makes it easier for you to skip certain questions and to use it as a reference for arguments you may need in later discussions.

The content is based on discussions I have had with multiple software teams.

**The scenario:** a German automotive company (Tier 1: a direct supplier for several car manufacturers, the OEMs) needs to create embedded software for an electronic control unit (ECU). The team has **~500 software engineers** at **3 locations** (Germany, India, USA).

My contact person is Peter Heinzel, the project manager, responsible for on-time delivery, the budget, and compliance with the legal requirements for such a software development.

---

**Me:** Mr. Heinzel, thanks for the invitation and the opportunity to talk about docs-as-code with you. I'm really looking forward to understanding your project and its special requirements.

**Mr. Heinzel:** Thanks for being here. Our project is quite complex: 500 software engineers at 3 locations in 3 different time zones. Luckily they all use the same technical infrastructure. Some of my core developers asked me whether docs-as-code could be used to document and steer our software projects. And honestly, I had never heard of it before.

**Me:** I'll give you a short introduction, but to know where to put the focus, let me ask one or two questions first. **I guess your company or team already has solutions for documentation and project steering. Why the change?**

**Mr. Heinzel:** Well, let's put it this way: the previous project didn't go so well. We fulfilled all legal requirements, but with a lot of rework at the end of the project to create the needed documentation or fix quality issues in the existing data. That cost us some extra weeks of work and multiple internal and external audits until everybody was happy with at least the lowest acceptable level of compliance.

**Me:** Was this caused by **using the wrong tools, which could not provide the needed features?**

**Mr. Heinzel:** Oh no, we **spent a lot of money on licenses to get the best of the best.** For most expert tools we used solutions from market leaders, which all provided the needed features. However, the data quality inside these tools was poor. That sounds like a problem on our side, as we were responsible for entering and maintaining the data. And yes, it looks like nobody did that job often enough. We tried to change processes and put more people on process maintenance. It helped a little, but getting the budget for such long, unplanned actions wasn't easy either. And honestly, I'm not sure **how a tool switch would change this situation.**

**Me:** The docs-as-code approach can help you here. But first of all, **your problem was not missing features, but missing usability and attractiveness.** Most expert tools are just that: tools for experts. Built to be used daily, with detailed knowledge of the tool interface. They provide solutions for every possible requirement, even those a project doesn't use. That makes them hard for users who are mostly responsible for something else. May I ask: **who writes the software requirements, and what does the change process look like?**

**Mr. Heinzel:** We have requirements on different levels. A requirements engineer is responsible for the system requirements. She or he defines the requirement in our expert tool and marks the software components that need to implement something. The component leads get informed, and their team needs to break the system requirement down and describe the component's internal architecture. These component requirements and any updates are rechecked by the system engineer and need to be approved. After that, the team can use our ticket system to plan the component's internal implementation.

**Me:** So a non-requirements expert is forced to work inside the expert tool of a requirements engineer. And requirement changes for a software component aren't that frequent – maybe 3–4 times per month. Is there usually a single person in a component team who maintains the related requirements, **or must every team member be able to update requirements on their own?**

**Mr. Heinzel:** As there can be domain-specific developers in a component team, these experts need to update their related requirements on their own.

**Me:** To be honest, I like that approach. But it means every single developer needs to understand the requirements tool and its process and be familiar with its interface. **And that's on top of the knowledge they need for their own tools and processes.**

**Mr. Heinzel:** **You mean they live in two worlds, where the data may be related, but the tools and processes are not?**

**Me:** Exactly. I call it the "tool and process cut": a situation that makes it uncomfortable for users to maintain data in tool A just to prepare it for its final use in tool B. So the motivation to maintain such data is low, and therefore the data quality is low too. That's what happened in your last project.

**Mr. Heinzel:** **So we must change our process to make sure that a person with a certain role only needs to use the related expert tool?**

**Me:** That would be nice, but it's not doable. Developers, for instance, have domain-specific knowledge, so they care about everything in their domain: from the first idea, the software architecture and implementation to the final tests and maybe customer documentation. That can't be split – but they should not be forced to use a different tool for each of those steps.

**Mr. Heinzel:** **So we need a new tool that combines everything? Requirements, architecture, code, tests …?**

**Me:** Why not use one of the existing tools? For software developers, that's their editor of choice – their **IDE**, the **I**ntegrated **D**evelopment **E**nvironment. **And that's where docs-as-code comes in.**

**Mr. Heinzel:** You mean because the documentation is treated as code, **the code editor we already use can be used?**

**Me:** Yes, and not only the editor. Most of the tools, processes, and workflows can be reused.

Take a code review. Because the docs are part of the code repository, you can review them in the same step. A feature was implemented, but the change request only contains source code – no tests, no docs? Reject it.

The CI runs the tests – why not also check the docs and whether all references are still valid?

You can even reuse parts of your source code in the documentation. No need to explain an API twice, once in the code and later in the user documentation. Docs-as-code makes it easy to follow the "single source of truth" principle.

**Mr. Heinzel:** And that's possible? All the needed features inside the editor?

**Me:** Yes. We use, for instance, the Sphinx documentation generator, which produces HTML websites, PDFs, and other formats from the same input. There are over 600 extensions and themes for new features and layouts. And the best part: most of it is open source, so there are no license fees.

**Mr. Heinzel:** I can imagine this for end-user documentation, which is written once and not updated often. But what about project documentation, including requirements and test results? Oh, and think about traceability and compliance with common standards. Can that be done in the editor as well?

**Me:** Yes. For example, the extension [Sphinx-Needs](https://sphinx-needs.com) lets you create, configure, and link different kinds of objects. It is already used in automotive software projects with over 40,000 requirements plus related objects like specifications and test cases – about 150,000 objects overall. All are linked together and can be shown in tables, flowcharts, and much more. So yes, I think docs-as-code can support you with dynamic project documentation as well.

**Mr. Heinzel:** Sounds good, but **I can't believe that all the features of expert tools can be realized with docs-as-code** – or Sphinx in this case.

**Me:** That's right, not everything is possible. Analyzing historical data in particular is not easy, but doable. With docs-as-code you normally work on a checked-out branch of the project repository, so you only use the data from one point in time. The docs-as-code tools only see this data; they know nothing about older data or data on a parallel branch. That's an expert feature, but some extensions like Sphinx-Needs are already working on it.

I'm sorry to say, but for the moment: **to be continued …**
