document.addEventListener("DOMContentLoaded", function () {
  const o = document.getElementById("navLinks"),
    n = document.querySelector(".navbar-toggler");
  if (o && n && window.bootstrap) {
    const M = new bootstrap.Collapse(o, { toggle: !1 });
    o.querySelectorAll(".nav-link").forEach((e) => {
      e.addEventListener("click", () => {
        "none" !== window.getComputedStyle(n).display && M.hide();
      });
    });
  }
  const c = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        e.isIntersecting &&
          (e.target.classList.add("visible"), c.unobserve(e.target));
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );
  document.querySelectorAll(".lp-reveal").forEach((e) => c.observe(e));
  const l = document.querySelectorAll("section[id]"),
    r = document.querySelectorAll('.lp-nav-link[href^="#"]'),
    a = document.querySelector(".lp-navbar .navbar-nav");
  let i;
  if (a && window.innerWidth >= 992) {
    function d(e) {
      if (!e) return;
      const t = e.getBoundingClientRect(),
        o = a.getBoundingClientRect();
      ((i.style.left = t.left - o.left + "px"),
        (i.style.width = t.width + "px"));
    }
    ((i = document.createElement("div")),
      (i.className = "lp-nav-indicator"),
      (a.style.position = "relative"),
      a.appendChild(i),
      d(
        document.querySelector(
          '.lp-nav-link.active, .lp-nav-link[href="#hero"]',
        ),
      ));
    const R = new IntersectionObserver(
      (e) => {
        e.forEach((e) => {
          if (e.isIntersecting) {
            r.forEach((e) => e.classList.remove("active"));
            const t = document.querySelector(
              `.lp-nav-link[href="#${e.target.id}"]`,
            );
            t && (t.classList.add("active"), d(t));
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );
    (l.forEach((e) => R.observe(e)),
      addEventListener("resize", () =>
        d(document.querySelector(".lp-nav-link.active")),
      ));
  } else {
    const W = new IntersectionObserver(
      (e) => {
        e.forEach((e) => {
          if (e.isIntersecting) {
            r.forEach((e) => e.classList.remove("active"));
            const t = document.querySelector(
              `.lp-nav-link[href="#${e.target.id}"]`,
            );
            t && t.classList.add("active");
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );
    l.forEach((e) => W.observe(e));
  }
  const u = document.getElementById("backToTop");
  (u &&
    (addEventListener(
      "scroll",
      () => u.classList.toggle("visible", scrollY > 500),
      { passive: !0 },
    ),
    u.addEventListener("click", () =>
      scrollTo({ top: 0, behavior: "smooth" }),
    )),
    addEventListener("keydown", (e) => {
      "Tab" === e.key && document.body.classList.add("lp-focus-visible");
    }),
    addEventListener("mousedown", () =>
      document.body.classList.remove("lp-focus-visible"),
    ));
  const m = document.getElementById("readingProgress");
  m &&
    addEventListener(
      "scroll",
      () => {
        const e = document.documentElement.scrollHeight - innerHeight;
        m.style.width = e > 0 ? (scrollY / e) * 100 + "%" : "0%";
      },
      { passive: !0 },
    );
  const p = document.querySelector(".lp-typewriter");
  if (p) {
    const z =
      "Costruisco siti web, custom fashion e contenuti video che portano risultati.";
    let G = 0;
    !(function e() {
      ((p.textContent = z.slice(0, G)),
        G++,
        G <= z.length && setTimeout(e, 30));
    })();
  }
  const term = document.querySelector(".lp-terminal");
  if (term) {
    const body = term.querySelector(".lp-terminal-body"),
      lines = [
        { c: "whoami" },
        { t: "lorenzo perassi — tech · fashion · communication" },
        { c: "cat stack.txt" },
        { t: "lang:    html css js seo/geo" },
        { t: "web:     cloudflare github d1 r2" },
        { t: "fashion: custom" },
        { c: "echo $MAIN_PROJECT" },
        { t: "customly.it — custom fashion platform" },
        { c: "ls ./goals" },
        { t: "build grow network" },
      ];
    let done = !1;
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((en) => {
          if (!en.isIntersecting || done) return;
          ((done = !0),
            obs.unobserve(term),
            (body.innerHTML = ""),
            (function step(i, j) {
              if (i >= lines.length) {
                const row = document.createElement("div");
                ((row.className = "lp-term-line"),
                  (row.innerHTML =
                    '<span class="lp-term-prompt">$ </span><span class="lp-term-cursor"></span>'),
                  body.appendChild(row));
                return;
              }
              const cur = lines[i],
                row = document.createElement("div");
              row.className = "lp-term-line";
              if (cur.c) {
                const cmd = document.createElement("span");
                ((cmd.className = "lp-term-cmd"),
                  row.appendChild(cmd),
                  row.insertAdjacentHTML(
                    "afterbegin",
                    '<span class="lp-term-prompt">$ </span>',
                  ),
                  body.appendChild(row));
                !(function tick() {
                  ((cmd.textContent = cur.c.slice(0, j)),
                    j++,
                    j <= cur.c.length
                      ? setTimeout(tick, 26)
                      : setTimeout(() => step(i + 1, 0), 180));
                })();
              } else {
                (row.classList.add("lp-term-out"),
                  (row.textContent = cur.t),
                  body.appendChild(row),
                  setTimeout(() => step(i + 1, 0), 110));
              }
            })(0, 0));
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(term);
  }
  const v = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        if (!e.isIntersecting) return;
        const t = e.target,
          o = parseInt(t.dataset.target);
        if (isNaN(o)) return;
        const n = Date.now();
        (!(function e() {
          const s = Math.min((Date.now() - n) / 1500, 1);
          ((t.textContent = Math.floor(s * o)),
            s < 1 ? requestAnimationFrame(e) : (t.textContent = o));
        })(),
          v.unobserve(t));
      });
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll(".lp-counter").forEach((e) => v.observe(e));
  const h = new IntersectionObserver(
    (e) => {
      e.forEach((e) => {
        e.isIntersecting
          ? (e.target.play().catch(() => {}), h.unobserve(e.target))
          : e.target.pause();
      });
    },
    { threshold: 0 },
  );
  document.querySelectorAll("video").forEach((e) => h.observe(e));
  const f = document.querySelector(".lp-hero-img");
  if (f) {
    const J = parseFloat(f.dataset.speed) || 0.95;
    const heroImage = document.getElementById("heroImage");
    const glow = heroImage ? heroImage.querySelector(".lp-hero-glow") : null;
    let tiltX = 0,
      tiltY = 0;
    if (heroImage) {
      heroImage.addEventListener("mousemove", (e) => {
        const o = heroImage.getBoundingClientRect();
        const px = (e.clientX - o.left) / o.width - 0.5;
        const py = (e.clientY - o.top) / o.height - 0.5;
        tiltY = px * 14;
        tiltX = py * -14;
        if (glow) {
          glow.style.left = e.clientX - o.left + "px";
          glow.style.top = e.clientY - o.top + "px";
        }
        f.style.transform = `translateY(${0.3 * (scrollY * (1 - J))}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      heroImage.addEventListener("mouseleave", () => {
        tiltX = 0;
        tiltY = 0;
        f.style.transform = `translateY(${0.3 * (scrollY * (1 - J))}px)`;
      });
    }
    addEventListener(
      "scroll",
      () => {
        const e = scrollY * (1 - J);
        f.style.transform = `translateY(${0.3 * e}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      },
      { passive: !0 },
    );
  }
  const heroLines = document.querySelectorAll(".lp-hero-line");
  if (heroLines.length) {
    addEventListener(
      "scroll",
      () => {
        heroLines.forEach((e) => {
          const o = parseFloat(e.dataset.speed) || 1;
          e.style.transform = `translateY(${scrollY * (1 - o) * -0.15}px)`;
        });
      },
      { passive: !0 },
    );
  }
  function g(e) {
    document.querySelectorAll("#projects .lp-project-card").forEach((t) => {
      const o = t.classList.contains("lp-project-card--empty"),
        n = t.dataset.category;
      "all" === e
        ? t.classList.toggle("hide", o)
        : t.classList.toggle("hide", n !== e);
    });
  }
  const L = document.querySelectorAll(".lp-filter-btn");
  L.length &&
    (L.forEach((e) => {
      e.addEventListener("click", () => {
        (L.forEach((e) => e.classList.remove("active")),
          e.classList.add("active"),
          g(e.dataset.filter));
      });
    }),
    g("all"));
  const y = document.getElementById("projectModal");
  (y &&
    document
      .querySelectorAll(".lp-project-card:not(.lp-project-card--empty)")
      .forEach((e) => {
        (e.addEventListener("click", () => {
          const g = e.dataset.scroll;
          if (g) {
            const m = document.getElementById(g);
            if (m) return void m.scrollIntoView({ behavior: "smooth" });
          }
          const media = e.dataset.media;
          const img = e.querySelector("img");
          ((document.getElementById("modalImg").src =
            media || (img ? img.src : "")),
            (document.getElementById("modalTitle").textContent =
              e.querySelector("h4").textContent),
            (document.getElementById("modalDesc").textContent =
              e.querySelector("p").textContent));
          const o = e.querySelectorAll(".lp-badge"),
            n = document.getElementById("modalBadges");
          ((n.innerHTML = ""),
            o.forEach((e) => {
              const t = document.createElement("span");
              ((t.className = "lp-badge"),
                (t.textContent = e.textContent),
                n.appendChild(t));
            }),
            y.classList.add("open"));
        }),
          (e.style.cursor = "pointer"));
      }),
    (window.closeProjectModal = function () {
      y.classList.remove("open");
    }),
    document.querySelectorAll(".lp-tech-item").forEach((e) => {
      const t = e.dataset.level,
        o = e.dataset.context;
      if (!t && !o) return;
      const n = document.createElement("div");
      ((n.className = "lp-tooltip"),
        (n.innerHTML =
          '<span class="lp-tooltip-level">' +
          t +
          '</span> · <span class="lp-tooltip-context">' +
          o +
          "</span>"),
        e.appendChild(n),
        e.addEventListener("click", (t) => {
          (t.stopPropagation(),
            document
              .querySelectorAll(".lp-tech-item.show-tip")
              .forEach((t) => t !== e && t.classList.remove("show-tip")),
            e.classList.toggle("show-tip"));
        }));
    }),
    document.addEventListener("click", () => {
      document
        .querySelectorAll(".lp-tech-item.show-tip")
        .forEach((e) => e.classList.remove("show-tip"));
    }));
  const E = document.getElementById("lightbox"),
    b = document.getElementById("lbMedia"),
    w = document.getElementById("lbPrev"),
    x = document.getElementById("lbNext"),
    q = document.getElementById("lbDots");
  let k = [],
    S = 0,
    I = 0;
  if (E && b) {
    function C() {
      const e = k[S];
      if (
        ((b.innerHTML = ""),
        (function (e) {
          return /\.(mp4|mov|webm|avi|mkv)$/i.test(e);
        })(e))
      ) {
        const t = document.createElement("video");
        ((t.src = e),
          (t.muted = !0),
          (t.loop = !0),
          (t.autoplay = !0),
          (t.playsInline = !0),
          b.appendChild(t),
          t.play().catch(() => {}));
      } else {
        const t = document.createElement("img");
        ((t.src = e), (t.alt = ""), b.appendChild(t));
      }
      ((q.innerHTML = ""),
        k.length <= 1 ||
          k.forEach((e, t) => {
            const o = document.createElement("button");
            ((o.className = "lp-lightbox-dot"),
              t === S && o.classList.add("active"),
              o.addEventListener("click", (e) => {
                (e.stopPropagation(), (S = t), C());
              }),
              q.appendChild(o));
          }),
        (w.style.display = k.length > 1 ? "" : "none"),
        (x.style.display = k.length > 1 ? "" : "none"));
    }
    function A(e) {
      k.length && ((S = (S + e + k.length) % k.length), C());
    }
    function B(e, t) {
      ((k = e), (S = t), E.classList.add("open"), C());
    }
    (document.querySelectorAll(".lp-collab-img").forEach((e) => {
      (e.addEventListener("click", (t) => {
        t.stopPropagation();
        B([e.src], 0);
      }),
        (e.style.cursor = "pointer"));
    }),
      document.querySelectorAll(".lp-project-media").forEach((e) => {
        e.addEventListener("click", (t) => {
          if (trackDragged) return;
          t.stopPropagation();
          const o = e.closest(".lp-project-card");
          if (!o) return;
          const n = o.dataset.video;
          B(n ? [n] : [o.dataset.media], 0);
        });
      }),
      w.addEventListener("click", (e) => {
        (e.stopPropagation(), A(-1));
      }),
      x.addEventListener("click", (e) => {
        (e.stopPropagation(), A(1));
      }),
      E.addEventListener(
        "touchstart",
        (e) => {
          I = e.changedTouches[0].screenX;
        },
        { passive: !0 },
      ),
      E.addEventListener(
        "touchend",
        (e) => {
          const t = e.changedTouches[0].screenX - I;
          Math.abs(t) > 50 && A(t > 0 ? -1 : 1);
        },
        { passive: !0 },
      ),
      document.addEventListener("keydown", (e) => {
        E.classList.contains("open") &&
          ("ArrowLeft" === e.key && A(-1),
          "ArrowRight" === e.key && A(1),
          "Escape" === e.key && window.closeLightbox());
      }),
      (window.closeLightbox = function () {
        (E.classList.remove("open"), (b.innerHTML = ""), (k = []));
      }));
  }
  const track = document.getElementById("projectsTrack"),
    prevBtn = document.getElementById("projectsPrev"),
    nextBtn = document.getElementById("projectsNext");
  let trackDragged = false;
  if (track) {
    const step = () => {
      const o = track.querySelector(".lp-project-card");
      return o ? o.getBoundingClientRect().width + 20 : 300;
    };
    prevBtn &&
      prevBtn.addEventListener("click", () =>
        track.scrollBy({ left: -step(), behavior: "smooth" }),
      );
    nextBtn &&
      nextBtn.addEventListener("click", () =>
        track.scrollBy({ left: step(), behavior: "smooth" }),
      );
    let isDown = false,
      startX = 0,
      scrolled = 0,
      moved = 0;
    track.addEventListener("mousedown", (e) => {
      isDown = true;
      moved = 0;
      startX = e.pageX - track.offsetLeft;
      scrolled = track.scrollLeft;
    });
    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - track.offsetLeft - startX;
      moved = Math.max(moved, Math.abs(dx));
      track.scrollLeft = scrolled - dx;
    });
    document.addEventListener("mouseup", () => {
      trackDragged = moved > 5;
      isDown = false;
      setTimeout(() => (trackDragged = false), 50);
    });
  }
  const ctaCard = document.querySelector(".lp-cta-card");
  if (ctaCard) {
    ctaCard.addEventListener("mousemove", (e) => {
      const o = ctaCard.getBoundingClientRect();
      const x = (e.clientX - o.left) / o.width - 0.5;
      const y = (e.clientY - o.top) / o.height - 0.5;
      ctaCard.style.setProperty("--cx", x.toFixed(3));
      ctaCard.style.setProperty("--cy", y.toFixed(3));
    });
  }
  const LANG = {
    it: {
      navAbout: "About",
      navServ: "Servizi",
      navProjects: "Projects",
      navSocials: "Socials",
      navContact: "Contact",
      heroBtn1: "Guarda i progetti",
      heroBtn2: "Contattami",
      heroAvail: "Disponibile per nuovi progetti",
      aboutSub: "Chi sono",
      aboutP1:
        "Sono Lorenzo Perassi, developer, creator e studente di Informatica. Costruisco prodotti digitali dove codice, design e creativit\u00e0 si incontrano. Il mio progetto principale \u00e8 Customly, una piattaforma di personalizzazione abbigliamento che unisce moda e tecnologia.",
      aboutP2:
        "Utilizzo le piattaforme digitali come uno spazio dove condividere progetti, esperimenti creativi, routine, lavoro pratico e crescita personale, oltre che per creare connessioni, farmi conoscere e portarmi opportunit\u00e0.<br><br>Collaboro con brand locali e pagine creative, lavorando su contenuti, comunicazioni online e progetti creativi. Sviluppo anche siti web per locali e piccole imprese.<br><br>Lavoro su Customly come piattaforma principale, dove sviluppo il configuratore digitale e gestisco la piattaforma.",
      customlySub: "Il mio progetto principale",
      customlyDesc:
        "Customly \u00e8 la piattaforma di custom fashion che unisce moda e tecnologia. Ho progettato l'intera esperienza: dal configuratore digitale \u2014 dove scegli colori, materiali e dettagli del capo in modo semplice e immediato \u2014 alla scelta di palette, tipografia e layout che rendono ogni passaggio chiaro e senza attriti. Ogni schermata, dal catalogo al riepilogo dell'ordine, nasce dal problema reale di chi vuole un capo unico: penso prima al design, poi al codice. Su Cloudflare Pages, D1 e R2 gestisco catalogo, configuratore e tutto il design end-to-end.",
      customlyCta: "Visita customly.it",
      customlyNote:
        "Vuoi vedere i progetti da vicino? Il mio profilo Customly:",
      servSub: "Cosa posso fare per te",
      servCta: "Richiedi preventivo",
      servCustomCta: "Scopri il mio profilo",
      servIncludes: "Cosa include",
      servWebTitle: "Web Development & Management",
      servWebDesc:
        "Realizzo e gestisco siti statici vetrina per attivit\u00e0 locali e brand: dallo sviluppo frontend fino a dominio, build e hosting. Mi occupo anche del mantenimento tecnico dopo la pubblicazione.",
      servWebList:
        "<li>Realizzazione siti statici vetrina (UI frontend)</li><li>Deploy, build e hosting</li><li>Acquisto dominio</li><li>Account Cloudflare per R2 e servizi online</li><li>Gestione modifiche da fare</li><li>Gestione errori e controllo che sia tutto a posto</li><li>Gestione dominio</li><li>Supporto tecnico e piccoli aggiornamenti</li>",
      servCustomTitle: "Custom & Design",
      servCustomDesc:
        "Trasformo capi esistenti in pezzi unici e creo concept e design visivi per l'abbigliamento. Ogni progetto nasce da un'idea e viene sviluppato attraverso ricerca, materiali e lavorazione artigianale.",
      servCustomList:
        "<li>Sketch e design del capo</li><li>Scelta di materiali e tessuti</li><li>Studio colori e dettagli grafici</li><li>Concept personalizzati</li>",
      servCollabTitle: "Collab & Sponsor",
      servCollabDesc:
        "Collaboro con brand e realt\u00e0 creative: insieme pensiamo a un'idea su cosa fare e la trasformiamo in contenuti autentici, collaborazioni e sponsorizzazioni.",
      servCollabList:
        "<li>Collaborazioni con brand</li><li>Ideazione di un'idea su cosa fare</li><li>Progetti condivisi</li><li>Collaborazioni commerciali</li>",
      procSub: "Come lavoro",
      proc1Title: "Scoperta",
      proc1Desc:
        "Ascolto le tue esigenze e analizzo il progetto: obiettivi, pubblico e tempi.",
      proc2Title: "Proposta",
      proc2Desc:
        "Ti presento un piano chiaro: tempi, costi e risultato atteso. Niente sorprese.",
      proc3Title: "Realizzazione",
      proc3Desc:
        "Sviluppo il progetto con aggiornamenti costanti: design, codice e contenuti.",
      proc4Title: "Consegna & Supporto",
      proc4Desc:
        "Consegno il lavoro pronto e resto disponibile per modifiche e manutenzione.",
      dpSub: "Collab & contenuti",
      dpDesc:
        "Mi occupo di collab e contenuti condivisi: ideo, edito e pubblico contenuti che finiscono sia sul mio profilo IG che sul tuo. Non \u00e8 il mio focus principale, ma un extra da gestire in modo semplice e diretto.",
      projSub: "Progetti Selezionati",
      projAll: "All",
      projClient: "Client Work",
      projPersonal: "Personal Project",
      testiSub: "Cosa dicono di me",
      testiEmpty:
        "Al momento non sono disponibili \u2014 presto pubblicher\u00f2 le recensioni dei clienti con cui ho lavorato.",
      timelineSub: "Esperienze",
      tl0Title: "Customly \u2014 Founder",
      tl0Desc:
        "Piattaforma di custom fashion \u2014 unisco moda e tecnologia con un configuratore digitale per personalizzare abbigliamento in modo semplice e intuitivo.",
      tl1Title: "Omnia4Web",
      tl1Desc:
        "Supporto alla creazione di contenuti digitali e comunicazione social. Editing video, grafiche e caption.",
      tl8Title: "Bertolotto Porte \u2014 Stage IT",
      tl8Desc:
        "Stage estivo di 2 settimane come IT, con focus su gestione documentale e digitalizzazione archivi.",
      collabSub: "Collaborazioni",
      collab1Name: "Aleyesure",
      collab1Desc:
        'All\'interno dei miei video sponsorizzo capi di abbigliamento di Aleyesure, brand locale che porta avanti lo slogan "Support local business".',
      collab2Name: "StageStreetwear",
      collab2Desc: "Ho fatto un video insieme e ci sentiamo.",
      collab3Name: "NewGenMusic4",
      collab3Desc:
        "Portiamo avanti una rubrica che mette insieme la musica e l'abbigliamento. Questa pagina \u00e8 un magazine no profit che ha come obiettivo sponsorizzare piccoli artisti della new gen.",
      toolsSub: "Strumenti & Competenze",
      toolGroupLangs: "Linguaggi",
      toolGroupWeb: "Web & Cloud",
      toolGroupDesign: "Design & Editing",
      toolGroupTools: "Strumenti & Office",
      faqSub: "Domande frequenti",
      faq1Q: "Chi gestisce dominio e hosting?",
      faq1A:
        "Il dominio e i servizi collegati possono essere acquistati direttamente dal cliente oppure gestiti insieme. In caso di manutenzione continuativa posso occuparmi della parte tecnica.",
      faq2Q: "Posso richiedere un capo personalizzato?",
      faq2A:
        "S\u00ec, realizzo custom fashion partendo da capi esistenti, lavorando su modifiche, dettagli, materiali e concept personalizzati.",
      faq3Q: "Quanto costa un progetto?",
      faq3A:
        "Ogni progetto viene valutato singolarmente in base a complessit\u00e0, tempi e obiettivi. Dopo una prima analisi preparo una proposta personalizzata.",
      faq4Q: "Quanto tempo serve per completare un progetto?",
      faq4A:
        "Dipende dal tipo di lavoro. Un sito semplice pu\u00f2 richiedere alcune settimane, mentre progetti pi\u00f9 creativi o personalizzati possono richiedere pi\u00f9 tempo.",
      faq5Q: "Posso contattarti anche solo per un'idea?",
      faq5A:
        "S\u00ec, puoi scrivermi anche nelle fasi iniziali. Possiamo valutare insieme se l'idea pu\u00f2 trasformarsi in un progetto concreto.",
      contactSub: "Restiamo in contatto",
      contactDesc: "Scrivimi per collaborazioni, idee o progetti.",
      ctaLabel: "Hai un'idea o un progetto?",
      ctaTitle: 'Facciamolo <span class="lp-cta-accent">su misura.</span>',
      ctaText:
        "Sito web, capo personalizzato o contenuti: raccontami la tua idea e la trasformiamo in qualcosa di concreto.",
      ctaBtn: "Parliamone",
      contactName: "Il tuo nome",
      contactEmail: "La tua email",
      contactReason: "Motivo",
      contactReasonOpts: [
        "Preventivo",
        "Collaborazione",
        "Solo un'idea",
        "Altro",
      ],
      contactService: "Servizio",
      contactServiceOpts: [
        "Web Development & Management",
        "Custom & Design",
        "Collab & Sponsor",
      ],
      contactSubject: "Oggetto",
      contactMsg: "Il tuo messaggio...",
      contactBtn: "Invia preventivo",
      contactPrezzoNota: "Il prezzo non è definitivo: verrà confermato in base ai dettagli del tuo progetto.",
      footerTag: "Developer, fashion, tech & Customly founder",
      footerPages: "Pages",
      footerSocial: "Social",
      footerContact: "Contact",
      footerAvailable: "Disponibile per collaborazioni",
      footerCopy: "Tutti i diritti riservati",
    },
    en: {
      navAbout: "About",
      navServ: "Services",
      navProjects: "Projects",
      navSocials: "Socials",
      navContact: "Contact",
      heroBtn1: "View Projects",
      heroBtn2: "Contact Me",
      heroAvail: "Available for new projects",
      aboutSub: "About Me",
      aboutP1:
        "I'm Lorenzo Perassi, developer, creator and Computer Science student. I build digital products where code, design and creativity meet. My main project is Customly, a clothing customization platform combining fashion and technology.",
      aboutP2:
        "I use digital platforms as a space to share projects, creative experiments, routines, hands-on work and personal growth, as well as to build connections and create opportunities.<br><br>I collaborate with local brands and creative pages, working on content, online communications and creative projects. I also develop websites for local businesses and small companies.<br><br>I work on Customly as my main platform, where I develop the digital configurator and manage the platform.",
      customlySub: "My main project",
      customlyDesc:
        "Customly is the custom fashion platform that combines fashion and technology. I designed the whole experience: from the digital configurator \u2014 where you pick colors, materials and garment details simply and instantly \u2014 to the palette, typography and layout choices that make every step clear and frictionless. Every screen, from the catalog to the order summary, starts from the real problem of someone who wants a unique garment: I think about design first, then code. On Cloudflare Pages, D1 and R2 I manage the catalog, configurator and all the end-to-end design.",
      customlyCta: "Visit customly.it",
      customlyNote: "Want to see the projects up close? My Customly profile:",
      servSub: "What I can do for you",
      servCta: "Get a quote",
      servCustomCta: "Discover my profile",
      servIncludes: "What's included",
      servWebTitle: "Web Development & Management",
      servWebDesc:
        "I build and manage static showcase websites for local businesses and brands: from frontend development to domain, build and hosting. I also handle post-launch technical maintenance.",
      servWebList:
        "<li>Static showcase websites (frontend UI)</li><li>Deploy, build and hosting</li><li>Domain purchase</li><li>Cloudflare account for R2 and online services</li><li>Content change management</li><li>Error handling and health checks</li><li>Domain management</li><li>Technical support and small updates</li>",
      servCustomTitle: "Custom & Design",
      servCustomDesc:
        "I turn existing garments into unique pieces and create concepts and visual designs for clothing. Every project starts from an idea and is developed through research, materials and artisanal work.",
      servCustomList:
        "<li>Garment sketching and design</li><li>Fabric and material selection</li><li>Color and graphic detail studies</li><li>Custom concepts</li>",
      servCollabTitle: "Collab & Sponsor",
      servCollabDesc:
        "I collaborate with brands and creative realities: together we come up with an idea of what to do and turn it into authentic content, collaborations and sponsorships.",
      servCollabList:
        "<li>Brand collaborations</li><li>Ideating what we can do together</li><li>Shared projects</li><li>Commercial collaborations</li>",
      procSub: "How I work",
      proc1Title: "Discovery",
      proc1Desc:
        "I listen to your needs and analyze the project: goals, audience and timeline.",
      proc2Title: "Proposal",
      proc2Desc:
        "I present a clear plan: timeline, costs and expected outcome. No surprises.",
      proc3Title: "Execution",
      proc3Desc:
        "I build the project with constant updates: design, code and content.",
      proc4Title: "Delivery & Support",
      proc4Desc:
        "I deliver the finished work and stay available for changes and maintenance.",
      dpSub: "Collabs & content",
      dpDesc:
        "I handle collabs and shared content: I come up with, edit and publish content that goes on both my IG profile and yours. It's not my main focus, just a simple, low-pressure extra.",
      projSub: "Selected Projects",
      projAll: "All",
      projClient: "Client Work",
      projPersonal: "Personal Project",
      testiSub: "What people say about me",
      testiEmpty:
        "Not available yet \u2014 I'll soon publish reviews from the clients I've worked with.",
      timelineSub: "Experience",
      tl0Title: "Customly \u2014 Founder",
      tl0Desc:
        "Custom fashion platform \u2014 I combine fashion and technology with a digital configurator to personalize clothing simply and intuitively.",
      tl1Title: "Omnia4Web",
      tl1Desc:
        "Supporting digital content creation and social communication. Video editing, graphics and captions.",
      tl8Title: "Bertolotto Porte \u2014 IT Internship",
      tl8Desc:
        "2-week summer IT internship focused on document management and archive digitalization.",
      collabSub: "Collaborations",
      collab1Name: "Aleyesure",
      collab1Desc:
        'In my videos I sponsor clothing items from Aleyesure, a local brand carrying the slogan "Support local business".',
      collab2Name: "StageStreetwear",
      collab2Desc: "Video sponsorship and ongoing collaboration.",
      collab3Name: "NewGenMusic4",
      collab3Desc:
        "We run a column combining music and fashion. This page is a non-profit magazine aimed at promoting new gen artists.",
      toolsSub: "Tools & Skills",
      toolGroupLangs: "Languages",
      toolGroupWeb: "Web & Cloud",
      toolGroupDesign: "Design & Editing",
      toolGroupTools: "Tools & Office",
      faqSub: "Frequently asked questions",
      faq1Q: "Who manages the domain and hosting?",
      faq1A:
        "The domain and related services can be bought directly by the client or managed together. For ongoing maintenance I can take care of the technical side.",
      faq2Q: "Can I request a custom garment?",
      faq2A:
        "Yes, I make custom fashion starting from existing garments, working on modifications, details, materials and custom concepts.",
      faq3Q: "How much does a project cost?",
      faq3A:
        "Each project is evaluated individually based on complexity, timeline and goals. After an initial analysis I prepare a custom proposal.",
      faq4Q: "How long does it take to complete a project?",
      faq4A:
        "It depends on the kind of work. A simple site can take a few weeks, while more creative or custom projects can take longer.",
      faq5Q: "Can I contact you just for an idea?",
      faq5A:
        "Yes, you can write to me even in the early stages. We can figure out together whether the idea can become a real project.",
      contactSub: "Stay in touch",
      contactDesc: "Write me for collaborations, ideas or projects.",
      ctaLabel: "Have an idea or a project?",
      ctaTitle:
        'Let\'s make it <span class="lp-cta-accent">custom-made.</span>',
      ctaText:
        "Website, custom garment or content: tell me your idea and we'll turn it into something real.",
      ctaBtn: "Let's talk",
      contactName: "Your name",
      contactEmail: "Your email",
      contactReason: "Reason",
      contactReasonOpts: ["Quote", "Collaboration", "Just an idea", "Other"],
      contactService: "Service",
      contactServiceOpts: [
        "Web Development & Management",
        "Custom & Design",
        "Collab & Sponsor",
      ],
      contactSubject: "Subject",
      contactMsg: "Your message...",
      contactBtn: "Send quote",
      contactPrezzoNota: "The price is not final: it will be confirmed based on your project details.",
      footerTag: "Developer, fashion, tech & Customly founder",
      footerPages: "Pages",
      footerSocial: "Social",
      footerContact: "Contact",
      footerAvailable: "Available for collaborations",
      footerCopy: "All rights reserved",
    },
  };
  let _lang = localStorage.getItem("lang") || "it";
  function setLang($) {
    _lang = $;
    localStorage.setItem("lang", $);
    document.querySelectorAll(".lp-lang-btn").forEach(function (e) {
      e.classList.toggle("active", e.dataset.langBtn === $);
    });
    document.querySelectorAll("[data-lang-key]").forEach(function (e) {
      var o = e.dataset.langKey;
      if (LANG[$][o]) {
        if (e.hasAttribute("data-lang-html")) e.innerHTML = LANG[$][o];
        else if (e.tagName === "SELECT") {
          e.options[0].textContent = LANG[$][o];
          var opts = LANG[$][o + "Opts"] || [];
          for (var i = 0; i < opts.length && i + 1 < e.options.length; i++)
            e.options[i + 1].textContent = opts[i];
        } else if (e.tagName === "INPUT" || e.tagName === "TEXTAREA")
          e.placeholder = LANG[$][o];
        else e.textContent = LANG[$][o];
      }
    });
  }
  var _rs = document.getElementById("contactReason"),
    _sv = document.getElementById("contactService");
  if (_rs && _sv)
    _rs.addEventListener("change", function () {
      _sv.hidden = _rs.value !== "preventivo";
    });
  document.querySelectorAll(".lp-lang-btn").forEach(function (e) {
    e.addEventListener("click", function () {
      setLang(e.dataset.langBtn);
    });
  });
  var navbarEl = document.querySelector(".lp-navbar");
  if (navbarEl) {
    function onScroll() {
      navbarEl.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }
  setLang(_lang);

  /* ===== Configuratore Sito ===== */
  var configuratore = document.getElementById("configuratore-sito");
  var reasonSelect = document.getElementById("contactReason");
  var prezzoTotale = document.getElementById("config-prezzo-totale");
  var pagesDisplay = document.getElementById("config-pages-display");
  var pagesHidden = document.querySelector('input[name="config-pages"]');
  var pagesStepper = document.getElementById("config-pages-stepper");
  var pagesHint = document.getElementById("config-pages-hint");
  var tipoSito = document.querySelectorAll('input[name="config-tipo-sito"]');

  var PAGES_MIN = 1;
  var PAGES_MIN_MULTI = 2;

  function getTipo() {
    var t = document.querySelector('input[name="config-tipo-sito"]:checked');
    return t ? t.value : "landing";
  }

  function getPages() {
    return parseInt(pagesDisplay.textContent) || 1;
  }

  function setPages(n) {
    if (pagesDisplay) pagesDisplay.textContent = n;
    if (pagesHidden) pagesHidden.value = n;
  }

  function aggiornaPaginePerTipo() {
    var tipo = getTipo();
    if (tipo === "multipage") {
      if (pagesStepper) pagesStepper.classList.add("lp-config-stepper--active");
      var cur = getPages();
      if (cur < PAGES_MIN_MULTI) setPages(PAGES_MIN_MULTI);
    } else {
      if (pagesStepper) pagesStepper.classList.remove("lp-config-stepper--active");
      setPages(PAGES_MIN);
    }
    aggiornaPrezzo();
  }

  function aggiornaPrezzo() {
    var tipo = getTipo();
    var prezzo = 250;
    var pagine = getPages();
    if (tipo === "multipage") prezzo += (pagine - 1) * 50;
    var imgPro = document.getElementById("config-img-pro");
    if (imgPro && imgPro.checked) prezzo += 20;
    var lingue = parseInt(document.getElementById("config-lingue").value) || 0;
    prezzo += lingue * 50;
    var funzionalita = 0;
    document
      .querySelectorAll("#config-features-grid input[data-feature]:checked")
      .forEach(function () {
        funzionalita++;
      });
    prezzo += funzionalita * 10;
    if (prezzoTotale) prezzoTotale.textContent = prezzo + " €";
  }

  if (reasonSelect && configuratore) {
    var contactFormEl = document.querySelector(".lp-contact-form");
    reasonSelect.addEventListener("change", function () {
      var isConfig = this.value === "configura-sito";
      configuratore.style.display = isConfig ? "block" : "none";
      if (contactFormEl) contactFormEl.classList.toggle("lp-contact-form--config", isConfig);
    });
  }

  tipoSito.forEach(function (radio) {
    radio.addEventListener("change", aggiornaPaginePerTipo);
  });

  var numBtns = document.querySelectorAll(".lp-config-number-btn");
  numBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (getTipo() !== "multipage") return;
      var cur = getPages();
      var step = parseInt(this.dataset.step);
      var next = cur + step;
      if (next < PAGES_MIN_MULTI) next = PAGES_MIN_MULTI;
      setPages(next);
      aggiornaPrezzo();
    });
  });

  var lingueInput = document.getElementById("config-lingue");
  var recalcFields = [
    "config-img-pro",
    "config-copywriting",
    "config-lingue",
  ];
  recalcFields.forEach(function (id) {
    var el = document.getElementById(id);
    if (el)
      el.addEventListener("change", function () {
        aggiornaPrezzo();
      });
  });
  if (lingueInput) lingueInput.addEventListener("input", aggiornaPrezzo);
  document
    .querySelectorAll("#config-features-grid input[data-feature]")
    .forEach(function (cb) {
      cb.addEventListener("change", aggiornaPrezzo);
    });

  aggiornaPaginePerTipo();

  var contactForm = document.querySelector(".lp-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      var isConfig =
        reasonSelect && reasonSelect.value === "configura-sito";
      if (!isConfig) return;

      var configTipo = document.querySelector(
        'input[name="config-tipo-sito"]:checked',
      );
      if (!configTipo) {
        e.preventDefault();
        alert("Per favore seleziona il tipo di sito.");
        return;
      }

      var tipo = configTipo.value;
      var pagine = getPages();
      var imgPro = document.getElementById("config-img-pro");
      var copywriting = document.getElementById("config-copywriting");
      var lingue = parseInt(document.getElementById("config-lingue").value) || 0;
      var features = [];
      document
        .querySelectorAll("#config-features-grid input[data-feature]:checked")
        .forEach(function (cb) {
          var label = cb.closest("label");
          var name = label ? label.querySelector("span").textContent.trim() : "";
          features.push(name);
        });
      var prezzo = 250;
      if (tipo === "multipage") prezzo += (pagine - 1) * 50;
      if (imgPro && imgPro.checked) prezzo += 20;
      prezzo += lingue * 50;
      prezzo += features.length * 10;

      var summary =
        "Tipo di Sito: " +
        (tipo === "landing" ? "Landing page (1 pagina)" : "Sito vetrina (" + pagine + " pagine)") +
        "\nNumero pagine: " +
        pagine +
        "\nImmagini professionali: " +
        (imgPro && imgPro.checked ? "Sì (+20 €)" : "No") +
        "\nCopywriting: " +
        (copywriting && copywriting.checked ? "Incluso" : "No") +
        "\nLingue aggiuntive: " +
        lingue +
        "\nFunzionalità (" +
        features.length +
        "): " +
        (features.length ? features.join(", ") : "nessuna") +
        "\nPrezzo stimato: " +
        prezzo +
        " €\n\nIl preventivo finale potrebbe variare in base alle tue scelte.";

      var configHidden = document.createElement("input");
      configHidden.type = "hidden";
      configHidden.name = "config-riepilogo";
      configHidden.value = summary;
      contactForm.appendChild(configHidden);

      var selFeatures = document.querySelector(
        'input[name="config-selected-features"]',
      );
      if (selFeatures) selFeatures.value = features.join(", ");
    });
  }
});
