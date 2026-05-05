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
