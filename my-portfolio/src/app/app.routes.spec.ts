import { routes } from './app.routes';
import { de } from './i18n/de';
import { en } from './i18n/en';
import { HomeComponent } from './pages/home/home.component';

describe('routes', () => {
  it('serves the home page eagerly', () => {
    expect(routes.find(r => r.path === '')?.component).toBe(HomeComponent);
  });

  it('lazy-loads every other page and the 404 page', async () => {
    const expected: Record<string, string> = {
      about: 'AboutComponent',
      experience: 'ExperienceComponent',
      projects: 'ProjectsComponent',
      skills: 'SkillsComponent',
      education: 'EducationComponent',
      certifications: 'CertificationsComponent',
      contact: 'ContactComponent',
      '**': 'NotFoundComponent'
    };

    for (const [path, name] of Object.entries(expected)) {
      const route = routes.find(r => r.path === path)!;
      const component: any = await (route.loadComponent as () => Promise<any>)();
      expect(component.name).toBe(name);
    }
  });

  it('gives every page a title key that has a title in both languages', () => {
    const keys = routes.map(route => route.data?.['titleKey']);
    expect(keys.every(Boolean)).toBeTrue();
    expect(new Set(keys).size).toBe(keys.length);
    keys.forEach(key => {
      expect(en.ui.titles[key as keyof typeof en.ui.titles]).withContext(key).toBeTruthy();
      expect(de.ui.titles[key as keyof typeof de.ui.titles]).withContext(key).toBeTruthy();
    });
  });
});
