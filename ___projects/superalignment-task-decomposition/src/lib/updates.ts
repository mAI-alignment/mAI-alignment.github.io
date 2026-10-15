import { getCollection, type CollectionEntry } from 'astro:content';
import { isVisible, sortNewestFirst } from './entries';

export type Update = CollectionEntry<'updates'>;
export type Paper = CollectionEntry<'papers'>;

/** Drafts are visible in `astro dev` only. Every production surface goes through this function. */
export const SHOW_DRAFTS = import.meta.env.DEV;

/** All publishable updates, newest first. */
export async function getUpdates(): Promise<Update[]> {
  const entries = await getCollection('updates', (entry) => isVisible(entry, SHOW_DRAFTS));
  return sortNewestFirst(entries);
}

/** All papers, newest first. */
export async function getPapers(): Promise<Paper[]> {
  return sortNewestFirst(await getCollection('papers'));
}

/** Prefixes a site-relative path with the configured base path. */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function updateUrl(entry: Update): string {
  return url(`/updates/${entry.id}/`);
}
