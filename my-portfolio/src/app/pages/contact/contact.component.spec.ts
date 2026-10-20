import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let el: HTMLElement;

  const form = () => fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
  const type = async (id: string, value: string) => {
    const input = el.querySelector(`#${id}`) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };
  const fillForm = async () => {
    await type('name', 'Ada');
    await type('email', 'ada@example.com');
    await type('message', 'Hello');
  };
  const submit = async () => {
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    await new Promise(resolve => setTimeout(resolve));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent, FormsModule] }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the email and the location', () => {
    expect(el.querySelector('a[href^="mailto:"]')?.textContent).toContain(component.contact.email);
    expect(el.textContent).toContain('Kempten, Germany');
  });

  it('connects every label to its field', () => {
    ['name', 'email', 'message'].forEach(id =>
      expect(el.querySelector(`label[for="${id}"]`)).not.toBeNull());
  });

  it('shows validation messages instead of sending an empty form', async () => {
    const send = spyOn(emailjs, 'send');
    await submit();

    expect(send).not.toHaveBeenCalled();
    expect(el.textContent).toContain('Please enter your name.');
    expect(el.textContent).toContain('Please enter a valid email address.');
    expect(el.textContent).toContain('Please write a message.');
  });

  it('rejects a malformed email address', async () => {
    const send = spyOn(emailjs, 'send');
    await fillForm();
    await type('email', 'not-an-email');
    await submit();

    expect(send).not.toHaveBeenCalled();
    expect(el.textContent).toContain('Please enter a valid email address.');
  });

  it('sends a valid form, confirms inline and clears the form', async () => {
    const send = spyOn(emailjs, 'send').and.resolveTo({ status: 200, text: 'OK' });
    await fillForm();
    await submit();

    expect(send).toHaveBeenCalledWith(
      component.serviceID,
      component.templateID,
      { name: 'Ada', email: 'ada@example.com', message: 'Hello' },
      component.publicKey
    );
    expect(component.status).toBe('success');
    expect(el.querySelector('[role="status"]')?.textContent).toContain('Your message has been sent');
    expect(form().value.name).toBeNull();
  });

  it('disables the button while sending', async () => {
    let finish!: () => void;
    spyOn(emailjs, 'send').and.returnValue(new Promise(resolve => {
      finish = () => resolve({ status: 200, text: 'OK' });
    }));
    await fillForm();
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const button = el.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Sending...');

    finish();
    await new Promise(resolve => setTimeout(resolve));
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('shows an inline error and keeps the entered text when sending fails', async () => {
    spyOn(emailjs, 'send').and.rejectWith(new Error('network'));
    await fillForm();
    await submit();

    expect(component.status).toBe('error');
    expect(el.querySelector('[role="status"]')?.textContent).toContain('Something went wrong');
    expect(form().value.name).toBe('Ada');
  });
});
