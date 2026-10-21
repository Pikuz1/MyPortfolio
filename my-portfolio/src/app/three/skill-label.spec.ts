import * as THREE from 'three';
import { CATEGORY_STYLE, createSkillTexture, ICON_FONT } from './skill-label';

describe('createSkillTexture', () => {
  const skill = { name: 'RAG', category: 'ai' as const, description: '' };

  it('draws the category icon and the skill name on a canvas texture', () => {
    const fillText = spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callThrough();
    const texture = createSkillTexture(skill);

    expect(texture instanceof THREE.CanvasTexture).toBeTrue();
    expect((texture.image as HTMLCanvasElement).width).toBe(512);
    expect(fillText).toHaveBeenCalledWith(CATEGORY_STYLE.ai.glyph, 256, 85);
    expect(fillText).toHaveBeenCalledWith('RAG', 256, 180);
  });

  it('uses the icon font for the glyph', () => {
    const fonts: string[] = [];
    spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callFake(function (this: CanvasRenderingContext2D) {
      fonts.push(this.font);
    });
    createSkillTexture(skill);
    expect(fonts[0]).toContain('Font Awesome 6 Free');
    expect(ICON_FONT).toContain('Font Awesome 6 Free');
  });

  it('keeps a short name at full size', () => {
    const fonts: string[] = [];
    spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callFake(function (this: CanvasRenderingContext2D, text: string) {
      if (text === 'RAG') {
        fonts.push(this.font);
      }
    });
    createSkillTexture(skill);
    expect(fonts).toEqual(['bold 44px Arial']);
  });

  it('stops shrinking at a minimum size, even for an absurdly long name', () => {
    spyOn(CanvasRenderingContext2D.prototype, 'measureText').and.returnValue({ width: 10000 } as TextMetrics);
    const longName = 'x'.repeat(80);
    const fonts: string[] = [];
    spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callFake(function (this: CanvasRenderingContext2D, text: string) {
      if (text === longName) {
        fonts.push(this.font);
      }
    });
    createSkillTexture({ ...skill, name: longName });
    expect(fonts).toEqual(['bold 20px Arial']);
  });

  it('shrinks a name that is too wide until it fits', () => {
    spyOn(CanvasRenderingContext2D.prototype, 'measureText').and.callFake(function (this: CanvasRenderingContext2D) {
      return { width: parseInt(this.font.replace('bold ', ''), 10) * 14 } as TextMetrics;
    });
    const fonts: string[] = [];
    spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callFake(function (this: CanvasRenderingContext2D, text: string) {
      if (text === 'Accessibility (WCAG)') {
        fonts.push(this.font);
      }
    });
    createSkillTexture({ ...skill, name: 'Accessibility (WCAG)' });
    expect(fonts).toEqual(['bold 32px Arial']);
  });

  it('has a style for every skill category', () => {
    expect(Object.keys(CATEGORY_STYLE).sort()).toEqual(
      ['ai', 'backend', 'collab', 'devops', 'frontend', 'languages', 'testing', 'uiux']);
  });
});
