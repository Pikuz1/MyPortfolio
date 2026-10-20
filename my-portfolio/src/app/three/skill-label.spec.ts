import * as THREE from 'three';
import { CATEGORY_STYLE, createSkillTexture, ICON_FONT } from './skill-label';

describe('createSkillTexture', () => {
  const skill = { name: 'RAG', category: 'ai' as const, description: '' };

  it('draws the category icon and the skill name on a canvas texture', () => {
    const fillText = spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callThrough();
    const texture = createSkillTexture(skill);

    expect(texture instanceof THREE.CanvasTexture).toBeTrue();
    expect((texture.image as HTMLCanvasElement).width).toBe(300);
    expect(fillText).toHaveBeenCalledWith(CATEGORY_STYLE.ai.glyph, 150, 105);
    expect(fillText).toHaveBeenCalledWith('RAG', 150, 185);
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

  it('has a style for every skill category', () => {
    expect(Object.keys(CATEGORY_STYLE).sort()).toEqual(
      ['ai', 'backend', 'collab', 'devops', 'frontend', 'languages', 'testing', 'uiux']);
  });
});
