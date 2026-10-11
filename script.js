const menu=document.querySelector('.menu'); const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{links.style.display=links.style.display==='flex'?'none':'flex'; if(innerWidth<=850){links.style.position='absolute';links.style.top='68px';links.style.left='0';links.style.right='0';links.style.padding='18px';links.style.background='#fff';links.style.flexDirection='column';links.style.boxShadow='0 15px 30px rgba(0,0,0,.08)'}});
// V1.8.13 — application-first workflow. Set this to the deployed Google Apps Script Web App URL.
// Keep blank until the Apps Script backend has been deployed and tested.
const MEMBERSHIP_SUBMISSION_URL = "https://script.google.com/macros/s/AKfycbyoj6UESFVkYB6KKrmwgV8mq8UNMRATEWsu2zF102ZqZkVjt1HsZXiZUsIkHbD9WjQgFg/exec";

async function fileToPayload(file) {
  if (!file) return null;
  if (file.size > 5 * 1024 * 1024) throw new Error(`${file.name} exceeds the 5 MB upload limit.`);
  if (!file.type.startsWith('image/')) throw new Error(`${file.name} must be an image file.`);
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}. Please select it again.`));
    reader.readAsDataURL(file);
  });
  return {name:file.name, mimeType:file.type, dataUrl};
}

document.querySelector('#membershipForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.currentTarget;
  const msg = document.querySelector('#formMsg');
  const button = document.querySelector('#membershipSubmit');
  if (form.elements.website_url?.value) return; // basic spam honeypot
  if (MEMBERSHIP_SUBMISSION_URL === 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' || !MEMBERSHIP_SUBMISSION_URL.trim()) {
    if (msg) msg.textContent = 'Online applications are not active yet. The Association administrator must complete the one-time Google Sheets and committee-email setup before accepting applications.';
    return;
  }
  try {
    if (button) { button.disabled = true; button.textContent = 'Submitting application…'; }
    if (msg) msg.textContent = 'Preparing your application securely…';
    const formData = new FormData(form);
    const payload = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) continue;
      payload[key] = String(value).trim();
    }
    payload.membership_fee = formData.get('membership_fee') || '';
    payload.application_status = 'Pending Committee Review';
    payload.payment_status = 'Not collected — committee follow-up required';
    payload.submitted_at = new Date().toISOString();
    payload.member_photo = await fileToPayload(form.elements.member_photo?.files?.[0]);
    payload.member_signature = await fileToPayload(form.elements.member_signature?.files?.[0]);
    if (msg) msg.textContent = 'Sending your application to the Association…';
    // text/plain avoids a browser CORS preflight for the Apps Script web app.
    await fetch(MEMBERSHIP_SUBMISSION_URL, {method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body:JSON.stringify(payload)});
    form.reset();
    document.querySelector('#photoPreview')?.removeAttribute('src');
    document.querySelector('#photoPreview')?.style.setProperty('display','none');
    document.querySelector('#photoPreviewText')?.style.setProperty('display','block');
    document.querySelector('#signaturePreview')?.removeAttribute('src');
    document.querySelector('#signaturePreview')?.style.setProperty('display','none');
    document.querySelector('#signaturePreviewText')?.style.setProperty('display','block');
    updateMembershipFee();
    if (msg) msg.textContent = 'Your application has been sent. The Managing Committee will review it and contact you regarding payment and next steps. No payment has been taken. Please keep a note of your submitted details.';
  } catch (err) {
    if (msg) msg.textContent = `We could not submit your application: ${err.message || 'Please try again later or contact the Association.'}`;
  } finally {
    if (button) { button.disabled = false; button.textContent = 'Submit Membership Application'; }
  }
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


// V1.8.1 — Membership fee auto-population
const membershipType = document.querySelector('#membershipType');
const membershipFee = document.querySelector('#membershipFee');
const summaryMembershipFee = document.querySelector('#summaryMembershipFee');
const totalFee = document.querySelector('#totalFee');
const admissionFee = 100;
const membershipFees = {
  "Ordinary Annual": 500,
  "Life": 2500
};

function updateMembershipFee() {
  const type = membershipType?.value || "";
  const fee = membershipFees[type];
  if (!membershipFee) return;
  if (fee) {
    membershipFee.value = `₹${fee.toLocaleString('en-IN')}`;
    if (summaryMembershipFee) summaryMembershipFee.textContent = `₹${fee.toLocaleString('en-IN')}`;
    if (totalFee) totalFee.textContent = `₹${(admissionFee + fee).toLocaleString('en-IN')}`;
  } else {
    membershipFee.value = "";
    if (summaryMembershipFee) summaryMembershipFee.textContent = "—";
    if (totalFee) totalFee.textContent = "Select membership type";
  }
}
membershipType?.addEventListener('change', updateMembershipFee);
updateMembershipFee();



/* V1.8.2 — Membership photo upload and preview */
document.querySelector('#memberPhoto')?.addEventListener('change', function () {
  const file = this.files && this.files[0];
  const preview = document.querySelector('#photoPreview');
  const text = document.querySelector('#photoPreviewText');
  const help = document.querySelector('.photo-help');

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    this.value = '';
    if (help) help.textContent = 'Please select an image file (JPG, JPEG or PNG).';
    return;
  }

  // Keep the browser-side upload lightweight.
  if (file.size > 5 * 1024 * 1024) {
    this.value = '';
    if (help) help.textContent = 'Photo is larger than 5 MB. Please choose a smaller image.';
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    if (preview) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    if (text) text.style.display = 'none';
    if (help) help.textContent = `${file.name} selected`;
  };
  reader.readAsDataURL(file);
});

/* V1.8.3 — Notices ticker */
(function(){
  const list=document.querySelector('#heroNoticeList');
  const toggle=document.querySelector('#noticeToggle');
  if(!list || !toggle) return;
  let paused=false, offset=0;
  const step=1;
  const tick=setInterval(()=>{
    if(paused) return;
    offset += step;
    const windowEl=list.closest('.notice-window');
    const max=Math.max(0,list.scrollHeight - (windowEl ? windowEl.clientHeight : 185));
    if(offset>=max){offset=0;}
    list.style.transform=`translateY(${-offset}px)`;
  },60);
  const noticeWindow=list.closest('.notice-window');
  // Pause the moving ticker while visitors hover over it or keyboard-focus a notice,
  // so links remain easy to select and activate.
  noticeWindow?.addEventListener('mouseenter',()=>{paused=true;});
  noticeWindow?.addEventListener('mouseleave',()=>{paused=false;});
  noticeWindow?.addEventListener('focusin',()=>{paused=true;});
  noticeWindow?.addEventListener('focusout',()=>{paused=false;});
  toggle.addEventListener('click',()=>{
    paused=!paused;
    toggle.textContent=paused?'▶':'Ⅱ';
    toggle.setAttribute('aria-label',paused?'Play notices':'Pause notices');
  });
})();


/* V1.8.10 — Signature image selection and preview (browser-side only) */
(function(){
  const input=document.querySelector('#memberSignature');
  const preview=document.querySelector('#signaturePreview');
  const text=document.querySelector('#signaturePreviewText');
  const help=document.querySelector('#signatureHelp');
  if(!input) return;
  input.addEventListener('change',function(){
    const file=this.files&&this.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){this.value='';if(help)help.textContent='Please choose an image file (JPG, JPEG or PNG).';return;}
    if(file.size>5*1024*1024){this.value='';if(help)help.textContent='Signature image is larger than 5 MB. Please choose a smaller image.';return;}
    const reader=new FileReader();
    reader.onload=e=>{if(preview){preview.src=e.target.result;preview.style.display='block';}if(text)text.style.display='none';if(help)help.textContent=file.name+' selected';};
    reader.readAsDataURL(file);
  });
})();

/* V1.8.10 — Load notices from data/notices.json for both Latest Updates and Notice Board.
   A notice may include pdfUrl, which becomes its downloadable circular/document link. */
(async function(){
  const heroList=document.querySelector('#heroNoticeList');
  const board=document.querySelector('#noticeBoardList');
  if(!heroList&&!board) return;
  let notices=[];
  try{
    const response=await fetch('data/notices.json',{cache:'no-store'});
    if(!response.ok) throw new Error('Notices data unavailable');
    notices=await response.json();
    if(!Array.isArray(notices)) throw new Error('Invalid notices data');
  }catch(err){ return; } // retain the built-in fallback content when local file access blocks fetch
  const safe=(value)=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safeHref=(value)=>{const v=String(value||'').trim();return /^(https?:\/\/|#|assets\/)/i.test(v)?v:'#notices';};
  if(heroList){
    heroList.innerHTML=notices.map(n=>{
      const pdf=String(n.pdfUrl||'').trim();
      const href=pdf?safeHref(pdf):safeHref(n.linkTarget||'#notices');
      const download=pdf?' target="_blank" rel="noopener"':' ';
      const cta=pdf?'Download PDF ↓':(n.cta||'Read Update →');
      return `<a class="notice-item" href="${href}"${download}><span class="notice-date">${safe(n.date||'Update')} · ${safe(n.type||'Notice')}</span><strong>${safe(n.title||'Association update')}</strong><p>${safe(n.summary||'Please open this update for details.')}</p><span class="notice-item-cta">${safe(cta)}</span></a>`;
    }).join('');
  }
  if(board){
    board.innerHTML=notices.map(n=>{
      const pdf=String(n.pdfUrl||'').trim();
      const href=pdf?safeHref(pdf):safeHref(n.linkTarget||'#notices');
      const label=pdf?'Download PDF ↓':(n.cta||'Read More →');
      const target=pdf?' target="_blank" rel="noopener"':'';
      return `<article class="notice-board-card"><span class="notice-date">${safe(n.type||'Notice')} · ${safe(n.date||'Update')}</span><h3>${safe(n.title||'Association update')}</h3><p>${safe(n.summary||'Please open this update for details.')}</p><a href="${href}"${target}>${safe(label)}</a></article>`;
    }).join('');
  }
})();
