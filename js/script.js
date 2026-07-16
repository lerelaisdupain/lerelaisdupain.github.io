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

  var todayRow = document.querySelector('#hours-table li[data-day="' + day + '"]');
  if (todayRow) {
    todayRow.classList.add('today');
    var dayLabel = todayRow.querySelector('.hours-day');
    if (dayLabel) {
      var badge = document.createElement('span');
      badge.className = 'today-badge';
      badge.textContent = "Aujourd'hui";
      dayLabel.appendChild(badge);
    }
  }

  function formatMinutes(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return m === 0 ? h + 'h' : h + 'h' + (m < 10 ? '0' + m : m);
  }

  var dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var hoursStatusEl = document.getElementById('hours-status');
  var hoursStatusText = document.getElementById('hours-status-text');
  if (hoursStatusEl && hoursStatusText) {
    var message;
    if (isOpen) {
      message = 'Ouvert actuellement — ferme à ' + formatMinutes(todaysHours.close);
    } else {
      hoursStatusEl.classList.add('is-closed');
      var found = null;
      for (var i = 1; i <= 7; i++) {
        var d = (day + i) % 7;
        if (hours[d]) { found = { offset: i, day: d }; break; }
      }
      if (todaysHours && minutesNow < todaysHours.open) {
        message = "Fermé actuellement — ouvre aujourd'hui à " + formatMinutes(todaysHours.open);
      } else if (found) {
        var when = found.offset === 1 ? 'demain' : dayNames[found.day] + ' prochain';
        message = 'Fermé actuellement — ouvre ' + when + ' à ' + formatMinutes(hours[found.day].open);
      } else {
        message = 'Actuellement fermé';
      }
    }
    hoursStatusText.textContent = message;
  }

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
