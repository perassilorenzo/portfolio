# AGENTS.md — Knowledge Base Portfolio

Guida per agenti AI che lavorano su questo repository.

## Panoramica

Portfolio bilingue (IT/EN) di Lorenzo Perassi, single-page. Deploy su Cloudflare Pages.
Stack: HTML5 + CSS3 + JS vanilla + Bootstrap 5.3 (CDN) + Express (dev server) + Formspree (form).

## Comandi

```bash
# Server di sviluppo (porta a scelta)
PORT=3011 node server.js

# Rebuild CSS minificato (OBBLIGATORIO dopo ogni modifica a combined.css)
node_modules/.bin/csso css/combined.css --output css/combined.min.css

# Verifiche pre-commit
node --check script.js          # sintassi JS
curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/   # smoke test
```

## Convenzioni critiche

- **CSS**: `css/combined.css` è la fonte; `combined.min.css` va SEMPRE rigenerato con csso.
  Il file contiene regole duplicate: le ultime vincono. Le media query mobile sono
  raggruppate a FINE file (blocco "MOBILE CONTACT + CONFIGURATOR", perf block, footer).
- **i18n**: dizionario `LANG` in script.js (~riga 522 IT, ~875 EN). Ogni chiave nuova
  va aggiunta in ENTRAMBE le lingue. Applicazione via `setLang($)` + attributi
  `data-lang-key` / `data-lang-html` / `data-lang-title` / `data-lang-placeholder`.
- **Form contatti**: invio AJAX a Formspree (`mvznrbeq`) con feedback inline
  `.lp-form-status`. Honeypot `_gotcha`. Il campo nascosto `config-riepilogo` viene
  deduplicato a ogni submit. NON resettare il form dopo l'invio.
- **Configuratore**: `aggStatoConfig()` è responsive-aware (matchMedia 900px):
  su mobile sposta `.lp-contact-alternative` e `#contact-summary` in fondo alla griglia;
  su desktop ripristina l'ordine originale. Listener `_mqContactMobile` ri-applica al resize.
- **Estetica**: le modifiche non devono cambiare l'aspetto visibile senza esplicita
  richiesta dell'utente.

## Gotchie note

- **Bootstrap**: i link CDN e `bootstrap.Collapse` in script.js sono ESSENZIALI.
  Il toggler navbar richiede `data-bs-toggle="collapse" data-bs-target="#navLinks"`
  sull'HTML: senza quelli il burger non apre il menu.
- **Icone devicon**: self-hosted in `assets/devicon/` (css + woff). Il css referenzia
  anche .ttf che non esiste: innocuo (i browser usano il woff).
- **Video progetti**: serviti come `.webm` (VP9) con fallback `.mp4`, poster `.webp`.
- **Scroll mobile**: niente `backdrop-filter` sulla navbar né `.lp-bg-glow` sotto 768px
  (causavano scroll scattoso — blocco "PERF MOBILE" a fine combined.css).
- **pkill node** può appendersi in WSL: killare per PID preso da `ss -tlnp`.
- **Verifica server**: il primo curl spesso ritorna 000 (race di avvio): riprovare
  o controllare `ss -tlnp | grep PORT`.
- **Browser rendering non disponibile** in questo ambiente (mancano librerie di sistema
  per chromium): fare verifica statica (brace balance, div balance, node --check).

## Deploy

Cloudflare Pages dal repo GitHub (`perassilorenzo/portfolio`). File speciali:
- `_headers` — security headers (nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- `404.html` — pagina errore bilingue standalone
- `manifest.json` — PWA (icone 180/512)

## Pulizia history git

La history conteneva video .MOV da decine di MB (rimossi dal tree ma presenti nei
vecchi commit). Se il repo cresce di nuovo: `git filter-repo --force
--strip-blobs-bigger-than 5M`, poi ri-aggiungere origin e force-push.
