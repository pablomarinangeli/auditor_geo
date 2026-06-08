/* ============================================================
   Vistas: Nueva Auditoría (launch) + F1 Simulación de consultas
   ============================================================ */
const { useState } = React;
const B3 = window.BRAND;

/* ---------------- NUEVA AUDITORÍA ---------------- */
function ViewLaunch({ onNav }){
  const [engines, setEngines] = useState(window.ENGINES.map(e=>e.id));
  const [brands, setBrands] = useState(window.BRANDS.map(b=>b.id));
  const [cats, setCats] = useState(window.QUERIES.map(c=>c.cat));
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({}); // engineId -> %
  const [done, setDone] = useState(false);

  const totalQ = window.QUERIES.filter(c=>cats.includes(c.cat)).reduce((s,c)=>s+c.items.length,0);

  function toggle(arr,set,id){ set(arr.includes(id)? arr.filter(x=>x!==id) : [...arr,id]); }

  function run(){
    if(!engines.length || !brands.length || !cats.length) return;
    setRunning(true); setDone(false);
    const init = {}; engines.forEach(e=> init[e]=0); setProgress(init);
    const timers = [];
    engines.forEach((e,i)=>{
      const speed = 7 + Math.random()*7;
      const t = setInterval(()=>{
        setProgress(p=>{
          const nv = Math.min(100, (p[e]||0) + speed);
          const np = {...p, [e]:nv};
          if(Object.values(np).every(v=>v>=100)){
            timers.forEach(clearInterval);
            setTimeout(()=>{ setRunning(false); setDone(true); }, 350);
          }
          return np;
        });
      }, 120 + i*30);
      timers.push(t);
    });
  }

  return (
    <div className="view">
      <PageHeader eyebrow="Nueva Auditoría" title="Configurar corrida GEO"
        desc="Cada motor de IA actúa como un auditor competitivo —no como buscador— y reporta a qué marcas mencionaría espontáneamente." />

      <div className="launch-grid">
        {/* config */}
        <div>
          <Card pad={22}>
            <div className="conf-block">
              <div className="conf-head">
                <span className="conf-num">1</span>
                <div><h4>Motores de IA</h4><p>Auditores que consultaremos en paralelo</p></div>
                <span className="conf-count">{engines.length}/6</span>
              </div>
              <div className="chip-wrap">
                {window.ENGINES.map(e=>(
                  <EngineChip key={e.id} engine={e} active={engines.includes(e.id)} onClick={()=>toggle(engines,setEngines,e.id)} />
                ))}
              </div>
            </div>

            <div className="conf-block">
              <div className="conf-head">
                <span className="conf-num">2</span>
                <div><h4>Marcas a evaluar</h4><p>SmartFran vs. competidores</p></div>
                <span className="conf-count">{brands.length}/8</span>
              </div>
              <div className="chip-wrap">
                {window.BRANDS.map(b=>(
                  <button key={b.id} type="button" className={cx("brand-chip", brands.includes(b.id)&&"on", b.focus&&"focus")}
                    onClick={()=>toggle(brands,setBrands,b.id)}>
                    {b.focus && <span className="brand-chip-star">★</span>}{b.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="conf-block" style={{borderBottom:"none", paddingBottom:0}}>
              <div className="conf-head">
                <span className="conf-num">3</span>
                <div><h4>Categorías de consulta</h4><p>{totalQ} queries simuladas como cliente potencial</p></div>
                <span className="conf-count">{cats.length}/4</span>
              </div>
              <div className="cat-list">
                {window.QUERIES.map(c=>(
                  <label key={c.cat} className={cx("cat-row", cats.includes(c.cat)&&"on")}>
                    <input type="checkbox" checked={cats.includes(c.cat)} onChange={()=>toggle(cats,setCats,c.cat)} />
                    <span className="cat-name">{c.cat}</span>
                    <span className="cat-q">{c.items.length} queries</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* run panel */}
        <div>
          <Card pad={22} className="run-panel">
            <div className="run-summary">
              <div className="run-sum-row"><span>Motores</span><b>{engines.length}</b></div>
              <div className="run-sum-row"><span>Marcas</span><b>{brands.length}</b></div>
              <div className="run-sum-row"><span>Queries</span><b>{totalQ}</b></div>
              <div className="run-sum-row total"><span>Consultas IA</span><b>{engines.length*totalQ}</b></div>
            </div>

            {!running && !done && (
              <button className="run-btn" type="button" onClick={run} disabled={!engines.length||!brands.length||!cats.length}>
                ▶ Ejecutar auditoría
              </button>
            )}

            {running && (
              <div className="run-progress">
                <div className="run-prog-label">Auditando…</div>
                {engines.map(eid=>{
                  const e = window.ENGINES.find(x=>x.id===eid);
                  return (
                    <div key={eid} className="prog-row">
                      <span className="prog-name"><Dot color={e.color} size={7}/>{e.name}</span>
                      <div className="prog-track"><div className="prog-fill" style={{width:`${progress[eid]||0}%`, background:e.color}}/></div>
                      <span className="prog-pct">{Math.round(progress[eid]||0)}%</span>
                    </div>
                  );
                })}
              </div>
            )}

            {done && (
              <div className="run-done">
                <div className="done-check">✓</div>
                <h4>Auditoría completa</h4>
                <p>{engines.length*totalQ} consultas procesadas en {engines.length} motores.</p>
                <button className="run-btn" type="button" onClick={()=>onNav("f1")}>Ver resultados →</button>
                <button className="link-btn" style={{marginTop:10}} onClick={()=>{setDone(false);}}>Configurar otra</button>
              </div>
            )}
          </Card>

          <Card pad={18} style={{marginTop:14}}>
            <div style={{fontSize:11.5, letterSpacing:".07em", textTransform:"uppercase", color:B3.faint, marginBottom:8}}>Cómo funciona</div>
            <p style={{margin:0, fontSize:13.5, color:B3.sub, lineHeight:1.55}}>
              Cada motor responde como <strong style={{color:B3.ink}}>cliente buscando software</strong> para franquicias y retail.
              Registramos qué marcas menciona, en qué posición y con qué nivel de confianza — la base del Share of AI Voice.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- F1 · SIMULACIÓN DE CONSULTAS ---------------- */
function ViewF1(){
  const [active, setActive] = useState(window.QUERIES[0].cat);
  const cat = window.QUERIES.find(c=>c.cat===active);
  const allItems = window.QUERIES.flatMap(c=>c.items);
  const appears = allItems.filter(i=>i.pos>0).length;
  const principal = allItems.filter(i=>i.rec==="principal").length;
  const ausente = allItems.filter(i=>i.rec==="ausente").length;

  return (
    <div className="view">
      <PageHeader eyebrow="Fase 1" title="Simulación de consultas"
        desc="Marcas que aparecen espontáneamente por query, posición de SmartFran y nivel de confianza de la respuesta." />

      <div className="grid-4" style={{marginBottom:18}}>
        <Stat label="Queries evaluadas" value={allItems.length} sub="4 categorías"/>
        <Stat label="SmartFran aparece" value={`${appears}/${allItems.length}`} accent={B3.gold} sub={`${Math.round(appears/allItems.length*100)}% de cobertura`}/>
        <Stat label="Recom. principal" value={principal} accent={B3.teal} sub="solo en Analítica"/>
        <Stat label="Ausencias" value={ausente} accent="#ff8fb0" sub="POS y Operaciones"/>
      </div>

      <div className="tabs">
        {window.QUERIES.map(c=>(
          <button key={c.cat} type="button" className={cx("tab", active===c.cat&&"on")} onClick={()=>setActive(c.cat)}>
            {c.cat}<span className="tab-badge">{c.items.length}</span>
          </button>
        ))}
      </div>

      <Card pad={0}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{width:"34%"}}>Query</th>
              <th>Marcas que aparecen</th>
              <th style={{width:90}}>Posición SF</th>
              <th style={{width:120}}>Recomendación</th>
              <th style={{width:130}}>Confianza</th>
            </tr>
          </thead>
          <tbody>
            {cat.items.map((it,i)=>(
              <tr key={i}>
                <td><span style={{color:B3.ink, fontWeight:500}}>{it.q}</span></td>
                <td>
                  <div className="brand-tags">
                    {it.brands.map((b,j)=>(
                      <span key={j} className={cx("brand-tag", b==="SmartFran"&&"sf")}>{j+1}. {b}</span>
                    ))}
                  </div>
                </td>
                <td>{it.pos>0 ? <span className="pos-chip">#{it.pos}</span> : <span className="pos-chip none">—</span>}</td>
                <td><Pill tone={it.rec}>{it.rec}</Pill></td>
                <td>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    <div className="bar-track" style={{height:6, flex:1}}>
                      <div className="bar-fill" style={{width:`${it.conf}%`, height:6, background: it.conf>=65?B3.teal:it.conf>=50?B3.gold:"#ff5d8f"}}/>
                    </div>
                    <span style={{fontSize:12.5, color:B3.sub, width:30}}>{it.conf}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

Object.assign(window, { ViewLaunch, ViewF1 });
