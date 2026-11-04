/**
 * Pure helpers for ordering, filtering and grouping entries. Kept free of Astro imports so
 * they can be unit-tested with `npm test`.
 */

export interface Dated {
  id: string;
  data: { date: Date; title: string };
}

export interface EntryLike extends Dated {
  data: { date: Date; draft: boolean; title: string };
}

/** Drafts are shown only when explicitly requested (the dev server); never in production builds. */
export function isVisible(entry: EntryLike, includeDrafts: boolean): boolean {
  return includeDrafts || !entry.data.draft;
}

/** Newest first; entries on the same day are ordered by title for a stable result. */
export function sortNewestFirst<T extends Dated>(entries: readonly T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title),
  );
}

export interface MonthGroup<T> {
  /** Stable key such as "2026-10", usable as an HTML id. */
  key: string;
  /** Human-readable heading such as "October 2026". */
  label: string;
  entries: T[];
}

/** Groups already-sorted entries under month headings, preserving order. Dates are read in UTC. */
export function groupByMonth<T extends Dated>(entries: readonly T[]): MonthGroup<T>[] {
  const groups: MonthGroup<T>[] = [];
  for (const entry of entries) {
    const date = entry.data.date;
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    let group = groups.at(-1);
    if (!group || group.key !== key) {
      group = {
        key,
        label: date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
        entries: [],
      };
      groups.push(group);
    }
    group.entries.push(entry);
  }
  return groups;
}

/** Groups already-sorted items under year headings, preserving order. Dates are read in UTC. */
export function groupByYear<T extends Dated>(items: readonly T[]): { year: number; items: T[] }[] {
  const groups: { year: number; items: T[] }[] = [];
  for (const item of items) {
    const year = item.data.date.getUTCFullYear();
    const group = groups.at(-1);
    if (group && group.year === year) group.items.push(item);
    else groups.push({ year, items: [item] });
  }
  return groups;
}

/** Formats a date-only value as e.g. "8 October 2026" without shifting it into the local timezone. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** ISO calendar date (YYYY-MM-DD) for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Returns the neighbouring entries in a newest-first list. */
export function neighbours<T extends Dated>(entries: readonly T[], id: string): { newer?: T; older?: T } {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return {};
  return { newer: entries[index - 1], older: entries[index + 1] };
}
