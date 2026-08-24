/* Template demos — shared micro-JS (nav mobile + reveal) */
(function () {
  "use strict";

  /* Menu mobile */
  var burger = document.querySelector(".tpl-burger");
  var panel = document.getElementById("tpl-panel");
  if (burger && panel) {
    var setOpen = function (open) {
      panel.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /* Reveal on scroll (rispetta prefers-reduced-motion via CSS) */
  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".tpl-reveal");
  if (!items.length) return;
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach(function (el) { io.observe(el); });
})();
