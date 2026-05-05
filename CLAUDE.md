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
