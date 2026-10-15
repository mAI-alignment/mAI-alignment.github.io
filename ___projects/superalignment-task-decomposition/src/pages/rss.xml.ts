import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getUpdates, updateUrl, url } from '../lib/updates';

export async function GET(context: APIContext) {
  if (!context.site) {
    // Without a production URL the feed would contain broken links; the build warns about this.
    return new Response(null, { status: 404 });
  }
  const updates = await getUpdates();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site),
    items: updates.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: updateUrl(entry),
      categories: entry.data.tags,
    })),
  });
}
