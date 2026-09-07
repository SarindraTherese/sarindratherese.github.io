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
   2. OFF SCREEN — lectures et séances proposées
   ────────────────────────────────────────────────────────────
   Ajouter une entrée = ajouter un objet dans le tableau.
   Aucun HTML à toucher. Les entrées s'affichent dans l'ordre
   du tableau — mets la plus récente en premier.

   READINGS — un livre, et ce que tu en retiens.
   Les livres se regroupent tout seuls par année, la plus récente
   en haut. Une entrée sans `year` part dans « En cours de lecture ».
     { year: 2023,
       title: '...', author: '...', kind: 'Livre',   // Livre | Essai | Article
       note: 'Ce que j\'en retiens, en une phrase ou deux.',
       url: 'https://...' }        // facultatif

   OFFERINGS — une séance ou un accompagnement que tu proposes :
     { name: 'Lecture numérologique',
       format: 'Visio',            // Visio | Sur place | Écrit
       length: '60 min',
       summary: 'Ce que la personne en retire.',
       tags: ['Numérologie'],
       url: 'https://...' }        // lien de réservation, facultatif

   ⚠ Tant que ces tableaux sont vides, la page affiche un état
   d'attente. Ajoute au moins une entrée dans chacun avant de
   publier.
   ════════════════════════════════════════════════════════════ */
const READINGS = [
  // { year: 2023, title: '…', author: '…', kind: 'Livre', note: '…' },
];

/* ════════════════════════════════════════════════════════════
   3. LECTURE INTÉGRALE DE LA BIBLE — 31 jan → 7 juin 2025
   ────────────────────────────────────────────────────────────
   Relevé tel qu'il a été tenu. `date: null` = entrée non datée.
   Tout le reste (durée, trame des 127 jours, journées actives,
   pauses, densités) est calculé à partir de ce tableau : rien
   n'est écrit en dur dans la page.
   ════════════════════════════════════════════════════════════ */
const BIBLE = {
  edition: 'Bible de Jérusalem',
  start:   '2025-01-31',
  end:     '2025-06-07',
  entries: [
    ['Jean 1, 2 et 3', null],       ['Saint Mathieu', '2025-02-09'],
    ['Saint Marc', '2025-02-10'],   ['Saint Luc', '2025-02-18'],
    ['Saint Jean', '2025-02-25'],   ['Actes des apôtres', '2025-03-07'],
    ['Genèse', '2025-03-15'],       ['Exode', '2025-03-20'],
    ['Job', '2025-03-25'],          ['Lévitique', '2025-04-13'],
    ['Nombres', '2025-04-16'],      ['Deutéronome', '2025-04-22'],
    ['Josué', '2025-04-24'],        ['Juges', '2025-04-26'],
    ['Ruth', '2025-04-27'],         ['Samuel', '2025-04-30'],
    ['Rois 1, 2', '2025-05-06'],    ['Amos', '2025-05-07'],
    ['Osée', '2025-05-07'],         ['Michée', '2025-05-07'],
    ['Abdias', '2025-05-08'],       ['Jonas', '2025-05-08'],
    ['Nahum', '2025-05-08'],        ['Joël', '2025-05-08'],
    ['Habaquq', '2025-05-08'],      ['Sophonie', '2025-05-08'],
    ['Aggée', '2025-05-09'],        ['Zacharie', '2025-05-09'],
    ['Malachie', '2025-05-09'],     ['Les lamentations', '2025-05-09'],
    ['Les chroniques', '2025-05-11'],['Daniel', '2025-05-13'],
    ['Isaïe', '2025-05-16'],        ['Tobie', '2025-05-17'],
    ['Judith', '2025-05-19'],       ['Jérémie', '2025-05-21'],
    ['Baruch', '2025-05-23'],       ['Esther', '2025-05-24'],
    ['Ézéchiel', '2025-05-27'],     ['Esdras', '2025-05-27'],
    ['Néhémie', '2025-05-28'],      ['Ecclésiaste', '2025-05-29'],
    ['Cantique des cantiques', '2025-05-29'], ['Sagesse', '2025-05-30'],
    ['Maccabées', '2025-05-31'],    ['Romains', '2025-06-01'],
    ['Proverbes', '2025-06-02'],    ['Corinthiens', '2025-06-02'],
    ['Galates', '2025-06-03'],      ['Éphésiens', '2025-06-04'],
    ['Philippiens', '2025-06-04'],  ['Colossiens', '2025-06-04'],
    ['Thessaloniciens', '2025-06-04'], ['Psaumes', '2025-06-05'],
    ['Timothée', '2025-06-05'],     ['Tite', '2025-06-05'],
    ['Philémon', '2025-06-05'],     ['Hébreux', '2025-06-05'],
    ['Jacques', '2025-06-05'],      ['Pierre', '2025-06-05'],
    ['Jude', '2025-06-06'],         ['Apocalypse', '2025-06-06'],
    ['Ecclésiastique', '2025-06-07']
  ]
};

const OFFERINGS = [
  // { name: '…', format: 'Visio', length: '60 min', summary: '…', tags: ['Numérologie'] },
];

/* ════════════════════════════════════════════════════════════
   3. NAVIGATION — routage par ancre, liens partageables
   ════════════════════════════════════════════════════════════ */
const GA_MEASUREMENT_ID = 'G-T01M8EW56C';
const PAGES = ['home', 'about', 'projects', 'skills', 'refuge', 'bible', 'contact'];
const PAGE_TITLES = { home: 'Home', about: 'About', projects: 'Projects',
  skills: 'Skills', refuge: "Sarindra's Refuge", bible: '127 jours', contact: 'Contact' };
/* Les sujets du Refuge sont des pages à part ; la barre de navigation
   doit rester allumée sur le Refuge quand on les lit. */
const PAGE_PARENT = { bible: 'refuge' };

function trackVirtualPageView(id) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: id === 'home' ? '/' : '/' + id,
    page_title: 'Sarindra Therese — ' + (PAGE_TITLES[id] || id)
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
    a.classList.toggle('active', a.getAttribute('href') === '#' + (PAGE_PARENT[id] || id));
    a.removeAttribute('aria-current');
    if (a.classList.contains('active')) a.setAttribute('aria-current', 'page');
  });

  closeMenu();
  document.title = (id === 'home' ? '' : (PAGE_TITLES[id] || id) + ' — ')
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

/* Ouvre un onglet par son identifiant — utilisé par les liens [data-goto-tab]. */
function activateTab(tabId) {
  const btn = document.querySelector('.stab[data-tab="' + tabId + '"]');
  if (btn) btn.click();
}

function initTabLinks() {
  document.querySelectorAll('[data-goto-tab]').forEach(link => {
    link.addEventListener('click', () => {
      // le changement de hash déclenche showPage ; on bascule l'onglet juste après
      setTimeout(() => activateTab(link.dataset.gotoTab), 0);
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
   6. OFF SCREEN — rendu
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

function renderOfferings() {
  const host = document.getElementById('offer-list');
  if (!host) return;

  if (!OFFERINGS.length) {
    host.innerHTML = emptyState('i-compass', 'Les séances, bientôt',
      'Je mets en forme ce que je veux proposer ici, à côté du travail data. Le détail et la façon de réserver arriveront sur cette page.');
    return;
  }

  host.innerHTML = OFFERINGS.map(o => {
    const meta = [o.format, o.length].filter(Boolean).join(' · ');
    const tags = (o.tags || []).map(t => '<span class="ptag">' + esc(t) + '</span>').join('');
    const link = o.url
      ? '<span class="offer-more">Book <svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-ur"/></svg></span>'
      : '';
    const inner =
        '<div class="offer-meta">' + esc(meta) + '</div>'
      + '<div class="offer-main">'
      +   '<h3 class="offer-title">' + esc(o.name) + '</h3>'
      +   '<p class="offer-summary">' + esc(o.summary || '') + '</p>'
      +   (tags || link ? '<div class="offer-foot">' + tags + link + '</div>' : '')
      + '</div>';
    return o.url
      ? '<a class="offer-item" href="' + esc(o.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<article class="offer-item">' + inner + '</article>';
  }).join('');
}

function readingItem(r) {
  const inner =
      '<div class="read-kind">' + esc(r.kind || 'Livre') + '</div>'
    + '<div class="read-main">'
    +   '<h3 class="read-title">' + esc(r.title) + '</h3>'
    +   (r.author ? '<p class="read-author">' + esc(r.author) + '</p>' : '')
    +   (r.note ? '<p class="read-note">' + esc(r.note) + '</p>' : '')
    + '</div>';
  return r.url
    ? '<a class="read-item" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
    : '<article class="read-item">' + inner + '</article>';
}

function readingGroup(label, books) {
  const n = books.length;
  return '<section class="read-group">'
    + '<header class="read-year"><h3>' + esc(label) + '</h3>'
    + '<span>' + n + (n > 1 ? ' livres' : ' livre') + '</span></header>'
    + books.map(readingItem).join('')
    + '</section>';
}

/* ════════════════════════════════════════════════════════════
   SUJETS DU REFUGE
   ────────────────────────────────────────────────────────────
   Un sujet = une entrée ici. Deux façons de le relier :
     page: 'bible'          → une page interne (#bible)
     url:  'https://…'      → un texte publié ailleurs
   ════════════════════════════════════════════════════════════ */
const TOPICS = [
  {
    kicker: 'Lecture',
    date:   'Juin 2025',
    title:  'J’ai lu la Bible en 127 jours',
    dek:    'Soixante-trois entrées, trente-neuf journées où un livre s’achève, et un silence de dix-neuf jours. Ce que le relevé montre vraiment derrière le chiffre.',
    stats:  ['127 jours', '63 entrées', '39 journées de lecture'],
    page:   'bible'
  }
];

function renderTopics() {
  const host = document.getElementById('topics');
  if (!host) return;
  if (!TOPICS.length) {
    host.innerHTML = emptyState('i-pen', 'Rien pour l’instant',
      'C’est ici que viendront les textes plus longs.');
    return;
  }
  host.innerHTML = TOPICS.map(t => {
    const external = !t.page && t.url;
    const href = t.page ? '#' + t.page : (t.url || '#');
    const stats = (t.stats || []).map(x => '<span>' + esc(x) + '</span>').join('');
    return '<a class="topic" href="' + esc(href) + '"'
      + (external ? ' target="_blank" rel="noopener"' : '') + '>'
      + '<p class="topic-meta">' + esc(t.kicker || '') + (t.date ? ' · ' + esc(t.date) : '') + '</p>'
      + '<h3 class="topic-title">' + esc(t.title) + '</h3>'
      + '<p class="topic-dek">' + esc(t.dek || '') + '</p>'
      + '<div class="topic-foot"><div class="topic-stats">' + stats + '</div>'
      + '<span class="topic-go">' + 'Lire'
      + '<svg class="icon icon-sm" aria-hidden="true"><use href="#i-arrow-'
      + (external ? 'ur' : 'right') + '"/></svg></span></div></a>';
  }).join('');
}

/* ── Lecture intégrale : trame des 127 jours + relevé ── */
const FR_MONTHS = ['janvier','février','mars','avril','mai','juin',
  'juillet','août','septembre','octobre','novembre','décembre'];

function dayKey(d) { return d.toISOString().slice(0, 10); }
function parseDay(s) { return new Date(s + 'T00:00:00Z'); }

function bibleStats() {
  const start = parseDay(BIBLE.start), end = parseDay(BIBLE.end);
  const byDay = new Map();
  BIBLE.entries.forEach(([name, d]) => {
    if (!d) return;
    if (!byDay.has(d)) byDay.set(d, []);
    byDay.get(d).push(name);
  });
  const days = [...byDay.keys()].sort();
  let longest = { gap: 0, from: null, to: null };
  for (let i = 1; i < days.length; i++) {
    const gap = Math.round((parseDay(days[i]) - parseDay(days[i - 1])) / 864e5);
    if (gap > longest.gap) longest = { gap, from: days[i - 1], to: days[i] };
  }
  const gridStart = new Date(start.getTime() + 864e5);   // jour 1 = lendemain du départ
  return {
    start, end, gridStart, byDay,
    total: Math.round((end - start) / 864e5),
    entries: BIBLE.entries.length,
    activeDays: byDay.size,
    longest
  };
}

function renderBible() {
  const gridHost = document.getElementById('bible-grid');
  if (!gridHost) return;
  const st = bibleStats();

  /* Les chiffres annoncés sont calculés, jamais écrits en dur. */
  const facts = document.getElementById('bible-facts');
  if (facts) facts.innerHTML = [
    [st.entries, 'entrées au relevé'],
    [st.activeDays, 'journées où un livre s’achève'],
    [st.longest.gap, 'jours, la plus longue pause']
  ].map(([n, label]) => '<li><b>' + n + '</b> ' + esc(label) + '</li>').join('');

  /* Trame : une ligne par mois, une colonne par quantième. */
  const rows = [];
  const cur = new Date(Date.UTC(st.gridStart.getUTCFullYear(), st.gridStart.getUTCMonth(), 1));
  while (cur <= st.end) {
    const y = cur.getUTCFullYear(), m = cur.getUTCMonth();
    const len = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    let cells = '';
    for (let day = 1; day <= 31; day++) {
      if (day > len) { cells += '<i class="bcell void"></i>'; continue; }
      const d = new Date(Date.UTC(y, m, day));
      if (d < st.gridStart || d > st.end) { cells += '<i class="bcell out"></i>'; continue; }
      const key = dayKey(d);
      const books = st.byDay.get(key) || [];
      const lvl = books.length === 0 ? 0 : books.length === 1 ? 1 : books.length <= 3 ? 2 : 3;
      const label = day + ' ' + FR_MONTHS[m] + ' — ' + (books.length
        ? books.join(', ')
        : 'rien d’achevé');
      cells += '<i class="bcell l' + lvl + '" title="' + esc(label) + '"></i>';
    }
    rows.push('<div class="brow"><span class="bmonth">' + FR_MONTHS[m].slice(0, 3)
      + '</span><div class="bdays">' + cells + '</div></div>');
    cur.setUTCMonth(m + 1);
  }
  gridHost.innerHTML = rows.join('');

  /* Relevé complet, par ordre chronologique. */
  const log = document.getElementById('bible-log');
  if (!log) return;
  const undated = BIBLE.entries.filter(e => !e[1]);
  const dated = BIBLE.entries.filter(e => e[1]).sort((a, b) => a[1] < b[1] ? -1 : 1);
  const groups = new Map();
  dated.forEach(([name, d]) => {
    const key = d.slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push([name, d]);
  });
  const row = ([name, d]) => '<div class="blogrow"><span>' + esc(name) + '</span><span>'
    + (d ? Number(d.slice(8)) + ' ' + FR_MONTHS[Number(d.slice(5, 7)) - 1] : 'date non relevée')
    + '</span></div>';
  log.innerHTML =
      (undated.length ? '<div class="blogmonth"><h4>Sans date <span>1</span></h4>'
        + undated.map(row).join('') + '</div>' : '')
    + [...groups].map(([key, items]) => '<div class="blogmonth"><h4>'
        + FR_MONTHS[Number(key.slice(5)) - 1] + ' <span>' + items.length + '</span></h4>'
        + items.map(row).join('') + '</div>').join('');
}

function renderReadings() {
  const host = document.getElementById('read-list');
  if (!host) return;

  if (!READINGS.length) {
    host.innerHTML = emptyState('i-book', 'L’étagère se remplit encore',
      'Je lis bien plus que je n’en écris. Je reconstitue le relevé année par année — ce que j’ai lu, et la chose que j’en ai retenue.');
    return;
  }

  const undated = READINGS.filter(r => !r.year);
  const years = [...new Set(READINGS.map(r => r.year).filter(Boolean))].sort((a, b) => b - a);

  host.innerHTML =
      (undated.length ? readingGroup('En cours de lecture', undated) : '')
    + years.map(y => readingGroup(String(y), READINGS.filter(r => r.year === y))).join('');
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
  '.avail-card', '.loc-card', '.offer-item', '.read-item', '.topic'
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
  renderReadings();
  renderOfferings();
  renderTopics();
  renderBible();
  initTabs();
  initTabLinks();
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
