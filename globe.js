
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

function initializeMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('mobileMenuClose');
    const links = document.querySelectorAll('.mobile-menu-nav a');
    const cta = document.querySelector('.mobile-menu-cta');
    const ctaButton = document.querySelector('.mobile-menu-cta a');
    const logo = document.querySelector('.mobile-menu-logo');

    if (!btn || !menu || !overlay || !closeBtn) return;

    function openMenu() {
        btn.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        links.forEach((link, i) => {
            link.style.animation = 'none';
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
            setTimeout(() => {
                link.style.animation = 'slideInLeft 0.4s ease forwards';
            }, 250 + i * 100);
        });

        if (cta) {
            cta.style.animation = 'none';
            cta.style.opacity = '0';
            cta.style.transform = 'translateY(20px)';
            setTimeout(() => {
                cta.style.animation = 'slideInUp 0.4s ease forwards';
            }, 100);
        }
    }

    function closeMenu() {
        btn.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.contains('active') ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });

    overlay.addEventListener('click', () => closeMenu());
    links.forEach((l) => l.addEventListener('click', () => closeMenu()));
    if (ctaButton) ctaButton.addEventListener('click', () => closeMenu());
    if (logo) logo.addEventListener('click', () => closeMenu());

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
    });

    menu.addEventListener('touchmove', (e) => e.stopPropagation());
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileMenu);
} else {
    initializeMobileMenu();
}


let mouseTimer;
document.addEventListener('mousemove', (e) => {
    if (!mouseTimer) {
        mouseTimer = setTimeout(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            document.querySelectorAll('.orb').forEach((orb, i) => {
                const speed = (i + 1) * 0.02;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });

            mouseTimer = null;
        }, 16);
    }
});

if (window.innerWidth > 768) {
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.length <= 1) return;

        e.preventDefault();

        if (href === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 15, 35, 0.95)';
        nav.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.2)';
    } else {
        nav.style.background = 'rgba(15, 15, 35, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

document.querySelectorAll('.btn-primary, .btn-secondary').forEach((button) => {
    button.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
    });
    button.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
    });
});

document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.animation = 'glitch1 0.3s ease-in-out';
        setTimeout(() => (this.style.animation = ''), 300);
    });
});
