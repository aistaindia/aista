const menu=document.querySelector('.menu'); const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{links.style.display=links.style.display==='flex'?'none':'flex'; if(innerWidth<=850){links.style.position='absolute';links.style.top='68px';links.style.left='0';links.style.right='0';links.style.padding='18px';links.style.background='#fff';links.style.flexDirection='column';links.style.boxShadow='0 15px 30px rgba(0,0,0,.08)'}});
document.querySelector('#membershipForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const msg=document.querySelector('#formMsg');
  if(msg) msg.textContent='Thank you. Your membership application details have been captured by this prototype. Online storage, acknowledgement and payment workflow will be connected in a future version.';
});

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
