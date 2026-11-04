(()=>{
  const p=location.pathname;
  const lang=p.includes('/fr/')?'fr':p.includes('/ht/')?'ht':'en';
  const current=p.split('/').pop()||'index.html';
  const logoSrc=(lang==='en'?'assets/':'../assets/')+'images/sampeur-realty-logo.png';

  const maps={
    en:{home:'index.html',properties:'properties.html',areas:'areas.html',buyers:'buyers.html',sellers:'sellers.html',results:'results.html',about:'about.html',contact:'contact.html',brief:'private-brief.html',book:'consultation.html'},
    fr:{home:'index.html',properties:'proprietes.html',areas:'quartiers.html',buyers:'acheteurs.html',sellers:'vendeurs.html',results:'resultats.html',about:'a-propos.html',contact:'contact.html',brief:'projet-prive.html',book:'consultation.html'},
    ht:{home:'index.html',properties:'pwopriyete.html',areas:'zon.html',buyers:'achte.html',sellers:'vann.html',results:'rezilta.html',about:'sou-suzana.html',contact:'kontak.html',brief:'plan-prive.html',book:'randevou.html'}
  };

  const labels={
    en:{home:'Home',properties:'Properties',areas:'Areas',buyers:'Buy',sellers:'Sell',results:'Results',about:'About',contact:'Contact',brief:'Start your brief',book:'Book a Consultation',bookShort:'Book'},
    fr:{home:'Accueil',properties:'Propriétés',areas:'Quartiers',buyers:'Acheter',sellers:'Vendre',results:'Résultats',about:'À propos',contact:'Contact',brief:'Votre projet',book:'Réserver une consultation',bookShort:'RDV'},
    ht:{home:'Akèy',properties:'Pwopriyete',areas:'Zòn',buyers:'Achte',sellers:'Vann',results:'Rezilta',about:'Sou Suzana',contact:'Kontak',brief:'Pwojè ou',book:'Pran yon randevou',bookShort:'Randevou'}
  };

  const m=maps[lang], l=labels[lang];
  const key=Object.keys(m).find(k=>m[k]===current)||'home';

  const pathFor=(target,keyName)=>{
    if(target==='en') return (lang==='en'?'':'../')+maps.en[keyName];
    if(target==='fr') return (lang==='en'?'fr/':lang==='fr'?'':'../fr/')+maps.fr[keyName];
    return (lang==='en'?'ht/':lang==='ht'?'':'../ht/')+maps.ht[keyName];
  };

  const head=document.querySelector('.header')||document.querySelector('header');
  if(head){
    const top=document.querySelector('.topbar');
    if(top) top.remove();

    head.className='header';
    head.innerHTML=
      '<div class="shell navwrap">'+
        '<a class="brand" href="'+m.home+'" aria-label="Sampeur Realty - '+l.home+'">'+
          '<img class="brand-logo" src="'+logoSrc+'" width="420" height="291" alt="Sampeur Realty"></a>'+
        '<nav class="nav" aria-label="'+(lang==='fr'?'Navigation principale':lang==='ht'?'Navigasyon prensipal':'Primary navigation')+'">'+
          ['home','properties','areas','buyers','sellers','results','about','contact'].map(k=>
            '<a href="'+m[k]+'"'+(k===key?' aria-current="page"':'')+'>'+l[k]+'</a>'
          ).join('')+
          '<a class="nav-cta" href="'+m.book+'">'+l.book+'</a>'+
          '<div class="mobile-lang-switch">'+
            '<a href="'+pathFor('en',key)+'"'+(lang==='en'?' aria-current="page"':'')+'>EN</a>'+
            '<a href="'+pathFor('fr',key)+'"'+(lang==='fr'?' aria-current="page"':'')+'>FR</a>'+
            '<a href="'+pathFor('ht',key)+'"'+(lang==='ht'?' aria-current="page"':'')+'>KREYÒL</a>'+
          '</div>'+
        '</nav>'+
        '<div class="header-actions">'+
          '<a class="header-book" href="'+m.book+'">'+l.bookShort+'</a>'+
          '<a class="header-search" href="'+m.properties+'" aria-label="'+(lang==='fr'?'Rechercher des propriétés':lang==='ht'?'Chèche pwopriyete':'Search properties')+'">'+
            '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.75"></circle><path d="M16 16l4.2 4.2"></path></svg>'+
          '</a>'+
          '<div class="langs">'+
            '<a href="'+pathFor('en',key)+'"'+(lang==='en'?' aria-current="page"':'')+'>EN</a>'+
            '<a href="'+pathFor('fr',key)+'"'+(lang==='fr'?' aria-current="page"':'')+'>FR</a>'+
            '<a href="'+pathFor('ht',key)+'"'+(lang==='ht'?' aria-current="page"':'')+'>KREYÒL</a>'+
          '</div>'+
          '<button class="menu" aria-label="'+(lang==='ht'?'Meni':'Menu')+'" aria-expanded="false"><span></span></button>'+
        '</div>'+
      '</div>';

    const b=head.querySelector('.menu');
    const n=head.querySelector('.nav');
    b.addEventListener('click',()=>{
      const open=n.classList.toggle('open');
      document.body.classList.toggle('menu-open',open);
      b.setAttribute('aria-expanded',String(open));
    });
  }


  // Keep the official mark on every footer without changing brokerage disclosures.
  document.querySelectorAll('footer .footer-name').forEach(el=>{
    if(el.querySelector('.footer-logo')) return;
    const disclosure=el.querySelector('small');
    const logo=document.createElement('img');
    logo.className='footer-logo';
    logo.src=logoSrc;
    logo.alt='Sampeur Realty';
    logo.width=420;
    logo.height=291;
    const owner=document.createElement('span');
    owner.className='footer-owner';
    owner.textContent='Suzana Sampeur';
    el.replaceChildren(logo,owner);
    if(disclosure) el.appendChild(disclosure);
  });

  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

  const form=document.querySelector('[data-client-brief]');
  if(form){
    const qs=new URLSearchParams(location.search);
    const goal=form.querySelector('[name=goal]');
    if(qs.get('goal')&&goal){
      const wanted=qs.get('goal');
      [...goal.options].some(o=>{
        if(o.value===wanted||o.textContent===wanted){o.selected=true;return true}
        return false;
      });
    }
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const d=new FormData(form);
      const copy=lang==='fr'
        ?{subject:'Projet immobilier',name:'Nom',email:'E-mail',phone:'Téléphone',goal:'Objectif',areas:'Quartiers recherchés',budget:'Budget / fourchette',timeline:'Calendrier',notes:'Informations utiles'}
        :lang==='ht'
        ?{subject:'Pwojè imobilye',name:'Non',email:'Imèl',phone:'Telefòn',goal:'Objektif',areas:'Zòn ou enterese ladan yo',budget:'Bidjè / limit',timeline:'Delè',notes:'Lòt enfòmasyon'}
        :{subject:'Private client brief',name:'Name',email:'Email',phone:'Phone',goal:'Goal',areas:'Preferred areas',budget:'Budget / range',timeline:'Timeline',notes:'Notes'};
      const subject=encodeURIComponent(copy.subject+' — '+(d.get('goal')||''));
      const body=encodeURIComponent([
        copy.name+': '+d.get('name'),
        copy.email+': '+d.get('email'),
        copy.phone+': '+d.get('phone'),
        copy.goal+': '+d.get('goal'),
        copy.areas+': '+d.get('areas'),
        copy.budget+': '+d.get('budget'),
        copy.timeline+': '+d.get('timeline'),
        copy.notes+': '+d.get('notes')
      ].join('\n'));
      location.href='mailto:suzana@luxeknows.com?subject='+subject+'&body='+body;
    });
  }
})();