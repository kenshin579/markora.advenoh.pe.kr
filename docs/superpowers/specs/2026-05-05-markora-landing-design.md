# Markora Landing Site — Design Spec

- **Date:** 2026-05-05
- **Repo:** `markora.advenoh.pe.kr`
- **Domain:** `markora.advenoh.pe.kr`
- **목적:** Markora JetBrains 플러그인 홍보용 단일 랜딩 페이지 사이트 구축

---

## 1. 개요

### 1.1 배경

`markora/` 플러그인은 JetBrains IDE용 WYSIWYG 마크다운 에디터로, 출시를 앞두고 있다. JetBrains Marketplace 클릭 유입과 GitHub Star 확보를 위한 마케팅 랜딩 페이지가 필요하다.

`docs/design/`에 React 18 + Babel standalone 기반의 정적 프로토타입 디자인 파일이 이미 작성되어 있다 (`markora-app.jsx`, `markora-hero.jsx`, `markora-body.jsx`, `markora-foot.jsx`, `markora-data.jsx`, `markora.css`, `rabbit-tokens.css`, `tweaks-panel.jsx`). 본 작업은 이 디자인을 운영 가능한 정적 사이트로 포팅한다.

### 1.2 범위

**포함:**
- 디자인 파일의 8개 섹션을 그대로 구현한 단일 랜딩 페이지 (Nav, Hero, Features, Demos, Slash, Install, FAQ, Final CTA, Footer)
- 영어/한국어 라우트 분리 (`/`, `/ko/`) 및 자동 언어 감지
- 라이트/다크 테마
- Netlify 정적 export 배포

**제외:**
- 별도 docs / changelog / 블로그 페이지 (GitHub README + Releases로 위임)
- AdSense
- Tweaks 패널 (디자인 프로토타이핑용 도구)
- 7가지 accent 컬러 선택 (blue 1개로 고정)
- 단위/E2E 테스트 (정적 콘텐츠 위주, `tsc` + `next build`로 충분)

### 1.3 비목표 / 의도적 미흡

- IDE 목업의 인라인 텍스트는 i18n dict로 추출하지 않고 컴포넌트 내부에 그대로 유지 (디자인 충실도 우선, 카피 변경 빈도 낮음)
- shadcn/ui 도입하지 않음 (markora.css가 시각 디자인 100% 담당, 표준 컴포넌트도 디자인 CSS로 자체 구현)

---

## 2. 결정 요약

| 항목 | 결정 |
|---|---|
| 범위 | 단일 랜딩 페이지 (디자인의 8개 섹션) |
| 기본 언어 | **en** (전세계 개발자 대상) |
| 라우트 | `/` (en) + `/ko/` (ko) |
| `<html lang>` | en (root layout 고정), ko 페이지는 `useEffect`로 `document.documentElement.lang = 'ko'` |
| 자동 언어 감지 | 클라이언트 사이드: `/` 진입 시 `navigator.language`가 `ko*`이면 `/ko/`로 redirect (`localStorage` 1회성) |
| CSS 전략 | `rabbit-tokens.css` + `markora.css` 그대로 포팅, Tailwind 최소 사용 |
| Accent | `blue` 1개로 고정 (다른 6개 팔레트와 동적 주입 로직 제거) |
| 테마 | next-themes, `attribute="data-theme"` (markora.css 셀렉터 호환) |
| 헤더 토글 | EN/KO 라우트 토글 + 라이트/다크 토글 |
| 배포 | Netlify static export (blog-v2 패턴) |
| 분석 | GA placeholder만 (환경변수 `NEXT_PUBLIC_GA_ID`, 추후 ID 주입), AdSense 없음 |
| i18n 데이터 | `lib/i18n/en.ts` (Dict 원본), `lib/i18n/ko.ts` 분리 |
| 폰트 | `next/font/local` + Pretendard Variable self-host |
| 스택 | Next.js 16 + React 19 + TypeScript + `output: 'export'` |

---

## 3. 디렉토리 구조

```
markora.advenoh.pe.kr/
├── app/
│   ├── layout.tsx              # <html lang="en">, ThemeProvider, Pretendard, GA placeholder, JSON-LD
│   ├── page.tsx                # en 랜딩 (기본)
│   ├── ko/
│   │   └── page.tsx            # ko 랜딩
│   ├── globals.css             # rabbit-tokens.css + markora.css import + accent 변수
│   ├── robots.ts
│   └── sitemap.ts              # / 와 /ko/ 둘 다 포함
├── components/
│   ├── auto-lang-redirect.tsx  # 'use client' (en 페이지 전용)
│   ├── landing.tsx             # 서버 컴포넌트, 섹션들 컴포지션
│   ├── nav.tsx                 # 'use client' (테마 + 언어 토글 호스트)
│   ├── hero.tsx
│   ├── ide-mock.tsx
│   ├── features.tsx
│   ├── demos/
│   │   ├── math-demo.tsx
│   │   └── mermaid-demo.tsx
│   ├── slash.tsx
│   ├── install.tsx
│   ├── faq.tsx                 # 'use client' (아코디언 useState)
│   ├── final-cta.tsx
│   ├── footer.tsx
│   ├── theme-toggle.tsx        # 'use client' (next-themes)
│   └── lang-toggle.tsx         # 'use client' (usePathname → / ↔ /ko/, localStorage 기록)
├── lib/
│   ├── i18n/
│   │   ├── en.ts               # Dict 원본 (타입 기준)
│   │   ├── ko.ts               # Dict 타입을 만족하는 한국어 값
│   │   └── types.ts            # type Dict = typeof en
│   ├── icons.tsx               # 디자인의 Icon 컴포넌트 (SVG inline)
│   └── site-config.ts          # GitHub URL, marketplace placeholder, GA env, og:image 경로
├── styles/
│   ├── rabbit-tokens.css       # 디자인 파일에서 그대로 복사
│   └── markora.css             # 그대로 복사 + 사전 정리 (.tweak 셀렉터 제거)
├── public/
│   ├── fonts/                  # PretendardVariable.woff2
│   ├── og.png                  # 출시 전 placeholder, 디자인 캡처로 교체
│   └── favicon.svg / .ico      # 출시 전 별도 작업
├── next.config.js              # output: 'export', trailingSlash: true
├── netlify.toml                # blog-v2 패턴 차용
├── tailwind.config.ts          # 거의 빈 설정 (반응형 유틸리티 정도)
├── tsconfig.json               # @/* 별칭 (루트 기준)
├── package.json
├── postcss.config.js
└── CLAUDE.md                   # 프로젝트 가이드
```

---

## 4. 라우팅 / 다국어 처리

### 4.1 라우트

- `/` → `app/page.tsx` (en, 정적 HTML `out/index.html`)
- `/ko/` → `app/ko/page.tsx` (ko, 정적 HTML `out/ko/index.html`)

### 4.2 자동 언어 감지

`/` 페이지에 `<AutoLangRedirect />` 클라이언트 컴포넌트 마운트:

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

- `localStorage['mk-lang']`이 있으면 사용자가 명시 선택한 적 있다는 신호 → 자동 redirect 스킵
- `/ko/` 페이지에는 `<AutoLangRedirect />`를 두지 않음

### 4.3 언어 토글

`lang-toggle.tsx`는 클릭 시:
1. `usePathname()`이 `/ko`로 시작이면 → `/`로, 아니면 → `/ko/`로 이동
2. `localStorage.setItem('mk-lang', target)` 기록 → 이후 자동 redirect 비활성

### 4.4 미국에서 접근 시 흐름

1. `markora.advenoh.pe.kr` 입력 → `/` 정적 HTML 즉시 노출 (영어, FOUC 없음)
2. AutoLangRedirect는 `navigator.language`가 `en*`이라 동작 안 함
3. 검색 봇은 hreflang(`alternates.languages`)으로 ko 사용자에게 `/ko/`를 직접 노출

---

## 5. 컴포넌트 / 데이터 흐름

### 5.1 i18n 데이터 패턴

```ts
// lib/i18n/en.ts
export const en = {
  nav: { features: 'Features', slash: 'Slash', install: 'Install', faq: 'FAQ' },
  hero: {
    eyebrow: 'JetBrains IDE Plugin · Markora',
    t1: 'Markdown, ', em: 'without the preview pane', t2: '.',
    lead: 'Typora-style WYSIWYG editing inside IntelliJ, WebStorm, PyCharm and friends...',
    installCta: 'Install from Marketplace',
    coming: 'Coming soon',
    githubCta: 'View on GitHub',
    trust: ['JetBrains 2024.2+', 'JCEF-based', 'MIT license', 'Open source'],
  },
  feats: { /* ... */ },
  demo:  { /* ... */ },
  slash: { /* ... */ },
  install: { /* ... */ },
  faq:   { /* ... */ },
  cta:   { /* ... */ },
  foot:  ['GitHub', 'Issues', 'Changelog', 'License'],
} as const;

// lib/i18n/types.ts
import type { en } from './en';
export type Dict = typeof en;

// lib/i18n/ko.ts
import type { Dict } from './types';
export const ko: Dict = { /* 같은 모양 강제됨 */ };
```

디자인의 `markora-data.jsx`에 있는 `T.ko` / `T.en` 객체를 거의 그대로 분리 파일로 옮긴다.

### 5.2 페이지 진입점

```tsx
// app/page.tsx (서버 컴포넌트)
import { en } from '@/lib/i18n/en';
import { Landing } from '@/components/landing';
import { AutoLangRedirect } from '@/components/auto-lang-redirect';

export default function Page() {
  return (
    <>
      <AutoLangRedirect />
      <Landing t={en} lang="en" />
    </>
  );
}

// app/ko/page.tsx
import { ko } from '@/lib/i18n/ko';
import { Landing } from '@/components/landing';
export default function Page() {
  return <Landing t={ko} lang="ko" />;
}
```

### 5.3 Landing 컴포지션

```tsx
// components/landing.tsx (서버 컴포넌트)
export function Landing({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <>
      <Nav t={t} lang={lang} />
      <Hero t={t} lang={lang} />
      <Features t={t} />
      <Demos t={t} lang={lang} />
      <Slash t={t} />
      <Install t={t} lang={lang} />
      <FAQ t={t} lang={lang} />
      <FinalCTA t={t} />
      <Footer t={t} lang={lang} />
    </>
  );
}
```

### 5.4 서버 / 클라이언트 경계

| 컴포넌트 | 종류 | 이유 |
|---|---|---|
| Landing | server | 단순 컴포지션 |
| Hero, IDEMock, Features, Demos, Slash, Install, FinalCTA, Footer | server | 정적 콘텐츠, 빌드 타임에 HTML로 굳혀짐 |
| Nav | client | 인터랙티브 토글 자식 호스팅 |
| ThemeToggle | client | `useTheme()` |
| LangToggle | client | `usePathname`, `router.push`, `localStorage` |
| FAQ | client | 아코디언 `useState` |
| AutoLangRedirect | client | `navigator.language`, `localStorage` |

### 5.5 `lang` prop 처리

디자인 파일의 IDE 목업과 Math/Mermaid 데모 컴포넌트는 내부에 `lang === 'ko' ? ... : ...` 분기가 박혀 있다. 디자인 충실 포팅이라 그 분기를 dict로 끌어올리지 않고 `lang` prop만 전달해서 그대로 유지한다. dict는 헤더, 섹션 타이틀, CTA 등 큰 카피만 담당.

### 5.6 아이콘

`lib/icons.tsx`에 디자인 `markora-data.jsx`의 `Icon` 컴포넌트를 옮긴다. `eye`, `slash`, `moon`, `sun`, `save`, `image`, `git`, `download`, `link`, `star`, `chev`, `arrow` — 사용하지 않는 것은 제거.

---

## 6. 디자인 토큰 / 테마 시스템

### 6.1 파일 매핑

| 디자인 파일 | 프로젝트 위치 | 변경 |
|---|---|---|
| `rabbit-tokens.css` | `styles/rabbit-tokens.css` | 그대로 복사 |
| `markora.css` | `styles/markora.css` | 거의 그대로. `.tweak`/`.mk-tweak` 셀렉터 grep 후 제거. accent 색상별 셀렉터(`[data-accent]` 등) 있으면 blue만 남기고 제거 |
| `markora-data.jsx`의 `ACCENTS`/`ACCENTS_DARK` | `app/globals.css`의 `:root`/`[data-theme="dark"]` | blue 1개만 인라인. 객체 + 동적 주입 로직 제거 |
| `tweaks-panel.jsx` | — | 통째 삭제 |
| `markora-app.jsx`의 `useTweaks` / accent useEffect | — | 삭제 |

### 6.2 globals.css

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
}

[data-theme='dark'] {
  --mk-accent: #60a5fa;
  --mk-accent-hover: #93c5fd;
  --mk-accent-subtle: #1e3a5f;
  --mk-accent-border: #1d4ed8;
  --mk-accent-text: #93c5fd;
}
```

### 6.3 ThemeProvider

```tsx
// app/layout.tsx
<ThemeProvider
  attribute="data-theme"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
```

- `attribute="data-theme"`로 markora.css의 `[data-theme="dark"]` 셀렉터와 호환 (blog-v2의 `.dark` class 전략과 다름, 별도 리포라 충돌 없음)
- next-themes가 SSG 환경의 FOUC 방지용 inline 스크립트를 자동 주입 → hydration 전에 `<html data-theme="dark|light">`가 올바르게 설정됨

### 6.4 폰트

```ts
// app/layout.tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

// <html className={pretendard.variable}>
```

`globals.css`에 `:root { font-family: var(--font-pretendard), system-ui, ...; }` 한 줄 추가. 디자인 CSS 본체는 손대지 않음.

### 6.5 Tailwind 역할

- `tailwind.config.ts`는 `content` 경로 외 빈 설정
- shadcn/ui 도입 안 함 (Radix 의존성 없음)
- FAQ 아코디언은 `useState` + `.mk-faq` 클래스로 자체 구현 (디자인 그대로)
- `flex`, `hidden md:block` 같은 잡일 유틸리티만 가끔 보조

---

## 7. 빌드 / 배포 / SEO

### 7.1 패키지 의존성 (최소)

```json
{
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

### 7.2 스크립트

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve@latest out -l 3000",
    "check": "tsc --noEmit"
  }
}
```

`output: 'export'` + `trailingSlash: true`라 `out/index.html` (en) + `out/ko/index.html` (ko)이 생성됨. blog-v2의 `generate:manifest` / `generate:search` / `generate:feeds` 같은 prebuild 스크립트는 마케팅 페이지엔 불필요.

### 7.3 next.config.js

```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

### 7.4 netlify.toml

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

GA ID는 Netlify UI 환경변수에 `NEXT_PUBLIC_GA_ID`로 추후 등록.

### 7.5 site-config.ts

```ts
export const siteConfig = {
  name: 'Markora',
  url: 'https://markora.advenoh.pe.kr',
  github: 'https://github.com/kenshin579/markora',
  marketplace: '',                                  // 출시 후 채움
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  ogImage: '/og.png',
};
```

### 7.6 SEO

| 항목 | 처리 |
|---|---|
| `<html lang>` | en 페이지: root layout `lang="en"`. ko 페이지는 `useEffect`로 `document.documentElement.lang = 'ko'` (한 줄). SEO 봇은 hreflang으로 충분히 신호 받음 |
| 메타 title/description | en/ko 페이지에서 각각 `generateMetadata` |
| hreflang | `metadata.alternates.languages = { en: '/', ko: '/ko/', 'x-default': '/' }` |
| OpenGraph | `og:locale` = `en_US` (en) / `ko_KR` (ko), `og:image` = `/og.png` |
| Twitter card | `summary_large_image` |
| `robots.ts` | blog-v2 패턴 차용 |
| `sitemap.ts` | `/` (priority 1.0), `/ko/` (priority 0.9) |
| JSON-LD | `WebSite` + `SoftwareApplication` (`applicationCategory: "DeveloperApplication"`, `operatingSystem: "JetBrains IDE 2024.2+"`) — 마켓플레이스 SEO 가산점 |
| favicon | "M" 마크 svg 별도 작업 |

### 7.7 분석

- `app/layout.tsx`에 GA 스니펫 조건부 삽입: `siteConfig.gaId`가 있을 때만 `<Script src="https://www.googletagmanager.com/gtag/js?id=...">` 렌더
- AdSense 코드 없음
- Naver Site Verification 등 다른 검증 메타도 일단 없음 (필요해지면 추가)

---

## 8. CTA / 출시 전 상태

- Hero/FinalCTA의 "Install from Marketplace" 버튼: `disabled` 속성 + "Coming soon" 배지 (디자인의 `hero.coming` 그대로). 클릭 무동작.
- 출시 후 `siteConfig.marketplace`에 URL 채우면 자동 활성화 — 컴포넌트 한 줄 분기 (`disabled={!siteConfig.marketplace}`, `href={siteConfig.marketplace}`).
- "View on GitHub" 버튼: `siteConfig.github` 링크.

---

## 9. 검증 체크리스트

### 9.1 빌드 / 타입

- [ ] `npm install` 성공
- [ ] `npm run check` (tsc) 통과 — `Dict` 타입이 `ko.ts`를 강제해서 ko/en 키 누락 시 빌드 에러
- [ ] `npm run build` 성공 → `out/index.html`, `out/ko/index.html` 생성 확인

### 9.2 다국어 / SEO

- [ ] `out/index.html`의 `<html lang="en">`
- [ ] `out/index.html`에 `<link rel="alternate" hreflang="en" href="...">`, `hreflang="ko"`, `hreflang="x-default"` 출력
- [ ] `out/sitemap.xml`에 `/`와 `/ko/` 모두 포함
- [ ] `out/robots.txt` 정상

### 9.3 테마

- [ ] 라이트/다크 토글 → `<html data-theme>` 속성 변경 즉시 반영
- [ ] OS prefers-color-scheme: dark 사용자가 첫 진입 시 다크 페이지가 곧장 보임 (FOUC 없음)
- [ ] KO/EN 토글 → 라우트만 바뀌고 테마 상태 유지 (next-themes localStorage)

### 9.4 자동 redirect

- [ ] 영어 OS에서 `/` 진입 → `/`에 머무름
- [ ] 한국어 OS에서 `/` 진입 → `/ko/`로 이동 (Chrome devtools에서 `navigator.language` 모킹으로 검증)
- [ ] `/ko/`에서 EN 토글 클릭 → `/`로 이동, `localStorage['mk-lang'] = 'en'` 기록
- [ ] 이후 한국어 OS에서 `/` 재방문 → 자동 redirect 안 됨 (사용자 선택 존중)

### 9.5 시각

- [ ] Lighthouse Performance / Accessibility / SEO / Best Practices 모두 90+ (정적 사이트라 어렵지 않음)
- [ ] IDE 목업, Math 데모, Mermaid SVG가 디자인 파일과 시각적으로 일치
- [ ] 모바일 브레이크포인트에서 깨지지 않음 (디자인 CSS의 `@media` 룰 활용)

### 9.6 CTA

- [ ] Marketplace 버튼 disabled + "Coming soon" 배지 노출
- [ ] GitHub 버튼이 `https://github.com/kenshin579/markora` 새 탭 열기

---

## 10. 미해결 / 후속 작업

| 항목 | 처리 시점 |
|---|---|
| `og:image` 실제 이미지 (1200×630) | 출시 전 (디자인 hero 캡처) |
| favicon 세트 (32/192/512 png + svg) | 출시 전 ("M" 마크 변형) |
| Pretendard woff2 파일 self-host | 구현 단계 (OFL 라이선스 명시) |
| `markora.css` 정밀 정리 (사용 안 하는 셀렉터/accent) | 구현 단계 (실제 파일 grep) |
| Marketplace URL 주입 | Markora 출시 후 `site-config.ts` 업데이트 |
| GA 속성 ID 주입 | 추후 Netlify 환경변수 (`NEXT_PUBLIC_GA_ID`) |

---

## 11. 위험 / 가정

| 항목 | 위험 / 가정 |
|---|---|
| `[data-theme="dark"]` ↔ next-themes `attribute="data-theme"` 호환성 | 가정: 정상 동작. 빌드 후 검증 필요 |
| markora.css에 `.tweak` / `[data-accent]` 셀렉터가 정확히 어떤 식으로 박혀 있는지 | 구현 단계에서 grep으로 식별 후 제거 |
| 한국어 OS 사용자의 첫 진입 깜빡임 | `/` 영어 콘텐츠 paint → ~50ms 후 `/ko/`로 이동. 모바일 한국 네트워크에서 미세, 허용 |
| Pretendard Variable의 정확한 파일명 / weight 범위 | 공식 배포본(`PretendardVariable.woff2`, weight `45 920`) 기준. 다르면 구현 단계에서 조정 |
