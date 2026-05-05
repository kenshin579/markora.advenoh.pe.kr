import type { Dict } from '@/lib/i18n/types';
import type { ReactNode } from 'react';

type Step = { h: string; p: ReactNode };

function getSteps(lang: 'en' | 'ko'): Step[] {
  if (lang === 'ko') {
    return [
      { h: 'Marketplace 열기', p: <>JetBrains IDE에서 <code>Settings → Plugins → Marketplace</code>로 이동하세요.</> },
      { h: '"Markora" 검색 후 설치', p: <>검색창에 <code>Markora</code>를 입력하고 <strong>Install</strong>을 누른 뒤 IDE를 재시작하세요.</> },
      { h: '.md 파일에서 Markora 탭 선택', p: <>마크다운 파일을 열고 에디터 하단의 <strong>Markora</strong> 탭을 선택하면 끝.</> },
    ];
  }
  return [
    { h: 'Open Marketplace', p: <>In your JetBrains IDE, go to <code>Settings → Plugins → Marketplace</code>.</> },
    { h: 'Search "Markora" and install', p: <>Type <code>Markora</code>, click <strong>Install</strong>, then restart your IDE.</> },
    { h: 'Open any .md, pick the Markora tab', p: <>Pick the <strong>Markora</strong> tab at the bottom of the editor. Done.</> },
  ];
}

export function Install({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const steps = getSteps(lang);
  return (
    <section className="mk-section muted" id="install">
      <div className="mk-container">
        <div className="mk-section-head">
          <div className="mk-eyebrow">{t.install.eyebrow}</div>
          <h2 className="mk-h2">{t.install.title}</h2>
          <p>{t.install.lead}</p>
        </div>
        <div className="mk-install">
          {steps.map((s, i) => (
            <div key={i} className="mk-install-step">
              <div className="num">{i + 1}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
