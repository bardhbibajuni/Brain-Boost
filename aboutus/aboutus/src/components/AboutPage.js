function AboutPage() {
  return (
    <>
    <section class="hero" style={{minHeight: "70vh"}}>
        <div class="hero-container">
            <h1 class="hero-title">
                <span class="hero-nexus">About</span>
                <span class="hero-flow">Brain Boost</span>
            </h1>

            <p class="hero-subtitle">
                Brain Boost is a learning platform built for students who want to sharpen their skills
                through practice, not passive scrolling.
            </p>
        </div>
    </section>

    <section class="features">
        <div class="features-container">
            <div class="section-header">
                <h2 class="section-title">Our Idea</h2>
                <p class="section-subtitle">
                    Learn by doing. Improve by playing.
                </p>
            </div>

            <div class="features-grid">
                <div class="feature-card">
                    <h3>Why Brain Boost?</h3>
                    <p>
                        Traditional learning can feel slow and disconnected.
                        Brain Boost combines short coding courses with brain-training games
                        to keep learning active and engaging.
                    </p>
                </div>

                <div class="feature-card">
                    <h3>Who is it for?</h3>
                    <p>
                        Students, beginners, and anyone who wants to improve logic,
                        focus, and problem-solving skills — especially in tech.
                    </p>
                </div>

                <div class="feature-card">
                    <h3>Our Vision</h3>
                    <p>
                        To create a modern learning experience where education feels
                        interactive, motivating, and actually useful.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="pricing">
        <div class="section-header">
            <h2 class="section-title">Built for the Future</h2>
            <p class="section-subtitle">
                This platform is evolving — games, courses, and features will continue to grow.
            </p>
        </div>

        <div class="stats-container">
            <div class="stats-grid">
                <div class="stat-item">
                    <p>
                        Brain Boost is currently in development and will be rebuilt with modern
                        technologies like React to deliver a smoother and more dynamic experience.
                    </p>
                </div>

                <div class="stat-item">
                    <p>
                        The goal is simple: make learning feel less like a chore
                        and more like something you actually want to come back to.
                    </p>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}

export default AboutPage;
