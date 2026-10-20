import * as THREE from 'three';
import { Skill, SkillCategoryId } from '../models';

export const ICON_FONT = '900 56px "Font Awesome 6 Free"';

/** Colour and Font Awesome glyph that mark each skill category on the sphere. */
export const CATEGORY_STYLE: Record<SkillCategoryId, { color: string; glyph: string }> = {
  ai: { color: '#64ffda', glyph: '' },
  frontend: { color: '#7aa2ff', glyph: '' },
  uiux: { color: '#ff8fd0', glyph: '' },
  testing: { color: '#ffd166', glyph: '' },
  backend: { color: '#b794f6', glyph: '' },
  devops: { color: '#6ee7ff', glyph: '' },
  collab: { color: '#ffb36b', glyph: '' },
  languages: { color: '#9be564', glyph: '' }
};

/** Draws the category icon above the skill name and returns it as a texture. */
export function createSkillTexture(skill: Skill): THREE.CanvasTexture {
  const size = 300;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d')!;
  const style = CATEGORY_STYLE[skill.category];

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.font = ICON_FONT;
  context.fillStyle = style.color;
  context.fillText(style.glyph, size / 2, 105);

  context.font = 'bold 35px Arial';
  context.fillStyle = '#ffffff';
  context.fillText(skill.name, size / 2, 185);

  return new THREE.CanvasTexture(canvas);
}
