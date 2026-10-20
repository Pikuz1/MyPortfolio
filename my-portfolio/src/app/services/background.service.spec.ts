import { TestBed } from '@angular/core/testing';
import { BackgroundService } from './background.service';

describe('BackgroundService', () => {
  it('starts with the drifting particles and switches formation on request', () => {
    const service = TestBed.inject(BackgroundService);
    expect(service.formation()).toBe('drift');
    service.show('initials');
    expect(service.formation()).toBe('initials');
  });
});
