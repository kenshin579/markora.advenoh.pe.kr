import type { Dict } from '@/lib/i18n/types';
import { Nav } from './nav';
import { Hero } from './hero';
import { Features } from './features';
import { Demos } from './demos';
import { Slash } from './slash';
import { Install } from './install';
import { FAQ } from './faq';
import { FinalCTA } from './final-cta';
import { Footer } from './footer';

export function Landing({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <>
      <Nav t={t} />
      <Hero t={t} lang={lang} />
      <Features t={t} lang={lang} />
      <Demos t={t} lang={lang} />
      <Slash t={t} lang={lang} />
      <Install t={t} lang={lang} />
      <FAQ t={t} lang={lang} />
      <FinalCTA t={t} />
      <Footer t={t} lang={lang} />
    </>
  );
}
