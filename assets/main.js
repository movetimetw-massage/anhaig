
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


// Lightbox for informational/source images.
(function () {
  const selectors = [
    '.image-panel img',
    '.story-grid img'
  ];
  const images = document.querySelectorAll(selectors.join(','));
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', '圖片放大檢視');
  lightbox.innerHTML = `
    <div class="lightbox-stage">
      <button class="lightbox-close" type="button" aria-label="關閉放大圖片">×</button>
      <img class="lightbox-img" alt="">
      <div class="lightbox-caption"></div>
    </div>`;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  let lastTrigger = null;

  function openLightbox(img) {
    lastTrigger = img;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '放大圖片';
    caption.textContent = img.alt || '';
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    lbImg.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus?.();
  }

  images.forEach((img) => {
    img.classList.add('zoomable-image');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || '圖片'}，點擊放大`);

    const panel = img.closest('.image-panel');
    if (panel && !panel.querySelector('.zoom-hint')) {
      const hint = document.createElement('div');
      hint.className = 'zoom-hint';
      hint.textContent = '點擊圖片可放大查看';
      panel.appendChild(hint);
    }

    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();
