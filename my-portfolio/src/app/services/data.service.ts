import { Injectable } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { AboutMe, Certification, Contact, Education, Experience, Language, Project } from '../models';

/** Serves the portfolio content in the language that is currently selected. */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private i18n: I18nService) {}

  getAboutMe(): AboutMe {
    return this.i18n.content.about;
  }

  getExperience(): Experience[] {
    return this.i18n.content.experience;
  }

  getProjects(): Project[] {
    return this.i18n.content.projects;
  }

  getEducation(): Education[] {
    return this.i18n.content.education;
  }

  getLanguages(): Language[] {
    return this.i18n.content.languages;
  }

  getCertifications(): Certification[] {
    return this.i18n.content.certifications;
  }

  getContact(): Contact {
    return {
      email: 'priyanka.giri.0397@gmail.com',
      linkedin: 'https://linkedin.com/in/priyanka-giri-fullstack-developer/',
      github: 'https://github.com/Pikuz1',
      address: {
        location: 'Kempten, Germany'
      }
    };
  }
}
