export const en = {
  nav: { features: 'Features', slash: 'Slash', install: 'Install', faq: 'FAQ' },
  hero: {
    eyebrow: 'JetBrains IDE Plugin · Markora',
    t1: 'Markdown, ',
    em: 'without the preview pane',
    t2: '.',
    lead: 'Typora-style WYSIWYG editing inside IntelliJ, WebStorm, PyCharm and friends. A Notion-style block editor that renders as you type — no split view, no preview tab.',
    installCta: 'Install from Marketplace',
    coming: 'Coming soon',
    githubCta: 'View on GitHub',
    trust: ['JetBrains 2024.2+', 'JCEF-based', 'MIT license', 'Open source'],
  },
  feats: {
    eyebrow: 'Features',
    title: 'Everything you need, zero config',
    lead: "BlockNote's block UX, plus IDE integration, LaTeX math, and Mermaid diagrams.",
  },
  demo: {
    eyebrow: 'Live render',
    title: 'Math and diagrams, the moment you type',
    lead: 'Wrap math in $...$ or a ```math block, draw a diagram in ```mermaid — both render inline. No preview tab needed.',
  },
  slash: {
    eyebrow: 'Slash menu',
    title: 'Type / for every block',
    lead: 'BlockNote defaults plus three Markora-specific commands.',
    h: ['Command', 'Description', 'Origin'] as [string, string, string],
  },
  install: {
    eyebrow: 'Install',
    title: "30 seconds and you're in",
    lead: 'Works on any JetBrains IDE 2024.2+ with JCEF enabled (default).',
  },
  faq: { eyebrow: 'FAQ', title: 'Frequently asked' },
  foot: ['GitHub', 'Issues', 'Changelog', 'License'] as [string, string, string, string],
};

export type Dict = typeof en;
