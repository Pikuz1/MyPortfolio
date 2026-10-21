import { routes } from './app.routes';
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

  it('gives every lazy page its own title', () => {
    routes.filter(r => r.path !== '').forEach(route => {
      expect(String(route.title)).withContext(String(route.path)).toMatch(/ \| Priyanka Giri$/);
    });
  });
});
