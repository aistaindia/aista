const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => {
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  if (innerWidth <= 850) {
    links.style.position = 'absolute';
    links.style.top = '68px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '18px';
    links.style.background = '#fff';
    links.style.flexDirection = 'column';
    links.style.boxShadow = '0 15px 30px rgba(0,0,0,.08)';
  }
});

document.querySelector('#membershipForm')?.addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('#formMsg').textContent = 'Thank you. This demo has captured the application fields. We will connect it to the AISTA member database in the next phase.';
});

/* Hero slideshow: cycles through the association's conference photographs. */
(function () {
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length < 2) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
})();

/* V1.7 — shared data loading */
const DATA_BASE = 'data/';
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[char]));

async function loadJson(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}

/* V1.7 — Notices: one data source powers the hero ticker and full Notice Board. */
(async function initNotices() {
  const ticker = document.querySelector('.notice-ticker');
  const track = document.querySelector('#heroNoticeTrack');
  const board = document.querySelector('#noticeBoardGrid');
  if (!ticker || !track || !board) return;

  let notices;
  try {
    notices = await loadJson(`${DATA_BASE}notices.json`);
  } catch (error) {
    track.innerHTML = '<div class="notice-loading">Updates are temporarily unavailable.</div>';
    board.innerHTML = '<article class="notice-board-card"><h3>Notice archive unavailable</h3><p>Please try again later.</p></article>';
    console.error(error);
    return;
  }

  const published = notices.filter(item => item.published !== false);
  if (!published.length) {
    track.innerHTML = '<div class="notice-loading">No published notices yet.</div>';
    board.innerHTML = '<article class="notice-board-card featured"><div class="notice-card-top"><span class="notice-date">NOTICE BOARD</span></div><h3>No notices have been published yet</h3><p>Association-approved circulars and announcements will appear here when they are released.</p></article>';
    return;
  }

  renderHeroNotices(published);
  renderNoticeBoard(published);

  function renderHeroNotices(items) {
    const visibleItems = items.slice(0, Math.min(6, items.length));
    track.innerHTML = visibleItems.map(item => `
      <a class="notice-item" href="${escapeHtml(item.url || '#notice-board')}">
        <span class="notice-badge">${escapeHtml(item.category || 'NOTICE')}</span>
        <div><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.description)}</p></div>
      </a>
    `).join('');

    const tickerItems = [...track.querySelectorAll('.notice-item')];
    if (tickerItems.length < 2) return;

    let index = 0;
    let paused = false;
    let timer = null;
    const pauseBtn = document.querySelector('.ticker-pause');
    const stepHeight = 82;

    const render = animate => {
      track.style.transition = animate ? 'transform 700ms ease' : 'none';
      track.style.transform = `translateY(-${index * stepHeight}px)`;
    };

    const step = () => {
      if (paused) return;
      index += 1;
      render(true);
      if (index === tickerItems.length) {
        window.setTimeout(() => {
          index = 0;
          render(false);
        }, 760);
      }
    };

    const start = () => {
      clearInterval(timer);
      timer = window.setInterval(step, 4200);
    };

    const setPaused = value => {
      paused = value;
      if (pauseBtn) {
        pauseBtn.textContent = paused ? 'Play' : 'Pause';
        pauseBtn.setAttribute('aria-label', paused ? 'Play announcements' : 'Pause announcements');
        pauseBtn.setAttribute('aria-pressed', String(paused));
      }
      if (paused) clearInterval(timer);
      else start();
    };

    pauseBtn?.addEventListener('click', () => setPaused(!paused));
    ticker.addEventListener('mouseenter', () => setPaused(true));
    ticker.addEventListener('mouseleave', () => {
      if (pauseBtn?.getAttribute('aria-pressed') !== 'true') setPaused(false);
    });
    ticker.addEventListener('focusin', () => setPaused(true));
    ticker.addEventListener('focusout', () => {
      if (pauseBtn?.getAttribute('aria-pressed') !== 'true') setPaused(false);
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
    else start();
  }

  function renderNoticeBoard(items) {
    board.innerHTML = items.map((item, index) => `
      <article class="notice-board-card${index === 0 ? ' featured' : ''}">
        <div class="notice-card-top">
          <span class="notice-date">${escapeHtml(item.category || 'NOTICE')}</span>
          <span class="notice-status">${item.status === 'official' ? 'Official' : 'Information'}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        ${item.url ? `<a href="${escapeHtml(item.url)}" class="text-link">View details →</a>` : ''}
      </article>
    `).join('');
  }
})();

/* V1.7 — Conference archive: load the existing JSON archive and add search/year filters. */
(async function initConferenceArchive() {
  const body = document.querySelector('#conferenceTableBody');
  const search = document.querySelector('#conferenceSearch');
  const year = document.querySelector('#conferenceYear');
  const reset = document.querySelector('#conferenceReset');
  const meta = document.querySelector('#conferenceResultMeta');
  if (!body || !search || !year || !reset || !meta) return;

  let conferences;
  try {
    conferences = await loadJson(`${DATA_BASE}conferences.json`);
  } catch (error) {
    body.innerHTML = '<tr><td colspan="3">Conference archive is temporarily unavailable.</td></tr>';
    meta.textContent = 'Unable to load the conference archive.';
    console.error(error);
    return;
  }

  const years = [...new Set(conferences.map(item => item.year))].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
  year.innerHTML = '<option value="all">All years</option>' + years.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const selectedYear = year.value;
    const filtered = conferences.filter(item => {
      const matchesYear = selectedYear === 'all' || String(item.year) === selectedYear;
      const haystack = `${item.conference} ${item.year} ${item.place}`.toLowerCase();
      return matchesYear && (!query || haystack.includes(query));
    });

    body.innerHTML = filtered.length
      ? filtered.map(item => `<tr><td>${escapeHtml(item.conference)}</td><td>${escapeHtml(item.year)}</td><td>${escapeHtml(item.place)}</td></tr>`).join('')
      : '<tr><td colspan="3">No conferences match your search.</td></tr>';

    meta.textContent = `Showing ${filtered.length} of ${conferences.length} conferences`;
  };

  search.addEventListener('input', render);
  year.addEventListener('change', render);
  reset.addEventListener('click', () => {
    search.value = '';
    year.value = 'all';
    render();
    search.focus();
  });

  render();
})();
