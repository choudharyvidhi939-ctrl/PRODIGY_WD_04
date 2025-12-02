/* script.js - AOS init, portfolio filter, navbar active, contact form */

/* ---------- AOS (Animate On Scroll) Initialization ----------
   Note: Each HTML page includes AOS CDN <link> & <script>.
   This init sets default AOS settings for subtle, smooth animation.
*/
document.addEventListener('DOMContentLoaded', function () {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }
  setActiveNav();
  initPortfolioPage();
  initContactForm();
});

/* Navbar active state */
function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current || (href === '' && current === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });
}

/* ---------- Portfolio data & filter ---------- */
const projects = [
  { title: "FS Practical App", type: "Course", domain: "FS", tech: "React, CSS", link: "#" },
  { title: "Nail Studio Registration", type: "Personal", domain: "DBMS", tech: "PHP, Xampp, HTML", link: "https://choudharyvidhi939-ctrl.github.io/nail-studio-website/" },
  { title: "Online Food Ordering System", type: "Personal", domain: "Software Engineering", tech: "HTML, CSS, JS", link: "https://choudharyvidhi939-ctrl.github.io/online-food-ordering-system/" },
  { title: "Movie Playlist Manager", type: "Personal", domain: "Python", tech: "Python (.py)", link: "#" }
];

function renderProjects(filterValue = "") {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = projects.filter(p => !filterValue || p.domain === filterValue);
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="small-muted">No projects found for this domain.</p>';
    return;
  }
  filtered.forEach(p => {
    const item = document.createElement('div');
    item.className = 'card';
    // use AOS attributes for reveal
    item.setAttribute('data-aos', 'fade-up');
    item.innerHTML = `
      <h3>${escapeHtml(p.title)}</h3>
      <p class="meta"><strong>Tech:</strong> ${escapeHtml(p.tech)}</p>
      <p class="meta">${escapeHtml(p.type)} | ${escapeHtml(p.domain)}</p>
      <a class="view" href="${p.link}" target="_blank" rel="noopener noreferrer">View Project →</a>
    `;
    grid.appendChild(item);
  });
  // refresh AOS to animate newly added DOM nodes
  if (window.AOS) AOS.refresh();
}

function initPortfolioPage() {
  const sel = document.getElementById('domainFilter');
  if (!sel) return;
  sel.addEventListener('change', () => renderProjects(sel.value));
  renderProjects();
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // simple success animation + message
    alert('Thanks! Your message has been submitted.');
    form.reset();
  });
}

/* ---------- small helper ---------- */
function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
