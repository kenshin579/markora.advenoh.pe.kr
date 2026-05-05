/* global React */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "ko",
  "theme": "light",
  "accent": "blue"
}/*EDITMODE-END*/;

const ACCENTS = {
  blue:    { primary: "#2563eb", hover: "#1d4ed8", subtle: "#dbeafe", border: "#bfdbfe", text: "#1d4ed8" },
  indigo:  { primary: "#4f46e5", hover: "#4338ca", subtle: "#e0e7ff", border: "#c7d2fe", text: "#4338ca" },
  purple:  { primary: "#7c3aed", hover: "#6d28d9", subtle: "#ede9fe", border: "#ddd6fe", text: "#6d28d9" },
  teal:    { primary: "#0d9488", hover: "#0f766e", subtle: "#ccfbf1", border: "#99f6e4", text: "#0f766e" },
  green:   { primary: "#16a34a", hover: "#15803d", subtle: "#dcfce7", border: "#bbf7d0", text: "#15803d" },
  orange:  { primary: "#ea580c", hover: "#c2410c", subtle: "#ffedd5", border: "#fed7aa", text: "#c2410c" },
  graphite:{ primary: "#1f2937", hover: "#111827", subtle: "#f3f4f6", border: "#e5e7eb", text: "#1f2937" },
};
const ACCENTS_DARK = {
  blue:    { primary: "#60a5fa", hover: "#93c5fd", subtle: "#1e3a5f", border: "#1d4ed8", text: "#93c5fd" },
  indigo:  { primary: "#818cf8", hover: "#a5b4fc", subtle: "#1e1b4b", border: "#4338ca", text: "#a5b4fc" },
  purple:  { primary: "#a78bfa", hover: "#c4b5fd", subtle: "#221538", border: "#5b21b6", text: "#c4b5fd" },
  teal:    { primary: "#2dd4bf", hover: "#5eead4", subtle: "#0f2e2b", border: "#0f766e", text: "#5eead4" },
  green:   { primary: "#4ade80", hover: "#86efac", subtle: "#0f2916", border: "#166534", text: "#86efac" },
  orange:  { primary: "#fb923c", hover: "#fdba74", subtle: "#2a1d05", border: "#9a3412", text: "#fdba74" },
  graphite:{ primary: "#e5e7eb", hover: "#f3f4f6", subtle: "#1f2937", border: "#374151", text: "#e5e7eb" },
};

const T = {
  ko: {
    nav: { features: "기능", slash: "슬래시", install: "설치", faq: "FAQ" },
    hero: {
      eyebrow: "JetBrains IDE Plugin · Markora",
      t1: "마크다운, ", em: "미리보기 없이", t2: ".",
      lead: "Typora 같은 WYSIWYG 편집을 IntelliJ·WebStorm·PyCharm 안에서. 분할 패널 없이, 입력하는 그대로 렌더링되는 Notion 스타일 블록 에디터.",
      installCta: "Marketplace에서 설치", coming: "곧 출시", githubCta: "GitHub에서 보기",
      trust: ["JetBrains 2024.2+", "JCEF 기반", "MIT 라이선스", "Open source"],
    },
    feats: { eyebrow: "기능", title: "필요한 것은 다 있고, 설정 파일은 없습니다", lead: "BlockNote 기반의 풍부한 블록 UX 위에 IDE 통합 · LaTeX · Mermaid를 더했어요." },
    demo:  { eyebrow: "라이브 렌더링", title: "수식과 다이어그램, 입력하는 그대로", lead: "$...$나 ```math, ```mermaid 코드 블록을 작성하면 즉시 렌더링됩니다. 별도의 미리보기 탭은 필요 없어요." },
    slash: { eyebrow: "슬래시 메뉴", title: "/ 한 번이면 모든 블록", lead: "BlockNote 기본 블록에 Markora 전용 3종이 더해집니다.", h: ["커맨드", "설명", "출처"] },
    install: { eyebrow: "설치", title: "30초면 설치 완료", lead: "JCEF가 켜진 JetBrains IDE 2024.2 이상이면 됩니다." },
    faq: { eyebrow: "FAQ", title: "자주 묻는 질문" },
    cta: { title: "마크다운 편집을 다시 즐겁게.", lead: "오픈소스 · 무료 · 매주 업데이트.", primary: "Marketplace에서 설치", secondary: "★ GitHub Star" },
    foot: ["GitHub", "이슈", "Changelog", "라이선스"],
  },
  en: {
    nav: { features: "Features", slash: "Slash", install: "Install", faq: "FAQ" },
    hero: {
      eyebrow: "JetBrains IDE Plugin · Markora",
      t1: "Markdown, ", em: "without the preview pane", t2: ".",
      lead: "Typora-style WYSIWYG editing inside IntelliJ, WebStorm, PyCharm and friends. A Notion-style block editor that renders as you type — no split view, no preview tab.",
      installCta: "Install from Marketplace", coming: "Coming soon", githubCta: "View on GitHub",
      trust: ["JetBrains 2024.2+", "JCEF-based", "MIT license", "Open source"],
    },
    feats: { eyebrow: "Features", title: "Everything you need, zero config", lead: "BlockNote's block UX, plus IDE integration, LaTeX math, and Mermaid diagrams." },
    demo:  { eyebrow: "Live render", title: "Math and diagrams, the moment you type", lead: "Wrap math in $...$ or a ```math block, draw a diagram in ```mermaid — both render inline. No preview tab needed." },
    slash: { eyebrow: "Slash menu", title: "Type / for every block", lead: "BlockNote defaults plus three Markora-specific commands.", h: ["Command", "Description", "Origin"] },
    install: { eyebrow: "Install", title: "30 seconds and you're in", lead: "Works on any JetBrains IDE 2024.2+ with JCEF enabled (default)." },
    faq: { eyebrow: "FAQ", title: "Frequently asked" },
    cta: { title: "Bring the joy back to Markdown.", lead: "Open source · free · updated weekly.", primary: "Install from Marketplace", secondary: "★ GitHub Star" },
    foot: ["GitHub", "Issues", "Changelog", "License"],
  },
};

const Icon = ({ name, size = 16 }) => {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const P = {
    eye:    <React.Fragment><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></React.Fragment>,
    slash:  <path d="m14 4-4 16" />,
    moon:   <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    sun:    <React.Fragment><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></React.Fragment>,
    save:   <React.Fragment><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></React.Fragment>,
    image:  <React.Fragment><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></React.Fragment>,
    git:    <React.Fragment><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="12" r="2.5" /><path d="M6 8.5v7M8.5 6h6.5a3 3 0 0 1 3 3v.5" /></React.Fragment>,
    download: <React.Fragment><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></React.Fragment>,
    link:   <React.Fragment><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></React.Fragment>,
    star:   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    chev:   <polyline points="6 9 12 15 18 9" />,
    arrow:  <React.Fragment><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></React.Fragment>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{P[name] || null}</svg>;
};

window.MK = { TWEAK_DEFAULTS, ACCENTS, ACCENTS_DARK, T, Icon };
