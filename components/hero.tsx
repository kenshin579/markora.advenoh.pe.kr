import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';
import { IDEMock } from './ide-mock';

export function Hero({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const marketplaceReady = !!siteConfig.marketplace;

  return (
    <section className="mk-hero">
      <div className="mk-hero-bg" />
      <div className="mk-hero-grid mk-container">
        <div className="mk-hero-copy">
          <div className="mk-eyebrow">{t.hero.eyebrow}</div>
          <h1 className="mk-h1">
            {t.hero.t1}
            <em>{t.hero.em}</em>
            {t.hero.t2}
          </h1>
          <p className="mk-lead">{t.hero.lead}</p>
          <div className="mk-hero-cta">
            {marketplaceReady ? (
              <a className="mk-btn primary lg" href={siteConfig.marketplace}>
                <Icon name="download" size={15} /> {t.hero.installCta}
              </a>
            ) : (
              <button className="mk-btn primary lg" disabled>
                <Icon name="download" size={15} /> {t.hero.installCta}
                <span className="mk-btn-badge">{t.hero.coming}</span>
              </button>
            )}
            <a className="mk-btn lg" href={siteConfig.github} target="_blank" rel="noreferrer">
              <Icon name="git" size={15} /> {t.hero.githubCta}
            </a>
          </div>
          <div className="mk-hero-trust">
            {t.hero.trust.map((x, i) => (
              <span key={x}>
                {x}
                {i < t.hero.trust.length - 1 && <span className="dot" />}
              </span>
            ))}
          </div>
        </div>
        <div className="mk-hero-mock">
          <IDEMock lang={lang} />
        </div>
      </div>
    </section>
  );
}
