export const siteConfig = {
  name: 'Markora',
  description: 'WYSIWYG Markdown editor for JetBrains IDEs.',
  url: 'https://markora.advenoh.pe.kr',
  github: 'https://github.com/kenshin579/markora',
  marketplace: 'https://plugins.jetbrains.com/plugin/31598-markora',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  ogImage: '/og.png',
} as const;
