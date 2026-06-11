document.addEventListener("DOMContentLoaded", function () {
  // Background Music Control
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicToggle");

  if (music && musicBtn) {
    let playing = false;

    musicBtn.addEventListener("click", () => {
      if (!playing) {
        music
          .play()
          .then(() => {
            musicBtn.textContent = "⏸";
            playing = true;
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      } else {
        music.pause();
        musicBtn.textContent = "▶";
        playing = false;
      }
    });
  }

  // Bootstrap Navbar Auto-Collapse on Link Click (Mobile/Tablet)
  const navCollapseEl = document.getElementById("navLinks");
  const navToggler = document.querySelector(".navbar-toggler");

  if (navCollapseEl && navToggler && window.bootstrap) {
    const bsCollapse = new bootstrap.Collapse(navCollapseEl, { toggle: false });
    const navLinks = navCollapseEl.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.getComputedStyle(navToggler).display !== "none") {
          bsCollapse.hide();
        }
      });
    });
  }

  // Drag & Touch Scroll Support for Digital Presence Videos
  const scrollers = document.querySelectorAll(".lp-presence-videos");
  scrollers.forEach((scroller) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Drag events
    scroller.addEventListener("mousedown", (e) => {
      isDown = true;
      scroller.classList.add("active-drag");
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
      e.preventDefault();
    });

    scroller.addEventListener("mouseleave", () => {
      isDown = false;
      scroller.classList.remove("active-drag");
    });

    scroller.addEventListener("mouseup", () => {
      isDown = false;
      scroller.classList.remove("active-drag");
    });

    scroller.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed multiplier
      scroller.scrollLeft = scrollLeft - walk;
    });

    // Touch swipe events for mobile devices
    scroller.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
      },
      { passive: true },
    );

    scroller.addEventListener(
      "touchmove",
      (e) => {
        const x = e.touches[0].pageX - scroller.offsetLeft;
        const walk = (x - startX) * 1.5;
        scroller.scrollLeft = scrollLeft - walk;
      },
      { passive: true },
    );
  });

  // Digital Presence auto-scroll & arrows
  const dv = document.querySelector(".lp-presence-videos");
  if (dv && dv.scrollWidth > dv.clientWidth) {
    // duplicate children for seamless infinite wrap
    const origChildren = Array.from(dv.children);
    origChildren.forEach((child) => dv.appendChild(child.cloneNode(true)));
    const origW = dv.scrollWidth / 2;

    let p = false,
      aid = null,
      t;
    const step = 0.5;
    function tk() {
      if (!p) {
        let n = dv.scrollLeft + step;
        if (n >= origW) n = 0;
        dv.scrollLeft = n;
      }
      aid = requestAnimationFrame(tk);
    }
    function ps() {
      p = true;
    }
    function rs() {
      p = false;
    }
    function wrapCheck() {
      if (dv.scrollLeft >= origW) dv.scrollLeft = 0;
      else if (dv.scrollLeft < 0) dv.scrollLeft = origW;
    }

    dv.addEventListener("touchstart", ps, { passive: true });
    dv.addEventListener("mousedown", ps);
    dv.addEventListener(
      "touchend",
      () => {
        wrapCheck();
        clearTimeout(t);
        t = setTimeout(rs, 3000);
      },
      { passive: true },
    );
    dv.addEventListener("mouseup", () => {
      wrapCheck();
      clearTimeout(t);
      t = setTimeout(rs, 3000);
    });
    dv.addEventListener("mouseleave", () => {
      clearTimeout(t);
      t = setTimeout(rs, 3000);
    });
    aid = requestAnimationFrame(tk);
    const lb = document.querySelector(".scroll-btn--left");
    const rb = document.querySelector(".scroll-btn--right");
    const amt = dv.querySelector(".lp-presence-video")?.offsetWidth + 16 || 176;
    if (lb)
      lb.addEventListener("click", () => {
        ps();
        clearTimeout(t);
        dv.scrollBy({ left: -amt, behavior: "smooth" });
        t = setTimeout(rs, 3000);
      });
    if (rb)
      rb.addEventListener("click", () => {
        ps();
        clearTimeout(t);
        dv.scrollBy({ left: amt, behavior: "smooth" });
        t = setTimeout(rs, 3000);
      });
  }

  // Scroll reveal
  const rvObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          rvObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );
  document.querySelectorAll(".lp-reveal").forEach((el) => rvObs.observe(el));

  // Nav highlight
  const secs = document.querySelectorAll("section[id]");
  const nls = document.querySelectorAll('.lp-nav-link[href^="#"]');
  const scObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          nls.forEach((l) => l.classList.remove("active"));
          const a = document.querySelector(
            `.lp-nav-link[href="#${e.target.id}"]`,
          );
          if (a) a.classList.add("active");
        }
      });
    },
    { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
  );
  secs.forEach((s) => scObs.observe(s));

  // Back to top
  const bt = document.getElementById("backToTop");
  if (bt) {
    addEventListener(
      "scroll",
      () => bt.classList.toggle("visible", scrollY > 500),
      { passive: true },
    );
    bt.addEventListener("click", () =>
      scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // Focus visible
  addEventListener("keydown", (e) => {
    if (e.key === "Tab") document.body.classList.add("lp-focus-visible");
  });
  addEventListener("mousedown", () =>
    document.body.classList.remove("lp-focus-visible"),
  );

  // Reading progress
  const pb = document.getElementById("readingProgress");
  if (pb) {
    addEventListener(
      "scroll",
      () => {
        const h = document.documentElement.scrollHeight - innerHeight;
        pb.style.width = h > 0 ? `${(scrollY / h) * 100}%` : "0%";
      },
      { passive: true },
    );
  }

  // Typewriter
  const tw = document.querySelector(".lp-typewriter");
  if (tw) {
    const words = [
      "content creator",
      "fashion",
      "coding",
      "music",
      "lifestyle",
      "technology",
    ];
    let i = 0,
      c = 0,
      dir = 1;
    function twTick() {
      const w = words[i];
      tw.textContent = w.slice(0, c);
      if (dir === 1) {
        c++;
        if (c > w.length) {
          dir = -1;
          setTimeout(twTick, 2000);
          return;
        }
      } else {
        c--;
        if (c < 0) {
          dir = 1;
          i = (i + 1) % words.length;
        }
      }
      setTimeout(twTick, dir === 1 ? 80 : 30);
    }
    twTick();
  }

  // Counters
  const ctObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const t = parseInt(el.dataset.target);
        if (isNaN(t)) return;
        const dur = 1500,
          step = Date.now();
        function tick() {
          const p = Math.min((Date.now() - step) / dur, 1);
          el.textContent = Math.floor(p * t);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = t;
        }
        tick();
        ctObs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll(".lp-counter").forEach((el) => ctObs.observe(el));

  // Parallax hero image
  const hi = document.querySelector(".lp-hero-img");
  if (hi) {
    const spd = parseFloat(hi.dataset.speed) || 0.95;
    addEventListener(
      "scroll",
      () => {
        const r = scrollY * (1 - spd);
        hi.style.transform = `translateY(${r * 0.3}px)`;
      },
      { passive: true },
    );
  }

  // Project filters
  function fFilter(f) {
    const all = document.querySelectorAll(".lp-project-card");
    let n = 0;
    all.forEach((c) => {
      const empty = c.classList.contains("lp-project-card--empty");
      const hide = f === "all" ? empty || ++n > 3 : !empty;
      c.classList.toggle("hide", hide);
    });
  }

  const fbtns = document.querySelectorAll(".lp-filter-btn");
  if (fbtns.length) {
    fbtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        fbtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        fFilter(btn.dataset.filter);
      });
    });
    fFilter("all");
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  if (lb && lbImg) {
    document
      .querySelectorAll(".lp-project-img, .lp-collab-img")
      .forEach((img) => {
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          lbImg.src = img.src;
          lb.classList.add("open");
        });
        img.style.cursor = "pointer";
      });
  }

  // Tech tooltips
  document.querySelectorAll(".lp-tech-item").forEach((item) => {
    const lvl = item.dataset.level;
    const ctx = item.dataset.context;
    if (!lvl && !ctx) return;
    const tip = document.createElement("div");
    tip.className = "lp-tooltip";
    tip.innerHTML =
      '<span class="lp-tooltip-level">' +
      lvl +
      '</span> · <span class="lp-tooltip-context">' +
      ctx +
      "</span>";
    item.appendChild(tip);
    // click toggle for mobile
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(".lp-tech-item.show-tip")
        .forEach((el) => el !== item && el.classList.remove("show-tip"));
      item.classList.toggle("show-tip");
    });
  });
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".lp-tech-item.show-tip")
      .forEach((el) => el.classList.remove("show-tip"));
  });

  // Form feedback
  const form = document.querySelector(".lp-contact-form");
  const fb = document.getElementById("formFeedback");
  if (form && fb) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      fb.className = "lp-form-feedback";
      fb.textContent = "Invio in corso...";
      fb.style.display = "block";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          fb.className = "lp-form-feedback success";
          fb.textContent =
            "Messaggio inviato con successo! Ti risponderò presto.";
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        fb.className = "lp-form-feedback error";
        fb.textContent =
          "Errore nell'invio. Riprova più tardi o scrivimi direttamente su Instagram.";
      }
    });
  }
});
