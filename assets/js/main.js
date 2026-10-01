/**
 * main.js
 * Entry point — loaded as type="module" in index.html.
 * All CDN libraries (gsap, ScrollTrigger, Lenis, THREE, Typed, emailjs)
 * must be loaded via <script> tags BEFORE this module.
 */

import { initClock }      from './clock.js';
import { initTyped }      from './typed-init.js';
import { initHero }       from './hero.js';
import { initCounters }   from './counter.js';
import { initProjects }   from './projects.js';
import { initContact }    from './contact.js';
import { initNav, setLenis } from './nav.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Register GSAP plugins (safe to call multiple times)
  gsap.registerPlugin(ScrollTrigger);

  // 2. Init Lenis smooth scroll
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  });

  // 3. Bridge Lenis → GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // 4. Pass lenis to nav (for scrollTo calls)
  setLenis(lenis);

  // 5. Init all modules
  initNav();
  initClock();
  initHero();
  initTyped();
  initCounters();
  initProjects();
  initContact();
  initAnimations();

  // 6. Progress bar on scroll (also handled in nav.js — this is the fallback)
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const bar       = document.getElementById('progress-bar');
      if (bar) bar.style.width = progress + '%';
    },
    { passive: true }
  );
});
