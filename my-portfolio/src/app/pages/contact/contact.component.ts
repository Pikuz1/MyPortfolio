import { Component } from '@angular/core';
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
export class ContactComponent {
  contact = this.dataService.getContact();
  serviceID = 'service_pzqahik';
  templateID = 'template_cllp88p';
  publicKey = 'TxB5tM2CWI4smPlsc';
  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(private dataService: DataService) { }

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
