import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getAboutMe() {
    return {
      name: 'Priyanka Giri',
      role: 'Frontend / UI Engineer',
      description: [
        `I am a <strong>Frontend-focused Software Engineer</strong> with 5+ years of experience building
        <strong>UI/UX-driven, scalable, and responsive web applications</strong>. I specialize in
        <strong>React</strong>, <strong>TypeScript</strong>, <strong>Angular</strong>, and modern frontend architecture,
        with a strong focus on <strong>design systems</strong>, <strong>component libraries</strong>, and
        <strong>user-centered product experiences</strong>.`,

        `I have hands-on experience translating <strong>wireframes, user flows, and Figma prototypes</strong>
        into production-ready interfaces. My work focuses on building clean, accessible, and performant
        frontend applications using <strong>React, TypeScript, Angular, TailwindCSS, SCSS, Storybook,
        Playwright, Jest, Testing Library, and Cypress</strong>.`,

        `At <strong>Specter Automation</strong>, I developed complex B2B construction automation interfaces,
        contributed to <strong>UI/UX-heavy workflows</strong>, built interactive <strong>Three.js</strong>
        visualization features, and improved frontend quality through testing, debugging, and performance
        optimization. Previously, at <strong>Coindex</strong>, I built <strong>React + TypeScript</strong>
        interfaces for real-time cryptocurrency dashboards with reusable components and data visualizations.`,

        `I am passionate about creating software that combines <strong>strong engineering</strong> with
        <strong>thoughtful UI/UX design</strong>. I enjoy working from discovery to delivery — understanding
        user needs, designing intuitive workflows, and building accessible, responsive, and reliable
        frontend systems.`
      ],
      resumeLink: '/assets/Priyanka_Giri_CV.pdf'
    };
  }

  getExperience() {
    return [
      {
        company: 'Early-Stage Startup Product',
        role: 'Full-Stack(UI-UX Focused) Developer',
        duration: 'Nov 2025 – Feb 2026',
        description: [
          'Led frontend architecture for an LLM-powered analytics platform using Angular, TypeScript, and Angular Material.',
          'Owned UI/UX design in Figma, creating user flows, interaction patterns, and analytical dashboard experiences.',
          'Built modular UI services, reusable components, and data-driven dashboard interfaces with strong usability focus.',
          'Integrated APIs and handled authentication, caching, error states, and real-time UI updates.',
          'Collaborated closely with founders to define product scope, improve user experience, and deliver the MVP.'
        ]
      },
      {
        company: 'Specter Automation',
        role: 'Software Engineer',
        duration: 'May 2022 – Oct 2024',
        description: [
          'Developed and maintained a large-scale Angular and TypeScript B2B web platform for construction automation.',
          'Built UI/UX-focused workflows, responsive interfaces, and reusable frontend components.',
          'Developed advanced 3D BIM visualization features using Three.js with a focus on usability and performance.',
          'Implemented Playwright-based end-to-end testing to improve frontend reliability and product quality.',
          'Worked closely with designers and product stakeholders to translate UX requirements into production-ready interfaces.'
        ]
      },
      {
        company: 'Coindex',
        role: 'Junior Frontend Developer',
        duration: 'Dec 2019 – Aug 2021',
        description: [
          'Developed React and TypeScript interfaces for real-time cryptocurrency trading dashboards.',
          'Built reusable UI components using Storybook-driven development.',
          'Created data visualization features using D3.js, Chart.js, Redux, and API integrations.',
          'Focused on responsive design, predictable UI state management, and cross-browser compatibility.',
          'Supported frontend testing and QA workflows using Cypress.'
        ]
      },
      {
        company: 'iDeators Technologies',
        role: 'Angular Developer',
        duration: 'Dec 2017 – Dec 2018',
        description: [
          'Built Angular and TypeScript UI modules for a B2C e-commerce platform.',
          'Implemented authentication flows and Firebase-based frontend features.',
          'Worked with UI/UX designers to deliver responsive, mobile-first, and user-friendly interfaces.'
        ]
      }
    ];
  }

  getProjects() {
    return [
      {
        title: 'Smart Factory Digital Twin',
        institution: 'Personal Project (May 2025 – Present)',
        description: [
          'Built a real-time React and TypeScript UI system with Three.js and WebSocket for interactive factory visualization.',
          'Designed user-centric UI/UX workflows for monitoring, control, and status-based machine interactions.',
          'Developed reusable frontend components and responsive layouts for a scalable control panel experience.',
          'Focused on real-time state synchronization, usability, performance, and clear visual feedback.'
        ]
      },
      {
        title: 'Near-Shortest Path Routing in Hybrid Communication Networks',
        institution: 'Paderborn University — Master’s Thesis (Feb 2025 – Jul 2025)',
        description: [
          'Designed and implemented routing algorithms in Python using NetworkX and Matplotlib.',
          'Built visualizations for graph-based routing, grid abstractions, and hybrid communication network models.',
          'Focused on scalable routing strategies and clear technical visualization of algorithm behavior.'
        ]
      },
      {
        title: 'AICON: Artificial Intelligence for Computer Networks',
        institution: 'Paderborn University (Apr 2020 – Mar 2021)',
        description: [
          'Applied reinforcement learning techniques to wireless network optimization problems.',
          'Analyzed AI-based routing strategies for improving packet transfer efficiency.',
          'Created network visualizations using NetworkX.'
        ]
      },
      {
        title: 'Car Damage Assessment System',
        institution: 'Mumbai University (Jun 2018 – May 2019)',
        description: [
          'Built a machine-learning-based image classification system for car damage assessment.',
          'Developed the frontend interface using Angular.',
          'Co-authored a research paper on machine-learning-based damage assessment for insurance use cases.'
        ]
      }
    ];
  }

  getEducation() {
    return [
      { school: 'Paderborn University', degree: 'Master’s in Computer Science', year: 'Oct. 2019 – Jan. 2026' },
      { school: 'Mumbai University', degree: 'Bachelor’s in Computer Engineering', year: 'Jun. 2015 – May 2019' }
    ];
  }

  getCertifications() {
    return [
      { name: 'AWS Solutions Architect Associate Certification', year: 'Ongoing' }
    ];
  }

  getContact() {
    return {
      email: 'priyanka.giri.0397@gmail.com',
      linkedin: 'https://linkedin.com/in/priyanka-giri-fullstack-developer/',
      github: 'https://github.com/Pikuz1',
      address: {
        location: 'Kempten, Germany',
        googleMapsUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42933.22469351866!2d10.264157779998873!3d47.736318603278555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7907da67c911%3A0xbca5bb95c833b02b!2sKempten!5e0!3m2!1sen!2sde!4v1738253394505!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
      }
    };
  }

}