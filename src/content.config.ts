import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entries live in src/content/<collection>/<lang>/<slug>.md.
// German files are the master; translations carry `translated_from`,
// the hash of the German file they were made from.

// Tools: what Daniel builds – current ones and the archive.
const tools = defineCollection({
  loader: glob({ pattern: '*/*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(), // e.g. what the name stands for
    pictures: z.enum(['sketch', 'mockup', 'prototype', 'product']).optional(), // how far along the screenshots on the page are
    summary: z.string(),
    era: z.enum(['current', 'archive']),
    status: z.enum(['idea', 'concept', 'prototype', 'alpha', 'beta', 'done', 'cancelled']),
    monster: z.string().optional(),
    role: z.array(z.enum(['created', 'maintained', 'hired'])).default([]),
    period: z.string().optional(),
    order: z.number().default(100),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    docs: z.url().optional(), // the tool's documentation – shown in the page head
    live: z.url().optional(), // where the tool runs live – shown in the page head
    demo: z.url().optional(), // a page to try the tool on – shown in the page head
    translated_from: z.string().optional(),
  }),
});

const ideas = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/ideas' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // how likely it gets built
    status: z.enum(['unlikely', 'likely', 'definitely']),
    order: z.number().default(100),
    problem: z.string(),
    solution: z.string(),
    tech: z.string(),
    translated_from: z.string().optional(),
  }),
});

// Posts: src/content/blog/<lang>/<slug>/index.md(x). German is the master;
// migrated posts keep `original: en` and their old Sphinx path in `legacy`.
const blog = defineCollection({
  loader: glob({ pattern: '*/*/index.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      original: z.enum(['de', 'en']).default('de'),
      author: z.string().optional(), // only for posts by someone else; Daniel published them
      legacy: z.string().optional(),
      draft: z.boolean().default(false),
      translated_from: z.string().optional(),
    }),
});

// Projects: stories from consulting work, anonymized unless the client agreed.
const projects = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.string(),
    team: z.string().optional(),
    period: z.string().optional(),
    role: z.string(),
    order: z.number().default(100),
    problem: z.string(),
    approach: z.string(),
    result: z.string(),
    tools: z.array(z.string()).default([]), // slugs of entries in the tools collection
    draft: z.boolean().default(false),
    translated_from: z.string().optional(),
  }),
});

// Views: thoughts on showing information, data structures and workflows; one page per language for now.
const views = defineCollection({
  loader: glob({ pattern: '*/*.{md,mdx}', base: './src/content/views' }),
  schema: z.object({
    title: z.string(),
    translated_from: z.string().optional(),
  }),
});

// About page: longer text per language, plus CV stations (one file each, newest first by order);
// `kind: volunteer` stations get their own list.
const about = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/about' }),
  schema: z.object({ title: z.string(), translated_from: z.string().optional() }),
});

const cv = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/cv' }),
  schema: z.object({
    period: z.string().default(''),
    role: z.string(),
    org: z.string(),
    kind: z.enum(['work', 'volunteer']).default('work'),
    order: z.number().default(100),
    translated_from: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    draft_note: z.string().optional(),
    translated_from: z.string().optional(),
  }),
});

export const collections = { tools, projects, ideas, blog, views, about, cv, legal };
