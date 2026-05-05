// ===== markora-data.jsx =====
(function(){
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

})();

// ===== markora-hero.jsx =====
(function(){
/* global React, MK */
const { Icon } = MK;

function Nav({ lang, theme, setTweak, t }) {
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
          <div className="mk-pill-toggle">
            <button className={lang === "ko" ? "active" : ""} onClick={() => setTweak("lang", "ko")}>KO</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setTweak("lang", "en")}>EN</button>
          </div>
          <button className="mk-icon-btn" title="theme" onClick={() => setTweak("theme", theme === "light" ? "dark" : "light")}>
            <Icon name={theme === "light" ? "moon" : "sun"} size={15} />
          </button>
          <a className="mk-btn sm" href="https://github.com/kenshin579/markora" target="_blank" rel="noreferrer">
            <Icon name="star" size={13} /> Star
          </a>
        </div>
      </div>
    </header>
  );
}

function IDEMock({ lang }) {
  const docTitle = lang === "ko" ? "스프린트 23 — 킥오프" : "Sprint 23 — kickoff";
  const meta = lang === "ko" ? "수정: 방금 전 · 4명" : "Edited just now · 4 authors";
  return (
    <div className="mk-ide">
      <div className="mk-ide-titlebar">
        <div className="mk-ide-dots">
          <div className="mk-ide-dot" style={{ background: "#ff5f57" }} />
          <div className="mk-ide-dot" style={{ background: "#febc2e" }} />
          <div className="mk-ide-dot" style={{ background: "#28c840" }} />
        </div>
        <div className="mk-ide-title">markora — IntelliJ IDEA 2024.2</div>
        <div style={{ width: 56 }} />
      </div>
      <div className="mk-ide-tabbar">
        <div className="mk-ide-tab">README.md</div>
        <div className="mk-ide-tab active">
          <span style={{ color: "var(--mk-accent)", marginRight: 6 }}>●</span> NOTES.md
        </div>
        <div className="mk-ide-tab">build.gradle.kts</div>
      </div>
      <div className="mk-ide-toolbar">
        <div className="mk-ide-tool active">Markora</div>
        <div className="mk-ide-tool">Source</div>
        <div className="mk-ide-tool">Preview</div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="mk-ide-saved">●</span> {lang === "ko" ? "자동 저장됨" : "Auto-saved"}
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
              {lang === "ko" ? "이번 스프린트의 목표·담당자·리스크. 인라인 수식은 " : "Goals, owners, risks for this sprint. Inline math like "}
              <span className="doc-math-inline">E = mc²</span>
              {lang === "ko" ? "처럼 그대로 렌더링됩니다." : " renders as you type."}
            </p>
          </div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <h2 className="doc-h2">{lang === "ko" ? "할 일" : "To do"}</h2>
          </div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <div style={{ flex: 1 }}>
              <div className="doc-li done"><div className="checkbox checked" /><span className="doc-li-text">{lang === "ko" ? "BlockNote 0.18로 마이그레이션" : "Migrate to BlockNote 0.18"}</span></div>
              <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === "ko" ? "JCEF 메모리 누수 수정" : "Fix JCEF memory leak"}</span></div>
              <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === "ko" ? "이미지 붙여넣기 경로 처리" : "Handle clipboard image paths"}</span></div>
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
              <div className="doc-slash-header">{lang === "ko" ? "Markora 전용" : "Markora only"}</div>
              <div className="doc-slash-item highlighted">
                <div className="icon">∑</div>
                <div className="text"><div className="t">{lang === "ko" ? "수식 블록" : "Math block"}</div><div className="s">{lang === "ko" ? "LaTeX, KaTeX 렌더" : "LaTeX, rendered with KaTeX"}</div></div>
                <div className="key">/math</div>
              </div>
              <div className="doc-slash-item">
                <div className="icon">$</div>
                <div className="text"><div className="t">{lang === "ko" ? "인라인 수식" : "Inline equation"}</div><div className="s">$...$</div></div>
                <div className="key">/eq</div>
              </div>
              <div className="doc-slash-item">
                <div className="icon">◆</div>
                <div className="text"><div className="t">{lang === "ko" ? "Mermaid 다이어그램" : "Mermaid diagram"}</div><div className="s">{lang === "ko" ? "플로우, 시퀀스, 간트" : "Flow, sequence, gantt"}</div></div>
                <div className="key">/mer</div>
              </div>
              <div className="doc-slash-divider" />
              <div className="doc-slash-header">{lang === "ko" ? "기본 블록" : "Defaults"}</div>
              <div className="doc-slash-item"><div className="icon">H₁</div><div className="text"><div className="t">{lang === "ko" ? "제목 1" : "Heading 1"}</div></div><div className="key">/h1</div></div>
              <div className="doc-slash-item"><div className="icon">≡</div><div className="text"><div className="t">{lang === "ko" ? "표" : "Table"}</div></div><div className="key">/table</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ lang, t }) {
  return (
    <section className="mk-hero">
      <div className="mk-hero-bg" />
      <div className="mk-hero-grid mk-container">
        <div className="mk-hero-copy">
          <div className="mk-eyebrow">{t.hero.eyebrow}</div>
          <h1 className="mk-h1">{t.hero.t1}<em>{t.hero.em}</em>{t.hero.t2}</h1>
          <p className="mk-lead">{t.hero.lead}</p>
          <div className="mk-hero-cta">
            <button className="mk-btn primary lg">
              <Icon name="download" size={15} /> {t.hero.installCta}
              <span className="mk-btn-badge">{t.hero.coming}</span>
            </button>
            <a className="mk-btn lg" href="https://github.com/kenshin579/markora" target="_blank" rel="noreferrer">
              <Icon name="git" size={15} /> {t.hero.githubCta}
            </a>
          </div>
          <div className="mk-hero-trust">
            {t.hero.trust.map((x, i) => (
              <React.Fragment key={x}>
                <span>{x}</span>
                {i < t.hero.trust.length - 1 && <span className="dot" />}
              </React.Fragment>
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

window.MKHero = { Nav, Hero, IDEMock };

})();

// ===== markora-body.jsx =====
(function(){
/* global React, MK */
const { Icon } = MK;

const FEATS = (lang) => ([
  { ic: "eye",   t: lang === "ko" ? "WYSIWYG 편집"   : "WYSIWYG editing",  d: lang === "ko" ? "BlockNote 기반. 미리보기 패널 없이 입력 즉시 렌더링." : "Built on BlockNote. Type and see it rendered — no preview pane.", span: true },
  { ic: "slash", t: lang === "ko" ? "슬래시 커맨드"   : "Slash commands",   d: lang === "ko" ? "/ 한 번이면 헤딩·리스트·코드·표·수식·다이어그램까지." : "Type / for headings, lists, code, tables, math, diagrams." , span: true },
  { ic: "moon",  t: lang === "ko" ? "테마 동기화"     : "Theme sync",       d: lang === "ko" ? "IDE의 다크/라이트 테마를 자동으로 따라갑니다." : "Follows your IDE's Dark / Light theme automatically." },
  { ic: "save",  t: lang === "ko" ? "자동 저장"       : "Auto-save",        d: lang === "ko" ? "디바운스 저장. 변경 즉시 안전하게 디스크에." : "Debounced saves. Your changes land safely on disk." },
  { ic: "image", t: lang === "ko" ? "이미지 드롭"     : "Image drop",       d: lang === "ko" ? "드래그·붙여넣기 한 번으로 images/ 폴더 자동 정리." : "Drag, drop, paste — auto-organized into images/." },
  { ic: "link",  t: lang === "ko" ? "외부 링크"       : "External links",   d: lang === "ko" ? "시스템 브라우저로 열어 IDE 흐름을 깨지 않습니다." : "Open in your system browser — won't break IDE flow." },
]);

function Features({ lang, t }) {
  const feats = FEATS(lang);
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
            <div key={f.t} className={"mk-feat-card" + (f.span ? " span2" : "")}>
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

function MathDemo({ lang }) {
  return (
    <div className="mk-demo-card">
      <div className="mk-demo-head">
        <div className="label">{lang === "ko" ? "LaTeX 수식 — KaTeX 렌더링" : "LaTeX math — rendered with KaTeX"}</div>
        <div className="tag">∑ /math</div>
      </div>
      <div className="mk-demo-split">
        <div className="mk-demo-pane left">
          <div className="pane-label">{lang === "ko" ? "마크다운 입력" : "Source"}</div>
          <pre>
<span className="comment">```math</span>{"\n"}\int_0^\infty e^{"{-x²}"} \,dx{"\n"}= \frac{"{\sqrt\pi}{2}"}{"\n"}<span className="comment">```</span>
          </pre>
        </div>
        <div className="mk-demo-pane">
          <div className="pane-label">{lang === "ko" ? "Markora 렌더링" : "Markora preview"}</div>
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

function MermaidDemo({ lang }) {
  return (
    <div className="mk-demo-card">
      <div className="mk-demo-head">
        <div className="label">{lang === "ko" ? "Mermaid 다이어그램" : "Mermaid diagrams"}</div>
        <div className="tag">◆ /mermaid</div>
      </div>
      <div className="mk-demo-split">
        <div className="mk-demo-pane left">
          <div className="pane-label">{lang === "ko" ? "마크다운 입력" : "Source"}</div>
          <pre>
<span className="comment">```mermaid</span>{"\n"}<span className="kw">graph</span> LR{"\n"}  A[Idea] {"-->"} B(Draft){"\n"}  B {"-->"} C{"{Ship?}"}{"\n"}  C {"-->"}|Yes| D[v1.0]{"\n"}  C {"-->"}|No| B{"\n"}<span className="comment">```</span>
          </pre>
        </div>
        <div className="mk-demo-pane">
          <div className="pane-label">{lang === "ko" ? "Markora 렌더링" : "Markora preview"}</div>
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

function Demos({ lang, t }) {
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

window.MKBody = { Features, Demos };

})();

// ===== markora-foot.jsx =====
(function(){
/* global React, MK */
const { Icon } = MK;

const SLASH_ROWS = (lang) => ([
  { cmd: "/h1, /h2, /h3", desc: lang === "ko" ? "제목 1~3 단계" : "Heading levels 1–3", group: "default" },
  { cmd: "/list, /numbered, /check", desc: lang === "ko" ? "글머리·번호·체크박스" : "Bullet, numbered, or checklist", group: "default" },
  { cmd: "/code", desc: lang === "ko" ? "코드 블록 (언어 자동 인식)" : "Code block — language-aware", group: "default" },
  { cmd: "/table", desc: lang === "ko" ? "표 삽입 — 행/열 자유 편집" : "Insert a table — add/remove rows freely", group: "default" },
  { cmd: "/image", desc: lang === "ko" ? "이미지 업로드 또는 클립보드 붙여넣기" : "Upload or paste from clipboard", group: "default" },
  { cmd: "/quote, /divider", desc: lang === "ko" ? "인용·구분선" : "Blockquote, divider", group: "default" },
  { cmd: "/math", desc: lang === "ko" ? "LaTeX 수식 블록 (KaTeX)" : "LaTeX math block (KaTeX)", group: "markora" },
  { cmd: "/equation", desc: lang === "ko" ? "인라인 수식 — $...$" : "Inline equation — $...$", group: "markora" },
  { cmd: "/mermaid", desc: lang === "ko" ? "Mermaid 다이어그램 (flow, sequence, gantt)" : "Mermaid diagram (flow, sequence, gantt)", group: "markora" },
]);

function Slash({ lang, t }) {
  const rows = SLASH_ROWS(lang);
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
                {r.group === "markora"
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

function Install({ lang, t }) {
  const steps = lang === "ko" ? [
    { h: "Marketplace 열기", p: <>JetBrains IDE에서 <code>Settings → Plugins → Marketplace</code>로 이동하세요.</> },
    { h: "“Markora” 검색 후 설치", p: <>검색창에 <code>Markora</code>를 입력하고 <strong>Install</strong>을 누른 뒤 IDE를 재시작하세요.</> },
    { h: ".md 파일에서 Markora 탭 선택", p: <>마크다운 파일을 열고 에디터 하단의 <strong>Markora</strong> 탭을 선택하면 끝.</> },
  ] : [
    { h: "Open Marketplace", p: <>In your JetBrains IDE, go to <code>Settings → Plugins → Marketplace</code>.</> },
    { h: "Search “Markora” and install", p: <>Type <code>Markora</code>, click <strong>Install</strong>, then restart your IDE.</> },
    { h: "Open any .md, pick the Markora tab", p: <>Pick the <strong>Markora</strong> tab at the bottom of the editor. Done.</> },
  ];
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

const FAQS = (lang) => (lang === "ko" ? [
  { q: "어떤 JetBrains IDE에서 동작하나요?", a: <>IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, PhpStorm, Rider, CLion 등 <strong>2024.2 이상</strong>이면 동작합니다. JCEF가 활성화되어 있어야 하고, 대부분 IDE에서 기본값으로 켜져 있어요.</> },
  { q: "기본 IntelliJ 마크다운 플러그인과 충돌하지 않나요?", a: "충돌하지 않습니다. Markora는 추가 에디터 탭으로 동작하므로, .md 파일을 열면 에디터 하단에서 Markora / Source / Preview를 자유롭게 전환할 수 있어요." },
  { q: "변경 내용은 어떻게 저장되나요?", a: "입력 즉시 디바운스 자동 저장됩니다(기본 1초). 결과물은 표준 CommonMark + GFM 호환 마크다운이라 다른 에디터에서 그대로 열 수 있어요." },
  { q: "이미지는 어디에 저장되나요?", a: <>드래그·드롭이나 클립보드 붙여넣기를 하면 같은 폴더의 <code>images/</code> 하위에 자동으로 정리됩니다. 경로는 상대 경로로 삽입돼서 Git 리포 그대로 커밋해도 안전해요.</> },
  { q: "오픈소스인가요? 기여할 수 있나요?", a: <>네, MIT 라이선스 오픈소스입니다. <a href="https://github.com/kenshin579/markora" target="_blank" rel="noreferrer">GitHub 리포지토리</a>에서 이슈와 PR을 환영합니다.</> },
] : [
  { q: "Which JetBrains IDEs are supported?", a: <>IntelliJ IDEA, WebStorm, PyCharm, GoLand, RubyMine, PhpStorm, Rider, CLion — anything <strong>2024.2 or newer</strong>. JCEF must be enabled (it is, by default).</> },
  { q: "Does it conflict with the built-in Markdown plugin?", a: "No. Markora registers as an additional editor tab, so when you open a .md file you can freely switch between Markora / Source / Preview." },
  { q: "How are changes saved?", a: "Saves are debounced as you type (default 1s). Output is standard CommonMark + GFM, so other editors open the file unchanged." },
  { q: "Where do pasted images go?", a: <>Drops and clipboard pastes are auto-organized under <code>images/</code> next to your file. The path is inserted as a relative URL, safe to commit to Git.</> },
  { q: "Is it open source? How can I contribute?", a: <>Yes — MIT licensed. Issues and PRs welcome on the <a href="https://github.com/kenshin579/markora" target="_blank" rel="noreferrer">GitHub repo</a>.</> },
]);

function FAQ({ lang, t }) {
  const items = FAQS(lang);
  const [open, setOpen] = React.useState(0);
  return (
    <section className="mk-section" id="faq">
      <div className="mk-container narrow">
        <div className="mk-section-head">
          <div className="mk-eyebrow">{t.faq.eyebrow}</div>
          <h2 className="mk-h2">{t.faq.title}</h2>
        </div>
        <div className="mk-faq">
          {items.map((item, i) => (
            <div key={i} className={"mk-faq-item" + (open === i ? " open" : "")}>
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

function FinalCTA({ lang, t }) {
  return (
    <section className="mk-cta-band">
      <div className="mk-container">
        <div className="mk-cta-card">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.lead}</p>
          <div className="mk-cta-buttons">
            <button className="mk-btn primary lg">
              <Icon name="download" size={15} /> {t.cta.primary}
            </button>
            <a className="mk-btn lg ghost" href="https://github.com/kenshin579/markora" target="_blank" rel="noreferrer">
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang, t }) {
  return (
    <footer className="mk-footer">
      <div className="mk-container mk-footer-inner">
        <div className="mk-logo">
          <div className="mk-logo-mark">M</div>
          <span>Markora</span>
        </div>
        <div className="mk-footer-links">
          {t.foot.map((x) => <a key={x} href="https://github.com/kenshin579/markora" target="_blank" rel="noreferrer">{x}</a>)}
        </div>
        <div className="mk-footer-meta">
          © 2026 kenshin579 · {lang === "ko" ? "MIT 라이선스" : "MIT License"}
        </div>
      </div>
    </footer>
  );
}

window.MKFoot = { Slash, Install, FAQ, FinalCTA, Footer };

})();

// ===== markora-app.jsx =====
(function(){
/* global React, ReactDOM, MK, MKHero, MKBody, MKFoot, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle */
const { TWEAK_DEFAULTS, ACCENTS, ACCENTS_DARK, T } = MK;
const { Nav, Hero } = MKHero;
const { Features, Demos } = MKBody;
const { Slash, Install, FAQ, FinalCTA, Footer } = MKFoot;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { lang, theme, accent } = tweaks;
  const t = T[lang];

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const palette = (theme === "dark" ? ACCENTS_DARK : ACCENTS)[accent] || ACCENTS.blue;
    const r = document.documentElement.style;
    r.setProperty("--mk-accent", palette.primary);
    r.setProperty("--mk-accent-hover", palette.hover);
    r.setProperty("--mk-accent-subtle", palette.subtle);
    r.setProperty("--mk-accent-border", palette.border);
    r.setProperty("--mk-accent-text", palette.text);
  }, [theme, accent]);

  return (
    <div>
      <Nav lang={lang} theme={theme} setTweak={setTweak} t={t} />
      <Hero lang={lang} t={t} />
      <Features lang={lang} t={t} />
      <Demos lang={lang} t={t} />
      <Slash lang={lang} t={t} />
      <Install lang={lang} t={t} />
      <FAQ lang={lang} t={t} />
      <FinalCTA lang={lang} t={t} />
      <Footer lang={lang} t={t} />

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "ko" ? "강조색" : "Accent color"} />
        <TweakRadio
          label={lang === "ko" ? "팔레트" : "Palette"}
          value={accent}
          onChange={(v) => setTweak("accent", v)}
          options={[
            { value: "blue",     label: lang === "ko" ? "블루"   : "Blue" },
            { value: "indigo",   label: lang === "ko" ? "인디고" : "Indigo" },
            { value: "purple",   label: lang === "ko" ? "퍼플"   : "Purple" },
            { value: "teal",     label: lang === "ko" ? "틸"     : "Teal" },
            { value: "green",    label: lang === "ko" ? "그린"   : "Green" },
            { value: "orange",   label: lang === "ko" ? "오렌지" : "Orange" },
            { value: "graphite", label: lang === "ko" ? "그라파이트" : "Graphite" },
          ]}
        />
        <TweakSection label={lang === "ko" ? "테마" : "Theme"} />
        <TweakRadio
          label={lang === "ko" ? "모드" : "Mode"}
          value={theme}
          onChange={(v) => setTweak("theme", v)}
          options={[
            { value: "light", label: lang === "ko" ? "라이트" : "Light" },
            { value: "dark",  label: lang === "ko" ? "다크"   : "Dark" },
          ]}
        />
        <TweakSection label={lang === "ko" ? "언어" : "Language"} />
        <TweakRadio
          label={lang === "ko" ? "표시 언어" : "Display"}
          value={lang}
          onChange={(v) => setTweak("lang", v)}
          options={[
            { value: "ko", label: "한국어" },
            { value: "en", label: "English" },
          ]}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

})();

