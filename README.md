# Lorenzo Perassi — Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](#license)

**Live:** [lorenzoperassi.it](https://lorenzoperassi.it) · [GitHub Pages](https://perassilorenzo.github.io/portfolio)

Personal portfolio website built to showcase my work, projects, and creative journey across content creation, fashion, and technology.

---

## Sections

| Section              | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Hero**             | Personal branding with animated marquee, stats, typewriter, and social links             |
| **About**            | Who I am, background, and what I do                                                      |
| **What I Do**        | Content Creation, Fashion & Custom, Informatics & Tech                                   |
| **Digital Presence** | Embedded social content showcase with drag/touch scroll                                  |
| **Projects**         | Diario di uno 09, CRYBU, Fashion Custom, Collaborations, Agency, Affitti brevi a Saluzzo |
| **Collaborations**   | Partners: Aleyesure, StageStreetwear, NewGenMusic4, RAFFER RECORDS                       |
| **Tools & Skills**   | Tech grid with skill levels and context tooltips                                         |
| **Contact**          | Contact form (Formspree) + WhatsApp direct link                                          |

---

## Features

- Responsive layout (Bootstrap 5.3)
- Dark theme with glassmorphism effects
- Animated marquee + typewriter + counter animations
- Background music toggle (Convergence.mp3)
- Drag & touch scroll for video gallery
- Project filtering by category
- Scroll-based reading progress bar
- SEO-optimized (JSON-LD structured data, Open Graph, Twitter Cards)
- Contact form via Formspree (serverless)

---

## Tech Stack

- **HTML5** — Semantic markup, accessibility
- **CSS3** — Custom properties, gradients, transitions (`base.css`, `sections.css`, `responsive.css`)
- **JavaScript** (vanilla) — IntersectionObserver, drag scroll, lightbox, animations
- **Bootstrap 5.3** — Layout, navbar, responsive grid
- **Devicon** — Technology icons
- **Formspree** — Serverless form backend

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/perassilorenzo/portfolio.git

# Open locally
cd portfolio
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

No build tools required — pure HTML/CSS/JS.

---

## Project Structure

```
├── index.html           # Main entry point
├── css/
│   ├── base.css         # Variables, reset, typography, utilities
│   ├── sections.css     # Section-specific styles (hero, about, projects, etc.)
│   └── responsive.css   # Mobile-first breakpoints
├── script.js            # All JavaScript (vanilla)
├── assets/
│   ├── images/          # Portfolio shots, project images, collab logos
│   ├── videos/          # Content showcase (.MOV)
│   └── Convergence.mp3  # Background music
├── robots.txt           # Search engine crawl rules
└── sitemap.xml          # XML sitemap
```

---

## SEO & Structured Data

- **Open Graph** — `og:title`, `og:description`, `og:image`, `og:url`, `og:locale`
- **Twitter Cards** — `summary_large_image`
- **JSON-LD** — `Person` schema (name, job title, sameAs, knowsAbout) + `WebSite` schema
- **Canonical URL** — Prevents duplicate content
- **Sitemap** — `sitemap.xml` with weekly crawl priority
- **Semantic HTML** — Sections, articles, proper heading hierarchy (h1 → h2 → h3 → h4)

---

## Contact

- **Email:** perassi.lorenzo1804@gmail.com
- **Instagram:** [@diario_di_uno_09](https://www.instagram.com/diario_di_uno_09)
- **TikTok:** [@diario_di_uno_09](https://www.tiktok.com/@diario_di_uno_09)
- **YouTube:** [@diario_di_uno_09](https://www.youtube.com/@diario_di_uno_09)
- **Linktree:** [linktr.ee/lollo_pera](https://linktr.ee/lollo_pera)
- **WhatsApp:** [+39 329 336 0374](https://wa.me/393293360374)

---

## License

MIT — feel free to use this as inspiration for your own portfolio.

Built with ❤️ by Lorenzo Perassi
