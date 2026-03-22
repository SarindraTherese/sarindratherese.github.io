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

  document.querySelectorAll('.proj-card').forEach((card, i) => {
    const show = cat === 'all' || card.dataset.cat === cat;
    if (show) {
      card.style.display = 'flex';
      // reset puis re-trigger l'animation
      card.classList.remove('visible');
      card.style.transitionDelay = (i * 0.07) + 's';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => card.classList.add('visible'));
      });
    } else {
      card.classList.remove('visible');
      setTimeout(() => { card.style.display = 'none'; }, 350);
    }
  });
}

/* ── CONTACT FORM ── */
function sendMessage() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  // Build mailto link
  const mailto = `mailto:randriambelosonsarindratherese@gmail.com`
    + `?subject=${encodeURIComponent(subject || 'Contact depuis portfolio')}`
    + `&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

  window.location.href = mailto;
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

  // Project cards — use their own animation class to preserve display:flex
  document.querySelectorAll('.proj-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
    // anim-ready is handled via CSS .proj-card.anim-ready
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
