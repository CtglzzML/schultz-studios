import {
  aboutStandards,
  aboutStory,
  articles,
  blogPlaceholder,
  blogEntries,
  contactDetails,
  contactPrompt,
  defaultLanguage,
  founders,
  getSharedContent,
  labEntries,
  labNotes,
  practiceAreas,
  resolveContentLanguage,
  studio
} from "../content/site.js";
import { renderLayout } from "./layout.js";

const getCurrentLanguage = () =>
  typeof document === "undefined"
    ? defaultLanguage
    : resolveContentLanguage(document.documentElement.lang);

const renderLabVisual = (entry) => {
  if (entry.visual === "aware") {
    return `
      <div class="lab-visual lab-visual-aware" data-lab-preview-visual="aware">
        <div class="lab-phone">
          <div class="lab-phone-screen lab-phone-screen-aware">
            <span class="lab-visual-mark">Aware.</span>
            <div class="lab-visual-aware-copy">
              <p>You had</p>
              <p><span>fun.</span></p>
              <p>Your wallet</p>
              <p>didn't.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (!entry.visual) {
    return `
      <div class="lab-visual lab-visual-concept" data-lab-preview-visual="concept">
        <div class="lab-concept-card">
          <span class="lab-visual-mark">In development</span>
          <div class="lab-concept-copy">
            <p>${entry.name}</p>
            <strong>${entry.state}</strong>
            <span>${entry.type}</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="lab-visual lab-visual-truffle" data-lab-preview-visual="truffle">
      <div class="lab-phone">
        <div class="lab-phone-screen lab-phone-screen-truffle">
          <img src="/truffle-screen-crop.png" alt="Truffle app preview" />
        </div>
      </div>
    </div>
  `;
};

const renderLabProjectVisual = (entry) => {
  if (entry.visual === "truffle") {
    return `
      <div class="lab-project-visual lab-project-visual-image">
        <img src="/truffle-screen-crop.png" alt="Truffle app preview" />
      </div>
    `;
  }

  if (entry.visual === "aware") {
    return `
      <div class="lab-project-visual lab-project-visual-cover lab-project-visual-aware">
        <img src="/aware.png" alt="Aware app preview" />
      </div>
    `;
  }

  return `
    <div class="lab-project-visual lab-project-visual-concept lab-project-visual-${entry.id}">
      <span class="lab-visual-mark">${entry.type}</span>
      <strong>${entry.name}</strong>
      <span class="lab-project-visual-line"></span>
    </div>
  `;
};

const renderPageHero = ({ eyebrow, title, lead, aside, pageClass = "" }) => `
  <section class="page-hero ${pageClass}">
    <div class="page-hero-grid">
      <div class="page-hero-copy" data-reveal>
        <p class="eyebrow">${eyebrow}</p>
        <h1 class="page-title">${title}</h1>
        <p class="page-lead">${lead}</p>
      </div>
      <aside class="page-aside" data-reveal>
        <p>${aside}</p>
      </aside>
    </div>
  </section>
`;

const renderOrbitalNavigation = (doors) => {
  const nodes = doors.map((door, index) => {
    const positions = [
      { x: 205, y: 168, radius: 16, orbit: "inner" },
      { x: 383, y: 248, radius: 21, orbit: "middle" },
      { x: 262, y: 368, radius: 18, orbit: "outer" }
    ];
    const position = positions[index] ?? positions[0];

    return `
      <a class="orbital-link orbital-link-${index + 1}" href="${door.href}" aria-label="Open ${door.label}">
        <circle class="orbital-node-halo" cx="${position.x}" cy="${position.y}" r="${position.radius + 18}" />
        <circle class="orbital-node-ring" cx="${position.x}" cy="${position.y}" r="${position.radius + 7}" />
        <circle class="orbital-node orbital-node-${position.orbit}" cx="${position.x}" cy="${position.y}" r="${position.radius}" />
        <text class="orbital-label" x="${position.x + 32}" y="${position.y + 5}">${door.label}</text>
      </a>
    `;
  });

  return `
    <nav class="orbital-nav" aria-label="Homepage destinations">
      <svg class="orbital-system" viewBox="0 0 560 500" role="img" aria-labelledby="orbital-title">
        <title id="orbital-title">Orbital navigation for About Us, Lab, and Blog</title>
        <defs>
          <radialGradient id="orbitalCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(245, 248, 255, 0.95)" />
            <stop offset="44%" stop-color="rgba(155, 166, 188, 0.42)" />
            <stop offset="100%" stop-color="rgba(155, 166, 188, 0)" />
          </radialGradient>
          <filter id="orbitalGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g class="orbital-grid" aria-hidden="true">
          <path d="M88 250H514" />
          <path d="M302 54V446" />
        </g>
        <g class="orbital-orbits" aria-hidden="true">
          <ellipse class="orbital-path orbital-path-outer" cx="300" cy="252" rx="228" ry="176" />
          <ellipse class="orbital-path orbital-path-middle" cx="300" cy="252" rx="172" ry="132" />
          <ellipse class="orbital-path orbital-path-inner" cx="300" cy="252" rx="116" ry="88" />
        </g>
        <g class="orbital-core" aria-hidden="true">
          <circle class="orbital-core-glow" cx="300" cy="252" r="46" />
          <circle class="orbital-core-dot" cx="300" cy="252" r="4" />
          <circle class="orbital-core-ring" cx="300" cy="252" r="24" />
        </g>
        <g class="orbital-nodes">
          ${nodes.join("")}
        </g>
      </svg>
    </nav>
  `;
};

const renderHome = () => {
  const { homeHero, homeDoors, homePage } = getSharedContent(getCurrentLanguage());
  const hero = `
    <section class="hero-home">
      <div class="hero-grid home-hero-grid">
        <div class="hero-copy" data-reveal>
          <p class="eyebrow">${homeHero.eyebrow}</p>
          <div class="hero-intro">
            <h1 class="hero-title">${homeHero.title}</h1>
            <p class="hero-lead">${homeHero.lead}</p>
          </div>
        </div>

        <aside class="hero-aside home-hero-aside" data-reveal>
          ${renderOrbitalNavigation(homeDoors)}
        </aside>
      </div>
    </section>
  `;

  const content = `
    <section class="section-block">
      <div class="split-heading" data-reveal>
        <div>
          <p class="section-kicker">${homePage.explore.kicker}</p>
          <h2 class="section-title">${homePage.explore.title}</h2>
        </div>
      </div>
      <div class="home-entry-grid">
        ${homeDoors
          .map(
            (door) => `
              <a class="home-entry-card section-frame" href="${door.href}" data-reveal>
                <span class="home-entry-label">${door.label}</span>
                <strong>${door.title}</strong>
                <p>${door.text}</p>
                <span class="home-entry-arrow">${homePage.links.open}</span>
              </a>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="split-heading" data-reveal>
        <div>
          <p class="section-kicker">${homePage.preview.kicker}</p>
          <h2 class="section-title">${homePage.preview.title}</h2>
        </div>
      </div>
      <div class="home-preview-grid">
        ${homePage.preview.items
          .map(
            (item) => `
              <a class="home-preview-card section-frame" href="${item.href}" data-reveal>
                <div class="home-preview-meta">
                  <span>${item.label}</span>
                  <em>${item.meta}</em>
                </div>
                <strong>${item.name}</strong>
                <p>${item.short}</p>
              </a>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block section-end">
      <div class="closing-note section-frame home-closing-note" data-reveal>
        <p class="section-kicker">${homePage.contact.kicker}</p>
        <h2 class="section-title">${homePage.contact.title}</h2>
        <p class="section-copy">${homePage.contact.body}</p>
        <a class="button button-primary" href="/contact.html">${homePage.links.getInTouch}</a>
      </div>
    </section>
  `;

  return renderLayout({ pageId: "home", hero, content });
};

const renderAbout = () => {
  const hero = `
    <section class="page-hero page-hero-about">
      <div class="page-hero-grid">
        <div class="page-hero-copy" data-reveal>
          <p class="eyebrow">About Us</p>
          <h1 class="page-title">Welcome to our small digital home.</h1>
        </div>
        <aside class="page-aside" data-reveal>
          <p>
            We are Sara and Carlos. Sara works across UX and UI design. Carlos is a Machine Learning graduate and Computer Science student in OPIT. Schultz' Studios is where those two worlds meet and keep growing together.
          </p>
          <p>
            Why Schultz'? 
          </p>
          <p>
          Because our first home after moving to Norway in 2022 was on Schultz' Gate, and that was the beginning of this whole story.
          </p>
        </aside>
      </div>
    </section>
  `;

  const content = `
    <section class="section-block">
      <div class="split-heading" data-reveal>
        <div>
          <p class="section-kicker">Inside the studio</p>
          <h2 class="section-title">Two backgrounds, one shared standard.</h2>
        </div>
      </div>
      <div class="founders-grid">
        ${founders
          .map((founder, index) => {
            const reverseClass = index % 2 === 1 ? " founder-card-reverse" : "";

            return `
              <article class="founder-card founder-card-${founder.name.toLowerCase()}${reverseClass}" data-reveal>
                <div class="founder-image-wrap">
                  <img class="founder-image founder-image-${founder.name.toLowerCase()}" src="${founder.image}" alt="${founder.alt}" />
                </div>
                <div class="founder-copy">
                  <span class="founder-role">${founder.role}</span>
                  <h3>${founder.name}</h3>
                  <p>${founder.text}</p>
                  <div class="founder-tags">
                    ${founder.tags
                      .map(
                        (tag) => `
                          <span>${tag}</span>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>

    <section class="section-block narrative-grid">
      ${aboutStory
        .map(
          (paragraph) => `
            <p class="narrative-paragraph" data-reveal>${paragraph}</p>
          `
        )
        .join("")}
    </section>

    <section class="section-block">
      <div class="section-heading" data-reveal>
        <p class="section-kicker">What we make</p>
        <h2 class="section-title">We build digital things, from portfolios to apps.</h2>
      </div>
      <div class="practice-list">
        ${practiceAreas
          .map(
            (area) => `
              <article class="practice-row" data-reveal>
                <span>${area.label}</span>
                <p>${area.text}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="standards-panel section-frame" data-reveal>
        <p class="section-kicker">Shared standards</p>
        <div class="standards-list">
          ${aboutStandards
            .map(
              (standard) => `
                <p>${standard}</p>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  return renderLayout({ pageId: "about", hero, content });
};

const renderLab = () => {
  const hero = `
    <section class="page-hero page-hero-lab">
      <div class="page-hero-grid">
        <div class="page-hero-copy" data-reveal>
          <p class="eyebrow">${studio.labName}</p>
          <div class="lab-hero-layout">
            <h1 class="page-title">Welcome to the Lab.</h1>
            <div class="lab-hero-story">
              <p class="page-lead">This is where the studio's projects come to life: taking shape, evolving, and eventually reaching their final form.</p>
              <p class="page-lead page-lead-secondary">Not everything here is finished, and that is part of the point. The Lab shows the work as it lives inside the studio.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const content = `
    <section class="section-block lab-shell">
      <div class="lab-project-grid">
        ${labEntries
          .map(
            (entry) => `
              <article class="lab-project-card section-frame" data-reveal>
                ${renderLabProjectVisual(entry)}
                <div class="lab-project-content">
                  <h2>${entry.name}</h2>
                  <div class="lab-project-meta">
                    <span>${entry.built ?? entry.year}</span>
                    <span>${entry.state}</span>
                  </div>
                  <div class="lab-tag-list">
                    ${entry.tags
                      .map(
                        (tag) => `
                          <span>${tag}</span>
                        `
                      )
                      .join("")}
                  </div>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="lab-rules-card">
        <div class="section-heading" data-reveal>
          <p class="section-kicker">Lab rules</p>
          <h2 class="section-title">A living archive of products we care about building well.</h2>
        </div>
        <div class="signal-strip">
          ${labNotes
            .map(
              (note) => `
                <p class="signal-line" data-reveal>${note}</p>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  return renderLayout({ pageId: "lab", hero, content });
};

const renderBlog = () => {
  const featured = blogEntries[0];
  const hero = renderPageHero({
    pageClass: "page-hero-blog",
    eyebrow: "Blog",
    title: blogPlaceholder.title,
    lead: blogPlaceholder.lead,
    aside: blogPlaceholder.aside
  });

  const content = `
    <section class="section-block">
      <div class="feature-writing section-frame" data-reveal>
        <p class="section-kicker">Not open yet</p>
        <h2 class="section-title">We are leaving this space quiet until there is something real to put here.</h2>
        <p class="section-copy">
          When the journal begins, it will hold notes, process, and small pieces of writing from inside the studio and the Lab. For now, we would rather leave the page empty than fill it for the sake of it.
        </p>
      </div>
    </section>
  `;

  return renderLayout({ pageId: "blog", hero, content });
};

const renderContact = () => {
  const hero = renderPageHero({
    pageClass: "page-hero-contact",
    eyebrow: "Contact",
    title: "Open a draft and say hello.",
    lead: "No form to fill twice. Just open the draft, write a few lines, and send it our way.",
    aside:
      "Projects, ideas, and half-formed thoughts are all welcome. Keep it simple. That is usually enough."
  });

  const content = `
    <section class="section-block contact-shell">
      <div class="contact-note section-frame" data-reveal>
        <p class="section-kicker">Reach out</p>
        <h2 class="section-title">Tell us what you are thinking, building, or circling around.</h2>
        <div class="contact-detail-list">
          ${contactDetails
            .map(
              (item) => `
                <div class="contact-detail">
                  <span>${item.label}</span>
                  <p>${item.value}</p>
                </div>
              `
            )
            .join("")}
        </div>
        <a class="button button-primary contact-button" href="mailto:${studio.email}?subject=${encodeURIComponent(
          "Schultz' Studios"
        )}">
          Open email draft
        </a>
        <p class="form-note">
          Or write directly to <a href="mailto:${studio.email}">${studio.email}</a>.
        </p>
      </div>
    </section>
  `;

  return renderLayout({ pageId: "contact", hero, content });
};

const renderArticle = (slug) => {
  const article = articles[slug];
  const nextEntry = blogEntries.find((entry) => entry.slug === article.next);

  const hero = `
    <section class="article-hero">
      <div class="article-hero-inner" data-reveal>
        <a class="article-back" href="/blog.html">Back to Blog</a>
        <p class="eyebrow">${article.type}</p>
        <h1 class="article-title">${article.title}</h1>
        <p class="article-deck">${article.deck}</p>
      </div>
    </section>
  `;

  const content = `
    <section class="article-shell">
      <aside class="article-meta-rail" data-reveal>
        <span>${article.date}</span>
        <span>${article.readingTime}</span>
        <span>${studio.name}</span>
      </aside>

      <article class="article-body" data-reveal>
        <blockquote>${article.pullQuote}</blockquote>
        ${article.sections
          .map(
            (section) => `
              <section class="article-section">
                ${section.heading ? `<h2>${section.heading}</h2>` : ""}
                ${section.paragraphs
                  .map(
                    (paragraph) => `
                      <p>${paragraph}</p>
                    `
                  )
                  .join("")}
              </section>
            `
          )
          .join("")}

        ${
          nextEntry
            ? `
              <div class="article-next">
                <p class="section-kicker">Next entry</p>
                <a class="feature-writing-link" href="${nextEntry.href}">
                  <span>${nextEntry.type} / ${nextEntry.date}</span>
                  <h2>${nextEntry.title}</h2>
                  <p>${nextEntry.excerpt}</p>
                </a>
              </div>
            `
            : ""
        }
      </article>
    </section>
  `;

  return renderLayout({
    pageId: "article",
    navPageId: "blog",
    hero,
    content,
    pageClass: "article-view"
  });
};

export const pageDefinitions = {
  home: {
    title: "Schultz' Studios",
    description: () => getSharedContent(getCurrentLanguage()).studioMeta.strapline,
    render: renderHome
  },
  about: {
    title: "About Us | Schultz' Studios",
    description: "A small studio shaped by design, computer science, and a shared way of building.",
    render: renderAbout
  },
  lab: {
    title: "Schultz' Lab | Schultz' Studios",
    description: "Builds in progress, product studies, and internal work from Schultz' Studios.",
    render: renderLab
  },
  blog: {
    title: "Blog | Schultz' Studios",
    description: "A quiet journal that will open over time.",
    render: renderBlog
  },
  contact: {
    title: "Contact | Schultz' Studios",
    description: "Start a conversation with Schultz' Studios.",
    render: renderContact
  }
};

export const articleDefinitions = Object.fromEntries(
  blogEntries.map((entry) => [
    entry.slug,
    {
      title: `${entry.title} | Schultz' Studios`,
      description: entry.excerpt,
      render: () => renderArticle(entry.slug)
    }
  ])
);
