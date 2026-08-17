(function () {
    'use strict';

    var header = document.querySelector('[data-header]');
    var navLinks = Array.from(document.querySelectorAll('.main-nav a'));
    var sections = Array.from(document.querySelectorAll('[data-section]'));

    function updateHeader() {
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (link) {
                    link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
        sections.forEach(function (section) { observer.observe(section); });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            var targetId = link.getAttribute('href');
            var target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            var offset = (header ? header.offsetHeight : 0) + 18;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
            history.replaceState(null, '', targetId);
        });
    });

    var filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    var cards = Array.from(document.querySelectorAll('.journal-card'));
    var emptyState = document.querySelector('[data-empty-state]');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var filter = button.dataset.filter;
            filterButtons.forEach(function (item) {
                var active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            var visibleCount = 0;
            cards.forEach(function (card) {
                var visible = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('is-hidden', !visible);
                if (visible) visibleCount += 1;
            });
            if (emptyState) emptyState.hidden = visibleCount > 0;
        });
    });

    var bookFilterButtons = Array.from(document.querySelectorAll('[data-book-filter]'));
    var bookSearch = document.querySelector('[data-book-search]');
    var bookEntries = Array.from(document.querySelectorAll('[data-book-category]'));
    var bookCount = document.querySelector('[data-book-visible-count]');
    var bookEmpty = document.querySelector('[data-book-empty]');

    function updateBookCatalog() {
        var activeFilter = document.querySelector('[data-book-filter].is-active');
        var filter = activeFilter ? activeFilter.dataset.bookFilter : 'all';
        var query = bookSearch ? bookSearch.value.trim().toLocaleLowerCase() : '';
        var visible = 0;

        bookEntries.forEach(function (entry) {
            var matchesCategory = filter === 'all' || entry.dataset.bookCategory === filter;
            var matchesSearch = !query || entry.dataset.bookSearch.toLocaleLowerCase().includes(query);
            var isVisible = matchesCategory && matchesSearch;
            entry.classList.toggle('is-hidden', !isVisible);
            if (isVisible) visible += 1;
        });

        if (bookCount) bookCount.textContent = visible;
        if (bookEmpty) bookEmpty.hidden = visible > 0;
    }

    bookFilterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            bookFilterButtons.forEach(function (item) {
                item.classList.toggle('is-active', item === button);
            });
            updateBookCatalog();
        });
    });

    if (bookSearch) bookSearch.addEventListener('input', updateBookCatalog);
})();
