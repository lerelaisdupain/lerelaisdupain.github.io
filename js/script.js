document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Opening hours per day (0 = Sunday ... 6 = Saturday)
  var hours = {
    0: { open: 7 * 60, close: 12 * 60 },
    1: { open: 6 * 60 + 30, close: 19 * 60 },
    2: { open: 6 * 60 + 30, close: 19 * 60 },
    3: { open: 6 * 60 + 30, close: 19 * 60 },
    4: { open: 6 * 60 + 30, close: 19 * 60 },
    5: { open: 6 * 60 + 30, close: 19 * 60 },
    6: null
  };

  var now = new Date();
  var day = now.getDay();
  var minutesNow = now.getHours() * 60 + now.getMinutes();
  var todaysHours = hours[day];
  var isOpen = !!todaysHours && minutesNow >= todaysHours.open && minutesNow < todaysHours.close;

  var statusEl = document.getElementById('topbar-status');
  if (statusEl) {
    statusEl.textContent = isOpen ? 'Ouvert actuellement' : 'Actuellement fermé';
    statusEl.style.color = isOpen ? '#8fd19e' : '#e3a7a7';
  }

  var todayRow = document.querySelector('#hours-table tr[data-day="' + day + '"]');
  if (todayRow) todayRow.classList.add('today');

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
});
