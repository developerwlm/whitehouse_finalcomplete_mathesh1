import { useEffect } from "react";

const SITE = {
  name: "Whitehouse",
  whatsappNumber: "9180980 91797",
  phoneDisplay: "+91 98765 43210",
  phoneLink: "+9180980 91797",
  email: "placement@whitehouse.com",
  web3formsKey: "",
  emailEndpoint: "",
};

export function getWhatsAppUrl({ course, topic } = {}) {
  const message = course
    ? `Hello ${SITE.name}! I would like to know more about the "${course}" course. Please share the batch timings and fees.`
    : topic
      ? `Hello ${SITE.name}! I have an enquiry about ${topic}.`
      : `Hello ${SITE.name}! I found your website and would like to know more about your courses.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Wires up the site-wide DOM behaviours. Pass `version` when the page swaps in
 * content asynchronously so the bindings are re-applied to the new elements.
 */
export function useSiteEffects(version) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];
    const listen = (target, event, handler, options) => {
      target?.addEventListener(event, handler, options);
      cleanups.push(() => target?.removeEventListener(event, handler, options));
    };

    // Mobile navigation and backdrop
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    let backdrop;
    if (toggle && nav) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);
      const close = () => {
        nav.classList.remove("is-open"); backdrop.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("is-locked");
      };
      const open = () => {
        nav.classList.add("is-open"); backdrop.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        document.body.classList.add("is-locked");
      };
      const onToggle = () => nav.classList.contains("is-open") ? close() : open();
      const onKey = (e) => { if (e.key === "Escape") close(); };
      const onResize = () => { if (window.innerWidth > 991) close(); };
      listen(toggle, "click", onToggle); listen(backdrop, "click", close);
      nav.querySelectorAll("a").forEach((a) => listen(a, "click", close));
      listen(document, "keydown", onKey); listen(window, "resize", onResize);
      cleanups.push(() => backdrop?.remove());
    }

    // Sticky header
    const header = document.querySelector("[data-header]");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader(); listen(window, "scroll", updateHeader, { passive: true });

    // Rating bars and counters. Scroll reveals are handled by useScrollReveal
    // so this effect does not open a second observer on .reveal.
    const ratingBars = document.querySelectorAll("[data-rating-bar]");
    const observe = (items, callback, threshold = 0.08) => {
      if (!items.length) return;
      if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(callback); return; }
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { callback(entry.target); observer.unobserve(entry.target); }
      }), { rootMargin: "0px 0px -8% 0px", threshold });
      items.forEach((item) => observer.observe(item));
      cleanups.push(() => observer.disconnect());
    };
    observe(ratingBars, (el) => { el.style.width = `${el.getAttribute("data-rating-bar")}%`; }, 0.3);

    // Animated counters
    observe(document.querySelectorAll("[data-count-to]"), (el) => {
      const raw = el.getAttribute("data-count-to") || "0";
      const target = Number.parseFloat(raw) || 0;
      const suffix = el.getAttribute("data-count-suffix") || "";
      const decimals = (raw.split(".")[1] || "").length;
      if (reduceMotion) { el.textContent = `${target.toFixed(decimals)}${suffix}`; return; }
      const startAt = performance.now();
      let frame;
      const tick = (now) => {
        const progress = Math.min((now - startAt) / 1600, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      cleanups.push(() => cancelAnimationFrame(frame));
    }, 0.4);

    // FAQ and syllabus accordions
    document.querySelectorAll("[data-accordion]").forEach((root) => {
      const items = [...root.querySelectorAll(".faq__item")];
      const single = root.getAttribute("data-accordion") !== "multi";
      const setOpen = (item, isOpen) => {
        const button = item.querySelector(".faq__q");
        const panel = item.querySelector(".faq__a");
        const inner = item.querySelector(".faq__a-inner");
        if (!button || !panel || !inner) return;
        item.classList.toggle("is-open", isOpen);
        button.setAttribute("aria-expanded", String(isOpen));
        panel.style.maxHeight = isOpen ? `${inner.scrollHeight}px` : "0px";
      };
      items.forEach((item) => {
        setOpen(item, item.classList.contains("is-open"));
        const button = item.querySelector(".faq__q");
        if (button) listen(button, "click", () => {
          const next = !item.classList.contains("is-open");
          if (single && next) items.filter((other) => other !== item).forEach((other) => setOpen(other, false));
          setOpen(item, next);
        });
      });
      listen(window, "resize", () => items.forEach((item) => {
        if (item.classList.contains("is-open")) setOpen(item, true);
      }));
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach((link) => listen(link, "click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id === "#main") return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.history.replaceState?.(null, "", id);
    }));

    // WhatsApp links
    document.querySelectorAll("a[data-wa]").forEach((link) => {
      const course = link.getAttribute("data-wa-course");
      const topic = link.getAttribute("data-wa-topic");
      link.href = getWhatsAppUrl({ course, topic });
      link.target = "_blank"; link.rel = "noopener noreferrer";
    });

    // Sliders
    document.querySelectorAll("[data-slider]").forEach((slider) => {
      const track = slider.querySelector("[data-slider-track]");
      const slides = [...(track?.children || [])];
      const prev = slider.querySelector("[data-slider-prev]");
      const next = slider.querySelector("[data-slider-next]");
      const dotsContainer = slider.querySelector("[data-slider-dots]");
      if (!track || !slides.length) return;

      let current = 0;
      const perView = Number(slider.getAttribute("data-per-view")) || 1;
      const autoplay = Number(slider.getAttribute("data-autoplay")) || 0;
      const total = Math.ceil(slides.length / perView);

      const update = () => {
        const gap = 28; // Matching CSS gap
        track.style.transform = `translateX(calc(-${current * 100}% - ${current * gap}px))`;
        dots?.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
        if (prev) prev.disabled = current === 0;
        if (next) next.disabled = current === total - 1;
      };

      const goTo = (index) => { current = index; update(); };

      let dots = [];
      if (dotsContainer) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < total; i++) {
          const dot = document.createElement("button");
          dot.type = "button"; dot.className = "slider__dot";
          dot.setAttribute("aria-label", `Go to slide group ${i + 1}`);
          listen(dot, "click", () => goTo(i));
          dotsContainer.appendChild(dot);
          dots.push(dot);
        }
      }

      if (prev) listen(prev, "click", () => { if (current > 0) { current--; update(); } });
      if (next) listen(next, "click", () => { if (current < total - 1) { current++; update(); } });

      let interval;
      if (autoplay && !reduceMotion) {
        const start = () => { interval = setInterval(() => { current = (current + 1) % total; update(); }, autoplay); };
        const stop = () => clearInterval(interval);
        start();
        listen(slider, "mouseenter", stop);
        listen(slider, "mouseleave", start);
        listen(slider, "focusin", stop);
        listen(slider, "focusout", start);
      }

      update();
    });

    // Footer year
    document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });

    // Back-to-top control
    let backTop = document.querySelector(".back-to-top");
    let createdBackTop = false;
    if (!backTop) {
      backTop = document.createElement("button"); createdBackTop = true;
      backTop.type = "button"; backTop.className = "back-to-top"; backTop.setAttribute("aria-label", "Back to top");
      backTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
      document.body.appendChild(backTop);
    }
    const updateBackTop = () => backTop.classList.toggle("is-visible", window.scrollY > 480);
    listen(window, "scroll", updateBackTop, { passive: true });
    listen(backTop, "click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
    updateBackTop();

    return () => { cleanups.forEach((cleanup) => cleanup()); if (createdBackTop) backTop.remove(); };
  }, [version]);
}

export { SITE };
