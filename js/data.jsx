/* ============================================================
   Auditor GEO · SmartFran
   Datos mock — historia estratégica:
   SmartFran = altamente especializado (franquicias) pero casi
   invisible en IA. Fudo domina el Share of AI Voice. El plan
   GEO existe para revertir eso.
   ============================================================ */

window.BRAND = {
  navy:   "#0f0035",   // corporativo oscuro
  navy2:  "#0a0024",   // fondo app
  panel:  "#16093f",   // paneles
  panel2: "#1d0d52",   // paneles hover/elev
  line:   "#2a1a5e",   // bordes
  purple: "#ae00ff",   // primario
  violet: "#6300ff",
  peri:   "#6e59ee",
  teal:   "#2cced7",   // complementario
  gold:   "#f0b034",   // complementario
  light:  "#f4f4f4",
  // texto
  ink:    "#f4f2ff",
  sub:    "#a99fd6",
  faint:  "#7a6fb0",
};

// Marca foco
window.FOCUS = "SmartFran";

// Motores de IA
window.ENGINES = [
  { id: "chatgpt",    name: "ChatGPT",    color: "#19c37d" },
  { id: "gemini",     name: "Gemini",     color: "#4587f4" },
  { id: "claude",     name: "Claude",     color: "#d8814f" },
  { id: "copilot",    name: "Copilot",    color: "#37c5d4" },
  { id: "grok",       name: "Grok",       color: "#c9cdd6" },
  { id: "perplexity", name: "Perplexity", color: "#21a3b0" },
];

// Competidores (orden por GEO score desc lo maneja cada vista)
window.BRANDS = [
  {
    id: "smartfran", name: "SmartFran", focus: true,
    geo: 31, voice: 6, trend: +4,
    blurb: "Plataforma cloud especializada en gestión de franquicias y multi-sucursal.",
    cat: "Franquicias / Multi-sucursal",
  },
  { id: "fudo",       name: "Fudo",       geo: 78, voice: 26, trend: +2,
    blurb: "POS gastronómico líder en LatAm, fuerte presencia digital y comunidad.", cat: "POS Gastronomía" },
  { id: "napse",      name: "Napse",      geo: 71, voice: 19, trend: -1,
    blurb: "Suite retail omnicanal enterprise, gran cobertura regional.", cat: "Retail Omnicanal" },
  { id: "maxirest",   name: "Maxirest",   geo: 64, voice: 14, trend: 0,
    blurb: "POS gastronómico consolidado en Argentina, marca histórica.", cat: "POS Gastronomía" },
  { id: "bistrosoft", name: "Bistrosoft", geo: 58, voice: 11, trend: +3,
    blurb: "Software de gestión gastronómica, crecimiento en contenido.", cat: "POS Gastronomía" },
  { id: "bas",        name: "BAS",        geo: 49, voice: 9,  trend: -2,
    blurb: "ERP/gestión comercial para cadenas y distribución.", cat: "ERP Comercial" },
  { id: "ayres",      name: "Ayres IT",   geo: 44, voice: 8,  trend: 0,
    blurb: "Software de gestión y POS, foco regional.", cat: "Gestión / POS" },
  { id: "thinkion",   name: "Thinkion",   geo: 38, voice: 7,  trend: +1,
    blurb: "Soluciones de software a medida, posicionamiento difuso.", cat: "Software a medida" },
];

// ---- FASE 1 · Simulación de consultas ----
// pos: posición de SmartFran (0 = no aparece). rec: principal|secundaria|ausente
window.QUERIES = [
  { cat: "Franquicias", items: [
    { q: "Mejor software para franquicias en Argentina", brands: ["Fudo","Napse","SmartFran","Maxirest"], pos: 3, rec: "secundaria", conf: 72 },
    { q: "Software para administrar franquicias",         brands: ["Fudo","SmartFran","Napse"],            pos: 2, rec: "secundaria", conf: 64 },
    { q: "Plataforma para gestión de franquicias",        brands: ["Napse","Fudo","BAS"],                   pos: 0, rec: "ausente",    conf: 58 },
    { q: "ERP para franquicias",                          brands: ["Napse","BAS","SAP","Fudo"],             pos: 0, rec: "ausente",    conf: 61 },
    { q: "Software para cadena de franquicias",           brands: ["Fudo","Napse","Maxirest","SmartFran"], pos: 4, rec: "secundaria", conf: 55 },
    { q: "Software para franquicias gastronómicas",       brands: ["Fudo","Maxirest","Bistrosoft"],         pos: 0, rec: "ausente",    conf: 69 },
  ]},
  { cat: "POS y Retail", items: [
    { q: "Mejor software POS para cadenas",          brands: ["Fudo","Napse","Maxirest"],          pos: 0, rec: "ausente",  conf: 74 },
    { q: "Sistema para múltiples sucursales",        brands: ["Napse","Fudo","SmartFran"],         pos: 3, rec: "secundaria", conf: 60 },
    { q: "Software retail omnicanal",                brands: ["Napse","SAP","Oracle"],             pos: 0, rec: "ausente",  conf: 78 },
    { q: "Plataforma para gestión de puntos de venta", brands: ["Fudo","Maxirest","Bistrosoft"],   pos: 0, rec: "ausente",  conf: 66 },
  ]},
  { cat: "Analítica", items: [
    { q: "Dashboard para franquicias",            brands: ["SmartFran","Power BI","Napse"],   pos: 1, rec: "principal", conf: 51 },
    { q: "Business Intelligence para franquicias", brands: ["Power BI","SmartFran","Tableau"], pos: 2, rec: "secundaria", conf: 49 },
    { q: "Power BI para franquicias",             brands: ["Power BI","SmartFran"],           pos: 2, rec: "secundaria", conf: 47 },
    { q: "Indicadores para cadenas comerciales",   brands: ["Napse","Power BI","Fudo"],        pos: 0, rec: "ausente",  conf: 53 },
  ]},
  { cat: "Operaciones", items: [
    { q: "Gestión de stock en franquicias",        brands: ["Fudo","SmartFran","Napse"],       pos: 2, rec: "secundaria", conf: 57 },
    { q: "Gestión de compras centralizadas",       brands: ["Napse","BAS","SmartFran"],        pos: 3, rec: "secundaria", conf: 50 },
    { q: "Fidelización de clientes en franquicias", brands: ["Fudo","Napse"],                   pos: 0, rec: "ausente",  conf: 62 },
    { q: "Automatización de operaciones retail",    brands: ["Napse","Fudo"],                   pos: 0, rec: "ausente",  conf: 70 },
  ]},
];

// ---- FASE 2 · Share of AI Voice ----
// apariciones / principales / secundarias / ausencias / score
window.VOICE = [
  { id:"fudo",       name:"Fudo",       ap: 84, prin: 41, sec: 43, aus: 12, score: 88 },
  { id:"napse",      name:"Napse",      ap: 71, prin: 28, sec: 43, aus: 25, score: 74 },
  { id:"maxirest",   name:"Maxirest",   ap: 52, prin: 12, sec: 40, aus: 44, score: 58 },
  { id:"bistrosoft", name:"Bistrosoft", ap: 39, prin: 7,  sec: 32, aus: 57, score: 47 },
  { id:"bas",        name:"BAS",        ap: 33, prin: 5,  sec: 28, aus: 63, score: 41 },
  { id:"ayres",      name:"Ayres IT",   ap: 28, prin: 3,  sec: 25, aus: 68, score: 36 },
  { id:"thinkion",   name:"Thinkion",   ap: 22, prin: 2,  sec: 20, aus: 74, score: 30 },
  { id:"smartfran",  name:"SmartFran",  ap: 19, prin: 2,  sec: 17, aus: 77, score: 24, focus:true },
];

// Share of voice por motor (para heatmap) — % aprox. de SmartFran y top rivales
window.VOICE_BY_ENGINE = [
  // brand, [chatgpt, gemini, claude, copilot, grok, perplexity]
  { name:"Fudo",       v:[28,24,22,27,25,30] },
  { name:"Napse",      v:[20,22,18,19,17,21] },
  { name:"Maxirest",   v:[14,13,15,12,16,11] },
  { name:"Bistrosoft", v:[11,10,13,9,12,8] },
  { name:"SmartFran",  v:[7,5,9,4,6,8], focus:true },
];

// ---- FASE 3 · Autoridad (scores 0-10) ----
window.AUTH_CRIT = {
  digital: ["Presencia web","Calidad SEO","Claridad propuesta de valor","Contenido educativo","Casos de éxito","Cobertura geográfica"],
  ai: ["Entendibilidad","Claridad de categoría","Información pública","Medios especializados","Rankings","Directorios SaaS","Consistencia de marca"],
};
// scores por marca: { digital:[...6], ai:[...7] }
window.AUTH = {
  SmartFran:  { digital:[6,4,7,3,2,4], ai:[7,8,3,1,1,2,6] },
  Fudo:       { digital:[9,8,8,9,8,8], ai:[9,9,9,8,7,8,9] },
  Napse:      { digital:[8,7,7,6,7,9], ai:[7,7,8,7,6,7,8] },
  Maxirest:   { digital:[7,6,6,4,5,6], ai:[6,7,6,4,4,6,7] },
  Bistrosoft: { digital:[6,6,6,5,4,5], ai:[6,6,5,3,3,5,6] },
  BAS:        { digital:[5,4,5,3,4,6], ai:[5,4,5,3,2,4,5] },
  "Ayres IT": { digital:[5,3,4,2,3,4], ai:[4,4,4,2,1,3,5] },
  Thinkion:   { digital:[4,3,3,2,2,4], ai:[3,3,4,1,1,3,4] },
};

// ---- FASE 4 · Entendimiento de marca ----
window.UNDERSTANDING = {
  smartfran: {
    quien: "Plataforma cloud argentina especializada en la gestión integral de franquicias y cadenas multi-sucursal.",
    problema: "Centraliza ventas, stock, compras, fidelización e indicadores de toda una red de franquicias en un solo lugar.",
    para: "Franquiciantes, cadenas gastronómicas y retail con múltiples sucursales en LatAm.",
    dif: ["Foco 100% en el modelo de franquicia","Visión consolidada multi-sucursal","Suite modular (Cloud, Loyalty, Pedidos)"],
    claridad: 42,
    nota: "El posicionamiento es claro en el sitio propio, pero la IA casi no dispone de señales externas que lo confirmen.",
  },
  comp: [
    { name:"Fudo",       claridad:91, note:"Categoría POS gastronómico muy clara y repetida en miles de fuentes." },
    { name:"Napse",      claridad:82, note:"Retail omnicanal enterprise, bien documentado en medios y partners." },
    { name:"Maxirest",   claridad:74, note:"POS gastronómico, marca histórica reconocible." },
    { name:"Bistrosoft", claridad:66, note:"Gestión gastronómica, posicionamiento correcto pero menos citado." },
    { name:"BAS",        claridad:55, note:"ERP comercial, categoría amplia y algo difusa." },
    { name:"Ayres IT",   claridad:48, note:"Mezcla POS + software a medida, categoría poco nítida." },
    { name:"Thinkion",   claridad:33, note:"Software a medida: la IA no logra ubicar una categoría concreta." },
    { name:"SmartFran",  claridad:42, focus:true, note:"Nicho potente pero sin respaldo de fuentes externas." },
  ],
};

// ---- FASE 5 · Benchmark GEO ----
window.BENCH = [
  { name:"Fudo", str:["Comunidad y reviews masivas (G2, Capterra)","Blog y YouTube con alto volumen","Categoría POS inequívoca"],
    weak:["No cubre el modelo franquicia end-to-end","Menos foco en consolidación multi-sucursal"] },
  { name:"Napse", str:["Presencia enterprise y partners globales","Cobertura geográfica amplia","Apariciones en medios retail"],
    weak:["Mensaje técnico, poco específico para franquicias","Menos contenido educativo accesible"] },
  { name:"Maxirest", str:["Marca histórica reconocida","Base instalada amplia en gastronomía"],
    weak:["Contenido digital desactualizado","Pocos casos de éxito públicos"] },
  { name:"Bistrosoft", str:["Buen ritmo de contenido reciente","Reviews crecientes"],
    weak:["Autoridad temática media","Sin foco en franquicias"] },
  { name:"BAS", str:["Trayectoria en ERP comercial"],
    weak:["Categoría difusa","Baja presencia en directorios SaaS"] },
  { name:"Ayres IT", str:["Presencia regional"],
    weak:["Posicionamiento mixto","Escasa información pública estructurada"] },
  { name:"Thinkion", str:["Capacidad técnica a medida"],
    weak:["Sin categoría clara","Casi nula autoridad temática GEO"] },
];

// ---- FASE 6 · Fuentes ----
// nivel: SmartFran vs líder de categoría
window.SOURCES = [
  { src:"Sitio web oficial",   sf:"Medio", lead:"Alto",  note:"Bien hecho pero poco optimizado para extracción por IA." },
  { src:"Blog corporativo",    sf:"Bajo",  lead:"Alto",  note:"Volumen y frecuencia insuficientes." },
  { src:"LinkedIn",            sf:"Medio", lead:"Alto",  note:"Actividad irregular, poco contenido de categoría." },
  { src:"YouTube",             sf:"Bajo",  lead:"Alto",  note:"Casi sin contenido indexable." },
  { src:"Medios especializados", sf:"Bajo", lead:"Medio", note:"Sin menciones en prensa de retail/gastronomía." },
  { src:"Directorios SaaS",    sf:"Bajo",  lead:"Alto",  note:"Ausente en los principales directorios." },
  { src:"G2",                  sf:"Bajo",  lead:"Alto",  note:"Sin perfil ni reviews." },
  { src:"Capterra",            sf:"Bajo",  lead:"Alto",  note:"Sin perfil ni reviews." },
  { src:"GetApp",              sf:"Bajo",  lead:"Medio", note:"Sin presencia." },
  { src:"Software Advice",     sf:"Bajo",  lead:"Medio", note:"Sin presencia." },
  { src:"Clutch",              sf:"Bajo",  lead:"Bajo",  note:"Baja relevancia para la categoría." },
  { src:"Reddit",              sf:"Bajo",  lead:"Medio", note:"Sin hilos ni menciones orgánicas." },
  { src:"Wikipedia",           sf:"Bajo",  lead:"Bajo",  note:"Sin artículo (oportunidad de autoridad)." },
  { src:"Casos de éxito públicos", sf:"Bajo", lead:"Alto", note:"Faltan casos documentados y citables." },
];

// ---- FASE 7 · Oportunidades (matriz impacto/esfuerzo) ----
window.OPPS = [
  // impact & effort 1-3 (3 = alto). prio derivada
  { acc:"Crear perfiles en G2, Capterra y GetApp", impact:3, effort:1, prio:"Crítica", group:"quick" },
  { acc:"Publicar 6 casos de éxito citables", impact:3, effort:2, prio:"Alta", group:"quick" },
  { acc:"Reescribir home con categoría explícita ('software para franquicias')", impact:3, effort:1, prio:"Crítica", group:"quick" },
  { acc:"FAQ estructurada + schema para extracción IA", impact:2, effort:1, prio:"Alta", group:"quick" },
  { acc:"Programa de reviews con clientes actuales", impact:2, effort:2, prio:"Media", group:"90" },
  { acc:"Cluster de contenido 'gestión de franquicias'", impact:3, effort:2, prio:"Alta", group:"90" },
  { acc:"Serie en YouTube + demos indexables", impact:2, effort:3, prio:"Media", group:"90" },
  { acc:"PR en medios de retail y gastronomía", impact:3, effort:3, prio:"Alta", group:"180" },
  { acc:"Artículo de Wikipedia + autoridad de marca", impact:2, effort:3, prio:"Media", group:"180" },
  { acc:"Partnerships y rankings de categoría", impact:3, effort:3, prio:"Alta", group:"180" },
];

// ---- FASE 8 · GEO Score (composición ponderada) ----
window.GEO_WEIGHTS = [
  { k:"Share of AI Voice",            w:30, sf:24 },
  { k:"Autoridad temática",           w:25, sf:35 },
  { k:"Claridad de posicionamiento",  w:15, sf:42 },
  { k:"Presencia en fuentes externas",w:15, sf:18 },
  { k:"Probabilidad de recomendación",w:15, sf:38 },
];

// ---- FASE 9 · Plan / Roadmap ----
window.ROADMAP = [
  { phase:"30 días · Quick Wins", color:"#f0b034", items:[
    "Alta en G2, Capterra, GetApp y Software Advice con copy de categoría",
    "Home reescrita: 'Software de gestión para franquicias'",
    "Publicar 3 casos de éxito con métricas",
    "FAQ + datos estructurados (schema.org) para IA",
  ]},
  { phase:"90 días · Iniciativas", color:"#2cced7", items:[
    "Cluster de 12 artículos pilar sobre gestión de franquicias",
    "Programa de reviews (objetivo: 25 reviews verificadas)",
    "8 videos demo en YouTube optimizados",
    "Calendario LinkedIn 3x/semana con liderazgo de categoría",
  ]},
  { phase:"180 días · Estrategia", color:"#ae00ff", items:[
    "PR sostenido en medios de retail/gastronomía LatAm",
    "Artículo de Wikipedia y presencia en rankings",
    "Partnerships citables y co-marketing",
    "Medición mensual de Share of AI Voice y GEO Score",
  ]},
];

// Métricas a seguir
window.METRICS = [
  { k:"Share of AI Voice", now:"6%", goal:"18%" },
  { k:"GEO Score",         now:"31", goal:"60" },
  { k:"Recom. principales", now:"2",  goal:"15" },
  { k:"Fuentes externas",   now:"3",  goal:"14" },
  { k:"Reviews verificadas", now:"0", goal:"40" },
];

// Entregable · riesgos
window.RISKS = [
  { t:"Invisibilidad acelerada", d:"Si los rivales siguen alimentando a las IA, la brecha se vuelve estructural." },
  { t:"Categoría capturada por Fudo", d:"'Software para gastronomía' ya tiene dueño en la mente de los modelos." },
  { t:"Sin señales externas", d:"La IA no puede recomendar lo que no puede verificar fuera del sitio propio." },
  { t:"Ventana competitiva", d:"GEO aún es incipiente: quien actúe primero fija el posicionamiento." },
];
