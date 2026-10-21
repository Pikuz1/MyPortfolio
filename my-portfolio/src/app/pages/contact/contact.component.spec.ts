import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { ContactComponent } from './contact.component';
import { I18nService } from '../../i18n/i18n.service';

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

  it('shows LinkedIn and GitHub as cards with their handles', () => {
    const cards = Array.from(el.querySelectorAll('a[target="_blank"]')) as HTMLAnchorElement[];
    expect(cards.map(card => card.getAttribute('href'))).toEqual([component.contact.linkedin, component.contact.github]);
    expect(cards.map(card => card.textContent)).toEqual([
      jasmine.stringContaining('priyanka-giri-fullstack-developer'),
      jasmine.stringContaining('Pikuz1')
    ]);
    cards.forEach(card => expect(card.getAttribute('rel')).toBe('noopener noreferrer'));
  });

  it('mentions the languages next to the location', () => {
    expect(el.textContent).toContain('English (C1) and German (B1)');
  });

  describe('copy email', () => {
    const copyButton = () =>
      Array.from(el.querySelectorAll('button')).find(b => b.textContent?.includes('mail address') || b.textContent?.includes('Copied') || b.textContent?.includes('Could not copy'))!;

    beforeEach(() => jasmine.clock().install());
    afterEach(() => {
      // Destroy while the fake clock is still installed, so clearTimeout is the fake one too
      fixture.destroy();
      jasmine.clock().uninstall();
    });

    it('copies the address, confirms, and goes back to normal after a moment', async () => {
      const write = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
      expect(copyButton().textContent).toContain('Copy email address');

      await component.copyEmail();
      fixture.detectChanges();
      expect(write).toHaveBeenCalledWith(component.contact.email);
      expect(copyButton().textContent).toContain('Copied to clipboard');

      jasmine.clock().tick(2500);
      fixture.detectChanges();
      expect(copyButton().textContent).toContain('Copy email address');
    });

    it('says so when the browser refuses to copy', async () => {
      spyOn(navigator.clipboard, 'writeText').and.rejectWith(new Error('denied'));
      copyButton().click();
      await Promise.resolve();
      await Promise.resolve();
      fixture.detectChanges();
      expect(component.copyState).toBe('failed');
      expect(copyButton().textContent).toContain('Could not copy');
    });

    it('restarts the timer when copied twice', async () => {
      spyOn(navigator.clipboard, 'writeText').and.resolveTo();
      await component.copyEmail();
      jasmine.clock().tick(2000);
      await component.copyEmail();
      jasmine.clock().tick(1000);
      expect(component.copyState).toBe('copied');
      jasmine.clock().tick(1500);
      expect(component.copyState).toBe('idle');
    });

    it('stops the timer when the page is left', async () => {
      spyOn(navigator.clipboard, 'writeText').and.resolveTo();
      await component.copyEmail();
      fixture.destroy();
      jasmine.clock().tick(5000);
      expect(component.copyState).toBe('copied');
    });
  });

  describe('map', () => {
    it('is not loaded until it is asked for', () => {
      expect(el.querySelector('iframe')).toBeNull();
      expect(el.textContent).toContain('This loads Google Maps.');
    });

    it('loads Google Maps after the visitor clicks Load map', () => {
      const load = Array.from(el.querySelectorAll('button')).find(b => b.textContent?.includes('Load map'))!;
      load.click();
      fixture.detectChanges();
      const frame = el.querySelector('iframe') as HTMLIFrameElement;
      expect(frame.getAttribute('src')).toContain('google.com/maps/embed');
      expect(frame.title).toContain('Kempten');
      expect(el.textContent).not.toContain('Load map');
    });
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

  describe('in German', () => {
    beforeEach(() => {
      TestBed.inject(I18nService).set('de');
      fixture.detectChanges();
    });

    it('translates the page, the form and the buttons', () => {
      expect(el.querySelector('h1')?.textContent).toContain('Kontakt');
      expect(el.textContent).toContain('Kempten, Deutschland');
      expect(el.textContent).toContain('Englisch (C1) und Deutsch (B1)');
      expect(el.querySelector('button[type="submit"]')?.textContent).toContain('Nachricht senden');
      expect(el.textContent).toContain('E-Mail-Adresse kopieren');
      expect((el.querySelector('#name') as HTMLInputElement).placeholder).toBe('Ihr Name');
    });

    it('shows the validation messages in German', async () => {
      await submit();
      expect(el.textContent).toContain('Bitte geben Sie Ihren Namen ein.');
      expect(el.textContent).toContain('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      expect(el.textContent).toContain('Bitte schreiben Sie eine Nachricht.');
    });

    it('confirms and reports errors in German', async () => {
      spyOn(emailjs, 'send').and.resolveTo({ status: 200, text: 'OK' });
      await fillForm();
      await submit();
      expect(el.querySelector('[role="status"]')?.textContent).toContain('Vielen Dank');
    });

    it('translates the map notice, the button and the map title', () => {
      expect(el.textContent).toContain('Dafür wird Google Maps geladen.');
      Array.from(el.querySelectorAll('button')).find(b => b.textContent?.includes('Karte laden'))!.click();
      fixture.detectChanges();
      expect((el.querySelector('iframe') as HTMLIFrameElement).title).toBe('Karte von Kempten, Deutschland');
    });
  });
});
