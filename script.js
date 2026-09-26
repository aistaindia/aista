const menu=document.querySelector('.menu'); const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{links.style.display=links.style.display==='flex'?'none':'flex'; if(innerWidth<=850){links.style.position='absolute';links.style.top='68px';links.style.left='0';links.style.right='0';links.style.padding='18px';links.style.background='#fff';links.style.flexDirection='column';links.style.boxShadow='0 15px 30px rgba(0,0,0,.08)'}});
document.querySelector('#membershipForm')?.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#formMsg').textContent='Thank you. This demo has captured the application fields. We will connect it to the AISTA member database in the next phase.';});

/* Hero slideshow: cycles through the association's conference photographs. */
(function(){
  const slides=[...document.querySelectorAll('.hero-slide')];
  if(slides.length<2) return;
  let current=0;
  setInterval(()=>{
    slides[current].classList.remove('active');
    current=(current+1)%slides.length;
    slides[current].classList.add('active');
  },5000);
})();


/* Version 1.6 — Official notices ticker: bottom-to-top, pause on interaction */
(function(){
  const ticker=document.querySelector('.notice-ticker');
  const track=document.querySelector('.notice-ticker-track');
  const items=[...document.querySelectorAll('.notice-item')];
  const pauseBtn=document.querySelector('.ticker-pause');
  if(!ticker || !track || items.length<2) return;

  const stepHeight=82;
  let index=0;
  let paused=false;
  let timer=null;

  const render=(animate=true)=>{
    track.style.transition=animate ? 'transform 700ms ease' : 'none';
    track.style.transform=`translateY(-${index*stepHeight}px)`;
  };

  const step=()=>{
    if(paused) return;
    index+=1;
    render(true);

    if(index===items.length){
      window.setTimeout(()=>{
        index=0;
        render(false);
      },760);
    }
  };

  const start=()=>{
    clearInterval(timer);
    timer=window.setInterval(step,4200);
  };

  const setPaused=(value)=>{
    paused=value;
    if(pauseBtn){
      pauseBtn.textContent=paused?'Play':'Pause';
      pauseBtn.setAttribute('aria-label',paused?'Play announcements':'Pause announcements');
      pauseBtn.setAttribute('aria-pressed',String(paused));
    }
    if(paused) clearInterval(timer);
    else start();
  };

  pauseBtn?.addEventListener('click',()=>setPaused(!paused));
  ticker.addEventListener('mouseenter',()=>setPaused(true));
  ticker.addEventListener('mouseleave',()=>{ if(pauseBtn?.getAttribute('aria-pressed')!=='true') setPaused(false); });
  ticker.addEventListener('focusin',()=>setPaused(true));
  ticker.addEventListener('focusout',()=>{ if(pauseBtn?.getAttribute('aria-pressed')!=='true') setPaused(false); });

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    setPaused(true);
  } else {
    start();
  }
})();
