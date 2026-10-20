import { Injectable, signal } from '@angular/core';

export type Formation = 'drift' | 'initials';

/** Lets a page tell the 3D background which shape the particles should take. */
@Injectable({ providedIn: 'root' })
export class BackgroundService {
  readonly formation = signal<Formation>('drift');

  show(formation: Formation): void {
    this.formation.set(formation);
  }
}
