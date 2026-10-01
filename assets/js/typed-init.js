/**
 * typed-init.js
 * Initialises Typed.js on #typed-text.
 * Typed.js is loaded as a CDN global (window.Typed).
 */

export function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typed-text', {
    strings: [
      'Full-Stack Developer',
      'AI/ML Engineer',
      'Game Developer',
      'IoT Engineer',
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    // aria-label is already set statically in HTML — don't override it here
  });
}
