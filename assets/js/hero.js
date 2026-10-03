/**
 * hero.js
 * Falling stars / shooting stars canvas background.
 * Silver Surfer theme — deep black, bright silver streaks falling slowly downward.
 */

export function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W, H, stars, fallingStars, rafId;

  // ── Resize ────────────────────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  // ── Static twinkling star field ───────────────────────────────────────────
  function buildStars() {
    // More stars, brighter
    const count = Math.floor((W * H) / 3500);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.01 + 0.003,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Falling stars pool — more of them
    fallingStars = Array.from({ length: 10 }, () => createFallingStar(true));
  }

  // ── Create a falling star (vertical + slight diagonal) ────────────────────
  function createFallingStar(initial = false) {
    const angle = (Math.random() * 25 + 70) * (Math.PI / 180); // 70–95° = mostly straight down
    const speed = Math.random() * 1.5 + 0.8;                   // SLOW: 0.8–2.3 px/frame
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : -30,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: Math.random() * 160 + 80,           // longer tails
      alpha: 0,
      maxAlpha: Math.random() * 0.5 + 0.5,     // brighter: 0.5–1.0
      fadeIn: true,
      width: Math.random() * 1.5 + 0.6,        // thicker
      delay: initial
        ? Math.floor(Math.random() * 240)
        : Math.floor(Math.random() * 200 + 40),
      active: initial,
    };
  }

  // ── Draw one frame ────────────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Twinkling static stars — brighter whites/silvers
    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 0.9)  { s.alpha = 0.9;  s.twinkleDir = -1; }
      if (s.alpha <= 0.08) { s.alpha = 0.08; s.twinkleDir =  1; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 220, 240, ${s.alpha})`;
      ctx.fill();
    });

    // Falling stars — slow, bright, long tail
    fallingStars.forEach((fs, i) => {
      if (!fs.active) {
        fs.delay--;
        if (fs.delay <= 0) fs.active = true;
        return;
      }

      fs.x += fs.vx;
      fs.y += fs.vy;

      // Fade in quickly, fade out slowly
      if (fs.fadeIn) {
        fs.alpha = Math.min(fs.alpha + 0.06, fs.maxAlpha);
        if (fs.alpha >= fs.maxAlpha) fs.fadeIn = false;
      } else {
        fs.alpha = Math.max(fs.alpha - 0.012, 0); // slow fade
      }

      if (fs.alpha > 0) {
        // Tail direction (opposite of travel)
        const tailX = fs.x - fs.vx / speed(fs) * fs.len;
        const tailY = fs.y - fs.vy / speed(fs) * fs.len;

        // Bright gradient: transparent tail → bright white tip
        const grad = ctx.createLinearGradient(tailX, tailY, fs.x, fs.y);
        grad.addColorStop(0,   `rgba(200, 210, 255, 0)`);
        grad.addColorStop(0.5, `rgba(210, 215, 255, ${fs.alpha * 0.4})`);
        grad.addColorStop(0.85,`rgba(230, 235, 255, ${fs.alpha * 0.8})`);
        grad.addColorStop(1,   `rgba(255, 255, 255, ${fs.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(fs.x, fs.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = fs.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing bright tip
        const glow = ctx.createRadialGradient(fs.x, fs.y, 0, fs.x, fs.y, fs.width * 4);
        glow.addColorStop(0, `rgba(255, 255, 255, ${fs.alpha})`);
        glow.addColorStop(0.4, `rgba(200, 210, 255, ${fs.alpha * 0.5})`);
        glow.addColorStop(1, `rgba(180, 190, 255, 0)`);
        ctx.beginPath();
        ctx.arc(fs.x, fs.y, fs.width * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Recycle when off screen or fully faded
      if (fs.y > H + 50 || fs.x > W + 50 || fs.alpha <= 0) {
        fallingStars[i] = createFallingStar(false);
      }
    });
  }

  // Helper: get speed magnitude
  function speed(fs) {
    return Math.sqrt(fs.vx * fs.vx + fs.vy * fs.vy) || 1;
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
    stars.forEach(s => { s.alpha = 0.4; });
    draw();
    return;
  }

  loop();

  window.addEventListener('unload', () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
  });
}
