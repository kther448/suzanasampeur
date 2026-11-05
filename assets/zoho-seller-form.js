(() => {
  'use strict';
  const permalink = 'f_lCe5B91bJ9VsQ2d0Mu-vVjy0ZDtWCHq_ITEyLDWDs';
  const holder = document.getElementById('zf_div_' + permalink);
  if (!holder || holder.querySelector('iframe')) return;
  const src = new URL('https://forms.zohopublic.com/infosampeu1/form/SellerConsultationForm/formperma/f_lCe5B91bJ9VsQ2d0Mu-vVjy0ZDtWCHq_ITEyLDWDs');
  src.searchParams.set('zf_rszfm', '1');
  let referrer = window.location.href;
  if (referrer.length > 1800) referrer = window.location.origin + window.location.pathname;
  src.searchParams.set('referrername', referrer);
  const iframe = document.createElement('iframe');
  iframe.src = src.href;
  iframe.title = 'Seller Consultation Form - Sampeur Realty';
  iframe.setAttribute('loading', 'eager');
  iframe.style.cssText = 'width:100%;height:1462px;border:0;display:block;transition:height .3s ease';
  holder.appendChild(iframe);
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://forms.zohopublic.com' ||
        event.source !== iframe.contentWindow ||
        typeof event.data !== 'string') return;
    const parts = event.data.split('|');
    if ((parts.length !== 2 && parts.length !== 3) || parts[0] !== permalink) return;
    const height = Number.parseInt(parts[1], 10);
    if (!Number.isFinite(height) || height < 150 || height > 30000) return;
    iframe.style.height = (height + 15) + 'px';
    if (parts.length === 3) holder.scrollIntoView({block:'start',behavior:'smooth'});
  }, false);
})();
