# IDE Mock Realism — Hero Mockup Redesign

Date: 2026-05-07
Branch: `feature/ide-mock-realism`

## Problem

The hero `IDEMock` component looked clearly fake — a generic dark Notion-like mockup that didn't read as IntelliJ. Visitors comparing the landing page to the actual product (real IntelliJ screenshot at `~/Desktop/markora.png`) could come away thinking the plugin behaves like a separate tool rather than living inside their IDE.

A second, unrelated copy issue surfaced during the same review: the landing page advertised image **drop / clipboard paste**, but those input paths don't actually wire through `ImageUploadController` in the plugin. The only working flow is `/image` slash → file picker → upload to `images/`. Leaving paste/drop copy in place would be a feature lie.

## Decision

Take approach **C** (redesign the existing React mock), not approach A/B (use a real PNG screenshot). Rationale: a React mock keeps responsive layout, theme-independent rendering, and EN/KO text branching. The risk with C ("still feels fake") is mitigated by mimicking the IntelliJ New UI Dark palette and structure pixel-by-pixel from the real screenshot.

The IDE mock is **always rendered in IntelliJ Darcula tones**, regardless of the site's light/dark theme — same convention as a product screenshot.

## Changes

### `components/ide-mock.tsx` (rewrite)

- Top-level frame: macOS dots + `markora / Version control` project tabs + `Current File ▾` + icon strip (real IntelliJ chrome, not a generic title bar)
- File tabs: colored `MD` / `KT` glyphs as prefix; active tab gets a 2px accent underline (`#3574f0`)
- Sidebar: `Project` header + folder/file icons (yellow folder, blue MD, purple KT), active row painted with IntelliJ selection blue (`#2e436e`)
- Removed the old `Markora / Source / Preview` toolbar at the top — that's not where IntelliJ shows them
- Added **bottom mode tabs** `Markdown Split Editor / Markora` (this is the real IntelliJ position) with auto-saved indicator
- Added **status bar** breadcrumb (`markora › docs › NOTES.md`) + `main · UTF-8 · LF` pills

### `styles/markora.css`

Introduced an isolated IntelliJ palette scoped to `.mk-ide`:

```
--ij-bg: #1e1f22;       --ij-text: #dfe1e5;
--ij-bg-2: #2b2d30;     --ij-text-2: #bcbec4;
--ij-bg-3: #393b40;     --ij-text-3: #6f737a;
--ij-accent: #3574f0;   --ij-selection: #2e436e;
```

`.mk-ide .doc-*` overrides re-color the BlockNote-style content (h1/h2/p/checkbox/inline math/slash menu) with IJ tones so the rest of the site's `--rabbit-*` tokens don't bleed in.

Slash menu drops **up** from the typing block (`bottom: calc(100% + 6px)`) — prevents clipping against the editor's `overflow: hidden`.

Filled in previously-missing helper classes (`doc-math-inline`, `doc-cursor`, `doc-slash-trigger`, `doc-slash-search`, `.checkbox.checked`).

### Copy fixes — paste/drop language removed

Verified against `markora/src/main/kotlin/.../ImageUploadController.kt` and `markora/frontend/src/`: no paste/drop event handlers wire to the upload endpoint. Only `/image` → file picker actually inserts an image into `images/`.

| File | Before | After |
|------|--------|-------|
| `components/features.tsx` | "Image drop — Drag, drop, paste — auto-organized into images/" | "Add images — Type /image and pick a file — auto-organized into images/" |
| `components/faq.tsx` (KO) | "드래그·드롭이나 클립보드 붙여넣기를 하면..." | "/image 슬래시 명령으로 파일 선택 다이얼로그를 열어 이미지를 고르면..." |
| `components/faq.tsx` (EN) | "Drops and clipboard pastes are auto-organized..." | "Type /image to open a file picker..." |
| `components/slash.tsx` | "Upload or paste from clipboard" | "Pick a file to insert an image" |
| `components/ide-mock.tsx` (todo) | "Handle clipboard image paths" | "Add /image dialog shortcut" |

## Out of scope

- Replacing the React mock with a real PNG (approach A/B) — revisit only if the redesign still tests as inauthentic with users.
- Improving the rest of the landing copy or other features.
- Adding a real paste/drop handler to the plugin itself (that's a markora plugin task, not a landing task).
