/* ==========================================================
   Bunné Fortune — script.js
   ★ แก้ลิงก์ LINE ตรงนี้ที่เดียว (ปุ่ม LINE ทุกหน้าจะเปลี่ยนตาม) ★
   ========================================================== */
const LINE_URL = 'https://line.me/R/ti/p/@YOUR_LINE_ID'; // <-- ใส่ลิงก์ LINE Official: Bunne Fortune
const LINE_NAME = 'Bunne Fortune';

const PAGES = [
  { href: 'index.html', label: 'หน้าหลัก' },
  { href: 'promotion.html', label: 'Promotion' },
  { href: 'packages.html', label: 'แพ็คเกจ' },
  { href: 'more.html', label: 'โปรยอดนิยม' },
  { href: 'booking.html', label: 'วิธีจองคิว' },
];

/* ---------- Navbar + Footer (ใส่ให้อัตโนมัติทุกหน้า) ---------- */
function buildChrome() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = PAGES.map(p =>
    `<li><a href="${p.href}" class="${p.href === current ? 'active' : ''}">${p.label}</a></li>`
  ).join('');

  const header = document.getElementById('site-header');
  if (header) header.innerHTML = `
    <nav class="navbar">
      <div class="container nav-inner">
        <a href="index.html" class="brand"><span class="bun">🐰</span>Bunné Fortune</a>
        <button class="burger" aria-label="เปิดเมนู" aria-expanded="false">☰</button>
        <ul class="nav-links">${links}</ul>
      </div>
    </nav>`;

  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = `
    <svg class="wave" viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 25 Q 90 0 180 25 T 360 25 T 540 25 T 720 25 T 900 25 T 1080 25 T 1260 25 T 1440 25 V50 H0Z" fill="#e2d1ff"/>
    </svg>
    <div class="footer">
      <div class="container">
        <div style="font-size:2.4rem" class="en">🐰🔮✨</div>
        <h3 class="en" style="font-size:1.8rem;color:var(--lilac-500)">Bunné Fortune</h3>
        <p>มาให้แม่หมอช่วยหาคำตอบด้วยกันนะคะ</p>
        <a class="btn line" href="${LINE_URL}" target="_blank" rel="noopener">💬 LINE Official : ${LINE_NAME}</a>
        <small>© ${new Date().getFullYear()} Bunné Fortune · ดูดวงเพื่อความสบายใจ</small>
      </div>
    </div>
    <a class="float-line" href="${LINE_URL}" target="_blank" rel="noopener" aria-label="ติดต่อทาง LINE">💬</a>`;

  // ปุ่มทั้งหมดที่มี class="js-line" จะลิงก์ไป LINE
  document.querySelectorAll('.js-line').forEach(a => { a.href = LINE_URL; a.target = '_blank'; a.rel = 'noopener'; });

  // เมนูมือถือ
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.nav-links');
  if (burger) burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
  });
}

/* ---------- ดาว/ประกายลอยขึ้นด้านหลัง ---------- */
function buildSky() {
  const sky = document.createElement('div');
  sky.id = 'sky';
  document.body.prepend(sky);
  const icons = ['✨', '⭐', '🌙', '💜', '🫧', '🔮', '☁️', '🌸', '✦'];
  const count = window.innerWidth < 700 ? 12 : 22;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'floaty';
    s.textContent = icons[Math.floor(Math.random() * icons.length)];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = 14 + Math.random() * 22 + 'px';
    s.style.animationDuration = 12 + Math.random() * 16 + 's';
    s.style.animationDelay = -Math.random() * 20 + 's';
    sky.appendChild(s);
  }
}

/* ---------- ประกายตามเมาส์ ---------- */
function sparkleCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  let last = 0;
  window.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - last < 70) return;
    last = now;
    const s = document.createElement('span');
    s.className = 'sparkle-trail';
    s.textContent = ['✨', '💜', '⭐', '🫧'][Math.floor(Math.random() * 4)];
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  });
}

/* ---------- Scroll reveal ---------- */
function revealOnScroll() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- FAQ accordion ---------- */
function faq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
    });
  });
}

/* ---------- แตะไพ่เพื่อพลิก (มือถือ) ---------- */
function flipCards() {
  document.querySelectorAll('.flip').forEach(c => c.addEventListener('click', () => c.classList.toggle('flipped')));
}

/* ---------- เปลี่ยนหน้าแบบนุ่มๆ ---------- */
function pageTransition() {
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    a.addEventListener('click', e => {
      if (a.target === '_blank' || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => (location.href = a.getAttribute('href')), 300);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildChrome();
  buildSky();
  sparkleCursor();
  revealOnScroll();
  faq();
  flipCards();
  pageTransition();
});
