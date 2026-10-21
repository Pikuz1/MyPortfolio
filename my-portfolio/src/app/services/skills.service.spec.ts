import { TestBed } from '@angular/core/testing';
import { I18nService } from '../i18n/i18n.service';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsService);
  });

  it('returns skills with a name and a known category', () => {
    const ids = service.getSkillCategories().map(c => c.id);
    const skills = service.getSkills();
    expect(skills.length).toBeGreaterThan(0);
    skills.forEach(skill => {
      expect(skill.name).toBeTruthy();
      expect(ids).toContain(skill.category);
    });
  });

  it('describes every skill in the current language', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.set('en');
    service.getSkills().forEach(skill => expect(service.describe(skill.name)).withContext(skill.name).toBeTruthy());
    expect(service.describe('Python')).toContain('programming language');

    i18n.set('de');
    expect(service.describe('Python')).toContain('Programmiersprache');
  });

  it('names the categories in the current language', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.set('de');
    expect(service.getSkillCategories()[0].name).toBe('Alle Fähigkeiten');
    i18n.set('en');
    expect(service.getSkillCategories()[0].name).toBe('All Skills');
  });

  it('has unique skill names', () => {
    const names = service.getSkills().map(s => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('lists "all" first and includes the AI category', () => {
    const categories = service.getSkillCategories();
    expect(categories[0].id).toBe('all');
    expect(categories.some(c => c.id === 'ai')).toBeTrue();
  });

  it('has at least one skill in every category', () => {
    const skills = service.getSkills();
    service.getSkillCategories()
      .filter(c => c.id !== 'all')
      .forEach(c => expect(skills.some(s => s.category === c.id)).toBeTrue());
  });

  it('only links skills that exist, without duplicates', () => {
    const names = new Set(service.getSkills().map(s => s.name));
    const links = service.getSkillLinks();
    links.forEach(([a, b]) => {
      expect(names.has(a)).withContext(a).toBeTrue();
      expect(names.has(b)).withContext(b).toBeTrue();
      expect(a).not.toBe(b);
    });
    const keys = links.map(link => [...link].sort().join('|'));
    expect(new Set(keys).size).toBe(keys.length);
  });
});
