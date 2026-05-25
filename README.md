# markora.advenoh.pe.kr

[Markora](https://github.com/kenshin579/markora) — JetBrains IDE용 WYSIWYG 마크다운 에디터 플러그인 — 의 홍보용 정적 랜딩 페이지입니다.

- **도메인:** https://markora.advenoh.pe.kr
- **JetBrains Marketplace:** https://plugins.jetbrains.com/plugin/31598-markora
- **배포:** Netlify (정적 export)

## 기술 스택

- **Next.js 16** (App Router) — `output: 'export'` 정적 사이트 생성
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3**
- **next-themes** — 라이트/다크 테마 토글
- **Pretendard Variable** — `next/font/local`로 self-host
- shadcn/ui 미사용 (FAQ 아코디언 등 자체 구현)

## 시작하기

```bash
npm install

npm run dev      # 개발 서버 → http://localhost:3000
npm run build    # 정적 빌드 → out/
npm run start    # 빌드 결과물 미리보기 → npx serve out -l 3000
npm run check    # tsc --noEmit 타입 체크
```

> Node 22 권장 (Netlify 빌드 환경 기준). `npm install` 시 `--legacy-peer-deps`가 필요할 수 있습니다.

빌드 시 `output: 'export'` + `trailingSlash: true` 설정으로 `out/index.html`(EN)과 `out/ko/index.html`(KO) 정적 파일이 생성됩니다.

## 다국어 (i18n)

| 경로     | 언어            |
| -------- | --------------- |
| `/`      | 영어 (기본)     |
| `/ko/`   | 한국어          |

- `<AutoLangRedirect />`가 OS 언어가 한국어이면 `/ko/`로 자동 redirect합니다.
- 사용자가 KO/EN 토글로 언어를 명시 선택하면 `localStorage['mk-lang']`에 저장되어 자동 redirect가 비활성화됩니다.
- 카피 원본은 `lib/i18n/en.ts`이며, `lib/i18n/ko.ts`는 동일한 `Dict` 타입을 강제합니다. 한쪽만 키를 추가/삭제하면 빌드 에러로 잡힙니다.

## 디렉터리 구조

```
app/                # App Router 페이지 (page.tsx, ko/, layout.tsx, sitemap.ts, robots.ts)
components/         # 랜딩 섹션 컴포넌트 (hero, features, install, faq, footer 등)
  demos/            # Math(KaTeX) / Mermaid 데모
lib/
  i18n/             # en.ts / ko.ts / types.ts
  site-config.ts    # 사이트 메타데이터, GitHub/Marketplace URL
  icons.tsx
styles/             # rabbit-tokens.css, markora.css (디자인 원본)
public/             # favicon, 폰트
docs/               # 디자인 원본 프로토타입 및 스펙
```

## Marketplace 버튼 게이팅

`lib/site-config.ts`의 `marketplace` 값에 따라 Hero / FinalCTA의 "Install from Marketplace" 버튼이 자동 토글됩니다.

- 빈 문자열이면 → 버튼 disabled + "Coming soon" 배지
- URL이 채워져 있으면 → 활성 링크 (현재 plugin ID `31598`로 활성화 상태)

## 배포

`netlify.toml`에 정의된 대로 Netlify에서 빌드/배포합니다.

- Build command: `npm run build`
- Publish directory: `out`
- Node version: 22

## 기여

- main 브랜치 직접 commit 금지 — feature 브랜치 + PR 사용
- 커밋 메시지: 영어, [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`)

자세한 개발 가이드는 [`CLAUDE.md`](./CLAUDE.md)를 참고하세요.
