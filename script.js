document.addEventListener("DOMContentLoaded", function () {
  const _reducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
  const _isMobile = window.matchMedia
    ? window.matchMedia("(max-width: 767px)").matches
    : false;
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
      "Trasformo idee in progetti concreti: web, fashion, brand e contenuti.";
    if (_reducedMotion) {
      p.textContent = z;
    } else {
      let G = 0;
      !(function e() {
        ((p.textContent = z.slice(0, G)),
          G++,
          G <= z.length && setTimeout(e, 30));
      })();
    }
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
            (body.innerHTML = ""));
          if (_reducedMotion) {
            lines.forEach((cur) => {
              const row = document.createElement("div");
              row.className = "lp-term-line";
              if (cur.c) {
                row.insertAdjacentHTML("afterbegin", '<span class="lp-term-prompt">$ </span>');
                const cmd = document.createElement("span");
                cmd.className = "lp-term-cmd";
                cmd.textContent = cur.c;
                row.appendChild(cmd);
              } else {
                row.classList.add("lp-term-out");
                row.textContent = cur.t;
              }
              body.appendChild(row);
            });
            const row = document.createElement("div");
            row.className = "lp-term-line";
            row.innerHTML = '<span class="lp-term-prompt">$ </span><span class="lp-term-cursor"></span>';
            body.appendChild(row);
            return;
          }
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
            })(0, 0);
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
  document.querySelectorAll("video").forEach((e) => {
    // On phones do not make the browser fetch/decode video metadata during
    // the first paint. The poster remains visible and playback starts only
    // when the video actually enters the viewport.
    if (_isMobile) e.preload = "none";
    h.observe(e);
  });
  const f = document.querySelector(".lp-hero-img");
  if (f) {
    const J = parseFloat(f.dataset.speed) || 0.95;
    const heroImage = document.getElementById("heroImage");
    const glow = heroImage ? heroImage.querySelector(".lp-hero-glow") : null;
    let tiltX = 0,
      tiltY = 0;
    if (heroImage && !_reducedMotion) {
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
    if (!_reducedMotion) {
      addEventListener(
        "scroll",
        () => {
          const e = scrollY * (1 - J);
          f.style.transform = `translateY(${0.3 * e}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        },
        { passive: !0 },
      );
    }
  }
  const heroLines = document.querySelectorAll(".lp-hero-line");
  if (heroLines.length && !_reducedMotion) {
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
    I = 0,
    _prevFocus = null;
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
      _prevFocus = document.activeElement;
      E.classList.add("open");
      E.querySelector(".lp-lightbox-close").focus();
      C();
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
        (E.classList.remove("open"),
          (b.innerHTML = ""),
          (k = []),
          _prevFocus && _prevFocus.focus());
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
  if (ctaCard && !_reducedMotion) {
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
      navServ: "Collaborazioni",
      heroBtn3: "Scarica CV",

      formSending: "Invio in corso…",
      formSuccess: "Messaggio inviato! Ti risponderò al più presto.",
      formError: "Errore nell'invio. Riprova o scrivimi su WhatsApp.",
      metaTitle: "Lorenzo Perassi — Developer, Creator, Fashion & Tech | Portfolio",
      metaDesc: "Developer, creator e studente di Informatica. Costruisco prodotti digitali dove codice, design e creatività si incontrano. Customly, fashion tech, sviluppo web.",
      navProjects: "Projects",
      navSocials: "Social",
      navContact: "Contact",
      heroBtn1: "Guarda i progetti",
      heroBtn2: "Collaboriamo",
      heroAvail: "Disponibile per nuovi progetti",
      letsTitle: "Let's build something",
      letsTagline: "Non devi scegliere un servizio da un catalogo. Porta un'idea e capiamo insieme come svilupparla.",
      letsWebTitle: "WEB",
      letsWebDesc: "Siti web, web app, prodotti digitali e progetti online.",
      letsFashionTitle: "FASHION & SEWING",
      letsFashionDesc: "Custom fashion, design, cucito, prototipazione e sviluppo di capi.",
      letsContentTitle: "CONTENT",
      letsContentDesc: "Video, social, contenuti e progetti di comunicazione.",
      letsElseTitle: "SOMETHING ELSE",
      letsElseDesc: "Hai un'idea che non rientra qui? Parliamone.",
      letsNote:
        "Lavoro su progetti diversi in ambiti diversi: se hai qualcosa in mente — anche se non sai ancora bene cosa — <a href=\"#contact\">raccontamelo</a> e vediamo insieme da dove partire.",
      aboutTitle: "Chi sono",
      aboutSub: "Developer, creator & student",
      aboutP1:
        "Studio Informatica, ma il mio lavoro non si ferma al codice. Mi interessa costruire progetti che uniscono tecnologia, design, moda, contenuti e business.",
      aboutP2:
        "Che sia un sito, un brand, un capo o un'idea ancora tutta da definire: se vuoi costruire qualcosa, possiamo svilupparla insieme.",
      customlySub: "Il mio progetto principale",
      customlyDesc:
        "Customly \u00e8 la piattaforma di custom fashion che unisce moda e tecnologia. Ho progettato l'intera esperienza: dal configuratore digitale \u2014 dove scegli colori, materiali e dettagli del capo in modo semplice e immediato \u2014 alla scelta di palette, tipografia e layout che rendono ogni passaggio chiaro e senza attriti. Ogni schermata, dal catalogo al riepilogo dell'ordine, nasce dal problema reale di chi vuole un capo unico: penso prima al design, poi al codice. Su Cloudflare Pages, D1 e R2 gestisco catalogo, configuratore e tutto il design end-to-end.",
      customlyCta: "Visita customly.it",
      customlyNote:
        "Vuoi vedere i progetti da vicino? Il mio profilo Customly:",
      servTitle: "Servizi",
      servSub: "Cosa posso fare per te",
      servCta: "Richiedi preventivo",
      servCustomCta: "Scopri il mio profilo",
      servIncludes: "Cosa include",
      serv1Title: "Sito web",
      serv1Desc:
        "Realizzo siti statici vetrina: UI pulita, performance, SEO tecnica. Dallo sviluppo al deploy — tu fornisci i contenuti, io creo il prodotto finito.",
      serv1List:
        "<li>Sviluppo frontend (HTML, CSS, JS vanilla)</li><li>Design responsive e mobile</li><li>Setup dominio (Aruba) + Cloudflare hosting</li><li>Deploy su Cloudflare Pages</li><li>Consegna repo GitHub + istruzioni autonomia</li>",
      serv1Cta: "Configura il tuo sito",
      serv2Title: "Mantenimento",
      serv2Desc:
        "Il sito non finisce al lancio. Mi occupo della gestione tecnica continua: aggiornamenti, sicurezza, modifiche contenuti, monitoraggio. Tu fai il tuo lavoro, io tengo in piedi l'infrastruttura.",
      serv2List:
        "<li>Piccole modifiche al sito su richiesta</li><li>Gestione errori e bug</li><li>Codice e hosting su Cloudflare mio personale</li>",
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
      projSub: "Selected Projects",
      projCollab: "Collaborations",
      collabTitle: "Selected collaborations",
      collabTagline: "Brands, people & projects I've worked with.",
      collabWebTitle: "WEB",
      collabWebDesc: "Siti, landing page, web app e prodotti digitali.",
      collabFashionTitle: "FASHION & SEWING",
      collabFashionDesc: "Custom, design, prototipazione e sviluppo di capi.",
      collabBrandsTitle: "BRANDS",
      collabBrandsDesc: "Concept, contenuti, identità e progetti creativi.",
      collabContentTitle: "CONTENT",
      collabContentDesc: "Video, social e comunicazione.",
      collabTechTitle: "TECH",
      collabTechDesc: "Software, automazioni e sperimentazione.",
      collabElseTitle: "SOMETHING ELSE",
      collabElseDesc: "Hai un'idea che non rientra qui? Parliamone.",
      projAll: "All",
      projClient: "Client Work",
      projPersonal: "Personal Project",
      projTitle: "Projects",
      projCustomlyDesc:
        "Piattaforma di custom fashion: unisco moda e tecnologia con un configuratore digitale per personalizzare abbigliamento.",
      projCrybuDesc:
        "Collaborazione creativa di fashion design & sartoria: ideazione e sviluppo di capi custom attraverso ricerca materiali, prototipazione e produzione sartoriale. Un progetto che unisce design visivo e lavorazione artigianale per creare pezzi unici.",
      testiSub: "Cosa dicono di me",
      testiEmpty:
        "Al momento non sono disponibili \u2014 presto pubblicher\u00f2 le recensioni dei clienti con cui ho lavorato.",
      timelineSub: "Esperienze",
      expTitle: "Experience",
      toolsTitle: "Tools",
      connectTitle: "Let's connect",
      tl0Title: "Customly \u2014 Founder",
      tl0Date: "Ago 2026 \u2014 Presente",
      tl0Desc:
        "Piattaforma di custom fashion \u2014 unisco moda e tecnologia con un configuratore digitale per personalizzare abbigliamento in modo semplice e intuitivo.",
      tl1Title: "Omnia4Web",
      tl1Date: "Mag 2026 \u2014 Lug 2026",
      tl1Desc:
        "Supporto alla creazione di contenuti digitali e comunicazione social. Editing video, grafiche e caption.",
      tl8Title: "Bertolotto Porte \u2014 Stage IT",
      tl8Date: "6\u201318 Lug 2026",
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
      contactSub: "Hai un'idea? Raccontamela.",
      contactDesc: "Scrivimi per collaborazioni, idee o progetti.",
      ctaLabel: "Hai un'idea o un progetto?",
      ctaTitle: 'Facciamolo <span class="lp-cta-accent">su misura.</span>',
      ctaText:
        "Sito web, capo personalizzato o contenuti: raccontami la tua idea e la trasformiamo in qualcosa di concreto.",
      ctaBtn: "Parliamone",
      contactName: "Il tuo nome",
      contactEmail: "La tua email",
      contactEmailPh: "Dove posso risponderti?",
      contactType: "Tipo di progetto (facoltativo)",
      contactTypeOpts: [
        "Web",
        "Fashion & Sewing",
        "Content",
        "Collaboration",
        "Something else",
      ],
      contactCompany: "Nome azienda (opzionale)",
      contactCompanyEmail: "Email azienda (opzionale)",
      contactPhone: "Numero di telefono",
      contactPhonePh: "Telefono / WhatsApp",
      contactReason: "Motivo",
      contactReasonOpts: [
        "Configura il tuo sito",
        "Solo un'idea",
        "Collaborazione",
        "Altro",
      ],
      cfReason: "Cosa ti serve?",
      cfClientType: "Tipo di cliente",
      cfPrivate: "Privato / Personale",
      cfBusiness: "Azienda / Attività / Professionista",
      cfNome: "Nome",
      cfCognome: "Cognome",
      cfNomePh: "Come ti chiami?",
      cfCognomePh: "Il tuo cognome",
      cfPrivatoScopo: "Per cosa ti serve il sito?",
      cfPrivatoScopoPh: "Portfolio, CV, artista, progetto...",
      cfPrivatoEsistente: "Eventuale sito/social esistente",
      cfPrivatoEsistentePh: "https://...",
      cfAziendaNome: "Nome Azienda / Attività",
      cfAziendaNomePh: "Nome della tua attività",
      cfSettore: "Settore",
      cfSettoreSel: "Settore",
      cfSettoreSelPh: "Seleziona",
      cfSettoreSelOpts: [
        "Ristorazione",
        "Turismo / Hotel",
        "Retail / Negozio",
        "Professionista",
        "Artigiano",
        "Creativo",
        "Altro",
      ],
      cfLocalita: "Località (Città / Zona)",
      cfLocalitaPh: "Es. Milano",
      cfAziendaCosa: "Cosa fa l'attività?",
      cfAziendaCosaPh: "Descrivi brevemente l'attività",
      cfAziendaSito: "Sito web attuale",
      cfAziendaSitoPh: "https://...",
      cfAziendaSocial: "Instagram / Social",
      cfAziendaSocialPh: "https://...",
      cfMessaggio: "Messaggio",
      cfPageHome: "Home",
      cfIncluded: "(inclusa)",
      cfPageAbout: "Chi sono / About",
      cfPageServizi: "Servizi",
      cfPagePortfolio: "Portfolio / Gallery",
      cfPageContatti: "Contatti",
      cfPageFaq: "FAQ",
      cfPageBlog: "Blog",
      cfPageAltro: "Altro",
      cfPagesHint: "Prima pagina inclusa, +50 € dalla seconda",
      cfContenutiLabel: "Hai già i contenuti?",
      cfContenutiTutto: "Ho testi e immagini",
      cfContenutiImg: "Ho bisogno di immagini",
      cfContenutiTesti: "Ho bisogno di aiuto con i testi",
      cfContenutiEntrambi: "Ho bisogno di entrambi",
      cfImgTypeLabel: "Che tipo di immagini ti servono?",
      cfImgTypeSel: "Tipo di immagini",
      cfImgTypePh: "Seleziona",
      cfImgStock: "Immagini stock",
      cfImgGenerate: "Immagini generate / creative",
      cfImgFoto: "Foto dell'attività",
      cfImgDontKnow: "Non lo so ancora",
      configLangSel: "Lingue",
      cfStyleLabel: "Stile visivo",
      cfStyleDemoLink: "Guarda il template ↗",
      cfStepConfig: "Configurazione sito",
      cfStepDati: "I tuoi dati",
      cfgFg1Title: "Aspetto & Animazioni",
      cfgFg1Desc: "Personalizza l'aspetto e il movimento del sito.",
      cfgFg2Title: "Immagini & Media",
      cfgFg2Desc: "Funzioni avanzate per immagini e contenuti visivi.",
      cfgFg3Title: "Contenuti & Navigazione",
      cfgFg3Desc: "Rendi più semplice esplorare e organizzare i contenuti.",
      cfgFg4Title: "Dati & Informazioni",
      cfgFg4Desc: "Mostra dati, informazioni e contenuti interattivi.",
      cfgFg5Title: "Contatto",
      cfgFg5Desc: "Facilita il contatto diretto con i tuoi clienti.",
      cfStyleMinimal: "Minimal",
      cfStyleModern: "Modern",
      cfStyleBold: "Bold",
      cfStyleLuxury: "Luxury",
      cfStyleCreative: "Creative",
      cfStyleElegant: "Elegant",
      cfAdminLabel: "Admin Panel (Pannello di gestione)",
      cfAdminNo: "No (0 €)",
      cfAdminSi: "Sì, voglio un pannello di gestione (+150 €)",
      cfMaintLabel: "Manutenzione post-pubblicazione",
      cfMaintNo: "No (nessun costo mensile)",
      cfMaintSi: "Sì, gestione completa",
      cfMaintNote: "Senza Admin Panel 30 €/mese, con Admin Panel 15 €/mese (solo bug e problemi tecnici).",
      cfProgettoLabel: "Raccontami brevemente il progetto",
      cfProgettoPh: "Che tipo di sito hai in mente? Cosa vorresti ottenere?",
      cfBudgetLabel: "Hai un budget indicativo?",
      cfBudgetSel: "Budget indicativo",
      cfBudgetPh: "Seleziona",
      cfBudget1: "< 250 €",
      cfBudget2: "250–500 €",
      cfBudget3: "500–750 €",
      cfBudget4: "750–1.000 €",
      cfBudget5: "1.000 €+",
      cfBudgetNo: "Non ho ancora deciso",
      cfTotalLabel: "Preventivo stimato",
      cfTotalNote: "Il prezzo potrebbe cambiare, ma dovrebbe aggirarsi su quella cifra.",
      summaryTitle: "Contatti",
      summaryEmail: "Email",
      summaryWhatsapp: "WhatsApp",
      summaryLocation: "Location",
      summaryLocationVal: "Saluzzo (CN), Italy",
      bookingTitle: "Prenota un incontro",
      bookingCall: "Videocall",
      bookingInPerson: "Di persona",
      bookingHint: "Scegli il tipo di incontro:",
      cfWaBtn: "Scrivimi su WhatsApp",
      contactSend: "Parliamone →",
      contactService: "Servizio",
      contactServiceOpts: [
        "Web Development & Management",
        "Custom & Design",
        "Collab & Sponsor",
      ],
      contactSubject: "Oggetto",
      contactMsg: "Raccontami la tua idea...",
      contactBtn: "Invia preventivo",
      contactPrezzoNota: "Il prezzo non è definitivo: verrà confermato in base ai dettagli del tuo progetto.",
      contactBtnAlt: "Invia messaggio",
      contactPrezzoNotaAlt: "Ti rispondo appena possibile!",
      configTitle: "Configura il tuo sito",
      configTypeLabel: "Tipo di sito",
      configLandingText:
        "<strong>Landing page</strong><small>1 pagina — 250 €</small>",
      configMultiText:
        "<strong>Sito vetrina</strong><small>Da 2 pagine — 300 €</small>",
      configPagesLabel: "Numero di pagine",
      configPagesHint: "50 € a pagina (dalla seconda)",
      configImgProText:
        "<strong>Immagini professionali</strong><small>Ricerca e ottimizzazione di immagini. +20 €</small>",
      configLangLabel: "Lingue aggiuntive",
      configLangHint: "Prima lingua inclusa, +50 € dalla seconda",
      configAdminText:
        "<strong>Admin Panel</strong><small>Il cliente modifica contenuti in autonomia. +150 €</small>",
      configMaintLabel: "Manutenzione",
      configMaintNoAdmin:
        "<strong>Senza Admin Panel</strong><small>30 €/mese — aggiornamenti fatti da me</small>",
      configMaintAdmin:
        "<strong>Con Admin Panel</strong><small>15 €/mese — contenuti a carico del cliente</small>",
      configMaintAuto:
        "<strong>Autonomo</strong><small>0 €/mese — interventi fatturati a parte</small>",
      configFeaturesLabel: "Funzionalità <small>(+10 € l'una)</small>",
      configPriceLabel: "Preventivo stimato",
      configPriceSub: "Potrebbe cambiare in base alle tue scelte",
      configF1: "Dark / Light mode",
      configF1Info: "Passa automaticamente o a comando tra tema scuro e chiaro.",
      configF2: "Scroll reveal",
      configF2Info: "Animazioni di apparizione degli elementi mentre scorri la pagina.",
      configF3: "Torna su",
      configF3Info: "Bottone che riporta rapidamente all'inizio della pagina.",
      configF4: "Lightbox immagini",
      configF4Info: "Ingrandisce le immagini a schermo intero al clic, con chiusura semplice.",
      configF5: "Slider / Carousel",
      configF5Info: "Gallerie a scorrimento automatico o manuale tra più immagini.",
      configF6: "Effetti hover",
      configF6Info: "Transizioni e animazioni al passaggio del mouse su elementi.",
      configF7: "Contatori animati",
      configF7Info: "Numeri che contano fino al valore finale quando entrano nello schermo.",
      configF8: "Ricerca interna",
      configF8Info: "Campo di ricerca che filtra i contenuti del sito.",
      configF9: "Filtro categorie",
      configF9Info: "Filtra i contenuti per categoria o argomento.",
      configF10: "FAQ Accordion",
      configF10Info: "Domande frequenti espandibili a fisarmonica.",
      configF11: "Bottone WhatsApp",
      configF11Info: "Pulsante fisso che apre una chat WhatsApp con te.",
      configF12: "Mappa interattiva",
      configF12Info: "Mappa in cui i clienti possono vedere la posizione.",
      configF13: "Prima / Dopo",
      configF13Info: "Comparatore trascinabile tra un'immagine prima e una dopo.",
      configF14: "Testo scorrevole",
      configF14Info: "Testo che scorre in modo continuo, effetto tendina.",
      configF15: "Barre di avanzamento",
      configF15Info: "Barre che si riempiono in animazione per mostrare competenze o valori.",
      footerTag: "Developer, creator & Customly founder",
      footerPages: "Pages",
      footerSocial: "Social",
      footerContact: "Contact",
      footerAvailable: "Disponibile per collaborazioni",
      footerCopy: "© 2026 Lorenzo Perassi — Tutti i diritti riservati",
      navCustomly: "Customly",
      comparisonSub: "Ogni progetto parte da un'idea: la disegno, la costruisco e la porto fino al risultato finale — in qualunque ambito.",
      comparisonNote: "Dall'idea alla progettazione, dalla realizzazione al risultato: questo è il mio modo di lavorare, che si tratti di un sito, di un capo o di un contenuto.",
      comparisonBeforeLabel: "Codice Sorgente",
      comparisonAfterLabel: "Risultato Finale",
      whyTitle: "Perché sono meglio di un'agenzia?",
      whySub: "Non perché le agenzie siano sbagliate: semplicemente, lavorare direttamente con una persona a volte è più semplice.",
      whyCard1Title: "RAPPORTO DIRETTO",
      whyCard1Body: "Parli con chi progetta e costruisce il progetto, non con un commerciale. Quello che dici è quello che viene fatto.",
      whyCard2Title: "NIENTE PACCHETTI PREDEFINITI",
      whyCard2Body: "Non devi adattare la tua idea a un catalogo: partiamo da quello che hai in mente e costruiamo intorno a quello.",
      whyCard3Title: "STRUTTURA SNELLA, COSTI CHIARI",
      whyCard3Body: "Niente strati, niente intermediari: sai sempre con chi stai parlando e per cosa stai pagando.",
      whyCard4Title: "HAI UN'IDEA?",
      whyCard4Body: "Raccontamela e vediamo se ha senso costruirla insieme.",
      whyCard4Cta: "Parliamone",
      maniTitle: "Ma chi cazzo pensi di essere?",
      maniSub: "Bella domanda. Ti rispondo con i fatti.",
      maniP1:
        "Uno studente di Informatica che nel frattempo continua a costruire cose. Studio all'IIS Vallauri, ma non ho aspettato il diploma per iniziare: ho fondato Customly, una piattaforma di custom fashion che unisce moda e tecnologia, e ci lavoro sopra ogni settimana.",
      maniP2:
        "Nel frattempo ho cucito e prototipato capi con CRYBU, sviluppato siti web, creato contenuti video e social, e collaborato con brand locali come Aleyesure e pagine creative come StageStreetwear.",
      maniP3:
        "Ho lavorato sui contenuti digitali con Omnia4Web, fatto uno stage IT da Bertolotto Porte tra gestionali e archivi digitali, preso una certificazione NASA sul telerilevamento e sto seguendo il CS50x di Harvard. Imparo facendo, non collezionando attestati.",
      maniP4:
        "Non ho un'agenzia, non ho un listino, non ho pacchetti preconfezionati. Ho progetti iniziati — alcuni finiti, altri ancora aperti — e la voglia di continuare a costruirne.",
      maniP5:
        "Se cercavi qualcuno con un catalogo di servizi, non sono io. Se cercavi qualcuno con cui costruire qualcosa, sei nel posto giusto.",
      maniCta: "Parliamone",
      storyKicker1: "01 — Chi sono",
      storyKicker2: "02 — Come lavoro",
      storyKicker3: "03 — Perché io",
      storyPortraitCap: "Sì, quello nella foto sono io.",
      storyCapDesk: "La mia postazione — dove nascono i progetti.",
      storyCapCustomly: "Customly — la piattaforma di custom fashion che ho fondato.",
      storyCapCrybu: "CRYBU — prototipazione, cucito e capi unici.",
      storyCapCollab: "Aleyesure e StageStreetwear — collaborazioni, contenuti e video.",
      storyBridge1: "E in pratica, come lavoro?",
      storyBridge2: "Ok, hai visto chi sono e come lavoro. Ma perché dovresti lavorare proprio con me?",
      storyWhySub: "Il titolo è provocatorio, la risposta è semplice.",
      sDirectTitle: "Rapporto diretto",
      sDirectBody: "Parli direttamente con la persona che lavora al progetto. Niente commerciali, niente telefono senza fili.",
      sFlexTitle: "Flessibilità",
      sFlexBody: "Non devi inserire la tua idea dentro un pacchetto predefinito: partiamo da quello che hai in mente.",
      sScopesTitle: "Più ambiti",
      sScopesBody: "Non lavoro solo sul codice: mi muovo tra tecnologia, fashion, design, content e progetti creativi.",
      sTogetherTitle: "Costruire insieme",
      sTogetherBody: "Non voglio ricevere un brief e restituire un prodotto: voglio capire cosa vuoi ottenere e costruirlo insieme a te.",
      sLeanTitle: "Struttura snella",
      sLeanBody: "Sono una persona sola, non un'agenzia: niente intermediari intorno al lavoro, comunicazione diretta.",
      convTitle: "Non sei ancora convinto?",
      convSub: "Le domande che probabilmente ti stai facendo — con risposte oneste.",
      conv1Title: "MA HAI GIÀ LAVORATO CON QUALCUNO?",
      conv1Body:
        "Sì: brand, pagine creative e progetti reali. Li trovi nelle <a href=\"#collaborations\">collaborazioni</a> e nei <a href=\"#projects\">progetti</a>.",
      conv2Title: "E SE IL MIO PROGETTO È DIVERSO?",
      conv2Body: "Non esiste un catalogo rigido: si parte dall'idea, qualunque essa sia.",
      conv3Title: "COME FACCIO A CAPIRE COSA SAI FARE?",
      conv3Body:
        "Guarda i <a href=\"#projects\">progetti</a>, le <a href=\"#experience\">esperienze</a> e le <a href=\"#certifications\">certificazioni</a>: parlano più di qualsiasi promessa.",
      conv4Title: "POSSO SEMPLICEMENTE RACCONTARTI LA MIA IDEA?",
      conv4Body: "Sì, è il modo migliore per iniziare. <a href=\"#contact\">Scrivimi</a>.",
      convRevTitle: "Recensioni verificate",
      convRevBody:
        "<strong>Recensioni verificate</strong> — le recensioni dei progetti e delle collaborazioni verranno pubblicate qui, senza filtri.",
      serv1Price: "<strong>Sito web: a partire da 250€+</strong>",
      serv2Price: "<strong>Mantenimento: a partire da 30€+/mese</strong>",
      serv2Note: "* Servizio riservato esclusivamente ai siti realizzati da me",
      certificationsTitle: "Learning & Certifications",
      certificationsSub: "Certificazioni e percorso di apprendimento",
      certCS50Badge: "In corso",
      customlyMvp: "<strong>Agosto 2026</strong> — MVP live su customly.it.",
      customlyBtn: "Visita customly.it <span class=\"lp-cta-arrow\">→</span>",
      tlSchoolTitle: "IIS G. Vallauri, Fossano — Informatica & Telecomunicazioni",
      tlSchoolDesc: "Informatica e Telecomunicazioni. Fondamenti di programmazione, reti, sistemi e sviluppo applicativo full-stack.",
      tlSchoolDate: "2023 \u2014 Presente",
      footerNavHome: "Home",
      footerNavServices: "Servizi",
      footerNavProjects: "Progetti",
      footerNavCollab: "Collaborations",
      footerNavContact: "Contatti",
      comparisonTitle: "Dalla creazione al risultato finale",
      customlyTagline: "make it yours",
      certCS50Title: "CS50x: Intro to Computer Science",
      certCS50Sub: "Harvard University",
      certRepo: "GitHub Repo",
      certView: "Vedi certificato",
      contactOr: "Oppure",
      contactCopyEmail: "copiami l'email",
      contactWaFaster: "Sarò più veloce a rispondere su WhatsApp",
      waBtnText: "Scrivimi su WhatsApp",
      configPerPageCost: "+50 € a pagina",
    },
    en: {
      navAbout: "About",
      navServ: "Collaborations",
      heroBtn3: "Download CV",

      formSending: "Sending…",
      formSuccess: "Message sent! I'll get back to you soon.",
      formError: "Something went wrong. Try again or reach me on WhatsApp.",
      metaTitle: "Lorenzo Perassi — Developer, Creator, Fashion & Tech | Portfolio",
      metaDesc: "Developer, creator and Computer Science student. I build digital products where code, design and creativity meet. Customly, fashion tech, web development.",
      navProjects: "Projects",
      navSocials: "Social",
      navContact: "Contact",
      heroBtn1: "View Projects",
      heroBtn2: "Let's collaborate",
      heroAvail: "Available for new projects",
      letsTitle: "Let's build something",
      letsTagline: "You don't have to pick a service from a catalog. Bring an idea and let's figure out together how to build it.",
      letsWebTitle: "WEB",
      letsWebDesc: "Websites, web apps, digital products and online projects.",
      letsFashionTitle: "FASHION & SEWING",
      letsFashionDesc: "Custom fashion, design, sewing, prototyping and garment development.",
      letsContentTitle: "CONTENT",
      letsContentDesc: "Video, social media, content and communication projects.",
      letsElseTitle: "SOMETHING ELSE",
      letsElseDesc: "Have an idea that doesn't fit here? Let's talk about it.",
      letsNote:
        "I work on different projects in different fields: if you have something in mind — even if you don't quite know what yet — <a href=\"#contact\">tell me about it</a> and let's see where to start.",
      aboutTitle: "About me",
      aboutSub: "Developer, creator & student",
      aboutP1:
        "I study Computer Science, but my work doesn't stop at code. I'm interested in building projects that bring together technology, design, fashion, content and business.",
      aboutP2:
        "Whether it's a website, a brand, a garment or an idea that's still taking shape: if you want to build something, we can develop it together.",
      customlySub: "My main project",
      customlyDesc:
        "Customly is the custom fashion platform that combines fashion and technology. I designed the whole experience: from the digital configurator \u2014 where you pick colors, materials and garment details simply and instantly \u2014 to the palette, typography and layout choices that make every step clear and frictionless. Every screen, from the catalog to the order summary, starts from the real problem of someone who wants a unique garment: I think about design first, then code. On Cloudflare Pages, D1 and R2 I manage the catalog, configurator and all the end-to-end design.",
      customlyCta: "Visit customly.it",
      customlyNote: "Want to see the projects up close? My Customly profile:",
      servTitle: "Services",
      servSub: "What I can do for you",
      servCta: "Get a quote",
      servCustomCta: "Discover my profile",
      servIncludes: "What's included",
      serv1Title: "Website",
      serv1Desc:
        "I build static showcase websites: clean UI, performance, technical SEO. From development to deploy — you provide the content, I create the finished product.",
      serv1List:
        "<li>Frontend development (HTML, CSS, vanilla JS)</li><li>Responsive & mobile design</li><li>Domain setup (Aruba) + Cloudflare hosting</li><li>Deploy on Cloudflare Pages</li><li>GitHub repo delivery + autonomy instructions</li>",
      serv1Cta: "Configure your site",
      serv2Title: "Maintenance",
      serv2Desc:
        "The site doesn't end at launch. I handle ongoing technical management: updates, security, content changes, monitoring. You do your work, I keep the infrastructure running.",
      serv2List:
        "<li>Small site changes on request</li><li>Error and bug handling</li><li>Code and hosting on my personal Cloudflare</li>",
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
      projTitle: "Projects",
      projCollab: "Collaborations",
      collabTitle: "Selected collaborations",
      collabTagline: "Brands, people & projects I've worked with.",
      collabWebTitle: "WEB",
      collabWebDesc: "Websites, landing pages, web apps and digital products.",
      collabFashionTitle: "FASHION & SEWING",
      collabFashionDesc: "Custom pieces, design, prototyping and garment development.",
      collabBrandsTitle: "BRANDS",
      collabBrandsDesc: "Concepts, content, identity and creative projects.",
      collabContentTitle: "CONTENT",
      collabContentDesc: "Video, social media and communication.",
      collabTechTitle: "TECH",
      collabTechDesc: "Software, automations and experimentation.",
      collabElseTitle: "SOMETHING ELSE",
      collabElseDesc: "Have an idea that doesn't fit here? Let's talk about it.",
      projCustomlyDesc:
        "Custom fashion platform: I combine fashion and technology with a digital configurator to personalize clothing.",
      projCrybuDesc:
        "Creative fashion design & tailoring collaboration: ideating and developing custom garments through material research, prototyping and artisanal production. A project combining visual design and craftsmanship to create unique pieces.",
      testiSub: "What people say about me",
      testiEmpty:
        "Not available yet \u2014 I'll soon publish reviews from the clients I've worked with.",
      timelineSub: "Experience",
      expTitle: "Experience",
      toolsTitle: "Tools",
      connectTitle: "Let's connect",
      tl0Title: "Customly \u2014 Founder",
      tl0Date: "Aug 2026 \u2014 Present",
      tl0Desc:
        "Custom fashion platform \u2014 I combine fashion and technology with a digital configurator to personalize clothing simply and intuitively.",
      tl1Title: "Omnia4Web",
      tl1Date: "May 2026 \u2014 Jul 2026",
      tl1Desc:
        "Supporting digital content creation and social communication. Video editing, graphics and captions.",
      tl8Title: "Bertolotto Porte \u2014 IT Internship",
      tl8Date: "Jul 6\u201318 2026",
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
      contactSub: "Have an idea? Tell me about it.",
      contactDesc: "Write me for collaborations, ideas or projects.",
      ctaLabel: "Have an idea or a project?",
      ctaTitle:
        'Let\'s make it <span class="lp-cta-accent">custom-made.</span>',
      ctaText:
        "Website, custom garment or content: tell me your idea and we'll turn it into something real.",
      ctaBtn: "Let's talk",
      contactName: "Your name",
      contactEmail: "Your email",
      contactEmailPh: "Where can I reply?",
      contactType: "Project type (optional)",
      contactTypeOpts: [
        "Web",
        "Fashion & Sewing",
        "Content",
        "Collaboration",
        "Something else",
      ],
      contactCompany: "Company name (optional)",
      contactCompanyEmail: "Company email (optional)",
      contactPhone: "Phone number",
      contactPhonePh: "Phone / WhatsApp",
      contactReason: "Reason",
      contactReasonOpts: ["Configure my website", "Just an idea", "Collaboration", "Other"],
      cfReason: "What do you need?",
      cfClientType: "Client type",
      cfPrivate: "Private / Personal",
      cfBusiness: "Company / Business / Professional",
      cfNome: "First name",
      cfCognome: "Last name",
      cfNomePh: "What's your name?",
      cfCognomePh: "Your last name",
      cfPrivatoScopo: "What do you need the site for?",
      cfPrivatoScopoPh: "Portfolio, CV, artist, project...",
      cfPrivatoEsistente: "Existing site/social",
      cfPrivatoEsistentePh: "https://...",
      cfAziendaNome: "Company / Business name",
      cfAziendaNomePh: "Your business name",
      cfSettore: "Sector",
      cfSettoreSel: "Sector",
      cfSettoreSelPh: "Select",
      cfSettoreSelOpts: [
        "Restaurant",
        "Tourism / Hotel",
        "Retail / Shop",
        "Professional",
        "Artisan",
        "Creative",
        "Other",
      ],
      cfLocalita: "Location (City / Area)",
      cfLocalitaPh: "e.g. Milan",
      cfAziendaCosa: "What does the business do?",
      cfAziendaCosaPh: "Briefly describe the business",
      cfAziendaSito: "Current website",
      cfAziendaSitoPh: "https://...",
      cfAziendaSocial: "Instagram / Social",
      cfAziendaSocialPh: "https://...",
      cfMessaggio: "Message",
      cfPageHome: "Home",
      cfIncluded: "(included)",
      cfPageAbout: "About",
      cfPageServizi: "Services",
      cfPagePortfolio: "Portfolio / Gallery",
      cfPageContatti: "Contact",
      cfPageFaq: "FAQ",
      cfPageBlog: "Blog",
      cfPageAltro: "Other",
      cfPagesHint: "First page included, +€50 from the second",
      cfContenutiLabel: "Do you already have the content?",
      cfContenutiTutto: "I have texts and images",
      cfContenutiImg: "I need images",
      cfContenutiTesti: "I need help with texts",
      cfContenutiEntrambi: "I need both",
      cfImgTypeLabel: "What type of images do you need?",
      cfImgTypeSel: "Image type",
      cfImgTypePh: "Select",
      cfImgStock: "Stock images",
      cfImgGenerate: "Generated / creative images",
      cfImgFoto: "Photos of the business",
      cfImgDontKnow: "I don't know yet",
      configLangSel: "Languages",
      cfStyleLabel: "Visual style",
      cfStyleDemoLink: "View template ↗",
      cfStepConfig: "Site setup",
      cfStepDati: "Your details",
      cfgFg1Title: "Look & Animations",
      cfgFg1Desc: "Customize your site's look and motion.",
      cfgFg2Title: "Images & Media",
      cfgFg2Desc: "Advanced features for images and visual content.",
      cfgFg3Title: "Content & Navigation",
      cfgFg3Desc: "Make content easier to explore and organize.",
      cfgFg4Title: "Data & Information",
      cfgFg4Desc: "Show data, info and interactive content.",
      cfgFg5Title: "Contact",
      cfgFg5Desc: "Make it easy for customers to reach you.",
      cfStyleMinimal: "Minimal",
      cfStyleModern: "Modern",
      cfStyleBold: "Bold",
      cfStyleLuxury: "Luxury",
      cfStyleCreative: "Creative",
      cfStyleElegant: "Elegant",
      cfAdminLabel: "Admin Panel (Management panel)",
      cfAdminNo: "No (€0)",
      cfAdminSi: "Yes, I want a management panel (+€150)",
      cfMaintLabel: "Post-launch maintenance",
      cfMaintNo: "No (no monthly cost)",
      cfMaintSi: "Yes, full management",
      cfMaintNote: "Without Admin Panel €30/month, with Admin Panel €15/month (only bugs and technical issues).",
      cfProgettoLabel: "Tell me briefly about the project",
      cfProgettoPh: "What kind of site do you have in mind? What would you like to achieve?",
      cfBudgetLabel: "Do you have an indicative budget?",
      cfBudgetSel: "Indicative budget",
      cfBudgetPh: "Select",
      cfBudget1: "< €250",
      cfBudget2: "€250–500",
      cfBudget3: "€500–750",
      cfBudget4: "€750–1,000",
      cfBudget5: "€1,000+",
      cfBudgetNo: "I haven't decided yet",
      cfTotalLabel: "Estimated one-time quote",
      cfTotalNote: "The price could change, but should be around that figure.",
      summaryTitle: "Contacts",
      summaryEmail: "Email",
      summaryWhatsapp: "WhatsApp",
      summaryLocation: "Location",
      summaryLocationVal: "Saluzzo (CN), Italy",
      bookingTitle: "Book a meeting",
      bookingCall: "Video call",
      bookingInPerson: "In person",
      bookingHint: "Choose your meeting type:",
      cfWaBtn: "Message me on WhatsApp",
      contactSend: "Let's build it →",
      contactService: "Service",
      contactServiceOpts: [
        "Web Development & Management",
        "Custom & Design",
        "Collab & Sponsor",
      ],
      contactSubject: "Subject",
      contactMsg: "Tell me about your idea...",
      contactBtn: "Send quote",
      contactPrezzoNota: "The price is not final: it will be confirmed based on your project details.",
      contactBtnAlt: "Send message",
      contactPrezzoNotaAlt: "I'll get back to you as soon as possible, within 24 hours at most.",
      configTitle: "Configure your website",
      configTypeLabel: "Site type",
      configLandingText:
        "<strong>Landing page</strong><small>1 page — €250</small>",
      configMultiText:
        "<strong>Showcase site</strong><small>From 2 pages — €300</small>",
      configPagesLabel: "Number of pages",
      configPagesHint: "€50 per page (from the second)",
      configImgProText:
        "<strong>Professional images</strong><small>Image research and optimization. +€20</small>",
      configLangLabel: "Additional languages",
      configLangHint: "First language included, +€50 from the second",
      configAdminText:
        "<strong>Admin Panel</strong><small>The client edits content independently. +€150</small>",
      configMaintLabel: "Maintenance",
      configMaintNoAdmin:
        "<strong>Without Admin Panel</strong><small>€30/month — updates handled by me</small>",
      configMaintAdmin:
        "<strong>With Admin Panel</strong><small>€15/month — content handled by the client</small>",
      configMaintAuto:
        "<strong>Self-managed</strong><small>€0/month — work billed separately</small>",
      configFeaturesLabel: "Features <small>(+€10 each)</small>",
      configPriceLabel: "Estimated quote",
      configPriceSub: "May change based on your choices",
      configF1: "Dark / Light mode",
      configF1Info: "Switches automatically or on command between dark and light theme.",
      configF2: "Scroll reveal",
      configF2Info: "Appearance animations as you scroll the page.",
      configF3: "Back to top",
      configF3Info: "Button that quickly returns to the top of the page.",
      configF4: "Image lightbox",
      configF4Info: "Enlarges images to full screen on click, with simple closing.",
      configF5: "Slider / Carousel",
      configF5Info: "Auto or manual image galleries.",
      configF6: "Hover effects",
      configF6Info: "Transitions and animations on mouse hover.",
      configF7: "Animated counters",
      configF7Info: "Numbers that count up to the final value when entering the screen.",
      configF8: "Internal search",
      configF8Info: "Search field that filters site content.",
      configF9: "Category filter",
      configF9Info: "Filters content by category or topic.",
      configF10: "FAQ Accordion",
      configF10Info: "Expandable frequently asked questions.",
      configF11: "WhatsApp button",
      configF11Info: "Fixed button that opens a WhatsApp chat with you.",
      configF12: "Interactive map",
      configF12Info: "Map where customers can see the location.",
      configF13: "Before / After",
      configF13Info: "Draggable comparison between a before and after image.",
      configF14: "Marquee text",
      configF14Info: "Continuously scrolling text, curtain effect.",
      configF15: "Progress bars",
      configF15Info: "Animated filling bars to show skills or values.",
      footerTag: "Developer, creator & Customly founder",
      footerPages: "Pages",
      footerSocial: "Social",
      footerContact: "Contact",
      footerAvailable: "Available for collaborations",
      footerCopy: "© 2026 Lorenzo Perassi — All rights reserved",
      navCustomly: "Customly",
      comparisonSub: "Every project starts as an idea: I design it, build it and take it all the way to the final result — whatever the field.",
      comparisonNote: "From idea to design, from building to result: that's how I work, whether it's a website, a garment or a piece of content.",
      comparisonBeforeLabel: "Source Code",
      comparisonAfterLabel: "Final Result",
      whyTitle: "Why choose me over an agency?",
      whySub: "Not because agencies are wrong: sometimes working directly with one person is just simpler.",
      whyCard1Title: "DIRECT RELATIONSHIP",
      whyCard1Body: "You talk with the person designing and building the project, not with a sales rep. What you say is what gets built.",
      whyCard2Title: "NO PREDEFINED PACKAGES",
      whyCard2Body: "You don't have to fit your idea into a catalog: we start from what's on your mind and build around it.",
      whyCard3Title: "LEAN STRUCTURE, CLEAR COSTS",
      whyCard3Body: "No layers, no middlemen: you always know who you're talking to and what you're paying for.",
      whyCard4Title: "HAVE AN IDEA?",
      whyCard4Body: "Tell me about it and let's see if it makes sense to build it together.",
      whyCard4Cta: "Let's talk",
      maniTitle: "So who the hell do you think you are?",
      maniSub: "Fair question. Let me answer with facts.",
      maniP1:
        "A Computer Science student who keeps building things in the meantime. I study at IIS Vallauri, but I didn't wait for graduation to start: I founded Customly, a custom fashion platform combining fashion and technology, and I work on it every week.",
      maniP2:
        "Along the way I've sewn and prototyped garments with CRYBU, built websites, created video and social content, and collaborated with local brands like Aleyesure and creative pages like StageStreetwear.",
      maniP3:
        "I've worked on digital content with Omnia4Web, done an IT internship at Bertolotto Porte between management software and digital archives, earned a NASA certification on remote sensing and I'm taking Harvard's CS50x. I learn by doing, not by collecting certificates.",
      maniP4:
        "I don't have an agency, a price list or pre-made packages. I have projects — some finished, some still open — and the will to keep building.",
      maniP5:
        "If you were looking for someone with a service catalog, that's not me. If you were looking for someone to build something with, you're in the right place.",
      maniCta: "Let's talk",
      storyKicker1: "01 — Who I am",
      storyKicker2: "02 — How I work",
      storyKicker3: "03 — Why me",
      storyPortraitCap: "Yes, that's me in the picture.",
      storyCapDesk: "My setup — where projects are born.",
      storyCapCustomly: "Customly — the custom fashion platform I founded.",
      storyCapCrybu: "CRYBU — prototyping, sewing and one-of-a-kind garments.",
      storyCapCollab: "Aleyesure and StageStreetwear — collaborations, content and video.",
      storyBridge1: "And how do I actually work?",
      storyBridge2: "Ok, you've seen who I am and how I work. But why should you work with me, exactly?",
      storyWhySub: "The title is provocative, the answer is simple.",
      sDirectTitle: "Direct relationship",
      sDirectBody: "You talk directly with the person working on the project. No sales reps, no broken telephone.",
      sFlexTitle: "Flexibility",
      sFlexBody: "You don't have to fit your idea into a predefined package: we start from what's on your mind.",
      sScopesTitle: "More than one field",
      sScopesBody: "I don't just work on code: I move between technology, fashion, design, content and creative projects.",
      sTogetherTitle: "Building together",
      sTogetherBody: "I don't want to receive a brief and hand back a product: I want to understand what you want to achieve and build it with you.",
      sLeanTitle: "Lean structure",
      sLeanBody: "I'm one person, not an agency: no middlemen around the work, direct communication.",
      convTitle: "Not convinced yet?",
      convSub: "The questions you're probably asking yourself — with honest answers.",
      conv1Title: "BUT HAVE YOU WORKED WITH ANYONE?",
      conv1Body:
        "Yes: brands, creative pages and real projects. You'll find them in my <a href=\"#collaborations\">collaborations</a> and <a href=\"#projects\">projects</a>.",
      conv2Title: "WHAT IF MY PROJECT IS DIFFERENT?",
      conv2Body: "There's no rigid catalog: we start from the idea, whatever it is.",
      conv3Title: "HOW CAN I TELL WHAT YOU CAN DO?",
      conv3Body:
        "Look at my <a href=\"#projects\">projects</a>, <a href=\"#experience\">experience</a> and <a href=\"#certifications\">certifications</a>: they speak louder than any promise.",
      conv4Title: "CAN I JUST TELL YOU ABOUT MY IDEA?",
      conv4Body: "Yes, that's the best way to start. <a href=\"#contact\">Write to me</a>.",
      convRevTitle: "Verified reviews",
      convRevBody:
        "<strong>Verified reviews</strong> — reviews of my projects and collaborations will be published here, unfiltered.",
      whyCard4Cta: "Let's talk",
      serv1Price: "<strong>Website: starting from 250€+</strong>",
      serv2Price: "<strong>Maintenance: starting from 30€+/month</strong>",
      serv2Note: "* Service available exclusively for websites built by me",
      certificationsTitle: "Learning & Certifications",
      certificationsSub: "Certifications and learning journey",
      certCS50Badge: "In progress",
      customlyMvp: "<strong>August 2026</strong> — MVP live on customly.it.",
      customlyBtn: "Visit customly.it <span class=\"lp-cta-arrow\">→</span>",
      tlSchoolTitle: "IIS G. Vallauri, Fossano — IT & Telecommunications",
      tlSchoolDesc: "Computer Science & Telecoms. Fundamentals of programming, networks, systems and full-stack app development.",
      tlSchoolDate: "2023 \u2014 Present",
      footerNavHome: "Home",
      footerNavServices: "Services",
      footerNavProjects: "Projects",
      footerNavCollab: "Collaborations",
      footerNavContact: "Contact",
      comparisonTitle: "From creation to the final result",
      customlyTagline: "make it yours",
      certCS50Title: "CS50x: Intro to Computer Science",
      certCS50Sub: "Harvard University",
      certRepo: "GitHub Repo",
      certView: "View certificate",
      contactOr: "Or",
      contactCopyEmail: "copy my email",
      contactWaFaster: "I'll be faster to reply on WhatsApp",
      waBtnText: "Message me on WhatsApp",
      configPerPageCost: "+50 € per page",
    },
  };
  let _lang = localStorage.getItem("lang") || "it";
  function setLang($) {
    _lang = $;
    localStorage.setItem("lang", $);
    document.documentElement.lang = $;
    if (LANG[$].metaTitle) {
      document.title = LANG[$].metaTitle;
      var _ogt = document.querySelector('meta[property="og:title"]');
      if (_ogt) _ogt.setAttribute("content", LANG[$].metaTitle);
      var _ott = document.querySelector('meta[name="twitter:title"]');
      if (_ott) _ott.setAttribute("content", LANG[$].metaTitle);
    }
    if (LANG[$].metaDesc) {
      var _md = document.querySelector('meta[name="description"]');
      if (_md) _md.setAttribute("content", LANG[$].metaDesc);
      var _ogd = document.querySelector('meta[property="og:description"]');
      if (_ogd) _ogd.setAttribute("content", LANG[$].metaDesc);
      var _otd = document.querySelector('meta[name="twitter:description"]');
      if (_otd) _otd.setAttribute("content", LANG[$].metaDesc);
    }
    document.querySelectorAll(".lp-lang-btn").forEach(function (e) {
      e.classList.toggle("active", e.dataset.langBtn === $);
    });
    document
      .querySelectorAll("[data-lang-key], [data-lang-title]")
      .forEach(function (e) {
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
      if (e.hasAttribute("data-lang-title") && LANG[$][e.dataset.langTitle])
        e.title = LANG[$][e.dataset.langTitle];
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
  /* ===== Booking Calendly: scelta tipo incontro -> popup Calendly ===== */
  (function () {
    var BOOKING_URLS = {
      call: "https://calendly.com/perassi-lorenzo1804/30min",
      personal:
        "https://calendly.com/perassi-lorenzo1804/personal-meeting",
    };
    var BOOKING_THEME =
      "hide_gdpr_banner=1&background_color=0a0a0a&text_color=f5f5f5&primary_color=ff6b1a";
    var wrap = document.getElementById("lp-booking");
    if (!wrap) return;
    var _clScript = null;
    function ensureCalendly(cb) {
      if (window.Calendly) {
        cb();
        return;
      }
      if (!_clScript) {
        _clScript = document.createElement("script");
        _clScript.src =
          "https://assets.calendly.com/assets/external/widget.js";
        _clScript.async = true;
        document.head.appendChild(_clScript);
        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://assets.calendly.com/assets/external/widget.css";
        document.head.appendChild(css);
      }
      _clScript.addEventListener("load", cb, { once: true });
    }
    wrap.querySelectorAll("[data-booking-popup]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var type = btn.dataset.bookingPopup;
        if (!BOOKING_URLS[type]) return;
        ensureCalendly(function () {
          if (!window.Calendly) return;
          window.Calendly.initPopupWidget({
            url:
              BOOKING_URLS[type] +
              "?" +
              BOOKING_THEME +
              "&locale=" +
              (_lang === "en" ? "en" : "it"),
          });
        });
      });
    });
  })();

  /* ===== Accessibilità: collega label ai controlli (for/id) ===== */
  document
    .querySelectorAll("label.lp-field-label:not([for]), label.lp-config-label:not([for])")
    .forEach(function (label) {
      var block = label.closest(".lp-field-block") || label.closest(".lp-config-block");
      if (!block) return;
      var control = block.querySelector(
        "input:not([type=hidden]):not([type=radio]):not([type=checkbox]), select, textarea"
      );
      if (!control) return;
      if (!control.id) {
        control.id = "f-" + (control.name || "field") + "-" +
          Math.abs(Array.prototype.indexOf.call(document.querySelectorAll("label"), label));
      }
      label.setAttribute("for", control.id);
    });

  /* ===== Form contatto semplice: Nome, Email, Tipo (facoltativo), Messaggio ===== */

  var contactForm = document.querySelector(".lp-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = (contactForm.querySelector('input[name="nome"]') || {}).value || "";
      var email = (contactForm.querySelector('input[name="email"]') || {}).value || "";
      var tipoSel = contactForm.querySelector('select[name="tipo-progetto"]');
      var tipo = tipoSel && tipoSel.selectedIndex > 0
        ? tipoSel.options[tipoSel.selectedIndex].text
        : "";
      var messaggio = (contactForm.querySelector('textarea[name="messaggio"]') || {}).value || "";

      var lines = [];
      lines.push("Nome: " + nome);
      lines.push("Email: " + email);
      if (tipo) lines.push("Tipo di progetto: " + tipo);
      lines.push("Messaggio: " + messaggio);

      var summary = lines.join("\n");
      var oldRiepilogo = contactForm.querySelector('input[name="config-riepilogo"]');
      if (oldRiepilogo) oldRiepilogo.remove();
      var configHidden = document.createElement("input");
      configHidden.type = "hidden";
      configHidden.name = "config-riepilogo";
      configHidden.value = summary;
      contactForm.appendChild(configHidden);

      /* Invio AJAX con feedback inline (nessun redirect esterno) */
      var statusEl = contactForm.querySelector(".lp-form-status");
      if (!statusEl) {
        statusEl = document.createElement("p");
        statusEl.className = "lp-form-status";
        statusEl.setAttribute("role", "status");
        statusEl.setAttribute("aria-live", "polite");
        contactForm.appendChild(statusEl);
      }
      var L = LANG[_lang] || {};
      statusEl.textContent = L.formSending || "Invio in corso…";
      statusEl.classList.remove("lp-form-status--ok", "lp-form-status--error");
      var submitBtns = Array.prototype.filter.call(
        contactForm.querySelectorAll('button[type="submit"]'),
        function (b) { return b.offsetParent !== null; }
      );
      submitBtns.forEach(function (b) { b.disabled = true; });
      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json().catch(function () { return {}; });
        })
        .then(function () {
          statusEl.textContent =
            L.formSuccess || "Messaggio inviato! Ti risponderò al più presto.";
          statusEl.classList.add("lp-form-status--ok");
        })
        .catch(function () {
          statusEl.textContent =
            L.formError || "Errore nell'invio. Riprova o scrivimi su WhatsApp.";
          statusEl.classList.add("lp-form-status--error");
        })
        .finally(function () {
          submitBtns.forEach(function (b) { b.disabled = false; });
        });
    });
  }

  // Global background mouse glow tracking (disabled over footer)
  var bgGlow = document.getElementById("bgGlow");
  var footerEl = document.querySelector(".lp-footer");
  if (bgGlow) {
    window.addEventListener("mousemove", function (e) {
      if (footerEl) {
        var rect = footerEl.getBoundingClientRect();
        if (e.clientY >= rect.top) {
          bgGlow.style.opacity = "0";
          return;
        }
      }
      bgGlow.style.left = e.clientX + "px";
      bgGlow.style.top = e.clientY + "px";
      if (!document.body.classList.contains("glow-active")) {
        document.body.classList.add("glow-active");
      }
      bgGlow.style.opacity = "1";
    }, { passive: true });
  }

  // Before / After Image Comparison Slider
  var compRange = document.getElementById("comparisonRange");
  var compBefore = document.getElementById("comparisonBefore");
  var compHandle = document.getElementById("comparisonHandle");
  if (compRange && compBefore && compHandle) {
    var updateComparison = function (val) {
      compBefore.style.clipPath = "inset(0 " + (100 - val) + "% 0 0)";
      compHandle.style.left = val + "%";
    };
    compRange.addEventListener("input", function (e) {
      updateComparison(e.target.value);
    });
    updateComparison(compRange.value || 50);
  }
});
