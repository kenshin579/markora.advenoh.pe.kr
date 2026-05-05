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
