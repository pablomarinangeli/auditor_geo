/* ============================================================
   App · router + mount
   ============================================================ */
const { useState, useEffect, useRef } = React;
const TITLES = {
  overview:"Resumen ejecutivo", launch:"Nueva Auditoría",
  f1:"F1 · Simulación de consultas", f2:"F2 · Share of AI Voice", f3:"F3 · Autoridad",
  f4:"F4 · Entendimiento de marca", f5:"F5 · Benchmark GEO", f6:"F6 · Análisis de fuentes",
  f7:"F7 · Oportunidades", f8:"F8 · GEO Score", f9:"F9 · Plan para dominar IA",
  report:"Reporte ejecutivo",
};

function App(){
  const [active, setActive] = useState(()=> (location.hash||"").replace("#","") || "overview");
  const mainRef = useRef(null);

  function nav(id){
    setActive(id);
    history.replaceState(null,"","#"+id);
    if(mainRef.current) mainRef.current.scrollTop = 0;
  }
  useEffect(()=>{
    const h = ()=> setActive((location.hash||"").replace("#","")||"overview");
    window.addEventListener("hashchange", h);
    return ()=> window.removeEventListener("hashchange", h);
  },[]);

  let View;
  switch(active){
    case "launch":   View = <ViewLaunch onNav={nav}/>; break;
    case "f1":       View = <ViewF1/>; break;
    case "f2":       View = <ViewF2/>; break;
    case "f3":       View = <ViewF3/>; break;
    case "f4":       View = <ViewF4/>; break;
    case "f5":       View = <ViewF5/>; break;
    case "f6":       View = <ViewF6/>; break;
    case "f7":       View = <ViewF7/>; break;
    case "f8":       View = <ViewGeoScore/>; break;
    case "f9":       View = <ViewF9/>; break;
    case "report":   View = <ViewReport onNav={nav}/>; break;
    default:         View = <ViewOverview onNav={nav}/>;
  }

  return (
    <div className="app">
      <Sidebar active={active} onNav={nav}/>
      <div className="main-col">
        <Topbar title={TITLES[active]||""}/>
        <main className="main" ref={mainRef}>
          {View}
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
