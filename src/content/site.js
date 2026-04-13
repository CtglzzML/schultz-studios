export const defaultLanguage = "en";
export const supportedLanguages = ["en", "es"];
export const languageStorageKey = "schultz-language";

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const mergeLocalizedContent = (base, override) => {
  if (override === undefined) {
    return base;
  }

  if (Array.isArray(base) && Array.isArray(override)) {
    const maxLength = Math.max(base.length, override.length);

    return Array.from({ length: maxLength }, (_, index) =>
      mergeLocalizedContent(base[index], override[index])
    );
  }

  if (Array.isArray(base) || Array.isArray(override)) {
    return override ?? base;
  }

  if (isPlainObject(base) && isPlainObject(override)) {
    const keys = new Set([...Object.keys(base), ...Object.keys(override)]);

    return Object.fromEntries(
      [...keys].map((key) => [key, mergeLocalizedContent(base?.[key], override?.[key])])
    );
  }

  return override ?? base;
};

export const resolveContentLanguage = (language = defaultLanguage) => {
  const normalizedLanguage = String(language ?? defaultLanguage)
    .toLowerCase()
    .split("-")[0];

  return supportedLanguages.includes(normalizedLanguage)
    ? normalizedLanguage
    : defaultLanguage;
};

// Shared copy can grow here section by section as more pages become bilingual.
export const localizedSharedContent = {
  en: {
    studioMeta: {
      strapline: "A small digital studio making websites and products with care.",
      description:
        "Schultz' Studios is where the work lives. Schultz' Lab is where things are tried, built, tested, and kept in motion.",
      shortDescription: "From our small studio, to the world.",
      location: "Norway / Remote",
      availability: "Open to conversations, shared ideas, and thoughtful work."
    },
    navigation: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about.html" },
      { label: "Lab", href: "/lab.html" },
      { label: "Blog", href: "/blog.html" },
      { label: "Contact", href: "/contact.html" }
    ],
    homeHero: {
      eyebrow: "Schultz' Studios",
      title: "This is what we stand <em>for.</em>",
      lead:
        "We create websites, interfaces, and visual systems shaped by detail and built to last.",
      aside: [
        "<strong>Schultz' Studios</strong> is where you get to know us, our thinking, and the world around our work.",
        "<strong>Schultz' Lab</strong> is our working space: a place for ideas taking shape, early builds, works in progress, and finished projects."
      ],
      markers: ["Websites", "Portfolios", "Web apps", "AI solutions", "Human-made"]
    },
    homeDoors: [
      {
        label: "About Us",
        title: "Who we are, and how we work.",
        text:
          "A small studio shaped by two different backgrounds, one shared standard, and a quieter way of building.",
        href: "/about.html"
      },
      {
        label: "Schultz' Lab",
        title: "Builds in progress, ideas in motion.",
        text:
          "An internal space for things we are making, testing, refining, and keeping alive while they are still unfinished.",
        href: "/lab.html"
      },
      {
        label: "Blog",
        title: "A quiet journal, slowly taking shape.",
        text:
          "Notes, process, reflections, and small pieces of writing will live here when they are ready.",
        href: "/blog.html"
      }
    ],
    homeSignals: [
      "We don't rush the work. We give it the time it needs.",
      "Nothing goes out until it feels right.",
      "We make things with love."
    ],
    homePage: {
      links: {
        enterLab: "Enter the Lab",
        readBlog: "Read the blog",
        open: "Open",
        getInTouch: "Get in touch"
      },
      signals: {
        title: "What guides the work."
      },
      lab: {
        kicker: "From the Lab",
        title: "Things we are making while they are still in motion.",
        entries: [
          {
            id: "01",
            name: "Truffle",
            short:
              "A calm place to keep everything related to your pet in one space, from papers and routines to the details you do not want to lose track of.",
            state: "In progress"
          },
          {
            id: "02",
            name: "Aware",
            short:
              "A web app for keeping track of spending around any event, so the money side stays visible while everything else is moving.",
            state: "In progress"
          }
        ]
      },
      blog: {
        kicker: "Blog",
        title: "A journal that will grow in its own time.",
        body:
          "Writing will live here when it has something real to say. Until then, we would rather leave the space quiet."
      },
      contact: {
        kicker: "Contact",
        title:
          "If something is taking shape and you want to talk it through, our door is open."
      }
    }
  },
  es: {
    studioMeta: {
      strapline:
        "Un pequeño estudio digital que crea sitios web y productos con cuidado.",
      description:
        "Schultz' Studios es donde las ideas toman vida. Schultz' Lab es donde las cosas se prueban, se construyen, se afinan y siguen en movimiento.",
      shortDescription: "Desde nuestro pequeno estudio, hacia el mundo.",
      location: "Noruega / Remoto",
      availability:
        "Abiertos a conversaciones, ideas compartidas y trabajo hecho con criterio."
    },
    navigation: [
      { label: "Inicio", href: "/" },
      { label: "Sobre nosotros", href: "/about.html" },
      { label: "Lab", href: "/lab.html" },
      { label: "Blog", href: "/blog.html" },
      { label: "Contacto", href: "/contact.html" }
    ],
    homeHero: {
      eyebrow: "Schultz' Studios",
      title: "Esto es lo que <em>defendemos.</em>",
      lead:
        "Creamos sitios web, interfaces y sistemas visuales definidos por el detalle y pensados para durar en el tiempo.",
      aside: [
        "<strong>Schultz' Studios</strong> es donde puedes conocernos, entender como trabajamos, ver nuestros proyectos y contactarnos.",
        "<strong>Schultz' Lab</strong> es nuestro laboratorio personal: un lugar donde las ideas toman forma, primeros desarrollos, proyectos en marcha y proyectos terminados."
      ],
      markers: ["Sitios web", "Portafolios", "Apps web", "Soluciones de IA", "Hecho por humanos"]
    },
    homeDoors: [
      {
        label: "Sobre nosotros",
        title: "Quienes somos y como trabajamos.",
        text:
          "Un estudio pequeño formado por dos trayectorias distintas, un estandar compartido y una manera diferente de crear.",
        href: "/about.html"
      },
      {
        label: "Schultz' Lab",
        title: "Proyectos en marcha, ideas en movimiento.",
        text:
          "Un espacio interno para lo que estamos creando, probando, refinando y manteniendo vivo.",
        href: "/lab.html"
      },
      {
        label: "Blog",
        title: "Un diario silencioso, tomando forma poco a poco.",
        text:
          "Aqui viviran notas, procesos, reflexiones y pequenos textos cuando esten listos.",
        href: "/blog.html"
      }
    ],
    homeSignals: [
      "No apresuramos el trabajo. Le damos el tiempo que necesita.",
      "No publicamos nada hasta que sentimos que realmente esta listo.",
      "Hacemos las cosas con dedicacion y cuidado."
    ],
    homePage: {
      links: {
        enterLab: "Entrar al Lab",
        readBlog: "Leer el blog",
        open: "Abrir",
        getInTouch: "Ponte en contacto"
      },
      signals: {
        title: "Lo que guia nuestro trabajo."
      },
      lab: {
        kicker: "Desde el Lab",
        title: "Cosas que estamos creando mientras siguen en movimiento.",
        entries: [
          {
            id: "01",
            name: "Truffle",
            short:
              "Un lugar donde guardar todo lo relacionado con tu mascota en un solo espacio, desde documentos y rutinas hasta los detalles que no quieres perder de vista.",
            state: "En progreso"
          },
          {
            id: "02",
            name: "Aware",
            short:
              "Una app web para seguir los gastos de cualquier evento, de modo que la parte economica esté controlada mientras todo lo demas esta en movimiento.",
            state: "En progreso"
          }
        ]
      },
      blog: {
        kicker: "Blog",
        title: "Un diario que crecera a su propio ritmo.",
        body:
          "Publicaremos cuando tengamos algo real que decir. Hasta entonces, preferimos dejar el espacio en silencio."
      },
      contact: {
        kicker: "Contacto",
        title:
          "Si tienes una idea y quieres darle forma, nuestra puerta esta abierta."
      }
    }
  }
};

export const getSharedContent = (language = defaultLanguage) => {
  const resolvedLanguage = resolveContentLanguage(language);

  return mergeLocalizedContent(
    localizedSharedContent[defaultLanguage],
    localizedSharedContent[resolvedLanguage]
  );
};

export const getSharedSection = (section, language = defaultLanguage) =>
  getSharedContent(language)[section];

export const studio = {
  name: "Schultz' Studios",
  labName: "Schultz' Lab",
  strapline: getSharedSection("studioMeta").strapline,
  description: getSharedSection("studioMeta").description,
  shortDescription: getSharedSection("studioMeta").shortDescription,
  location: getSharedSection("studioMeta").location,
  email: "sbhereda@gmail.com",
  availability: getSharedSection("studioMeta").availability
};

export const navigation = getSharedSection("navigation");

export const homeHero = getSharedSection("homeHero");

export const homeDoors = getSharedSection("homeDoors");

export const homeSignals = getSharedSection("homeSignals");

export const homePage = getSharedSection("homePage");

export const labEntries = [
  {
    id: "01",
    name: "Truffle",
    visual: "truffle",
    type: "Mobile app",
    state: "In progress",
    year: "2026",
    short:
      "A calm place to keep everything related to your pet in one space, from papers and routines to the details you do not want to lose track of.",
    detail:
      "Truffle is being shaped as a mobile companion for everyday pet care: organised, gentle to use, and built around the idea that care should feel clear, not scattered.",
    tags: ["Pet care", "Mobile product", "Daily use"],
    footprint: "Records / routines / one place for everything"
  },
  {
    id: "02",
    name: "Aware",
    visual: "aware",
    type: "Web app",
    state: "In progress",
    year: "2026",
    short:
      "A web app for keeping track of spending around any event, so the money side stays visible while everything else is moving.",
    detail:
      "Aware is designed to make group spending easier to read before things get messy, giving a clearer sense of what is being spent, where, and why.",
    tags: ["Events", "Expense tracking", "Web product"],
    footprint: "Budgets / visibility / shared planning"
  }
];

export const labNotes = [
  "Real projects live here, not throwaway experiments.",
  "Some are still in progress. Some will be finished and simply dated.",
  "Everything here is being built to hold up in real life."
];

export const practiceAreas = [
  {
    label: "Websites",
    text: "Portfolios, brand sites, and digital spaces with clarity, personality, and enough care to feel truly their own."
  },
  {
    label: "Apps",
    text: "Digital products, tools, and ideas that grow from early concepts into more complete and useful experiences."
  },
  {
    label: "Design",
    text: "Sara shapes the UX and UI side of the work, with a close focus on usability, flow, visual sensitivity, and how everything feels in use."
  },
  {
    label: "Code",
    text: "Carlos takes care of the code, development, and maintenance behind what we build, making sure the work holds up beyond the surface."
  }
];

export const aboutStory = [
  "Schultz' Studios was built from two different worlds coming together: design and computer science. That combination shapes the way we think, make decisions, and build.",
  "We like being involved in the whole of the work. Not only how something looks, but how it reads, how it behaves, and how it is built underneath the surface.",
  "Our philosophy is simple: we want to make things with the level of detail and precision that feels true to us, and only build what is aligned with the way we want to live and work."
];

export const aboutStandards = [
  "Take the time it needs.",
  "Keep the standard high.",
  "Only build what feels right."
];

export const founders = [
  {
    name: "Sara",
    role: "UX, UI, and the human side of the work",
    image: "/IMG_7241.heic.png",
    alt: "Portrait of Sara",
    text:
      "Sara works across UX and UI with a sharp eye for clarity, usability, and emotional detail. Her path into design came after a previous chapter in veterinary care, and that still shows in the way she works: with attention, patience, and a very real care for the people on the other side.",
    tags: ["Figma", "Design systems", "Usability testing", "User research", "Wireframing", "Prototyping", "Communication", "Collaboration"]
  },
  {
    name: "Carlos",
    role: "Code, systems, and technical thinking",
    image: "/carlos-about.png",
    alt: "Portrait of Carlos",
    text:
      "Carlos comes from a machine learning and data science background, and is currently continuing into computer science. He brings structure to the work: programming, logic, algorithms, and the part that makes ideas hold up once they leave the sketchbook.",
    tags: ["Programming", "Algorithms", "Machine learning", "Data science", "Systems thinking", "Problem solving"]
  }
];

export const blogPlaceholder = {
  eyebrow: "Blog",
  title: "A quiet journal, not a content machine.",
  lead:
    "This space will hold notes, process, small essays, and things we learn while building. We are leaving it empty for now on purpose.",
  aside:
    "When it starts filling up, it should feel natural. More like a notebook we trust than a publication schedule.",
  homeTitle: "A journal that will grow in its own time.",
  homeText:
    "Writing will live here when it has something real to say. Until then, we would rather leave the space quiet.",
  cta: "Read the blog"
};

export const blogEntries = [
  {
    slug: "room-inside-the-name",
    href: "/blog-room-inside-the-name.html",
    type: "Note",
    date: "08 Apr 2026",
    readingTime: "3 min",
    title: "A studio name should carry a room inside it",
    excerpt:
      "Why Schultz' Gate stayed in the name, and why origin matters more to us than polish."
  },
  {
    slug: "building-together",
    href: "/blog-building-together.html",
    type: "Essay",
    date: "02 Apr 2026",
    readingTime: "5 min",
    title: "On building together without flattening the work",
    excerpt:
      "A note on shared authorship, tension, and keeping a project sharp when two people are making it side by side."
  },
  {
    slug: "lab-notes-01",
    href: "/blog-lab-notes-01.html",
    type: "Build log",
    date: "27 Mar 2026",
    readingTime: "4 min",
    title: "Lab Notes 01: keeping experiments quiet",
    excerpt:
      "Early principles for internal products: less noise, slower motion, and more confidence in what does not need to shout."
  },
  {
    slug: "interfaces-that-exhale",
    href: "/blog-interfaces-that-exhale.html",
    type: "Reflection",
    date: "18 Mar 2026",
    readingTime: "4 min",
    title: "The case for interfaces that exhale",
    excerpt:
      "On pacing, negative space, and the difference between a fast interface and a frantic one."
  }
];

export const articles = {
  "room-inside-the-name": {
    title: "A studio name should carry a room inside it",
    deck:
      "Why Schultz' Gate stayed in the name, and why origin matters more to us than polish.",
    type: "Note",
    date: "08 Apr 2026",
    readingTime: "3 min",
    pullQuote:
      "A name with a place inside it asks the work to feel lived in, not merely launched.",
    sections: [
      {
        heading: "",
        paragraphs: [
          "Schultz' Gate was the first home we shared in Norway. The name stayed because it held more than a location. It held the beginning of a way of living and making together.",
          "When we started thinking about the studio, we did not want a name that sounded optimized. We wanted one that already had a room inside it."
        ]
      },
      {
        heading: "Memory as a standard",
        paragraphs: [
          "A name rooted in a real place becomes useful. It quietly asks the work to carry warmth, clarity, and enough emotional weight to be remembered.",
          "That is a harder standard than branding for effect. It is less about sounding clever and more about creating something people can actually feel."
        ]
      },
      {
        heading: "Why it matters online",
        paragraphs: [
          "Digital work often loses its sense of origin. Everything starts to sound like a category, a niche, or a market position. We wanted the opposite.",
          "Schultz' Studios begins with a place. Schultz' Lab begins with that same house opening a second room."
        ]
      }
    ],
    next: "building-together"
  },
  "building-together": {
    title: "On building together without flattening the work",
    deck:
      "A note on shared authorship, tension, and keeping a project sharp when two people are making it side by side.",
    type: "Essay",
    date: "02 Apr 2026",
    readingTime: "5 min",
    pullQuote:
      "Working together does not have to smooth the edges away. It can make the edges more exact.",
    sections: [
      {
        heading: "",
        paragraphs: [
          "Building as a couple changes the rhythm of a project. The discussion is closer. Taste is tested faster. Small decisions stay alive longer because there is someone beside you who will notice when a line feels wrong.",
          "That does not automatically make the work better. It only becomes useful if the process stays honest."
        ]
      },
      {
        heading: "Shared authorship",
        paragraphs: [
          "We are not interested in dividing the work into neat territories where one person never touches what the other sees. The stronger moments usually happen in the overlap.",
          "Design affects the build. The build changes the design. Product decisions reshape the writing. That movement is where the work becomes specific."
        ]
      },
      {
        heading: "Keeping the work sharp",
        paragraphs: [
          "Closeness can also soften things too much. That is the risk. So we try to protect critique, precision, and the right kind of friction.",
          "The goal is not harmony for its own sake. The goal is a result that feels more considered because more than one eye stayed fully awake."
        ]
      }
    ],
    next: "lab-notes-01"
  },
  "lab-notes-01": {
    title: "Lab Notes 01: keeping experiments quiet",
    deck:
      "Early principles for internal products: less noise, slower motion, and more confidence in what does not need to shout.",
    type: "Build log",
    date: "27 Mar 2026",
    readingTime: "4 min",
    pullQuote:
      "An experiment can feel alive without looking restless.",
    sections: [
      {
        heading: "",
        paragraphs: [
          "The first rule in Schultz' Lab is simple: being experimental is not permission to become noisy.",
          "We want prototypes and internal tools to feel alive, but controlled. Movement should suggest intelligence, not ask for applause."
        ]
      },
      {
        heading: "What we are testing",
        paragraphs: [
          "Lower-contrast motion. Slower transitions. Interfaces that stay quiet until interaction gives them a reason to respond.",
          "We are also testing archive structures that let unfinished work remain visible without making it look accidental."
        ]
      },
      {
        heading: "Why quiet matters",
        paragraphs: [
          "A loud prototype can hide weak thinking. A quieter one has nowhere to hide. Structure becomes visible. Timing becomes visible. Weak copy becomes visible.",
          "That pressure is useful. It makes the work honest earlier."
        ]
      }
    ],
    next: "interfaces-that-exhale"
  },
  "interfaces-that-exhale": {
    title: "The case for interfaces that exhale",
    deck:
      "On pacing, negative space, and the difference between a fast interface and a frantic one.",
    type: "Reflection",
    date: "18 Mar 2026",
    readingTime: "4 min",
    pullQuote:
      "Speed is not the same thing as pressure.",
    sections: [
      {
        heading: "",
        paragraphs: [
          "Many interfaces are quick but still exhausting. They react instantly, yet leave no room for the eye to settle.",
          "We are interested in another feeling: the interface that responds clearly, then gets out of the way."
        ]
      },
      {
        heading: "Pacing as design",
        paragraphs: [
          "Spacing, hierarchy, and motion are all part of pacing. A calm screen often comes from subtraction, but also from knowing which moment deserves emphasis and which one does not.",
          "That means fewer competing surfaces, quieter transitions, and typography that does more of the emotional work."
        ]
      },
      {
        heading: "What stays with people",
        paragraphs: [
          "People rarely remember every feature. They remember whether the experience felt tense or composed.",
          "An interface that exhales leaves a trace of confidence. That is the feeling we keep returning to."
        ]
      }
    ],
    next: "room-inside-the-name"
  }
};

export const contactPrompt =
  "If you want to share an idea, a project, or something still taking shape, we would be happy to hear from you.";

export const contactDetails = [
  { label: "Email", value: studio.email },
  { label: "Location", value: studio.location },
  { label: "Availability", value: studio.availability }
];
