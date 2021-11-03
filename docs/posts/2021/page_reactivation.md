---
author: Daniel Woste
tags: page, blog, sphinx
date: 2021-11-02
---

# Page reactivation
For a long, long time I had no private representation on the internet, as most of my work was done for open-source
projects, so that I added my thoughts to their websites and documentation pages.

Now, I'm planing something big ;)

So time for new stuff and as I have spent a lot of my time on Sphinx related topics, for sure this page is 
Sphinx based.

But for now, enough! I have work to do.
So after all extensions are configured, custom css is written, CI is ready and deployment works, I plan to update
this post with some more technical details. Stay tuned.


## Technical hints

### MyST

Setting HTML meta data per page / file:
```markdown
---
html_meta:
  "description lang=en": "metadata description"
  "keywords": "Sphinx, MyST"
  "property=og:locale": "en_US"
---
\```{title} Daniel Woste personal page
\```

```
