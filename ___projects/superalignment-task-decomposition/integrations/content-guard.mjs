import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Marker used for unfinished site copy. Search the repository for it to find what still needs writing. */
export const PLACEHOLDER_MARKER = 'TODO(content)';

/**
 * Build-time safety net: warns when the production site URL is missing and lists
 * built pages that still contain placeholder copy, so placeholders are never published unnoticed.
 */
export default function contentGuard() {
  let site;
  return {
    name: 'content-guard',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site;
      },
      'astro:build:done': async ({ dir, logger }) => {
        if (!site) {
          logger.warn(
            'No `site` URL is configured in astro.config.mjs: canonical links, the RSS feed and the sitemap were not generated. Set SITE_URL before deploying.',
          );
        }

        const root = fileURLToPath(dir);
        const flagged = [];
        for (const file of await htmlFiles(root)) {
          if ((await readFile(file, 'utf8')).includes(PLACEHOLDER_MARKER)) {
            flagged.push(relative(root, file));
          }
        }
        if (flagged.length > 0) {
          logger.warn(
            `Placeholder copy (${PLACEHOLDER_MARKER}) is still present in ${flagged.length} page(s): ${flagged.join(', ')}. Replace it before publishing.`,
          );
        }
      },
    },
  };
}

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}
