// ===== LOADER =====
(function(){
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const count = document.getElementById('loaderCount');
  let progress = 0;
  const duration = 1800;
  const start = performance.now();

  function tick(now){
    const elapsed = now - start;
    progress = Math.min(100, (elapsed / duration) * 100);
    bar.style.width = progress + '%';
    count.textContent = String(Math.floor(progress)).padStart(2, '0');
    if (progress < 100){
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => {
        loader.classList.add('is-hidden');
        document.body.classList.add('is-loaded');
      }, 300);
    }
  }
  window.addEventListener('load', () => requestAnimationFrame(tick));
  // fallback
  setTimeout(() => { if (!document.body.classList.contains('is-loaded')) { loader.classList.add('is-hidden'); document.body.classList.add('is-loaded'); } }, 4000);
})();

// ===== HEADER SCROLL =====
(function(){
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== MOBILE MENU =====
(function(){
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  if (!burger) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    menu.classList.toggle('is-open');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
  }));
})();

// ===== REVEAL ON SCROLL =====
(function(){
  const items = document.querySelectorAll('.reveal, .reveal-up');
  if (!('IntersectionObserver' in window)){
    items.forEach(i => i.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting){
        const target = entry.target;
        // stagger siblings
        const parent = target.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal-up') || c.classList.contains('reveal')) : [];
        const i = siblings.indexOf(target);
        target.style.transitionDelay = (Math.max(i,0) * 80) + 'ms';
        target.classList.add('is-in');
        io.unobserve(target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(i => io.observe(i));
})();


// ===== SMOOTH ANCHOR (offset for header) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1){
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});
