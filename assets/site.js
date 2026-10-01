(() => {
  const btn=document.querySelector('.mobile-toggle');
  const nav=document.querySelector('.nav');
  if(btn&&nav){
    btn.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      document.body.classList.toggle('menu-open',open);
      btn.setAttribute('aria-expanded',String(open));
    });
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();