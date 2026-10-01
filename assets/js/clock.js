/**
 * clock.js
 * Displays a live 24-hour clock in #hero-clock.
 */

export function initClock() {
  const el = document.getElementById('hero-clock');
  if (!el) return;

  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `Local time: ${hh}:${mm}:${ss}`;
  }

  tick(); // run immediately so there's no 1-second blank
  setInterval(tick, 1000);
}
