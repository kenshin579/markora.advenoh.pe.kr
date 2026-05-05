import { Icon, type IconName } from '@/lib/icons';
import type { Dict } from '@/lib/i18n/types';

type Feat = { ic: IconName; t: string; d: string; span?: boolean };

function getFeats(lang: 'en' | 'ko'): Feat[] {
  return [
    {
      ic: 'eye',
      t: lang === 'ko' ? 'WYSIWYG 편집' : 'WYSIWYG editing',
      d: lang === 'ko' ? 'BlockNote 기반. 미리보기 패널 없이 입력 즉시 렌더링.' : 'Built on BlockNote. Type and see it rendered — no preview pane.',
      span: true,
    },
    {
      ic: 'slash',
      t: lang === 'ko' ? '슬래시 커맨드' : 'Slash commands',
      d: lang === 'ko' ? '/ 한 번이면 헤딩·리스트·코드·표·수식·다이어그램까지.' : 'Type / for headings, lists, code, tables, math, diagrams.',
      span: true,
    },
    {
      ic: 'moon',
      t: lang === 'ko' ? '테마 동기화' : 'Theme sync',
      d: lang === 'ko' ? 'IDE의 다크/라이트 테마를 자동으로 따라갑니다.' : "Follows your IDE's Dark / Light theme automatically.",
    },
    {
      ic: 'save',
      t: lang === 'ko' ? '자동 저장' : 'Auto-save',
      d: lang === 'ko' ? '디바운스 저장. 변경 즉시 안전하게 디스크에.' : 'Debounced saves. Your changes land safely on disk.',
    },
    {
      ic: 'image',
      t: lang === 'ko' ? '이미지 드롭' : 'Image drop',
      d: lang === 'ko' ? '드래그·붙여넣기 한 번으로 images/ 폴더 자동 정리.' : 'Drag, drop, paste — auto-organized into images/.',
    },
    {
      ic: 'link',
      t: lang === 'ko' ? '외부 링크' : 'External links',
      d: lang === 'ko' ? '시스템 브라우저로 열어 IDE 흐름을 깨지 않습니다.' : "Open in your system browser — won't break IDE flow.",
    },
  ];
}

export function Features({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const feats = getFeats(lang);
  return (
    <section className="mk-section" id="features">
      <div className="mk-container">
        <div className="mk-section-head">
          <div className="mk-eyebrow">{t.feats.eyebrow}</div>
          <h2 className="mk-h2">{t.feats.title}</h2>
          <p>{t.feats.lead}</p>
        </div>
        <div className="mk-feat-grid">
          {feats.map((f) => (
            <div key={f.t} className={'mk-feat-card' + (f.span ? ' span2' : '')}>
              <div className="mk-feat-icon"><Icon name={f.ic} size={18} /></div>
              <div className="mk-feat-title">{f.t}</div>
              <div className="mk-feat-desc">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
