/* ============================================================
   Vistas: Overview + F8 GEO Score
   ============================================================ */
const B2 = window.BRAND;

function rankBy(key){
  return [...window.BRANDS].sort((a,b)=> b[key]-a[key]);
}

/* ---------------- OVERVIEW ---------------- */
function ViewOverview({ onNav }){
  const geoRank = rankBy("geo");
  const sf = window.BRANDS.find(b=>b.focus);
  const sfPos = geoRank.findIndex(b=>b.focus)+1;
  const leader = geoRank[0];

  return (
    <div className="view">
      <PageHeader eyebrow="Resumen ejecutivo · Q2 2026"
        title="¿Qué tan visible es SmartFran en las IA?"
        desc="Diagnóstico de Share of AI Voice, autoridad y GEO Score frente a 7 competidores en 6 motores generativos."
        right={<EngineLegend/>} />

      {/* hero */}
      <div className="ov-hero">
        <Card pad={26} className="ov-hero-main">
          <div style={{display:"flex", gap:28, alignItems:"center", flexWrap:"wrap"}}>
            <ScoreRing value={sf.geo} size={132} stroke={12} sub="GEO Score"/>
            <div style={{flex:1, minWidth:240}}>
              <Pill tone="purple">Posición #{sfPos} de 8 · marca foco</Pill>
              <h2 style={{margin:"12px 0 8px", fontFamily:"'Space Grotesk',sans-serif", fontSize:23, color:B2.ink, lineHeight:1.2}}>
                SmartFran es <span style={{color:"#ff8fb0"}}>casi invisible</span> para los modelos de IA.
              </h2>
              <p style={{margin:0, color:B2.sub, fontSize:14.5, lineHeight:1.55, maxWidth:520}}>
                Tiene el nicho más definido del set —gestión de franquicias— pero la IA no encuentra señales externas
                que lo confirmen. <strong style={{color:B2.ink}}>{leader.name}</strong> domina con un GEO Score de {leader.geo}.
                La categoría todavía está abierta.
              </p>
            </div>
          </div>
        </Card>
        <div className="ov-hero-stats">
          <Stat label="Share of AI Voice" value="6%" accent="#ff8fb0" sub="vs 26% del líder" />
          <Stat label="Recom. principales" value="2" accent={B2.gold} sub="sobre 18 queries" />
          <Stat label="Fuentes externas" value="3 / 14" accent={B2.gold} sub="G2, Capterra, Wikipedia ausentes" />
          <Stat label="Tendencia 90d" value="+4" accent={B2.teal} sub="GEO Score en alza lenta" />
        </div>
      </div>

      {/* rankings */}
      <div className="grid-2" style={{marginTop:18}}>
        <Card>
          <div className="card-head">
            <h3>Ranking GEO</h3>
            <button className="link-btn" onClick={()=>onNav("f8")}>Ver Fase 8 →</button>
          </div>
          <div className="rank-list">
            {geoRank.map((b,i)=>(
              <div key={b.id} className={cx("rank-row", b.focus && "focus")}>
                <span className="rank-num">{String(i+1).padStart(2,"0")}</span>
                <span className="rank-name">{b.name}{b.focus && <span className="you-tag">vos</span>}</span>
                <div style={{flex:1, maxWidth:200}}><Bar value={b.geo} focus={b.focus} showVal={false} height={8}/></div>
                <span className="rank-score">{b.geo}</span>
                <span style={{width:34, textAlign:"right"}}><Trend v={b.trend}/></span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="card-head">
            <h3>Share of AI Voice</h3>
            <button className="link-btn" onClick={()=>onNav("f2")}>Ver Fase 2 →</button>
          </div>
          <VoiceDonut/>
        </Card>
      </div>

      {/* insight + next */}
      <div className="grid-3" style={{marginTop:18}}>
        <Card className="insight-card">
          <div className="insight-k">El problema</div>
          <p>La IA solo puede recomendar lo que puede <strong>verificar fuera del sitio propio</strong>. SmartFran no tiene perfiles en directorios SaaS, reviews ni casos citables.</p>
        </Card>
        <Card className="insight-card">
          <div className="insight-k" style={{color:B2.gold}}>La oportunidad</div>
          <p>GEO es incipiente. <strong>Nadie posee aún "software para franquicias"</strong> en la mente de los modelos. Quien lo reclame primero, lo fija.</p>
        </Card>
        <Card className="insight-card">
          <div className="insight-k" style={{color:B2.teal}}>El plan</div>
          <p>Roadmap 30-90-180: directorios y casos primero, contenido de categoría después, autoridad y PR al final. <button className="link-btn" onClick={()=>onNav("f9")}>Ver plan →</button></p>
        </Card>
      </div>
    </div>
  );
}

/* Donut de share of voice */
function VoiceDonut(){
  const data = window.VOICE.map(v=>({ name:v.name, val:v.voiceShare ?? v.score, focus:v.focus }));
  // usar % aparición relativo
  const raw = window.BRANDS.map(b=>({name:b.name, val:b.voice, focus:b.focus}));
  const total = raw.reduce((s,d)=>s+d.val,0);
  const colors = ["#ae00ff","#6300ff","#6e59ee","#2cced7","#f0b034","#8a7bd8","#5a4aa0","#ff5d8f"];
  let acc = 0; const R=58, C=2*Math.PI*R;
  const segs = raw.map((d,i)=>{
    const frac = d.val/total; const len = C*frac;
    const seg = { ...d, color: d.focus?"#ff5d8f":colors[i], dash:`${len} ${C-len}`, off:-acc*C/1 };
    acc += frac; return seg;
  });
  let acc2=0;
  return (
    <div style={{display:"flex", gap:22, alignItems:"center", flexWrap:"wrap"}}>
      <svg width="150" height="150" style={{transform:"rotate(-90deg)", flex:"0 0 auto"}}>
        {segs.map((s,i)=>{
          const dashoffset = -acc2*C; acc2 += s.val/total;
          return <circle key={i} cx="75" cy="75" r={R} fill="none" stroke={s.color} strokeWidth="20"
            strokeDasharray={s.dash} strokeDashoffset={dashoffset} />;
        })}
        <circle cx="75" cy="75" r="40" fill={B2.panel}/>
      </svg>
      <div style={{flex:1, minWidth:160}}>
        {raw.map((d,i)=>(
          <div key={d.name} className={cx("legend-row", d.focus&&"focus")}>
            <Dot color={d.focus?"#ff5d8f":colors[i]} size={9}/>
            <span style={{flex:1, color:d.focus?B2.ink:B2.sub, fontWeight:d.focus?700:500}}>{d.name}</span>
            <span style={{fontFamily:"'Space Grotesk',sans-serif", color:B2.ink, fontWeight:600}}>{d.val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- F8 · GEO SCORE ---------------- */
function ViewGeoScore(){
  const geoRank = rankBy("geo");
  const sf = window.BRANDS.find(b=>b.focus);
  const composed = window.GEO_WEIGHTS.reduce((s,w)=> s + w.sf*w.w/100, 0);
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 8" title="GEO Score Final"
        desc="Índice compuesto 0–100 que pondera visibilidad, autoridad, claridad, fuentes y probabilidad de recomendación." />

      <div className="grid-2">
        <Card pad={26}>
          <div style={{display:"flex", gap:26, alignItems:"center"}}>
            <ScoreRing value={sf.geo} size={150} stroke={13} sub="SmartFran"/>
            <div>
              <h3 style={{margin:"0 0 14px", fontFamily:"'Space Grotesk',sans-serif", color:B2.ink, fontSize:17}}>Composición del score</h3>
              {window.GEO_WEIGHTS.map(w=>(
                <div key={w.k} className="weight-row">
                  <span className="weight-name">{w.k}</span>
                  <span className="weight-w">{w.w}%</span>
                  <div style={{flex:1, maxWidth:130}}><Bar value={w.sf} focus showVal={false} height={7}/></div>
                  <span className="weight-val">{w.sf}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="card-head"><h3>Ranking GEO completo</h3></div>
          <div className="rank-list">
            {geoRank.map((b,i)=>(
              <div key={b.id} className={cx("rank-row", b.focus && "focus")}>
                <span className="rank-num">{String(i+1).padStart(2,"0")}</span>
                <span className="rank-name">{b.name}{b.focus && <span className="you-tag">vos</span>}</span>
                <div style={{flex:1, maxWidth:220}}><Bar value={b.geo} focus={b.focus} showVal={false} height={8}/></div>
                <span className="rank-score">{b.geo}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card style={{marginTop:18}} pad={24}>
        <h3 style={{margin:"0 0 6px", fontFamily:"'Space Grotesk',sans-serif", color:B2.ink, fontSize:16}}>Lectura del score</h3>
        <p style={{margin:0, color:B2.sub, fontSize:14.5, lineHeight:1.6, maxWidth:760}}>
          SmartFran obtiene su mejor puntaje en <strong style={{color:B2.teal}}>claridad de posicionamiento (42)</strong> —
          el nicho de franquicias es nítido— pero se hunde en <strong style={{color:"#ff8fb0"}}>presencia en fuentes externas (18)</strong> y
          <strong style={{color:"#ff8fb0"}}> Share of AI Voice (24)</strong>. La palanca de mayor retorno no es el producto: es
          construir las señales que la IA necesita para citarlo.
        </p>
      </Card>
    </div>
  );
}

Object.assign(window, { ViewOverview, ViewGeoScore, VoiceDonut, rankBy });
