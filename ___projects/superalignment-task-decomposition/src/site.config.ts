/**
 * Site identity and navigation. Edit this file to change the project name, introduction,
 * or links; no other application code needs to change.
 *
 * Strings containing "TODO(content)" are placeholders. The production build lists every page
 * that still contains one.
 */
export const SITE = {
  /** Project title, as on the mAI alignment lab project page. */
  title: 'Scalable Oversight by Learning to Decompose Tasks',
  /** Used for the homepage <meta name="description"> and the RSS feed. */
  description:
    'Research notes from a project on scalable oversight: training an AI to break hard tasks into subtasks that weaker models, or humans, can reliably judge.',
  /** The guiding question, shown prominently on the homepage. */
  question: 'How do we control superintelligent AI?',
  /** A short paragraph expanding on the question for a curious, non-specialist reader. */
  introduction:
    'We are exploring one route to supervising increasingly capable AI systems: an AI learns to break a hard task into “safe” subtasks that a human-level model, or a human, can reliably judge. This site documents the project as it develops: results, methods, setbacks and explanations.',
  /** Shown in the footer. Leave empty to omit. */
  authorLine:
    'A project of the mAI alignment lab, a Junior Research Group at the University of Bonn led by Dr. Florian Mai. Supported by a grant from Coefficient Giving.',
  /** BCP 47 language tag for the site. */
  lang: 'en',
  /** How many entries the homepage shows before linking to the full archive. */
  homepageEntries: 8,
} as const;

export const NAV = [
  { label: 'Updates', href: '/updates/' },
  { label: 'Papers', href: '/papers/' },
  { label: 'About', href: '/about/' },
] as const;

/** External project links (code, data, papers) shown in the footer and on the About page. Add as needed. */
export const PROJECT_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Project page', href: 'https://mai-alignment.github.io/projects/superalignment-task-decomposition/' },
  { label: 'Position paper (arXiv)', href: 'https://arxiv.org/abs/2503.13621' },
  { label: 'mAI alignment lab', href: 'https://mai-alignment.github.io/' },
];
