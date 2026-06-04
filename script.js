// musica

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggle");

let playing = false;

function startMusic(){
    if (!playing) {
        music.play();
        btn.textContent = "⏸";
    } else {
        music.pause();
        btn.textContent = "▶";
    }
    playing = !playing;
};

document.addEventListener("DOMContentLoaded", function () {
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

    // Drag / mouse-scroll support for Digital Presence carousels
    const scrollers = document.querySelectorAll('.lp-presence-videos');
    scrollers.forEach((scroller) => {
        let isDown = false;
        let startX;
        let scrollLeft;

        scroller.addEventListener('mousedown', (e) => {
            isDown = true;
            scroller.classList.add('active-drag');
            startX = e.pageX - scroller.offsetLeft;
            scrollLeft = scroller.scrollLeft;
            e.preventDefault();
        });

        scroller.addEventListener('mouseleave', () => {
            isDown = false;
            scroller.classList.remove('active-drag');
        });

        scroller.addEventListener('mouseup', () => {
            isDown = false;
            scroller.classList.remove('active-drag');
        });

        scroller.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scroller.offsetLeft;
            const walk = (x - startX) * 1.5; // scroll speed
            scroller.scrollLeft = scrollLeft - walk;
        });

        // touch
        scroller.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - scroller.offsetLeft;
            scrollLeft = scroller.scrollLeft;
        }, {passive: true});

        scroller.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - scroller.offsetLeft;
            const walk = (x - startX) * 1.5;
            scroller.scrollLeft = scrollLeft - walk;
        }, {passive: true});
    });
});