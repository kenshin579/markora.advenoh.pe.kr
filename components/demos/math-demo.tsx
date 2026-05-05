type Lang = 'en' | 'ko';

export function MathDemo({ lang }: { lang: Lang }) {
  return (
    <div className="mk-demo-card">
      <div className="mk-demo-head">
        <div className="label">{lang === 'ko' ? 'LaTeX 수식 — KaTeX 렌더링' : 'LaTeX math — rendered with KaTeX'}</div>
        <div className="tag">∑ /math</div>
      </div>
      <div className="mk-demo-split">
        <div className="mk-demo-pane left">
          <div className="pane-label">{lang === 'ko' ? '마크다운 입력' : 'Source'}</div>
          <pre>
            <span className="comment">{'```math'}</span>
            {'\n'}
            {'\\int_0^\\infty e^{-x²} \\,dx'}
            {'\n'}
            {'= \\frac{\\sqrt\\pi}{2}'}
            {'\n'}
            <span className="comment">{'```'}</span>
          </pre>
        </div>
        <div className="mk-demo-pane">
          <div className="pane-label">{lang === 'ko' ? 'Markora 렌더링' : 'Markora preview'}</div>
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
