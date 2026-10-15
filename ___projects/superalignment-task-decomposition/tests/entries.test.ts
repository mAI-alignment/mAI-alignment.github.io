import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, groupByMonth, groupByYear, isoDate, isVisible, neighbours, sortNewestFirst } from '../src/lib/entries.ts';

const entry = (id: string, date: string, draft = false) => ({
  id,
  data: { date: new Date(date), draft, title: id },
});

test('drafts are hidden unless explicitly included', () => {
  assert.equal(isVisible(entry('a', '2026-01-01', true), false), false);
  assert.equal(isVisible(entry('a', '2026-01-01', true), true), true);
  assert.equal(isVisible(entry('b', '2026-01-01', false), false), true);
});

test('entries are sorted newest first, ties broken by title', () => {
  const sorted = sortNewestFirst([
    entry('old', '2025-12-31'),
    entry('b-same-day', '2026-03-01'),
    entry('new', '2026-04-01'),
    entry('a-same-day', '2026-03-01'),
  ]);
  assert.deepEqual(
    sorted.map((e) => e.id),
    ['new', 'a-same-day', 'b-same-day', 'old'],
  );
});

test('sorting does not mutate its input', () => {
  const input = [entry('a', '2025-01-01'), entry('b', '2026-01-01')];
  sortNewestFirst(input);
  assert.deepEqual(input.map((e) => e.id), ['a', 'b']);
});

test('entries are grouped by calendar month in order', () => {
  const groups = groupByMonth([
    entry('c', '2026-10-31'),
    entry('b', '2026-10-01'),
    entry('a', '2026-09-30'),
  ]);
  assert.deepEqual(
    groups.map((g) => [g.key, g.label, g.entries.map((e) => e.id)]),
    [
      ['2026-10', 'October 2026', ['c', 'b']],
      ['2026-09', 'September 2026', ['a']],
    ],
  );
});

test('date-only values are formatted without timezone shifts', () => {
  // YAML dates such as 2026-10-01 parse as UTC midnight; local formatting west of UTC would show 30 September.
  const date = new Date('2026-10-01');
  assert.equal(formatDate(date), '1 October 2026');
  assert.equal(isoDate(date), '2026-10-01');
});

test('neighbours returns newer and older entries', () => {
  const list = [entry('new', '2026-03-01'), entry('mid', '2026-02-01'), entry('old', '2026-01-01')];
  assert.deepEqual(
    { newer: neighbours(list, 'mid').newer?.id, older: neighbours(list, 'mid').older?.id },
    { newer: 'new', older: 'old' },
  );
  assert.deepEqual(neighbours(list, 'missing'), {});
  assert.equal(neighbours(list, 'new').newer, undefined);
});

test('items are grouped by year in order', () => {
  const groups = groupByYear([entry('c', '2026-01-01'), entry('b', '2025-12-31'), entry('a', '2025-03-17')]);
  assert.deepEqual(
    groups.map((g) => [g.year, g.items.map((e) => e.id)]),
    [
      [2026, ['c']],
      [2025, ['b', 'a']],
    ],
  );
});
