export interface AboutMe {
  name: string;
  role: string;
  description: string[];
  resumeLink: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Project {
  title: string;
  institution: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Certification {
  name: string;
  year: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  address: { location: string };
}

export type SkillCategoryId = 'frontend' | 'uiux' | 'testing' | 'backend' | 'devops' | 'collab' | 'languages';

export interface Skill {
  name: string;
  category: SkillCategoryId;
  description: string;
}

export interface SkillCategory {
  id: SkillCategoryId | 'all';
  name: string;
}
