/* ============================================================
   Vistas: F2 Share of AI Voice · F3 Autoridad · F4 Marca
            F5 Benchmark · F6 Fuentes
   ============================================================ */
const { useState } = React;
const B4 = window.BRAND;

/* ---------------- F2 · SHARE OF AI VOICE ---------------- */
function ViewF2(){
  const rows = [...window.VOICE].sort((a,b)=>b.score-a.score);
  const maxAp = Math.max(...rows.map(r=>r.ap));
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 2" title="Share of AI Voice"
        desc="Frecuencia con que cada marca aparece, es recomendada o queda ausente en las respuestas. Índice 0–100." />

      <Card pad={0} style={{marginBottom:18}}>
        <table className="data-table voice-table">
          <thead>
            <tr>
              <th style={{width:"22%"}}>Marca</th>
              <th>Apariciones</th>
              <th>Rec. principales</th>
              <th>Rec. secundarias</th>
              <th>Ausencias</th>
              <th style={{width:170}}>Score AI Voice</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className={r.focus?"row-focus":""}>
                <td><span className="vt-name">{r.name}{r.focus&&<span className="you-tag">vos</span>}</span></td>
                <td><span className="vt-num">{r.ap}</span></td>
                <td><span className="vt-num" style={{color:B4.teal}}>{r.prin}</span></td>
                <td><span className="vt-num" style={{color:B4.gold}}>{r.sec}</span></td>
                <td><span className="vt-num" style={{color:"#ff8fb0"}}>{r.aus}</span></td>
                <td>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                    <div style={{flex:1}}><Bar value={r.score} focus={r.focus} showVal={false} height={9}/></div>
                    <span style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, color:B4.ink, width:26}}>{r.score}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <div className="card-head"><h3>Share of Voice por motor</h3><EngineLegend/></div>
        <div className="heatmap">
          <div className="hm-row hm-head">
            <span className="hm-label"></span>
            {window.ENGINES.map(e=> <span key={e.id} className="hm-cell hm-eng"><Dot color={e.color} size={6}/>{e.name}</span>)}
          </div>
          {window.VOICE_BY_ENGINE.map(b=>(
            <div key={b.name} className={cx("hm-row", b.focus&&"focus")}>
              <span className="hm-label">{b.name}{b.focus&&<span className="you-tag">vos</span>}</span>
              {b.v.map((val,i)=>{
                const intensity = val/30;
                const col = b.focus ? `rgba(255,93,143,${0.15+intensity*0.7})` : `rgba(174,0,255,${0.12+intensity*0.75})`;
                return <span key={i} className="hm-cell" style={{background:col}}>{val}%</span>;
              })}
            </div>
          ))}
        </div>
        <p style={{margin:"14px 0 0", fontSize:13.5, color:B4.sub, lineHeight:1.5}}>
          SmartFran rinde algo mejor en <strong style={{color:B4.teal}}>Claude (9%)</strong> y Perplexity (8%) —motores que ponderan
          contenido especializado— pero se desvanece en Copilot (4%) y Gemini (5%).
        </p>
      </Card>
    </div>
  );
}

/* ---------------- F3 · AUTORIDAD ---------------- */
function ViewF3(){
  const names = Object.keys(window.AUTH);
  const [sel, setSel] = useState("SmartFran");
  const a = window.AUTH[sel];
  const fudo = window.AUTH["Fudo"];
  const avg = arr => (arr.reduce((s,x)=>s+x,0)/arr.length);
  const digAvg = avg(a.digital).toFixed(1), aiAvg = avg(a.ai).toFixed(1);

  function ScoreGrid({ crits, scores, comp }){
    return (
      <div className="score-grid">
        {crits.map((c,i)=>(
          <div key={c} className="score-row">
            <span className="score-name">{c}</span>
            <div className="score-bar-wrap">
              <div className="bar-track" style={{height:8}}>
                <div className="bar-fill" style={{width:`${scores[i]*10}%`, height:8, background: scores[i]>=7?B4.teal:scores[i]>=4?B4.gold:"#ff5d8f"}}/>
                {comp && <span className="comp-marker" style={{left:`${comp[i]*10}%`}} title={`Fudo: ${comp[i]}`}/>}
              </div>
            </div>
            <span className="score-val">{scores[i]}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="view">
      <PageHeader eyebrow="Fase 3" title="Análisis de Autoridad"
        desc="Scoring 0–10 de autoridad digital y autoridad para IA. La línea marca al líder (Fudo) como referencia."
        right={
          <select className="brand-select" value={sel} onChange={e=>setSel(e.target.value)}>
            {names.map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
        } />

      <div className="grid-2" style={{marginBottom:18}}>
        <Stat label="Autoridad digital · promedio" value={digAvg} accent={digAvg>=7?B4.teal:digAvg>=4?B4.gold:"#ff8fb0"} sub="presencia, SEO, contenido, casos"/>
        <Stat label="Autoridad para IA · promedio" value={aiAvg} accent={aiAvg>=7?B4.teal:aiAvg>=4?B4.gold:"#ff8fb0"} sub="entendibilidad, fuentes, consistencia"/>
      </div>

      <div className="grid-2">
        <Card>
          <div className="card-head"><h3>Autoridad Digital</h3></div>
          <ScoreGrid crits={window.AUTH_CRIT.digital} scores={a.digital} comp={sel!=="Fudo"?fudo.digital:null}/>
        </Card>
        <Card>
          <div className="card-head"><h3>Autoridad para IA</h3></div>
          <ScoreGrid crits={window.AUTH_CRIT.ai} scores={a.ai} comp={sel!=="Fudo"?fudo.ai:null}/>
        </Card>
      </div>

      {sel==="SmartFran" && (
        <Card style={{marginTop:18}} pad={22}>
          <p style={{margin:0, color:B4.sub, fontSize:14.5, lineHeight:1.6}}>
            SmartFran puntúa alto en <strong style={{color:B4.teal}}>entendibilidad (7)</strong> y claridad de categoría (8): cuando la IA
            lee su sitio, entiende perfecto qué hace. El colapso está en <strong style={{color:"#ff8fb0"}}>información pública (3),
            medios (1), rankings (1) y directorios (2)</strong> — no hay nada externo que la IA pueda citar.
          </p>
        </Card>
      )}
    </div>
  );
}

/* ---------------- F4 · ENTENDIMIENTO DE MARCA ---------------- */
function ViewF4(){
  const u = window.UNDERSTANDING.smartfran;
  const comp = [...window.UNDERSTANDING.comp].sort((a,b)=>b.claridad-a.claridad);
  const qa = [
    { q:"¿Quién es SmartFran?", a:u.quien },
    { q:"¿Qué problema resuelve?", a:u.problema },
    { q:"¿Para qué empresas es?", a:u.para },
  ];
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 4" title="Entendimiento de Marca"
        desc="Qué tan claramente puede inferirse la propuesta de SmartFran desde información pública, comparado con la competencia." />

      <div className="grid-2">
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {qa.map((x,i)=>(
            <Card key={i} pad={20} className="qa-card">
              <div className="qa-q">{x.q}</div>
              <p className="qa-a">{x.a}</p>
            </Card>
          ))}
          <Card pad={20} className="qa-card">
            <div className="qa-q">¿Cuáles son sus diferenciales?</div>
            <div className="diff-list">
              {u.dif.map((d,i)=> <span key={i} className="diff-chip"><Dot color={B4.purple} size={6}/>{d}</span>)}
            </div>
          </Card>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          <Card pad={24}>
            <div className="card-head"><h3>Claridad inferible por IA</h3></div>
            <div style={{display:"flex", gap:22, alignItems:"center", marginBottom:8}}>
              <ScoreRing value={u.claridad} size={104} stroke={10} sub="SmartFran"/>
              <p style={{margin:0, color:B4.sub, fontSize:13.5, lineHeight:1.55}}>{u.nota}</p>
            </div>
          </Card>
          <Card>
            <div className="card-head"><h3>Ranking de claridad</h3></div>
            <div className="rank-list">
              {comp.map(c=>(
                <div key={c.name} className={cx("rank-row", c.focus&&"focus")} title={c.note}>
                  <span className="rank-name" style={{flex:"0 0 110px"}}>{c.name}{c.focus&&<span className="you-tag">vos</span>}</span>
                  <div style={{flex:1}}><Bar value={c.claridad} focus={c.focus} showVal={false} height={8}/></div>
                  <span className="rank-score">{c.claridad}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- F5 · BENCHMARK GEO ---------------- */
function ViewF5(){
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 5" title="Benchmark Competitivo GEO"
        desc="Por qué la IA menciona a cada competidor (fortalezas) y dónde están sus grietas (debilidades GEO)." />
      <div className="bench-grid">
        {window.BENCH.map(b=>(
          <Card key={b.name} pad={20} className="bench-card">
            <div className="bench-head">
              <h4>{b.name}</h4>
              <span className="bench-geo">GEO {window.BRANDS.find(x=>x.name===b.name)?.geo}</span>
            </div>
            <div className="bench-sec">
              <div className="bench-sec-label" style={{color:B4.teal}}>▲ Fortalezas</div>
              <ul>{b.str.map((s,i)=><li key={i}>{s}</li>)}</ul>
            </div>
            <div className="bench-sec">
              <div className="bench-sec-label" style={{color:"#ff8fb0"}}>▼ Debilidades</div>
              <ul>{b.weak.map((s,i)=><li key={i}>{s}</li>)}</ul>
            </div>
          </Card>
        ))}
        <Card pad={20} className="bench-card bench-sf">
          <div className="bench-head"><h4>SmartFran <span className="you-tag">vos</span></h4><span className="bench-geo">GEO 31</span></div>
          <div className="bench-sec">
            <div className="bench-sec-label" style={{color:B4.teal}}>▲ Activo único</div>
            <ul><li>Especialización real en franquicias</li><li>Suite modular (Cloud · Loyalty · Pedidos)</li></ul>
          </div>
          <div className="bench-sec">
            <div className="bench-sec-label" style={{color:"#ff8fb0"}}>▼ Brecha GEO</div>
            <ul><li>Sin reviews ni directorios</li><li>Sin casos citables ni PR</li><li>Categoría aún no "reclamada"</li></ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- F6 · FUENTES ---------------- */
function ViewF6(){
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 6" title="Análisis de Fuentes"
        desc="Las fuentes que los modelos usan para formar respuestas, y el nivel de presencia de SmartFran frente al líder de categoría." />
      <Card pad={0}>
        <table className="data-table">
          <thead>
            <tr><th style={{width:"22%"}}>Fuente</th><th style={{width:120}}>SmartFran</th><th style={{width:120}}>Líder</th><th>Diagnóstico</th></tr>
          </thead>
          <tbody>
            {window.SOURCES.map((s,i)=>(
              <tr key={i}>
                <td><span style={{color:B4.ink, fontWeight:500}}>{s.src}</span></td>
                <td><LevelDot level={s.sf}/></td>
                <td><LevelDot level={s.lead}/></td>
                <td><span style={{color:B4.sub, fontSize:13.5}}>{s.note}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p style={{margin:"14px 2px 0", fontSize:13.5, color:B4.sub, lineHeight:1.5}}>
        <strong style={{color:B4.ink}}>11 de 14 fuentes en nivel Bajo.</strong> Las de mayor peso para la IA —directorios SaaS, G2, Capterra y casos públicos— están vacías.
        Es la palanca de arranque más rápida y barata.
      </p>
    </div>
  );
}

Object.assign(window, { ViewF2, ViewF3, ViewF4, ViewF5, ViewF6 });
