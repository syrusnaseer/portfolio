/**
 * counter.js
 * Animates .stat-number elements from 0 → data-target using GSAP + ScrollTrigger.
 * gsap and ScrollTrigger are CDN globals.
 */

export function initCounters() {
  // Safe to register multiple times
  gsap.registerPlugin(ScrollTrigger);

  const els = document.querySelectorAll('.stat-number');
  if (!els.length) return;

  els.forEach((el) => {
    const target = parseFloat(el.dataset.target);
    if (isNaN(target)) return;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = el.dataset.suffix
          ? Math.round(obj.val) + el.dataset.suffix
          : Math.round(obj.val);
      },
      scrollTrigger: {
        trigger: '#stats',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}
