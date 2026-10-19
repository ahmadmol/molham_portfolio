export type ExperienceItem = {
  role: string;
  company: string;
  start: string;
  end: string;
  highlights: string[];
  technologies: string[];
};
export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  visualTheme: "property" | "auction" | "quiz" | "accessibility";
  summary: string;
  detail: string;
  technologies: string[];
  evidenceStatus: "cv" | "older-portfolio-needs-confirmation";
  repositoryUrl?: string;
  demoUrl?: string;
};
export type SectionCopy = {
  index: string;
  label: string;
  title: string;
  description?: string;
};

export const portfolio = {
  metaTitle: "Molham Alnaeb — Mobile Developer | Kotlin, Compose & Flutter",
  metaDescription:
    "Mobile Developer building Android and Flutter experiences with Kotlin, Jetpack Compose and Dart. Based in Aleppo, Syria; open to opportunities across the GCC.",
  title: "Molham Alnaeb",
  role: "Mobile Developer",
  subtitle: "Android (Kotlin & Jetpack Compose) · Flutter",
  location: "Aleppo, Syria",
  resumeAsset: "resume/Molham_Alnaeb_CV_2026.pdf",
  contact: {
    email: "molhamalnaab@gmail.com",
    phone: "+963 967 225 762",
    phoneHref: "+963967225762",
    linkedInUrl: "https://www.linkedin.com/in/ahmad-molham-alnaeb",
    gitHubUrl: "https://github.com/ahmadmol",
  },
  nav: [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    availability: "Available for mobile development opportunities",
    headline: "Building dependable mobile experiences.",
    emphasis: "Native Android. Flutter.",
    summary:
      "I’m a Mobile Developer and Computer Engineering graduate building complete features — from interface and business logic to API integration and validation.",
    badges: [
      "Kotlin",
      "Jetpack Compose",
      "Flutter",
      "Dart",
      "Android SDK",
      "REST APIs",
    ],
    panel: {
      title: "Mobile engineering",
      clusters: [
        {
          label: "Native Android",
          items: "Kotlin · Jetpack Compose",
          detail: "Java · Android SDK",
        },
        {
          label: "Cross-platform",
          items: "Flutter · Dart",
          detail: "Android / iOS feature development",
        },
      ],
      integration: "REST APIs · Supabase · SQLite",
    },
  },
  proof: [
    { title: "SWB Company", detail: "Professional mobile development" },
    { title: "Native Android", detail: "Kotlin · Jetpack Compose" },
    { title: "Cross-platform", detail: "Flutter · Dart" },
    {
      title: "Development experience",
      detail: "Freelance & academic · Since 2022",
    },
  ],
  sections: {
    projects: {
      index: "01",
      label: "Selected work",
      title: "Real problems. Thoughtful mobile products.",
      description:
        "Selected work across property, auctions, education and accessibility.",
    },
    experience: {
      index: "02",
      label: "Experience",
      title: "Building products in real-world teams.",
    },
    about: {
      index: "03",
      label: "Behind the work",
      title: "An engineering mindset. A product perspective.",
    },
    skills: {
      index: "04",
      label: "Toolkit",
      title: "The tools behind the work.",
    },
    education: {
      index: "05",
      label: "Foundation",
      title: "Engineering, from the ground up.",
    },
    contact: {
      index: "06",
      label: "What’s next",
      title: "Let’s build something useful.",
    },
  } satisfies Record<string, SectionCopy>,
  about: {
    paragraphs: [
      "I’m Molham, a Mobile Developer based in Aleppo, Syria. My path started with Java and native Android, grew through Kotlin and Jetpack Compose, and now includes Flutter and Dart for cross-platform development.",
      "I work across the complete feature: understanding requirements, building interfaces and business logic, connecting data, and validating the experience. In an AI-assisted workflow, I personally review, debug and refactor generated code for maintainability and project fit.",
    ],
    currentFocus: [
      "Modern Android & Jetpack Compose",
      "Flutter & Dart",
      "Maintainable application structure",
      "Debugging & performance",
    ],
  },
  coreSkills: {
    groups: [
      {
        title: "Native Android",
        items: ["Kotlin", "Jetpack Compose", "Java", "Android SDK"],
      },
      {
        title: "Cross-platform",
        items: [
          "Flutter",
          "Dart",
          "Android / iOS features",
          "Responsive interfaces",
        ],
      },
      {
        title: "Data & integrations",
        items: [
          "REST APIs",
          "Supabase · SQLite",
          "Authentication",
          "Maps & location",
          "Payment flows",
        ],
      },
      {
        title: "Engineering & workflow",
        items: [
          "Debugging & refactoring",
          "Git / GitHub",
          "OOP & problem solving",
          "AI-assisted code review",
        ],
      },
    ],
  },
  experience: {
    items: [
      {
        role: "Mobile Developer — Kotlin, Jetpack Compose & Flutter",
        company: "SWB Company",
        start: "February 2026",
        end: "Present",
        highlights: [
          "Built complete Android applications with Kotlin and Jetpack Compose.",
          "Developed end-to-end features covering UI, business logic, REST APIs, data handling, validation and error states.",
          "Transitioned to Flutter and Dart to build cross-platform Android/iOS features and backend-connected screens.",
          "Review, debug and refactor agent-generated code while owning features from requirements through integration and validation.",
        ],
        technologies: [
          "Kotlin",
          "Jetpack Compose",
          "Flutter",
          "Dart",
          "REST APIs",
        ],
      },
      {
        role: "Freelance and Academic Mobile Developer",
        company: "Independent & academic projects",
        start: "2022",
        end: "Present",
        highlights: [
          "Progressed from Java and native Android to Kotlin, Jetpack Compose, Flutter and Dart.",
          "Built and supported applications and academic projects involving quizzes, product marketing, real estate and horse auctions.",
          "Implemented APIs, local storage, authentication, maps/location and payment flows; provided debugging, technical guidance and reusable UI components.",
        ],
        technologies: ["Java", "Kotlin", "Flutter", "Supabase", "SQLite"],
      },
    ] satisfies ExperienceItem[],
  },
  featuredProjects: {
    items: [
      {
        id: "real-estate",
        title: "Real Estate Mobile Application",
        category: "Property & discovery",
        visualTheme: "property",
        summary:
          "A mobile application for property listings and real estate workflows.",
        detail:
          "Built and supported real estate application features as part of freelance and academic development work.",
        technologies: [],
        evidenceStatus: "older-portfolio-needs-confirmation",
      },
      {
        id: "horse-auction",
        title: "Horse Auction Application",
        category: "Auctions & commerce",
        visualTheme: "auction",
        summary:
          "Mobile application features supporting horse auction workflows.",
        detail:
          "Developed auction-related mobile functionality as part of freelance and academic application work.",
        technologies: [],
        evidenceStatus: "older-portfolio-needs-confirmation",
      },
      {
        id: "quiz",
        title: "Quiz & Testing Application",
        category: "Education & assessment",
        visualTheme: "quiz",
        summary:
          "A mobile quiz and examination experience with questions, answers and results.",
        detail:
          "Built quiz and exam features, drawing on experience supporting educational applications and academic projects.",
        technologies: [],
        evidenceStatus: "older-portfolio-needs-confirmation",
      },
      {
        id: "smart-assistant",
        title: "Smart Assistant for Visually Impaired Users",
        category: "Accessibility · Graduation project",
        visualTheme: "accessibility",
        summary:
          "An accessible Flutter application for navigation and object awareness.",
        detail:
          "Connected AI recognition services and a local processing server to clear user guidance.",
        technologies: ["Flutter", "Dart", "AI integration", "Local server"],
        evidenceStatus: "cv",
      },
    ] satisfies ProjectItem[],
  },
  education: {
    degree: "Bachelor’s Degree in Computer Engineering",
    university: "Aleppo University",
    start: "2019",
    end: "2025",
  },
  languages: {
    heading: "Languages",
    items: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Intermediate" },
    ],
  },
  contactSection: {
    subheading:
      "Open to on-site, hybrid and remote mobile development opportunities, and relocation across Saudi Arabia, the UAE and other GCC countries.",
    formTitle: "Start a conversation",
    draftHint:
      "Opens your email app with a prepared draft; no data is submitted to this website.",
  },
  footer: {
    quote: "The right place was worth the wait.",
    statement: "Thoughtful interfaces. Dependable mobile experiences.",
  },
};
