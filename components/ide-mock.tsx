type Lang = 'en' | 'ko';

export function IDEMock({ lang }: { lang: Lang }) {
  const docTitle = lang === 'ko' ? '스프린트 23 — 킥오프' : 'Sprint 23 — kickoff';
  const meta = lang === 'ko' ? '수정: 방금 전 · 4명' : 'Edited just now · 4 authors';

  return (
    <div className="mk-ide">
      <div className="mk-ide-titlebar">
        <div className="mk-ide-dots">
          <div className="mk-ide-dot" style={{ background: '#ff5f57' }} />
          <div className="mk-ide-dot" style={{ background: '#febc2e' }} />
          <div className="mk-ide-dot" style={{ background: '#28c840' }} />
        </div>
        <div className="mk-ide-title">markora — IntelliJ IDEA 2024.2</div>
        <div style={{ width: 56 }} />
      </div>
      <div className="mk-ide-tabbar">
        <div className="mk-ide-tab">README.md</div>
        <div className="mk-ide-tab active">
          <span style={{ color: 'var(--mk-accent)', marginRight: 6 }}>●</span> NOTES.md
        </div>
        <div className="mk-ide-tab">build.gradle.kts</div>
      </div>
      <div className="mk-ide-toolbar">
        <div className="mk-ide-tool active">Markora</div>
        <div className="mk-ide-tool">Source</div>
        <div className="mk-ide-tool">Preview</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="mk-ide-saved">●</span> {lang === 'ko' ? '자동 저장됨' : 'Auto-saved'}
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
              {lang === 'ko' ? '이번 스프린트의 목표·담당자·리스크. 인라인 수식은 ' : 'Goals, owners, risks for this sprint. Inline math like '}
              <span className="doc-math-inline">E = mc²</span>
              {lang === 'ko' ? '처럼 그대로 렌더링됩니다.' : ' renders as you type.'}
            </p>
          </div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <h2 className="doc-h2">{lang === 'ko' ? '할 일' : 'To do'}</h2>
          </div>

          <div className="doc-block">
            <span className="doc-handle">⋮⋮</span>
            <div style={{ flex: 1 }}>
              <div className="doc-li done"><div className="checkbox checked" /><span className="doc-li-text">{lang === 'ko' ? 'BlockNote 0.18로 마이그레이션' : 'Migrate to BlockNote 0.18'}</span></div>
              <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === 'ko' ? 'JCEF 메모리 누수 수정' : 'Fix JCEF memory leak'}</span></div>
              <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === 'ko' ? '이미지 붙여넣기 경로 처리' : 'Handle clipboard image paths'}</span></div>
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
              <div className="doc-slash-header">{lang === 'ko' ? 'Markora 전용' : 'Markora only'}</div>
              <div className="doc-slash-item highlighted">
                <div className="icon">∑</div>
                <div className="text"><div className="t">{lang === 'ko' ? '수식 블록' : 'Math block'}</div><div className="s">{lang === 'ko' ? 'LaTeX, KaTeX 렌더' : 'LaTeX, rendered with KaTeX'}</div></div>
                <div className="key">/math</div>
              </div>
              <div className="doc-slash-item">
                <div className="icon">$</div>
                <div className="text"><div className="t">{lang === 'ko' ? '인라인 수식' : 'Inline equation'}</div><div className="s">$...$</div></div>
                <div className="key">/eq</div>
              </div>
              <div className="doc-slash-item">
                <div className="icon">◆</div>
                <div className="text"><div className="t">{lang === 'ko' ? 'Mermaid 다이어그램' : 'Mermaid diagram'}</div><div className="s">{lang === 'ko' ? '플로우, 시퀀스, 간트' : 'Flow, sequence, gantt'}</div></div>
                <div className="key">/mer</div>
              </div>
              <div className="doc-slash-divider" />
              <div className="doc-slash-header">{lang === 'ko' ? '기본 블록' : 'Defaults'}</div>
              <div className="doc-slash-item"><div className="icon">H₁</div><div className="text"><div className="t">{lang === 'ko' ? '제목 1' : 'Heading 1'}</div></div><div className="key">/h1</div></div>
              <div className="doc-slash-item"><div className="icon">≡</div><div className="text"><div className="t">{lang === 'ko' ? '표' : 'Table'}</div></div><div className="key">/table</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
