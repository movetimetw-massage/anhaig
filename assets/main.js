
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
if (menu && links) {
  menu.addEventListener('click', () => links.classList.toggle('open'));
}

document.addEventListener('click', (e) => {
  if (!links || !menu) return;
  if (window.innerWidth > 880) return;
  if (!links.contains(e.target) && !menu.contains(e.target)) links.classList.remove('open');
});

const copyBtn = document.querySelector('[data-copy]');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const text = document.querySelector('#booking-template').innerText;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = '已複製預約格式 ✓';
    } catch (e) {
      copyBtn.textContent = '請長按文字複製';
    }
  });
}

(function () {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
  });
})();


// Carry a service/therapist intent from conversion cards into the booking template.
(function(){
  const tpl=document.querySelector('#booking-template');
  if(!tpl) return;
  const params=new URLSearchParams(location.search);
  const service=params.get('service');
  if(!service) return;
  tpl.innerText=tpl.innerText.replace('服務項目：','服務項目：'+service);
})();
