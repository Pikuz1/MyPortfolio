import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getAboutMe() {
    return {
      name: 'Priyanka Giri',
      role: 'Software Engineer',
      description: `I am a Software Engineer with a strong technical background in Full-Stack Development, specializing in Angular, React, TypeScript, and Python. With a Master’s in Computer Science from Paderborn University, I have gained expertise in designing and building scalable applications, leveraging modern frameworks and cloud technologies. My professional journey includes developing B2B solutions, automation in construction, and cryptocurrency exchange platforms, where I played a key role in frontend architecture, API integration, automated testing, and CI/CD workflows.

Beyond coding, I have a deep interest in networking and AI-driven solutions, contributing to projects on hybrid communication networks and AI-powered routing algorithms. My experience spans building intuitive user interfaces, optimizing performance, and ensuring robust software quality through automated testing frameworks like Cypress and Playwright. With a passion for continuous learning, I am currently pursuing AWS Solutions Architect certification to expand my cloud expertise.

`
    };
  }

  getExperience() {
    return [
      {
        company: 'Specter Automation',
        role: 'Software Engineer',
        duration: 'May 2022 – Oct 2023',
        description: `Developed digitalized B2B construction products using Angular16, TailwindCSS, Docker, and AWS S3. Built new features in BIM Engine using ThreeJS.`
      },
      {
        company: 'Coindex',
        role: 'Junior Frontend Developer',
        duration: 'Dec 2019 - Aug 2021',
        description: `Developed reusable components for a B2B cryptocurrency exchange using React, Redux, and AWS Lambda.`
      }
    ];
  }

  getProjects() {
    return [
      {
        title: 'Near-Shortest Path Routing in Hybrid Networks',
        description: 'Developed a hybrid communication system using Unit Disk Graph abstraction with Python and ns-3.'
      },
      {
        title: 'AICON: AI for Computer Networks',
        description: 'Implemented reinforcement learning algorithms for wireless network optimization using TensorFlow.'
      }
    ];
  }

  getSkills() {
    return ['Angular', 'React', 'TypeScript', 'Python', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'TailwindCSS'];
  }

  getEducation() {
    return [
      { school: 'Paderborn University', degree: 'Masters in Computer Science', year: '2019 - 2025' },
      { school: 'Mumbai University', degree: 'Bachelors in Computer Engineering', year: '2015 - 2019' }
    ];
  }

  getCertifications() {
    return [
      { name: 'AWS Solutions Architect Associate', year: '2024 - Ongoing' }
    ];
  }

  getContact() {
    return {
      email: 'priyankagiri.oyeindia@gmail.com',
      linkedin: 'https://linkedin.com/in/priyanka-giri-fullstack-developer/',
      github: 'https://github.com/Pikuz1'
    };
  }
}
