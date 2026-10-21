import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('returns the about section', () => {
    const about = service.getAboutMe();
    expect(about.name).toBe('Priyanka Giri');
    expect(about.role).toContain('AI Engineer');
    expect(about.description.length).toBeGreaterThan(0);
    expect(about.resumeLink).toMatch(/\.pdf$/);
    expect(about.photo).toMatch(/\.webp$/);
    expect(about.howIWork.length).toBeGreaterThan(0);
  });

  it('returns experience entries with the required fields', () => {
    const experience = service.getExperience();
    expect(experience.length).toBeGreaterThan(0);
    experience.forEach(job => {
      expect(job.company).toBeTruthy();
      expect(job.role).toBeTruthy();
      expect(job.duration).toBeTruthy();
      expect(job.description.length).toBeGreaterThan(0);
    });
  });

  it('returns projects and links DocuMind', () => {
    const projects = service.getProjects();
    expect(projects[0].title).toContain('DocuMind');
    expect(projects[0].link).toBe('https://github.com/Pikuz1/Documind');
  });

  it('links the projects that have a public repository', () => {
    const links = Object.fromEntries(service.getProjects().map(p => [p.title.split(':')[0], p.link]));
    expect(links['Smart Factory Digital Twin']).toBe('https://github.com/Pikuz1/SmartFactoryDigitalTwin');
    expect(links['Near-Shortest Path Routing in Hybrid Communication Networks'])
      .toBe('https://github.com/Pikuz1/NearShortestPathfinding');
  });

  it('returns education, languages and certifications', () => {
    expect(service.getEducation().length).toBe(2);
    expect(service.getLanguages().map(l => l.name)).toEqual(['English', 'German']);
    expect(service.getCertifications().length).toBeGreaterThan(0);
  });

  it('returns contact details', () => {
    const contact = service.getContact();
    expect(contact.email).toContain('@');
    expect(contact.linkedin).toContain('linkedin.com');
    expect(contact.github).toContain('github.com');
    expect(contact.address.location).toBe('Kempten, Germany');
  });

  it('uses plain hyphens instead of long dashes in the text', () => {
    const text = JSON.stringify([
      service.getAboutMe(), service.getExperience(), service.getProjects(),
      service.getEducation(), service.getLanguages()
    ]);
    expect(text).not.toMatch(/[–—]/);
  });
});
