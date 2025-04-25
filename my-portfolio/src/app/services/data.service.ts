import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getAboutMe() {
    return {
      name: 'Priyanka Giri',
      role: 'Software Engineer',
      description: [
        `I am an <strong>experienced software professional</strong> with a strong technical background in
        <strong>Software Engineering</strong>. I hold a <strong>Master’s in Computer Science</strong> from
        <strong>Paderborn University</strong>, specializing in <strong>Software Development</strong> and
        <strong>Computer Networking</strong>. With hands-on experience in <strong>Angular</strong>, <strong>React</strong>,
        <strong>Python</strong>, <strong>Node.js</strong>, <strong>DevOps</strong>, and <strong>automated testing frameworks</strong>,
        I have built scalable applications across different industries.`,

        `My professional journey began as a <strong>Junior Frontend Developer</strong>, where I developed reusable
        components and created data visualization applications using <strong>React, Redux, and AWS Lambda</strong>.
        Later, as a <strong>Software Engineer</strong> at <strong>Specter Automation</strong>, I worked on designing,
        developing, and testing digitalized B2B construction solutions, integrating <strong>ThreeJS</strong> for BIM
        engine enhancements and automating testing with <strong>Playwright</strong>. Throughout my career, I have
        focused on performance optimization, debugging, and CI/CD automation.`,

        `Beyond my professional experience, I was the <strong>Technical Secretary</strong> of my college during
        <strong>2017-2018</strong>. I managed all <strong>technical events</strong> during the annual technical festival,
        ensuring efficient <strong>resource and time management</strong> with prioritized task execution. I also conducted
        <strong>LAN (COD) gaming sessions</strong> for students each year, creating a competitive and engaging
        environment that brought together technology enthusiasts.`,

        `I am passionate about <strong>problem-solving</strong>, <strong>AI-driven solutions</strong>, and <strong>cloud technologies</strong>.
        My ongoing learning journey includes earning an <strong>AWS Solutions Architect Associate Certification</strong>
        to deepen my cloud expertise. I strive to innovate and build impactful software that enhances efficiency and
        user experience in various domains.`
      ],
      resumeLink: '/assets/Priyanka_Giri_CV.pdf'
    };
  }


  getExperience() {
    return [
      {
        company: 'Specter Automation',
        role: 'Software Engineer',
        duration: 'May 2022 – Oct 2023',
        description: [
          'Designed, developed, and tested a digitalized B2B construction product using Angular 16, TailwindCSS, Docker, CI/CD, and AWS S3.',
          'Built new features in the BIM Engine using ThreeJS.',
          'Integrated automated testing framework using Playwright.',
          'Conducted code reviews, debugging sessions, and optimized software performance.'
        ]
      },
      {
        company: 'Coindex',
        role: 'Junior Frontend Developer',
        duration: 'Dec 2019 - Aug 2021',
        description: [
          'Developed reusable components for a B2B cryptocurrency exchange platform using React, Redux, and AWS Lambda.',
          'Created a data visualization single-page application using API, Redux, and ChartJS.',
          'Built automated tests using Cypress for efficient QA testing.'
        ]
      },
      {
        company: 'iDeators Technologies',
        role: 'Angular Developer',
        duration: 'Dec 2017 - Dec 2018',
        description: [
          'Developed B2C E-commerce website components using Angular6, TypeScript, Bootstrap, and Firebase.'
        ]
      }
    ];
  }

  getProjects() {
    return [
      {
        title: 'Near-Shortest Path Routing in Hybrid Communication Networks Using Python',
        institution: 'Paderborn University (Aug 2024 – Jan 2025)',
        description: [
          'Developed a hybrid communication system using Unit Disk Graph (UDG) abstraction to grid-based networks in Python.',
          'Designed binary tree-based portal structures with interval-based labeling using networkx and Matplotlib.',
          'Integrated visualization of UDG-to-grid transformations for efficient routing.'
        ]
      },
      {
        title: 'AICON: AI for Computer Networks',
        institution: 'Paderborn University (Apr 2020 – Mar 2021)',
        description: [
          'Implemented AI-based packet routing algorithms in wireless networks using TensorFlow.',
          'Analyzed reinforcement learning algorithms to optimize packet transfer efficiency.',
          'Visualized packet movement using NetworkX.'
        ]
      },
      {
        title: 'Car Damage Assessment for Insurance',
        institution: 'Mumbai University (Jun 2018 – May 2019)',
        description: [
          'Developed a machine learning model for car damage classification using Python.',
          'Implemented transfer learning and ensemble learning techniques.',
          'Built the frontend using Angular.',
          'Published research paper: "Damage Assessment for Car Insurance".'
        ]
      }
    ];
  }

  getSkills() {
    return {
      technical: [
        'Angular', 'React', 'TypeScript', 'JavaScript', 'CSS', 'HTML5', 'SCSS', 'Python', 'WebGL', 'SQL',
        'Cypress', 'Playwright', 'Redux', 'MongoDB', 'ChartJS', 'ThreeJS', 'TensorFlow', 'NetworkX'
      ],
      tools: [
        'GitHub', 'Docker', 'AWS', 'Jira', 'ClickUp', 'Slack', 'Trello'
      ],
      softSkills: [
        'Leadership', 'Mentoring', 'Debugging', 'Troubleshooting', 'Code Review', 'Code Management'
      ],
      languages: [
        { name: 'English', level: 'C1' },
        { name: 'German', level: 'A2' }
      ]
    };
  }

  getEducation() {
    return [
      { school: 'Paderborn University', degree: 'Masters in Computer Science', year: '2019 - 2025' },
      { school: 'Mumbai University', degree: 'Bachelors in Computer Engineering', year: '2015 - 2019' }
    ];
  }

  getCertifications() {
    return [
      { name: 'AWS Solutions Architect Associate Certification', year: 'Jan. 2025 - Ongoing' }
    ];
  }

  getContact() {
    return {
      email: 'priyankagiri.oyeindia@gmail.com',
      linkedin: 'https://linkedin.com/in/priyanka-giri-fullstack-developer/',
      github: 'https://github.com/Pikuz1',
      address: {
        location: 'Kempten, Germany',
        googleMapsUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42933.22469351866!2d10.264157779998873!3d47.736318603278555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7907da67c911%3A0xbca5bb95c833b02b!2sKempten!5e0!3m2!1sen!2sde!4v1738253394505!5m2!1sen!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
      }
    };
  }

}
