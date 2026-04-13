import "./styles/main.css";
import {
  defaultLanguage,
  languageStorageKey,
  resolveContentLanguage
} from "./content/site.js";
import { setupFieldCanvas } from "./lib/field.js";
import { articleDefinitions, pageDefinitions } from "./lib/pages.js";

const app = document.querySelector("#app");
const pageId = document.body.dataset.page ?? "home";
const articleId = document.body.dataset.article ?? "";
const descriptionTag = document.querySelector('meta[name="description"]');

const getStoredLanguage = () => {
  try {
    return window.localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
};

const saveLanguagePreference = (language) => {
  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // Ignore storage failures so rendering keeps working.
  }
};

const getPreferredLanguage = () =>
  resolveContentLanguage(
    getStoredLanguage() ?? document.documentElement.lang ?? defaultLanguage
  );

const setDocumentLanguage = (language) => {
  document.documentElement.lang = resolveContentLanguage(language);
};

const getCurrentPage = () =>
  pageId === "article"
    ? articleDefinitions[articleId]
    : pageDefinitions[pageId] ?? pageDefinitions.home;

const resolvePageValue = (value) => (typeof value === "function" ? value() : value);

const setupNav = () => {
  const navWrap = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (!navWrap || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navWrap.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrap.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
};

const setupLanguageSwitcher = (renderApp) => {
  const switcher = document.querySelector("[data-language-switcher]");

  if (!switcher) {
    return;
  }

  const activeLanguage = resolveContentLanguage(document.documentElement.lang);
  const options = Array.from(switcher.querySelectorAll("[data-language-option]"));

  options.forEach((option) => {
    if (!(option instanceof HTMLButtonElement)) {
      return;
    }

    const optionLanguage = resolveContentLanguage(option.dataset.languageOption);
    const isActive = optionLanguage === activeLanguage;

    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", String(isActive));

    option.addEventListener("click", () => {
      if (optionLanguage === resolveContentLanguage(document.documentElement.lang)) {
        return;
      }

      saveLanguagePreference(optionLanguage);
      setDocumentLanguage(optionLanguage);
      renderApp();
    });
  });
};

const setupReveals = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!revealItems.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const setupContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const project = String(formData.get("project") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const destination = form.dataset.email ?? "";

    const subject = project
      ? `Schultz' Studios: ${project}`
      : "Schultz' Studios enquiry";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project: ${project || "Not specified"}`,
      "",
      message
    ].join("\n");

    window.location.href = `mailto:${destination}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent = `Your mail app should open with a draft addressed to ${destination}.`;
    }
  });
};

const setupLabArchive = () => {
  const items = Array.from(document.querySelectorAll("[data-lab-item]"));
  const previewRoot = document.querySelector("[data-lab-preview-tags]");
  const visualRoot = document.querySelector("[data-lab-preview-visual-root]");

  if (!items.length || !previewRoot || !visualRoot) {
    return;
  }

  const fields = {
    id: document.querySelector('[data-lab-preview="id"]'),
    name: document.querySelector('[data-lab-preview="name"]'),
    type: document.querySelector('[data-lab-preview="type"]'),
    state: document.querySelector('[data-lab-preview="state"]'),
    year: document.querySelector('[data-lab-preview="year"]'),
    short: document.querySelector('[data-lab-preview="short"]'),
    detail: document.querySelector('[data-lab-preview="detail"]'),
    footprint: document.querySelector('[data-lab-preview="footprint"]')
  };

  const renderLabVisual = (visual) => {
    if (visual === "aware") {
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

  const applyEntry = (item) => {
    items.forEach((entry) => entry.classList.toggle("is-active", entry === item));

    Object.entries(fields).forEach(([key, node]) => {
      if (node) {
        node.textContent = item.dataset[key] ?? "";
      }
    });

    const tags = (item.dataset.tags ?? "")
      .split("|")
      .map((tag) => tag.trim())
      .filter(Boolean);

    previewRoot.innerHTML = tags
      .map(
        (tag) => `
          <span>${tag}</span>
        `
      )
      .join("");

    visualRoot.innerHTML = renderLabVisual(item.dataset.visual ?? "truffle");
  };

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => applyEntry(item));
    item.addEventListener("focus", () => applyEntry(item));
    item.addEventListener("click", () => applyEntry(item));
  });
};

const setupCometButtons = () => {
  const buttons = Array.from(document.querySelectorAll("[data-comet-button]"));

  if (!buttons.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setCometOrigin = (button, clientX, clientY) => {
    const rect = button.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    button.style.setProperty("--comet-x", `${x}px`);
    button.style.setProperty("--comet-y", `${y}px`);
  };

  buttons.forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      if (!(event.currentTarget instanceof HTMLElement)) {
        return;
      }

      setCometOrigin(event.currentTarget, event.clientX, event.clientY);
    });

    button.addEventListener("click", (event) => {
      if (!(event.currentTarget instanceof HTMLAnchorElement)) {
        return;
      }

      const anchor = event.currentTarget;

      if (!anchor.style.getPropertyValue("--comet-x")) {
        const rect = anchor.getBoundingClientRect();
        anchor.style.setProperty("--comet-x", `${rect.width * 0.28}px`);
        anchor.style.setProperty("--comet-y", `${rect.height * 0.52}px`);
      }

      anchor.classList.remove("is-comet-active");
      // Force a reflow so repeated clicks replay the animation.
      void anchor.offsetWidth;
      anchor.classList.add("is-comet-active");

      const isPlainLeftClick =
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !anchor.target;

      if (!isPlainLeftClick || reducedMotion) {
        return;
      }

      event.preventDefault();

      window.setTimeout(() => {
        window.location.href = anchor.href;
      }, 220);
    });

    button.addEventListener("animationend", (event) => {
      if (!(event.currentTarget instanceof HTMLElement)) {
        return;
      }

      if (event.animationName === "comet-tail") {
        event.currentTarget.classList.remove("is-comet-active");
      }
    });
  });
};

setDocumentLanguage(getPreferredLanguage());

const renderApp = () => {
  const currentPage = getCurrentPage();

  if (!currentPage) {
    throw new Error(`Unknown page configuration for "${pageId}"`);
  }

  document.title = resolvePageValue(currentPage.title);

  if (descriptionTag) {
    descriptionTag.setAttribute("content", resolvePageValue(currentPage.description));
  }

  if (app) {
    app.innerHTML = currentPage.render();
  }

  setupFieldCanvas();
  setupNav();
  setupLanguageSwitcher(renderApp);
  setupReveals();
  setupContactForm();
  setupLabArchive();
  setupCometButtons();
};

renderApp();
