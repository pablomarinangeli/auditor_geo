/* ============================================================
   Shell + primitivos UI · Auditor GEO
   ============================================================ */
const { useState, useEffect, useMemo, useRef } = React;
const B = window.BRAND;

/* ---------- helpers ---------- */
function cx(...a){ return a.filter(Boolean).join(" "); }
function lerpColor(score){ // 0..100 -> rojo→gold→teal
  if (score >= 67) return B.teal;
  if (score >= 40) return B.gold;
  return "#ff5d8f";
}

/* ---------- Logo ---------- */
function Logo({ height=26 }){
  return <img src="assets/smartfran-white.png" alt="SmartFran" style={{height, width:"auto", display:"block"}} />;
}

/* ---------- Brand dot ---------- */
function Dot({ color, size=8 }){
  return <span style={{width:size, height:size, borderRadius:"50%", background:color, display:"inline-block", flex:"0 0 auto"}} />;
}

/* ---------- Engine chip ---------- */
function EngineChip({ engine, active, onClick }){
  return (
    <button className={cx("eng-chip", active && "on")} onClick={onClick} type="button"
      style={active ? {borderColor:engine.color, boxShadow:`inset 0 0 0 1px ${engine.color}`} : {}}>
      <Dot color={engine.color} />
      <span>{engine.name}</span>
    </button>
  );
}

/* ---------- Pill / badge ---------- */
function Pill({ children, tone="default" }){
  const tones = {
    default:{bg:"rgba(110,89,238,.14)", fg:B.peri, bd:"rgba(110,89,238,.3)"},
    principal:{bg:"rgba(44,206,215,.14)", fg:B.teal, bd:"rgba(44,206,215,.35)"},
    secundaria:{bg:"rgba(240,176,52,.14)", fg:B.gold, bd:"rgba(240,176,52,.35)"},
    ausente:{bg:"rgba(255,93,143,.12)", fg:"#ff8fb0", bd:"rgba(255,93,143,.3)"},
    purple:{bg:"rgba(174,0,255,.16)", fg:"#d98bff", bd:"rgba(174,0,255,.4)"},
  };
  const t = tones[tone] || tones.default;
  return <span className="pill" style={{background:t.bg, color:t.fg, border:`1px solid ${t.bd}`}}>{children}</span>;
}

function LevelDot({ level }){
  const map = { Alto:B.teal, Medio:B.gold, Bajo:"#ff5d8f" };
  return (
    <span style={{display:"inline-flex", alignItems:"center", gap:7, fontWeight:600, color:map[level]}}>
      <Dot color={map[level]} size={7}/> {level}
    </span>
  );
}

/* ---------- Trend ---------- */
function Trend({ v }){
  if (v === 0) return <span style={{color:B.faint, fontWeight:600}}>—</span>;
  const up = v > 0;
  return <span style={{color: up?B.teal:"#ff5d8f", fontWeight:700, fontSize:13}}>{up?"▲":"▼"} {Math.abs(v)}</span>;
}

/* ---------- Score ring (SVG) ---------- */
function ScoreRing({ value, size=120, stroke=10, label, sub }){
  const r = (size - stroke)/2, c = 2*Math.PI*r;
  const off = c * (1 - value/100);
  const col = lerpColor(value);
  return (
    <div style={{position:"relative", width:size, height:size}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{transition:"stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)"}}/>
      </svg>
      <div style={{position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:size*0.27, lineHeight:1, color:B.ink}}>{value}</div>
        {sub && <div style={{fontSize:10, letterSpacing:".08em", textTransform:"uppercase", color:B.faint, marginTop:4}}>{sub}</div>}
      </div>
    </div>
  );
}

/* ---------- Horizontal bar ---------- */
function Bar({ value, max=100, color, focus, height=10, showVal=true, suffix="" }){
  const pct = Math.max(2, (value/max)*100);
  return (
    <div style={{display:"flex", alignItems:"center", gap:10, width:"100%"}}>
      <div className="bar-track" style={{height}}>
        <div className="bar-fill" style={{width:`${pct}%`, height, background: color || (focus?B.purple:B.peri),
          boxShadow: focus?`0 0 14px ${B.purple}88`:"none"}} />
      </div>
      {showVal && <span className="bar-val" style={{color: focus?B.ink:B.sub}}>{value}{suffix}</span>}
    </div>
  );
}

/* ---------- Card ---------- */
function Card({ children, pad=22, className, style }){
  return <div className={cx("card", className)} style={{padding:pad, ...style}}>{children}</div>;
}

/* ---------- Section title ---------- */
function PageHeader({ eyebrow, title, desc, right }){
  return (
    <div className="page-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {desc && <p className="page-desc">{desc}</p>}
      </div>
      {right && <div className="page-head-right">{right}</div>}
    </div>
  );
}

/* ---------- Stat ---------- */
function Stat({ label, value, sub, accent, foot }){
  return (
    <Card pad={18}>
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{color:accent||B.ink}}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
      {foot}
    </Card>
  );
}

/* ---------- Sidebar ---------- */
const NAV = [
  { group:"General", items:[
    { id:"overview", label:"Resumen", icon:"grid" },
    { id:"launch",   label:"Nueva Auditoría", icon:"play" },
  ]},
  { group:"Análisis · 9 Fases", items:[
    { id:"f1", label:"Simulación de consultas", tag:"F1" },
    { id:"f2", label:"Share of AI Voice", tag:"F2" },
    { id:"f3", label:"Autoridad", tag:"F3" },
    { id:"f4", label:"Entendimiento de marca", tag:"F4" },
    { id:"f5", label:"Benchmark GEO", tag:"F5" },
    { id:"f6", label:"Análisis de fuentes", tag:"F6" },
    { id:"f7", label:"Oportunidades", tag:"F7" },
    { id:"f8", label:"GEO Score", tag:"F8" },
    { id:"f9", label:"Plan para dominar IA", tag:"F9" },
  ]},
  { group:"Entregable", items:[
    { id:"report", label:"Reporte ejecutivo", icon:"doc" },
  ]},
];

function Icon({ name }){
  const p = { width:17, height:17, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round" };
  if (name==="grid") return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (name==="play") return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>;
  if (name==="doc")  return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>;
  return null;
}

function Sidebar({ active, onNav }){
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <Logo height={24}/>
        <div className="sb-tool">Auditor GEO</div>
      </div>
      <nav className="sb-nav">
        {NAV.map(g=>(
          <div key={g.group} className="sb-group">
            <div className="sb-group-label">{g.group}</div>
            {g.items.map(it=>(
              <button key={it.id} type="button" className={cx("sb-item", active===it.id && "on")} onClick={()=>onNav(it.id)}>
                {it.icon && <span className="sb-ic"><Icon name={it.icon}/></span>}
                {it.tag && <span className="sb-tag">{it.tag}</span>}
                <span className="sb-label">{it.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="sb-foot-card">
          <div style={{fontSize:11, color:B.faint, letterSpacing:".06em", textTransform:"uppercase"}}>Auditoría activa</div>
          <div style={{fontWeight:600, color:B.ink, marginTop:3, fontSize:13.5}}>SmartFran · Q2 2026</div>
          <div style={{fontSize:11.5, color:B.sub, marginTop:2}}>6 motores · 8 marcas · 18 queries</div>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Topbar ---------- */
function Topbar({ title }){
  const [q,setQ] = useState("");
  return (
    <header className="topbar">
      <div className="tb-crumb"><span style={{color:B.faint}}>Auditor GEO</span> <span style={{color:B.faint, margin:"0 8px"}}>/</span> <span>{title}</span></div>
      <div className="tb-right">
        <div className="tb-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={B.faint} strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar marca o query…" />
        </div>
        <button className="tb-btn ghost" type="button">Exportar</button>
        <button className="tb-btn primary" type="button">＋ Nueva auditoría</button>
        <div className="tb-ava">MF</div>
      </div>
    </header>
  );
}

/* ---------- Mini engine legend ---------- */
function EngineLegend(){
  return (
    <div className="eng-legend">
      {window.ENGINES.map(e=> <span key={e.id} className="eng-leg-item"><Dot color={e.color} size={7}/>{e.name}</span>)}
    </div>
  );
}

Object.assign(window, { cx, lerpColor, Logo, Dot, EngineChip, Pill, LevelDot, Trend, ScoreRing, Bar, Card, PageHeader, Stat, Sidebar, Topbar, Icon, EngineLegend, NAV });
