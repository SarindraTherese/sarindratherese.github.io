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

  document.querySelectorAll('.proj-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
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

/* ── INIT ON LOAD ── */
document.addEventListener('DOMContentLoaded', () => {
  // Make sure all project cards visible by default
  document.querySelectorAll('.proj-card').forEach(c => {
    c.style.display = 'flex';
  });
});
