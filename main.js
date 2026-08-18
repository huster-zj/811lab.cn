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

    var hardwareFilterButtons = Array.from(document.querySelectorAll('[data-hardware-filter]'));
    var hardwareSearch = document.querySelector('[data-hardware-search]');
    var hardwareGrid = document.querySelector('[data-hardware-grid]');
    var hardwareCategories = Array.from(document.querySelectorAll('[data-hardware-category]'));
    var hardwareCount = document.querySelector('[data-hardware-visible-count]');
    var hardwareEmpty = document.querySelector('[data-hardware-empty]');

    if (hardwareGrid && hardwareCategories.length) {
        var primaryColumn = document.createElement('div');
        var secondaryColumn = document.createElement('div');
        primaryColumn.className = 'hardware-column hardware-column-primary';
        secondaryColumn.className = 'hardware-column hardware-column-secondary';

        hardwareCategories.forEach(function (category) {
            var primary = category.dataset.hardwareCategory === '嵌入式开发板' || category.dataset.hardwareCategory === '电子仪器';
            (primary ? primaryColumn : secondaryColumn).appendChild(category);
        });
        hardwareGrid.append(primaryColumn, secondaryColumn);
    }

    function updateHardwareCatalog() {
        var activeFilter = document.querySelector('[data-hardware-filter].is-active');
        var filter = activeFilter ? activeFilter.dataset.hardwareFilter : 'all';
        var query = hardwareSearch ? hardwareSearch.value.trim().toLocaleLowerCase() : '';
        var visible = 0;
        var visibleByColumn = { primary: 0, secondary: 0 };

        hardwareCategories.forEach(function (category) {
            var categoryMatches = filter === 'all' || category.dataset.hardwareCategory === filter;
            var categoryVisible = 0;
            category.querySelectorAll('.hardware-item').forEach(function (item) {
                var matchesSearch = !query || item.dataset.hardwareSearch.toLocaleLowerCase().includes(query);
                var isVisible = categoryMatches && matchesSearch;
                item.classList.toggle('is-hidden', !isVisible);
                if (isVisible) {
                    categoryVisible += 1;
                    visible += 1;
                    visibleByColumn[category.parentElement.classList.contains('hardware-column-primary') ? 'primary' : 'secondary'] += 1;
                }
            });
            category.classList.toggle('is-hidden', categoryVisible === 0);
        });

        if (hardwareGrid) hardwareGrid.classList.toggle('is-single-column', visibleByColumn.primary === 0 || visibleByColumn.secondary === 0);
        if (hardwareCount) hardwareCount.textContent = visible;
        if (hardwareEmpty) hardwareEmpty.hidden = visible > 0;
    }

    hardwareFilterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            hardwareFilterButtons.forEach(function (item) {
                var active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            updateHardwareCatalog();
        });
    });

    if (hardwareSearch) hardwareSearch.addEventListener('input', updateHardwareCatalog);
})();
