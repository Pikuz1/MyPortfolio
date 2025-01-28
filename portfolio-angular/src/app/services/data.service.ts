import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getTechnicalSkills() {
    return [
      { category: 'Languages', skills: 'TypeScript, JavaScript, CSS, HTML5, SCSS, Python, GraphQL, SQL' },
      { category: 'Frameworks', skills: 'Angular, Tailwind, Cypress, Playwright' },
      { category: 'Developer Tools', skills: 'GitHub, Docker, AWS, Jira' },
    ];
  }
}
