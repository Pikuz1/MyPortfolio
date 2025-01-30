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

  constructor(private dataService: DataService) { }

  sendEmail(form: NgForm) {
    if (form.valid) {
      const templateParams = {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message
      };

      emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
        .then(() => {
          alert('Message sent successfully!');
          form.reset();
        })
        .catch(() => {
          alert('Failed to send message.');
        });
    }
  }
}
