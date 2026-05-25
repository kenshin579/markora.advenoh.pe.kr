import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Footer({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  // URLs are listed in the same order as `t.foot`: GitHub, Issues, Changelog, License
  const footHrefs = [
    siteConfig.github,
    siteConfig.issues,
    siteConfig.changelog,
    siteConfig.license,
  ];
  return (
    <footer className="mk-footer">
      <div className="mk-container mk-footer-inner">
        <div className="mk-logo">
          <div className="mk-logo-mark">M</div>
          <span>Markora</span>
        </div>
        <div className="mk-footer-links">
          {t.foot.map((x, i) => (
            <a key={x} href={footHrefs[i]} target="_blank" rel="noreferrer">
              {x}
            </a>
          ))}
        </div>
        <div className="mk-footer-meta">
          © 2026 kenshin579 · {lang === 'ko' ? 'MIT 라이선스' : 'MIT License'}
        </div>
      </div>
    </footer>
  );
}
