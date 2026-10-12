/**
 * Rehype plugin: make wide Markdown content scroll locally instead of widening the page.
 *
 * - Tables are wrapped in a focusable, labelled region so keyboard users can scroll them.
 * - Display equations rendered by KaTeX are made focusable for the same reason.
 *
 * Must run after rehype-katex. Styles live in src/styles/prose.css.
 */
export default function rehypeScrollRegions() {
  return (tree) => visit(tree);
}

function visit(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type !== 'element') return child;
    visit(child);

    if (child.tagName === 'table') {
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroll'],
          role: 'region',
          ariaLabel: 'Table (scrolls horizontally on narrow screens)',
          tabIndex: 0,
        },
        children: [child],
      };
    }

    const classes = child.properties?.className;
    if (Array.isArray(classes) && classes.includes('katex-display')) {
      child.properties.tabIndex = 0;
    }
    return child;
  });
}
