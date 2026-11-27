"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "UniGigs",
    type: "PRODUCT · FULL-STACK",
    description:
      "A student freelance marketplace designed to connect campus talent with real opportunities.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "https://github.com/zarinroushan/freelance-hub",
    tone: "project-lilac",
    mark: "UG",
  },
  {
    number: "02",
    name: "Pip’s Midnight Observatory",
    type: "INTERACTIVE · CREATIVE TECH",
    description:
      "A tiny, magical world built around interactive storytelling and playful exploration.",
    stack: ["JavaScript", "Animation", "Creative UI"],
    href: "https://github.com/zarinroushan/pips-midnight-observatory",
    tone: "project-peach",
    mark: "✳",
  },
  {
    number: "03",
    name: "NammaSpeak",
    type: "LANGUAGE · AI",
    description:
      "A travel-focused Kannada learning experience, with practical conversations and offline-first support.",
    stack: ["JavaScript", "Flask", "Gemini"],
    href: "https://github.com/zarinroushan",
    tone: "project-mint",
    mark: "ನ",
  },
  {
    number: "04",
    name: "ClutchVision",
    type: "DATA · SPORTS ANALYTICS",
    description:
      "An IPL cricket analytics project exploring match data through useful visual insights.",
    stack: ["Python", "Data Analysis", "Visualization"],
    href: "https://github.com/zarinroushan/clutchvision",
    tone: "project-yellow",
    mark: "CV",
  },
];

const navItems = [
  ["01", "Work", "#work"],
  ["02", "About", "#about"],
  ["03", "Contact", "#contact"],
] as const;

export default function Home() {
  const [time, setTime] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    updateTime();
    const interval = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "INPUT" ||
        event.key === "TEXTAREA" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) return;

      const key = event.key.toLowerCase();
      const routes: Record<string, string> = {
        h: "#home",
        w: "#work",
        a: "#about",
        c: "#contact",
      };

      if (routes[key]) {
        setActiveKey(key);
        document.querySelector(routes[key])?.scrollIntoView({ behavior: "smooth" });
      }
      if (key === "escape") setTerminalOpen(false);
      if (key === "?") setTerminalOpen((open) => !open);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main id="home">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Zarin home">
          zarin<span className="wordmark-dot">.</span>world
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([number, label, href]) => (
            <a href={href} key={label}>
              <span>{number}</span>{label}
            </a>
          ))}
        </nav>
        <button
          className="availability"
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="availability-dot" /> AVAILABLE FOR OPPORTUNITIES
        </button>
      </header>

      <section className="hero section-shell">
        <div className="hero-meta">
          <span>INDEPENDENT CREATOR / DEVELOPER</span>
          <span>KOLKATA, IN <i>—</i> {time || "••:••"} IST</span>
        </div>

        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} /> HELLO, INTERNET. I’M ZARIN.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            I make the
            <br />
            <span className="serif-word">digital</span> feel
            <br />
            a little more <span className="outlined-word">human.</span>
          </motion.h1>
          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p>
              I’m a computer science student who loves turning curious ideas into
              thoughtful interfaces, useful products, and interactive experiences.
            </p>
            <a className="round-link" href="#work" aria-label="Explore selected work">
              <ArrowDownRight size={23} />
            </a>
          </motion.div>
        </div>

        <div className="hero-sticker" aria-label="Curiosity is a feature">
          <span className="sticker-star">✳</span>
          <span>CURIOUS BY<br />DEFAULT</span>
          <span className="sticker-small">EST. 2003-ish</span>
        </div>

        <div className="hero-footer">
          <span>SCROLL A LITTLE. STAY A WHILE.</span>
          <button onClick={() => setTerminalOpen(true)} className="hint-button">
            <span>PRESS</span> <kbd>?</kbd> <span>FOR SHORTCUTS</span>
          </button>
          <span>© 2026 ZARIN ROUSHAN</span>
        </div>
      </section>

      <section className="work-section section-shell" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW THINGS I’VE MADE</p>
            <h2>Selected <span className="serif-word">work.</span></h2>
          </div>
          <p className="section-aside">A mix of useful, curious<br />and slightly unusual things.</p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.a
              className="project-card"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className={`project-art ${project.tone}`}>
                <span className="project-index">/{project.number}</span>
                <span className="project-mark">{project.mark}</span>
                <span className="project-open"><MoveUpRight size={18} /></span>
                <span className="art-caption">AN EXPLORATION IN MAKING</span>
              </div>
              <div className="project-info">
                <div className="project-type">{project.type}</div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <a className="text-link" href="https://github.com/zarinroushan" target="_blank" rel="noreferrer">
          MORE ON GITHUB <ArrowUpRight size={15} />
        </a>
      </section>

      <section className="about-section section-shell" id="about">
        <div className="about-label">
          <p className="eyebrow">A LITTLE ABOUT ME</p>
          <span className="about-ascii" aria-hidden="true">{`  .----.\n / .--. \\\n| |    | |\n| |____| |\n \\______/\n   /  \\\n  /____\\`}</span>
        </div>
        <div className="about-copy">
          <h2>Part builder.<br />Part <span className="serif-word">daydreamer.</span></h2>
          <p>
            I’m studying Computer Science & Engineering (Data Science) at Heritage
            Institute of Technology. I’m drawn to the space where technology meets
            design — where a product can be technically thoughtful and genuinely
            delightful to use.
          </p>
          <p>
            Lately, I’ve been exploring full-stack development, AI-powered ideas,
            data projects, and interactive digital experiences. I like learning by
            making things, then making them a little better.
          </p>
          <div className="interest-list">
            <span>UI / INTERACTION</span><span>CREATIVE TECH</span><span>AI & DATA</span><span>FULL-STACK</span>
          </div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <p className="eyebrow">HAVE A GOOD IDEA?</p>
        <h2>Let’s make<br /><span className="serif-word">something</span> real.</h2>
        <a className="contact-cta" href="mailto:hello@zarin.world">
          SAY HELLO <ArrowUpRight size={18} />
        </a>
        <div className="contact-bottom">
          <span>OPEN TO INTERESTING COLLABORATIONS</span>
          <div className="social-links">
            <a href="https://github.com/zarinroushan" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/zarinroushan/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="mailto:hello@zarin.world" aria-label="Email"><Mail size={18} /></a>
          </div>
          <span>MADE WITH CURIOSITY © 2026</span>
        </div>
      </section>

      <button className="terminal-fab" onClick={() => setTerminalOpen(true)} aria-label="Open keyboard shortcuts">
        <span>⌘</span> ?
      </button>

      {terminalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setTerminalOpen(false)}>
          <motion.div
            className="shortcuts-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-top"><span>zarin.exe — KEYBOARD MAP</span><button onClick={() => setTerminalOpen(false)}>ESC ✕</button></div>
            <h2 id="shortcuts-title">Take the <span className="serif-word">shortcuts.</span></h2>
            <div className="shortcut-row"><kbd>H</kbd><span>Go home</span><kbd>W</kbd><span>See selected work</span></div>
            <div className="shortcut-row"><kbd>A</kbd><span>Get to know me</span><kbd>C</kbd><span>Say hello</span></div>
            <div className="shortcut-row"><kbd>ESC</kbd><span>Close this window</span><kbd>?</kbd><span>Toggle this panel</span></div>
            <p className="modal-foot">A small interface. A few secret doors. Have fun exploring.</p>
          </motion.div>
        </div>
      )}
    </main>
  );
}