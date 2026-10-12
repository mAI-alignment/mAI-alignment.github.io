/**
 * Rehype plugin: prefix root-relative links in Markdown/MDX with the site's base path.
 *
 * The site is served from a sub-path (e.g. /superalignment-task-decomposition/), but authors
 * can keep writing links as `[an update](/updates/some-entry/)`. Links that are external,
 * protocol-relative (`//host`), in-page (`#id`) or already prefixed are left unchanged.
 *
 * @param {{ base?: string }} options `base` as configured in astro.config.mjs, e.g. "/repo".
 */
export default function rehypeBaseLinks({ base = '/' } = {}) {
  const prefix = base.replace(/\/+$/, '');
  return (tree) => {
    if (!prefix) return;
    visit(tree, (node) => {
      for (const attribute of ['href', 'src']) {
        const value = node.properties?.[attribute];
        if (typeof value === 'string' && needsPrefix(value, prefix)) {
          node.properties[attribute] = prefix + value;
        }
      }
    });
  };
}

/** @param {string} value @param {string} prefix */
export function needsPrefix(value, prefix) {
  return (
    value.startsWith('/') &&
    !value.startsWith('//') &&
    value !== prefix &&
    !value.startsWith(`${prefix}/`)
  );
}

function visit(node, callback) {
  if (node.type === 'element') callback(node);
  for (const child of node.children ?? []) visit(child, callback);
}
