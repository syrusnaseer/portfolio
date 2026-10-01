/**
 * nav.js
 * Navigation: scroll spy, progress bar, hamburger, smooth scroll-to, back-to-top.
 * gsap is a CDN global. Lenis instance is injected via setLenis().
 */

let _lenis = null;

/** Called by main.js after Lenis is created. */
export function setLenis(lenis) {
  _lenis = lenis;
}

export function initNav() {
  initScrollBehaviour();
  initProgressBar();
  initBackToTop();
  initHamburger();
  initSmoothLinks();
  initScrollSpy();
}

// ── Scroll class on navbar ────────────────────────────────────────────────────

function initScrollBehaviour() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }, { passive: true });
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = progress + '%';
  }, { passive: true });
}

// ── Back to top ───────────────────────────────────────────────────────────────

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    if (_lenis) {
      _lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// ── Hamburger menu ────────────────────────────────────────────────────────────

function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const overlay   = document.querySelector('.nav-overlay');
  if (!hamburger || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // GSAP stagger animate overlay links
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        '.nav-overlay-link',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out' }
      );
    }
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on overlay link click
  overlay.querySelectorAll('.nav-overlay-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      closeMenu();

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && _lenis) {
          _lenis.scrollTo(target, { duration: 1.4, easing: easeInOutCubic });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

// ── Smooth nav link clicks ────────────────────────────────────────────────────

function initSmoothLinks() {
  // All anchor links that point to a hash, excluding overlay links (handled above)
  document.querySelectorAll('a[href^="#"]:not(.nav-overlay-link)').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      if (_lenis) {
        _lenis.scrollTo(target, { duration: 1.4, easing: easeInOutCubic });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ── Scroll spy ────────────────────────────────────────────────────────────────

function initScrollSpy() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ── Easing helper ─────────────────────────────────────────────────────────────

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
