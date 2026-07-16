"use client";

import { useMemo, useState } from "react";

const levers = [
  { id: "energy", label: "Clean energy", hint: "Grid decarbonization", color: "#72f1b8" },
  { id: "food", label: "Food systems", hint: "Regenerative transition", color: "#e7ff78" },
  { id: "water", label: "Water resilience", hint: "Reuse + restoration", color: "#78d7ff" },
  { id: "health", label: "Public health", hint: "Prevention infrastructure", color: "#ff9bce" },
  { id: "education", label: "Education", hint: "Universal access", color: "#c3a6ff" },
] as const;

const scenarios = [
  { name: "Current trajectory", score: 38, temp: "+2.7°", year: "2100", tone: "risk" },
  { name: "Project Aurora", score: 82, temp: "+1.6°", year: "2100", tone: "good" },
];

function Icon({ name }: { name: "spark" | "play" | "share" | "reset" | "arrow" }) {
  const paths = {
    spark: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    share: <path d="M8 12h8M13 7l5 5-5 5M5 5v14" />,
    reset: <path d="M4 11a8 8 0 1 1 2 5.3M4 11V5m0 6h6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function Home() {
  const [values, setValues] = useState([72, 54, 43, 61, 48]);
  const [year, setYear] = useState(2045);
  const [running, setRunning] = useState(false);
  const [brief, setBrief] = useState(false);
  const score = useMemo(() => Math.round(28 + values.reduce((a, b) => a + b, 0) / 5 * .72), [values]);
  const temp = useMemo(() => (3.05 - values[0] * .013 - values[2] * .003).toFixed(1), [values]);
  const lives = useMemo(() => (values[3] * 1.8 + values[1] * .6).toFixed(0), [values]);
  const reset = () => { setValues([72, 54, 43, 61, 48]); setYear(2045); setRunning(false); };
  const simulate = () => { setRunning(true); let y = year; const timer = setInterval(() => { y += 1; setYear(y); if (y >= 2100) { clearInterval(timer); setRunning(false); } }, 24); };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Horizon Atlas home"><span className="brandmark"><i /><i /><i /></span><span>HORIZON<span>/</span>ATLAS</span></a>
        <nav aria-label="Primary navigation"><a href="#lab">Simulation lab</a><a href="#compare">Futures</a><a href="#method">Method</a></nav>
        <div className="top-actions"><span className="live"><i /> MODEL ONLINE</span><button className="icon-button" onClick={() => setBrief(true)} aria-label="Open shareable brief"><Icon name="share" /></button></div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span>PLANETARY INTELLIGENCE / 01</span><span>EARTH SYSTEM DIGITAL TWIN</span></div>
        <div className="hero-copy">
          <p className="kicker">THE FUTURE IS NOT SOMETHING<br />THAT HAPPENS TO US.</p>
          <h1>WE <em>DESIGN</em><br />WHAT HAPPENS<br />NEXT.</h1>
          <p className="lede">A living systems model for testing humanity&apos;s biggest decisions—before we make them in the real world.</p>
          <a className="text-link" href="#lab">ENTER THE SIMULATION <Icon name="arrow" /></a>
        </div>
        <div className="planet" aria-label="Abstract visualization of the Earth system">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="globe"><div className="land land-a"/><div className="land land-b"/><div className="scan"/></div>
          <div className="coordinate c1">34.08° N<br/>118.24° W</div><div className="coordinate c2">SYSTEM<br/>STABLE</div>
        </div>
        <div className="hero-stats"><div><strong>8.1B</strong><span>HUMANS IN MODEL</span></div><div><strong>195</strong><span>COUNTRY SYSTEMS</span></div><div><strong>76</strong><span>LIVE INDICATORS</span></div></div>
      </section>

      <section className="lab" id="lab">
        <div className="section-head"><div><span className="section-no">02</span><p>INTERVENTION LAB</p><h2>Move a lever.<br/><em>Watch the world respond.</em></h2></div><p className="section-intro">Every intervention creates ripples. Adjust investment intensity, run the model, and inspect cascading effects across climate, prosperity, and human wellbeing.</p></div>
        <div className="console">
          <aside className="levers">
            <div className="panel-label"><span>POLICY LEVERS</span><button onClick={reset}><Icon name="reset"/> RESET</button></div>
            {levers.map((lever, i) => <label className="lever" key={lever.id}>
              <div><span className="lever-dot" style={{background: lever.color}}/><strong>{lever.label}</strong><output>{values[i]}%</output></div><small>{lever.hint}</small>
              <input aria-label={`${lever.label} investment`} type="range" min="0" max="100" value={values[i]} onChange={e => setValues(v => v.map((n,j) => j === i ? +e.target.value : n))} style={{"--accent": lever.color, "--value": `${values[i]}%`} as React.CSSProperties}/>
            </label>)}
            <button className="run" onClick={simulate} disabled={running || year >= 2100}><Icon name="play" />{running ? "SIMULATING…" : year >= 2100 ? "SIMULATION COMPLETE" : "RUN TO 2100"}</button>
          </aside>
          <div className="model">
            <div className="model-top"><span>PROJECT AURORA / LIVE MODEL</span><strong>{year}</strong><span>CONFIDENCE 86%</span></div>
            <div className="world-map" aria-hidden="true"><div className="grid"/><div className="continent americas"/><div className="continent eurasia"/><div className="continent africa"/><div className="continent australia"/>{[1,2,3,4,5,6,7,8].map(n=><i key={n} className={`pulse p${n}`}/>)}</div>
            <div className="outcomes"><div><span>PLANETARY SCORE</span><strong>{score}<small>/100</small></strong><b className="positive">↑ {Math.max(0,score-38)} pts</b></div><div><span>WARMING PATH</span><strong>+{temp}<small>°C</small></strong><b className="positive">↓ 1.1°C</b></div><div><span>LIVES IMPROVED</span><strong>{lives}<small>M</small></strong><b className="positive">BY 2050</b></div><div><span>GLOBAL OUTPUT</span><strong>+{(values[4]*.08).toFixed(1)}<small>%</small></strong><b className="positive">NET EFFECT</b></div></div>
          </div>
        </div>
      </section>

      <section className="compare" id="compare">
        <div className="section-head"><div><span className="section-no">03</span><p>FUTURE COMPARISON</p><h2>Two timelines.<br/><em>One choice.</em></h2></div></div>
        <div className="future-grid">{scenarios.map((s,i)=><article key={s.name} className={i ? "selected" : ""}><div className="future-title"><span>0{i+1}</span><h3>{s.name}</h3><b>{i ? "DESIGNED" : "BASELINE"}</b></div><div className="future-score"><div className="ring" style={{"--score": `${s.score*3.6}deg`} as React.CSSProperties}><strong>{i ? score : s.score}</strong><small>RESILIENCE</small></div><div><p>WARMING BY {s.year}</p><strong>{i ? `+${temp}°` : s.temp}</strong></div></div><div className="future-bars"><span>Climate stability <i style={{width:`${i ? score : 32}%`}}/></span><span>Human development <i style={{width:`${i ? Math.min(96, score+8) : 51}%`}}/></span><span>Economic resilience <i style={{width:`${i ? Math.min(94,score+3) : 44}%`}}/></span></div></article>)}</div>
      </section>

      <section className="method" id="method"><span className="section-no">04</span><div><p>THE MODEL</p><h2>Built for curiosity.<br/>Grounded in <em>evidence.</em></h2></div><div className="method-copy"><p>Horizon Atlas is a transparent educational systems model. Its relationships are calibrated from public indicators across energy, health, food, water, education, and economic development.</p><p>It does not predict the future. It makes assumptions visible—so better questions can be asked.</p><a className="text-link" href="https://ourworldindata.org/explorers" target="_blank" rel="noreferrer">EXPLORE SOURCE DATA <Icon name="arrow"/></a></div></section>
      <footer><div className="brand"><span className="brandmark"><i/><i/><i/></span><span>HORIZON<span>/</span>ATLAS</span></div><p>WHAT FUTURE WILL YOU DESIGN?</p><span>OPEN MODEL / 2026</span></footer>

      {brief && <div className="modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" onMouseDown={e => e.target === e.currentTarget && setBrief(false)}><div className="brief"><button className="close" onClick={()=>setBrief(false)} aria-label="Close brief">×</button><span className="section-no">MISSION BRIEF / {year}</span><h2 id="brief-title">Project Aurora</h2><p className="brief-sub">A designed pathway toward a more resilient human future.</p><div className="brief-metrics"><div><strong>{score}</strong><span>PLANETARY SCORE</span></div><div><strong>+{temp}°C</strong><span>WARMING PATH</span></div><div><strong>{lives}M</strong><span>LIVES IMPROVED</span></div></div><p className="brief-note">Highest-leverage action: accelerate clean energy while pairing the transition with public health and universal education investment.</p><button className="run" onClick={() => window.print()}><Icon name="share"/> PRINT / SAVE BRIEF</button></div></div>}
    </main>
  );
}
