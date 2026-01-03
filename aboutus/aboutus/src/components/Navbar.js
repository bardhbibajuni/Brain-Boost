function Navbar() {
    return (
        <div>
            <div class="cyber-bg">
                <div class="cyber-gradient"></div>
            </div>
            <div class="orb orb1"></div>
            <div class="orb orb2"></div>
            <div class="orb orb3"></div>
            <div class="grid-overlay">
                <div class="grid-lines"></div>
                <div class="grid-glow"></div>
            </div>
            <div class="scanlines"></div>
            <div class="noise-overlay"></div>

            <nav>
                <div class="nav-container">
                    <ul class="nav-links">
                        <li><a href="index.html#games">Games</a></li>
                        <li><a href="index.html#courses">Courses</a></li>
                        <li><a href="index.html#contact">Apply</a></li>
                    </ul>

                    <a href="index.html" class="logo">Brain Boost</a>

                    <div class="nav-bottom">
                        <a href="index.html#courses" class="btn-secondary">Access Courses</a>
                    </div>

                    <button class="mobile-menu-button" id="mobileMenuBtn">
                        <div class="hamburger"><span></span><span></span><span></span></div>
                    </button>
                </div>
            </nav>

            <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
            <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-menu-header">
                    <a href="index.html" class="mobile-menu-logo">Brain Boost</a>
                    <button class="mobile-menu-close" id="mobileMenuClose">✕</button>
                </div>

                <div class="mobile-menu-cta">
                    <a href="index.html#courses" class="cyber-button">Access Courses</a>
                </div>

                <nav class="mobile-menu-nav">
                    <ul>
                        <li><a href="index.html#games">Games</a></li>
                        <li><a href="index.html#courses">Courses</a></li>
                        <li><a href="index.html#contact">Apply</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
