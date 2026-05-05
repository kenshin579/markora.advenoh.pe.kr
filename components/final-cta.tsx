import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function FinalCTA({ t }: { t: Dict }) {
  const marketplaceReady = !!siteConfig.marketplace;
  return (
    <section className="mk-cta-band">
      <div className="mk-container">
        <div className="mk-cta-card">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.lead}</p>
          <div className="mk-cta-buttons">
            {marketplaceReady ? (
              <a className="mk-btn primary lg" href={siteConfig.marketplace}>
                <Icon name="download" size={15} /> {t.cta.primary}
              </a>
            ) : (
              <button className="mk-btn primary lg" disabled>
                <Icon name="download" size={15} /> {t.cta.primary}
              </button>
            )}
            <a className="mk-btn lg ghost" href={siteConfig.github} target="_blank" rel="noreferrer">
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
