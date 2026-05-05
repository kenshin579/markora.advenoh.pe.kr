'use client';

import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import { LangToggle } from './lang-toggle';
import { ThemeToggle } from './theme-toggle';
import type { Dict } from '@/lib/i18n/types';

export function Nav({ t }: { t: Dict }) {
  return (
    <header className="mk-nav">
      <div className="mk-nav-inner">
        <div className="mk-logo">
          <div className="mk-logo-mark">M</div>
          <span>Markora</span>
        </div>
        <nav className="mk-nav-links">
          <a href="#features">{t.nav.features}</a>
          <a href="#slash">{t.nav.slash}</a>
          <a href="#install">{t.nav.install}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>
        <div className="mk-nav-spacer" />
        <div className="mk-nav-tools">
          <LangToggle />
          <ThemeToggle />
          <a className="mk-btn sm" href={siteConfig.github} target="_blank" rel="noreferrer">
            <Icon name="star" size={13} /> Star
          </a>
        </div>
      </div>
    </header>
  );
}
