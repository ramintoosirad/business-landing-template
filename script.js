/* Northlane Clinic — landing page interactions (vanilla JS, no dependencies) */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Mobile navigation
  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    menu.classList.toggle('open', !open);
  });
  $$('a', menu).forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }));

  // Reveal on scroll + animated counters
  const animateCount = el => {
    const target = parseFloat(el.dataset.count);
    const decimals = String(el.dataset.count).includes('.') ? 1 : 0;
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 1200;
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      $$('[data-count]', entry.target).forEach(animateCount);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));

  // Testimonial slider
  const slider = $('[data-slider]');
  if (slider) {
    const track = $('.slides', slider);
    const slides = $$('.slide', slider);
    const dotsWrap = $('.dots', slider);
    let index = 0;
    let timer;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Show review ${i + 1}`);
      b.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(b);
      return b;
    });

    const go = (i, user = false) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, n) => d.setAttribute('aria-selected', String(n === index)));
      if (user) restart();
    };
    const restart = () => {
      clearInterval(timer);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = setInterval(() => go(index + 1), 6000);
      }
    };

    $('[data-prev]', slider).addEventListener('click', () => go(index - 1, true));
    $('[data-next]', slider).addEventListener('click', () => go(index + 1, true));
    go(0);
    restart();
  }

  // Pricing toggle
  $$('.toggle button').forEach(btn => btn.addEventListener('click', () => {
    $$('.toggle button').forEach(b => b.classList.toggle('active', b === btn));
    const plan = btn.dataset.plan;
    $$('.price span').forEach(span => { span.textContent = span.dataset[plan]; });
  }));

  // Booking form validation
  const form = $('.book-form');
  const dateInput = $('#date');
  dateInput.min = new Date().toISOString().split('T')[0];

  const rules = {
    name: v => v.trim().length >= 2 || 'Please enter your full name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
    service: v => v !== '' || 'Please choose a service.',
    date: v => (v && v >= dateInput.min) || 'Please choose a date from today onwards.'
  };

  const validate = field => {
    const result = rules[field.name](field.value);
    const wrap = field.closest('.field');
    const msg = result === true ? '' : result;
    wrap.classList.toggle('invalid', !!msg);
    field.setAttribute('aria-invalid', String(!!msg));
    $('.error', wrap).textContent = msg;
    return !msg;
  };

  $$('input, select', form).forEach(f => f.addEventListener('blur', () => validate(f)));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = $$('input, select', form);
    const ok = fields.map(validate).every(Boolean);
    if (!ok) {
      fields.find(f => f.getAttribute('aria-invalid') === 'true').focus();
      return;
    }
    // Replace with a fetch() call to your backend, Formspree, or email service.
    form.reset();
    const success = $('.form-success', form);
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 6000);
  });

  // Footer year
  $('#year').textContent = new Date().getFullYear();
})();
