type Lang = 'en' | 'ko';

export function MermaidDemo({ lang }: { lang: Lang }) {
  return (
    <div className="mk-demo-card">
      <div className="mk-demo-head">
        <div className="label">{lang === 'ko' ? 'Mermaid 다이어그램' : 'Mermaid diagrams'}</div>
        <div className="tag">◆ /mermaid</div>
      </div>
      <div className="mk-demo-split">
        <div className="mk-demo-pane left">
          <div className="pane-label">{lang === 'ko' ? '마크다운 입력' : 'Source'}</div>
          <pre>
            <span className="comment">{'```mermaid'}</span>
            {'\n'}
            <span className="kw">graph</span> LR{'\n'}
            {'  A[Idea] --> B(Draft)\n'}
            {'  B --> C{Ship?}\n'}
            {'  C -->|Yes| D[v1.0]\n'}
            {'  C -->|No| B\n'}
            <span className="comment">{'```'}</span>
          </pre>
        </div>
        <div className="mk-demo-pane">
          <div className="pane-label">{lang === 'ko' ? 'Markora 렌더링' : 'Markora preview'}</div>
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
