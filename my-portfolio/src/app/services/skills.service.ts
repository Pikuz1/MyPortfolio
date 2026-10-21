import { Injectable } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { Skill, SkillCategory, SkillLink } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(private i18n: I18nService) {}

  /** The skills. Names are technology names and stay the same in every language. */
  getSkills(): Skill[] {
    return [
      { name: 'RAG', category: 'ai' },
      { name: 'LangChain', category: 'ai' },
      { name: 'Embeddings', category: 'ai' },
      { name: 'ChromaDB', category: 'ai' },
      { name: 'Gemini API', category: 'ai' },
      { name: 'Prompt Engineering', category: 'ai' },
      { name: 'Retrieval Evaluation', category: 'ai' },
      { name: 'Reinforcement Learning', category: 'ai' },
      { name: 'React', category: 'frontend' },
      { name: 'Angular', category: 'frontend' },
      { name: 'Vue.js', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'RxJS / NgRx', category: 'frontend' },
      { name: 'Redux', category: 'frontend' },
      { name: 'Storybook', category: 'frontend' },
      { name: 'Three.js', category: 'frontend' },
      { name: 'Chart.js', category: 'frontend' },
      { name: 'WebGL', category: 'frontend' },
      { name: 'HTML5', category: 'uiux' },
      { name: 'CSS3', category: 'uiux' },
      { name: 'SCSS', category: 'uiux' },
      { name: 'Tailwind', category: 'uiux' },
      { name: 'Bootstrap', category: 'uiux' },
      { name: 'Responsive Design', category: 'uiux' },
      { name: 'Accessibility (WCAG)', category: 'uiux' },
      { name: 'Cypress', category: 'testing' },
      { name: 'Playwright', category: 'testing' },
      { name: 'pytest', category: 'testing' },
      { name: 'Vitest', category: 'testing' },
      { name: 'Jest', category: 'testing' },
      { name: 'Unit Testing', category: 'testing' },
      { name: 'E2E Testing', category: 'testing' },
      { name: 'CI/CD Pipelines', category: 'testing' },
      { name: 'Node.js', category: 'backend' },
      { name: 'FastAPI', category: 'backend' },
      { name: 'Flask', category: 'backend' },
      { name: 'REST API Integration', category: 'backend' },
      { name: 'Firebase', category: 'backend' },
      { name: 'SQLite', category: 'backend' },
      { name: 'MongoDB', category: 'backend' },
      { name: 'SQL', category: 'backend' },
      { name: 'AWS (S3, Lambda)', category: 'devops' },
      { name: 'Docker', category: 'devops' },
      { name: 'GitHub Actions', category: 'devops' },
      { name: 'Jira', category: 'collab' },
      { name: 'Trello', category: 'collab' },
      { name: 'Slack', category: 'collab' },
      { name: 'ClickUp', category: 'collab' },
      { name: 'TypeScript', category: 'languages' },
      { name: 'JavaScript', category: 'languages' },
      { name: 'Python', category: 'languages' },
      { name: 'Java', category: 'languages' }
    ];
  }

  getSkillCategories(): SkillCategory[] {
    return this.i18n.content.skillCategories;
  }

  /** What a skill means, in the current language. */
  describe(name: string): string {
    return this.i18n.content.skillDescriptions[name];
  }

  getSkillLinks(): SkillLink[] {
    return [
      ['RAG', 'Embeddings'],
      ['RAG', 'ChromaDB'],
      ['RAG', 'LangChain'],
      ['RAG', 'Gemini API'],
      ['RAG', 'Prompt Engineering'],
      ['RAG', 'Retrieval Evaluation'],
      ['LangChain', 'Python'],
      ['FastAPI', 'Python'],
      ['Flask', 'Python'],
      ['pytest', 'Python'],
      ['Reinforcement Learning', 'Python'],
      ['REST API Integration', 'FastAPI'],
      ['React', 'TypeScript'],
      ['React', 'Redux'],
      ['React', 'Next.js'],
      ['React', 'Storybook'],
      ['React', 'Chart.js'],
      ['Angular', 'TypeScript'],
      ['Angular', 'RxJS / NgRx'],
      ['TypeScript', 'JavaScript'],
      ['Node.js', 'JavaScript'],
      ['Three.js', 'WebGL'],
      ['Tailwind', 'CSS3'],
      ['SCSS', 'CSS3'],
      ['Playwright', 'E2E Testing'],
      ['Cypress', 'E2E Testing'],
      ['Jest', 'Unit Testing'],
      ['Vitest', 'Unit Testing'],
      ['GitHub Actions', 'CI/CD Pipelines'],
      ['Docker', 'CI/CD Pipelines']
    ];
  }
}
