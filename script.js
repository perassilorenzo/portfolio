document.addEventListener("DOMContentLoaded", function () {
  const e = document.getElementById("bgMusic"),
    t = document.getElementById("musicToggle");
  if (e && t) {
    let T = !1;
    t.addEventListener("click", () => {
      T
        ? (e.pause(), (t.textContent = "▶"), (T = !1))
        : e
            .play()
            .then(() => {
              ((t.textContent = "⏸"), (T = !0));
            })
            .catch((e) => {
              console.error("Audio playback failed:", e);
            });
    });
  }
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
  const s = document.querySelector(".lp-presence-videos");
  if (s) {
    Array.from(s.children).forEach((e) => s.appendChild(e.cloneNode(!0)));
    const N = s.scrollWidth / 2;
    let P,
      j,
      H,
      D = !1,
      O = !1,
      X = null;
    (s.addEventListener("mousedown", (e) => {
      ((D = !0),
        (O = !0),
        s.classList.add("active-drag"),
        (j = e.pageX - s.offsetLeft),
        (H = s.scrollLeft));
    }),
      document.addEventListener("mousemove", (e) => {
        D && (s.scrollLeft = H - 1.5 * (e.pageX - s.offsetLeft - j));
      }),
      document.addEventListener("mouseup", () => {
        D &&
          ((D = !1),
          (O = !1),
          s.classList.remove("active-drag"),
          (s.scrollLeft >= N || s.scrollLeft < 0) && (s.scrollLeft = 0));
      }),
      s.addEventListener(
        "touchstart",
        (e) => {
          ((O = !0),
            (j = e.touches[0].pageX - s.offsetLeft),
            (H = s.scrollLeft));
        },
        { passive: !0 },
      ),
      s.addEventListener(
        "touchmove",
        (e) => {
          s.scrollLeft = H - 1.5 * (e.touches[0].pageX - s.offsetLeft - j);
        },
        { passive: !0 },
      ),
      s.addEventListener(
        "touchend",
        () => {
          (clearTimeout(P),
            (P = setTimeout(() => {
              O = !1;
            }, 4e3)),
            (s.scrollLeft >= N || s.scrollLeft < 0) && (s.scrollLeft = 0));
        },
        { passive: !0 },
      ),
      (X = requestAnimationFrame(function e() {
        (O || ((s.scrollLeft += 0.6), s.scrollLeft >= N && (s.scrollLeft -= N)),
          (X = requestAnimationFrame(e)));
      })));
    const F = s.querySelector(".lp-presence-video")?.offsetWidth + 16 || 176,
      Y = document.querySelector(".scroll-btn--left"),
      $ = document.querySelector(".scroll-btn--right");
    (Y &&
      Y.addEventListener("click", () => {
        ((O = !0),
          s.scrollBy({ left: -F, behavior: "smooth" }),
          clearTimeout(P),
          (P = setTimeout(() => {
            O = !1;
          }, 3e3)));
      }),
      $ &&
        $.addEventListener("click", () => {
          ((O = !0),
            s.scrollBy({ left: F, behavior: "smooth" }),
            clearTimeout(P),
            (P = setTimeout(() => {
              O = !1;
            }, 3e3)));
        }));
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
      "Documento la mia vita, le mie passioni e i miei progetti attraverso comunicazione, moda e tecnologia.";
    let G = 0;
    !(function e() {
      ((p.textContent = z.slice(0, G)),
        G++,
        G <= z.length && setTimeout(e, 30));
    })();
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
        ? t.classList.toggle("hide", o || "fashion-customization" === n)
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
      navWhat: "What I do",
      navProjects: "Projects",
      navSocials: "Socials",
      navContact: "Contact",
      heroBtn1: "Guarda i progetti",
      heroBtn2: "Contattami",
      aboutSub: "Chi sono",
      aboutP1:
        "Sono Lorenzo Perassi, developer, creator e studente di Informatica. Costruisco prodotti digitali dove codice, design e creativit\u00e0 si incontrano. Il mio progetto principale \u00e8 Customly, una piattaforma di personalizzazione abbigliamento che unisce moda e tecnologia.",
      aboutP2:
        "Utilizzo le piattaforme digitali come uno spazio dove condividere progetti, esperimenti creativi, routine, lavoro pratico e crescita personale, oltre che per creare connessioni, farmi conoscere e portarmi opportunit\u00e0.<br><br>Collaboro con brand locali, pagine creative e magazine musicali, lavorando su contenuti, comunicazioni online e progetti creativi. Sviluppo anche siti web per locali e piccole imprese.<br><br>Lavoro su Customly come piattaforma principale, dove sviluppo il configuratore digitale e gestisco la piattaforma.",
      widSub: "Cosa faccio",
      wid1Title: "01 \u2014 Comunicazione",
      wid1Desc:
        "Racconto progetti, idee e conoscenze attraverso contenuti, storytelling e comunicazione social. Collaboro con brand e pagine creative lavorando su contenuti, edizioni video e comunicazioni online.",
      wid2Title: "02 \u2014 Fashion & Custom Projects",
      wid2Desc:
        "Lavoro su customizzazioni, design e sperimentazione nel mondo fashion, con progetti di sartoria e rielaborazione di capi. Ho collaborato al design, alla prototipazione e alla creazione delle camicie per gli investitori di CRYBU S.R.L.",
      wid3Title: "03 \u2014 IT & Computer Science",
      wid3Desc:
        "L'informatica \u00e8 una delle mie passioni principali. La studio sia a scuola che da autodidatta, approfondendo sviluppo web, programmazione, AI, cybersecurity e tecnologia in generale.<br><br>Il mio progetto principale \u00e8 Customly \u2014 una piattaforma di custom fashion sviluppata con Cloudflare Pages, D1 e R2, che unisce codice e design in un prodotto reale.",
      customlySub: "Il mio progetto principale",
      customlyDesc:
        "Customly \u00e8 la piattaforma di custom fashion che unisce moda e tecnologia: un configuratore digitale per personalizzare abbigliamento in modo semplice e intuitivo. Sviluppata con Cloudflare Pages, D1 e R2, \u00e8 il mio progetto principale, dove gestisco catalogo prodotti e configuratore.",
      customlyCta: "Visita customly.it",
      servSub: "Cosa posso fare per te",
      serv1Title: "Web Design & Development",
      serv1Desc:
        "Siti web per locali, ristoranti e piccole imprese. Realizzo siti veloci e ottimizzati, con dominio, hosting e manutenzione mensile.",
      serv2Title: "Custom Fashion",
      serv2Desc:
        "Rework e personalizzazione di capi: denim, t-shirt e capi su misura. Trasformo capi esistenti in pezzi unici.",
      serv3Title: "Comunicazione & Contenuti",
      serv3Desc:
        "Editing video, caption e gestione social per brand e attivit\u00e0. Storytelling che racconta il tuo progetto.",
      dpSub: "Presenza Online",
      dpDesc:
        "Utilizzo le piattaforme social come un diario per condividere quello che faccio quotidianamente tra lifestyle, moda, tecnologia, progetti personali e sperimentazione digitale.",
      projSub: "Progetti Selezionati",
      projAll: "All",
      projClient: "Client Work",
      projPersonal: "Personal Project",
      projFashion: "Fashion Customization",
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
      navWhat: "What I do",
      navProjects: "Projects",
      navSocials: "Socials",
      navContact: "Contact",
      heroBtn1: "View Projects",
      heroBtn2: "Contact Me",
      aboutSub: "About Me",
      aboutP1:
        "I'm Lorenzo Perassi, developer, creator and Computer Science student. I build digital products where code, design and creativity meet. My main project is Customly, a clothing customization platform combining fashion and technology.",
      aboutP2:
        "I use digital platforms as a space to share projects, creative experiments, routines, hands-on work and personal growth, as well as to build connections and create opportunities.<br><br>I collaborate with local brands, creative pages and music magazines, working on content, online communications and creative projects. I also develop websites for local businesses and small companies.<br><br>I work on Customly as my main platform, where I develop the digital configurator and manage the platform.",
      widSub: "What I do",
      wid1Title: "01 \u2014 Communication",
      wid1Desc:
        "I share projects, ideas and knowledge through content, storytelling and social communication. I collaborate with brands and creative pages working on content, video editing and online communications.",
      wid2Title: "02 \u2014 Fashion & Custom Projects",
      wid2Desc:
        "I work on customizations, design and experimentation in fashion, with tailoring and garment rework projects. I contributed to the design, prototyping and creation of the shirts for CRYBU S.R.L. investors.",
      wid3Title: "03 \u2014 IT & Computer Science",
      wid3Desc:
        "Computer science is one of my main passions. I study it both at school and independently, exploring web development, programming, AI, cybersecurity and technology in general.<br><br>My main project is Customly \u2014 a custom fashion platform built with Cloudflare Pages, D1 and R2, combining code and design into a real product.",
      customlySub: "My main project",
      customlyDesc:
        "Customly is the custom fashion platform that combines fashion and technology: a digital configurator to personalize clothing simply and intuitively. Built with Cloudflare Pages, D1 and R2, it is my main project, where I manage the product catalog and the configurator.",
      customlyCta: "Visit customly.it",
      servSub: "What I can do for you",
      serv1Title: "Web Design & Development",
      serv1Desc:
        "Websites for local businesses, restaurants and small companies. I build fast, optimized sites with domain, hosting and monthly maintenance.",
      serv2Title: "Custom Fashion",
      serv2Desc:
        "Garment rework and customization: denim, t-shirts and made-to-order pieces. I turn existing items into unique pieces.",
      serv3Title: "Communication & Content",
      serv3Desc:
        "Video editing, captions and social management for brands and businesses. Storytelling that tells your story.",
      dpSub: "Digital Presence",
      dpDesc:
        "I use social platforms as a diary to share what I do daily across lifestyle, fashion, technology, personal projects and digital experimentation.",
      projSub: "Selected Projects",
      projAll: "All",
      projClient: "Client Work",
      projPersonal: "Personal Project",
      projFashion: "Fashion Customization",
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
        if (e.dataset.langHtml) e.innerHTML = LANG[$][o];
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
