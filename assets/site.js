(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 42);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      header?.classList.toggle('force-light', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        header?.classList.remove('force-light');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...document.querySelectorAll('.reveal')];
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    items.forEach((el) => observer.observe(el));
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();