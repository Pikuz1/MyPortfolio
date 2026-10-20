import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  const filledForm = (valid: boolean): NgForm =>
    ({
      valid,
      value: { name: 'Ada', email: 'ada@example.com', message: 'Hello' },
      reset: jasmine.createSpy('reset')
    } as unknown as NgForm);

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent, FormsModule] }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, 'alert');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the email and the location', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('a[href^="mailto:"]')?.textContent).toContain(component.contact.email);
    expect(el.textContent).toContain('Kempten, Germany');
  });

  it('does not send an invalid form', () => {
    const send = spyOn(emailjs, 'send');
    component.sendEmail(filledForm(false));
    expect(send).not.toHaveBeenCalled();
  });

  it('sends a valid form, confirms and resets it', async () => {
    const send = spyOn(emailjs, 'send').and.resolveTo({ status: 200, text: 'OK' });
    const form = filledForm(true);
    component.sendEmail(form);
    await fixture.whenStable();

    expect(send).toHaveBeenCalledWith(
      component.serviceID,
      component.templateID,
      { name: 'Ada', email: 'ada@example.com', message: 'Hello' },
      component.publicKey
    );
    expect(window.alert).toHaveBeenCalledWith('Message sent successfully!');
    expect(form.reset).toHaveBeenCalled();
  });

  it('reports a failure and keeps the form', async () => {
    spyOn(emailjs, 'send').and.rejectWith(new Error('network'));
    const form = filledForm(true);
    component.sendEmail(form);
    await new Promise(resolve => setTimeout(resolve));

    expect(window.alert).toHaveBeenCalledWith('Failed to send message.');
    expect(form.reset).not.toHaveBeenCalled();
  });
});
