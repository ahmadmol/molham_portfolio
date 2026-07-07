export type ExperienceItem = {
  role: string;
  company: string;
  locationOrMeta?: string;
  start: string;
  end: string;
  highlights: string[];
  technologies: string[];
};

export type ProjectItem = {
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  result: string;

  // Optional enrichment fields (supported by UI; content may not provide them yet)
  screenshotUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type PortfolioData = {
  metaTitle: string;
  metaDescription: string;

  title: string;
  subtitle: string;
  location: string;

  // Optional: provide a real CV/Resume URL if available.
  // Must not be populated with a fake link.
  resumeUrl?: string;

  contact: {
    email: string;
    phone: string;
    linkedInUrl: string;
    gitHubUrl: string;
  };

  hero: {
    statement: string;
    details: string;
    currentRole: string;
    bullets: string[];
  };

  about: {
    heading: string;
    paragraphs: string[];
    whyWorkWithMe: string[];
    currentFocus: string[];
  };

  coreSkills: {
    heading: string;
    groups: Array<{
      title: string;
      items: string[];
    }>;
  };

  experience: {
    heading: string;
    items: ExperienceItem[];
  };

  featuredProjects: {
    heading: string;
    items: ProjectItem[];
  };

  education: {
    heading: string;
    degree: string;
    university: string;
    start: string;
    end: string;
  };

  languages: {
    heading: string;
    items: Array<{ name: string; level: string }>;
  };

  contactSection: {
    heading: string;
    subheading: string;
  };

  footer: {
    quote: string;
  };
};

export const portfolio: PortfolioData = {
  metaTitle: "Molham Alnaeb — Android Developer",
  metaDescription:
    "Android Developer specialized in Kotlin, Jetpack Compose, REST APIs, and modern mobile engineering.",

  title: "Molham Alnaeb",
  subtitle: "Android Developer | Kotlin • Jetpack Compose • Java",
  location: "Aleppo, Syria",

  contact: {
    email: "molhamalnaab@gmail.com",
    phone: "+963 967225762",
    linkedInUrl: "linkedin.com/in/ahmad-molham-alnaeb",
    gitHubUrl: "github.com/ahmadmol",
  },

  hero: {
    statement: "Building Android applications that solve real-world business problems.",
    details:
      "Android Developer specialized in Kotlin, Jetpack Compose, REST APIs, SQLite, Supabase, Authentication, Maps Integration, and Payment Workflows.",
    currentRole:
      "Currently working as a Kotlin Developer at SWB Company while continuously building modern Android solutions and improving my software engineering skills.",
    bullets: [
      "Kotlin & Jetpack Compose",
      "REST APIs • SQLite • Supabase",
      "Authentication • Maps • Payment Workflows",
    ],
  },

  about: {
    heading: "About Me",
    paragraphs: [
      "I am an Android Developer and Computer Engineering graduate passionate about building high-quality mobile applications using modern Android technologies.",
      "My experience spans freelance development, company-based software development, and academic projects. I have worked on applications across multiple domains including education, real estate, product marketing, auctions, and accessibility solutions.",
      "I enjoy transforming business requirements into reliable mobile products with clean architecture, maintainable code, and user-friendly experiences.",
    ],
    whyWorkWithMe: [
      "Strong Android Development Skills",
      "Real Company Experience",
      "Freelance Project Experience",
      "Clean and Maintainable Code",
      "Fast Learner",
      "Business-Oriented Mindset",
      "Problem Solver",
      "Continuous Improvement",
    ],
    currentFocus: [
      "Advanced Jetpack Compose",
      "Modern Android Architecture",
      "Clean Architecture",
      "Scalable Android Applications",
      "Mobile Performance Optimization",
      "Professional Software Development Practices",
    ],
  },

  coreSkills: {
    heading: "Core Skills",
    groups: [
      {
        title: "Android Development",
        items: ["Kotlin", "Jetpack Compose", "Java", "Android SDK"],
      },
      {
        title: "Backend & Data",
        items: ["REST APIs", "Supabase", "SQLite", "Local Storage"],
      },
      {
        title: "Mobile Features",
        items: [
          "Authentication",
          "User Management",
          "Payment Integration",
          "Maps & Location Services",
          "API Integration",
        ],
      },
      {
        title: "Software Engineering",
        items: [
          "Object-Oriented Programming (OOP)",
          "Data Structures",
          "Problem Solving",
          "Git",
          "GitHub",
          "Clean Code Principles",
        ],
      },
    ],
  },

  experience: {
    heading: "Experience",
    items: [
      {
        role: "Kotlin Developer",
        company: "SWB Company",
        locationOrMeta: "Aleppo, Syria",
        start: "February 2026",
        end: "Present",
        highlights: [
          "Working as a Kotlin Developer within a professional software development team.",
          "Participated in developing and maintaining more than 5 production applications.",
          "Built Android features using Kotlin and Jetpack Compose.",
          "Implemented business requirements into scalable and maintainable solutions.",
          "Collaborated with developers and stakeholders to deliver software features.",
          "Worked with REST APIs, local storage solutions, and authentication systems.",
          "Contributed to debugging, testing, optimization, and code improvements.",
          "Followed clean coding practices and maintainable architecture patterns.",
        ],
        technologies: [
          "Kotlin",
          "Jetpack Compose",
          "Android SDK",
          "REST APIs",
          "SQLite",
          "Git",
          "GitHub",
        ],
      },
      {
        role: "Freelance Mobile Developer",
        company: "",
        start: "2023",
        end: "Present",
        highlights: [
          "Built more than 5 mobile applications across different industries.",
          "Developed Android applications using Kotlin and Jetpack Compose.",
          "Integrated REST APIs and Supabase services.",
          "Implemented authentication and authorization systems.",
          "Added maps and location-based functionality.",
          "Built local storage solutions using SQLite.",
          "Implemented payment-related workflows.",
          "Assisted students and teams with graduation projects and technical implementation.",
        ],
        technologies: [
          "Kotlin",
          "Jetpack Compose",
          "REST APIs",
          "Supabase",
          "Authentication",
          "SQLite",
          "Maps Integration",
          "Payment Workflows",
        ],
      },
      {
        role: "Java Developer — IoT Project",
        company: "Remocola Company",
        start: "3 Months",
        end: "",
        highlights: [
          "Worked as a Java Developer on an IoT project.",
          "Implemented Java business logic and functionality.",
          "Participated in testing and debugging activities.",
          "Collaborated with team members to solve technical challenges.",
        ],
        technologies: ["Java", "IoT", "Testing", "Debugging"],
      },
    ],
  },

  featuredProjects: {
    heading: "Featured Projects",
    items: [
      {
        title: "Smart Assistant for the Blind",
        problem:
          "Visually impaired users often face challenges identifying objects and navigating their environment independently.",
        solution:
          "Developed a mobile application connected to AI-powered recognition services and a local server to identify objects and shapes in real time.",
        technologies: ["Flutter", "AI Integration", "Local Server", "Object Recognition"],
        result:
          "Delivered an accessibility-focused solution that helps users better understand and interact with their surroundings.",
      },
      {
        title: "Real Estate Mobile Application",
        problem: "Property seekers need an efficient way to discover and explore available properties.",
        solution:
          "Built a mobile platform that allows users to browse property listings with location-based functionality.",
        technologies: ["Kotlin", "Jetpack Compose", "REST APIs", "Maps Integration"],
        result: "Improved property exploration through a modern mobile experience.",
      },
      {
        title: "Horse Auction Application",
        problem: "Auction participants require an intuitive way to browse listings and interact with auction items.",
        solution:
          "Developed mobile screens and business workflows supporting auction-related activities.",
        technologies: ["Kotlin", "Jetpack Compose", "Supabase"],
        result: "Provided a user-friendly mobile experience for auction browsing and interaction.",
      },
      {
        title: "Quiz & Testing Application",
        problem: "Students need a structured and reliable testing environment.",
        solution:
          "Built an examination-style application featuring question management, answer tracking, and results screens.",
        technologies: ["Kotlin", "SQLite", "Android SDK"],
        result: "Delivered a smooth and efficient assessment experience.",
      },
    ],
  },

  education: {
    heading: "Education",
    degree: "Bachelor's Degree in Computer Engineering",
    university: "University of Aleppo",
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
    heading: "Contact",
    subheading: "Let’s build something that makes mobile feel effortless.",
  },

  footer: {
    quote: "The right place was worth the wait. Building Android products, solving real problems, and learning every day. 🚀",
  },
};
