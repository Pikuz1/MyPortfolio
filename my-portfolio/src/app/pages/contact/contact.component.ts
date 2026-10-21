import { Component, OnDestroy } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnDestroy {
  contact = this.dataService.getContact();
  serviceID = 'service_pzqahik';
  templateID = 'template_cllp88p';
  publicKey = 'TxB5tM2CWI4smPlsc';
  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  copyState: 'idle' | 'copied' | 'failed' = 'idle';
  showMap = false;
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  /** Profiles shown as cards, e.g. "Pikuz1" for https://github.com/Pikuz1 */
  readonly profiles = [
    { label: 'LinkedIn', icon: 'fab fa-linkedin', href: this.contact.linkedin, handle: this.handleOf(this.contact.linkedin) },
    { label: 'GitHub', icon: 'fab fa-github', href: this.contact.github, handle: this.handleOf(this.contact.github) }
  ];

  constructor(private dataService: DataService, public i18n: I18nService) { }

  ngOnDestroy(): void {
    clearTimeout(this.copyTimer);
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.contact.email);
      this.copyState = 'copied';
    } catch {
      this.copyState = 'failed';
    }
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => (this.copyState = 'idle'), 2500);
  }

  private handleOf(url: string): string {
    return url.replace(/\/$/, '').split('/').pop()!;
  }

  async sendEmail(form: NgForm) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    this.status = 'sending';
    try {
      await emailjs.send(this.serviceID, this.templateID, {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message
      }, this.publicKey);
      this.status = 'success';
      form.resetForm();
    } catch {
      this.status = 'error';
    }
  }
}
