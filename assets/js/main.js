/* ============================================================
   SARINDRA THERESE RANDRIAMBELOSON — Portfolio JS
   assets/js/main.js
   ============================================================ */

'use strict';

/* ── PAGE NAVIGATION ── */
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Reset nav active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Set nav active
  document.querySelectorAll('.nav-links a').forEach(a => {
    const onclick = a.getAttribute('onclick') || '';
    if (onclick.includes("'" + id + "'")) a.classList.add('active');
  });

  // Trigger animations per page
  if (id === 'skills') {
    setTimeout(animateBars, 300);
  }

  // Close mobile menu if open
  document.querySelector('.nav-links').classList.remove('open');
}

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

/* ── SKILLS TABS ── */
function switchSkillTab(id, btn) {
  document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));

  document.getElementById('sp-' + id).classList.add('active');
  btn.classList.add('active');

  if (id === 'viz') initCharts();
  if (id === 'tech') animateBars();
}

/* ── ANIMATE PROGRESS BARS ── */
function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = (bar.dataset.w || 0) + '%';
  });
}

/* ── PROJECT FILTER ── */
function filterProj(cat, btn) {
  document.querySelectorAll('.pfilt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Supporte les deux formats de cards (.proj-card et .proj-card-v2)
  const cards = document.querySelectorAll('.proj-card, .proj-card-v2');
  let visibleIdx = 0;
  cards.forEach((card) => {
    const show = cat === 'all' || card.dataset.cat === cat;
    if (show) {
      card.style.display = 'flex';
      card.classList.remove('visible');
      card.style.transitionDelay = (visibleIdx * 0.08) + 's';
      visibleIdx++;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => card.classList.add('visible'));
      });
    } else {
      card.classList.remove('visible');
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}

/* ── CONTACT FORM — Formspree ── */
function sendMessage(btnEl) {
  const page      = btnEl.closest('#page-contact') || document.getElementById('page-contact');
  const nameEl    = page.querySelector('#name');
  const emailEl   = page.querySelector('#email');
  const subjectEl = page.querySelector('#subject');
  const messageEl = page.querySelector('#message');
  const errName   = page.querySelector('#err-name');
  const errEmail  = page.querySelector('#err-email');
  const errMsgEl  = page.querySelector('#err-message');
  const errBox    = page.querySelector('#form-error');
  const errBoxMsg = page.querySelector('#form-error-msg');
  const successEl = page.querySelector('#form-success');
  const formBody  = page.querySelector('#contact-form-body');

  // Reset erreurs
  [errName, errEmail, errMsgEl].forEach(el => { if (el) el.textContent = ''; });
  [nameEl, emailEl, messageEl].forEach(el => { if (el) el.classList.remove('input-error'); });
  if (errBox) errBox.style.display = 'none';

  const name    = nameEl    ? nameEl.value.trim()    : '';
  const email   = emailEl   ? emailEl.value.trim()   : '';
  const subject = subjectEl ? subjectEl.value.trim() : '';
  const message = messageEl ? messageEl.value.trim() : '';

  // Validation
  let valid = true;
  if (!name) {
    if (errName) errName.textContent = 'Le nom est requis.';
    if (nameEl)  nameEl.classList.add('input-error');
    valid = false;
  }
  if (!email) {
    if (errEmail) errEmail.textContent = 'Email requis.';
    if (emailEl)  emailEl.classList.add('input-error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (errEmail) errEmail.textContent = 'Email invalide.';
    if (emailEl)  emailEl.classList.add('input-error');
    valid = false;
  }
  if (!message) {
    if (errMsgEl)  errMsgEl.textContent = 'Le message est requis.';
    if (messageEl) messageEl.classList.add('input-error');
    valid = false;
  }
  if (!valid) return;

  // Désactiver immédiatement le bouton — aucun double envoi possible
  btnEl.disabled = true;
  btnEl.textContent = '⏳ Envoi en cours...';
  btnEl.style.background = 'linear-gradient(135deg, #7c3aed, #a855f7)';
  btnEl.style.opacity = '0.85';

  fetch('https://formspree.io/f/mojkzoae', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, subject: subject || 'Contact depuis portfolio', message })
  })
  .then(res => res.json().then(data => ({ ok: res.ok, data })))
  .then(({ ok, data }) => {
    if (ok) {
      // Succès — bouton vert, désactivé 5s
      btnEl.textContent = '✅ Message envoyé !';
      btnEl.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
      btnEl.style.opacity = '1';
      btnEl.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.5)';
      setTimeout(() => {
        if (formBody)  formBody.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
      }, 1200);
    } else {
      // Erreur serveur
      const msg = (data && data.errors && data.errors[0]) ? data.errors[0].message : 'Erreur inconnue.';
      if (errBoxMsg) errBoxMsg.textContent = '⚠️ ' + msg;
      if (errBox)    errBox.style.display = 'block';
      btnEl.textContent = '✈️ Send Message';
      btnEl.style.background = '';
      btnEl.style.opacity = '';
      btnEl.style.boxShadow = '';
      btnEl.disabled = false;
    }
  })
  .catch(() => {
    if (errBoxMsg) errBoxMsg.textContent = '⚠️ Connexion impossible. Verifiez votre reseau.';
    if (errBox)    errBox.style.display = 'block';
    btnEl.textContent = '✈️ Send Message';
    btnEl.style.background = '';
    btnEl.style.opacity = '';
    btnEl.style.boxShadow = '';
    btnEl.disabled = false;
  });
}


function resetContactForm() {
  const page = document.getElementById('page-contact');
  if (!page) return;
  const successEl = page.querySelector('#form-success');
  const formBody  = page.querySelector('#contact-form-body');
  if (successEl) successEl.style.display = 'none';
  if (formBody)  formBody.style.display  = 'block';
  ['name','email','subject','message'].forEach(id => {
    const el = page.querySelector('#' + id);
    if (el) el.value = '';
  });
  ['err-name','err-email','err-message'].forEach(id => {
    const el = page.querySelector('#' + id);
    if (el) el.textContent = '';
  });
  const errBox = page.querySelector('#form-error');
  if (errBox) errBox.style.display = 'none';
}

/* ── CHARTS (Chart.js) ── */
let chartsInitialized = false;

function initCharts() {
  if (chartsInitialized) return;
  chartsInitialized = true;

  const gridColor = 'rgba(255, 255, 255, 0.08)';
  const tickColor = '#a78bca';

  // --- Radar Chart ---
  const radarCtx = document.getElementById('radarChart');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: [
          'Data Engineering',
          'Generative AI',
          'Analytics / BI',
          'Python / Dev',
          'Big Data',
          'Bases de données'
        ],
        datasets: [{
          label: 'Niveau (%)',
          data: [88, 87, 92, 95, 83, 85],
          backgroundColor: 'rgba(192, 132, 252, 0.2)',
          borderColor: '#c084fc',
          pointBackgroundColor: '#ec4899',
          pointBorderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { color: gridColor },
            grid:        { color: gridColor },
            pointLabels: { color: tickColor, font: { size: 12 } },
            ticks:       { color: tickColor, backdropColor: 'transparent', stepSize: 25 },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        plugins: {
          legend: { labels: { color: tickColor } }
        }
      }
    });
  }

  // --- Bar Chart 1 : Languages ---
  const bc1 = document.getElementById('barChart1');
  if (bc1) {
    const ctx1 = bc1.getContext('2d');
    const grad1 = ctx1.createLinearGradient(0, 0, 0, 260);
    grad1.addColorStop(0, '#ec4899');
    grad1.addColorStop(1, '#8b5cf6');

    new Chart(bc1, {
      type: 'bar',
      data: {
        labels: ['Python', 'SQL', 'Flask', 'Java', 'Django'],
        datasets: [{
          label: 'Niveau (%)',
          data: [95, 88, 85, 75, 70],
          backgroundColor: grad1,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor } },
          y: { grid: { color: gridColor }, ticks: { color: tickColor }, min: 0, max: 100 }
        },
        plugins: { legend: { labels: { color: tickColor } } }
      }
    });
  }

  // --- Bar Chart 2 : IA & Data Tools ---
  const bc2 = document.getElementById('barChart2');
  if (bc2) {
    const ctx2 = bc2.getContext('2d');
    const grad2 = ctx2.createLinearGradient(0, 0, 0, 260);
    grad2.addColorStop(0, '#d946ef');
    grad2.addColorStop(1, '#7c3aed');

    new Chart(bc2, {
      type: 'bar',
      data: {
        labels: ['Power BI', 'OpenAI', 'Kafka', 'Gemini AI', 'PySpark'],
        datasets: [{
          label: 'Niveau (%)',
          data: [92, 90, 88, 85, 80],
          backgroundColor: grad2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor } },
          y: { grid: { color: gridColor }, ticks: { color: tickColor }, min: 0, max: 100 }
        },
        plugins: { legend: { labels: { color: tickColor } } }
      }
    });
  }
}

/* ── INIT ON LOAD — see bottom of file ── */

/* ── INTERSECTION OBSERVER — animations au scroll ── */
function initScrollAnimations() {
  // Observer pour les éléments .anim-ready
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.anim-ready').forEach(el => io.observe(el));
}

/* ── APPLIQUER les classes anim sur les éléments ── */
function applyAnimClasses() {
  // Section headers
  document.querySelectorAll('.sec-hd').forEach(el => {
    el.classList.add('anim-ready');
  });

  // Experience items
  document.querySelectorAll('.exp-item').forEach((el, i) => {
    el.classList.add('anim-ready', 'from-left');
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  // Edu/cert cards
  document.querySelectorAll('.edu-card').forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  // Skill cat cards
  document.querySelectorAll('.skill-cat-card').forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.transitionDelay = (i * 0.07) + 's';
  });

  // Skill bars cards
  document.querySelectorAll('.skill-bars-card').forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  // Project cards (v1 + v2)
  document.querySelectorAll('.proj-card, .proj-card-v2').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
    el.classList.add('anim-ready');
  });

  // Contact cards
  document.querySelectorAll('.contact-form-card, .contact-info-card, .avail-card, .loc-card').forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  // About sections
  document.querySelectorAll('.about-top, .drives-card, .about-bottom-grid').forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.transitionDelay = (i * 0.15) + 's';
  });

  // Collab banner
  document.querySelectorAll('.collab-banner').forEach(el => {
    el.classList.add('anim-ready', 'scale');
  });
}

/* ── RE-INIT observer quand on change de page ── */
const _origShowPage = showPage;
window.showPage = function(id) {
  _origShowPage(id);
  // Légère pause pour que le DOM soit visible, puis observer
  setTimeout(() => {
    // Reset les classes anim sur la page qui s'affiche
    const page = document.getElementById('page-' + id);
    if (page) {
      page.querySelectorAll('.anim-ready').forEach(el => {
        el.classList.remove('visible');
        // proj-cards: don't hide with display:none during reset
        if (!el.classList.contains('proj-card')) {
          // opacity handled by CSS
        }
      });
      setTimeout(() => {
        page.querySelectorAll('.anim-ready').forEach(el => {
          const io2 = new IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  io2.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
          );
          io2.observe(el);
        });
      }, 80);
    }
  }, 50);
};

/* ── COUNTER ANIMATION sur les stats home ── */
function animateCounters() {
  document.querySelectorAll('.hstat-n').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = match[2];
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  applyAnimClasses();
  initScrollAnimations();

  // Counter animation sur la home (avec délai pour laisser entrer la page)
  setTimeout(animateCounters, 900);
});
