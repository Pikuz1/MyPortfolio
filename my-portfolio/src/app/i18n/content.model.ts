import { AboutMe, Certification, Education, Experience, Language, Project, SkillCategory } from '../models';

export type Lang = 'en' | 'de';

export interface Ui {
  nav: Record<'about' | 'experience' | 'projects' | 'skills' | 'education' | 'certifications' | 'contact', string>;
  header: { menuToggle: string; mainNavigation: string; language: string };
  footer: { linkedin: string; github: string };
  home: { title: string; tagline: string };
  about: { downloadResume: string; workingWithMe: string; toolsTitle: string };
  experience: { title: string };
  projects: { title: string; viewOnGithub: string };
  skills: {
    title: string;
    subtitle: string;
    hint: string;
    showConnections: string;
    hideConnections: string;
  };
  education: { title: string; languages: string };
  certifications: { title: string };
  contact: {
    title: string;
    intro: string;
    email: string;
    copyEmail: string;
    copied: string;
    copyFailed: string;
    location: string;
    locationValue: string;
    spokenLanguages: string;
    formTitle: string;
    formSubtitle: string;
    name: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    nameError: string;
    emailError: string;
    messageError: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    mapTitle: string;
    loadMap: string;
    mapNote: string;
  };
  notFound: { title: string; text: string; back: string };
  /** Browser tab titles, one per page */
  titles: Record<'home' | 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'certifications' | 'contact' | 'notFound', string>;
  /** Short description for search engines and link previews */
  description: string;
}

export interface Content {
  ui: Ui;
  about: AboutMe;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
  skillCategories: SkillCategory[];
  /** Skill descriptions, by skill name */
  skillDescriptions: Record<string, string>;
}
