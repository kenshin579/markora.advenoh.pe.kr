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
