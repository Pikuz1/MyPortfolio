import { TestBed } from '@angular/core/testing';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsService);
  });

  it('returns skills with a name, description and known category', () => {
    const ids = service.getSkillCategories().map(c => c.id);
    const skills = service.getSkills();
    expect(skills.length).toBeGreaterThan(0);
    skills.forEach(skill => {
      expect(skill.name).toBeTruthy();
      expect(skill.description).toBeTruthy();
      expect(ids).toContain(skill.category);
    });
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
});
