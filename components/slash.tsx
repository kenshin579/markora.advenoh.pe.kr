import type { Dict } from '@/lib/i18n/types';

type Row = { cmd: string; desc: string; group: 'default' | 'markora' };

function getRows(lang: 'en' | 'ko'): Row[] {
  return [
    { cmd: '/h1, /h2, /h3', desc: lang === 'ko' ? '제목 1~3 단계' : 'Heading levels 1–3', group: 'default' },
    { cmd: '/list, /numbered, /check', desc: lang === 'ko' ? '글머리·번호·체크박스' : 'Bullet, numbered, or checklist', group: 'default' },
    { cmd: '/code', desc: lang === 'ko' ? '코드 블록 (언어 자동 인식)' : 'Code block — language-aware', group: 'default' },
    { cmd: '/table', desc: lang === 'ko' ? '표 삽입 — 행/열 자유 편집' : 'Insert a table — add/remove rows freely', group: 'default' },
    { cmd: '/image', desc: lang === 'ko' ? '파일 선택 다이얼로그로 이미지 추가' : 'Pick a file to insert an image', group: 'default' },
    { cmd: '/quote, /divider', desc: lang === 'ko' ? '인용·구분선' : 'Blockquote, divider', group: 'default' },
    { cmd: '/math', desc: lang === 'ko' ? 'LaTeX 수식 블록 (KaTeX)' : 'LaTeX math block (KaTeX)', group: 'markora' },
    { cmd: '/equation', desc: lang === 'ko' ? '인라인 수식 — $...$' : 'Inline equation — $...$', group: 'markora' },
    { cmd: '/mermaid', desc: lang === 'ko' ? 'Mermaid 다이어그램 (flow, sequence, gantt)' : 'Mermaid diagram (flow, sequence, gantt)', group: 'markora' },
  ];
}

export function Slash({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const rows = getRows(lang);
  return (
    <section className="mk-section" id="slash">
      <div className="mk-container">
        <div className="mk-section-head">
          <div className="mk-eyebrow">{t.slash.eyebrow}</div>
          <h2 className="mk-h2">{t.slash.title}</h2>
          <p>{t.slash.lead}</p>
        </div>
        <div className="mk-slash-list">
          <div className="mk-slash-header">
            <div>{t.slash.h[0]}</div>
            <div>{t.slash.h[1]}</div>
            <div>{t.slash.h[2]}</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="mk-slash-row">
              <div className="cmd"><code>{r.cmd}</code></div>
              <div className="desc">{r.desc}</div>
              <div>
                {r.group === 'markora'
                  ? <span className="badge accent">★ Markora</span>
                  : <span className="badge muted">BlockNote</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
