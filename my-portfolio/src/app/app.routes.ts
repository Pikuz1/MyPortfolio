import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { titleKey: 'home' } },
  { path: 'about', data: { titleKey: 'about' }, loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'experience', data: { titleKey: 'experience' }, loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent) },
  { path: 'projects', data: { titleKey: 'projects' }, loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'skills', data: { titleKey: 'skills' }, loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'education', data: { titleKey: 'education' }, loadComponent: () => import('./pages/education/education.component').then(m => m.EducationComponent) },
  { path: 'certifications', data: { titleKey: 'certifications' }, loadComponent: () => import('./pages/certifications/certifications.component').then(m => m.CertificationsComponent) },
  { path: 'contact', data: { titleKey: 'contact' }, loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', data: { titleKey: 'notFound' }, loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
