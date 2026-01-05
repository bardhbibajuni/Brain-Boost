

const tagLinks = {
    JavaScript: "kurset/javascript.html",
    CSS: "kurset/css.html",
    HTML: "kurset/HTML.html",
    C: "kurset/c.html",
    "C++": "kurset/c++.html",
    React: "kurset/React.html",
    Python: "kurset/Python.html",
    Java: "kurset/Java.html",
    "Node.js": "kurset/Node.js.html",
    MySQL: "kurset/MySQL.html",
    jQuery: "kurset/jQuery.html",
};

const myTags = Object.keys(tagLinks);

function initTagGlobe() {
    if (typeof TagCloud !== "function") {
        console.warn("TagCloud not available yet.");
        return;
    }

    const host = document.querySelector(".content");
    if (!host) return;

   
    host.innerHTML = "";

    const w = window.innerWidth;

    const maxRadius = w <= 480 ? 110 : w <= 768 ? 130 : 250;

    const containerWidth = host.parentElement?.clientWidth || w;
    const fittedRadius = Math.floor(containerWidth / 2) - 24;

    const radius = Math.max(85, Math.min(maxRadius, fittedRadius));

    TagCloud(".content", myTags, {
        radius,
        maxSpeed: "fast",
        initSpeed: "fast",
        direction: 135,
        keep: true,
    });

    const colors = ["#34A853", "#FBBC05", "#4285F4", "#7FBC00", "#FFBA01", "#01A6F0"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    host.style.color = randomColor;
}

function setupTagClicks() {
    const container = document.querySelector(".content");
    if (!container) return;

    container.addEventListener("click", (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (!target.classList.contains("tagcloud--item")) return;

        const label = target.textContent?.trim();
        if (!label) return;

        const url = tagLinks[label];
        if (url) window.open(url, "_blank");
    });
}


function initializeMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("mobileMenuOverlay");
    const closeBtn = document.getElementById("mobileMenuClose");

    if (!btn || !menu || !overlay || !closeBtn) return;

    const links = menu.querySelectorAll(".mobile-menu-nav a");
    const cta = menu.querySelector(".mobile-menu-cta");
    const ctaButton = menu.querySelector(".mobile-menu-cta a");
    const logo = menu.querySelector(".mobile-menu-logo");

    function openMenu() {
        btn.classList.add("active");
        menu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";

        links.forEach((link, i) => {
            link.style.animation = "none";
            link.style.opacity = "0";
            link.style.transform = "translateX(20px)";
            setTimeout(() => {
                link.style.animation = "slideInLeft 0.4s ease forwards";
            }, 250 + i * 100);
        });

        if (cta) {
            cta.style.animation = "none";
            cta.style.opacity = "0";
            cta.style.transform = "translateY(20px)";
            setTimeout(() => {
                cta.style.animation = "slideInUp 0.4s ease forwards";
            }, 100);
        }
    }

    function closeMenu() {
        btn.classList.remove("active");
        menu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.contains("active") ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });

    overlay.addEventListener("click", closeMenu);
    links.forEach((l) => l.addEventListener("click", closeMenu));
    if (ctaButton) ctaButton.addEventListener("click", closeMenu);
    if (logo) logo.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("active")) closeMenu();
    });

    menu.addEventListener("touchmove", (e) => e.stopPropagation());
}


let mouseTimer = null;
function setupParallaxOrbs() {
    document.addEventListener("mousemove", (e) => {
        if (mouseTimer) return;

        mouseTimer = setTimeout(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            document.querySelectorAll(".orb").forEach((orb, i) => {
                const speed = (i + 1) * 0.02;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });

            mouseTimer = null;
        }, 16);
    });
}

function setupCursorGlow() {
    if (window.innerWidth <= 768) return;

    const cursorGlow = document.createElement("div");
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

    document.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
        cursorGlow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
    });
}


function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href.length <= 1) return;

            e.preventDefault();

            if (href === "#top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function setupNavbarShadow() {
    window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (!nav) return;

        if (window.scrollY > 100) {
            nav.style.background = "rgba(15, 15, 35, 0.95)";
            nav.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.2)";
        } else {
            nav.style.background = "rgba(15, 15, 35, 0.9)";
            nav.style.boxShadow = "none";
        }
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}

function setupButtonHoverGlow() {
    document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
        button.addEventListener("mouseenter", function () {
            this.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.6)";
        });

        button.addEventListener("mouseleave", function () {
            this.style.boxShadow = "";
        });
    });
}

function setupCardGlitchHover() {
    document.querySelectorAll(".feature-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.animation = "glitch1 0.3s ease-in-out";
            setTimeout(() => (this.style.animation = ""), 300);
        });
    });
}


function setupStudentForm() {
    const form = document.getElementById("studentApplicationForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector(".btn-submit");
        if (!submitBtn) return;

        const payload = {
            studentId: document.getElementById("studentId")?.value.trim() || "",
            fullName: document.getElementById("fullName")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            fakulteti: document.getElementById("fakulteti")?.value || "",
            drejtimi: document.getElementById("drejtimi")?.value.trim() || "",
            message: document.getElementById("message")?.value.trim() || "",
        };

        const isValid =
            payload.studentId && payload.fullName && payload.email && payload.fakulteti && payload.drejtimi;

        if (!isValid) {
            submitBtn.style.animation = "glitch1 0.3s ease-in-out";
            setTimeout(() => (submitBtn.style.animation = ""), 350);
            return;
        }

        submitBtn.textContent = "SENDING...";
        submitBtn.style.background = "linear-gradient(135deg, var(--primary-cyan), var(--primary-pink))";

        setTimeout(() => {
            submitBtn.textContent = "APPLICATION SENT";
            submitBtn.style.background = "var(--primary-cyan)";
            form.reset();

            setTimeout(() => {
                submitBtn.textContent = "Submit Application";
                submitBtn.style.background = "";
            }, 3000);
        }, 2000);
    });
}

function setupCustomSelect() {
    const wrapper = document.querySelector('.custom-select[data-target="fakulteti"]');
    const native = document.getElementById("fakulteti");
    if (!wrapper || !native) return;

    const btn = wrapper.querySelector(".custom-select__button");
    const label = wrapper.querySelector(".custom-select__label");
    const menu = wrapper.querySelector(".custom-select__menu");
    if (!btn || !label || !menu) return;

    // Avoid duplicating options if script runs twice
    if (menu.children.length === 0) {
        Array.from(native.options).forEach((opt) => {
            const li = document.createElement("li");
            li.className = "custom-select__option";
            li.tabIndex = 0;
            li.role = "option";
            li.dataset.value = opt.value;
            li.textContent = opt.textContent;

            if (opt.selected) li.setAttribute("aria-selected", "true");
            if (opt.disabled && opt.value === "") {
                li.style.opacity = "0.6";
                li.style.pointerEvents = "none";
            }
            menu.appendChild(li);
        });
    }

    function open() {
        wrapper.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
    }

    function close() {
        wrapper.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
    }

    function selectValue(value, text) {
        native.value = value;
        label.textContent = text;

        menu.querySelectorAll(".custom-select__option").forEach((o) => o.removeAttribute("aria-selected"));
        const active = menu.querySelector(`.custom-select__option[data-value="${CSS.escape(value)}"]`);
        if (active) active.setAttribute("aria-selected", "true");
    }

    const initial = native.options[native.selectedIndex];
    label.textContent = initial && initial.value ? initial.textContent : "Choose a faculty";

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        wrapper.classList.contains("open") ? close() : open();
    });

    menu.addEventListener("click", (e) => {
        const item = e.target.closest(".custom-select__option");
        if (!item) return;
        selectValue(item.dataset.value, item.textContent);
        close();
    });

    menu.addEventListener("keydown", (e) => {
        const items = Array.from(menu.querySelectorAll(".custom-select__option"));
        const current = document.activeElement;
        const idx = items.indexOf(current);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = items[Math.min(idx + 1, items.length - 1)];
            next && next.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = items[Math.max(idx - 1, 0)];
            prev && prev.focus();
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const item = items[idx];
            if (item) {
                selectValue(item.dataset.value, item.textContent);
                close();
                btn.focus();
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            close();
            btn.focus();
        }
    });

    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
}


function boot() {
    initTagGlobe();
    setupTagClicks();

    initializeMobileMenu();
    setupParallaxOrbs();
    setupCursorGlow();

    setupSmoothAnchors();
    setupNavbarShadow();
    setupScrollAnimations();
    setupButtonHoverGlow();
    setupCardGlitchHover();

    setupStudentForm();
    setupCustomSelect();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
} else {
    boot();
}

let globeResizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(globeResizeTimer);
    globeResizeTimer = setTimeout(initTagGlobe, 200);
});
