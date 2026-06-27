/* ============================================================
   LAURIER MULTI SERVICE — animations.js
   GSAP + ScrollTrigger + AOS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── AOS (scroll reveal) ──────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      delay: 0,
    });
  }

  /* ── GSAP setup ───────────────────────────────────────────── */
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Hero timeline (runs on index.html) ───────────────────── */
  const heroBadge    = document.querySelector('.hero-badge');
  const heroTitle    = document.querySelector('.hero-title');
  const heroSub      = document.querySelector('.hero-sub');
  const heroFeatures = document.querySelector('.hero-features');
  const heroBtns     = document.querySelector('.hero-btns');
  const heroCards    = document.querySelectorAll('.hero-card');

  if (heroBadge) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

    tl.from(heroBadge,    { opacity: 0, y: 18, duration: 0.6 })
      .from(heroTitle,    { opacity: 0, y: 28, duration: 0.7 }, '-=0.35')
      .from(heroSub,      { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from(heroFeatures?.children ? Array.from(heroFeatures.children) : [],
                          { opacity: 0, y: 14, stagger: 0.08, duration: 0.45 }, '-=0.35')
      .from(heroBtns?.children ? Array.from(heroBtns.children) : [],
                          { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.45 }, '-=0.3')
      .from(heroCards,    { opacity: 0, y: 36, stagger: 0.12, duration: 0.6 }, '-=0.5');
  }

  /* ── Page hero (inner pages) ──────────────────────────────── */
  const pageHero = document.querySelector('.page-hero');
  if (pageHero && !heroBadge) {
    gsap.from(pageHero.children, {
      opacity: 0, y: 24, stagger: 0.12, duration: 0.7,
      ease: 'power3.out', delay: 0.2,
    });
  }

  /* ── Counters ─────────────────────────────────────────────── */
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = !Number.isInteger(target);

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function () {
              const v = this.targets()[0].val;
              el.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suffix;
            },
          });
        },
      });
    }
  });

  /* ── Parallax on hero background ─────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && typeof ScrollTrigger !== 'undefined') {
    gsap.to(heroBg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* ── Section titles stagger ───────────────────────────────── */
  if (typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.section-header').forEach(header => {
      const children = header.querySelectorAll('.section-label, .section-title, .section-sub');
      gsap.from(children, {
        opacity: 0, y: 22, stagger: 0.12, duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: header, start: 'top 80%', once: true },
      });
    });

    /* ── Why cards stagger ──────────────────────────────────── */
    const whyCards = document.querySelectorAll('.why-card');
    if (whyCards.length) {
      gsap.from(whyCards, {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 78%', once: true },
      });
    }

    /* ── Service cards stagger ──────────────────────────────── */
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        opacity: 0, y: 36, stagger: 0.12, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 78%', once: true },
      });
    }

    /* ── Process steps ──────────────────────────────────────── */
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length) {
      gsap.from(processSteps, {
        opacity: 0, y: 28, stagger: 0.14, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-grid', start: 'top 78%', once: true },
      });
    }

    /* ── Testimonials ───────────────────────────────────────── */
    const testiCards = document.querySelectorAll('.testi-card');
    if (testiCards.length) {
      gsap.from(testiCards, {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.testi-grid', start: 'top 78%', once: true },
      });
    }

    /* ── CTA banner ─────────────────────────────────────────── */
    const ctaInner = document.querySelector('.cta-inner');
    if (ctaInner) {
      gsap.from(ctaInner, {
        opacity: 0, scale: 0.96, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ctaInner, start: 'top 80%', once: true },
      });
    }
  }

});
