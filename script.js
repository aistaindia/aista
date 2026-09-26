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
