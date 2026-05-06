type Lang = 'en' | 'ko';

export function IDEMock({ lang }: { lang: Lang }) {
  const docTitle = lang === 'ko' ? '스프린트 23 — 킥오프' : 'Sprint 23 — kickoff';
  const meta = lang === 'ko' ? '수정: 방금 전 · 4명' : 'Edited just now · 4 authors';
  const projectLabel = lang === 'ko' ? '프로젝트' : 'Project';

  return (
    <div className="mk-ide">
      <div className="mk-ide-titlebar">
        <div className="mk-ide-dots">
          <div className="mk-ide-dot" style={{ background: '#ff5f57' }} />
          <div className="mk-ide-dot" style={{ background: '#febc2e' }} />
          <div className="mk-ide-dot" style={{ background: '#28c840' }} />
        </div>
        <div className="mk-ide-frame-tabs">
          <div className="mk-ide-frame-tab active">markora</div>
          <div className="mk-ide-frame-tab">Version control</div>
        </div>
        <div className="mk-ide-frame-actions">
          <span className="mk-ide-current-file">Current File ▾</span>
          <span className="mk-ide-icon-btn">⋯</span>
          <span className="mk-ide-icon-btn">⌕</span>
          <span className="mk-ide-icon-btn">⚙</span>
        </div>
      </div>

      <div className="mk-ide-tabbar">
        <div className="mk-ide-tab">
          <span className="mk-ide-file-icon md">MD</span>README.md
        </div>
        <div className="mk-ide-tab active">
          <span className="mk-ide-file-icon md">MD</span>NOTES.md
          <span className="mk-ide-tab-close">×</span>
        </div>
        <div className="mk-ide-tab">
          <span className="mk-ide-file-icon kt">KT</span>build.gradle.kts
        </div>
      </div>

      <div className="mk-ide-body">
        <div className="mk-ide-sidebar">
          <div className="mk-ide-sidebar-header">
            <span className="caret">▾</span> {projectLabel}
          </div>
          <div className="row dim"><span className="caret">▾</span><span className="folder-icon" /> markora</div>
          <div className="row indent"><span className="caret">▸</span><span className="folder-icon" /> .gradle</div>
          <div className="row indent"><span className="caret">▸</span><span className="folder-icon" /> src</div>
          <div className="row indent"><span className="caret">▾</span><span className="folder-icon open" /> docs</div>
          <div className="row indent2 file"><span className="file-icon md" /> README.md</div>
          <div className="row indent2 file active"><span className="file-icon md" /> NOTES.md</div>
          <div className="row indent2 file"><span className="file-icon md" /> spec.md</div>
          <div className="row indent2 file"><span className="file-icon md" /> changelog.md</div>
          <div className="row indent file"><span className="file-icon kt" /> build.gradle.kts</div>
          <div className="row indent file"><span className="file-icon plain" /> .gitignore</div>
        </div>

        <div className="mk-ide-editor-wrap">
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
                <div className="doc-li"><div className="checkbox" /><span className="doc-li-text">{lang === 'ko' ? '/image 다이얼로그 단축키 추가' : 'Add /image dialog shortcut'}</span></div>
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

          <div className="mk-ide-modetabs">
            <div className="mk-ide-modetab">Markdown Split Editor</div>
            <div className="mk-ide-modetab active">Markora</div>
            <div className="mk-ide-modetabs-saved">
              <span className="mk-ide-saved-dot" /> {lang === 'ko' ? '자동 저장됨' : 'Auto-saved'}
            </div>
          </div>
        </div>
      </div>

      <div className="mk-ide-statusbar">
        <span className="mk-ide-statusbar-burger">≡</span>
        <span className="mk-ide-crumb">markora</span>
        <span className="mk-ide-crumb-sep">›</span>
        <span className="mk-ide-crumb">docs</span>
        <span className="mk-ide-crumb-sep">›</span>
        <span className="mk-ide-crumb current">NOTES.md</span>
        <span className="mk-ide-statusbar-spacer" />
        <span className="mk-ide-status-pill">main</span>
        <span className="mk-ide-status-pill muted">UTF-8</span>
        <span className="mk-ide-status-pill muted">LF</span>
      </div>
    </div>
  );
}
