import { test } from 'node:test';
import assert from 'node:assert/strict';
import rehypeBaseLinks from '../src/lib/rehype-base-links.mjs';

const link = (href: string) => ({ type: 'element', tagName: 'a', properties: { href }, children: [] });

function run(base: string, hrefs: string[]): string[] {
  const tree = { type: 'root', children: hrefs.map(link) };
  rehypeBaseLinks({ base })(tree);
  return tree.children.map((node) => node.properties.href);
}

test('root-relative links get the base path', () => {
  assert.deepEqual(run('/repo', ['/updates/entry/', '/papers/', '/data.csv']), [
    '/repo/updates/entry/',
    '/repo/papers/',
    '/repo/data.csv',
  ]);
});

test('external, in-page, relative and already-prefixed links are unchanged', () => {
  const hrefs = ['https://arxiv.org/abs/1', '//cdn.example/x', '#fig-1', '../sibling/', '/repo/papers/', '/repo'];
  assert.deepEqual(run('/repo', hrefs), hrefs);
});

test('a trailing slash on the base is ignored, and a root base changes nothing', () => {
  assert.deepEqual(run('/repo/', ['/papers/']), ['/repo/papers/']);
  assert.deepEqual(run('/', ['/papers/']), ['/papers/']);
});
