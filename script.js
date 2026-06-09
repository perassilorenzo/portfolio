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
    let p = false,
      aid = null,
      t;
    const step = 0.5;
    function tk() {
      if (!p) {
        const m = dv.scrollWidth - dv.clientWidth;
        let n = dv.scrollLeft + step;
        if (n >= m) n = 0;
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
    dv.addEventListener("touchstart", ps, { passive: true });
    dv.addEventListener("mousedown", ps);
    dv.addEventListener(
      "touchend",
      () => {
        clearTimeout(t);
        t = setTimeout(rs, 3000);
      },
      { passive: true },
    );
    dv.addEventListener("mouseup", () => {
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
});
