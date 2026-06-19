/* ==========================================================================
   XPAT PHYSIOTHERAPY & WELLNESS — INTERACTIONS
   Vanilla JS, no dependencies.
   --------------------------------------------------------------------------
   EDIT ME: change the WhatsApp number in ONE place below.
   ========================================================================== */
(function () {
  "use strict";

  // --- Clinic config (edit here) -----------------------------------------
  var WHATSAPP_NUMBER = "2349162222551"; // international format, no "+" or spaces

  // --- Helpers ------------------------------------------------------------
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----------------------------------------------------------------------
     1. STICKY NAV shadow on scroll
     ---------------------------------------------------------------------- */
  var nav = $("#nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------------------
     2. MOBILE MENU
     ---------------------------------------------------------------------- */
  var toggle = $("#navToggle");
  var mobile = $("#navMobile");
  function closeMenu() {
    if (!toggle || !mobile) return;
    toggle.classList.remove("is-open");
    mobile.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".nav__mobile a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  // Close menu if resized up to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 960) closeMenu();
  });

  /* ----------------------------------------------------------------------
     3. SMOOTH ANCHOR offset for sticky header
     ---------------------------------------------------------------------- */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ----------------------------------------------------------------------
     4. SCROLL REVEAL
     ---------------------------------------------------------------------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----------------------------------------------------------------------
     5. COUNTERS (stats)
     ---------------------------------------------------------------------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ----------------------------------------------------------------------
     6. FAQ ACCORDION
     ---------------------------------------------------------------------- */
  $$(".faq__item").forEach(function (item) {
    var q = $(".faq__q", item);
    var a = $(".faq__a", item);
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      // close others
      $$(".faq__item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          $(".faq__a", other).style.maxHeight = null;
        }
      });
      if (open) {
        item.classList.remove("is-open");
        a.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ----------------------------------------------------------------------
     7. CONDITION CHIPS (booking form)
     ---------------------------------------------------------------------- */
  var chips = $$("#conditionChips .chip");
  var conditionInput = $("#condition");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      if (conditionInput) conditionInput.value = chip.getAttribute("data-value");
    });
  });

  /* ----------------------------------------------------------------------
     8. TOAST
     ---------------------------------------------------------------------- */
  var toast = $("#toast");
  var toastMsg = $("#toastMsg");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 3500);
  }

  /* ----------------------------------------------------------------------
     9. BOOKING FORM -> WHATSAPP
        Builds a pre-filled WhatsApp message from the form and opens chat.
        (Front-end only — swap this for a real backend POST when going live.)
     ---------------------------------------------------------------------- */
  var form = $("#bookingForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name      = $("#fullname").value.trim();
      var phone     = $("#phone").value.trim();
      var condition = ($("#condition").value || "").trim();
      var visit     = $("#visitType").value;
      var preferred = $("#preferred").value.trim();
      var message   = $("#message").value.trim();

      // Minimal validation
      if (!name || !phone) {
        showToast("Please add your name and phone number.");
        if (!name) $("#fullname").focus(); else $("#phone").focus();
        return;
      }
      if (!condition) {
        showToast("Please pick what you need help with.");
        return;
      }
      if (!visit) {
        showToast("Please choose clinic or home visit.");
        $("#visitType").focus();
        return;
      }

      var lines = [
        "Hello Xpat Physiotherapy & Wellness, I'd like to book an appointment.",
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Concern: " + condition,
        "Where: " + visit
      ];
      if (preferred) lines.push("Preferred time: " + preferred);
      if (message)   lines.push("Details: " + message);

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      showToast("Opening WhatsApp to send your request…");
      window.open(url, "_blank", "noopener");
    });
  }

  /* ----------------------------------------------------------------------
     10. FOOTER YEAR
     ---------------------------------------------------------------------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
