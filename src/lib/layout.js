import {
  defaultLanguage,
  getSharedSection,
  resolveContentLanguage,
  supportedLanguages,
  studio
} from "../content/site.js";

const getCurrentLanguage = () =>
  typeof document === "undefined"
    ? defaultLanguage
    : resolveContentLanguage(document.documentElement.lang);

const renderNavLinks = (navPageId, language) =>
  getSharedSection("navigation", language)
    .map(({ label, href }) => {
      const isActive =
        (navPageId === "home" && href === "/") ||
        (navPageId !== "home" && href.endsWith(`${navPageId}.html`));

      return `
        <a class="nav-link${isActive ? " is-active" : ""}" href="${href}"${
          isActive ? ' aria-current="page"' : ""
        }>
          ${label}
        </a>
      `;
    })
    .join("");

const renderLanguageSwitcher = (language) => `
  <div class="language-switcher" data-language-switcher aria-label="Language switcher">
    ${supportedLanguages
      .map(
        (code) => `
          <button
            class="language-option${code === language ? " is-active" : ""}"
            type="button"
            data-language-option="${code}"
            aria-pressed="${String(code === language)}"
          >
            ${code.toUpperCase()}
          </button>
        `
      )
      .join("")}
  </div>
`;

export const renderLayout = ({
  pageId,
  navPageId = pageId,
  hero,
  content,
  pageClass = ""
}) => {
  const language = getCurrentLanguage();
  const studioMeta = getSharedSection("studioMeta", language);

  return `
    <div class="field-layer" aria-hidden="true">
      <canvas class="field-canvas" data-field-canvas></canvas>
    </div>

    <div class="ambient-layer" aria-hidden="true">
      <span class="ambient ambient-a"></span>
      <span class="ambient ambient-b"></span>
    </div>

    <div class="site-shell ${pageClass}">
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="/" aria-label="${studio.name} home">
            <span class="brand-mark">
              <img src="/brand-planet.png" alt="" aria-hidden="true" />
            </span>
            <div class="brand-copy">
              <span class="brand-name">${studio.name}</span>
              <span class="brand-meta">${studioMeta.location}</span>
            </div>
          </a>

          <div class="nav-wrap" data-nav>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open menu" data-nav-toggle>
              <span></span>
              <span></span>
            </button>

            <nav class="site-nav" aria-label="Main navigation">
              ${renderNavLinks(navPageId, language)}
            </nav>

            ${renderLanguageSwitcher(language)}
          </div>
        </div>
      </header>

      <main class="site-main page-${pageId}">
        ${hero}
        ${content}
      </main>

      <footer class="site-footer">
        <div class="footer-line">
          <span>${studio.name}</span>
          <span>${studio.labName}</span>
          <span>${studioMeta.location}</span>
          <a href="mailto:${studio.email}">${studio.email}</a>
        </div>
        <div class="footer-line footer-muted">
          <span>${studioMeta.shortDescription}</span>
        </div>
      </footer>
    </div>
  `;
};
