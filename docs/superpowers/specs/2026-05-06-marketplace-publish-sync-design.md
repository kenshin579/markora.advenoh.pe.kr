# Markora Marketplace Publish 반영 — 설계

- **작성일**: 2026-05-06
- **범위**: 최소 (Quick fix)
- **대상 repo**: `markora.advenoh.pe.kr`, `markora`, 워크스페이스 루트
- **Marketplace listing**: https://plugins.jetbrains.com/plugin/31598-markora

## 1. 목표

Markora 플러그인이 JetBrains Marketplace에 publish된 사실을 (1) 사이트 (2) 플러그인 README (3) 워크스페이스 가이드에 반영하여 일관성을 회복한다. 신규 컨텐츠/기능 추가 없음, 단순 상태 동기화.

### 비목표 (Out of Scope)

이번 spec은 의도적으로 좁게 둔다. 아래는 후속 작업으로 분리한다.

- 마켓플레이스 SVG 배지 (Version / Downloads / Rating)
- OG 이미지 (`/og.png`) 실제 생성/검증
- GA(Google Analytics) ID 환경변수 설정/적용
- 신규 스크린샷, 데모 GIF/MP4
- 사이트맵·hreflang·JSON-LD `SoftwareApplication` schema 보강
- 플러그인 v0.2.0 기능 로드맵

## 2. 변경 사항

3개 repo에 각자 PR을 생성한다 (워크스페이스 루트는 예외 — 아래 2.3 참조).

### 2.1 `markora.advenoh.pe.kr` (사이트)

**파일**: `lib/site-config.ts`

```diff
-  marketplace: '',
+  marketplace: 'https://plugins.jetbrains.com/plugin/31598-markora',
```

**자동으로 활성화되는 동작** (코드 추가 없음):

- `components/hero.tsx:7` — `marketplaceReady = !!siteConfig.marketplace` → `true`. "Install from Marketplace" 버튼이 disabled에서 active link로 전환.
- `components/final-cta.tsx:6` — 동일.
- `lib/i18n/{en,ko}.ts`의 `coming: 'Coming soon' / '곧 출시'` 라벨이 더 이상 표시되지 않음.

**브랜치**: `feat/marketplace-url-activation`

### 2.2 `markora` (플러그인)

**파일**: `README.md`

**Line 39** — "(Coming Soon)" 제거:

```diff
-### From JetBrains Marketplace (Coming Soon)
+### From JetBrains Marketplace
```

**Line 41** — Marketplace listing 직접 링크 1줄 추가:

```diff
-1. Open **Settings** > **Plugins** > **Marketplace**
+1. Open **Settings** > **Plugins** > **Marketplace** (or visit the [Marketplace listing](https://plugins.jetbrains.com/plugin/31598-markora) directly)
```

다른 위치의 "Coming Soon" 발생 없음 (grep 결과 line 39 단일).

**브랜치**: `docs/readme-marketplace-published`

### 2.3 워크스페이스 루트 `CLAUDE.md`

워크스페이스 루트(`/Users/user/src/workspace_markora`)는 git repo가 아님. **PR 절차 없이 직접 편집**한다 (사용자 승인 완료).

**Line 10** — "currently bootstrap-only, README only" 표현이 outdated. 영어로 통일 (원문 영어).

````diff
-- `markora.advenoh.pe.kr/` — Companion repo for the project's landing page / docs site (currently bootstrap-only, README only).
+- `markora.advenoh.pe.kr/` — Next.js 15 (App Router) static-export landing site. EN/KO i18n, deployed to Netlify. Has its own `CLAUDE.md`.
````

**Line 82~86 (`## markora.advenoh.pe.kr/` 섹션)** — 본문 전체 재작성. 깊이 있는 가이드는 사이트 자체 `CLAUDE.md`에 위임.

**기존**:

````
## `markora.advenoh.pe.kr/`

Initial-commit-only repo. No build system or content yet. Treat as a separate project; do not assume shared tooling with `markora/`.
````

**변경 후**:

````
## `markora.advenoh.pe.kr/` — Landing Page Site

Next.js 15 App Router site with **static export** (`next.config.js` → `output: 'export'`), deployed to Netlify. Stack: TypeScript, Tailwind, self-hosted Pretendard. EN (root) / KO (`/ko`) i18n. shadcn/ui not used (custom components).

All commands run from `markora.advenoh.pe.kr/`:

```bash
npm run dev      # http://localhost:3000
npm run build    # next build → out/ (static export)
npm start        # serve out/ on :3000
npm run check    # tsc --noEmit
```

Marketplace URL gating: when `lib/site-config.ts`'s `marketplace` field is empty, Hero/FinalCTA's "Install from Marketplace" button is auto-disabled with a "Coming soon" badge; filling the URL activates it. See the repo's own `CLAUDE.md` for i18n structure, design system, and copy management details.
````

## 3. 검증

각 PR 머지 전 다음 항목 통과 확인.

### 사이트
- `npm run dev` 후 Hero/FinalCTA의 "Install from Marketplace" 버튼이 활성 링크로 표시
- 클릭 시 `https://plugins.jetbrains.com/plugin/31598-markora`로 이동
- EN(`/`)·KO(`/ko/`) 양쪽 모두에서 동일 동작 확인
- "Coming soon" 배지 미표시
- `npm run check` 통과
- `npm run build` 무오류

### 플러그인 README
- GitHub 렌더링에서 Marketplace 링크가 정상 클릭 가능
- "Coming Soon" 잔재 없음 (`grep -i "coming soon" README.md` 0건)

### 워크스페이스 CLAUDE.md
- 줄 단위 diff 검토 (시각 검사)
- 사이트 섹션 코드블록 fence가 올바른지

## 4. 실행 순서

1. 사이트 PR (가장 큰 가시 효과)
2. README PR (사이트와 일관성 회복)
3. 워크스페이스 루트 CLAUDE.md 직접 편집 + 사용자에게 diff 보고

각 단계는 독립이지만, 사이트가 활성화된 상태에서 README가 여전히 "Coming Soon"이면 일관성이 깨지므로 **사이트 PR 머지 후 README PR을 빠르게 머지**하도록 한다.

## 5. 리스크 / 주의사항

- **Marketplace URL 정확성**: 사용자가 제공한 `https://plugins.jetbrains.com/plugin/31598-markora`를 그대로 사용. 슬러그(`-markora`)는 marketplace 측에서 자동 생성된 것으로 추정되며 변경되지 않음.
- **PR 분리 비용**: 3개 repo에 변경이 분산되지만 모두 작은 단순 diff. 한 세션에 일괄 처리.
- **기존 `lib/site-config.ts`의 `gaId`**: 이번 spec에서는 손대지 않음 (비목표).
