import type { Dict } from './types';

export const ko: Dict = {
  nav: { features: '기능', slash: '슬래시', install: '설치', faq: 'FAQ' },
  hero: {
    eyebrow: 'JetBrains IDE Plugin · Markora',
    t1: '마크다운, ',
    em: '미리보기 없이',
    t2: '.',
    lead: 'Typora 같은 WYSIWYG 편집을 IntelliJ·WebStorm·PyCharm 안에서. 분할 패널 없이, 입력하는 그대로 렌더링되는 Notion 스타일 블록 에디터.',
    installCta: 'Marketplace에서 설치',
    coming: '곧 출시',
    githubCta: 'GitHub에서 보기',
    trust: ['JetBrains 2024.2+', 'JCEF 기반', 'MIT 라이선스', 'Open source'],
  },
  feats: {
    eyebrow: '기능',
    title: '필요한 것은 다 있고, 설정 파일은 없습니다',
    lead: 'BlockNote 기반의 풍부한 블록 UX 위에 IDE 통합 · LaTeX · Mermaid를 더했어요.',
  },
  demo: {
    eyebrow: '라이브 렌더링',
    title: '수식과 다이어그램, 입력하는 그대로',
    lead: '$...$나 ```math, ```mermaid 코드 블록을 작성하면 즉시 렌더링됩니다. 별도의 미리보기 탭은 필요 없어요.',
  },
  slash: {
    eyebrow: '슬래시 메뉴',
    title: '/ 한 번이면 모든 블록',
    lead: 'BlockNote 기본 블록에 Markora 전용 3종이 더해집니다.',
    h: ['커맨드', '설명', '출처'],
  },
  install: {
    eyebrow: '설치',
    title: '30초면 설치 완료',
    lead: 'JCEF가 켜진 JetBrains IDE 2024.2 이상이면 됩니다.',
  },
  faq: { eyebrow: 'FAQ', title: '자주 묻는 질문' },
  foot: ['GitHub', '이슈', 'Changelog', '라이선스'],
};
