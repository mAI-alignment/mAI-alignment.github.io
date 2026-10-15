import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const updates = defineCollection({
  // Every .md / .mdx file in src/content/updates becomes an entry. Its URL is /updates/<filename>/
  // unless the frontmatter sets an explicit `slug`. Files starting with "_" are ignored.
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/updates' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      /** Publication date (YYYY-MM-DD). Dates are treated as calendar days, without timezone shifts. */
      date: z.coerce.date(),
      /** Only set when the entry has materially changed after publication. */
      updated: z.coerce.date().optional(),
      /** New entries are drafts until explicitly published. Drafts never appear in production builds. */
      draft: z.boolean().default(true),
      tags: z.array(z.string().min(1)).default([]),
      authors: z.array(z.string().min(1)).default([]),
      /** Optional small label shown above the title, e.g. "Research update" or "Methods". */
      label: z.string().min(1).optional(),
      /** Table of contents: shown automatically for long entries; set true/false to override. */
      toc: z.boolean().optional(),
    })
    .refine((data) => !data.updated || data.updated >= data.date, {
      message: '`updated` must not be earlier than `date`.',
      path: ['updated'],
    }),
});

const papers = defineCollection({
  // One YAML file per paper in src/content/papers. Papers are listed on /papers/, newest first.
  loader: glob({ pattern: ['**/*.{yaml,yml}', '!**/_*'], base: './src/content/papers' }),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    /** Where it appeared, e.g. "ICLR 2025 Workshop on ...". Omit for unpublished preprints. */
    venue: z.string().min(1).optional(),
    /** Publication or first-release date (YYYY-MM-DD); used for ordering and the year shown. */
    date: z.coerce.date(),
    /** Main link for the paper, used for the title (e.g. the arXiv abstract page). */
    url: z.url(),
    /** Further links such as PDF, code, slides or data. */
    links: z.array(z.object({ label: z.string().min(1), href: z.url() })).default([]),
    /** The paper's abstract, shown in a collapsible section. */
    abstract: z.string().min(1).optional(),
    /** BibTeX entry, shown in a collapsible section for easy citation. */
    bibtex: z.string().min(1).optional(),
  }),
});

export const collections = { updates, papers };
