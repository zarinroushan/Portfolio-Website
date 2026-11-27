
"use client";

import { useCallback, useEffect, useState } from "react";

const sections = ["projects", "about", "journey", "learning", "contact"];

const projects = [
  {
    number: "01",
    name: "UniGigs",
    type: "STUDENT FREELANCE MARKETPLACE",
    description:
      "A platform designed to connect students with freelance opportunities and help them find ways to put their skills into practice.",
    stack: "Full-stack Development",
    status: "FEATURED PROJECT",
  },
  {
    number: "02",
    name: "ClutchVision",
    type: "IPL CRICKET ANALYTICS",
    description:
      "A cricket analytics project exploring IPL data, match insights and ways to make sports statistics more interactive.",
    stack: "Data Analytics · Visualisation",
    status: "FEATURED PROJECT",
  },
  {
    number: "03",
    name: "Campus Energy Consumption Analytics",
    type: "DATA ANALYTICS",
    description:
      "An analysis of campus energy consumption data, exploring patterns and insights through data analysis and visualisation.",
    stack: "R · Data Analytics",
    status: "FEATURED PROJECT",
  },
];

export default function Home() {
  const [exploring, setExploring] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("zarin-world-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("zarin-world-theme", nextTheme);
  }, [theme]);

  const goToSection = useCallback((index: number) => {
    const safeIndex = Math.max(0, Math.min(index, sections.length - 1));
    const target = document.getElementById(sections[safeIndex]);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    target?.scrollIntoView({
      behavior,
      block: "start",
    });

    setActiveSection(safeIndex);
    window.history.replaceState(null, "", `#${sections[safeIndex]}`);
  }, []);

  const startExploring = useCallback(() => {
    if (exploring) return;

    setExploring(true);
    setActiveSection(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("projects")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", "#projects");
      });
    });
  }, [exploring]);

  const returnHome = useCallback(() => {
    setExploring(false);
    setActiveSection(0);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }, []);

  // Lock scrolling until the visitor chooses to explore.
  useEffect(() => {
    document.body.style.overflow = exploring ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [exploring]);

  // Keyboard navigation.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      if (!exploring && key === "enter") {
        event.preventDefault();
        startExploring();
        return;
      }

      if (!exploring) return;

      if (key === "escape" || key === "home") {
        event.preventDefault();
        returnHome();
      }

      if (key === "pageup") {
        event.preventDefault();
        goToSection(activeSection - 1);
      }

      if (key === "pagedown") {
        event.preventDefault();
        goToSection(activeSection + 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [exploring, activeSection, startExploring, returnHome, goToSection]);

  // Update the active section while scrolling.
  useEffect(() => {
    if (!exploring) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveSection(index);
              window.history.replaceState(null, "", `#${entry.target.id}`);
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [exploring]);

  return (
    <main className={`world ${exploring ? "is-exploring" : "is-home"}`}>
      <div className="botanical-frame" aria-hidden="true">
        <img className="botanical-branch botanical-branch-left" src="/assets/botanical/vine-left.png" alt="" />
        <img className="botanical-branch botanical-branch-right" src="/assets/botanical/vine-right.png" alt="" />
      </div>
      <div className="scanlines" aria-hidden="true" />

      <header className="top-bar">
        <button className="logo" onClick={returnHome} aria-label="Return home">
          zarin<span>.world</span>
        </button>

        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
          {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
        </button>
      </header>

      {/* LANDING SCREEN */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">

            <h1>
              Hi! I am <span>Zarin.</span>
            </h1>

            <p className="intro-description">
              A curious mind building things for the digital world.
            </p>

            <p className="terminal-message">
              <span>&gt;</span> PRESS ENTER TO EXPLORE
              <span className="cursor">_</span>
            </p>

            <p className="hero-hint">or CLICK TO EXPLORE ⤵</p>

            <button className="explore-button" onClick={startExploring}>
              EXPLORE MY WORLD <span>→</span>
            </button>
          </div>

          <div className="ascii-portrait">
            <img
              src="/assets/portrait/zarin-ascii-preview.png"
              alt="ASCII art portrait of Zarin"
            />
          </div>
        </div>

        {/* PIXEL ART ENVIRONMENT */}
        <div className="forest-edge" aria-hidden="true">
          <img
            className="environment-tree"
            src="/assets/environment/tree.png"
            alt=""
          />
          <img
            className="environment-grass"
            src="/assets/environment/grass-platform.png"
            alt=""
          />
          <img
            className="environment-flower"
            src="/assets/environment/flower.png"
            alt=""
          />
        </div>

      </section>

      {/* EVERYTHING BELOW THIS POINT APPEARS AFTER EXPLORING */}
      {exploring && (
        <>
          <nav className="world-nav" aria-label="World navigation">
            <button onClick={returnHome}>← HOME</button>
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
              {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
            </button>
          </nav>

          {/* PROJECTS */}
          <section id="projects" className="content-section">
            <div className="section-inner">
              <p className="section-label">01 / THINGS I&apos;VE BUILT</p>
              <h2>
                Selected projects<span>.</span>
              </h2>
              <p className="section-intro">
                A few things I&apos;ve worked on, explored and brought to life.
              </p>

              <div className="project-grid">
                {projects.map((project) => (
                  <article className="project-card" key={project.name}>
                    <div className="project-card-top">
                      <span className="project-number">{project.number}</span>
                      <span className="project-status">{project.status}</span>
                    </div>

                    <p className="project-type">{project.type}</p>
                    <h3>{project.name}</h3>
                    <p className="project-description">
                      {project.description}
                    </p>
                    <span className="project-stack">{project.stack}</span>
                  </article>
                ))}
              </div>

              <a
                className="more-projects"
                href="https://github.com/zarinroushan?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                EXPLORE MORE PROJECTS <span>↗</span>
              </a>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="content-section">
            <div className="section-inner narrow-inner">
              <p className="section-label">02 / THE PERSON BEHIND THE SCREEN</p>
              <h2>
                A little about me<span>.</span>
              </h2>

              <div className="about-content">
                <p>
                  I&apos;m Zarin, a Computer Science and Engineering student
                  specialising in Data Science. I&apos;m interested in the
                  intersection of technology, creativity and design.
                </p>

                <p>
                  I enjoy building interactive websites, experimenting with
                  AI, exploring new tools and turning ideas into things people
                  can actually use.
                </p>

                <p>
                  I&apos;m still learning, still experimenting, and always looking
                  for something interesting to build next.
                </p>
              </div>
            </div>
          </section>

          {/* JOURNEY */}
          <section id="journey" className="content-section">
            <div className="section-inner narrow-inner">
              <p className="section-label">03 / THE ROAD SO FAR</p>
              <h2>
                My journey<span>.</span>
              </h2>

              <div className="timeline">
                <article className="timeline-item">
                  <span>2024 — PRESENT</span>
                  <h3>Computer Science & Engineering</h3>
                  <p>
                    Studying Computer Science and Engineering with a
                    specialisation in Data Science.
                  </p>
                </article>

                <article className="timeline-item">
                  <span>BUILDING & EXPERIMENTING</span>
                  <h3>Projects and hackathons</h3>
                  <p>
                    Learning by building projects, participating in
                    hackathons and trying technologies that are new to me.
                  </p>
                </article>

                <article className="timeline-item">
                  <span>WHAT&apos;S NEXT</span>
                  <h3>Research, robotics and intelligent systems</h3>
                  <p>
                    Exploring AI, robotics and research opportunities while
                    preparing for the next stage of my academic journey.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* LEARNING */}
          <section id="learning" className="content-section">
            <div className="section-inner">
              <p className="section-label">04 / CURRENTLY EXPLORING</p>
              <h2>
                What I&apos;m learning<span>.</span>
              </h2>

              <div className="learning-grid">
                <article className="learning-card">
                  <span className="learning-status">
                    <span aria-hidden="true">●</span> IN PROGRESS
                  </span>
                  <h3>Machine Learning</h3>
                  <p>
                    Exploring how models learn from data and how to apply them
                    to practical problems.
                  </p>
                </article>

                <article className="learning-card">
                  <span className="learning-status">
                    <span aria-hidden="true">●</span> IN PROGRESS
                  </span>
                  <h3>Full-Stack Development</h3>
                  <p>
                    Exploring how frontend interfaces, backend logic and data
                    work together in useful digital products.
                  </p>
                </article>
              </div>

              <p className="learning-note">
                These are current learning areas — a work in progress, not a
                list of finished expertise.
              </p>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="content-section contact-section">
            <div className="section-inner narrow-inner">
              <p className="section-label">05 / SAY HELLO</p>
              <h2>
                Let&apos;s make something interesting<span>.</span>
              </h2>

              <p className="contact-intro">
                Have an idea, an interesting project or just want to connect?
                Find me around the internet.
              </p>

              <div className="contact-links">
                <a
                  href="https://www.linkedin.com/in/zarin-roushan-102539274/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINKEDIN <span>↗</span>
                </a>

                <a href="mailto:z.roushan02@gmail.com">
                  GMAIL <span>↗</span>
                </a>

                <a
                  href="https://github.com/zarinroushan"
                  target="_blank"
                  rel="noreferrer"
                >
                  GITHUB <span>↗</span>
                </a>
              </div>

            </div>
          </section>

          {/* PREVIOUS / NEXT CONTROLS */}
          <div className="nav-dock">
            <nav className="section-controls" aria-label="Section navigation">
              <button
                onClick={() => goToSection(activeSection - 1)}
                disabled={activeSection === 0}
              >
                ← PREVIOUS
              </button>

              <span aria-live="polite">
                {String(activeSection + 1).padStart(2, "0")} /{" "}
                {String(sections.length).padStart(2, "0")}
              </span>

              <button
                onClick={() => goToSection(activeSection + 1)}
                disabled={activeSection === sections.length - 1}
              >
                NEXT →
              </button>
            </nav>
          </div>

          <footer className="site-footer">
            <div className="footer-brand">
              <strong>
                zarin<span>.world</span>
              </strong>
              <span>© 2026 Zarin Roushan</span>
            </div>

            <div className="footer-message">
              <strong>
                BUILT WITH CURIOSITY <span className="footer-star">✦</span>
              </strong>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}