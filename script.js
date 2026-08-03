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
        { t: "lorenzo perassi — developer · creator · founder" },
        { c: "cat stack.txt" },
        { t: "lang:    html · css · js · ts · python · sql" },
        { t: "web:     cloudflare pages · d1 · r2 · workers" },
        { t: "fashion: rework · upcycling · custom garments" },
        { t: "media:   content strategy · editing · social" },
        { c: "echo $MAIN_PROJECT" },
        { t: "customly.it — custom fashion platform" },
        { c: "ls ./goals" },
        { t: "build   ship   grow" },
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
    addEventListener(
      "scroll",
      () => {
        const e = scrollY * (1 - J);
        f.style.transform = `translateY(${0.3 * e}px)`;
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
          const t = e.querySelector("img");
          ((document.getElementById("modalImg").src = t ? t.src : ""),
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
    (document
      .querySelectorAll(".lp-project-img, .lp-collab-img")
      .forEach((e) => {
        (e.addEventListener("click", (t) => {
          t.stopPropagation();
          const o = e.closest("[data-media]");
          if (o) {
            const e = o.dataset.media;
            if (e) {
              const t = e
                .split("|")
                .map((e) => e.trim())
                .filter(Boolean);
              if (t.length) return void B(t, 0);
            }
          }
          B([e.src], 0);
        }),
          (e.style.cursor = "pointer"));
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
        "Customly \u00e8 la piattaforma di custom fashion che unisce moda e tecnologia: un configuratore digitale per personalizzare abbigliamento in modo semplice e intuitivo. Sviluppata con Cloudflare Pages, D1 e R2, \u00e8 il mio progetto principale, dove gestisco catalogo prodotti e configuratore.",
      customlyCta: "Visita customly.it",
      servSub: "Cosa posso fare per te",
      servCta: "Richiedi preventivo",
      serv1Title: "Web Design & Development",
      serv1Desc:
        "Siti web veloci e professionali per locali, ristoranti e piccole imprese. Dominio, hosting e manutenzione inclusi, pensati per portarti clienti.",
      serv2Title: "Custom Fashion",
      serv2Desc:
        "Rework e personalizzazione di capi: denim, t-shirt e capi su misura. Trasformo capi esistenti in pezzi unici che raccontano chi sei.",
      serv3Title: "Comunicazione & Contenuti",
      serv3Desc:
        "Collab e contenuti per il tuo brand: ideo, edito e pubblico contenuti condivisi sul mio e sul tuo profilo. Un plus semplice per farti conoscere.",
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
      collab2Desc:
        "Progetto creativo che unisce video, streetwear e custom cappellini.",
      collab3Name: "NewGenMusic4",
      collab3Desc:
        "Portiamo avanti una rubrica che mette insieme la musica e l'abbigliamento. Questa pagina \u00e8 un magazine no profit che ha come obiettivo sponsorizzare piccoli artisti della new gen.",
      toolsSub: "Strumenti & Competenze",
      toolGroupLangs: "Linguaggi",
      toolGroupWeb: "Web & Cloud",
      toolGroupDesign: "Design & Editing",
      toolGroupTools: "Strumenti & Office",
      faqSub: "Domande frequenti",
      faq1Q: "Quanto costa un sito web?",
      faq1A:
        "Dipende dal progetto: siti one-page a prezzi accessibili, progetti pi\u00f9 complessi su preventivo. Scrivimi e in 24 ore hai una risposta.",
      faq2Q: "Quanto tempo ci vuole?",
      faq2A:
        "Un sito one-page richiede 1-2 settimane. I progetti pi\u00f9 grandi vengono pianificati insieme, con aggiornamenti costanti.",
      faq3Q: "Lavori anche con piccoli locali?",
      faq3A:
        "S\u00ec, \u00e8 il mio focus: ristoranti, negozi, artigiani e liberi professionisti. Creo soluzioni pensate per portare clienti reali.",
      faq4Q: "Cosa serve per iniziare?",
      faq4A:
        "Mi basta un messaggio con le tue idee: da l\u00ec ti guido io passo per passo, dalla proposta alla consegna.",
      faq5Q: "Cosa succede dopo la consegna?",
      faq5A:
        "Il sito \u00e8 tuo al 100%: dominio, codice e contenuti. Posso anche occuparmi di manutenzione mensile e aggiornamenti.",
      contactSub: "Restiamo in contatto",
      contactDesc: "Scrivimi per collaborazioni, idee o progetti.",
      contactName: "Il tuo nome",
      contactEmail: "La tua email",
      contactSubject: "Oggetto",
      contactMsg: "Il tuo messaggio...",
      contactBtn: "Invia messaggio",
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
        "Customly is the custom fashion platform that combines fashion and technology: a digital configurator to personalize clothing simply and intuitively. Built with Cloudflare Pages, D1 and R2, it is my main project, where I manage the product catalog and the configurator.",
      customlyCta: "Visit customly.it",
      servSub: "What I can do for you",
      servCta: "Get a quote",
      serv1Title: "Web Design & Development",
      serv1Desc:
        "Websites for local businesses, restaurants and small companies. I build fast, optimized sites with domain, hosting and monthly maintenance.",
      serv2Title: "Custom Fashion",
      serv2Desc:
        "Garment rework and customization: denim, t-shirts and made-to-order pieces. I turn existing items into unique pieces.",
      serv3Title: "Communication & Content",
      serv3Desc:
        "Collabs and content for your brand: I create, edit and publish shared content on my profile and yours. An easy plus to get you known.",
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
      collab2Desc:
        "Creative project merging video, streetwear and custom caps.",
      collab3Name: "NewGenMusic4",
      collab3Desc:
        "We run a column combining music and fashion. This page is a non-profit magazine aimed at promoting new gen artists.",
      toolsSub: "Tools & Skills",
      toolGroupLangs: "Languages",
      toolGroupWeb: "Web & Cloud",
      toolGroupDesign: "Design & Editing",
      toolGroupTools: "Tools & Office",
      faqSub: "Frequently asked questions",
      faq1Q: "How much does a website cost?",
      faq1A:
        "It depends on the project: one-page sites at accessible prices, more complex projects on quote. Write me and you'll have an answer within 24 hours.",
      faq2Q: "How long does it take?",
      faq2A:
        "A one-page site takes 1-2 weeks. Bigger projects are planned together, with constant updates.",
      faq3Q: "Do you also work with small local businesses?",
      faq3A:
        "Yes, that's my focus: restaurants, shops, artisans and freelancers. I build solutions designed to bring real customers.",
      faq4Q: "What do I need to get started?",
      faq4A:
        "Just send me a message with your ideas: from there I'll guide you step by step, from proposal to delivery.",
      faq5Q: "What happens after delivery?",
      faq5A:
        "The site is 100% yours: domain, code and content. I can also handle monthly maintenance and updates.",
      contactSub: "Stay in touch",
      contactDesc: "Write me for collaborations, ideas or projects.",
      contactName: "Your name",
      contactEmail: "Your email",
      contactSubject: "Subject",
      contactMsg: "Your message...",
      contactBtn: "Send message",
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
        else if (e.tagName === "INPUT" || e.tagName === "TEXTAREA")
          e.placeholder = LANG[$][o];
        else e.textContent = LANG[$][o];
      }
    });
  }
  document.querySelectorAll(".lp-lang-btn").forEach(function (e) {
    e.addEventListener("click", function () {
      setLang(e.dataset.langBtn);
    });
  });
  setLang(_lang);
});
