# Scalable Oversight by Learning to Decompose Tasks — research blog

A static research blog that documents the progress of the [Scalable Oversight by Learning to Decompose Tasks](https://mai-alignment.github.io/projects/superalignment-task-decomposition/) project of the [mAI alignment lab](https://mai-alignment.github.io/) (University of Bonn): results, methods, setbacks and explanations, published as the work develops. Built with [Astro](https://astro.build/), written in Markdown/MDX, with maths rendered at build time by KaTeX.

| | |
| --- | --- |
| **Public URL** | <https://mai-alignment.github.io/superalignment-task-decomposition/> |
| **Source** | `___projects/superalignment-task-decomposition/` in the lab website repository [`mAI-alignment/mAI-alignment.github.io`](https://github.com/mAI-alignment/mAI-alignment.github.io) |
| **Deployed by** | the lab site's GitHub Pages workflow, on every push to `master` (see [Deployment](#deployment)) |

## Setup

Requires Node.js 22.12 or newer and npm (the repository uses `package-lock.json`; do not mix package managers).

```sh
npm install
npm run dev        # local preview with drafts at http://localhost:4321/superalignment-task-decomposition/
```

The site is served under the `/superalignment-task-decomposition/` base path, locally as well as in production; `http://localhost:4321/` on its own shows a 404.

| Command            | What it does                                                                   |
| ------------------ | ------------------------------------------------------------------------------ |
| `npm run dev`      | Development server with live reload. **Shows drafts**, marked "Draft".         |
| `npm run check`    | Type-checks the code and validates every entry's frontmatter.                  |
| `npm test`         | Unit tests for entry filtering, ordering, grouping, date formatting and base-path links. |
| `npm run build`    | Production build into `dist/`. **Drafts are excluded.**                        |
| `npm run preview`  | Serves `dist/` locally, i.e. exactly what would be published.                  |
| `npm run validate` | `check`, `test` and `build` in sequence. Run before every publish.            |

## Publishing an update

1. **Copy a template** from [`templates/`](templates/) into `src/content/updates/` with a short, descriptive, lowercase filename, e.g. `src/content/updates/baseline-replication.md`.
   - Use `update.md` for plain Markdown (text, maths, tables, code, footnotes, simple images).
   - Use `update.mdx` when you need captioned figures or callouts.
   - The filename becomes the URL: `/updates/baseline-replication/`. **Do not rename a published entry**; that breaks links.
2. **Fill in the frontmatter** (see below) and write the entry. Keep `draft: true` while writing.
3. **Add images** to `src/assets/updates/`, prefixed with the entry's filename (e.g. `baseline-replication-loss.svg`). Give each one alternative text and a caption (see [Figures](#figures-and-images)).
4. **Preview** with `npm run dev`. Check the entry at desktop and phone widths (browser dev tools → responsive mode): equations, figures, tables, footnotes and links.
5. **Publish**: set `draft: false`, run `npm run validate`, and commit the entry and its images.
6. **Deploy** with the process described under [Deployment](#deployment).

The homepage, the updates archive, the RSS feed and the sitemap update automatically. Nothing else needs editing.

### Frontmatter

```yaml
---
title: "A short, descriptive update title"          # required
description: "Plain-language summary of the question and main takeaway."  # required
date: 2026-10-08                                   # required, YYYY-MM-DD
draft: true                                        # defaults to true; set false to publish
label: "Research update"                           # optional small label above the title
authors: ["Name"]                                  # optional
tags: [methods]                                    # optional topic labels
updated: 2026-10-12                                # optional; only after a material change
toc: true                                          # optional; force (true) or hide (false) the contents list
slug: custom-url                                   # optional; overrides the filename in the URL
---
```

- Frontmatter is validated by the schema in [`src/content.config.ts`](src/content.config.ts); `npm run check` and the build fail with a clear message on invalid values (e.g. a missing title or an `updated` date before `date`).
- Dates are calendar days and are displayed as written (e.g. "8 October 2026"), with no timezone shifts.
- Entries are sorted by `date`, newest first. Setting a future date does **not** schedule an entry: publishing is controlled only by `draft`.
- A table of contents appears automatically when an entry has four or more `##` sections.
- When correcting a published entry materially, set `updated` and say in the text what changed.
- Files whose names start with `_` are ignored, which is handy for notes you do not want in the collection.

### Drafts are not access control

Drafts are left out of every production surface (entry pages, homepage, archive, RSS, sitemap), but their source is still in the repository. Keep confidential results and unpublished data out of this repository altogether.

## Writing

Write each entry in layers: a plain-language opening (what was investigated, what happened, why it matters), then the explanation and evidence, then technical detail when needed, then limitations and next steps. Short progress notes can stay a few paragraphs long. The two example entries in `src/content/updates/` (`example-short-note.md`, `example-long-article.mdx`) show every supported element; they are drafts and never published. Delete them once real entries exist, or keep them for reference.

### Mathematics

Inline maths uses single dollars, `$p(x \mid \theta)$`; display maths uses double dollars on their own lines:

```md
$$
\operatorname{softmax}(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}
$$
```

Maths is rendered to HTML and MathML at build time (no JavaScript in the browser). Long equations scroll within their own box on narrow screens. KaTeX supports most LaTeX maths; see its [list of supported functions](https://katex.org/docs/supported.html). Explain each symbol near the equation that introduces it.

### Figures and images

In **MDX** entries, use the `Figure` component:

```mdx
import Figure from '../../components/Figure.astro';
import lossCurve from '../../assets/updates/baseline-replication-loss.svg';

<Figure src={lossCurve} alt="Training loss falls steeply for 2,000 steps, then flattens near 1.2." wide id="fig-1">
  <strong>Figure 1.</strong> Training loss over steps. Shaded band: standard deviation over 3 seeds.
</Figure>
```

| Prop       | Purpose                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------- |
| `src`      | An image imported from `src/assets/updates/` (SVG, PNG, JPEG, WebP, AVIF).                    |
| `alt`      | What the image shows, for people who cannot see it. Required. Use `""` only if decorative.   |
| caption    | The element's content (as above), or a plain-text `caption="..."` prop.                       |
| `credit`   | Optional source or credit line.                                                               |
| `wide`     | Use the wider column (plots with small labels, wide diagrams).                                |
| `priority` | Load eagerly; set it only on a figure near the top of an entry.                               |
| `id`       | Anchor for linking, e.g. `[Figure 1](#fig-1)`.                                                |

Alt text describes the image; the caption explains it. State each figure's main takeaway in the surrounding prose too. Prefer SVG for plots and diagrams; label axes, units, legends and uncertainty, and never encode meaning by colour alone. Wide figures shrink to fit phones, so keep labels large enough to stay legible at about 360 px width, or provide a simplified version. For complex charts, add a data table or a longer description.

In plain **Markdown**, `![alt text](../../assets/updates/file.png)` also works (images are optimised), but has no caption.

Raster images in `src/assets/` are resized and converted at build time; SVGs are copied as-is. Only use SVG files you or a trusted tool created. Files that must be downloadable unchanged (datasets, PDFs) go in `public/` and are linked as `/filename.ext`.

### Other elements

- **Footnotes**: `text[^1]` and `[^1]: The note.` at the end. Notes are collected at the bottom with links back to the reference.
- **Tables**: standard Markdown tables. They scroll horizontally on narrow screens.
- **Code**: fenced code blocks with a language (` ```python `), highlighted at build time.
- **Callouts** (MDX): `<Callout title="Limitation">...</Callout>`; add `kind="caution"` for caveats that must not be missed. Use sparingly.
- **Links to other entries and pages**: `[the earlier baseline note](/updates/baseline-replication/)`. Write site links from the root as shown; the base path is added automatically at build time. This works for Markdown link syntax; in MDX, avoid raw `<a href="/...">`.

## Adding a paper

Papers are listed on `/papers/` (grouped by year, with abstract and BibTeX) and the three most recent also appear on the homepage.

1. Copy [`templates/paper.yaml`](templates/paper.yaml) to `src/content/papers/<short-descriptive-name>.yaml`.
2. Fill in `title`, `authors`, `date` and `url` (required) and optionally `venue`, `links`, `abstract` and `bibtex`. Copy the abstract and BibTeX from the paper itself (e.g. arXiv's "Export BibTeX citation").
3. Run `npm run validate` and commit. Invalid fields (e.g. a malformed URL) fail the build with a message naming the file.

Papers have no draft state: anything in `src/content/papers/` is published. Do not add papers before they are public.

## Site content and configuration

| What                                              | Where                                                       |
| ------------------------------------------------- | ----------------------------------------------------------- |
| Project name, research question, introduction, footer author line, external links | [`src/site.config.ts`](src/site.config.ts) |
| Papers                                            | One YAML file per paper in `src/content/papers/`            |
| About page                                        | [`src/pages/about.mdx`](src/pages/about.mdx)                  |
| Public URL and base path                          | `SITE_URL` and `BASE_PATH` in [`astro.config.mjs`](astro.config.mjs) |
| Colours, fonts, spacing                           | [`src/styles/tokens.css`](src/styles/tokens.css)            |

## Project structure

```text
src/
  content/updates/     Markdown and MDX entries
  content.config.ts    Frontmatter schema for entries
  assets/updates/      Images used by entries (processed by Astro)
  components/          Figure, Callout, entry list, table of contents, header/footer
  layouts/             Base page, article (UpdateLayout) and Markdown page layouts
  lib/                 Entry helpers (filtering, sorting, grouping) and a rehype plugin
  content/papers/      One YAML file per paper
  pages/               Routes: home, /updates/, /updates/<id>/, /papers/, /about/, /rss.xml, 404
  styles/              Design tokens, global styles, article typography
  site.config.ts       Site identity and navigation
integrations/          Build-time checks (missing site URL, leftover placeholders)
templates/             Copyable entry templates
tests/                 Unit tests (node:test)
public/                Files served unchanged (favicon, downloads)
```

Design notes: the site uses a cold ivory background (`#f5f5f1`), midnight blue-black text (`#19232c`), a vermilion accent (`#ba4236`) for links and labels, and a muted steel (`#78929c`) used only for rules and borders, never for text. It also uses Newsreader (variable, self-hosted via `@fontsource-variable/newsreader`) for text and headings, and the system sans-serif for metadata. All text colours meet WCAG AA contrast on the background (the gray-blue secondary text only narrowly, at 4.6:1, so keep it off tinted panels). Pages ship almost no JavaScript: only the small theme toggle.

**Light and dark themes.** The site follows the reader's system setting by default. The sun/moon button in the header overrides it; the choice is remembered in the browser, and switching back to the system's own theme clears the override. Without JavaScript the system setting still applies and the button is hidden. Every colour token in [`src/styles/tokens.css`](src/styles/tokens.css) is written as `light-dark(<light>, <dark>)`, so change both values together and keep text at 4.5:1 contrast in each theme. Code blocks switch between the `github-light` and `github-dark` themes automatically. Figures are drawn for light backgrounds, so in dark mode they sit on a light plate. Still check new figures in both themes.