// Правильный синтаксис:
function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Страница не найдена");
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error(error);
            document.getElementById('content').innerHTML = '<h2>Раздел в разработке</h2>';
        });
}

// Обработка кликов по меню
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPage(page);
        history.pushState({ page }, '', `/${page}`);
    });
});

// Загрузка страницы при первом открытии
window.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.pathname.slice(1) || 'home';
    loadPage(initialPage);
});