import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', title: 'About | Priyanka Giri', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'experience', title: 'Experience | Priyanka Giri', loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent) },
  { path: 'projects', title: 'Projects | Priyanka Giri', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'skills', title: 'Skills | Priyanka Giri', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'education', title: 'Education | Priyanka Giri', loadComponent: () => import('./pages/education/education.component').then(m => m.EducationComponent) },
  { path: 'certifications', title: 'Certifications | Priyanka Giri', loadComponent: () => import('./pages/certifications/certifications.component').then(m => m.CertificationsComponent) },
  { path: 'contact', title: 'Contact | Priyanka Giri', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', title: 'Page not found | Priyanka Giri', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
