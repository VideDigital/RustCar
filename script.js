(() => {
  const config = window.RUST_CAR_CONFIG || {};

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const normalizeWhatsapp = (number) => String(number || '').replace(/\D/g, '');
  const whatsappNumber = normalizeWhatsapp(config.whatsappNumber);
  const whatsappMessage = encodeURIComponent(config.whatsappMessage || 'Olá! Vim pelo site da Rust Car.');
  const contactLinks = document.querySelectorAll('.js-contact-link');
  const contactWarning = document.getElementById('contact-warning');

  contactLinks.forEach((link) => {
    if (whatsappNumber) {
      link.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#contato';
      link.addEventListener('click', () => {
        if (contactWarning) {
          contactWarning.hidden = false;
          contactWarning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  });

  const editorNotes = document.querySelectorAll('.editor-note, .visual-note, .config-warning');
  if (config.previewMode === false) {
    editorNotes.forEach((element) => element.remove());
  }

  const track = (eventName, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, params);
    }
  };

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      track(element.dataset.track, {
        link_text: element.textContent.trim(),
        link_url: element.href || ''
      });
    });
  });

  // Evento específico para clique em WhatsApp, quando configurado.
  contactLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (whatsappNumber) track('whatsapp_click', { placement: link.dataset.track || 'unknown' });
    });
  });

  // Intersection Observer para animações leves.
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }
})();
