import type { Dict } from '@/lib/i18n/types';
import { MathDemo } from './math-demo';
import { MermaidDemo } from './mermaid-demo';

export function Demos({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <section className="mk-section muted">
      <div className="mk-container">
        <div className="mk-section-head">
          <div className="mk-eyebrow">{t.demo.eyebrow}</div>
          <h2 className="mk-h2">{t.demo.title}</h2>
          <p>{t.demo.lead}</p>
        </div>
        <div className="mk-demo">
          <MathDemo lang={lang} />
          <MermaidDemo lang={lang} />
        </div>
      </div>
    </section>
  );
}
