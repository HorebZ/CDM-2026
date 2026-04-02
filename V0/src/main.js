import './style.css';
import { OPENING_MATCH_DATE, TROPHY_COLORED } from './config/site.js';
import { NATIONS } from './data/nations.js';
import trophyIcon from '../2026_FIFA_World_Cup.svg';

const FLAG_CDN = (code) =>
  `https://flagcdn.com/h240/${code.toLowerCase()}.png`;

// ── Compteur ────────────────────────────────────────────────

function getDaysRemaining() {
  const now = new Date();
  const diffMs = OPENING_MATCH_DATE - now;
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

// ── Rendu hero ──────────────────────────────────────────────

function renderHero(container) {
  const hero = document.createElement('section');
  hero.className = 'hero';

  const card = document.createElement('div');
  card.className = `hero-card${TROPHY_COLORED ? ' trophy-active' : ''}`;

  const trophyWrap = document.createElement('div');
  trophyWrap.className = 'trophy-wrap';
  trophyWrap.setAttribute('aria-label', 'Coupe du monde FIFA');

  const trophyImg = document.createElement('img');
  trophyImg.src = trophyIcon;
  trophyImg.alt = 'Coupe du monde FIFA 2026';
  trophyWrap.appendChild(trophyImg);

  const counter = document.createElement('div');
  counter.className = 'counter';

  const daysGroupEl = document.createElement('div');
  daysGroupEl.className = 'counter-days';

  const daysEl = document.createElement('span');
  daysEl.className = 'counter-value';
  daysEl.id = 'days-value';
  daysEl.textContent = getDaysRemaining();

  const labelEl = document.createElement('span');
  labelEl.className = 'counter-label';
  labelEl.textContent = 'JOURS';

  daysGroupEl.appendChild(daysEl);
  daysGroupEl.appendChild(labelEl);
  counter.appendChild(daysGroupEl);
  card.appendChild(trophyWrap);
  card.appendChild(counter);
  hero.appendChild(card);
  container.appendChild(hero);

  // Mise à jour quotidienne
  setInterval(() => {
    daysEl.textContent = getDaysRemaining();
  }, 60 * 1000);
}

// ── Rendu grille drapeaux ────────────────────────────────────

function renderFlags(container) {
  const section = document.createElement('section');
  section.className = 'flags-section';
  section.setAttribute('aria-label', '48 nations qualifiées CDM 2026');

  const grid = document.createElement('div');
  grid.className = 'flags-grid';

  for (const nation of NATIONS) {
    const badge = document.createElement('div');
    badge.className = `flag-badge${nation.enabled ? ' is-active' : ''}`;
    badge.title = nation.name;

    const img = document.createElement('img');
    img.src = FLAG_CDN(nation.code);
    img.alt = nation.name;
    img.width = 80;
    img.height = 60;
    img.loading = 'lazy';

    badge.appendChild(img);
    grid.appendChild(badge);
  }

  section.appendChild(grid);
  container.appendChild(section);
}

// ── Bootstrap ────────────────────────────────────────────────

const app = document.getElementById('app');
const shell = document.createElement('main');
shell.className = 'layout-shell';

renderHero(shell);
renderFlags(shell);

app.appendChild(shell);
