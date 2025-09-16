import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  getSkills(): any[] {
    return [
      // Frontend Development
      { name: 'React', category: 'frontend', description: 'A JavaScript library for building user interfaces with component-based architecture and virtual DOM.' },
      { name: 'Angular', category: 'frontend', description: 'A platform for building mobile and desktop web applications with TypeScript and RxJS.' },
      { name: 'Vue.js', category: 'frontend', description: 'A progressive framework for building user interfaces with intuitive API and composition API.' },
      { name: 'Redux', category: 'frontend', description: 'A predictable state container for JavaScript apps with centralized state management.' },
      { name: 'Storybook', category: 'frontend', description: 'An open source tool for developing UI components in isolation with documentation.' },
      { name: 'Three.js', category: 'frontend', description: 'A cross-browser JavaScript library for creating 3D graphics and animations in the browser.' },
      { name: 'Chart.js', category: 'frontend', description: 'A simple yet flexible JavaScript charting library for data visualization.' },
      { name: 'WebGL', category: 'frontend', description: 'A JavaScript API for rendering interactive 3D and 2D graphics within any compatible web browser.' },

      // UI/UX & Styling
      { name: 'HTML5', category: 'uiux', description: 'The latest evolution of the standard that defines HTML with new semantic elements and APIs.' },
      { name: 'CSS3', category: 'uiux', description: 'The latest evolution of the Cascading Style Sheets language with animations, grids, and flexbox.' },
      { name: 'SCSS', category: 'uiux', description: 'A preprocessor scripting language that is interpreted into CSS with variables, nesting, and mixins.' },
      { name: 'Tailwind', category: 'uiux', description: 'A utility-first CSS framework for rapid UI development with customizable design system.' },
      { name: 'Bootstrap', category: 'uiux', description: 'The most popular HTML, CSS, and JS library in the world for responsive, mobile-first projects.' },
      { name: 'Responsive Design', category: 'uiux', description: 'An approach to web design that makes web pages render well on various devices and screen sizes.' },
      { name: 'Accessibility (WCAG)', category: 'uiux', description: 'Ensuring web content is accessible to people with disabilities following Web Content Accessibility Guidelines.' },

      // Testing & Automation
      { name: 'Cypress', category: 'testing', description: 'A front-end testing tool built for the modern web with time travel debugging and real-time reloads.' },
      { name: 'Playwright', category: 'testing', description: 'A framework for Web Testing and Automation enabling reliable end-to-end testing.' },
      { name: 'Jest', category: 'testing', description: 'A delightful JavaScript Testing Framework with a focus on simplicity and support for large web applications.' },
      { name: 'Unit Testing', category: 'testing', description: 'A software testing method by which individual units of source code are tested to determine proper operation.' },
      { name: 'E2E Testing', category: 'testing', description: 'A methodology used to test whether the flow of an application is performing as designed from start to finish.' },
      { name: 'CI/CD Pipelines', category: 'testing', description: 'Automating the software delivery process through continuous integration and continuous deployment.' },

      // Backend & APIs
      { name: 'Node.js', category: 'backend', description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine for building scalable network applications.' },
      { name: 'Flask', category: 'backend', description: 'A lightweight WSGI web application framework in Python with modular design and simplicity.' },
      { name: 'REST API Integration', category: 'backend', description: 'Building and integrating RESTful web services following representational state transfer principles.' },
      { name: 'Firebase', category: 'backend', description: 'A platform developed by Google for creating mobile and web applications with backend services.' },
      { name: 'MongoDB', category: 'backend', description: 'A source-available cross-platform document-oriented database program using JSON-like documents.' },
      { name: 'SQL', category: 'backend', description: 'A domain-specific language used in programming for managing data held in relational database management systems.' },

      // Cloud & DevOps
      { name: 'AWS (S3, Lambda)', category: 'devops', description: 'Amazon Web Services - Cloud computing services including S3 storage and Lambda serverless computing.' },
      { name: 'Docker', category: 'devops', description: 'A set of platform as a service products that use OS-level virtualization to deliver software in containers.' },
      { name: 'GitHub Actions', category: 'devops', description: 'A continuous integration and continuous delivery platform for automating workflows.' },

      // Collaboration Tools
      { name: 'Jira', category: 'collab', description: 'A proprietary issue tracking product developed by Atlassian for agile project management.' },
      { name: 'Trello', category: 'collab', description: 'A web-based list-making application with Kanban-style task management.' },
      { name: 'Slack', category: 'collab', description: 'A proprietary business communication platform with channels, direct messaging, and integrations.' },
      { name: 'ClickUp', category: 'collab', description: 'A productivity platform that provides tools for tasks, docs, goals, and chat in one app.' },

      // Programming Languages
      { name: 'TypeScript', category: 'languages', description: 'A programming language developed and maintained by Microsoft adding static typing to JavaScript.' },
      { name: 'JavaScript', category: 'languages', description: 'A programming language that conforms to the ECMAScript specification for web development.' },
      { name: 'Python', category: 'languages', description: 'An interpreted high-level general-purpose programming language with clear syntax.' },
      { name: 'Java', category: 'languages', description: 'A high-level, class-based, object-oriented programming language with minimal implementation dependencies.' }
    ];
  }

  getSkillCategories(): any[] {
    return [
      { id: 'all', name: 'All Skills' },
      { id: 'frontend', name: 'Frontend Development' },
      { id: 'uiux', name: 'UI/UX & Styling' },
      { id: 'testing', name: 'Testing & Automation' },
      { id: 'backend', name: 'Backend & APIs' },
      { id: 'devops', name: 'Cloud & DevOps' },
      { id: 'collab', name: 'Collaboration Tools' },
      { id: 'languages', name: 'Programming Languages' }
    ];
  }
}