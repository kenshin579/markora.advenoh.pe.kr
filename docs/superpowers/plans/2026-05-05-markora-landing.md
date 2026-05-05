# Markora Landing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Markora 플러그인 홍보용 정적 랜딩 사이트를 Next.js 16 + React 19로 구축. 기본 영어(`/`), 한국어(`/ko/`) 라우트 분리. 디자인 파일(`docs/design/`)을 거의 1:1로 포팅.

**Architecture:** Next.js App Router + `output: 'export'`로 정적 HTML 생성. 디자인 CSS(`rabbit-tokens.css` + `markora.css`)를 그대로 import해서 시각 디자인 100% 재현. shadcn/ui 미사용. next-themes로 라이트/다크. 클라이언트 사이드 자동 언어 감지.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3 (잡일 유틸리티만), next-themes, Pretendard self-host, Netlify static export.

**Spec:** `docs/superpowers/specs/2026-05-05-markora-landing-design.md`

**Working dir:** `/Users/user/src/workspace_markora/markora.advenoh.pe.kr/`

**Test strategy:** 정적 콘텐츠라 단위/E2E 테스트는 작성하지 않음 (spec §1.2 결정). 각 task 완료 후 `npm run check`(tsc) + `npm run build`로 검증. 종합 검증은 Task 23.

**Branch strategy:** `feat/landing-page-implementation` 브랜치에서 task별 commit. 모든 task 완료 후 단일 PR.

---

## File Map

### 새로 만들 파일

```
package.json
next.config.js
tsconfig.json
tailwind.config.ts
postcss.config.js
.gitignore
.env.example
CLAUDE.md
netlify.toml

styles/rabbit-tokens.css            # docs/design/에서 cp
styles/markora.css                  # docs/design/에서 cp

app/globals.css
app/layout.tsx
app/page.tsx                        # en (기본)
app/ko/page.tsx                     # ko
app/robots.ts
app/sitemap.ts

components/landing.tsx              # 섹션 컴포지션 (server)
components/auto-lang-redirect.tsx   # client
components/nav.tsx                  # client
components/theme-toggle.tsx         # client
components/lang-toggle.tsx          # client
components/hero.tsx                 # server
components/ide-mock.tsx             # server
components/features.tsx             # server
components/demos/math-demo.tsx      # server
components/demos/mermaid-demo.tsx   # server
components/demos/index.tsx          # server (Demos 래퍼)
components/slash.tsx                # server
components/install.tsx              # server
components/faq.tsx                  # client (아코디언 useState)
components/final-cta.tsx            # server
components/footer.tsx               # server

lib/i18n/en.ts                      # Dict 원본
lib/i18n/types.ts                   # Dict 타입
lib/i18n/ko.ts                      # Dict 만족하는 한국어 값
lib/icons.tsx                       # SVG 아이콘
lib/site-config.ts

public/fonts/PretendardVariable.woff2
public/og.png                       # placeholder (Task 22)
public/favicon.svg                  # placeholder (Task 22)
```

### 수정/이동할 파일

없음 (markora.advenoh.pe.kr 리포는 README + design 폴더만 있는 빈 상태).

---

## Task 1: 프로젝트 스캐폴딩

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `.env.example`

- [ ] **Step 1.1: feature 브랜치 생성**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
git checkout -b feat/landing-page-implementation
```

- [ ] **Step 1.2: package.json 작성**

```json
{
  "name": "markora-landing",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve@latest out -l 3000",
    "check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.0.7",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "next-themes": "^0.4.6"
  },
  "devDependencies": {
    "@types/node": "^20.16.11",
    "@types/react": "^18.3.26",
    "@types/react-dom": "^18.3.7",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3"
  }
}
```

- [ ] **Step 1.3: next.config.js 작성**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 1.4: tsconfig.json 작성**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out", ".next"]
}
```

- [ ] **Step 1.5: tailwind.config.ts 작성**

```ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 1.6: postcss.config.js 작성**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 1.7: .gitignore 작성**

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.env.local
.env*.local
.DS_Store
```

- [ ] **Step 1.8: .env.example 작성**

```
# Google Analytics 속성 ID (배포 시 Netlify UI 환경변수로 주입)
NEXT_PUBLIC_GA_ID=
```

- [ ] **Step 1.9: 의존성 설치**

```bash
npm install
```

Expected: `package-lock.json` 생성, `node_modules/` 생성, peer dependency 경고 OK.

- [ ] **Step 1.10: tsc 통과 확인**

```bash
npm run check
```

Expected: 에러 0개. `next-env.d.ts`가 자동 생성됨.

- [ ] **Step 1.11: commit**

```bash
git add package.json package-lock.json next.config.js tsconfig.json tailwind.config.ts postcss.config.js .gitignore .env.example next-env.d.ts
git commit -m "chore: scaffold Next.js 16 + TypeScript + Tailwind project"
```

---

## Task 2: CLAUDE.md 작성

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 2.1: CLAUDE.md 작성**

```markdown
# CLAUDE.md

이 파일은 markora.advenoh.pe.kr 작업 시 Claude Code에게 제공하는 가이드입니다.

## 프로젝트 개요

Markora JetBrains 플러그인 홍보용 정적 랜딩 페이지 사이트.

- **상위 워크스페이스:** `../` (markora 플러그인 본체와 같은 워크스페이스)
- **도메인:** https://markora.advenoh.pe.kr
- **디자인 원본:** `docs/design/` — React 18 + Babel standalone 프로토타입
- **스펙:** `docs/superpowers/specs/2026-05-05-markora-landing-design.md`

## 빌드 / 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # next build → out/
npm run start    # npx serve out -l 3000
npm run check    # tsc --noEmit
```

`output: 'export'` + `trailingSlash: true`이므로 `out/index.html`(en) + `out/ko/index.html`(ko) 정적 파일이 생성됩니다.

## 라우트 / 다국어

- `/` → 영어 (기본). `<AutoLangRedirect />`가 한국어 OS면 `/ko/`로 자동 redirect
- `/ko/` → 한국어
- 사용자가 KO/EN 토글로 명시 선택하면 `localStorage['mk-lang']`에 저장되어 자동 redirect 비활성

## 디자인 시스템

- `styles/rabbit-tokens.css` + `styles/markora.css`: 디자인 원본 그대로 import
- accent 컬러는 blue 1개 고정 (`app/globals.css`의 `:root` / `[data-theme="dark"]`)
- shadcn/ui 미사용. FAQ 아코디언도 자체 useState로 구현
- 폰트: Pretendard Variable, `next/font/local`로 self-host

## 콘텐츠 / 카피 변경

`lib/i18n/en.ts`가 Dict 타입의 원본. `lib/i18n/ko.ts`는 같은 모양을 강제 (`Dict` 타입). 한쪽만 키 추가/삭제하면 빌드 에러로 잡힘.

IDE 목업 / Math / Mermaid 데모의 인라인 텍스트는 dict가 아닌 컴포넌트 내부 `lang === 'ko' ? ... : ...` 분기로 관리 (디자인 충실 포팅).

## CTA 출시 전 상태

`lib/site-config.ts`의 `marketplace`가 빈 문자열이면 Hero/FinalCTA의 "Install from Marketplace" 버튼이 disabled + "Coming soon" 배지. URL을 채우면 자동 활성화.

## Git

- 브랜치 정책: 글로벌 정책 따름 (main 직접 commit 금지, feature 브랜치 + PR)
- 커밋 메시지: 영어, conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
```

- [ ] **Step 2.2: commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md project guide"
```

---

## Task 3: 디자인 자산 복사

**Files:**
- Create: `styles/rabbit-tokens.css` (cp from `docs/design/`)
- Create: `styles/markora.css` (cp from `docs/design/`)

**Note:** spec §6.1은 `markora.css`에서 `.tweak`/`[data-accent]` 셀렉터를 grep 후 제거하라 했지만, 사전 확인 결과 해당 셀렉터가 없음 (Tweaks 패널은 별도 jsx 파일에만 존재). 정리 작업 불필요, 그대로 복사.

- [ ] **Step 3.1: styles 디렉토리 생성 및 복사**

```bash
mkdir -p styles
cp docs/design/rabbit-tokens.css styles/rabbit-tokens.css
cp docs/design/markora.css styles/markora.css
```

- [ ] **Step 3.2: 인코딩 확인**

```bash
file -I styles/rabbit-tokens.css styles/markora.css
```

Expected: 두 파일 모두 `charset=utf-8`.

- [ ] **Step 3.3: commit**

```bash
git add styles/
git commit -m "feat: import design CSS tokens (rabbit-tokens, markora)"
```

---

## Task 4: Pretendard 폰트 self-host

**Files:**
- Create: `public/fonts/PretendardVariable.woff2`

- [ ] **Step 4.1: fonts 디렉토리 생성**

```bash
mkdir -p public/fonts
```

- [ ] **Step 4.2: Pretendard Variable woff2 다운로드**

공식 GitHub 릴리스에서 가변 폰트 woff2 한 개를 받음:

```bash
curl -L -o public/fonts/PretendardVariable.woff2 \
  https://github.com/orioncactus/pretendard/raw/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2
```

- [ ] **Step 4.3: 파일 검증**

```bash
ls -la public/fonts/PretendardVariable.woff2
```

Expected: 파일 크기 ~1.0MB 내외.

- [ ] **Step 4.4: commit**

```bash
git add public/fonts/PretendardVariable.woff2
git commit -m "feat: add Pretendard Variable font (self-hosted)"
```

---

## Task 5: app/globals.css

**Files:**
- Create: `app/globals.css`

- [ ] **Step 5.1: app 디렉토리 생성**

```bash
mkdir -p app
```

- [ ] **Step 5.2: app/globals.css 작성**

```css
@import '../styles/rabbit-tokens.css';
@import '../styles/markora.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --mk-accent: #2563eb;
  --mk-accent-hover: #1d4ed8;
  --mk-accent-subtle: #dbeafe;
  --mk-accent-border: #bfdbfe;
  --mk-accent-text: #1d4ed8;

  font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

[data-theme='dark'] {
  --mk-accent: #60a5fa;
  --mk-accent-hover: #93c5fd;
  --mk-accent-subtle: #1e3a5f;
  --mk-accent-border: #1d4ed8;
  --mk-accent-text: #93c5fd;
}
```

- [ ] **Step 5.3: commit**

```bash
git add app/globals.css
git commit -m "feat: globals.css with accent tokens and font family"
```

---

## Task 6: lib/site-config.ts

**Files:**
- Create: `lib/site-config.ts`

- [ ] **Step 6.1: lib 디렉토리 생성**

```bash
mkdir -p lib
```

- [ ] **Step 6.2: lib/site-config.ts 작성**

```ts
export const siteConfig = {
  name: 'Markora',
  description: 'WYSIWYG Markdown editor for JetBrains IDEs.',
  url: 'https://markora.advenoh.pe.kr',
  github: 'https://github.com/kenshin579/markora',
  marketplace: '',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  ogImage: '/og.png',
} as const;
```

- [ ] **Step 6.3: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 6.4: commit**

```bash
git add lib/site-config.ts
git commit -m "feat: add site-config with placeholders"
```

---

## Task 7: i18n 데이터 (en, ko, types)

**Files:**
- Create: `lib/i18n/en.ts`
- Create: `lib/i18n/types.ts`
- Create: `lib/i18n/ko.ts`

**Source:** `docs/design/markora-data.jsx`의 `T.en` / `T.ko` 객체.

- [ ] **Step 7.1: lib/i18n 디렉토리 생성**

```bash
mkdir -p lib/i18n
```

- [ ] **Step 7.2: lib/i18n/en.ts 작성**

`docs/design/markora-data.jsx`의 `T.en` 객체(라인 46-62)를 옮기되, 다음 변환 적용:
- 첫 줄에 `export const en = {` 로 시작, 끝에 `} as const;`
- 객체 내 텍스트는 그대로
- `<>` JSX 단편은 없으므로 변환 불필요

```ts
export const en = {
  nav: { features: 'Features', slash: 'Slash', install: 'Install', faq: 'FAQ' },
  hero: {
    eyebrow: 'JetBrains IDE Plugin · Markora',
    t1: 'Markdown, ',
    em: 'without the preview pane',
    t2: '.',
    lead: 'Typora-style WYSIWYG editing inside IntelliJ, WebStorm, PyCharm and friends. A Notion-style block editor that renders as you type — no split view, no preview tab.',
    installCta: 'Install from Marketplace',
    coming: 'Coming soon',
    githubCta: 'View on GitHub',
    trust: ['JetBrains 2024.2+', 'JCEF-based', 'MIT license', 'Open source'],
  },
  feats: {
    eyebrow: 'Features',
    title: 'Everything you need, zero config',
    lead: "BlockNote's block UX, plus IDE integration, LaTeX math, and Mermaid diagrams.",
  },
  demo: {
    eyebrow: 'Live render',
    title: 'Math and diagrams, the moment you type',
    lead: 'Wrap math in $...$ or a ```math block, draw a diagram in ```mermaid — both render inline. No preview tab needed.',
  },
  slash: {
    eyebrow: 'Slash menu',
    title: 'Type / for every block',
    lead: 'BlockNote defaults plus three Markora-specific commands.',
    h: ['Command', 'Description', 'Origin'] as [string, string, string],
  },
  install: {
    eyebrow: 'Install',
    title: "30 seconds and you're in",
    lead: 'Works on any JetBrains IDE 2024.2+ with JCEF enabled (default).',
  },
  faq: { eyebrow: 'FAQ', title: 'Frequently asked' },
  cta: {
    title: 'Bring the joy back to Markdown.',
    lead: 'Open source · free · updated weekly.',
    primary: 'Install from Marketplace',
    secondary: '★ GitHub Star',
  },
  foot: ['GitHub', 'Issues', 'Changelog', 'License'] as [string, string, string, string],
};

export type Dict = typeof en;
```

- [ ] **Step 7.3: lib/i18n/types.ts 작성**

```ts
export type { Dict } from './en';
```

- [ ] **Step 7.4: lib/i18n/ko.ts 작성**

`docs/design/markora-data.jsx`의 `T.ko` 객체(라인 29-45)를 옮기되, `Dict` 타입에 맞춰 동일 구조 유지:

```ts
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
  cta: {
    title: '마크다운 편집을 다시 즐겁게.',
    lead: '오픈소스 · 무료 · 매주 업데이트.',
    primary: 'Marketplace에서 설치',
    secondary: '★ GitHub Star',
  },
  foot: ['GitHub', '이슈', 'Changelog', '라이선스'],
};
```

- [ ] **Step 7.5: tsc 통과 확인**

```bash
npm run check
```

Expected: en/ko 타입 정합성 확인 — 한쪽 키만 누락되거나 타입 다르면 에러. 통과해야 다음 단계로.

- [ ] **Step 7.6: commit**

```bash
git add lib/i18n/
git commit -m "feat: add i18n dictionaries (en, ko) with type safety"
```

---

## Task 8: lib/icons.tsx

**Files:**
- Create: `lib/icons.tsx`

**Source:** `docs/design/markora-data.jsx`의 `Icon` 컴포넌트(라인 65-82).

- [ ] **Step 8.1: lib/icons.tsx 작성**

```tsx
import type { CSSProperties } from 'react';

type IconName =
  | 'eye' | 'slash' | 'moon' | 'sun' | 'save' | 'image'
  | 'git' | 'download' | 'link' | 'star' | 'chev' | 'arrow';

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const style: CSSProperties = {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const paths: Record<IconName, JSX.Element> = {
    eye: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    slash: <path d="m14 4-4 16" />,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),
    git: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
        <path d="M6 8.5v7M8.5 6h6.5a3 3 0 0 1 3 3v.5" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    chev: <polyline points="6 9 12 15 18 9" />,
    arrow: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" style={style}>
      {paths[name]}
    </svg>
  );
}

export type { IconName };
```

- [ ] **Step 8.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 8.3: commit**

```bash
git add lib/icons.tsx
git commit -m "feat: port Icon component from design"
```

---

## Task 9: app/layout.tsx

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 9.1: app/layout.tsx 작성**

```tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/lib/site-config';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ko: '/ko/',
      'x-default': '/',
    },
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: ['en', 'ko'],
};

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteConfig.name,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'JetBrains IDE 2024.2+',
  url: siteConfig.url,
  description: siteConfig.description,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pretendard.variable} suppressHydrationWarning>
      <head>
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <Script
          id="ld-software"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        {siteConfig.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${siteConfig.gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 9.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 9.3: commit**

```bash
git add app/layout.tsx
git commit -m "feat: root layout with theme, font, metadata, JSON-LD, GA placeholder"
```

---

## Task 10: 클라이언트 인터랙션 컴포넌트

**Files:**
- Create: `components/theme-toggle.tsx`
- Create: `components/lang-toggle.tsx`
- Create: `components/auto-lang-redirect.tsx`

- [ ] **Step 10.1: components 디렉토리 생성**

```bash
mkdir -p components
```

- [ ] **Step 10.2: components/theme-toggle.tsx 작성**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Icon } from '@/lib/icons';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button className="mk-icon-btn" aria-label="theme" />;
  }

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      className="mk-icon-btn"
      title="theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={15} />
    </button>
  );
}
```

- [ ] **Step 10.3: components/lang-toggle.tsx 작성**

```tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LangToggle() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const isKo = pathname.startsWith('/ko');
  const target = isKo ? '/' : '/ko/';

  function go(to: 'en' | 'ko') {
    const path = to === 'ko' ? '/ko/' : '/';
    if (typeof window !== 'undefined') {
      localStorage.setItem('mk-lang', to);
    }
    router.push(path);
  }

  return (
    <div className="mk-pill-toggle">
      <button className={!isKo ? 'active' : ''} onClick={() => go('en')}>
        EN
      </button>
      <button className={isKo ? 'active' : ''} onClick={() => go('ko')}>
        KO
      </button>
    </div>
  );
}
```

Note: `target` 변수는 디버깅 편의용으로 두지만 사용 안 함 — 컴파일러가 unused 경고를 낼 수 있으므로 제거 가능. 다만 명시적 정의로 의도가 드러나니 유지.

수정: 위 코드에서 `target` 미사용 변수 제거하고 단순화:

```tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LangToggle() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const isKo = pathname.startsWith('/ko');

  function go(to: 'en' | 'ko') {
    const path = to === 'ko' ? '/ko/' : '/';
    if (typeof window !== 'undefined') {
      localStorage.setItem('mk-lang', to);
    }
    router.push(path);
  }

  return (
    <div className="mk-pill-toggle">
      <button className={!isKo ? 'active' : ''} onClick={() => go('en')}>
        EN
      </button>
      <button className={isKo ? 'active' : ''} onClick={() => go('ko')}>
        KO
      </button>
    </div>
  );
}
```

- [ ] **Step 10.4: components/auto-lang-redirect.tsx 작성**

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AutoLangRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('mk-lang')) return;
    if (navigator.language.toLowerCase().startsWith('ko')) {
      router.replace('/ko/');
    }
  }, [router]);
  return null;
}
```

- [ ] **Step 10.5: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 10.6: commit**

```bash
git add components/theme-toggle.tsx components/lang-toggle.tsx components/auto-lang-redirect.tsx
git commit -m "feat: theme/lang toggle and auto-lang-redirect components"
```

---

## Task 11: components/nav.tsx

**Files:**
- Create: `components/nav.tsx`

**Source:** `docs/design/markora-hero.jsx`의 `Nav` 함수(라인 4-34).

**Variation:** 디자인 원본은 `useTweaks` 훅으로 lang/theme를 prop으로 받지만, 우리는 `LangToggle` + `ThemeToggle`을 자식 컴포넌트로 분리.

- [ ] **Step 11.1: components/nav.tsx 작성**

```tsx
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
```

- [ ] **Step 11.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 11.3: commit**

```bash
git add components/nav.tsx
git commit -m "feat: nav component with lang/theme toggles"
```

---

## Task 12: components/ide-mock.tsx

**Files:**
- Create: `components/ide-mock.tsx`

**Source:** `docs/design/markora-hero.jsx`의 `IDEMock` 함수(라인 36-138). 거의 그대로 옮김 — 인라인 텍스트의 `lang === 'ko' ? ... : ...` 분기 그대로 유지.

**Variation:** TypeScript prop 타입 추가, JSX 그대로.

- [ ] **Step 12.1: components/ide-mock.tsx 작성**

```tsx
type Lang = 'en' | 'ko';

export function IDEMock({ lang }: { lang: Lang }) {
  const docTitle = lang === 'ko' ? '스프린트 23 — 킥오프' : 'Sprint 23 — kickoff';
  const meta = lang === 'ko' ? '수정: 방금 전 · 4명' : 'Edited just now · 4 authors';

  return (
    <div className="mk-ide">
      <div className="mk-ide-titlebar">
        <div className="mk-ide-dots">
          <div className="mk-ide-dot" style={{ background: '#ff5f57' }} />
          <div className="mk-ide-dot" style={{ background: '#febc2e' }} />
          <div className="mk-ide-dot" style={{ background: '#28c840' }} />
        </div>
        <div className="mk-ide-title">markora — IntelliJ IDEA 2024.2</div>
        <div style={{ width: 56 }} />
      </div>
      <div className="mk-ide-tabbar">
        <div className="mk-ide-tab">README.md</div>
        <div className="mk-ide-tab active">
          <span style={{ color: 'var(--mk-accent)', marginRight: 6 }}>●</span> NOTES.md
        </div>
        <div className="mk-ide-tab">build.gradle.kts</div>
      </div>
      <div className="mk-ide-toolbar">
        <div className="mk-ide-tool active">Markora</div>
        <div className="mk-ide-tool">Source</div>
        <div className="mk-ide-tool">Preview</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="mk-ide-saved">●</span> {lang === 'ko' ? '자동 저장됨' : 'Auto-saved'}
        </div>
      </div>
      <div className="mk-ide-body">
        <div className="mk-ide-sidebar">
          <div className="row dim"><span className="caret">▾</span> markora</div>
          <div className="row indent"><span className="caret">▸</span> src</div>
          <div className="row indent"><span className="caret">▾</span> docs</div>
          <div className="row indent file">README.md</div>
          <div className="row active file">NOTES.md</div>
          <div className="row indent file">spec.md</div>
          <div className="row indent file">changelog.md</div>
          <div className="row indent" style={{ paddingLeft: 24 }}>build.gradle.kts</div>
          <div className="row indent" style={{ paddingLeft: 24 }}>.gitignore</div>
        </div>
        <div className="mk-ide-editor">
          <h1 className="doc-h1">{docTitle}</h1>
          <div className="doc-meta">{meta}</div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <p className="doc-p">
              {lang === 'ko' ? '이번 스프린트의 목표·담당자·리스크. 인라인 수식은 ' : 'Goals, owners, risks for this sprint. Inline math like '}
              <span className="doc-math-inline">E = mc²</span>
              {lang === 'ko' ? '처럼 그대로 렌더링됩니다.' : ' renders as you type.'}
            </p>
          </div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <h2 className="doc-h2">{lang === 'ko' ? '할 일' : 'To do'}</h2>
          </div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <div style={{ flex: 1 }}>
              <div className="doc-li done"><div className="checkbox checked" /><span className="doc-li-text">{lang === 'ko' ? 'BlockNote 0.18로 마이그레이션' : 'Migrate to BlockNote 0.18'}</span></div>
              <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === 'ko' ? 'JCEF 메모리 누수 수정' : 'Fix JCEF memory leak'}</span></div>
              <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === 'ko' ? '이미지 붙여넣기 경로 처리' : 'Handle clipboard image paths'}</span></div>
            </div>
          </div>

          <div className="doc-block typing">
            <span className="doc-handle">⋮⋮</span>
            <p className="doc-p">
              <span className="doc-slash-trigger">/</span>
              <span className="doc-cursor" />
            </p>
            <div className="doc-slash-menu">
              <div className="doc-slash-search">/</div>
              <div className="doc-slash-header">{lang === 'ko' ? 'Markora 전용' : 'Markora only'}</div>
              <div className="doc-slash-item highlighted">
                <div className="icon">∑</div>
                <div className="text"><div className="t">{lang === 'ko' ? '수식 블록' : 'Math block'}</div><div className="s">{lang === 'ko' ? 'LaTeX, KaTeX 렌더' : 'LaTeX, rendered with KaTeX'}</div></div>
                <div className="key">/math</div>
              </div>
              <div className="doc-slash-item">
                <div className="icon">$</div>
                <div className="text"><div className="t">{lang === 'ko' ? '인라인 수식' : 'Inline equation'}</div><div className="s">$...$</div></div>
                <div className="key">/eq</div>
              </div>
              <div className="doc-slash-item">
                <div className="icon">◆</div>
                <div className="text"><div className="t">{lang === 'ko' ? 'Mermaid 다이어그램' : 'Mermaid diagram'}</div><div className="s">{lang === 'ko' ? '플로우, 시퀀스, 간트' : 'Flow, sequence, gantt'}</div></div>
                <div className="key">/mer</div>
              </div>
              <div className="doc-slash-divider" />
              <div className="doc-slash-header">{lang === 'ko' ? '기본 블록' : 'Defaults'}</div>
              <div className="doc-slash-item"><div className="icon">H₁</div><div className="text"><div className="t">{lang === 'ko' ? '제목 1' : 'Heading 1'}</div></div><div className="key">/h1</div></div>
              <div className="doc-slash-item"><div className="icon">≡</div><div className="text"><div className="t">{lang === 'ko' ? '표' : 'Table'}</div></div><div className="key">/table</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 12.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 12.3: commit**

```bash
git add components/ide-mock.tsx
git commit -m "feat: port IDE mock component from design"
```

---

## Task 13: components/hero.tsx

**Files:**
- Create: `components/hero.tsx`

**Source:** `docs/design/markora-hero.jsx`의 `Hero` 함수(라인 140-173).

**Variation:** Marketplace 버튼은 `siteConfig.marketplace`에 따라 disabled 처리.

- [ ] **Step 13.1: components/hero.tsx 작성**

```tsx
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
```

- [ ] **Step 13.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 13.3: commit**

```bash
git add components/hero.tsx
git commit -m "feat: hero section with CTA and IDE mock"
```

---

## Task 14: components/features.tsx

**Files:**
- Create: `components/features.tsx`

**Source:** `docs/design/markora-body.jsx`의 `FEATS` + `Features` 함수(라인 4-35).

- [ ] **Step 14.1: components/features.tsx 작성**

```tsx
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
```

- [ ] **Step 14.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 14.3: commit**

```bash
git add components/features.tsx
git commit -m "feat: features section"
```

---

## Task 15: components/demos/

**Files:**
- Create: `components/demos/math-demo.tsx`
- Create: `components/demos/mermaid-demo.tsx`
- Create: `components/demos/index.tsx`

**Source:** `docs/design/markora-body.jsx`의 `MathDemo`(라인 37-68), `MermaidDemo`(라인 70-113), `Demos`(라인 115-131).

- [ ] **Step 15.1: components/demos 디렉토리 생성**

```bash
mkdir -p components/demos
```

- [ ] **Step 15.2: components/demos/math-demo.tsx 작성**

```tsx
type Lang = 'en' | 'ko';

export function MathDemo({ lang }: { lang: Lang }) {
  return (
    <div className="mk-demo-card">
      <div className="mk-demo-head">
        <div className="label">{lang === 'ko' ? 'LaTeX 수식 — KaTeX 렌더링' : 'LaTeX math — rendered with KaTeX'}</div>
        <div className="tag">∑ /math</div>
      </div>
      <div className="mk-demo-split">
        <div className="mk-demo-pane left">
          <div className="pane-label">{lang === 'ko' ? '마크다운 입력' : 'Source'}</div>
          <pre>
            <span className="comment">{'```math'}</span>
            {'\n'}
            {'\\int_0^\\infty e^{-x²} \\,dx'}
            {'\n'}
            {'= \\frac{\\sqrt\\pi}{2}'}
            {'\n'}
            <span className="comment">{'```'}</span>
          </pre>
        </div>
        <div className="mk-demo-pane">
          <div className="pane-label">{lang === 'ko' ? 'Markora 렌더링' : 'Markora preview'}</div>
          <div className="katex-like">
            <span className="int">∫</span>
            <span className="int-bounds"><span>∞</span><span>0</span></span>
            <em>e</em><span className="sup">−<em>x</em>²</span>
            <span className="dx">d<em>x</em></span>
            <span className="eq">=</span>
            <span className="frac">
              <span className="num"><span className="sqrt">π</span></span>
              <span className="den">2</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 15.3: components/demos/mermaid-demo.tsx 작성**

```tsx
type Lang = 'en' | 'ko';

export function MermaidDemo({ lang }: { lang: Lang }) {
  return (
    <div className="mk-demo-card">
      <div className="mk-demo-head">
        <div className="label">{lang === 'ko' ? 'Mermaid 다이어그램' : 'Mermaid diagrams'}</div>
        <div className="tag">◆ /mermaid</div>
      </div>
      <div className="mk-demo-split">
        <div className="mk-demo-pane left">
          <div className="pane-label">{lang === 'ko' ? '마크다운 입력' : 'Source'}</div>
          <pre>
            <span className="comment">{'```mermaid'}</span>
            {'\n'}
            <span className="kw">graph</span> LR{'\n'}
            {'  A[Idea] --> B(Draft)\n'}
            {'  B --> C{Ship?}\n'}
            {'  C -->|Yes| D[v1.0]\n'}
            {'  C -->|No| B\n'}
            <span className="comment">{'```'}</span>
          </pre>
        </div>
        <div className="mk-demo-pane">
          <div className="pane-label">{lang === 'ko' ? 'Markora 렌더링' : 'Markora preview'}</div>
          <svg className="mermaid-svg" viewBox="0 0 380 220">
            <defs>
              <marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" fill="var(--rabbit-color-text-secondary)" />
              </marker>
            </defs>
            <g fontFamily="Pretendard, sans-serif" fontSize="13">
              <rect x="14" y="90" width="64" height="40" rx="6" fill="var(--mk-accent-subtle)" stroke="var(--mk-accent)" strokeWidth="1.5" />
              <text x="46" y="115" textAnchor="middle" fill="var(--mk-accent-text)" fontWeight="600">Idea</text>
              <rect x="124" y="90" width="74" height="40" rx="20" fill="var(--rabbit-color-bg-muted)" stroke="var(--rabbit-color-border-strong)" strokeWidth="1.5" />
              <text x="161" y="115" textAnchor="middle" fill="var(--rabbit-color-text)">Draft</text>
              <polygon points="244,110 274,80 304,110 274,140" fill="var(--rabbit-color-bg-muted)" stroke="var(--rabbit-color-text-secondary)" strokeWidth="1.5" />
              <text x="274" y="115" textAnchor="middle" fontSize="11" fill="var(--rabbit-color-text)">Ship?</text>
              <rect x="320" y="40" width="50" height="40" rx="6" fill="var(--mk-accent-subtle)" stroke="var(--mk-accent)" strokeWidth="1.5" />
              <text x="345" y="65" textAnchor="middle" fontWeight="600" fill="var(--mk-accent-text)">v1.0</text>
              <path d="M78 110 L120 110" stroke="var(--rabbit-color-text-secondary)" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" />
              <path d="M198 110 L241 110" stroke="var(--rabbit-color-text-secondary)" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" />
              <path d="M299 95 L324 75" stroke="var(--rabbit-color-text-secondary)" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" />
              <path d="M274 142 Q 200 200 161 134" stroke="var(--rabbit-color-text-secondary)" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" />
              <text x="313" y="80" fontSize="10" fill="var(--rabbit-color-text-muted)">Yes</text>
              <text x="200" y="190" fontSize="10" fill="var(--rabbit-color-text-muted)">No</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 15.4: components/demos/index.tsx 작성**

```tsx
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
```

- [ ] **Step 15.5: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 15.6: commit**

```bash
git add components/demos/
git commit -m "feat: math + mermaid demo cards"
```

---

## Task 16: components/slash.tsx

**Files:**
- Create: `components/slash.tsx`

**Source:** `docs/design/markora-foot.jsx`의 `SLASH_ROWS` + `Slash`(라인 4-47).

- [ ] **Step 16.1: components/slash.tsx 작성**

```tsx
import type { Dict } from '@/lib/i18n/types';

type Row = { cmd: string; desc: string; group: 'default' | 'markora' };

function getRows(lang: 'en' | 'ko'): Row[] {
  return [
    { cmd: '/h1, /h2, /h3', desc: lang === 'ko' ? '제목 1~3 단계' : 'Heading levels 1–3', group: 'default' },
    { cmd: '/list, /numbered, /check', desc: lang === 'ko' ? '글머리·번호·체크박스' : 'Bullet, numbered, or checklist', group: 'default' },
    { cmd: '/code', desc: lang === 'ko' ? '코드 블록 (언어 자동 인식)' : 'Code block — language-aware', group: 'default' },
    { cmd: '/table', desc: lang === 'ko' ? '표 삽입 — 행/열 자유 편집' : 'Insert a table — add/remove rows freely', group: 'default' },
    { cmd: '/image', desc: lang === 'ko' ? '이미지 업로드 또는 클립보드 붙여넣기' : 'Upload or paste from clipboard', group: 'default' },
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
```

- [ ] **Step 16.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 16.3: commit**

```bash
git add components/slash.tsx
git commit -m "feat: slash commands section"
```

---

## Task 17: components/install.tsx

**Files:**
- Create: `components/install.tsx`

**Source:** `docs/design/markora-foot.jsx`의 `Install` 함수(라인 49-79).

- [ ] **Step 17.1: components/install.tsx 작성**

```tsx
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
```

- [ ] **Step 17.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 17.3: commit**

```bash
git add components/install.tsx
git commit -m "feat: install steps section"
```

---

## Task 18: components/faq.tsx

**Files:**
- Create: `components/faq.tsx`

**Source:** `docs/design/markora-foot.jsx`의 `FAQS` + `FAQ`(라인 81-119).

- [ ] **Step 18.1: components/faq.tsx 작성**

```tsx
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
      { q: '이미지는 어디에 저장되나요?', a: <>드래그·드롭이나 클립보드 붙여넣기를 하면 같은 폴더의 <code>images/</code> 하위에 자동으로 정리됩니다. 경로는 상대 경로로 삽입돼서 Git 리포 그대로 커밋해도 안전해요.</> },
      { q: '오픈소스인가요? 기여할 수 있나요?', a: <>네, MIT 라이선스 오픈소스입니다. <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub 리포지토리</a>에서 이슈와 PR을 환영합니다.</> },
    ];
  }
  return [
    { q: 'Which JetBrains IDEs are supported?', a: <>IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, PhpStorm, Rider, CLion — anything <strong>2024.2 or newer</strong>. JCEF must be enabled (it is, by default).</> },
    { q: 'Does it conflict with the built-in Markdown plugin?', a: 'No. Markora registers as an additional editor tab, so when you open a .md file you can freely switch between Markora / Source / Preview.' },
    { q: 'How are changes saved?', a: 'Saves are debounced as you type (default 1s). Output is standard CommonMark + GFM, so other editors open the file unchanged.' },
    { q: 'Where do pasted images go?', a: <>Drops and clipboard pastes are auto-organized under <code>images/</code> next to your file. The path is inserted as a relative URL, safe to commit to Git.</> },
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
```

- [ ] **Step 18.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 18.3: commit**

```bash
git add components/faq.tsx
git commit -m "feat: faq accordion"
```

---

## Task 19: components/final-cta.tsx

**Files:**
- Create: `components/final-cta.tsx`

**Source:** `docs/design/markora-foot.jsx`의 `FinalCTA`(라인 121-140).

**Variation:** Marketplace 버튼 disabled 처리.

- [ ] **Step 19.1: components/final-cta.tsx 작성**

```tsx
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
```

- [ ] **Step 19.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 19.3: commit**

```bash
git add components/final-cta.tsx
git commit -m "feat: final CTA section"
```

---

## Task 20: components/footer.tsx

**Files:**
- Create: `components/footer.tsx`

**Source:** `docs/design/markora-foot.jsx`의 `Footer`(라인 142-159).

- [ ] **Step 20.1: components/footer.tsx 작성**

```tsx
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Footer({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <footer className="mk-footer">
      <div className="mk-container mk-footer-inner">
        <div className="mk-logo">
          <div className="mk-logo-mark">M</div>
          <span>Markora</span>
        </div>
        <div className="mk-footer-links">
          {t.foot.map((x) => (
            <a key={x} href={siteConfig.github} target="_blank" rel="noreferrer">
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
```

- [ ] **Step 20.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 20.3: commit**

```bash
git add components/footer.tsx
git commit -m "feat: footer section"
```

---

## Task 21: components/landing.tsx (컴포지션)

**Files:**
- Create: `components/landing.tsx`

- [ ] **Step 21.1: components/landing.tsx 작성**

```tsx
import type { Dict } from '@/lib/i18n/types';
import { Nav } from './nav';
import { Hero } from './hero';
import { Features } from './features';
import { Demos } from './demos';
import { Slash } from './slash';
import { Install } from './install';
import { FAQ } from './faq';
import { FinalCTA } from './final-cta';
import { Footer } from './footer';

export function Landing({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <>
      <Nav t={t} />
      <Hero t={t} lang={lang} />
      <Features t={t} lang={lang} />
      <Demos t={t} lang={lang} />
      <Slash t={t} lang={lang} />
      <Install t={t} lang={lang} />
      <FAQ t={t} lang={lang} />
      <FinalCTA t={t} />
      <Footer t={t} lang={lang} />
    </>
  );
}
```

- [ ] **Step 21.2: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 21.3: commit**

```bash
git add components/landing.tsx
git commit -m "feat: landing page composition"
```

---

## Task 22: 페이지 진입점 (en + ko)

**Files:**
- Create: `app/page.tsx`
- Create: `app/ko/page.tsx`

- [ ] **Step 22.1: app/page.tsx 작성 (en, 기본)**

```tsx
import type { Metadata } from 'next';
import { en } from '@/lib/i18n/en';
import { Landing } from '@/components/landing';
import { AutoLangRedirect } from '@/components/auto-lang-redirect';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
  description: en.hero.lead,
  openGraph: {
    locale: 'en_US',
    title: `${siteConfig.name} — WYSIWYG Markdown for JetBrains IDEs`,
    description: en.hero.lead,
  },
};

export default function Page() {
  return (
    <>
      <AutoLangRedirect />
      <Landing t={en} lang="en" />
    </>
  );
}
```

- [ ] **Step 22.2: app/ko 디렉토리 생성**

```bash
mkdir -p app/ko
```

- [ ] **Step 22.3: app/ko/page.tsx 작성**

```tsx
'use client';

import { useEffect } from 'react';
import { ko } from '@/lib/i18n/ko';
import { Landing } from '@/components/landing';

export default function Page() {
  useEffect(() => {
    document.documentElement.lang = 'ko';
    return () => {
      document.documentElement.lang = 'en';
    };
  }, []);

  return <Landing t={ko} lang="ko" />;
}
```

Note: ko 페이지는 클라이언트에서 `<html lang>`을 ko로 갱신. SEO는 `app/ko/page.tsx`의 `generateMetadata`에서 hreflang 처리. 단, `'use client'` 파일에서는 `Metadata` export가 작동하지 않으므로 별도 메타데이터 파일 필요.

- [ ] **Step 22.4: app/ko/layout.tsx 작성 (메타데이터 분리)**

서버 컴포넌트로 메타데이터를 export하고 클라이언트 페이지를 children으로 받음:

```tsx
import type { Metadata } from 'next';
import { ko } from '@/lib/i18n/ko';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — JetBrains IDE용 WYSIWYG 마크다운`,
  description: ko.hero.lead,
  openGraph: {
    locale: 'ko_KR',
    title: `${siteConfig.name} — JetBrains IDE용 WYSIWYG 마크다운`,
    description: ko.hero.lead,
  },
  alternates: {
    canonical: '/ko/',
    languages: {
      en: '/',
      ko: '/ko/',
      'x-default': '/',
    },
  },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 22.5: tsc 통과 확인**

```bash
npm run check
```

- [ ] **Step 22.6: 첫 번째 빌드 시도**

```bash
npm run build
```

Expected:
- 빌드 성공
- `out/index.html`, `out/ko/index.html` 생성
- `out/_next/static/...` 자산 생성

빌드 에러가 발생하면:
- `Cannot find module ...` → import 경로 재확인 (`@/*` alias)
- `Type ...` → 컴포넌트 prop 타입 불일치 확인
- 폰트 관련 에러 → Step 4의 woff2 파일 존재 확인

- [ ] **Step 22.7: commit**

```bash
git add app/page.tsx app/ko/
git commit -m "feat: en (root) and ko page entries with metadata"
```

---

## Task 23: SEO 보조 (robots, sitemap)

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Step 23.1: app/robots.ts 작성**

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

`export const dynamic = 'force-static'` is required by Next.js 16 with `output: 'export'`.

- [ ] **Step 23.2: app/sitemap.ts 작성**

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteConfig.url}/`,
          ko: `${siteConfig.url}/ko/`,
        },
      },
    },
    {
      url: `${siteConfig.url}/ko/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
```

- [ ] **Step 23.3: 빌드 후 sitemap/robots 확인**

```bash
npm run build
ls out/sitemap.xml out/robots.txt
cat out/sitemap.xml
```

Expected:
- 두 파일 생성됨
- sitemap.xml에 `/`와 `/ko/` 모두 포함
- hreflang `alternates` 출력

- [ ] **Step 23.4: commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat: robots.txt and sitemap with hreflang"
```

---

## Task 24: Netlify 설정 + placeholder 자산

**Files:**
- Create: `netlify.toml`
- Create: `public/og.png` (placeholder)
- Create: `public/favicon.svg` (placeholder)
- Create: `public/favicon.ico` (placeholder)

- [ ] **Step 24.1: netlify.toml 작성**

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

- [ ] **Step 24.2: placeholder favicon.svg 작성**

디자인의 "M" 마크 단순 버전:

```bash
cat > public/favicon.svg << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#fff">M</text>
</svg>
EOF
```

- [ ] **Step 24.3: favicon.ico 변환 (선택)**

ImageMagick이 있으면 svg → ico 변환. 없으면 favicon.svg만 두고 ico는 후속 작업으로 미룸:

```bash
# ImageMagick 사용 (있을 경우)
magick -background none -density 384 public/favicon.svg -define icon:auto-resize=16,32,48 public/favicon.ico 2>/dev/null || echo "skip ico (ImageMagick 없음, svg만 사용)"
```

대안: Next.js App Router는 `app/icon.svg` 또는 `app/favicon.ico`를 자동 인식. svg만 있으면 충분.

- [ ] **Step 24.4: og.png placeholder**

실제 OG 이미지는 디자인 hero 캡처로 별도 작업. 일단 빈 placeholder를 두지 않고, `lib/site-config.ts`의 `ogImage`는 그대로 `/og.png` 경로 유지 (404되면 OG 카드 이미지 미표시 — 출시 전까지 허용).

스킵하고 메모만 남김:

```bash
echo "TODO: design hero capture (1200x630) → public/og.png" >> CLAUDE.md
```

수정 — CLAUDE.md에 후속 작업 섹션이 이미 없으므로 그냥 spec/plan에 명시되어 있으니 스킵. 별도 변경 없음.

- [ ] **Step 24.5: tsc + 빌드 확인**

```bash
npm run check
npm run build
ls out/favicon.svg
```

- [ ] **Step 24.6: commit**

```bash
git add netlify.toml public/favicon.svg
git commit -m "feat: netlify config and placeholder favicon"
```

---

## Task 25: 종합 검증

**Files:** 변경 없음. 검증만 수행.

- [ ] **Step 25.1: 깨끗한 빌드**

```bash
rm -rf .next out
npm run check
npm run build
```

Expected: 에러 0개, `out/` 생성.

- [ ] **Step 25.2: 정적 산출물 검증**

```bash
ls out/
ls out/ko/
test -f out/index.html && echo "en OK"
test -f out/ko/index.html && echo "ko OK"
test -f out/sitemap.xml && echo "sitemap OK"
test -f out/robots.txt && echo "robots OK"
```

Expected: 모두 OK 출력.

- [ ] **Step 25.3: HTML 점검 — `<html lang>`**

```bash
grep -o '<html[^>]*>' out/index.html | head -1
grep -o '<html[^>]*>' out/ko/index.html | head -1
```

Expected: 두 파일 모두 `<html lang="en" ...>` (ko는 클라이언트에서 갱신되므로 정적 HTML은 en).

- [ ] **Step 25.4: HTML 점검 — hreflang**

```bash
grep -o 'rel="alternate"[^>]*' out/index.html
```

Expected: `hreflang="en"`, `hreflang="ko"`, `hreflang="x-default"` 세 개 모두 출력.

- [ ] **Step 25.5: HTML 점검 — JSON-LD**

```bash
grep -A 2 'application/ld+json' out/index.html | head -10
```

Expected: `WebSite` 스키마와 `SoftwareApplication` 스키마 둘 다 인라인.

- [ ] **Step 25.6: 로컬 dev 서버 시각 검증**

```bash
npm run dev
```

브라우저에서 검증 (체크 후 dev 종료):

- [ ] http://localhost:3000/ → 영어 hero, IDE 목업, 모든 섹션 정상 렌더
- [ ] 헤더 KO 클릭 → /ko/로 이동, 한국어 카피, IDE 목업 한국어 텍스트
- [ ] 헤더 EN 클릭 → /로 돌아옴, localStorage['mk-lang'] = 'en' 확인 (DevTools)
- [ ] 헤더 테마 토글 → 라이트↔다크 즉시 전환, accent 색 변경, FOUC 없음
- [ ] OS prefers-color-scheme 다크 사용자가 처음 진입 → 다크로 시작 (DevTools → Rendering → Emulate prefers-color-scheme)
- [ ] FAQ 클릭 → 아코디언 열고 닫힘
- [ ] Marketplace 버튼 disabled + "Coming soon" 배지 표시
- [ ] GitHub 버튼 클릭 → https://github.com/kenshin579/markora 새 탭
- [ ] 모바일 viewport (375px) → 깨지지 않음, 헤더 / hero / 모든 섹션 반응형
- [ ] navigator.language 시뮬: localStorage 비우고 Chrome DevTools → Sensors → Language를 ko-KR로 설정 후 / 진입 → /ko/로 자동 이동
- [ ] 위 후 EN 토글 → /로 이동, localStorage 기록, 새로고침 후 자동 redirect 안 됨

- [ ] **Step 25.7: Lighthouse 검증 (선택)**

Chrome DevTools → Lighthouse → Mobile + 모든 카테고리:
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

미달 시 spec §11 위험으로 회귀 — 별도 task로 후속 fix.

- [ ] **Step 25.8: 최종 commit (있으면)**

검증 중 발견한 마이너 수정이 있다면 commit. 없으면 스킵.

---

## Task 26: spec/plan 문서 commit + PR 준비

**Files:** spec/plan 문서를 같은 PR에 묶음.

- [ ] **Step 26.1: spec/plan 문서 추가**

```bash
git add docs/superpowers/specs/2026-05-05-markora-landing-design.md
git add docs/superpowers/plans/2026-05-05-markora-landing.md
git commit -m "docs: add design spec and implementation plan"
```

- [ ] **Step 26.2: 브랜치 push**

```bash
git push -u origin feat/landing-page-implementation
```

- [ ] **Step 26.3: PR 생성**

```bash
gh pr create --title "feat: Markora landing page" --body "$(cat <<'EOF'
## Summary
- Markora 플러그인 홍보용 정적 랜딩 페이지 구축
- Next.js 16 + TypeScript + `output: 'export'` (Netlify 배포)
- 영어(`/`) 기본, 한국어(`/ko/`) 라우트 분리
- 디자인 파일(`docs/design/`)을 1:1 포팅, accent blue 1개 고정
- 한국어 OS 자동 감지 시 `/ko/`로 클라이언트 사이드 redirect (`localStorage` 1회성)
- Marketplace 버튼은 출시 전이라 "Coming soon" 비활성

## Test plan
- [x] `npm run check` 통과
- [x] `npm run build` 통과 → `out/index.html`, `out/ko/index.html` 생성
- [x] hreflang en/ko/x-default 메타 출력
- [x] sitemap.xml에 두 라우트 포함
- [x] JSON-LD WebSite + SoftwareApplication 스키마 출력
- [x] 라이트/다크 토글 (FOUC 없음)
- [x] EN/KO 토글 라우트 전환 + localStorage 기록
- [x] AutoLangRedirect: 한국어 OS에서 / 진입 시 /ko/로 이동
- [x] FAQ 아코디언 동작
- [x] 모바일 375px 반응형

## 후속 작업
- og.png (디자인 hero 캡처 1200×630)
- favicon.ico (svg → ico 변환)
- Marketplace URL 주입 (출시 후 `lib/site-config.ts` 업데이트)
- GA 속성 ID (Netlify 환경변수 `NEXT_PUBLIC_GA_ID`)

## Spec
`docs/superpowers/specs/2026-05-05-markora-landing-design.md`

## Plan
`docs/superpowers/plans/2026-05-05-markora-landing.md`
EOF
)" --reviewer kenshin579
```

---

## Self-Review 결과 (작성 완료 후 점검)

**1. Spec 커버리지 점검:**

| Spec 섹션 | 구현 task |
|---|---|
| §3 디렉토리 구조 | Task 1, 3, 5, 7-22 (모든 파일 생성) |
| §4 라우팅 / 다국어 | Task 22 (페이지), Task 10 (AutoLangRedirect/LangToggle) |
| §5 컴포넌트 / 데이터 흐름 | Task 7 (i18n), Task 21 (landing 컴포지션), Task 11-20 (각 섹션) |
| §6 디자인 토큰 / 테마 | Task 3 (CSS 복사), Task 5 (globals.css), Task 9 (ThemeProvider) |
| §7 빌드 / 배포 / SEO | Task 1 (next.config), Task 9 (메타데이터), Task 23 (robots/sitemap), Task 24 (netlify) |
| §8 CTA 출시 전 상태 | Task 13 (Hero), Task 19 (FinalCTA) — disabled 분기 처리 |
| §9 검증 | Task 25 |
| §10 후속 작업 | PR description에 명시 |
| §11 위험 / 가정 | Task 25 검증으로 일부 해소, 나머지는 후속 |

→ 모든 spec 섹션이 task로 매핑됨. 누락 없음.

**2. Placeholder 스캔:** "TBD"/"TODO"/"implement later" 없음. 실제 코드와 명령어가 모든 step에 포함됨. "design 파일 X의 Y 함수를 옮김" 패턴은 정확한 소스 위치를 가리키므로 실행 가능한 명세.

**3. 타입 일관성:**
- `Dict` 타입은 `lib/i18n/en.ts`에서 export, `lib/i18n/types.ts`가 re-export. 모든 컴포넌트가 동일한 type alias 사용.
- `IconName` 타입은 `lib/icons.tsx`에서 export, `Features`가 import해서 사용.
- `'en' | 'ko'` lang 리터럴 union이 모든 컴포넌트에서 동일하게 사용됨.
- 모든 컴포넌트의 props 시그니처가 `Landing` 컴포지션에서 호출되는 모습과 일치 (Task 21).

문제 없음.

---

## 사용 안 하는 디자인 파일

이 plan에서 다음 디자인 파일은 사용하지 않음:
- `docs/design/Markora Landing.html` — Babel standalone 진입점, Next.js로 대체됨
- `docs/design/markora-app.jsx` — useTweaks/TweaksPanel 호스팅, 우리는 사용 안 함
- `docs/design/markora-bundle.jsx` — 분리된 jsx 파일들의 단일 번들 (중복)
- `docs/design/tweaks-panel.jsx` — 디자인 프로토타이핑 도구, 운영 미사용
- `docs/design/uploads/` — 디자이너 업로드 자료 (있을 경우)

이들은 git에서 삭제하지 않고 디자인 참고용으로 남겨둠 (`docs/design/`는 staticexport에 포함 안 됨, public/이 아님).
