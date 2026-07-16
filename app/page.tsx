"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const levers = [
  { id: "energy", label: "Clean energy", hint: "Grid decarbonization", color: "#c7ff4a" },
  { id: "food", label: "Food systems", hint: "Regenerative transition", color: "#ff805d" },
  { id: "water", label: "Water resilience", hint: "Reuse + restoration", color: "#65dfff" },
  { id: "health", label: "Public health", hint: "Prevention infrastructure", color: "#ff8ccc" },
  { id: "education", label: "Education", hint: "Universal access", color: "#bd9cff" },
] as const;

const presets = [
  { name: "Balanced", values: [72, 54, 43, 61, 48] },
  { name: "Climate first", values: [96, 77, 82, 48, 55] },
  { name: "Human first", values: [67, 73, 64, 94, 91] },
  { name: "Moonshot", values: [98, 92, 88, 90, 94] },
];

function Icon({ name }: { name: "spark" | "play" | "share" | "reset" | "arrow" | "close" }) {
  const paths = {
    spark: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    share: <path d="M8 12h8M13 7l5 5-5 5M5 5v14" />,
    reset: <path d="M4 11a8 8 0 1 1 2 5.3M4 11V5m0 6h6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function Home() {
  const [values, setValues] = useState([72, 54, 43, 61, 48]);
  const [year, setYear] = useState(2045);
  const [running, setRunning] = useState(false);
  const [brief, setBrief] = useState(false);
  const [intro, setIntro] = useState(true);
  const [preset, setPreset] = useState("Balanced");
  const [announcement, setAnnouncement] = useState("Balanced pathway loaded");
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const shareRef = useRef<HTMLAnchorElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const score = useMemo(() => Math.min(100, Math.round(28 + values.reduce((a, b) => a + b, 0) / 5 * .72)), [values]);
  const temp = useMemo(() => Math.max(1.2, 3.05 - values[0] * .013 - values[2] * .003).toFixed(1), [values]);
  const lives = useMemo(() => (values[3] * 1.8 + values[1] * .6).toFixed(0), [values]);
  const outlook = score >= 88 ? "Regenerative breakthrough" : score >= 72 ? "Resilient transition" : score >= 55 ? "Fragile progress" : "Systemic risk";

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntro(false), 1550);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));

    let raf = 0;
    const updateScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
      });
    };
    const moveCursor = (event: PointerEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      const interactive = (event.target as HTMLElement).closest("a,button,input,.future-card");
      cursorRef.current?.classList.toggle("cursor-active", Boolean(interactive));
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setBrief(false); if (window.location.hash === "#mission-brief") history.replaceState(null, "", window.location.pathname + window.location.search); }
      if (event.key.toLowerCase() === "r" && !event.metaKey && !event.ctrlKey && !(event.target instanceof HTMLInputElement)) document.querySelector<HTMLButtonElement>("[data-run-simulation]")?.click();
    };
    const onHash = () => setBrief(window.location.hash === "#mission-brief");
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    updateScroll();
    return () => {
      window.clearTimeout(introTimer);
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    if (!brief) return;
    const trigger = shareRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const dialog = closeRef.current?.closest("[role=dialog]");
      const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])") ?? []);
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", trapFocus); trigger?.focus(); };
  }, [brief]);

  const reset = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setValues(presets[0].values); setYear(2045); setRunning(false); setPreset("Balanced"); setAnnouncement("Simulation reset to Balanced");
  };

  const applyPreset = (name: string, nextValues: number[]) => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setValues(nextValues); setPreset(name); setYear(2045); setRunning(false); setAnnouncement(`${name} pathway loaded`);
  };

  const simulate = () => {
    if (running) return;
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setYear(2100); setRunning(false); setAnnouncement(`Simulation complete. ${outlook}. Planetary score ${score}.`); return;
    }
    setRunning(true); setAnnouncement("Simulation running to the year 2100");
    const startYear = year >= 2100 ? 2045 : year;
    const startedAt = performance.now();
    setYear(startYear);
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 1800);
      setYear(Math.round(startYear + (2100 - startYear) * progress));
      if (progress < 1) timerRef.current = requestAnimationFrame(tick);
      else { timerRef.current = null; setRunning(false); setAnnouncement(`Simulation complete. ${outlook}. Planetary score ${score}.`); }
    };
    timerRef.current = requestAnimationFrame(tick);
  };

  const tilt = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 7}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 9}deg`);
  };

  const resetTilt = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const closeBrief = () => {
    setBrief(false);
    if (window.location.hash === "#mission-brief") history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  const movePlanet = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--px", `${(event.clientX - rect.left) / rect.width * 100}%`);
    event.currentTarget.style.setProperty("--py", `${(event.clientY - rect.top) / rect.height * 100}%`);
    event.currentTarget.style.setProperty("--prx", `${((event.clientY - rect.top) / rect.height - .5) * -12}deg`);
    event.currentTarget.style.setProperty("--pry", `${((event.clientX - rect.left) / rect.width - .5) * 14}deg`);
  };

  return (
    <main>
      <div className={`preloader ${intro ? "preloader-on" : "preloader-off"}`} aria-hidden={!intro}>
        <div className="preloader-code">H/A — 001</div><div className="preloader-word"><span>DESIGN</span><span>TOMORROW</span></div><div className="preloader-line"><i /></div>
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" /><div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Horizon Atlas home"><span className="brandmark"><i /><i /><i /></span><span>HORIZON<span>/</span>ATLAS</span></a>
        <nav aria-label="Primary navigation"><a href="#lab"><b>01</b> Lab</a><a href="#compare"><b>02</b> Futures</a><a href="#method"><b>03</b> Method</a></nav>
        <div className="top-actions"><span className="live"><i /> MODEL ONLINE</span><a ref={shareRef} href="#mission-brief" className="icon-button magnetic" onClick={() => setBrief(true)} aria-label="Open shareable brief"><Icon name="share" /></a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-index" aria-hidden="true">01 — 04</div>
        <div className="eyebrow"><span>PLANETARY INTELLIGENCE / 001</span><span>EARTH SYSTEM DIGITAL TWIN</span></div>
        <div className="hero-copy">
          <p className="kicker hero-stagger s1">THE FUTURE IS A DESIGN SPACE</p>
          <h1 aria-label="We design what happens next">
            <span className="hero-line hero-stagger s2">WE <em>DESIGN</em></span>
            <span className="hero-line hero-stagger s3">WHAT HAPPENS</span>
            <span className="hero-line hero-stagger s4">NEXT<span className="acid-dot">.</span></span>
          </h1>
          <div className="hero-bottom hero-stagger s5"><p className="lede">A living systems model for testing humanity&apos;s biggest decisions—before we make them in the real world.</p><a className="round-link magnetic" href="#lab"><span>ENTER<br/>THE LAB</span><Icon name="arrow" /></a></div>
        </div>
        <div className="planet" onPointerMove={movePlanet} onPointerLeave={e => { e.currentTarget.style.setProperty("--prx", "0deg"); e.currentTarget.style.setProperty("--pry", "0deg"); }} aria-label="Interactive abstract visualization of the Earth system">
          <div className="planet-glow"/><div className="orbit orbit-a"><i/></div><div className="orbit orbit-b"><i/></div><div className="globe"><div className="land land-a"/><div className="land land-b"/><div className="scan"/><div className="globe-shine"/></div>
          <div className="coordinate c1">34.08° N<br/>118.24° W</div><div className="coordinate c2"><i/> SYSTEM<br/>STABLE</div>
        </div>
        <div className="hero-stats hero-stagger s6"><div><strong>8.1B</strong><span>HUMANS IN MODEL</span></div><div><strong>195</strong><span>COUNTRY SYSTEMS</span></div><div><strong>76</strong><span>LIVE INDICATORS</span></div></div>
        <a href="#manifesto" className="scroll-cue" aria-label="Scroll to continue"><span>SCROLL TO EXPLORE</span><i /></a>
      </section>

      <div className="marquee" aria-hidden="true"><div><span>MODEL THE IMPOSSIBLE</span><i>✦</i><span>MOVE ONE LEVER</span><i>✦</i><span>CHANGE EVERYTHING</span><i>✦</i><span>MODEL THE IMPOSSIBLE</span><i>✦</i><span>MOVE ONE LEVER</span><i>✦</i><span>CHANGE EVERYTHING</span><i>✦</i></div></div>

      <section className="manifesto" id="manifesto" data-reveal>
        <span className="section-no">00 / MANIFESTO</span><p>Eight billion people share one future.</p><h2>WE DON&apos;T NEED<br/>MORE <span>FORECASTS.</span><br/>WE NEED BETTER<br/><em>DECISIONS.</em></h2><div className="manifesto-note"><span>THIS IS NOT A CRYSTAL BALL.</span><p>It is a consequence machine—built to expose trade-offs, reveal second-order effects, and make systems thinking tangible.</p></div>
      </section>

      <section className="lab" id="lab">
        <div className="section-head" data-reveal><div><span className="section-no">01 / INTERVENTION LAB</span><h2>Move a lever.<br/><em>Watch the world respond.</em></h2></div><p className="section-intro">Adjust investment intensity, run the model, and inspect cascading effects across climate, prosperity, and human wellbeing.</p></div>
        <div className="preset-bar" data-reveal><span>LOAD A PATHWAY</span><div>{presets.map(item => <button key={item.name} className={preset === item.name ? "active" : ""} aria-pressed={preset === item.name} onClick={() => applyPreset(item.name, item.values)}>{item.name}<i /></button>)}</div></div>
        <div className={`console ${running ? "simulation-active" : ""}`} data-reveal>
          <aside className="levers">
            <div className="panel-label"><span>POLICY LEVERS</span><button onClick={reset}><Icon name="reset"/> RESET</button></div>
            {levers.map((lever, i) => <label className="lever" key={lever.id}>
              <div><span className="lever-dot" style={{background: lever.color, boxShadow:`0 0 14px ${lever.color}`}}/><strong>{lever.label}</strong><output>{values[i]}%</output></div><small>{lever.hint}</small>
              <input aria-label={`${lever.label} investment`} type="range" min="0" max="100" value={values[i]} onChange={e => { setValues(v => v.map((n,j) => j === i ? +e.target.value : n)); setPreset("Custom"); setAnnouncement(`${lever.label} set to ${e.target.value} percent`); }} style={{"--accent": lever.color, "--value": `${values[i]}%`} as React.CSSProperties}/>
            </label>)}
            <button className="run magnetic" data-run-simulation onClick={simulate} disabled={running}><span className="button-fill"/><Icon name="play" /><span>{running ? "SIMULATING…" : year >= 2100 ? "RUN AGAIN" : "RUN TO 2100"}</span><kbd>R</kbd></button>
          </aside>
          <div className="model">
            <div className="model-top"><span>PROJECT {preset.toUpperCase()} / LIVE MODEL</span><strong className={running ? "year-running" : ""}>{year}</strong><span>CONFIDENCE 86%</span></div>
            <div className="world-map" aria-hidden="true"><div className="shockwave"/><div className="grid"/><div className="continent americas"/><div className="continent eurasia"/><div className="continent africa"/><div className="continent australia"/>{[1,2,3,4,5,6,7,8].map(n=><i key={n} className={`pulse p${n}`}/>)}</div>
            <div className="outlook"><span>MODEL INTERPRETATION</span><strong>{outlook}</strong><i style={{width:`${score}%`}}/></div>
            <div className="outcomes"><div><span>PLANETARY SCORE</span><strong>{score}<small>/100</small></strong><b className="positive">↑ {Math.max(0,score-38)} PTS</b></div><div><span>WARMING PATH</span><strong>+{temp}<small>°C</small></strong><b className="positive">↓ FROM 2.7°C</b></div><div><span>LIVES IMPROVED</span><strong>{lives}<small>M</small></strong><b className="positive">BY 2050</b></div><div><span>GLOBAL OUTPUT</span><strong>+{(values[4]*.08).toFixed(1)}<small>%</small></strong><b className="positive">NET EFFECT</b></div></div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </section>

      <section className="compare" id="compare">
        <div className="section-head" data-reveal><div><span className="section-no">02 / FUTURE COMPARISON</span><h2>Two timelines.<br/><em>One choice.</em></h2></div><p className="section-intro">Hover to inspect the shape of each future. The brighter timeline is not guaranteed—it is constructed.</p></div>
        <div className="future-grid">
          <article className="future-card baseline" onPointerMove={tilt} onPointerLeave={resetTilt} data-reveal><div className="future-no">FUTURE / 01</div><div className="future-visual"><span className="sun"><i/></span><strong>38</strong><small>RESILIENCE</small></div><div className="future-title"><h3>Current<br/>trajectory</h3><b>+2.7°C</b></div><div className="future-bars" role="img" aria-label="Baseline: climate stability 32 percent, human development 51 percent, economic resilience 44 percent"><span>Climate stability <i style={{width:"32%"}}/></span><span>Human development <i style={{width:"51%"}}/></span><span>Economic resilience <i style={{width:"44%"}}/></span></div><button className="load-future" onClick={() => applyPreset("Baseline", [35,35,35,35,35])}>LOAD BASELINE <Icon name="arrow"/></button><p className="future-caption">INHERITED FUTURE</p></article>
          <article className="future-card designed" onPointerMove={tilt} onPointerLeave={resetTilt} data-reveal><div className="future-no">FUTURE / 02</div><div className="future-visual"><span className="sun"><i/></span><strong>{score}</strong><small>RESILIENCE</small></div><div className="future-title"><h3>{preset}<br/>pathway</h3><b>+{temp}°C</b></div><div className="future-bars" role="img" aria-label={`${preset}: climate stability ${score} percent, human development ${Math.min(96,score+8)} percent, economic resilience ${Math.min(94,score+3)} percent`}><span>Climate stability <i style={{width:`${score}%`}}/></span><span>Human development <i style={{width:`${Math.min(96,score+8)}%`}}/></span><span>Economic resilience <i style={{width:`${Math.min(94,score+3)}%`}}/></span></div><button className="load-future" onClick={() => applyPreset("Moonshot", presets[3].values)}>LOAD MOONSHOT <Icon name="arrow"/></button><p className="future-caption">DESIGNED FUTURE</p></article>
        </div>
      </section>

      <section className="method" id="method" data-reveal><span className="section-no">03 / THE MODEL</span><div><h2>Built for curiosity.<br/>Grounded in <em>evidence.</em></h2></div><div className="method-copy"><p>Horizon Atlas is a transparent educational systems model. Its relationships are calibrated from public indicators across energy, health, food, water, education, and economic development.</p><p>It does not predict the future. It makes assumptions visible—so better questions can be asked.</p><a className="text-link" href="https://ourworldindata.org/explorers" target="_blank" rel="noreferrer">EXPLORE SOURCE DATA <Icon name="arrow"/></a></div></section>
      <section className="finale" data-reveal><span>YOUR MOVE.</span><h2>THE FUTURE<br/>IS WAITING.</h2><button className="finale-button magnetic" onClick={()=>document.querySelector("#lab")?.scrollIntoView({behavior:"smooth"})}><span>DESIGN A FUTURE</span><Icon name="arrow"/></button></section>
      <footer><div className="brand"><span className="brandmark"><i/><i/><i/></span><span>HORIZON<span>/</span>ATLAS</span></div><p>WHAT FUTURE WILL YOU DESIGN?</p><span>OPEN MODEL / 2026</span></footer>

      {brief && <div id="mission-brief" className="modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" aria-describedby="brief-description" onMouseDown={e => e.target === e.currentTarget && closeBrief()}><div className="brief"><button ref={closeRef} className="close" onClick={closeBrief} aria-label="Close brief"><Icon name="close"/></button><span className="section-no">MISSION BRIEF / {year}</span><h2 id="brief-title">Project {preset}</h2><p className="brief-sub" id="brief-description">A designed pathway toward a more resilient human future.</p><div className="brief-metrics"><div><strong>{score}</strong><span>PLANETARY SCORE</span></div><div><strong>+{temp}°C</strong><span>WARMING PATH</span></div><div><strong>{lives}M</strong><span>LIVES IMPROVED</span></div></div><p className="brief-note">Highest-leverage action: accelerate clean energy while pairing the transition with public health and universal education investment.</p><button className="run" onClick={() => window.print()}><Icon name="share"/><span>PRINT / SAVE BRIEF</span></button></div></div>}
    </main>
  );
}
