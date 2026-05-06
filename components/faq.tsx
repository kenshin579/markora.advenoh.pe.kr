'use client';

import { useState, type ReactNode } from 'react';
import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

type QA = { q: string; a: ReactNode };

function getFaqs(lang: 'en' | 'ko'): QA[] {
  if (lang === 'ko') {
    return [
      { q: '어떤 JetBrains IDE에서 동작하나요?', a: <>IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, PhpStorm, Rider, CLion 등 <strong>2024.2 이상</strong>이면 동작합니다. JCEF가 활성화되어 있어야 하고, 대부분 IDE에서 기본값으로 켜져 있어요.</> },
      { q: '기본 IntelliJ 마크다운 플러그인과 충돌하지 않나요?', a: '충돌하지 않습니다. Markora는 추가 에디터 탭으로 동작하므로, .md 파일을 열면 에디터 하단에서 Markora / Source / Preview를 자유롭게 전환할 수 있어요.' },
      { q: '변경 내용은 어떻게 저장되나요?', a: '입력 즉시 디바운스 자동 저장됩니다(기본 1초). 결과물은 표준 CommonMark + GFM 호환 마크다운이라 다른 에디터에서 그대로 열 수 있어요.' },
      { q: '이미지는 어떻게 추가하나요?', a: <><code>/image</code> 슬래시 명령으로 파일 선택 다이얼로그를 열어 이미지를 고르면 같은 폴더의 <code>images/</code> 하위에 자동으로 정리됩니다. 경로는 상대 경로로 삽입돼서 Git 리포 그대로 커밋해도 안전해요.</> },
      { q: '오픈소스인가요? 기여할 수 있나요?', a: <>네, MIT 라이선스 오픈소스입니다. <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub 리포지토리</a>에서 이슈와 PR을 환영합니다.</> },
    ];
  }
  return [
    { q: 'Which JetBrains IDEs are supported?', a: <>IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, PhpStorm, Rider, CLion — anything <strong>2024.2 or newer</strong>. JCEF must be enabled (it is, by default).</> },
    { q: 'Does it conflict with the built-in Markdown plugin?', a: 'No. Markora registers as an additional editor tab, so when you open a .md file you can freely switch between Markora / Source / Preview.' },
    { q: 'How are changes saved?', a: 'Saves are debounced as you type (default 1s). Output is standard CommonMark + GFM, so other editors open the file unchanged.' },
    { q: 'How do I add images?', a: <>Type <code>/image</code> to open a file picker. The selected file is auto-organized under <code>images/</code> next to your markdown file, and the path is inserted as a relative URL — safe to commit to Git.</> },
    { q: 'Is it open source? How can I contribute?', a: <>Yes — MIT licensed. Issues and PRs welcome on the <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub repo</a>.</> },
  ];
}

export function FAQ({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const items = getFaqs(lang);
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="mk-section" id="faq">
      <div className="mk-container narrow">
        <div className="mk-section-head">
          <div className="mk-eyebrow">{t.faq.eyebrow}</div>
          <h2 className="mk-h2">{t.faq.title}</h2>
        </div>
        <div className="mk-faq">
          {items.map((item, i) => (
            <div key={i} className={'mk-faq-item' + (open === i ? ' open' : '')}>
              <button className="mk-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{item.q}</span>
                <span className="mk-faq-chev"><Icon name="chev" size={16} /></span>
              </button>
              <div className="mk-faq-a"><div className="inner">{item.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
