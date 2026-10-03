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
  experienceAnimations();
  projectsAnimations();
  contactAnimations();
  sectionHeadings();
  footerAnimation();
}

// ── 1. Hero entrance (runs immediately — no ScrollTrigger) ────────────────────

function heroEntrance() {
  // Photo slides in from left
  gsap.fromTo('.hero-photo-col',
    { x: -60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
  );

  // Rings fade in after photo
  gsap.fromTo('.hero-photo-ring',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power2.out', delay: 0.6 }
  );

  // Corners pop in
  gsap.fromTo('.hero-photo-corner',
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)', delay: 1 }
  );

  // Badge fades in
  gsap.fromTo('.hero-badge',
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 }
  );

  // Name wipe up
  gsap.fromTo('.hero-name-inner',
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out', delay: 0.5 }
  );

  // Text stack stagger
  gsap.fromTo(
    ['.hero-greeting', '.hero-typewriter', '.hero-bio', '.hero-cta', '.hero-social'],
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1, delay: 0.7 }
  );

  // Corner metadata
  gsap.fromTo(
    ['.hero-meta-tl', '.hero-meta-tr', '.hero-meta-bl', '.hero-meta-br'],
    { opacity: 0 },
    { opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5 }
  );
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
  // Section prefix number slides up
  gsap.fromTo('#about .section-prefix',
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#about', start: 'top 80%' },
    }
  );

  // Heading clip-path wipe up — matches project heading style
  gsap.fromTo('#about .section-title',
    { clipPath: 'inset(100% 0 0 0)', y: 20 },
    {
      clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.9, ease: 'power4.out',
      scrollTrigger: { trigger: '#about', start: 'top 78%' },
    }
  );

  gsap.fromTo('.about-text',
    { x: -40, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#about', start: 'top 72%' },
    }
  );

  gsap.fromTo('.timeline-item',
    { opacity: 0, x: 20 },
    {
      opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
    }
  );
}

// ── 4. Skills ─────────────────────────────────────────────────────────────────

function skillsAnimations() {
  // Section prefix
  gsap.fromTo('#skills .section-prefix',
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#skills', start: 'top 80%' },
    }
  );

  // Heading clip-path wipe up
  gsap.fromTo('#skills .section-title',
    { clipPath: 'inset(100% 0 0 0)', y: 20 },
    {
      clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.9, ease: 'power4.out',
      scrollTrigger: { trigger: '#skills', start: 'top 78%' },
    }
  );

  gsap.fromTo('.skill-label',
    { x: -40, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '#skills', start: 'top 72%' },
    }
  );

  gsap.fromTo('.chip',
    { opacity: 0, y: 12 },
    {
      opacity: 1, y: 0, duration: 0.4, stagger: { each: 0.05, from: 'start' }, ease: 'power2.out',
      scrollTrigger: { trigger: '#skills', start: 'top 65%' },
    }
  );
}

// ── 5. Projects ───────────────────────────────────────────────────────────────

function experienceAnimations() {
  gsap.fromTo('#experience .section-prefix',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#experience', start: 'top 80%' } }
  );
  gsap.fromTo('#experience .section-title',
    { clipPath: 'inset(100% 0 0 0)', y: 20 },
    { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.9, ease: 'power4.out',
      scrollTrigger: { trigger: '#experience', start: 'top 78%' } }
  );
  gsap.fromTo('.exp-card',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.experience-grid', start: 'top 82%' } }
  );
  gsap.fromTo('.exp-chip',
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out',
      scrollTrigger: { trigger: '.exp-tech', start: 'top 88%' } }
  );
}

function projectsAnimations() {
  // Section prefix
  gsap.fromTo('#projects .section-prefix',
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#projects', start: 'top 80%' },
    }
  );

  // Heading clip-path wipe — scrubs in as section enters
  gsap.fromTo('#projects .section-title',
    { clipPath: 'inset(100% 0 0 0)', x: '8vw' },
    {
      clipPath: 'inset(0% 0 0 0)', x: 0, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: '#projects', start: 'top 78%' },
    }
  );

  // Filter pills
  gsap.fromTo('.filter-btn',
    { opacity: 0, y: 10 },
    {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: '.projects-filters', start: 'top 88%' },
    }
  );

  // Cards fade up
  gsap.fromTo('.project-card',
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
    }
  );
}

// ── 6. Contact ────────────────────────────────────────────────────────────────

function contactAnimations() {
  // Section prefix
  gsap.fromTo('#contact .section-prefix',
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '#contact', start: 'top 82%' },
    }
  );

  // Heading clip-path wipe up
  gsap.fromTo('#contact .section-title',
    { clipPath: 'inset(100% 0 0 0)', y: 20 },
    {
      clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.9, ease: 'power4.out',
      scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    }
  );

  // Contact info items — each one individually so icons never disappear
  gsap.fromTo('.contact-info-item',
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-info', start: 'top 85%' },
    }
  );

  // Form fields stagger up
  gsap.fromTo('.form-group',
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
    }
  );

  // Submit button
  gsap.fromTo('.btn-submit',
    { opacity: 0, y: 15 },
    {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 75%' },
    }
  );
}

// ── 7. Universal section headings ─────────────────────────────────────────────

function sectionHeadings() {
  // Already handled per-section above with clip-path reveals — skip to avoid double animation
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
