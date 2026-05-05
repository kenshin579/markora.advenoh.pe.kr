import type { Metadata } from 'next';
import { en } from '@/lib/i18n/en';
import { Landing } from '@/components/landing';
import { AutoLangRedirect } from '@/components/auto-lang-redirect';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
  description: en.hero.lead,
  openGraph: {
    locale: 'en_US',
    title: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
    description: en.hero.lead,
  },
};

export default function Page() {
  return (
    <>
      <AutoLangRedirect />
      <Landing t={en} lang="en" />
    </>
  );
}
