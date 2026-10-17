---
title: "Smart Code Block"
summary: "Show code and its result from one single source."
status: likely
order: 20
problem: |
  When you document rst or Markdown, you often show the code and the result next to it. So the same code sits twice in the file: once as a code block, once to be executed. Change only one, and they no longer match.
solution: |
  A "smart" code block that creates both from one source: the code and the rendered result – for example in two tabs, "Result" and "Code".
tech: |
  Python, a Sphinx directive that parses its content and also outputs it as a code block; tabs via sphinx-design.
translated_from: "954914bc449a"
---
