import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entries live in src/content/<collection>/<lang>/<slug>.md.
// German files are the master; translations carry `translated_from`,
// the hash of the German file they were made from.

const projects = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    era: z.enum(['current', 'archive']),
    status: z.enum(['idea', 'concept', 'alpha', 'beta', 'done', 'cancelled']),
    monster: z.string().optional(),
    role: z.array(z.enum(['created', 'maintained', 'hired'])).default([]),
    period: z.string().optional(),
    order: z.number().default(100),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
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
      legacy: z.string().optional(),
      draft: z.boolean().default(false),
      translated_from: z.string().optional(),
    }),
});

// Visualizations: one page per language for now; concrete content follows.
const visualizations = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/visualizations' }),
  schema: z.object({
    title: z.string(),
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

export const collections = { projects, ideas, blog, visualizations, legal };
