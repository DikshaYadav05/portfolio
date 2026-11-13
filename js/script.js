/* ==========================================================================
   Diksha Yadav – Portfolio script (Vanilla JavaScript)
   Each feature is a small function. If an element is missing, the function
   simply does nothing, so the page never breaks.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme (light / dark) ---------- */
  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function apply(theme) {
      root.setAttribute('data-theme', theme);
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'dark' ? '#0A1814' : '#0F5C47');
    }

    apply(root.getAttribute('data-theme') || 'light');

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage may be blocked */ }
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close the menu after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Close with the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    // Reset when the window becomes wide again
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) setOpen(false);
    });
  }

  /* ---------- Highlight the current section in the menu ---------- */
  function initScrollSpy() {
    var links = document.querySelectorAll('.nav-link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      if (id) map[id] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('active'); l.removeAttribute('aria-current'); });
        var active = map[entry.target.id];
        if (active) { active.classList.add('active'); active.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Gentle reveal when sections scroll into view ---------- */
  function initReveal() {
    var targets = document.querySelectorAll('.section .container');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) return; // content stays visible
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to top button ---------- */
  function initBackToTop() {
    var btn = document.getElementById('to-top');
    if (!btn) return;

    function toggle() { btn.hidden = window.scrollY < 600; }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Small message at the bottom of the screen ---------- */
  var toastTimer;
  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 4000);
  }

  /* ---------- Resume download ----------
     If resume.pdf has not been uploaded yet, show a clear message instead of
     a broken "404" page. Once you add the file, the download works normally. */
  function initResume() {
    var btn = document.getElementById('resume-btn');
    if (!btn || !window.fetch) return;

    btn.addEventListener('click', function (e) {
      // Opening the page straight from a folder (file://) cannot be checked, so let it through.
      if (location.protocol === 'file:') return;

      e.preventDefault();
      var url = btn.getAttribute('href');

      fetch(url, { method: 'HEAD' })
        .then(function (res) {
          if (res.ok) {
            var a = document.createElement('a');
            a.href = url;
            a.download = btn.getAttribute('download') || 'resume.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            showToast('Resume is not uploaded yet. Please check back soon.');
          }
        })
        .catch(function () {
          showToast('Could not download the resume. Please try again.');
        });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Start everything ---------- */
  initTheme();
  initNav();
  initScrollSpy();
  initReveal();
  initBackToTop();
  initResume();
  initYear();
})();
