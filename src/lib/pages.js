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

const renderHome = () => {
  const { homeHero, homeDoors, homeSignals, homePage } = getSharedContent(
    getCurrentLanguage()
  );
  const hero = `
    <section class="hero-home">
      <div class="hero-grid">
        <div class="hero-copy" data-reveal>
          <div class="hero-intro">
            <h1 class="hero-title">${homeHero.title}</h1>
            <p class="hero-lead">${homeHero.lead}</p>
          </div>

          <div class="hero-actions">
            <a class="button button-primary button-comet" href="/lab.html" data-comet-button><span class="button-label">${homePage.links.enterLab}</span></a>
            <a class="button button-secondary button-comet" href="/blog.html" data-comet-button><span class="button-label">${homePage.links.readBlog}</span></a>
          </div>
        </div>

        <aside class="hero-aside" data-reveal>
          <div class="hero-aside-copy">
            ${homeHero.aside
              .map(
                (paragraph) => `
                  <p>${paragraph}</p>
                `
              )
              .join("")}
          </div>
          <div class="hero-markers">
            ${homeHero.markers
              .map(
                (marker) => `
                  <span>${marker}</span>
                `
              )
              .join("")}
          </div>
        </aside>
      </div>

      <div class="hero-index" data-reveal>
        ${homeDoors
          .map(
            (door) => `
              <a class="hero-index-link" href="${door.href}">
                <span>${door.label}</span>
                <strong>${door.title}</strong>
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  const content = `
    <section class="section-block">
      <div class="signals-shell section-frame" data-reveal>
        <div class="signals-intro">
          <h2 class="section-title">${homePage.signals.title}</h2>
        </div>
        <div class="signals-grid">
        ${homeSignals
          .map(
            (signal, index) => `
              <article class="signal-card" data-reveal>
                <span class="signal-index">0${index + 1}</span>
                <p class="signal-line">${signal}</p>
              </article>
            `
          )
          .join("")}
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="door-list">
        ${homeDoors
          .map(
            (door) => `
              <a class="door-row" href="${door.href}" data-reveal>
                <span class="door-label">${door.label}</span>
                <div class="door-body">
                  <h3>${door.title}</h3>
                  <p>${door.text}</p>
                </div>
                <span class="door-arrow">${homePage.links.open}</span>
              </a>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="split-heading" data-reveal>
        <div>
          <p class="section-kicker">${homePage.lab.kicker}</p>
          <h2 class="section-title">${homePage.lab.title}</h2>
        </div>
        <a class="inline-link" href="/lab.html">${homePage.links.enterLab}</a>
      </div>
      <div class="compact-list">
        ${homePage.lab.entries
          .map(
            (entry) => `
              <a class="compact-row" href="/lab.html" data-reveal>
                <span>${entry.id}</span>
                <strong>${entry.name}</strong>
                <p>${entry.short}</p>
                <em>${entry.state}</em>
              </a>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="split-heading" data-reveal>
        <div>
          <p class="section-kicker">${homePage.blog.kicker}</p>
          <h2 class="section-title">${homePage.blog.title}</h2>
        </div>
        <a class="inline-link" href="/blog.html">${homePage.links.readBlog}</a>
      </div>
      <div class="feature-writing section-frame" data-reveal>
        <p class="section-copy">${homePage.blog.body}</p>
      </div>
    </section>

    <section class="section-block section-end">
      <div class="closing-note section-frame" data-reveal>
        <p class="section-kicker">${homePage.contact.kicker}</p>
        <h2 class="section-title">${homePage.contact.title}</h2>
        <a class="button button-primary" href="/contact.html">${homePage.links.getInTouch}</a>
      </div>
    </section>
  `;

  return renderLayout({ pageId: "home", hero, content });
};

const renderAbout = () => {
  const hero = renderPageHero({
    eyebrow: "About Us",
    title: "Welcome to our small digital home.",
    lead:
      "We are Sara and Carlos. Sara works across UX and UI design. Carlos studies computer science and machine learning. Schultz' Studios is where those two worlds meet and keep growing together.",
    aside:
      "Why Schultz'? Because our first home after moving to Norway in 2022 was on Schultz' Gate, and that was the beginning of this whole story."
  });

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
  const initialEntry = labEntries[0];
  const hero = renderPageHero({
    eyebrow: studio.labName,
    title: "Projects that live inside the Lab.",
    lead:
      "<strong>Welcome to the Lab.</strong><br />This is where the studio's projects come to life: taking shape, evolving, and eventually reaching their final form.",
    aside:
      "Not everything here is finished, and that is part of the point. The Lab shows the work as it lives inside the studio."
  });

  const content = `
    <section class="section-block lab-shell">
      <aside class="lab-preview section-frame" data-reveal>
        <p class="section-kicker">Current focus</p>
        <div data-lab-preview-visual-root>
          ${renderLabVisual(initialEntry)}
        </div>
        <span class="lab-preview-index" data-lab-preview="id">${initialEntry.id}</span>
        <h2 data-lab-preview="name">${initialEntry.name}</h2>
        <div class="lab-preview-meta">
          <span data-lab-preview="type">${initialEntry.type}</span>
          <span data-lab-preview="state">${initialEntry.state}</span>
          <span data-lab-preview="year">${initialEntry.year}</span>
        </div>
        <p class="lab-preview-short" data-lab-preview="short">${initialEntry.short}</p>
        <p class="lab-preview-detail" data-lab-preview="detail">${initialEntry.detail}</p>
        <p class="lab-preview-footprint" data-lab-preview="footprint">${initialEntry.footprint}</p>
        <div class="lab-tag-list" data-lab-preview-tags>
          ${initialEntry.tags
            .map(
              (tag) => `
                <span>${tag}</span>
              `
            )
            .join("")}
        </div>
      </aside>

      <div class="lab-list">
        ${labEntries
          .map(
            (entry, index) => `
              <button
                class="lab-row${index === 0 ? " is-active" : ""}"
                type="button"
                data-reveal
                data-lab-item
                data-id="${entry.id}"
                data-name="${entry.name}"
                data-visual="${entry.visual ?? ""}"
                data-type="${entry.type}"
                data-state="${entry.state}"
                data-year="${entry.year}"
                data-short="${entry.short}"
                data-detail="${entry.detail}"
                data-footprint="${entry.footprint}"
                data-tags="${entry.tags.join(" | ")}"
              >
                <span class="lab-row-index">${entry.id}</span>
                <div class="lab-row-copy">
                  <strong>${entry.name}</strong>
                  <p>${entry.short}</p>
                </div>
                <em>${entry.state}</em>
              </button>
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
