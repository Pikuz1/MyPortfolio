import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';

describe('routes', () => {
  it('serves the home page eagerly', () => {
    expect(routes.find(r => r.path === '')?.component).toBe(HomeComponent);
  });

  it('lazy-loads every other page', async () => {
    const expected: Record<string, string> = {
      about: 'AboutComponent',
      experience: 'ExperienceComponent',
      projects: 'ProjectsComponent',
      skills: 'SkillsComponent',
      education: 'EducationComponent',
      certifications: 'CertificationsComponent',
      contact: 'ContactComponent'
    };

    for (const [path, name] of Object.entries(expected)) {
      const route = routes.find(r => r.path === path)!;
      const component: any = await (route.loadComponent as () => Promise<any>)();
      expect(component.name).toBe(name);
    }
  });
});
