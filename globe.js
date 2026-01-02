
const tagLinks = {
    JavaScript: 'kurset/javascript.html',
    CSS: 'kurset/css.html',
    HTML: 'kurset/HTML.html',
    C: 'kurset/c.html',
    'C++': 'kurset/c++.html',
    React: 'kurset/Reach.html',
    Python: 'kurset/Python.html',
    Java: 'kurset/Java.html',
    'Node.js': 'kurset/Node.js.html',
    MySQL: 'kurset/MySQL.html',
    jQuery: 'kurset/jQuery.html'
};

const myTags = Object.keys(tagLinks);

if (typeof TagCloud !== 'function') {
    console.error('TagCloud library failed to load.');
}

const instance = TagCloud('.content', myTags, {
    radius: 250,
    maxSpeed: 'fast',
    initSpeed: 'fast',
    direction: 135,
    keep: true
});

const colors = ['#34A853', '#FBBC05', '#4285F4', '#7FBC00', '#FFBA01', '#01A6F0'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
const contentEl = document.querySelector('.content');
if (contentEl) contentEl.style.color = randomColor;

const container = document.querySelector('.content');
if (container) {
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('tagcloud--item')) return;

        const label = target.textContent.trim();
        const url = tagLinks[label];
        if (url) window.open(url, '_blank');
    });
}
