/**
 * projects.js
 * Filter pills + project modal logic.
 * gsap is a CDN global.
 */

export function initProjects() {
  initFilterPills();
  initModal();
}

// ── Filter Pills ─────────────────────────────────────────────────────────────

function initFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.project-card');
  if (!pills.length || !cards.length) return;

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      // Update active pill
      pills.forEach((p) => p.classList.remove('selected'));
      pill.classList.add('selected');

      const filter = pill.dataset.filter; // e.g. 'all', 'web', 'ai', …

      cards.forEach((card) => {
        const category = card.dataset.category;
        const matches = filter === 'all' || category === filter;

        if (matches) {
          // Make visible first, then animate in
          card.style.display = 'block';
          gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 });
        } else {
          // Animate out, then hide
          gsap.to(card, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => {
              card.style.display = 'none';
            },
          });
        }
      });
    });
  });
}

// ── Modal ─────────────────────────────────────────────────────────────────────

let lastFocusedTrigger = null;

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  const panel = overlay.querySelector('.modal');
  const closeBtn = overlay.querySelector('.modal-close');

  if (!panel) return;

  // Open modal on any .view-details or [data-modal-trigger] inside a project card
  document.querySelectorAll('.project-card').forEach((card) => {
    const triggers = card.querySelectorAll('[data-modal-trigger], .view-details');

    const openHandler = (e) => {
      // Also allow clicking the card itself if it has the data attribute
      const triggerEl = e.currentTarget;
      lastFocusedTrigger = triggerEl;
      populateModal(overlay, card);
      openModal(overlay, panel);
    };

    if (triggers.length) {
      triggers.forEach((t) => t.addEventListener('click', openHandler));
    } else {
      // Fallback: the whole card is clickable
      card.addEventListener('click', openHandler);
    }
  });

  // Close on X button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(overlay, panel));
  }

  // Close on overlay background click (NOT panel click)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay, panel);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal(overlay, panel);
    }
  });

  // Trap focus inside modal while open
  overlay.addEventListener('keydown', trapFocus);
}

function populateModal(overlay, card) {
  const titleEl = overlay.querySelector('.modal-title');
  const tagEl = overlay.querySelector('.modal-tag');
  const bodyEl = overlay.querySelector('.modal-body');
  const chipsEl = overlay.querySelector('.modal-chips');
  const githubEl = overlay.querySelector('.modal-github');

  if (titleEl) titleEl.textContent = card.dataset.projectName || '';
  if (tagEl) tagEl.textContent = card.dataset.projectTag || '';
  if (bodyEl) bodyEl.textContent = card.dataset.projectDesc || '';

  if (chipsEl) {
    chipsEl.innerHTML = '';
    const chips = (card.dataset.projectChips || '').split(',').map((c) => c.trim()).filter(Boolean);
    chips.forEach((chip) => {
      const span = document.createElement('span');
      span.className = 'chip';
      span.textContent = chip;
      chipsEl.appendChild(span);
    });
  }

  if (githubEl) {
    const githubUrl = card.dataset.projectGithub;
    if (githubUrl) {
      githubEl.href = githubUrl;
      githubEl.style.display = '';
    } else {
      githubEl.style.display = 'none';
    }
  }
}

function openModal(overlay, panel) {
  overlay.classList.add('open');

  // Scale-in animation
  gsap.fromTo(
    panel,
    { scale: 0.92, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
  );

  // Move focus to the panel for accessibility
  panel.setAttribute('tabindex', '-1');
  panel.focus();
}

function closeModal(overlay, panel) {
  gsap.to(panel, {
    scale: 0.92,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      overlay.classList.remove('open');
      // Restore focus to the element that triggered the modal
      if (lastFocusedTrigger) {
        lastFocusedTrigger.focus();
        lastFocusedTrigger = null;
      }
    },
  });
}

function trapFocus(e) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay || !overlay.classList.contains('open')) return;

  const focusable = overlay.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}
