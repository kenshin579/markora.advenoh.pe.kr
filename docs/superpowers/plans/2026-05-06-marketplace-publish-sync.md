# Markora Marketplace Publish Sync — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Markora 플러그인이 JetBrains Marketplace에 publish된 사실을 사이트, 플러그인 README, 워크스페이스 루트 CLAUDE.md에 동기화하여 일관성을 회복한다.

**Architecture:** 3개의 독립 repo에 각 repo의 git 정책에 맞춰 변경. 사이트와 플러그인은 feature 브랜치 + PR. 워크스페이스 루트는 git repo가 아니므로 직접 편집 후 변경 내역 보고. Marketplace URL은 `https://plugins.jetbrains.com/plugin/31598-markora` (사용자 제공). 사이트 코드는 이미 marketplace URL 비어있을 때 자동 disabled되는 게이팅 로직이 있으므로 URL을 채우는 것만으로 활성화.

**Tech Stack:** Next.js 15 (사이트), GitHub `gh` CLI (PR 생성), 문서 편집 only (테스트 변경 없음).

**Spec:** `markora.advenoh.pe.kr/docs/superpowers/specs/2026-05-06-marketplace-publish-sync-design.md`

---

## File Structure

### `markora.advenoh.pe.kr/` 사이트
- Modify: `lib/site-config.ts:6` — `marketplace: ''` → 실제 URL

### `markora/` 플러그인
- Modify: `README.md:39` — `### From JetBrains Marketplace (Coming Soon)` → `### From JetBrains Marketplace`
- Modify: `README.md:41` — Marketplace listing 직접 링크 1줄 추가

### 워크스페이스 루트 `/Users/user/src/workspace_markora/`
- Modify: `CLAUDE.md:10` — outdated 한 줄 문구 갱신
- Modify: `CLAUDE.md:82~86` — `## markora.advenoh.pe.kr/` 섹션 본문 재작성

---

## Important Constants

```
MARKETPLACE_URL = https://plugins.jetbrains.com/plugin/31598-markora
SITE_REPO_PATH  = /Users/user/src/workspace_markora/markora.advenoh.pe.kr
PLUGIN_REPO_PATH= /Users/user/src/workspace_markora/markora
WORKSPACE_ROOT  = /Users/user/src/workspace_markora
```

각 Task에서 이 상수를 그대로 사용한다.

---

### Task 1: 사이트 — Marketplace URL 활성화

**Files:**
- Modify: `markora.advenoh.pe.kr/lib/site-config.ts:6`

**Branch:** `feat/marketplace-url-activation` (from `main`)

- [ ] **Step 1: Baseline 확인 — 현재 disabled 상태인지 검증**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
git status
grep -n "marketplace:" lib/site-config.ts
```

Expected:
- `git status`: clean working tree on a sane branch
- grep 출력: `6:  marketplace: '',` (빈 문자열)

- [ ] **Step 2: main 최신화 + feature 브랜치 생성**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
git checkout main
git pull origin main
git checkout -b feat/marketplace-url-activation
```

Expected: `Switched to a new branch 'feat/marketplace-url-activation'`

- [ ] **Step 3: `lib/site-config.ts` 수정**

`marketplace: ''` → `marketplace: 'https://plugins.jetbrains.com/plugin/31598-markora'`

수정 후 파일 상태:

```ts
export const siteConfig = {
  name: 'Markora',
  description: 'WYSIWYG Markdown editor for JetBrains IDEs.',
  url: 'https://markora.advenoh.pe.kr',
  github: 'https://github.com/kenshin579/markora',
  marketplace: 'https://plugins.jetbrains.com/plugin/31598-markora',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  ogImage: '/og.png',
} as const;
```

- [ ] **Step 4: 타입체크 통과 확인**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
npm run check
```

Expected: 종료 코드 0 (에러 없음)

- [ ] **Step 5: 정적 빌드 통과 확인**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
npm run build
```

Expected:
- `out/index.html` 생성됨
- `out/ko/index.html` 생성됨
- 빌드 종료 코드 0

- [ ] **Step 6: 빌드 결과에서 Marketplace 링크 검증**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
grep -o 'plugins.jetbrains.com/plugin/31598-markora' out/index.html | head -3
grep -o 'plugins.jetbrains.com/plugin/31598-markora' out/ko/index.html | head -3
grep -ic "coming soon\|곧 출시" out/index.html out/ko/index.html
```

Expected:
- 앞 두 grep: 각 파일에서 1회 이상 매치 (Hero + FinalCTA에서 마켓플레이스 링크 발생)
- 마지막 grep: `0` (Coming soon 라벨 미표시)

- [ ] **Step 7: dev server 시각 검증 (선택, 강력 권장)**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
npm run dev
```

브라우저에서 확인:
- `http://localhost:3000/` (EN) — Hero "Install from Marketplace" 버튼이 active link로 표시. 클릭 시 marketplace로 이동.
- `http://localhost:3000/ko/` (KO) — 동일.
- 두 페이지 모두 "Coming soon" / "곧 출시" 배지 미표시.
- FinalCTA 섹션도 동일하게 확인.

확인 후 dev server 종료 (Ctrl+C).

- [ ] **Step 8: 커밋**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
git add lib/site-config.ts
git commit -m "$(cat <<'EOF'
feat: activate Marketplace URL for Install CTAs

Now that the plugin is published as plugin ID 31598, fill in
siteConfig.marketplace so Hero and FinalCTA Install buttons
become active links and the "Coming soon" gate is removed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: 커밋 생성 (1 file changed, 1 insertion(+), 1 deletion(-))

- [ ] **Step 9: 푸시 + PR 생성**

```bash
cd /Users/user/src/workspace_markora/markora.advenoh.pe.kr
git push -u origin feat/marketplace-url-activation
gh pr create --title "feat: activate Marketplace URL for Install CTAs" --reviewer kenshin579 --body "$(cat <<'EOF'
## Summary
- `siteConfig.marketplace` 채워서 Hero/FinalCTA의 "Install from Marketplace" CTA 활성화
- Marketplace URL: https://plugins.jetbrains.com/plugin/31598-markora

## Why
플러그인이 JetBrains Marketplace에 publish됨 (plugin ID 31598). 사이트 게이팅 로직(`marketplaceReady = !!siteConfig.marketplace`)이 자동으로 활성화 상태로 전환됨.

## Test plan
- [ ] `npm run check` 통과
- [ ] `npm run build` 무오류, `out/index.html` + `out/ko/index.html` 생성
- [ ] 빌드 결과 HTML에 marketplace URL 포함, "Coming soon" 0건
- [ ] dev server 시각 검증 (EN/KO 양쪽 Hero/FinalCTA Install 버튼 active link)

## Related Spec
`docs/superpowers/specs/2026-05-06-marketplace-publish-sync-design.md`
EOF
)"
```

Expected: PR URL 출력. 사용자에게 공유.

---

### Task 2: 플러그인 — README publish 반영

**Files:**
- Modify: `markora/README.md:39`
- Modify: `markora/README.md:41`

**Branch:** `docs/readme-marketplace-published` (from `main`)

- [ ] **Step 1: Baseline 확인**

```bash
cd /Users/user/src/workspace_markora/markora
git status
grep -n -i "coming soon" README.md
```

Expected:
- `git status`: clean working tree
- grep: `39:### From JetBrains Marketplace (Coming Soon)` (단일 매치)

- [ ] **Step 2: main 최신화 + feature 브랜치 생성**

```bash
cd /Users/user/src/workspace_markora/markora
git checkout main
git pull origin main
git checkout -b docs/readme-marketplace-published
```

Expected: `Switched to a new branch 'docs/readme-marketplace-published'`

- [ ] **Step 3: README.md line 39 수정 — "(Coming Soon)" 제거**

변경 전:
```
### From JetBrains Marketplace (Coming Soon)
```

변경 후:
```
### From JetBrains Marketplace
```

- [ ] **Step 4: README.md line 41 수정 — Marketplace 링크 추가**

변경 전:
```
1. Open **Settings** > **Plugins** > **Marketplace**
```

변경 후:
```
1. Open **Settings** > **Plugins** > **Marketplace** (or visit the [Marketplace listing](https://plugins.jetbrains.com/plugin/31598-markora) directly)
```

- [ ] **Step 5: 잔재/링크 검증**

```bash
cd /Users/user/src/workspace_markora
grep -ic "coming soon" markora/README.md
grep -c "plugins.jetbrains.com/plugin/31598-markora" markora/README.md
```

Expected:
- 첫 grep: `0` (Coming Soon 잔재 없음)
- 두 번째 grep: `1` (Marketplace 링크 추가됨)

- [ ] **Step 6: 인코딩 확인**

```bash
file -I /Users/user/src/workspace_markora/markora/README.md
```

Expected: `text/plain; charset=utf-8`

- [ ] **Step 7: 커밋**

```bash
cd /Users/user/src/workspace_markora/markora
git add README.md
git commit -m "$(cat <<'EOF'
docs: mark Marketplace install path as published

Plugin is now published on JetBrains Marketplace (ID 31598).
Remove the "Coming Soon" suffix from the install heading and
add a direct link to the Marketplace listing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: 커밋 생성 (1 file changed, 2 insertions(+), 2 deletions(-))

- [ ] **Step 8: 푸시 + PR 생성**

```bash
cd /Users/user/src/workspace_markora/markora
git push -u origin docs/readme-marketplace-published
gh pr create --title "docs: mark Marketplace install path as published" --reviewer kenshin579 --body "$(cat <<'EOF'
## Summary
- README의 "From JetBrains Marketplace (Coming Soon)" → "From JetBrains Marketplace"
- 설치 단계에 Marketplace listing 직접 링크 추가

## Why
플러그인 publish 완료 (https://plugins.jetbrains.com/plugin/31598-markora). 사이트의 Install CTA 활성화와 일관성 맞춤.

## Test plan
- [ ] `grep -ic "coming soon" README.md` → 0
- [ ] GitHub renderer에서 Marketplace 링크 클릭 동작 확인

## Related Spec
`markora.advenoh.pe.kr/docs/superpowers/specs/2026-05-06-marketplace-publish-sync-design.md`
EOF
)"
```

Expected: PR URL 출력. 사용자에게 공유.

---

### Task 3: 워크스페이스 루트 CLAUDE.md 갱신

**Files:**
- Modify: `/Users/user/src/workspace_markora/CLAUDE.md:10`
- Modify: `/Users/user/src/workspace_markora/CLAUDE.md:82~86` (섹션 본문)

**Branch:** N/A — 워크스페이스 루트는 git repo 아님. 직접 편집 후 변경 내역 보고.

- [ ] **Step 1: Baseline 확인**

```bash
cd /Users/user/src/workspace_markora
ls -la .git 2>/dev/null || echo "not a git repo (expected)"
sed -n '10p;82,86p' CLAUDE.md
```

Expected:
- `.git` 없음 (워크스페이스 루트는 git repo가 아님)
- line 10: outdated 문구 (`bootstrap-only, README only`)
- line 82~86: outdated 섹션 (`Initial-commit-only repo. No build system or content yet.`)

- [ ] **Step 2: Line 10 갱신**

변경 전:
```
- `markora.advenoh.pe.kr/` — Companion repo for the project's landing page / docs site (currently bootstrap-only, README only).
```

변경 후:
```
- `markora.advenoh.pe.kr/` — Next.js 15 (App Router) static-export landing site. EN/KO i18n, deployed to Netlify. Has its own `CLAUDE.md`.
```

- [ ] **Step 3: Line 82~86 섹션 본문 갱신**

변경 전:
```
## `markora.advenoh.pe.kr/`

Initial-commit-only repo. No build system or content yet. Treat as a separate project; do not assume shared tooling with `markora/`.
```

변경 후:

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

- [ ] **Step 4: 인코딩 확인**

```bash
file -I /Users/user/src/workspace_markora/CLAUDE.md
```

Expected: `text/plain; charset=utf-8`

- [ ] **Step 5: 결과 검증 — 변경된 라인 확인**

```bash
cd /Users/user/src/workspace_markora
grep -n "bootstrap-only\|Initial-commit-only" CLAUDE.md
grep -n "Next.js 15\|Landing Page Site" CLAUDE.md
```

Expected:
- 첫 grep: `0건` (outdated 문구 제거됨)
- 두 번째 grep: `2건 이상` (line 10 + line 82 섹션 헤더)

- [ ] **Step 6: 사용자에게 변경 내역 보고**

워크스페이스 루트는 git repo가 아니므로 PR 생성이 불가. 다음 형식으로 사용자에게 보고:

```
워크스페이스 루트 CLAUDE.md 직접 편집 완료:
- Line 10: markora.advenoh.pe.kr 한 줄 설명 갱신
- Line 82~86: 섹션 본문을 실제 빌드/구조로 재작성

확인 명령:
  diff <(git -C markora.advenoh.pe.kr show HEAD:CLAUDE.md 2>/dev/null) CLAUDE.md  # 의미 없음 — 다른 파일
  cat CLAUDE.md | sed -n '8,15p;80,100p'
```

추후 워크스페이스 루트가 git repo로 전환되면 회고적으로 first commit에 포함시키는 것을 고려.

---

## 작업 순서 / 의존성

세 Task는 기능적으로 독립이지만, 일관성 회복 관점에서 다음 순서를 권장:

1. **Task 1 (사이트)** — 머지 시 사용자에게 즉시 가시적 효과 (Install 버튼 활성화)
2. **Task 2 (플러그인 README)** — 사이트와 일관성 맞춤. Task 1 머지 직후 빠르게 머지
3. **Task 3 (워크스페이스 CLAUDE.md)** — 도구용 내부 가이드. 위 두 PR과 무관하게 진행 가능

만약 한 세션 안에 모두 처리한다면: Task 1 → Task 2 → Task 3 순으로 진행.

---

## Self-Review 결과

**Spec coverage 확인:**
- ✅ Spec §2.1 (사이트 marketplace URL) → Task 1
- ✅ Spec §2.2 (README "Coming Soon" + 링크 추가) → Task 2 Step 3, 4
- ✅ Spec §2.3 (CLAUDE.md line 10 + 82~86) → Task 3 Step 2, 3
- ✅ Spec §3 (검증 항목 — npm check/build, grep, dev server) → Task 1 Step 4~7, Task 2 Step 5
- ✅ Spec §4 (실행 순서) → 본 plan "작업 순서 / 의존성" 섹션
- ✅ Spec §5 (Marketplace URL 정확성, GA 비목표) → Important Constants + Task 1만 site-config의 marketplace만 변경

**Placeholder scan:** TBD/TODO/"적절히 처리" 등의 placeholder 없음. 모든 변경 코드 명시.

**Type consistency:** 도메인 타입 변경 없음 (config 값과 docs만 변경). `marketplace` 필드명 일관 사용.

**No-Placeholders 패턴:** 위반 사항 없음. 각 Step에 실제 코드/명령/Expected 출력 명시.
