/**
 * hero.js
 * Falling stars / shooting stars canvas background.
 * Silver Surfer theme — deep black, silver streaks.
 * Uses plain Canvas 2D API (no Three.js dependency needed).
 */

export function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W, H, stars, shootingStars, rafId;

  // ── Resize ────────────────────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  // ── Static star field ─────────────────────────────────────────────────────
  function buildStars() {
    const count = Math.floor((W * H) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Shooting stars pool
    shootingStars = Array.from({ length: 6 }, () => createShootingStar(true));
  }

  function createShootingStar(initial = false) {
    const angle = (Math.random() * 20 + 15) * (Math.PI / 180); // 15–35 deg
    const speed = Math.random() * 6 + 4;
    return {
      x: Math.random() * W * 1.5 - W * 0.25,
      y: initial ? Math.random() * H : -20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: Math.random() * 120 + 60,
      alpha: 0,
      maxAlpha: Math.random() * 0.6 + 0.3,
      fadeIn: true,
      width: Math.random() * 1.2 + 0.4,
      // delay before this star activates
      delay: initial ? Math.floor(Math.random() * 200) : Math.floor(Math.random() * 300 + 60),
      active: initial,
    };
  }

  // ── Draw ──────────────────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Twinkle static stars
    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 0.65) { s.alpha = 0.65; s.twinkleDir = -1; }
      if (s.alpha <= 0.05) { s.alpha = 0.05; s.twinkleDir =  1; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 200, 220, ${s.alpha})`;
      ctx.fill();
    });

    // Shooting stars
    shootingStars.forEach((ss, i) => {
      if (!ss.active) {
        ss.delay--;
        if (ss.delay <= 0) ss.active = true;
        return;
      }

      // Move
      ss.x += ss.vx;
      ss.y += ss.vy;

      // Fade in then fade out
      if (ss.fadeIn) {
        ss.alpha = Math.min(ss.alpha + 0.04, ss.maxAlpha);
        if (ss.alpha >= ss.maxAlpha) ss.fadeIn = false;
      } else {
        ss.alpha = Math.max(ss.alpha - 0.025, 0);
      }

      // Draw streak
      if (ss.alpha > 0) {
        const tailX = ss.x - Math.cos((15 * Math.PI) / 180) * ss.len;
        const tailY = ss.y - Math.sin((15 * Math.PI) / 180) * ss.len;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(180, 180, 210, 0)`);
        grad.addColorStop(0.7, `rgba(200, 200, 230, ${ss.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(230, 230, 255, ${ss.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright tip glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 255, ${ss.alpha})`;
        ctx.fill();
      }

      // Recycle when off screen or faded out
      if (ss.x > W + 100 || ss.y > H + 100 || ss.alpha <= 0) {
        shootingStars[i] = createShootingStar(false);
      }
    });
  }

  // ── Loop ──────────────────────────────────────────────────────────────────
  function loop() {
    draw();
    rafId = requestAnimationFrame(loop);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  resize();
  window.addEventListener('resize', resize);

  if (reducedMotion) {
    // Just draw static stars, no animation
    stars.forEach(s => { s.alpha = 0.3; });
    draw();
    return;
  }

  loop();

  // Cleanup on page unload
  window.addEventListener('unload', () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
  });
}
