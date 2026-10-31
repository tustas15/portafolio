/* ==========================================================================
   CARLOS ROSALES — BLACK & PURPLE INTERACTIVE ENGINE (GSAP + EMAILJS)
   ========================================================================== */

const EMAILJS_CONFIG = {
  serviceId: "service_qnshzhb",
  templateId: "template_u968ytf",
  publicKey: "hiIzVHIhd8jLwfXzO",
};

document.addEventListener("DOMContentLoaded", () => {
  initFullscreenMenu();
  initHeroCardTilt();
  initFaqAccordion();
  initProjectFilters();
  initBackToTop();
  initEmailJSForm();
  initGSAPAnimations();
});

/* --------------------------------------------------------------------------
   1. FULLSCREEN MENU & SMOOTH ANCHOR SCROLL
   -------------------------------------------------------------------------- */
function initFullscreenMenu() {
  const menu = document.getElementById("fullscreen-menu");
  const openBtn = document.getElementById("menu-open-btn");
  const closeBtn = document.getElementById("menu-close-btn");
  const navLinks = document.querySelectorAll(".menu-nav-link, a[href^='#']");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu && menu.classList.contains("open")) {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }, 120);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. 3D INTERACTIVE TILT ON HERO DEVELOPER CARD
   -------------------------------------------------------------------------- */
function initHeroCardTilt() {
  const card = document.getElementById("hero-profile-card");
  if (!card || window.innerWidth < 1024) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-trigger");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      items.forEach((other) => other.classList.remove("active"));
      if (!isOpen) {
        item.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. FILTERABLE PROJECT ARCHIVE GRID
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  const cards = document.querySelectorAll(".project-grid-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => {
        b.classList.remove("bg-[#7e13f8]", "text-white", "border-[#7e13f8]");
        b.classList.add("bg-transparent", "text-gray-300", "border-white/20");
      });
      btn.classList.add("bg-[#7e13f8]", "text-white", "border-[#7e13f8]");
      btn.classList.remove("bg-transparent", "text-gray-300", "border-white/20");

      cards.forEach((card) => {
        const cardCat = card.getAttribute("data-category") || "";
        if (cat === "all" || cardCat.includes(cat)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      if (window.ScrollTrigger) {
        setTimeout(() => window.ScrollTrigger.refresh(), 100);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. BACK TO TOP FLOATING BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btnWrap = document.getElementById("back-to-top-wrap");
  const btn = document.getElementById("back-to-top-btn");
  if (!btnWrap || !btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btnWrap.classList.remove("opacity-0", "translate-y-12", "pointer-events-none");
      btnWrap.classList.add("opacity-100", "translate-y-0");
    } else {
      btnWrap.classList.add("opacity-0", "translate-y-12", "pointer-events-none");
      btnWrap.classList.remove("opacity-100", "translate-y-0");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   6. GSAP + SCROLLTRIGGER ANIMATIONS
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // A. Hero entrance
  gsap.fromTo(
    ".hero-line-inner",
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.12,
      delay: 0.1,
    }
  );

  gsap.fromTo(
    ".hero-fade-up",
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.35,
    }
  );

  // B. ScrollFloat Kinetic Typography
  document.querySelectorAll(".scroll-float").forEach((el) => {
    const rawText = el.getAttribute("data-text") || el.textContent.trim();
    el.innerHTML = "";
    const words = rawText.split(" ");
    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      word.split("").forEach((ch) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
      });
      el.appendChild(wordSpan);
      if (wIdx < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });

    const chars = el.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, yPercent: 95, scaleY: 1.2 },
      {
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        ease: "back.out(1.8)",
        stagger: 0.025,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 62%",
          scrub: true,
        },
      }
    );
  });

  // C. Sticky Split Expertise Section
  const expertiseSection = document.querySelector(".expertise-section");
  const expertiseHeader = document.querySelector(".expertise-header");
  const servicesList = document.querySelector(".services-list");

  if (expertiseSection && expertiseHeader && servicesList) {
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        ScrollTrigger.create({
          trigger: expertiseSection,
          start: "top top",
          endTrigger: servicesList,
          end: "bottom 80%",
          pin: expertiseHeader,
          pinSpacing: false,
        });
      },
    });
  }

  // Reveal cards on scroll
  gsap.utils.toArray(".reveal-card").forEach((card) => {
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
        },
      }
    );
  });

  // D. Pinned Horizontal Showcase for Featured Projects
  const horizPin = document.getElementById("proyectos-horizontal-pin");
  const horizTrack = document.getElementById("proyectos-horizontal-track");
  const progressBar = document.getElementById("proyectos-progress-bar");
  const counterNum = document.getElementById("proyectos-counter-num");

  if (horizPin && horizTrack) {
    const cards = horizTrack.querySelectorAll(".horiz-project-card");
    const total = cards.length;

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        const getScrollAmount = () =>
          -(horizTrack.scrollWidth - window.innerWidth + 120);

        gsap.to(horizTrack, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: horizPin,
            start: "top top",
            end: () => `+=${horizTrack.scrollWidth - window.innerWidth + 300}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressBar) {
                progressBar.style.width = `${Math.max(12, p * 100)}%`;
              }
              if (counterNum) {
                const idx = Math.min(total, Math.max(1, Math.ceil(p * total)));
                counterNum.textContent = `0${idx}`;
              }
            },
          },
        });
      },
    });
  }

  // E. Interactive Process Spine Progress Fill
  const processTimeline = document.getElementById("proceso-timeline");
  const processLineFill = document.getElementById("proceso-line-fill");

  if (processTimeline && processLineFill) {
    gsap.fromTo(
      processLineFill,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: processTimeline,
          start: "top 65%",
          end: "bottom 65%",
          scrub: true,
        },
      }
    );
  }
}

/* --------------------------------------------------------------------------
   7. EMAILJS CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initEmailJSForm() {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (!contactForm) return;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function resetErrors() {
    [nameError, emailError, messageError].forEach((el) => {
      if (el) {
        el.textContent = "";
        el.classList.add("hidden");
      }
    });
  }

  function showError(field, message) {
    const errorEl = document.getElementById(`${field}-error`);
    const inputEl = document.getElementById(field);
    if (errorEl && inputEl) {
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
      inputEl.focus();
    }
  }

  function validateForm() {
    resetErrors();
    let isValid = true;

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";
    const honeypot = document.getElementById("website")?.value || "";

    if (honeypot) return false;

    if (!name || name.length < 2) {
      showError("name", "Por favor, ingresa tu nombre completo (mín. 2 caracteres)");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError("email", "Por favor, ingresa un correo electrónico válido");
      isValid = false;
    }

    if (!message || message.length < 10) {
      showError("message", "El mensaje debe tener al menos 10 caracteres");
      isValid = false;
    }

    return isValid;
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>ENVIANDO MENSAJE...</span>`;

    if (formMessage) formMessage.classList.add("hidden");

    try {
      const templateParams = {
        from_name: document.getElementById("name").value.trim(),
        from_email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
        to_email: "santyrosales2003@gmail.com",
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      if (response.status === 200) {
        formMessage.className =
          "mt-6 p-4 border-2 border-[#7e13f8] bg-[#7e13f8]/20 text-purple-200 font-am text-sm";
        formMessage.innerHTML = `<strong>¡MENSAJE ENVIADO CON ÉXITO!</strong> Te responderé en breve a tu correo electrónico.`;
        formMessage.classList.remove("hidden");
        contactForm.reset();
      } else {
        throw new Error("Error en envío");
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      formMessage.className =
        "mt-6 p-4 border-2 border-red-500 bg-red-500/15 text-red-300 font-am text-sm";
      formMessage.innerHTML = `<strong>ERROR AL ENVIAR EL MENSAJE.</strong> También puedes escribirme directamente a <a href="mailto:santyrosales2003@gmail.com" class="underline">santyrosales2003@gmail.com</a>.`;
      formMessage.classList.remove("hidden");
    } finally {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }
  });
}
