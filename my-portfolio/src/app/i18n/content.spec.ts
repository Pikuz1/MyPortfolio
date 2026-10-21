import { SkillsService } from '../services/skills.service';
import { Content } from './content.model';
import { de } from './de';
import { en } from './en';
import { I18nService } from './i18n.service';
import { TestBed } from '@angular/core/testing';

/** Lists every path to a value, e.g. "ui.nav.about" or "experience[0].description[1]". */
function paths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}.length=${value.length}`, ...value.flatMap((item, i) => paths(item, `${prefix}[${i}]`))];
  }
  if (value !== null && typeof value === 'object') {
    // Sorted, so the order of the keys in the two files does not matter
    return Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([key, item]) => paths(item, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value];
  }
  if (value !== null && typeof value === 'object') {
    return Object.values(value).flatMap(strings);
  }
  return [];
}

describe('English and German content', () => {
  const both: [string, Content][] = [['English', en], ['German', de]];

  it('have exactly the same structure', () => {
    expect(paths(de)).toEqual(paths(en));
  });

  it('have no empty texts', () => {
    both.forEach(([name, content]) =>
      strings(content).forEach(text => expect(text.trim()).withContext(name).not.toBe('')));
  });

  it('use plain hyphens and commas instead of long dashes', () => {
    both.forEach(([name, content]) =>
      expect(strings(content).filter(text => /[–—]/.test(text))).withContext(name).toEqual([]));
  });

  it('are really translated', () => {
    expect(de.ui.nav.about).not.toBe(en.ui.nav.about);
    expect(de.ui.contact.send).not.toBe(en.ui.contact.send);
    expect(de.about.description[0]).not.toBe(en.about.description[0]);
    expect(de.experience[0].description[0]).not.toBe(en.experience[0].description[0]);
  });

  it('describe every skill in both languages', () => {
    TestBed.configureTestingModule({});
    const names = TestBed.inject(SkillsService).getSkills().map(skill => skill.name);
    both.forEach(([name, content]) => {
      expect(Object.keys(content.skillDescriptions).sort()).withContext(name).toEqual([...names].sort());
    });
  });

  it('have a page title for every page', () => {
    expect(Object.keys(en.ui.titles).sort()).toEqual(
      ['about', 'certifications', 'contact', 'education', 'experience', 'home', 'notFound', 'projects', 'skills']);
  });

  it('keep the same technologies in the tool list', () => {
    expect(de.about.tools).toEqual(en.about.tools);
    expect(TestBed.inject(I18nService).content).toBeDefined();
  });
});
