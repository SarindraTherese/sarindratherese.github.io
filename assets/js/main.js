/* ============================================================
   SARINDRA THERESE RANDRIAMBELOSON — Portfolio
   assets/js/main.js
   ============================================================ */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. DISPONIBILITÉ — source unique de vérité
   ────────────────────────────────────────────────────────────
   Change UNIQUEMENT la valeur ci-dessous. Tout le site suit :
   la pastille, le libellé, le texte de la carte, la bannière
   « Interested in working together? », et la date de mise à jour.

     'open'      → ouverte aux opportunités
     'selective' → pas en recherche active, mais joignable
     'closed'    → indisponible pour le moment
   ════════════════════════════════════════════════════════════ */
const AVAILABILITY = 'selective';
const AVAILABILITY_UPDATED = '2026-09';   // AAAA-MM — à mettre à jour avec le statut

const AVAILABILITY_COPY = {
  open: {
    label: 'Available for new opportunities',
    text:  'I’m open to freelance missions, consulting and roles in Data Analytics, Data Engineering or Generative AI.',
    tone:  'ok'
  },
  selective: {
    label: 'Not actively looking',
    text:  'I’m currently engaged on a project and not actively looking. I’m still glad to talk about interesting data and AI work — just get in touch.',
    tone:  'sand'
  },
  closed: {
    label: 'Currently unavailable',
    text:  'My schedule is full at the moment and I’m not taking on new work. Feel free to write anyway — I’ll reply when things open up.',
    tone:  'muted'
  }
};

/* ════════════════════════════════════════════════════════════
   2. NOTES & LECTURES
   ────────────────────────────────────────────────────────────
   Ajouter une entrée = ajouter un objet dans le tableau.
   Aucun HTML à toucher. Les entrées s'affichent dans l'ordre
   du tableau — mets la plus récente en premier.

   NOTES — un écrit à toi :
     { date: '2026-09', title: '...', summary: '...',
       tags: ['LLM', 'OCR'],
       url: 'https://...' }        // url facultative

   READINGS — ce que tu lis :
     { title: '...', author: '...', kind: 'Book',   // Book | Paper | Article
       note: 'Ce que j\'en retiens, en une phrase.',
       url: 'https://...' }        // url facultative

   ⚠ Tant que ces tableaux sont vides, la page affiche un état
   d'attente. Ajoute au moins une entrée dans chacun avant de
   publier.
   ════════════════════════════════════════════════════════════ */
const NOTES = [
  // { date: '2026-09', title: 'Why I split OCR from the LLM', summary: '…', tags: ['OCR','LLM'] },
];

const READINGS = [
  // { title: '…', author: '…', kind: 'Book', note: '…' },
];

/* ════════════════════════════════════════════════════════════
   3. NAVIGATION — routage par ancre, liens partageables
   ════════════════════════════════════════════════════════════ */
const GA_MEASUREMENT_ID = 'G-T01M8EW56C';
const PAGES = ['home', 'about', 'projects', 'skills', 'notes', 'contact'];

function trackVirtualPageView(id) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: id === 'home' ? '/' : '/' + id,
    page_title: 'Sarindra Therese — ' + id.charAt(0).toUpperCase() + id.slice(1)
  });
}

function showPage(id, opts) {
  if (!PAGES.includes(id)) id = 'home';
  const options = opts || {};

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (!target) return;
  target.classList.add('active');

  document.querySelectorAll('#nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    a.removeAttribute('aria-current');
    if (a.classList.contains('active')) a.setAttribute('aria-current', 'page');
  });

  closeMenu();
  document.title = (id === 'home' ? '' : id.charAt(0).toUpperCase() + id.slice(1) + ' — ')
    + 'Sarindra Thérèse Randriambeloson — Data & AI Engineer';

  if (!options.silent) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  if (id === 'skills') setTimeout(animateBars, 200);
  revealIn(target);
  trackVirtualPageView(id);
}

function currentHashPage() {
  return (location.hash || '#home').replace('#', '').split('?')[0];
}

/* ── Menu mobile ── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('nav-burger');
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  btn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
}

function closeMenu() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('nav-burger');
  if (!links || !links.classList.contains('open')) return;
  links.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  btn.querySelector('use').setAttribute('href', '#i-menu');
}

/* ════════════════════════════════════════════════════════════
   4. ONGLETS — Skills et Notes partagent le même composant
   ════════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('.skills-tabs').forEach(group => {
    const tabs = Array.from(group.querySelectorAll('.stab'));
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabs.forEach(b => {
          const panel = document.getElementById('sp-' + b.dataset.tab);
          if (panel) panel.classList.toggle('active', b.dataset.tab === id);
        });
        if (id === 'viz') initCharts();
        if (id === 'tech') animateBars();
      });
    });
  });
}

function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = (bar.dataset.w || 0) + '%';
  });
}

/* ════════════════════════════════════════════════════════════
   5. FILTRE PROJETS
   ════════════════════════════════════════════════════════════ */
function initProjectFilter() {
  const btns = document.querySelectorAll('.pfilt');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.proj-card-v2').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? 'flex' : 'none';
        const featured = card.closest('.proj-featured');
        if (featured) featured.style.display = show ? 'block' : 'none';
      });
    });
  });
}

/* ════════════════════════════════════════════════════════════
   6. NOTES & LECTURES — rendu
   ════════════════════════════════════════════════════════════ */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatMonth(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (months[parseInt(m, 10) - 1] || '') + ' ' + y;
}

function emptyState(icon, title, text) {
  return '<div class="empty-state">'
    + '<svg class="icon" aria-hidden="true"><use href="#' + icon + '"/></svg>'
    + '<h3>' + esc(title) + '</h3><p>' + esc(text) + '</p></div>';
}

function renderNotes() {
  const host = document.getElementById('note-list');
  if (!host) return;

  if (!NOTES.length) {
    host.innerHTML = emptyState('i-pen', 'Nothing published yet',
      'I’m starting to write about the systems I build — document pipelines, streaming architectures and BI modelling. First notes coming soon.');
    return;
  }

  host.innerHTML = NOTES.map(n => {
    const tags = (n.tags || []).map(t => '<span class="ptag">' + esc(t) + '</span>').join('');
    const link = n.url
      ? '<span class="note-more">Read it <svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-ur"/></svg></span>'
      : '';
    const inner =
        '<div class="note-date">' + esc(formatMonth(n.date)) + '</div>'
      + '<div class="note-main">'
      +   '<h3 class="note-title">' + esc(n.title) + '</h3>'
      +   '<p class="note-summary">' + esc(n.summary || '') + '</p>'
      +   (tags || link ? '<div class="note-foot">' + tags + link + '</div>' : '')
      + '</div>';
    return n.url
      ? '<a class="note-item" href="' + esc(n.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<article class="note-item">' + inner + '</article>';
  }).join('');
}

function renderReadings() {
  const host = document.getElementById('read-list');
  if (!host) return;

  if (!READINGS.length) {
    host.innerHTML = emptyState('i-book', 'Reading list in progress',
      'I read a lot — on data systems, AI and how teams make decisions. I’m putting the list together, with one line on what I took from each.');
    return;
  }

  host.innerHTML = READINGS.map(r => {
    const inner =
        '<div class="read-kind">' + esc(r.kind || 'Book') + '</div>'
      + '<div class="read-main">'
      +   '<h3 class="read-title">' + esc(r.title) + '</h3>'
      +   (r.author ? '<p class="read-author">' + esc(r.author) + '</p>' : '')
      +   (r.note ? '<p class="read-note">' + esc(r.note) + '</p>' : '')
      + '</div>';
    return r.url
      ? '<a class="read-item" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<article class="read-item">' + inner + '</article>';
  }).join('');
}

/* ════════════════════════════════════════════════════════════
   7. DISPONIBILITÉ — application
   ════════════════════════════════════════════════════════════ */
function applyAvailability() {
  const conf = AVAILABILITY_COPY[AVAILABILITY] || AVAILABILITY_COPY.selective;

  const card = document.getElementById('avail-card');
  const dot  = document.getElementById('avail-dot');
  const text = document.getElementById('avail-text');

  if (card) card.dataset.tone = conf.tone;
  if (text) text.textContent = conf.text;
  if (dot) {
    dot.textContent = conf.label;
    dot.setAttribute('title', 'Updated ' + formatMonth(AVAILABILITY_UPDATED));
  }

  const stamp = document.getElementById('avail-updated');
  if (stamp) stamp.textContent = 'Status updated ' + formatMonth(AVAILABILITY_UPDATED);

  // même source de vérité pour la fiche « At a glance » de la page About
  const fact = document.getElementById('fact-status');
  const factSub = document.getElementById('fact-status-sub');
  if (fact) fact.childNodes[0].nodeValue = conf.label;
  if (factSub) factSub.textContent = 'Updated ' + formatMonth(AVAILABILITY_UPDATED);
}

/* ════════════════════════════════════════════════════════════
   8. FORMULAIRE DE CONTACT — Formspree
   ════════════════════════════════════════════════════════════ */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojkzoae';

function sendMessage(btnEl) {
  const page = document.getElementById('page-contact');
  const q = sel => page.querySelector(sel);

  const nameEl = q('#name'), emailEl = q('#email');
  const subjectEl = q('#subject'), messageEl = q('#message');
  const errBox = q('#form-error'), errBoxMsg = q('#form-error-msg');
  const successEl = q('#form-success'), formBody = q('#contact-form-body');
  const btnText = q('#send-btn-text');

  ['#err-name', '#err-email', '#err-message'].forEach(s => { q(s).textContent = ''; });
  [nameEl, emailEl, messageEl].forEach(el => el.classList.remove('input-error'));
  errBox.hidden = true;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const subject = subjectEl.value.trim();
  const message = messageEl.value.trim();

  let valid = true;
  const fail = (el, errSel, msg) => {
    q(errSel).textContent = msg;
    el.classList.add('input-error');
    valid = false;
  };

  if (!name) fail(nameEl, '#err-name', 'Please enter your name.');
  if (!email) fail(emailEl, '#err-email', 'Please enter your email.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fail(emailEl, '#err-email', 'This email address doesn’t look valid.');
  if (!message) fail(messageEl, '#err-message', 'Please write a message.');

  if (!valid) {
    page.querySelector('.input-error').focus();
    return;
  }

  btnEl.disabled = true;
  btnText.textContent = 'Sending…';

  const restore = msg => {
    errBoxMsg.textContent = msg;
    errBox.hidden = false;
    btnText.textContent = 'Send message';
    btnEl.disabled = false;
  };

  fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, subject: subject || 'Contact from portfolio', message })
  })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        const msg = (data && data.errors && data.errors[0])
          ? data.errors[0].message
          : 'The message could not be sent. Please try again.';
        restore(msg);
        return;
      }
      btnEl.classList.add('is-sent');
      btnText.textContent = 'Message sent';
      setTimeout(() => {
        formBody.hidden = true;
        successEl.hidden = false;
        successEl.querySelector('h4').focus();
      }, 700);
    })
    .catch(() => restore('Connection error. Please try again, or email me directly.'));
}

function resetContactForm() {
  const page = document.getElementById('page-contact');
  page.querySelector('#form-success').hidden = true;
  page.querySelector('#contact-form-body').hidden = false;
  page.querySelector('#form-error').hidden = true;

  ['#name', '#email', '#subject', '#message'].forEach(s => { page.querySelector(s).value = ''; });
  ['#err-name', '#err-email', '#err-message'].forEach(s => { page.querySelector(s).textContent = ''; });

  const btn = page.querySelector('#send-btn');
  btn.disabled = false;
  btn.classList.remove('is-sent');
  page.querySelector('#send-btn-text').textContent = 'Send message';
  page.querySelector('#name').focus();
}

/* ════════════════════════════════════════════════════════════
   9. GRAPHIQUES — palette Petrol & Sand
   ════════════════════════════════════════════════════════════ */
let chartsInitialized = false;

function initCharts() {
  if (chartsInitialized || typeof Chart === 'undefined') return;
  chartsInitialized = true;

  const CYAN = '#0B7699', SLATE = '#173B4D', SAND = '#B5601F';
  const GRID = '#A9C4D1', TICK = '#4E6D7C', INK = '#0A2634';

  Chart.defaults.font.family = "'Instrument Sans', system-ui, sans-serif";
  Chart.defaults.color = TICK;

  const axis = max => ({
    x: { grid: { color: GRID, drawTicks: false }, border: { color: GRID }, ticks: { color: TICK, font: { size: 12 } } },
    y: { grid: { color: GRID, drawTicks: false }, border: { display: false },
         ticks: { color: TICK, font: { size: 11 }, stepSize: 25 }, min: 0, max: max }
  });

  const bar = (el, labels, data, color) => {
    if (!el) return;
    new Chart(el, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Proficiency (%)', data, backgroundColor: color, borderRadius: 0, borderSkipped: false, maxBarThickness: 46 }] },
      options: {
        responsive: true,
        scales: axis(100),
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: INK, padding: 10, cornerRadius: 0, displayColors: false }
        }
      }
    });
  };

  const radarEl = document.getElementById('radarChart');
  if (radarEl) {
    new Chart(radarEl, {
      type: 'radar',
      data: {
        labels: ['Data Engineering', 'Generative AI', 'Analytics / BI', 'Python / Dev', 'Big Data', 'Databases'],
        datasets: [{
          label: 'Proficiency (%)',
          data: [88, 87, 92, 95, 83, 85],
          backgroundColor: 'rgba(11, 118, 153, 0.16)',
          borderColor: '#0A6A8A',
          borderWidth: 2,
          pointBackgroundColor: SAND,
          pointBorderColor: '#F4F9FB',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { color: GRID },
            grid: { color: GRID },
            pointLabels: { color: SLATE, font: { size: 12, weight: '500' } },
            ticks: { color: TICK, backdropColor: 'transparent', stepSize: 25, font: { size: 10 } },
            suggestedMin: 0, suggestedMax: 100
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: INK, padding: 10, cornerRadius: 0, displayColors: false }
        }
      }
    });
  }

  bar(document.getElementById('barChart1'),
      ['Python', 'SQL', 'Flask', 'Java', 'Django'], [95, 88, 85, 75, 70], CYAN);
  bar(document.getElementById('barChart2'),
      ['Power BI', 'OpenAI', 'Kafka', 'Claude Code', 'PySpark'], [92, 90, 88, 85, 80], SLATE);
}

/* ════════════════════════════════════════════════════════════
   10. RÉVÉLATION AU DÉFILEMENT
   Le contenu est visible par défaut ; l'animation n'est ajoutée
   que si le navigateur la supporte et que l'utilisateur ne l'a
   pas désactivée.
   ════════════════════════════════════════════════════════════ */
const ANIM_SELECTOR = [
  '.sec-hd', '.ab-state', '.ab-band', '.ab-quote', '.exp-item', '.edu-card', '.cert-card',
  '.drives-card', '.skill-cat-card', '.skill-bars-card',
  '.proj-card-v2', '.collab-banner', '.contact-form-card', '.contact-info-card',
  '.avail-card', '.loc-card', '.note-item', '.read-item'
].join(',');

let revealObserver = null;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initReveal() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
}

function revealIn(root) {
  if (!revealObserver) return;
  root.querySelectorAll(ANIM_SELECTOR).forEach((el, i) => {
    el.classList.add('anim-ready');
    el.classList.remove('visible');
    el.style.transitionDelay = Math.min(i, 8) * 0.05 + 's';
    revealObserver.observe(el);
  });
}

/* ── Compteurs du hero ── */
function animateCounters() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll('.hstat-n').forEach(el => {
    const m = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!m) return;
    const target = parseInt(m[1], 10), suffix = m[2];
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 24));
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(id);
    }, 40);
  });
}

/* ════════════════════════════════════════════════════════════
   11. INIT
   ════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyAvailability();
  renderNotes();
  renderReadings();
  initTabs();
  initProjectFilter();
  initReveal();

  document.getElementById('nav-burger').addEventListener('click', toggleMenu);
  document.getElementById('send-btn').addEventListener('click', function () { sendMessage(this); });
  document.getElementById('reset-form-btn').addEventListener('click', resetContactForm);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  window.addEventListener('hashchange', () => showPage(currentHashPage()));
  showPage(currentHashPage(), { silent: true });

  setTimeout(animateCounters, 700);
});
