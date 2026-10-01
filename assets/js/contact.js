/**
 * contact.js
 * EmailJS form submission + floating label behaviour.
 *
 * EMAILJS SETUP — replace these with your own credentials:
 *   1. Go to https://www.emailjs.com/ and create a free account
 *   2. Add an Email Service (Gmail recommended) → copy the Service ID
 *   3. Create an Email Template with variables {{from_name}}, {{reply_to}},
 *      {{subject}}, {{message}} → copy the Template ID
 *   4. Go to Account → API Keys → copy the Public Key
 *   Replace the three constants below:
 */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

export function initContact() {
  if (typeof emailjs === 'undefined') {
    console.warn('contact.js: EmailJS not loaded');
    return;
  }

  emailjs.init(EMAILJS_PUBLIC_KEY);

  initForm();
  initFloatingLabels();
}

// ── Form submission ───────────────────────────────────────────────────────────

function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const statusEl  = form.querySelector('.form-status');

    // Loading state
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      const originalText = submitBtn.dataset.label || submitBtn.textContent;
      submitBtn.dataset.label = originalText;
      submitBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span><span class="sr-only">Sending…</span>`;
    }

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, '#contact-form');

      // Success
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.dataset.label || 'Send Message';
      }

      if (statusEl) {
        statusEl.textContent = "Message sent! I'll get back to you soon.";
        statusEl.className = 'form-status success';
      }

      form.reset();
      // Clear floating-label state after reset
      form.querySelectorAll('input, textarea').forEach((el) => el.classList.remove('filled'));
    } catch (err) {
      console.error('EmailJS error:', err);

      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.dataset.label || 'Send Message';
      }

      if (statusEl) {
        statusEl.textContent = 'Something went wrong. Please email me directly.';
        statusEl.className = 'form-status error';
      }
    }
  });
}

// ── Validation ────────────────────────────────────────────────────────────────

function validateForm(form) {
  let valid = true;

  const nameEl    = form.querySelector('[name="from_name"], #contact-name');
  const emailEl   = form.querySelector('[name="reply_to"], #contact-email');
  const messageEl = form.querySelector('[name="message"], #contact-message');

  clearErrors(form);

  if (nameEl && !nameEl.value.trim()) {
    showError(nameEl, 'Name is required.');
    valid = false;
  }

  if (emailEl) {
    if (!emailEl.value.trim()) {
      showError(emailEl, 'Email is required.');
      valid = false;
    } else if (!isValidEmail(emailEl.value.trim())) {
      showError(emailEl, 'Please enter a valid email address.');
      valid = false;
    }
  }

  if (messageEl && !messageEl.value.trim()) {
    showError(messageEl, 'Message is required.');
    valid = false;
  }

  return valid;
}

function showError(field, message) {
  field.classList.add('invalid');

  let errorEl = field.parentElement.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    field.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function clearErrors(form) {
  form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
  form.querySelectorAll('.form-error').forEach((el) => {
    el.textContent = '';
    el.classList.remove('visible');
  });

  const statusEl = form.querySelector('.form-status');
  if (statusEl) {
    statusEl.textContent = '';
    statusEl.className = 'form-status';
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ── Floating labels ───────────────────────────────────────────────────────────

function initFloatingLabels() {
  const fields = document.querySelectorAll('#contact-form input, #contact-form textarea');

  fields.forEach((field) => {
    // Set initial state
    updateFilled(field);

    field.addEventListener('focus',  () => updateFilled(field));
    field.addEventListener('blur',   () => updateFilled(field));
    field.addEventListener('input',  () => updateFilled(field));
  });
}

function updateFilled(field) {
  if (field.value.trim().length > 0) {
    field.classList.add('filled');
  } else {
    field.classList.remove('filled');
  }
}
