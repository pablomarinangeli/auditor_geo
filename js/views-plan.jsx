/* ============================================================
   Vistas: F7 Oportunidades · F9 Plan · Reporte ejecutivo
   ============================================================ */
const B5 = window.BRAND;

/* ---------------- F7 · OPORTUNIDADES ---------------- */
function ViewF7(){
  const groups = {
    quick:{ label:"Quick Wins · 30 días", color:B5.gold },
    "90":{ label:"Iniciativas · 90 días", color:B5.teal },
    "180":{ label:"Estrategia · 180 días", color:B5.purple },
  };
  const prioTone = p => p==="Crítica"?"#ff5d8f": p==="Alta"?B5.gold : B5.peri;

  // scatter coords: x effort (1-3), y impact (1-3)
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 7" title="Oportunidades para SmartFran"
        desc="Matriz impacto × esfuerzo. Arriba-izquierda = máxima prioridad (alto impacto, bajo esfuerzo)." />

      <div className="grid-2">
        {/* matrix */}
        <Card pad={22}>
          <div className="card-head"><h3>Matriz impacto / esfuerzo</h3></div>
          <div className="matrix">
            <div className="matrix-y">Impacto →</div>
            <div className="matrix-plot">
              <div className="matrix-quad ql">Quick wins</div>
              <div className="matrix-grid">
                {window.OPPS.map((o,i)=>{
                  const x = (o.effort-1)/2*100, y = 100-(o.impact-1)/2*100;
                  return (
                    <div key={i} className="matrix-dot" title={o.acc}
                      style={{ left:`${8+x*0.84}%`, top:`${8+y*0.84}%`, background:groups[o.group].color }}>
                      <span className="matrix-dot-n">{i+1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="matrix-x">Esfuerzo →</div>
            </div>
          </div>
          <div className="matrix-legend">
            {Object.entries(groups).map(([k,g])=> <span key={k}><Dot color={g.color} size={8}/>{g.label}</span>)}
          </div>
        </Card>

        {/* list */}
        <Card pad={0}>
          <table className="data-table opp-table">
            <thead><tr><th style={{width:34}}>#</th><th>Acción</th><th style={{width:80}}>Impacto</th><th style={{width:80}}>Esfuerzo</th><th style={{width:90}}>Prioridad</th></tr></thead>
            <tbody>
              {window.OPPS.map((o,i)=>(
                <tr key={i}>
                  <td><span className="opp-n" style={{background:groups[o.group].color}}>{i+1}</span></td>
                  <td><span style={{color:B5.ink, fontWeight:500, fontSize:13.5}}>{o.acc}</span></td>
                  <td><Dots n={o.impact}/></td>
                  <td><Dots n={o.effort} muted/></td>
                  <td><span className="prio" style={{color:prioTone(o.prio), borderColor:prioTone(o.prio)+"55"}}>{o.prio}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
function Dots({ n, muted }){
  return <span style={{display:"inline-flex", gap:3}}>{[1,2,3].map(i=>
    <span key={i} style={{width:7,height:7,borderRadius:"50%", background: i<=n ? (muted?B5.faint:B5.purple) : "rgba(255,255,255,.1)"}}/>)}</span>;
}

/* ---------------- F9 · PLAN ---------------- */
function ViewF9(){
  const engineStrat = [
    { id:"chatgpt", t:"Reviews G2/Capterra + casos estructurados con métricas" },
    { id:"gemini", t:"SEO técnico, schema y autoridad de dominio" },
    { id:"claude", t:"Contenido largo y educativo sobre franquicias" },
    { id:"copilot", t:"Presencia en LinkedIn y fuentes B2B" },
    { id:"grok", t:"Conversación social y menciones en X" },
    { id:"perplexity", t:"Fuentes citables y datos verificables" },
  ];
  return (
    <div className="view">
      <PageHeader eyebrow="Fase 9" title="Plan para Dominar las IA"
        desc="Roadmap 30-90-180 para convertir a SmartFran en la marca más recomendada por los motores generativos." />

      <div className="roadmap">
        {window.ROADMAP.map((r,i)=>(
          <Card key={i} pad={20} className="road-col">
            <div className="road-head" style={{color:r.color}}>
              <span className="road-dot" style={{background:r.color}}/>{r.phase}
            </div>
            <ul className="road-list">
              {r.items.map((it,j)=> <li key={j}><span className="road-check" style={{borderColor:r.color}}/>{it}</li>)}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid-2" style={{marginTop:18}}>
        <Card>
          <div className="card-head"><h3>Estrategia por motor</h3></div>
          <div className="estrat-list">
            {engineStrat.map(s=>{
              const e = window.ENGINES.find(x=>x.id===s.id);
              return (
                <div key={s.id} className="estrat-row">
                  <span className="estrat-eng"><Dot color={e.color} size={8}/>{e.name}</span>
                  <span className="estrat-t">{s.t}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <div className="card-head"><h3>Métricas a seguir</h3></div>
          <div className="metric-list">
            {window.METRICS.map((m,i)=>(
              <div key={i} className="metric-row">
                <span className="metric-k">{m.k}</span>
                <div className="metric-prog">
                  <span className="metric-now">{m.now}</span>
                  <span className="metric-arrow">→</span>
                  <span className="metric-goal">{m.goal}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- REPORTE EJECUTIVO ---------------- */
function ViewReport({ onNav }){
  const geoRank = rankBy("geo");
  const voiceRank = [...window.VOICE].sort((a,b)=>b.score-a.score);
  return (
    <div className="view report">
      <PageHeader eyebrow="Entregable final · para el CEO" title="Reporte Ejecutivo GEO"
        desc="Síntesis para dirección: dónde está SmartFran, qué está en juego y qué hacer en los próximos 180 días."
        right={<button className="tb-btn primary" type="button">Descargar PDF</button>} />

      {/* rankings strip */}
      <div className="grid-3">
        <Card pad={20}>
          <div className="rep-rank-title">Ranking visibilidad IA</div>
          {voiceRank.slice(0,4).map((b,i)=>(
            <div key={b.id} className={cx("rep-rank-row", b.focus&&"focus")}><span>{i+1}. {b.name}</span><b>{b.score}</b></div>
          ))}
          <div className="rep-rank-sf">SmartFran · #{voiceRank.findIndex(b=>b.focus)+1} de 8</div>
        </Card>
        <Card pad={20}>
          <div className="rep-rank-title">Ranking autoridad</div>
          {["Fudo","Napse","Maxirest","Bistrosoft"].map((n,i)=>{
            const a=window.AUTH[n]; const avg=([...a.digital,...a.ai].reduce((s,x)=>s+x,0)/13).toFixed(1);
            return <div key={n} className="rep-rank-row"><span>{i+1}. {n}</span><b>{avg}</b></div>;
          })}
          <div className="rep-rank-sf">SmartFran · 4.3 / 10</div>
        </Card>
        <Card pad={20}>
          <div className="rep-rank-title">Ranking GEO</div>
          {geoRank.slice(0,4).map((b,i)=>(
            <div key={b.id} className={cx("rep-rank-row", b.focus&&"focus")}><span>{i+1}. {b.name}</span><b>{b.geo}</b></div>
          ))}
          <div className="rep-rank-sf">SmartFran · #{geoRank.findIndex(b=>b.focus)+1} de 8 · score 31</div>
        </Card>
      </div>

      {/* recommendation */}
      <Card pad={28} className="rep-reco" style={{marginTop:18}}>
        <div className="rep-reco-tag">Recomendación al CEO</div>
        <h2>El producto no es el problema. La evidencia pública sí.</h2>
        <p>
          SmartFran tiene el posicionamiento más nítido del mercado —software para franquicias— pero los modelos de IA
          no pueden recomendarlo porque <strong>no existe afuera</strong>: sin reviews, sin directorios, sin casos citables.
          La buena noticia es que GEO es una disciplina incipiente y <strong>la categoría sigue libre</strong>.
          Con un esfuerzo concentrado de 180 días, SmartFran puede pasar de invisible a referente de su nicho antes
          que los rivales generalistas lo ocupen.
        </p>
        <div className="rep-targets">
          <div><span className="rt-now">31</span><span className="rt-lbl">GEO hoy</span></div>
          <div className="rt-arrow">→</div>
          <div><span className="rt-goal">60</span><span className="rt-lbl">GEO objetivo 180d</span></div>
          <div className="rt-sep"/>
          <div><span className="rt-now">6%</span><span className="rt-lbl">Voice hoy</span></div>
          <div className="rt-arrow">→</div>
          <div><span className="rt-goal">18%</span><span className="rt-lbl">Voice objetivo</span></div>
        </div>
      </Card>

      {/* risks + opps */}
      <div className="grid-2" style={{marginTop:18}}>
        <Card pad={22}>
          <div className="card-head"><h3 style={{color:"#ff8fb0"}}>Riesgos</h3></div>
          <div className="risk-list">
            {window.RISKS.map((r,i)=>(
              <div key={i} className="risk-row"><div className="risk-t">{r.t}</div><p>{r.d}</p></div>
            ))}
          </div>
        </Card>
        <Card pad={22}>
          <div className="card-head"><h3 style={{color:B5.teal}}>Oportunidades inmediatas</h3><button className="link-btn" onClick={()=>onNav("f7")}>Ver matriz →</button></div>
          <div className="risk-list">
            {window.OPPS.filter(o=>o.group==="quick").map((o,i)=>(
              <div key={i} className="risk-row"><div className="risk-t" style={{color:B5.teal}}>{o.acc}</div>
                <p>Prioridad {o.prio.toLowerCase()} · impacto alto · 30 días</p></div>
            ))}
          </div>
        </Card>
      </div>

      {/* plan strip */}
      <Card pad={24} style={{marginTop:18}}>
        <div className="card-head"><h3>Plan de acción 30 · 90 · 180</h3><button className="link-btn" onClick={()=>onNav("f9")}>Ver plan completo →</button></div>
        <div className="roadmap" style={{marginTop:6}}>
          {window.ROADMAP.map((r,i)=>(
            <div key={i} className="rep-plan-col">
              <div className="road-head" style={{color:r.color, marginBottom:10}}><span className="road-dot" style={{background:r.color}}/>{r.phase}</div>
              <ul className="road-list">{r.items.slice(0,3).map((it,j)=><li key={j}><span className="road-check" style={{borderColor:r.color}}/>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { ViewF7, ViewF9, ViewReport, Dots });
