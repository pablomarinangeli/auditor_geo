# Auditor GEO · SmartFran

Aplicación web que opera como **auditor experto GEO** (Generative Engine Optimization), enfocado en **Share of AI Voice**, **AI Visibility** y la probabilidad de que los motores de IA (ChatGPT, Gemini, Claude, Copilot, Grok, Perplexity) recomienden a SmartFran frente a sus competidores.

Prototipo interactivo (React + Babel, sin build) pensado como **handoff para Claude Code** / desarrollo.

## ▶️ Cómo correrlo

No requiere build ni instalación. Serví la carpeta con cualquier static server:

```bash
npx serve .
# o
python3 -m http.server 8000
```

Y abrí `Auditor GEO.html`. (Por los `<script src>` locales conviene servirlo por HTTP, no con `file://`.)

## 🗂️ Estructura

```
Auditor GEO.html        # Shell + sistema de diseño (CSS) + carga de scripts
js/
  data.jsx              # TODOS los datos mock (marcas, motores, 9 fases) — único punto a conectar a API
  shell.jsx             # Primitivos UI: Sidebar, Topbar, Card, ScoreRing, Bar, tablas…
  views-overview.jsx    # Resumen ejecutivo + F8 GEO Score
  views-launch.jsx      # Nueva Auditoría (lanzar) + F1 Simulación de consultas
  views-analysis.jsx    # F2 Share of AI Voice · F3 Autoridad · F4 Marca · F5 Benchmark · F6 Fuentes
  views-plan.jsx        # F7 Oportunidades · F9 Plan · Reporte ejecutivo
  app.jsx               # Router (hash) + montaje
assets/                 # Logo SmartFran + patrón de marca
```

## 🧭 Vistas (12)

| Sección | Descripción |
|---|---|
| **Resumen** | GEO Score, Share of AI Voice, rankings e insights estratégicos |
| **Nueva Auditoría** | Configurás motores / marcas / categorías y corre la auditoría con progreso en vivo |
| **F1** | Simulación de consultas: marcas que aparecen por query, posición y confianza |
| **F2** | Share of AI Voice: tabla + heatmap por motor |
| **F3** | Análisis de Autoridad (scoring 0–10, benchmark vs líder) |
| **F4** | Entendimiento de marca por la IA |
| **F5** | Benchmark competitivo GEO |
| **F6** | Análisis de fuentes (G2, Capterra, directorios…) |
| **F7** | Oportunidades: matriz impacto × esfuerzo |
| **F8** | GEO Score final (índice ponderado) |
| **F9** | Plan para dominar las IA (roadmap 30-90-180) |
| **Reporte** | Síntesis ejecutiva para dirección |

## 🔌 Conectar datos reales

Todos los datos viven en `js/data.jsx` como objetos en `window.*` (`window.BRANDS`, `window.VOICE`, `window.AUTH`, `window.OPPS`, …). Para conectar a un backend real, reemplazá esas asignaciones por `fetch` a tu API manteniendo la misma forma de datos.

## 🎨 Marca

Dark mode tech con la paleta de SmartFran — navy `#0f0035` + neón `#ae00ff`, tipografías Space Grotesk + Hanken Grotesk.

> ⚠️ Los datos incluidos son **mock** (ilustrativos) para demostrar el flujo del producto.
