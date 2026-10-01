/**
 * animations.js
 * All GSAP ScrollTrigger animations for the portfolio.
 * gsap and ScrollTrigger are CDN globals.
 */

export function initAnimations() {
  // Honour user's motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  heroEntrance();
  statsAnimations();
  aboutAnimations();
  skillsAnimations();
  projectsAnimations();
  contactAnimations();
  sectionHeadings();
  footerAnimation();
}

// ── 1. Hero entrance (runs immediately — no ScrollTrigger) ────────────────────

function heroEntrance() {
  // Name reveal — clip-path wipe from bottom
  gsap.fromTo('.hero-name-inner',
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out', delay: 0.2 }
  );

  // Subtitle, bio, cta, social stagger
  gsap.from(
    ['.hero-greeting', '.hero-typewriter', '.hero-bio', '.hero-cta', '.hero-social'],
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      delay: 0.6,
    }
  );

  // Corner metadata
  gsap.from(
    ['.hero-meta-tl', '.hero-meta-tr', '.hero-meta-bl', '.hero-meta-br'],
    {
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.4,
    }
  );

  // Availability badge
  gsap.from('.hero-badge', {
    opacity: 0,
    y: -10,
    duration: 0.6,
    delay: 0.1,
  });
}

// ── 2. Stats ──────────────────────────────────────────────────────────────────

function statsAnimations() {
  gsap.from('.stat-item', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '#stats',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

// ── 3. About ──────────────────────────────────────────────────────────────────

function aboutAnimations() {
  gsap.from('.about-text', {
    x: -40,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
    },
  });

  // Timeline items stagger (::before pseudo can't be targeted directly by GSAP)
  gsap.from('.timeline-item', {
    opacity: 0,
    x: 20,
    duration: 0.6,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
    },
  });
}

// ── 4. Skills ─────────────────────────────────────────────────────────────────

function skillsAnimations() {
  gsap.from('.skill-label', {
    x: -40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 75%',
    },
  });

  gsap.from('.chip', {
    opacity: 0,
    y: 10,
    duration: 0.4,
    stagger: { each: 0.05, from: 'start' },
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 65%',
    },
  });
}

// ── 5. Projects ───────────────────────────────────────────────────────────────

function projectsAnimations() {
  // Title parallax scrub
  gsap.from('.section-title.projects-title', {
    x: '15vw',
    duration: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top bottom',
      end: 'top 30%',
      scrub: 1,
    },
  });

  // Cards fade up
  gsap.from('.project-card', {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.7,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 85%',
    },
  });
}

// ── 6. Contact ────────────────────────────────────────────────────────────────

function contactAnimations() {
  gsap.from('.contact-grid > *', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
    },
  });

  gsap.from('#contact .section-title', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 85%',
    },
  });
}

// ── 7. Universal section headings ─────────────────────────────────────────────

function sectionHeadings() {
  gsap.utils.toArray('.section-title').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });
}

// ── 8. Footer ─────────────────────────────────────────────────────────────────

function footerAnimation() {
  gsap.from('#footer', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    scrollTrigger: {
      trigger: '#footer',
      start: 'top 95%',
    },
  });
}
