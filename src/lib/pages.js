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
  practiceAreas,
  resolveContentLanguage,
  studio,
  studioPrimaryEmail
} from "../content/site.js";
import { renderLayout } from "./layout.js";
import websitesPreview from "../../01_websites.png";
import interfacesPreview from "../../02_interfaces.png";
import appsPreview from "../../03_apps.png";
import aiPreview from "../../04_ai.png";

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

  if (entry.visual === "campaignshark") {
    return `
      <div class="lab-visual lab-visual-concept" data-lab-preview-visual="campaignshark">
        <div class="lab-concept-card">
          <img src="/campaignshark_logo.png" alt="Campaign Shark logo" />
        </div>
      </div>
    `;
  }

  if (entry.visual === "sara-portfolio") {
    return `
      <div class="lab-visual lab-visual-concept" data-lab-preview-visual="sara-portfolio">
        <div class="lab-concept-card">
          <img src="/sara_portfolio.png" alt="Sara Portfolio preview" />
        </div>
      </div>
    `;
  }

  return `
    <div class="lab-visual lab-visual-truffle" data-lab-preview-visual="truffle">
      <div class="lab-phone">
        <div class="lab-phone-screen lab-phone-screen-truffle">
          <img src="/portada_truffle.png" alt="Truffle app preview" />
        </div>
      </div>
    </div>
  `;
};

const renderLabProjectVisual = (project) => {
  if (project.visual === "truffle") {
    return `<img class="lab-index-preview-image" src="/portada_truffle.png" alt="Truffle project preview" loading="lazy" />`;
  }

  if (project.visual === "campaignshark") {
    return `<img class="lab-index-preview-image" src="/campaignshark_logo.png" alt="Campaign Shark project preview" loading="lazy" />`;
  }

  if (project.visual === "sara-portfolio") {
    return `<img class="lab-index-preview-image" src="/sara_portfolio.png" alt="Sara Portfolio project preview" loading="lazy" />`;
  }

  if (project.visual === "aware") {
    return `<img class="lab-index-preview-image" src="/aware.png" alt="Aware project preview" loading="lazy" />`;
  }

  if (project.visual === "casa-rural-carmen") {
    return `<img class="lab-index-preview-image" src="/casa_rural_carmen.jpg" alt="Casa Rural Carmen project preview" loading="lazy" />`;
  }

  return `
    <div class="lab-index-preview-placeholder" aria-hidden="true">
      <span>CRC</span>
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
  const destinations = doors.slice(0, 3);

  const orbitMeta = [
    { key: "about", label: "About Us" },
    { key: "lab", label: "Lab" },
    { key: "blog", label: "Blog" }
  ];

  return `
    <nav class="orbital-nav" data-orbital-nav aria-label="Homepage destinations">
      <div class="orbital-system">
        <div class="orbital-core" aria-hidden="true">
          <span class="orbital-core-planet"></span>
          <span class="orbital-core-ring"></span>
        </div>

        ${destinations
          .map((door, index) => {
            const orbit = orbitMeta[index];

            return `
              <a
                class="orbital-item orbital-item-${orbit.key}"
                href="${door.href}"
                data-orbit-item
                data-orbit="${orbit.key}"
                aria-label="Open ${orbit.label}"
              >
                <span class="orbital-track" aria-hidden="true"></span>

                <span class="orbital-marker">
                  <span class="orbital-satellite orbital-satellite-${orbit.key}"></span>
                  <span class="orbital-indicator">${orbit.label}</span>
                </span>
              </a>
            `;
          })
          .join("")}
      </div>
    </nav>
  `;
};

const renderHome = () => {
  const { homeHero, homeDoors, homePage } = getSharedContent(getCurrentLanguage());
  const aiTools = [
    "Figma",
    "React",
    "Vite",
    "Supabase",
    "Vercel",
    "GitHub",
    "Notion",
    "OpenAI",
    "Claude",
    "Cursor",
    "Codex",
    "Python"
  ];
  const buildServices = [
    {
      number: "01",
      title: "Websites",
      description: "Editorial, clean, and responsive websites built around identity and clarity.",
      image: websitesPreview
    },
    {
      number: "02",
      title: "Interfaces",
      description: "UX/UI systems where every screen has a reason to exist.",
      image: interfacesPreview
    },
    {
      number: "03",
      title: "Apps",
      description: "Functional digital products built around user flows, data, and real use cases.",
      image: appsPreview
    },
    {
      number: "04",
      title: "AI Systems",
      description:
        "We integrate AI into your digital ecosystem, helping you build AI-powered systems that make your product sharper, faster, and harder to ignore.",
      image: aiPreview
    }
  ];
  const hero = `
    <section class="hero-home">
      <div class="hero-grid home-hero-grid">
        <div class="hero-copy" data-reveal>
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
    <section class="section-block home-build-section">
      <div class="home-build-layout">
        <div class="home-build-copy" data-reveal>
          <h2 class="home-build-title">Digital products with structure, atmosphere, and purpose.</h2>
          <p class="home-build-intro">
            We design and build websites, interfaces, apps, and AI-assisted systems for ideas that need more than just a good-looking screen.
          </p>
        </div>
        <div class="home-build-list">
          ${buildServices
          .map(
            (service) => `
              <article class="home-build-row" data-reveal>
                <span class="home-build-visual home-build-visual-${service.title.toLowerCase().replace(/\s+/g, "-")}">
                  <img class="home-build-visual-image" src="${service.image}" alt="" loading="lazy" />
                </span>
                <div class="home-build-service">
                  <p class="home-build-label">${service.title}</p>
                  <p class="home-build-description">${service.description}</p>
                </div>
              </article>
            `
          )
          .join("")}
        </div>
      </div>
    </section>

    <section class="section-block home-diagram-section" data-reveal>
      <div class="home-diagram-layout">
        <div class="home-diagram-visual">
          <img class="home-diagram-image" src="/diagram 1.png" alt="System diagram" loading="lazy" />
        </div>
        <div class="home-diagram-copy">
          <h2 class="section-title">We don’t just make cool screens</h2>
          <p class="section-copy">
         We start with the big picture, then break each idea into the parts it needs.
          </p>
        </div>
      </div>
    </section>

    <section class="section-block home-ai-section">
      <div class="home-ai-shell">
        <div class="home-ai-copy" data-reveal>
          <h2 class="home-ai-title">Built with modern tools.
Shaped by human judgment.</h2>
          <p class="home-ai-subtitle">
            We use AI to explore deeper, automate smarter, and build sharper — while keeping every decision guided by design, context, and intent.
          </p>
        </div>
        <div class="home-ai-marquee" data-reveal aria-label="Tools we use">
          <div class="home-ai-marquee-track">
            ${[...aiTools, ...aiTools]
              .map(
                (tool) => `
                  <span class="home-ai-tool" aria-hidden="true">${tool}</span>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="section-block section-end">
      <div class="closing-note section-frame home-closing-note" data-reveal>
        <p class="home-closing-kicker">Stay in the Loop</p>
        <h2 class="home-closing-title">Tell us what you are thinking, building, or circling around.</h2>
        <div class="home-closing-actions">
          <a
            class="home-closing-cta"
            href="mailto:${studioPrimaryEmail}?subject=${encodeURIComponent("Get in touch from Schultz' Studios")}"
          >Get in touch by email</a>
        </div>
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
          <p class="eyebrow"></p>
          <h1 class="page-title">Our small digital home.</h1>
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
          <p class="section-kicker"></p>
          
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
  const labProjectLinks = {
    truffle:
      "https://www.figma.com/proto/yJAtwxBoCtbmeATO4cdz1J/UXUI_casestudy_truffle?node-id=1-510&t=NFBFjCiaaVjxqWLu-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A510",
    campaignShark: "https://www.campaignshark.com/",
    saraPortfolio: "https://www.saraheredadesign.com/"
  };

  const pipelineProjects = [
    {
      id: "01",
      year: "2026",
      status: "FINISHED",
      name: "Truffle",
      type: "Pet care mobile app",
      description:
        "A small mobile product concept built around daily pet care, routines, and simple ownership flows.",
      tags: ["Mobile product", "Pet care", "Daily use"],
      visual: "truffle",
      href: labProjectLinks.truffle
    },
    {
      id: "02",
      year: "2026",
      status: "IN PROGRESS",
      name: "Campaign Shark",
      type: "AI Ad Performance Prediction Tool",
      description:
        "An AI-assisted system for comparing ad campaigns, ranking creative options, and helping teams make sharper decisions before launch.",
      tags: ["AI SaaS", "Ad comparison", "Dashboard"],
      visual: "campaignshark",
      href: labProjectLinks.campaignShark
    },
    {
      id: "03",
      year: "2026",
      status: "FINISHED",
      name: "Sara's Portfolio",
      type: "UX/UI portfolio website",
      description:
        "A personal portfolio space designed to present selected work, process, and visual identity with clarity.",
      tags: ["Portfolio", "UX/UI", "Web presence"],
      visual: "sara-portfolio",
      href: labProjectLinks.saraPortfolio
    },
    {
      id: "04",
      year: "2026",
      status: "IN PROGRESS",
      name: "Aware",
      type: "Personal expense tracker",
      description:
        "A simple expense-tracking app for events, trips, and everyday moments where users want to know what they really spent.",
      tags: ["Web product", "Expense tracking", "Events"],
      visual: "aware",
      isInDevelopment: true
    },
    {
      id: "05",
      year: "2026",
      status: "IN IDEATION",
      name: "Casa Rural Carmen",
      type: "Hospitality website concept",
      description:
        "A website concept for a rural house, focused on atmosphere, trust, and clear booking-oriented storytelling.",
      tags: ["Hospitality", "Website", "Early concept"],
      visual: "casa-rural-carmen",
      isInDevelopment: true
    }
  ];

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
      <div class="lab-index">
        <div class="lab-index-list">
          ${pipelineProjects
            .map(
              (project) => `
                <article
                  class="lab-index-row ${project.href ? "is-clickable" : ""} ${project.isInDevelopment ? "is-in-development" : ""}"
                  data-reveal
                  ${project.href ? `data-project-link="${project.href}"` : ""}
                  ${project.isInDevelopment ? 'data-project-development="true"' : ""}
                  tabindex="0"
                  role="button"
                >
                  <div class="lab-index-main">
                    <span class="lab-index-number">${project.id}</span>
                    <div class="lab-index-copy">
                      <h3>${project.name}</h3>
                      <p class="lab-index-type">${project.type}</p>
                      <p class="lab-index-description">${project.description}</p>
                      <div class="lab-index-meta">
                        <span>${project.year}</span>
                        <span>${project.status}</span>
                      </div>
                      <div class="lab-index-tags">
                        ${project.tags
                          .map(
                            (tag) => `
                              <span>${tag}</span>
                            `
                          )
                          .join("")}
                      </div>
                    </div>
                  </div>
                  <div class="lab-index-preview">
                    ${renderLabProjectVisual(project)}
                  </div>
                </article>
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
        <a class="button button-primary contact-button" href="mailto:${studioPrimaryEmail}?subject=${encodeURIComponent(
          "Schultz' Studios"
        )}">
          Open email draft
        </a>
        <p class="form-note">
          
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
