import { Injectable } from '@angular/core';
import { AboutMe, Certification, Contact, Education, Experience, Language, Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getAboutMe(): AboutMe {
    return {
      name: 'Priyanka Giri',
      role: 'AI Engineer | Full-Stack Software Engineer',
      description: [
        `I am a <strong>Software Engineer</strong> with 5+ years of experience building
        <strong>production-grade web platforms</strong> across <strong>fintech, analytics, and automation</strong>,
        now focused on <strong>AI engineering</strong>.`,
        `I build <strong>LLM applications</strong> end to end: <strong>retrieval-augmented generation (RAG)</strong>,
        <strong>embeddings and vector search</strong>, and conversational chatbot interfaces, with
        <strong>Python and FastAPI</strong> backends and <strong>React and TypeScript</strong> frontends. I am also
        comfortable with <strong>Angular</strong>, <strong>REST API integration</strong>,
        <strong>data visualization</strong>, testing, and <strong>CI/CD</strong>.`,
        `Most recently I built an <strong>LLM-powered OLAP analytics platform</strong> from scratch at an early-stage
        startup, where I plugged a natural-language-to-SQL service into a chatbot that answers with interactive
        <strong>Chart.js</strong> charts. At <strong>Specter Automation</strong> I built a large Angular B2B platform
        with <strong>Three.js</strong> 3D visualizations, and at <strong>Coindex</strong> I built real-time
        cryptocurrency dashboards in React.`,
        `My Master's in Computer Science at <strong>Paderborn University</strong>, including a thesis on routing
        algorithms and work on <strong>reinforcement learning</strong>, gave me a solid base in algorithms and
        machine learning.`
      ],
      resumeLink: '/assets/Priyanka_Giri_AI_Engineer.pdf',
      photo: 'assets/priyanka-portrait.webp',
      howIWork: [
        {
          title: 'AI features I can measure',
          text: 'When I built DocuMind, I evaluated retrieval with a golden question set and tuned chunking until it reached 100% hit@4, instead of judging answers by feel.'
        },
        {
          title: 'Tested and ready for production',
          text: 'I care about tests, CI and deployment from the start: automated tests, Playwright end-to-end checks, Docker and GitHub Actions on Linux, Windows and macOS.'
        },
        {
          title: 'Full-stack discipline',
          text: 'I move between the data model, the API and the interface, so an idea can go from the first conversation with the team to something users can try.'
        },
        {
          title: 'Close to the product',
          text: 'I like working directly with founders and designers on scope and system design, and I keep learning in teams that value quality.'
        }
      ]
    };
  }

  getExperience(): Experience[] {
    return [
      {
        company: 'Early-Stage Startup Product',
        role: 'Fullstack Engineer, LLM-Powered OLAP Analytics Platform',
        location: 'Hamburg, Germany',
        duration: 'Oct 2025 - Jun 2026',
        description: [
          'Architected and built a full-stack LLM-powered analytics platform from scratch, owning frontend systems end to end.',
          "Integrated the backend's natural-language-to-SQL service into the conversational chatbot UI via REST APIs, using response flags to render answers as interactive Chart.js charts.",
          'Designed and implemented interactive dashboards with complex data visualizations for OLAP workloads.',
          'Developed frontend architecture, services, and data models with a focus on scalability, consistency, and reliability.',
          'Collaborated with founders on system design, MVP scope, and technical strategy.'
        ]
      },
      {
        company: 'Specter Automation',
        role: 'Software Engineer, Construction Automation Platform (B2B)',
        location: 'Cologne, Germany',
        duration: 'May 2022 - Oct 2024',
        description: [
          'Developed and maintained a large-scale Angular and TypeScript B2B platform with complex UI/UX workflows.',
          'Built 3D visualization systems using Three.js, delivering interactive spatial interfaces for construction use cases.',
          'Introduced end-to-end testing with Playwright and Cypress and contributed to CI/CD pipelines via GitHub Actions.',
          'Improved frontend quality through systematic debugging, performance optimization, and code reviews.'
        ]
      },
      {
        company: 'Coindex',
        role: 'Junior Frontend Developer, Cryptocurrency Platform',
        location: 'Bielefeld, Germany',
        duration: 'Dec 2019 - Aug 2021',
        description: [
          'Built React and TypeScript dashboards for real-time cryptocurrency data with REST API and WebSocket integrations.',
          'Developed reusable component libraries and data visualization features for live market analytics.',
          'Contributed to testing automation and AWS deployments (S3, Lambda).'
        ]
      },
      {
        company: 'iDeators Technologies',
        role: 'Angular Developer',
        duration: 'Dec 2017 - Dec 2018',
        description: [
          'Built Angular and TypeScript UI modules for a B2C e-commerce platform.',
          'Implemented authentication flows and Firebase-based frontend features.',
          'Worked with UI/UX designers to deliver responsive, mobile-first, and user-friendly interfaces.'
        ]
      }
    ];
  }

  getProjects(): Project[] {
    return [
      {
        title: 'DocuMind: Multilingual RAG Assistant for Contracts',
        institution: 'Personal Project (Oct 2026)',
        link: 'https://github.com/Pikuz1/Documind',
        description: [
          'Built a full-stack RAG application: upload a German or English contract PDF, ask questions, and get answers citing the source page (Python, FastAPI, LangChain, ChromaDB, Gemini, React, TypeScript).',
          'Built the ingestion pipeline with page-aware chunking and local multilingual embeddings; evaluated retrieval with a golden question set and tuned chunking to reach 100% hit@4.',
          'Privacy-first and production-ready: uploads deleted after indexing, 190+ tests with 100% coverage, Playwright E2E, Docker, and GitHub Actions CI on Linux, Windows, and macOS.'
        ]
      },
      {
        title: 'Smart Factory Digital Twin',
        institution: 'Personal Project (May 2025 - Present)',
        link: 'https://github.com/Pikuz1/SmartFactoryDigitalTwin',
        description: [
          'Built a real-time React and TypeScript UI system with Three.js and WebSocket for interactive factory visualization.',
          'Designed user-centric UI/UX workflows for monitoring, control, and status-based machine interactions.',
          'Developed reusable frontend components and responsive layouts for a scalable control panel experience.',
          'Focused on real-time state synchronization, usability, performance, and clear visual feedback.'
        ]
      },
      {
        title: 'Near-Shortest Path Routing in Hybrid Communication Networks',
        institution: 'Paderborn University, Master’s Thesis (Feb 2025 - Jul 2025)',
        link: 'https://github.com/Pikuz1/NearShortestPathfinding',
        description: [
          'Designed and implemented routing algorithms in Python using NetworkX and Matplotlib.',
          'Focused on scalable routing strategies in hybrid network models.'
        ]
      },
      {
        title: 'AICON: Artificial Intelligence for Computer Networks',
        institution: 'Paderborn University, Student Assistant (Apr 2020 - Mar 2021)',
        description: [
          'Routing of packets in a wireless network to their respective destinations.',
          'Analysis of reinforcement learning algorithms in wireless networks using Python.',
          'Minimizing packet loss caused by signal interference, defective nodes, and the hidden terminal problem.'
        ]
      },
      {
        title: 'Car Damage Assessment System',
        institution: 'Mumbai University (Jun 2018 - May 2019)',
        description: [
          'Built a machine-learning-based image classification system for insurance use cases.',
          'Developed the frontend using Angular 6.',
          'Co-authored a paper on machine-learning-based damage assessment for insurance.'
        ]
      }
    ];
  }

  getEducation(): Education[] {
    return [
      { school: 'Paderborn University', degree: 'Master’s in Computer Science', year: 'Oct 2019 - Jan 2026' },
      { school: 'Mumbai University', degree: 'Computer Engineering', year: 'Jun 2015 - May 2019' }
    ];
  }

  getLanguages(): Language[] {
    return [
      { name: 'English', level: 'C1 (Fluent, professional proficiency)' },
      { name: 'German', level: 'B1 (Intermediate, in progress)' }
    ];
  }

  getCertifications(): Certification[] {
    return [
      { name: 'AWS Solutions Architect Associate Certification', year: 'Ongoing' }
    ];
  }

  getContact(): Contact {
    return {
      email: 'priyanka.giri.0397@gmail.com',
      linkedin: 'https://linkedin.com/in/priyanka-giri-fullstack-developer/',
      github: 'https://github.com/Pikuz1',
      address: {
        location: 'Kempten, Germany'
      }
    };
  }

}