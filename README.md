<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-cover.png">
  <img src="assets/hero-cover.png" alt="Lorenzo Perassi — Portfolio" width="100%">
</picture>

<p align="center">
  <a href="https://lorenzoperassi.it"><strong>lorenzoperassi.it</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap 5">
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

---

## about

Portfolio personale di Lorenzo Perassi — developer, founder di Customly e studente di Informatica. Un diario digitale dove convivono comunicazione, customizzazione di abbigliamento, sviluppo web e sperimentazione creativa.

## sezioni

| Sezione          | Descrizione                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| Hero             | Branding personale con typewriter, contatori animati e link social         |
| About            | Chi sono, background e percorso                                            |
| What I Do        | Comunicazione, fashion & custom, informatica & tech con video dimostrativi |
| Customly         | Sezione dedicata alla piattaforma Customly con descrizione e CTA al sito   |
| Servizi          | Web design, custom fashion e comunicazione & contenuti                     |
| Digital Presence | Vetrina social scrollabile con drag/touch e auto-scroll infinito           |
| Projects         | Customly · CRYBU · Fashion Customization                                   |
| Experience       | Customly — Founder · Omnia4Web · Stage IT presso Bertolotto Porte          |
| Collaborations   | Aleyesure · StageStreetwear · NewGenMusic4                                 |
| Tools & Skills   | Griglia tecnologica con tooltip di livello e contesto                      |
| Contact          | Form (Formspree) + WhatsApp                                                |

## tech stack

- **HTML5** — Semantico, accessibile, SEO-ready con JSON-LD, Open Graph, Twitter Cards
- **CSS3** — Custom properties, animazioni, glassmorphism, responsive
- **JavaScript** (vanilla) — IntersectionObserver, drag scroll, lightbox, filtri progetti, i18n IT/EN
- **Bootstrap 5.3** — Navbar, griglia, layout responsive
- **Express** — Server con compressione e caching immutabile degli asset statici
- **Devicon** — Icone tecnologie
- **Formspree** — Backend form serverless
- **Google Fonts** — Plus Jakarta Sans, Space Mono, IBM Plex Mono

## features

- **Tema scuro** con effetti glassmorphism e bordo accent
- **i18n** — Italiano/Inglese con salvataggio preferenza in localStorage
- **Filtri progetti** — All · Client Work · Personal Project · Fashion Customization
- **Lightbox** per immagini e video con navigazione touch, swipe e frecce
- **Progress bar** di lettura
- **Scroll infinito** presenza social
- **Tipografia animata** (typewriter) e contatori
- **Musica di sottofondo** toggle
- **Timeline esperienze** interattiva
- **SEO** — JSON-LD, Open Graph, Twitter Cards, sitemap.xml, robots.txt
- **Accessibilità** — Gerarchia heading, aria-label, focus visible, skip navigation
- **100% mobile responsive**

## struttura

```
├── index.html
├── server.js                  # Express server (compressione, caching)
├── package.json
├── css/
│   ├── combined.css           # CSS sorgente
│   └── combined.min.css       # CSS minificato (production)
├── script.js                  # JS sorgente
├── script.min.js              # JS minificato (production)
├── script.min.js.map          # Source map per debug
├── assets/
│   ├── *.jpg / *.png / *.avif # Immagini portfolio
│   ├── *.mp4 / *.mov          # Video dimostrativi
│   └── bg-convergence.mp3     # Musica background
├── robots.txt
└── sitemap.xml
```

## iniziare

```bash
git clone https://github.com/perassilorenzo/portfolio.git
cd portfolio
bun install
bun run start     # http://localhost:3000
```

Per sviluppo:

```bash
bun run build     # minifica CSS + JS
```

## build

| Comando             | Azione                                              |
| ------------------- | --------------------------------------------------- |
| `bun run build:css` | Minifica `css/combined.css` → `combined.min.css`    |
| `bun run build:js`  | Minifica `script.js` → `script.min.js` + source map |
| `bun run build`     | Esegue entrambi i comandi                           |

## contatti

- **Email:** perassi.lorenzo1804@gmail.com
- **Instagram:** [@diario_di_uno_09](https://www.instagram.com/diario_di_uno_09)
- **TikTok:** [@diario_di_uno_09](https://www.tiktok.com/@diario_di_uno_09)
- **YouTube:** [@diario_di_uno_09](https://www.youtube.com/@diario_di_uno_09)
- **Linktree:** [linktr.ee/lollo_pera](https://linktr.ee/lollo_pera)

---

<p align="center">
  Built with ❤️ by Lorenzo Perassi · MIT License
</p>
