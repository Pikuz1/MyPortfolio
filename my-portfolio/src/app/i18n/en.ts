import { Content } from './content.model';

/** English content */
export const en: Content = {
  "ui": {
    "nav": {
      "about": "About",
      "experience": "Experience",
      "projects": "Projects",
      "skills": "Skills",
      "education": "Education",
      "certifications": "Certifications",
      "contact": "Contact"
    },
    "header": {
      "menuToggle": "Toggle menu",
      "mainNavigation": "Main navigation",
      "language": "Language"
    },
    "footer": {
      "linkedin": "LinkedIn profile",
      "github": "GitHub profile"
    },
    "home": {
      "title": "Welcome to My Portfolio",
      "tagline": "AI Engineer and Full-Stack Software Engineer. I build AI-powered applications and reliable web platforms."
    },
    "about": {
      "downloadResume": "Download Resume",
      "workingWithMe": "Working with me",
      "toolsTitle": "Tools I use most"
    },
    "experience": {
      "title": "Experience"
    },
    "projects": {
      "title": "Projects",
      "viewOnGithub": "View on GitHub"
    },
    "skills": {
      "title": "Skills & Expertise",
      "subtitle": "An interactive 3D map of my AI, frontend and engineering skills.",
      "hint": "Drag to rotate, scroll to zoom, click a skill for details",
      "showConnections": "Show connections",
      "hideConnections": "Hide connections"
    },
    "education": {
      "title": "Education",
      "languages": "Languages"
    },
    "certifications": {
      "title": "Certifications"
    },
    "contact": {
      "title": "Contact Me",
      "intro": "Have a project, a role or a question? Send me a message, I read everything.",
      "email": "Email",
      "copyEmail": "Copy email address",
      "copied": "Copied to clipboard",
      "copyFailed": "Could not copy, please select the address",
      "location": "Location",
      "locationValue": "Kempten, Germany",
      "spokenLanguages": "English (C1) and German (B1)",
      "formTitle": "Code, Coffee & Conversations ☕💻",
      "formSubtitle": "Let’s connect!",
      "name": "Name",
      "namePlaceholder": "Your name",
      "emailPlaceholder": "your@email.com",
      "message": "Message",
      "messagePlaceholder": "Your message...",
      "nameError": "Please enter your name.",
      "emailError": "Please enter a valid email address.",
      "messageError": "Please write a message.",
      "send": "Send Message",
      "sending": "Sending...",
      "success": "Thank you! Your message has been sent.",
      "error": "Something went wrong. Please try again or email me directly.",
      "mapTitle": "Map of Kempten, Germany",
      "loadMap": "Load map",
      "mapNote": "This loads Google Maps."
    },
    "notFound": {
      "title": "Page not found",
      "text": "The page you are looking for does not exist.",
      "back": "Back to home"
    },
    "titles": {
      "home": "Priyanka Giri - AI Engineer and Full-Stack Developer",
      "about": "About | Priyanka Giri",
      "experience": "Experience | Priyanka Giri",
      "projects": "Projects | Priyanka Giri",
      "skills": "Skills | Priyanka Giri",
      "education": "Education | Priyanka Giri",
      "certifications": "Certifications | Priyanka Giri",
      "contact": "Contact | Priyanka Giri",
      "notFound": "Page not found | Priyanka Giri"
    },
    "description": "Portfolio of Priyanka Giri, an AI engineer and full-stack software engineer building LLM applications, RAG systems and production web platforms with Python, FastAPI, React, TypeScript and Angular."
  },
  "about": {
    "name": "Priyanka Giri",
    "role": "AI Engineer | Full-Stack Software Engineer",
    "description": [
      "Hi, I'm Priyanka. I am a software engineer with more than <strong>five years of experience</strong> building web applications that people use every day, in finance, data analysis and industrial automation. For the past year my focus has been <strong>artificial intelligence</strong>.",
      "What I enjoy most is turning an idea into a product that really works. I build tools that let people <strong>ask questions in plain language</strong> and get reliable answers, for example an assistant that reads a contract and points to the exact page where the answer comes from. I take care of the whole path, from the data and the server to the screen you click on.",
      "Most recently I built an <strong>analytics platform from scratch</strong> at an early-stage startup: users ask a question in their own words and get the answer as an interactive chart. Before that I spent more than two years on a large web platform for construction companies, including interactive <strong>3D views</strong>, and earlier I built live dashboards for a cryptocurrency platform.",
      "I hold a Master's degree in <strong>Computer Science</strong> from Paderborn University. My thesis on routing in networks and my student job in machine learning gave me a solid foundation, which I now use to build practical AI applications."
    ],
    "resumeLink": "/assets/Priyanka_Giri_AI_Engineer.pdf",
    "photo": "assets/priyanka-portrait.webp",
    "tools": [
      "Python",
      "FastAPI",
      "LangChain",
      "React",
      "TypeScript",
      "Angular",
      "Three.js",
      "Docker"
    ],
    "howIWork": [
      {
        "title": "Results you can measure",
        "text": "When I built DocuMind, I checked its quality with a fixed set of test questions and kept improving it until the right passage was among the top four results for every question. I prefer facts over gut feeling."
      },
      {
        "title": "Built to last",
        "text": "Automated tests, clear checks before every release and simple deployment are part of my work from day one, so new features do not break the old ones."
      },
      {
        "title": "From idea to product",
        "text": "I can work on every layer, from the database and the server to the screen. That lets an idea move from the first sketch to a working product without handovers."
      },
      {
        "title": "Close to the team and the product",
        "text": "I like working directly with founders, designers and colleagues to decide what to build first and why. I keep learning, especially in teams that care about quality."
      }
    ]
  },
  "experience": [
    {
      "company": "Early-Stage Startup Product",
      "role": "Fullstack Engineer, LLM-Powered OLAP Analytics Platform",
      "location": "Hamburg, Germany",
      "duration": "Oct 2025 - Jun 2026",
      "description": [
        "Architected and built a full-stack LLM-powered analytics platform from scratch, owning frontend systems end to end.",
        "Integrated the backend's natural-language-to-SQL service into the conversational chatbot UI via REST APIs, using response flags to render answers as interactive Chart.js charts.",
        "Designed and implemented interactive dashboards with complex data visualizations for OLAP workloads.",
        "Developed frontend architecture, services, and data models with a focus on scalability, consistency, and reliability.",
        "Collaborated with founders on system design, MVP scope, and technical strategy."
      ]
    },
    {
      "company": "Specter Automation",
      "role": "Software Engineer, Construction Automation Platform (B2B)",
      "location": "Cologne, Germany",
      "duration": "May 2022 - Oct 2024",
      "description": [
        "Developed and maintained a large-scale Angular and TypeScript B2B platform with complex UI/UX workflows.",
        "Built 3D visualization systems using Three.js, delivering interactive spatial interfaces for construction use cases.",
        "Introduced end-to-end testing with Playwright and Cypress and contributed to CI/CD pipelines via GitHub Actions.",
        "Improved frontend quality through systematic debugging, performance optimization, and code reviews."
      ]
    },
    {
      "company": "Coindex",
      "role": "Junior Frontend Developer, Cryptocurrency Platform",
      "location": "Bielefeld, Germany",
      "duration": "Dec 2019 - Aug 2021",
      "description": [
        "Built React and TypeScript dashboards for real-time cryptocurrency data with REST API and WebSocket integrations.",
        "Developed reusable component libraries and data visualization features for live market analytics.",
        "Contributed to testing automation and AWS deployments (S3, Lambda)."
      ]
    },
    {
      "company": "iDeators Technologies",
      "role": "Angular Developer",
      "duration": "Dec 2017 - Dec 2018",
      "description": [
        "Built Angular and TypeScript UI modules for a B2C e-commerce platform.",
        "Implemented authentication flows and Firebase-based frontend features.",
        "Worked with UI/UX designers to deliver responsive, mobile-first, and user-friendly interfaces."
      ]
    }
  ],
  "projects": [
    {
      "title": "DocuMind: Multilingual RAG Assistant for Contracts",
      "institution": "Personal Project (Oct 2026)",
      "link": "https://github.com/Pikuz1/Documind",
      "description": [
        "Built a full-stack RAG application: upload a German or English contract PDF, ask questions, and get answers citing the source page (Python, FastAPI, LangChain, ChromaDB, Gemini, React, TypeScript).",
        "Built the ingestion pipeline with page-aware chunking and local multilingual embeddings; evaluated retrieval with a golden question set and tuned chunking to reach 100% hit@4.",
        "Privacy-first and production-ready: uploads deleted after indexing, 190+ tests with 100% coverage, Playwright E2E, Docker, and GitHub Actions CI on Linux, Windows, and macOS."
      ]
    },
    {
      "title": "Smart Factory Digital Twin",
      "institution": "Personal Project (May 2025 - Present)",
      "link": "https://github.com/Pikuz1/SmartFactoryDigitalTwin",
      "description": [
        "Built a real-time React and TypeScript UI system with Three.js and WebSocket for interactive factory visualization.",
        "Designed user-centric UI/UX workflows for monitoring, control, and status-based machine interactions.",
        "Developed reusable frontend components and responsive layouts for a scalable control panel experience.",
        "Focused on real-time state synchronization, usability, performance, and clear visual feedback."
      ]
    },
    {
      "title": "Near-Shortest Path Routing in Hybrid Communication Networks",
      "institution": "Paderborn University, Master’s Thesis (Feb 2025 - Jul 2025)",
      "link": "https://github.com/Pikuz1/NearShortestPathfinding",
      "description": [
        "Designed and implemented routing algorithms in Python using NetworkX and Matplotlib.",
        "Focused on scalable routing strategies in hybrid network models."
      ]
    },
    {
      "title": "AICON: Artificial Intelligence for Computer Networks",
      "institution": "Paderborn University, Student Assistant (Apr 2020 - Mar 2021)",
      "description": [
        "Routing of packets in a wireless network to their respective destinations.",
        "Analysis of reinforcement learning algorithms in wireless networks using Python.",
        "Minimizing packet loss caused by signal interference, defective nodes, and the hidden terminal problem."
      ]
    },
    {
      "title": "Car Damage Assessment System",
      "institution": "Mumbai University (Jun 2018 - May 2019)",
      "description": [
        "Built a machine-learning-based image classification system for insurance use cases.",
        "Developed the frontend using Angular 6.",
        "Co-authored a paper on machine-learning-based damage assessment for insurance."
      ]
    }
  ],
  "education": [
    {
      "school": "Paderborn University",
      "degree": "Master’s in Computer Science",
      "year": "Oct 2019 - Jan 2026"
    },
    {
      "school": "Mumbai University",
      "degree": "Computer Engineering",
      "year": "Jun 2015 - May 2019"
    }
  ],
  "languages": [
    {
      "name": "English",
      "level": "C1 (Fluent, professional proficiency)"
    },
    {
      "name": "German",
      "level": "B1 (Intermediate, in progress)"
    }
  ],
  "certifications": [
    {
      "name": "AWS Solutions Architect Associate Certification",
      "year": "Ongoing"
    }
  ],
  "skillCategories": [
    {
      "id": "all",
      "name": "All Skills"
    },
    {
      "id": "ai",
      "name": "AI & LLM"
    },
    {
      "id": "frontend",
      "name": "Frontend Development"
    },
    {
      "id": "uiux",
      "name": "UI/UX & Styling"
    },
    {
      "id": "testing",
      "name": "Testing & Automation"
    },
    {
      "id": "backend",
      "name": "Backend & APIs"
    },
    {
      "id": "devops",
      "name": "Cloud & DevOps"
    },
    {
      "id": "collab",
      "name": "Collaboration Tools"
    },
    {
      "id": "languages",
      "name": "Programming Languages"
    }
  ],
  "skillDescriptions": {
    "RAG": "Retrieval-augmented generation: grounding LLM answers in retrieved source documents, such as citing the page of a contract.",
    "LangChain": "A framework for composing LLM applications from prompts, retrievers, and tools.",
    "Embeddings": "Vector representations of text, built with sentence-transformers, used for multilingual semantic search.",
    "ChromaDB": "A vector database for storing embeddings and running similarity search for retrieval.",
    "Prompt Engineering": "Designing prompts and context so LLM output is accurate, grounded, and consistent.",
    "Retrieval Evaluation": "Measuring retrieval quality with golden question sets and metrics such as hit@k.",
    "Reinforcement Learning": "Training agents through reward signals; applied to packet routing in wireless networks at Paderborn University.",
    "React": "A JavaScript library for building user interfaces with component-based architecture and virtual DOM.",
    "Angular": "A platform for building mobile and desktop web applications with TypeScript and RxJS.",
    "Vue.js": "A progressive framework for building user interfaces with intuitive API and composition API.",
    "Next.js": "A React framework for server-rendered and statically generated web applications.",
    "RxJS / NgRx": "Reactive programming and state management for Angular applications.",
    "Redux": "A predictable state container for JavaScript apps with centralized state management.",
    "Storybook": "An open source tool for developing UI components in isolation with documentation.",
    "Three.js": "A cross-browser JavaScript library for creating 3D graphics and animations in the browser.",
    "Chart.js": "A simple yet flexible JavaScript charting library for data visualization.",
    "WebGL": "A JavaScript API for rendering interactive 3D and 2D graphics within any compatible web browser.",
    "HTML5": "The latest evolution of the standard that defines HTML with new semantic elements and APIs.",
    "CSS3": "The latest evolution of the Cascading Style Sheets language with animations, grids, and flexbox.",
    "SCSS": "A preprocessor scripting language that is interpreted into CSS with variables, nesting, and mixins.",
    "Tailwind": "A utility-first CSS framework for rapid UI development with customizable design system.",
    "Bootstrap": "The most popular HTML, CSS, and JS library in the world for responsive, mobile-first projects.",
    "Responsive Design": "An approach to web design that makes web pages render well on various devices and screen sizes.",
    "Accessibility (WCAG)": "Ensuring web content is accessible to people with disabilities following Web Content Accessibility Guidelines.",
    "Cypress": "A front-end testing tool built for the modern web with time travel debugging and real-time reloads.",
    "Playwright": "A framework for Web Testing and Automation enabling reliable end-to-end testing.",
    "pytest": "A Python testing framework for readable, scalable unit and integration tests.",
    "Vitest": "A fast unit testing framework for Vite-based projects with a Jest-compatible API.",
    "Jest": "A delightful JavaScript Testing Framework with a focus on simplicity and support for large web applications.",
    "Unit Testing": "A software testing method by which individual units of source code are tested to determine proper operation.",
    "E2E Testing": "A methodology used to test whether the flow of an application is performing as designed from start to finish.",
    "CI/CD Pipelines": "Automating the software delivery process through continuous integration and continuous deployment.",
    "Node.js": "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
    "FastAPI": "A modern Python web framework for building fast, typed, async APIs.",
    "Flask": "A lightweight WSGI web application framework in Python with modular design and simplicity.",
    "REST API Integration": "Building and integrating RESTful web services following representational state transfer principles.",
    "Firebase": "A platform developed by Google for creating mobile and web applications with backend services.",
    "SQLite": "A lightweight, file-based relational database.",
    "MongoDB": "A source-available cross-platform document-oriented database program using JSON-like documents.",
    "SQL": "A domain-specific language used in programming for managing data held in relational database management systems.",
    "AWS (S3, Lambda)": "Amazon Web Services - Cloud computing services including S3 storage and Lambda serverless computing.",
    "Docker": "A set of platform as a service products that use OS-level virtualization to deliver software in containers.",
    "GitHub Actions": "A continuous integration and continuous delivery platform for automating workflows.",
    "Jira": "A proprietary issue tracking product developed by Atlassian for agile project management.",
    "Trello": "A web-based list-making application with Kanban-style task management.",
    "Slack": "A proprietary business communication platform with channels, direct messaging, and integrations.",
    "ClickUp": "A productivity platform that provides tools for tasks, docs, goals, and chat in one app.",
    "TypeScript": "A programming language developed and maintained by Microsoft adding static typing to JavaScript.",
    "JavaScript": "A programming language that conforms to the ECMAScript specification for web development.",
    "Python": "An interpreted high-level general-purpose programming language with clear syntax.",
    "Java": "A high-level, class-based, object-oriented programming language with minimal implementation dependencies.",
    "Gemini API": "Google's LLM API, used to generate grounded answers from retrieved context."
  }
};
