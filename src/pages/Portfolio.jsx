import { useState } from "react";

const styles = `
  * { box-sizing: border-box; }
  .pf {
    --ink: #0E1013;
    --panel: #15181F;
    --panel-2: #1B1F28;
    --line: #262B35;
    --paper: #ECE9E2;
    --mist: #8B92A0;
    --signal: #4FD1C5;
    --amber: #F0B24A;
    --font-display: 'Space Grotesk', -apple-system, sans-serif;
    --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
    --max: 1180px;

    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-display);
    line-height: 1.5;
    min-height: 100vh;
    position: relative;
  }
  .pf a { color: inherit; text-decoration: none; }
  .pf ul, .pf ol, .pf dl { margin: 0; padding: 0; list-style: none; }
  .pf ::selection { background: var(--signal); color: var(--ink); }
  .pf :focus-visible { outline: 2px solid var(--signal); outline-offset: 3px; }

  .pf-bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(236,233,226,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(236,233,226,0.035) 1px, transparent 1px);
    background-size: 42px 42px;
    -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 40%, transparent 90%);
    mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 40%, transparent 90%);
  }

  .pf section {
    max-width: var(--max);
    margin: 0 auto;
    padding: 110px 24px;
    position: relative;
    z-index: 1;
  }

  .pf-eyebrow {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--signal);
    font-weight: 400;
    margin: 0 0 40px;
  }

  .pf-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 32px;
    background: rgba(14,16,19,0.82);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .pf-nav__mark { font-weight: 600; font-size: 18px; letter-spacing: -0.02em; }
  .pf-nav__dot { color: var(--signal); }
  .pf-nav__links { display: flex; gap: 32px; font-size: 14px; color: var(--mist); }
  .pf-nav__links a:hover { color: var(--paper); }
  .pf-nav__cta {
    font-size: 14px; border: 1px solid var(--line); padding: 8px 16px;
    border-radius: 4px; transition: border-color .15s ease, color .15s ease;
  }
  .pf-nav__cta:hover { border-color: var(--signal); color: var(--signal); }
  .pf-nav__toggle {
    display: none; flex-direction: column; gap: 5px; background: none;
    border: none; cursor: pointer; padding: 4px;
  }
  .pf-nav__toggle span { width: 22px; height: 2px; background: var(--paper); }

  .pf-mobile-menu {
    display: none; flex-direction: column; position: sticky; top: 61px;
    z-index: 49; background: var(--ink); border-bottom: 1px solid var(--line);
  }
  .pf-mobile-menu a { padding: 16px 24px; border-bottom: 1px solid var(--line); font-size: 15px; color: var(--mist); }
  .pf-mobile-menu.open { display: flex; }

  @media (max-width: 720px) {
    .pf-nav__links, .pf-nav__cta { display: none; }
    .pf-nav__toggle { display: flex; }
  }

  .pf-hero {
     min-height: calc(100vh - 69px);
     display: flex;
     flex-direction: column;
     justify-content: center;
     padding-top: 80px;
     padding-bottom: 80px;
   }
  .pf-hero__id { font-family: var(--font-mono); font-size: 12px; color: var(--mist); margin-bottom: 24px; }
  .pf-hero__title {
    font-size: clamp(42px, 6.2vw, 76px); line-height: 1.05; letter-spacing: -0.035em;
    margin: 0 0 28px; font-weight: 600; max-width: 18ch;
  }

  .pf-stack__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
  .pf-stack__group { background: var(--panel); padding: 26px 22px; }
  .pf-stack__group h3 { font-size: 13px; font-family: var(--font-mono); color: var(--signal); font-weight: 400; margin: 0 0 16px; }
  .pf-stack__group li { font-size: 14.5px; color: var(--paper); padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .pf-stack__group li:last-child { border-bottom: none; }
  @media (max-width: 760px) { .pf-stack__grid { grid-template-columns: repeat(2, 1fr); } }

  .pf-project { border: 1px solid var(--line); background: var(--panel); border-radius: 6px; margin-bottom: 24px; overflow: hidden; transition: border-color .15s ease; }
  .pf-project:hover { border-color: #3a4150; }
  .pf-project__meta { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; border-bottom: 1px solid var(--line); background: var(--panel-2); }
  .pf-project__id { font-family: var(--font-mono); font-size: 12px; color: var(--mist); }
  .pf-project__status { font-family: var(--font-mono); font-size: 11px; color: var(--amber); border: 1px solid rgba(240,178,74,0.3); padding: 3px 10px; border-radius: 20px; }
  .pf-project__body { padding: 28px 24px 30px; }
  .pf-project__body h3 { font-size: 22px; margin: 0 0 12px; letter-spacing: -0.01em; }
  .pf-project__body p { color: var(--mist); font-size: 15px; max-width: 60ch; margin: 0 0 22px; }
  .pf-project__specs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding: 18px 0; border-top: 1px solid var(--line); margin-bottom: 20px; }
  .pf-project__specs dt { font-family: var(--font-mono); font-size: 11px; color: var(--mist); margin-bottom: 5px; }
  .pf-project__specs dd { margin: 0; font-size: 14px; }
  @media (max-width: 640px) { .pf-project__specs { grid-template-columns: 1fr; gap: 12px; } }
  .pf-project__links { display: flex; gap: 22px; }
  .pf-link-arrow { font-size: 14px; color: var(--signal); position: relative; }
  .pf-link-arrow::after { content: '→'; margin-left: 5px; display: inline-block; transition: transform .15s ease; }
  .pf-link-arrow:hover::after { transform: translateX(3px); }

  .pf-about__grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; }
  .pf-about__text { font-size: 16px; color: var(--mist); margin: 0; }
  .pf-timeline li { display: flex; gap: 14px; font-size: 14.5px; padding: 12px 0; border-top: 1px solid var(--line); }
  .pf-timeline li:first-child { border-top: none; }
  .pf-timeline__year { font-family: var(--font-mono); color: var(--signal); white-space: nowrap; font-size: 13px; padding-top: 1px; }
  @media (max-width: 720px) { .pf-about__grid { grid-template-columns: 1fr; gap: 36px; } }

  .pf-contact__title { font-size: clamp(24px, 3.4vw, 34px); font-weight: 600; letter-spacing: -0.01em; margin: 0 0 40px; max-width: 20ch; }
  .pf-contact__row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; padding-top: 28px; border-top: 1px solid var(--line); }
  .pf-contact__primary { font-size: 20px; color: var(--signal); font-family: var(--font-mono); }
  .pf-contact__primary:hover { text-decoration: underline; }
  .pf-contact__socials { display: flex; gap: 28px; font-size: 14px; color: var(--mist); }
  .pf-contact__socials a:hover { color: var(--paper); }

  .pf-footer { display: flex; justify-content: space-between; max-width: var(--max); margin: 0 auto; padding: 32px 24px 60px; font-size: 13px; color: var(--mist); border-top: 1px solid var(--line); position: relative; z-index: 1; }
  @media (max-width: 560px) { .pf-footer { flex-direction: column; gap: 8px; } .pf section { padding: 80px 20px; } }
`;

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#stack", label: "Stack" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="pf">
      <style>{styles}</style>
      <div className="pf-bg-grid" aria-hidden="true" />

      <header className="pf-nav">
        <a href="#top" className="pf-nav__mark">
          YN<span className="pf-nav__dot">.</span>
        </a>
        <nav className="pf-nav__links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="pf-nav__cta">Get in touch</a>
        <button
          className="pf-nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </header>

      <div className={`pf-mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>

      <main id="top">
        {/* HERO */}
        <section className="pf-hero">
          <div className="pf-hero__id">SUMIT KUMAR / DEVELOPER</div>
          <h1 className="pf-hero__title">
            Backend-focused developer building reliable web applications.
          </h1>
          <p className="pf-hero__lede">
            I'm Sumit, a B.Tech AI &amp; Data Science student focused on
            backend development, APIs, databases, and practical software
            engineering. Currently building projects and looking for
            internship opportunities.
          </p>
          <div className="pf-hero__actions">
            <a href="#work" className="pf-btn pf-btn--primary">See the work</a>
            <a href="/resume.pdf" className="pf-btn pf-btn--ghost" download>Download resume</a>
          </div>
          <dl className="pf-hero__facts">
            <div>
              <dt>location</dt>
              <dd>India</dd>
            </div>
            <div>
              <dt>focus</dt>
              <dd>Backend / MERN</dd>
            </div>
            <div>
              <dt>status</dt>
              <dd className="pf-status-live">open to internships</dd>
            </div>
          </dl>
        </section>

        {/* STACK */}
        <section id="stack">
          <h2 className="pf-eyebrow">// stack.json</h2>
          <div className="pf-stack__grid">
            <div className="pf-stack__group">
              <h3>runtime &amp; server</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>REST API design</li>
                <li>JWT / session auth</li>
              </ul>
            </div>
            <div className="pf-stack__group">
              <h3>data</h3>
              <ul>
                <li>MongoDB</li>
                <li>Mongoose</li>
                <li>Schema design</li>
                <li>Aggregation pipelines</li>
              </ul>
            </div>
            <div className="pf-stack__group">
              <h3>client</h3>
              <ul>
                <li>React</li>
                <li>React Router</li>
                <li>Context / state mgmt</li>
                <li>Responsive CSS</li>
              </ul>
            </div>
            <div className="pf-stack__group">
              <h3>tooling</h3>
              <ul>
                <li>Git &amp; GitHub</li>
                <li>Postman</li>
                <li>Deployment (Render/Vercel)</li>
                <li>DSA in JavaScript</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work">
          <h2 className="pf-eyebrow">// projects.find()</h2>

          <article className="pf-project">
            <div className="pf-project__meta">
              <span className="pf-project__id">project_01</span>
              <span className="pf-project__status">in progress</span>
            </div>
            <div className="pf-project__body">
              <h3>E-commerce Platform</h3>
              <p>
                A full MERN storefront: product catalog, cart, checkout flow
                and order management. Built as a way to go deep on
                real-world backend concerns — auth, payments logic, and data
                modelling for orders and inventory.
              </p>
              <dl className="pf-project__specs">
                <div><dt>role</dt><dd>Backend (API, DB, auth)</dd></div>
                <div><dt>stack</dt><dd>Node · Express · MongoDB · React</dd></div>
                <div><dt>focus</dt><dd>REST APIs, schema design, order logic</dd></div>
              </dl>
              <div className="pf-project__links">
                <a href="#" className="pf-link-arrow">Source</a>
                <a href="#" className="pf-link-arrow">Live demo</a>
              </div>
            </div>
          </article>

          <article className="pf-project">
            <div className="pf-project__meta">
              <span className="pf-project__id">project_02</span>
              <span className="pf-project__status">in progress</span>
            </div>
            <div className="pf-project__body">
              <h3>Social App — Posts &amp; Follows</h3>
              <p>
                A social platform with posts, a follow/following graph, and
                feed generation. The interesting backend problem here was
                modelling relationships efficiently and keeping feed queries
                fast as the data grows.
              </p>
              <dl className="pf-project__specs">
                <div><dt>role</dt><dd>Backend (API, DB, auth)</dd></div>
                <div><dt>stack</dt><dd>Node · Express · MongoDB · React</dd></div>
                <div><dt>focus</dt><dd>Relationship modelling, feed queries</dd></div>
              </dl>
              <div className="pf-project__links">
                <a href="#" className="pf-link-arrow">Source</a>
                <a href="#" className="pf-link-arrow">Live demo</a>
              </div>
            </div>
          </article>
        </section>

        {/* ABOUT */}
        <section id="about">
          <h2 className="pf-eyebrow">// about.md</h2>
          <div className="pf-about__grid">
            <p className="pf-about__text">
              I'm a B.Tech AI &amp; Data Science student with a strong
              interest in backend and software development. I enjoy building
              practical applications, working with APIs and databases, and
              understanding how the pieces of a web application fit together.
              I'm currently strengthening my DSA and backend skills while
              building projects that demonstrate what I can do.
            </p>
            <ol className="pf-timeline">
              <li>
                <span className="pf-timeline__year">2024 —</span>
                <span>Started B.Tech AI &amp; Data Science and began building web projects</span>
              </li>
              <li>
                <span className="pf-timeline__year">2025–26 —</span>
                <span>Built MERN projects and developed a stronger foundation in backend development</span>
              </li>
              <li>
                <span className="pf-timeline__year">2026 —</span>
                <span>Focused on backend, DSA, and building projects for internship opportunities</span>
              </li>
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <h2 className="pf-eyebrow">// contact.send()</h2>
          <h3 className="pf-contact__title">
            Interested in working together?<br />Let's connect.
          </h3>
          <div className="pf-contact__row">
            <a href="https://github.com/sumitkumarmathur565-web" target="_blank" rel="noreferrer" className="pf-contact__primary">
              github
            </a>
            <div className="pf-contact__socials">
              <a href="https://github.com/sumitkumarmathur565-web" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/sumit-kumar-07681a2a0/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="#work">Projects</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <span>SUMIT, India</span>
        <span>Built from scratch — no template.</span>
      </footer>
    </div>
  );
}
