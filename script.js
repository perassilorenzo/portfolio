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

  // Digital Presence — drag, infinite auto-scroll & arrows
  const dv = document.querySelector(".lp-presence-videos");
  if (dv) {
    const orig = Array.from(dv.children);
    orig.forEach((c) => dv.appendChild(c.cloneNode(true)));
    const hw = dv.scrollWidth / 2;

    let drag = false,
      paused = false,
      rid = null,
      rt;
    let sx, sl;

    function tick() {
      if (!paused) {
        dv.scrollLeft += 0.6;
        if (dv.scrollLeft >= hw) dv.scrollLeft -= hw;
      }
      rid = requestAnimationFrame(tick);
    }

    dv.addEventListener("mousedown", (e) => {
      drag = true;
      paused = true;
      dv.classList.add("active-drag");
      sx = e.pageX - dv.offsetLeft;
      sl = dv.scrollLeft;
    });
    document.addEventListener("mousemove", (e) => {
      if (!drag) return;
      dv.scrollLeft = sl - (e.pageX - dv.offsetLeft - sx) * 1.5;
    });
    document.addEventListener("mouseup", () => {
      if (!drag) return;
      drag = false;
      paused = false;
      dv.classList.remove("active-drag");
      if (dv.scrollLeft >= hw || dv.scrollLeft < 0) dv.scrollLeft = 0;
    });

    dv.addEventListener(
      "touchstart",
      (e) => {
        paused = true;
        sx = e.touches[0].pageX - dv.offsetLeft;
        sl = dv.scrollLeft;
      },
      { passive: true },
    );
    dv.addEventListener(
      "touchmove",
      (e) => {
        dv.scrollLeft = sl - (e.touches[0].pageX - dv.offsetLeft - sx) * 1.5;
      },
      { passive: true },
    );
    dv.addEventListener(
      "touchend",
      () => {
        clearTimeout(rt);
        rt = setTimeout(() => {
          paused = false;
        }, 4000);
        if (dv.scrollLeft >= hw || dv.scrollLeft < 0) dv.scrollLeft = 0;
      },
      { passive: true },
    );

    rid = requestAnimationFrame(tick);
    const amt = dv.querySelector(".lp-presence-video")?.offsetWidth + 16 || 176;
    const lb = document.querySelector(".scroll-btn--left");
    const rb = document.querySelector(".scroll-btn--right");
    if (lb)
      lb.addEventListener("click", () => {
        paused = true;
        dv.scrollBy({ left: -amt, behavior: "smooth" });
        clearTimeout(rt);
        rt = setTimeout(() => {
          paused = false;
        }, 3000);
      });
    if (rb)
      rb.addEventListener("click", () => {
        paused = true;
        dv.scrollBy({ left: amt, behavior: "smooth" });
        clearTimeout(rt);
        rt = setTimeout(() => {
          paused = false;
        }, 3000);
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

  // Nav highlight + sliding indicator
  const secs = document.querySelectorAll("section[id]");
  const nls = document.querySelectorAll('.lp-nav-link[href^="#"]');
  const navUl = document.querySelector(".lp-navbar .navbar-nav");
  let ind;
  if (navUl && window.innerWidth >= 992) {
    ind = document.createElement("div");
    ind.className = "lp-nav-indicator";
    navUl.style.position = "relative";
    navUl.appendChild(ind);
    function moveInd(el) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pr = navUl.getBoundingClientRect();
      ind.style.left = r.left - pr.left + "px";
      ind.style.width = r.width + "px";
    }
    moveInd(
      document.querySelector('.lp-nav-link.active, .lp-nav-link[href="#hero"]'),
    );
    const scObs2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            nls.forEach((l) => l.classList.remove("active"));
            const a = document.querySelector(
              `.lp-nav-link[href="#${e.target.id}"]`,
            );
            if (a) {
              a.classList.add("active");
              moveInd(a);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );
    secs.forEach((s) => scObs2.observe(s));
    addEventListener("resize", () =>
      moveInd(document.querySelector(".lp-nav-link.active")),
    );
  } else {
    const scObs2 = new IntersectionObserver(
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
    secs.forEach((s) => scObs2.observe(s));
  }

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
    const text =
      "Documento la mia vita, le mie passioni, e i miei progetti attraverso contenuti, moda e tecnologia.";
    let c = 0;
    function twTick() {
      tw.textContent = text.slice(0, c);
      c++;
      if (c <= text.length) setTimeout(twTick, 30);
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

  // Pause videos outside viewport
  const vObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.play().catch(() => {});
          vObs.unobserve(e.target);
        } else {
          e.target.pause();
        }
      });
    },
    { threshold: 0 },
  );
  document.querySelectorAll("video").forEach((v) => vObs.observe(v));

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
    document.querySelectorAll(".lp-project-card").forEach((c) => {
      const empty = c.classList.contains("lp-project-card--empty");
      const cat = c.dataset.category;
      if (f === "all") {
        c.classList.toggle("hide", empty);
      } else {
        c.classList.toggle("hide", cat !== f);
      }
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

  // Project modal
  const pm = document.getElementById("projectModal");
  if (pm) {
    document
      .querySelectorAll(".lp-project-card:not(.lp-project-card--empty)")
      .forEach((c) => {
        c.addEventListener("click", () => {
          const img = c.querySelector("img");
          document.getElementById("modalImg").src = img ? img.src : "";
          document.getElementById("modalTitle").textContent =
            c.querySelector("h4").textContent;
          document.getElementById("modalDesc").textContent =
            c.querySelector("p").textContent;
          const badges = c.querySelectorAll(".lp-badge");
          const container = document.getElementById("modalBadges");
          container.innerHTML = "";
          badges.forEach((b) => {
            const s = document.createElement("span");
            s.className = "lp-badge";
            s.textContent = b.textContent;
            container.appendChild(s);
          });
          pm.classList.add("open");
        });
        c.style.cursor = "pointer";
      });
  }

  window.closeProjectModal = function () {
    pm.classList.remove("open");
  };

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

  // Lightbox gallery
  const lb = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lbMedia");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  const lbDots = document.getElementById("lbDots");
  let mediaList = [];
  let mediaIdx = 0;
  let touchX = 0;

  if (lb && lbMedia) {
    function isVideo(src) {
      return /\.(mp4|mov|webm|avi|mkv)$/i.test(src);
    }

    function renderDots() {
      lbDots.innerHTML = "";
      if (mediaList.length <= 1) return;
      mediaList.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "lp-lightbox-dot";
        if (i === mediaIdx) dot.classList.add("active");
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          mediaIdx = i;
          renderMedia();
        });
        lbDots.appendChild(dot);
      });
    }

    function renderMedia() {
      const src = mediaList[mediaIdx];
      lbMedia.innerHTML = "";
      if (isVideo(src)) {
        const v = document.createElement("video");
        v.src = src;
        v.muted = true;
        v.loop = true;
        v.autoplay = true;
        v.playsInline = true;
        lbMedia.appendChild(v);
        v.play().catch(() => {});
      } else {
        const i = document.createElement("img");
        i.src = src;
        i.alt = "";
        lbMedia.appendChild(i);
      }
      renderDots();
      lbPrev.style.display = mediaList.length > 1 ? "" : "none";
      lbNext.style.display = mediaList.length > 1 ? "" : "none";
    }

    function navMedia(d) {
      if (!mediaList.length) return;
      mediaIdx = (mediaIdx + d + mediaList.length) % mediaList.length;
      renderMedia();
    }

    function openMedia(list, idx) {
      mediaList = list;
      mediaIdx = idx;
      lb.classList.add("open");
      renderMedia();
    }

    document
      .querySelectorAll(".lp-project-img, .lp-collab-img")
      .forEach((img) => {
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          const card = img.closest("[data-media]");
          if (card) {
            const raw = card.dataset.media;
            if (raw) {
              const list = raw
                .split("|")
                .map((s) => s.trim())
                .filter(Boolean);
              if (list.length) {
                openMedia(list, 0);
                return;
              }
            }
          }
          openMedia([img.src], 0);
        });
        img.style.cursor = "pointer";
      });

    lbPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      navMedia(-1);
    });

    lbNext.addEventListener("click", (e) => {
      e.stopPropagation();
      navMedia(1);
    });

    lb.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    lb.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].screenX - touchX;
        if (Math.abs(dx) > 50) navMedia(dx > 0 ? -1 : 1);
      },
      { passive: true },
    );

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "ArrowLeft") navMedia(-1);
      if (e.key === "ArrowRight") navMedia(1);
      if (e.key === "Escape") window.closeLightbox();
    });

    window.closeLightbox = function () {
      lb.classList.remove("open");
      lbMedia.innerHTML = "";
      mediaList = [];
    };
  }
});
