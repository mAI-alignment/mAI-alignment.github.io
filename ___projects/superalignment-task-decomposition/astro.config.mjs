// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeScrollRegions from './src/lib/rehype-scroll-regions.mjs';
import rehypeBaseLinks from './src/lib/rehype-base-links.mjs';
import contentGuard from './integrations/content-guard.mjs';

// Public URL: https://mai-alignment.github.io/superalignment-task-decomposition/
// The blog is published as part of the lab website (repository mAI-alignment/mAI-alignment.github.io,
// source in ___projects/superalignment-task-decomposition/), under a sub-path, so the site origin
// and the base path are configured separately. Canonical links, the RSS feed and the sitemap are
// built from these values. See README → Deployment.
const SITE_URL = 'https://mai-alignment.github.io';
const BASE_PATH = '/superalignment-task-decomposition';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith('/404/') }), contentGuard()],
  markdown: {
    // One pipeline for .md and .mdx (MDX inherits it): math is rendered to HTML + MathML at build time.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        [rehypeKatex, { output: 'htmlAndMathml' }],
        rehypeScrollRegions,
        // Lets entries link to `/updates/...` without knowing the base path.
        [rehypeBaseLinks, { base: BASE_PATH }],
      ],
      remarkRehype: { footnoteLabel: 'Notes' },
    }),
    // Code colours follow the active theme through CSS light-dark().
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: 'light-dark()' },
  },
});
