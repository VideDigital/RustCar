(() => {
  // ============================================================
  // CONFIGURAÇÃO RÁPIDA
  // Quando você tiver o WhatsApp oficial, coloque somente números:
  // Exemplo: 5511999999999
  // ============================================================
  const WHATSAPP_NUMBER = "";
  const WHATSAPP_MESSAGE = "Olá! Vim pelo site da Rust Car e gostaria de solicitar uma avaliação do meu veículo.";
  const INSTAGRAM_URL = "https://www.instagram.com/_rustcar/";

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  const contactLinks = document.querySelectorAll('.js-contact');
  const year = document.getElementById('current-year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Header com fundo ao rolar.
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Menu mobile.
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // CTA: usa WhatsApp quando o número estiver configurado.
  const whatsapp = String(WHATSAPP_NUMBER).replace(/\D/g, '');
  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : INSTAGRAM_URL;

  contactLinks.forEach((link) => {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    if (whatsapp) {
      if (/instagram/i.test(link.textContent)) {
        link.textContent = 'Falar no WhatsApp';
      }
    } else if (/solicitar avaliação/i.test(link.textContent)) {
      link.textContent = 'Falar com a Rust Car';
    }
  });

  // Animações leves na rolagem.
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  // Fallback visual caso alguma foto externa falhe.
  const fallbackSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#1a1a1a"/>
          <stop offset="1" stop-color="#050505"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#g)"/>
      <path d="M300 650c90-25 170-75 240-155l110-128c44-51 105-78 172-78h210c72 0 136 23 191 67l119 96v164H300v34Z" fill="#111"/>
      <path d="M627 385h300c46 0 87 15 121 45l70 61H506l74-74c16-17 30-25 47-32Z" fill="#171717"/>
      <path d="M585 504h189c20 0 29 23 16 38l-37 39c-9 10-21 15-34 15H531c-16 0-25-19-15-31l37-44c9-11 18-17 32-17Z" fill="#eee"/>
      <circle cx="520" cy="676" r="92" fill="#080808"/>
      <circle cx="1080" cy="676" r="92" fill="#080808"/>
      <circle cx="520" cy="676" r="47" fill="#202020" stroke="#646464"/>
      <circle cx="1080" cy="676" r="47" fill="#202020" stroke="#646464"/>
    </svg>`;

  const fallbackUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(fallbackSvg)}`;

  document.querySelectorAll('.js-external-image').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied === 'true') return;
      img.dataset.fallbackApplied = 'true';
      img.src = fallbackUrl;
      img.classList.add('image-fallback');
    });
  });
})();
