/**
 * hero.js
 * Three.js wireframe icosphere in the hero canvas.
 * THREE is a CDN global (window.THREE).
 */

export function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // ── Renderer ──────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const parent = canvas.parentElement;
  const w = parent ? parent.clientWidth : window.innerWidth;
  const h = parent ? parent.clientHeight : window.innerHeight;
  renderer.setSize(w, h);

  // ── Scene ─────────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.background = null; // transparent — CSS body bg shows through

  // ── Camera ────────────────────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.z = 5;

  // ── Geometry / Material / Mesh ────────────────────────────────────────────
  const geometry = new THREE.IcosahedronGeometry(2.2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x2a2a2a,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = 0.3;
  scene.add(mesh);

  // ── Resize handler ────────────────────────────────────────────────────────
  function onResize() {
    const pw = parent ? parent.clientWidth : window.innerWidth;
    const ph = parent ? parent.clientHeight : window.innerHeight;
    camera.aspect = pw / ph;
    camera.updateProjectionMatrix();
    renderer.setSize(pw, ph);
  }
  window.addEventListener('resize', onResize);

  // ── Animation loop ────────────────────────────────────────────────────────
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    // Render a single static frame and stop
    renderer.render(scene, camera);
    return;
  }

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();
}
