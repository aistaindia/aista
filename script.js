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


/* Official notices ticker — newest notice enters from the bottom and moves upward. */
(function(){
  const ticker=document.querySelector('.notice-ticker');
  const track=document.querySelector('.notice-ticker-track');
  const items=[...document.querySelectorAll('.notice-item')];
  const pauseBtn=document.querySelector('.ticker-pause');
  if(!ticker || !track || items.length<2) return;
  let index=0, paused=false, timer;
  const height=82;
  const step=()=>{
    if(paused) return;
    index=(index+1)%items.length;
    track.style.transition='transform 700ms ease';
    track.style.transform=`translateY(-${index*height}px)`;
    if(index===items.length-1){
      window.setTimeout(()=>{
        track.style.transition='none';
        track.style.transform='translateY(0)';
        index=0;
      },760);
    }
  };
  const start=()=>{clearInterval(timer);timer=setInterval(step,4200)};
  pauseBtn?.addEventListener('click',()=>{
    paused=!paused;
    pauseBtn.textContent=paused?'Play':'Pause';
    pauseBtn.setAttribute('aria-label',paused?'Play announcements':'Pause announcements');
    if(!paused) start();
  });
  ticker.addEventListener('mouseenter',()=>{paused=true;});
  ticker.addEventListener('mouseleave',()=>{if(pauseBtn?.textContent==='Pause'){paused=false;start();}});
  ticker.addEventListener('focusin',()=>{paused=true;});
  ticker.addEventListener('focusout',()=>{if(pauseBtn?.textContent==='Pause'){paused=false;start();}});
  start();
})();
