import { TestBed } from '@angular/core/testing';
import { I18nService } from '../i18n/i18n.service';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let i18n: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    i18n = TestBed.inject(I18nService);
    i18n.set('en');
  });

  it('returns the about section', () => {
    const about = service.getAboutMe();
    expect(about.name).toBe('Priyanka Giri');
    expect(about.role).toContain('AI Engineer');
    expect(about.description.length).toBeGreaterThan(0);
    expect(about.resumeLink).toMatch(/\.pdf$/);
    expect(about.photo).toMatch(/\.webp$/);
    expect(about.tools).toContain('Python');
    expect(about.howIWork.length).toBe(4);
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

  it('returns projects and links the ones with a public repository', () => {
    const projects = service.getProjects();
    expect(projects[0].title).toContain('DocuMind');
    expect(projects.filter(p => p.link).map(p => p.link)).toEqual([
      'https://github.com/Pikuz1/Documind',
      'https://github.com/Pikuz1/SmartFactoryDigitalTwin',
      'https://github.com/Pikuz1/NearShortestPathfinding'
    ]);
  });

  it('returns education, languages and certifications', () => {
    expect(service.getEducation().length).toBe(2);
    expect(service.getLanguages().map(l => l.name)).toEqual(['English', 'German']);
    expect(service.getCertifications().length).toBeGreaterThan(0);
  });

  it('returns contact details that do not depend on the language', () => {
    const contact = service.getContact();
    expect(contact.email).toContain('@');
    expect(contact.linkedin).toContain('linkedin.com');
    expect(contact.github).toContain('github.com');
    expect(contact.address.location).toBe('Kempten, Germany');
    i18n.set('de');
    expect(service.getContact()).toEqual(contact);
  });

  it('returns the German texts after the language was switched', () => {
    i18n.set('de');
    expect(service.getAboutMe().role).toContain('KI-Engineer');
    expect(service.getExperience()[0].location).toBe('Hamburg, Deutschland');
    expect(service.getProjects()[0].title).toContain('Mehrsprachiger');
    expect(service.getEducation()[0].school).toBe('Universität Paderborn');
    expect(service.getLanguages().map(l => l.name)).toEqual(['Englisch', 'Deutsch']);
    expect(service.getCertifications()[0].year).toBe('In Arbeit');
  });
});
