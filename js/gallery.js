/* =========================================================
   Gulzar Construction — Gallery / Project Filtering
   Pure vanilla JS, no frameworks
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card[data-category]');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter project cards
        projectCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          var matches = filter === 'all' || category === filter;

          if (matches) {
            card.classList.remove('hide');
            // Slight stagger for a polished feel
            requestAnimationFrame(function () {
              card.classList.add('show');
            });
          } else {
            card.classList.remove('show');
            card.classList.add('hide');
          }
        });
      });
    });

    // Initialize: show all cards
    projectCards.forEach(function (card) { card.classList.add('show'); });
  });
})();
