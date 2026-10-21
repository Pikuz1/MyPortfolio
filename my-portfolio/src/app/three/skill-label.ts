import * as THREE from 'three';
import { Skill, SkillCategoryId } from '../models';

export const ICON_FONT = '900 64px "Font Awesome 6 Free"';

export const LABEL_WIDTH = 512;
export const LABEL_HEIGHT = 256;
const MAX_TEXT_WIDTH = 460;

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
  const canvas = document.createElement('canvas');
  canvas.width = LABEL_WIDTH;
  canvas.height = LABEL_HEIGHT;
  const context = canvas.getContext('2d')!;
  const style = CATEGORY_STYLE[skill.category];

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.font = ICON_FONT;
  context.fillStyle = style.color;
  context.fillText(style.glyph, LABEL_WIDTH / 2, 85);

  // Long names get a smaller font so they never run off the label
  let fontSize = 44;
  context.font = `bold ${fontSize}px Arial`;
  while (fontSize > 20 && context.measureText(skill.name).width > MAX_TEXT_WIDTH) {
    fontSize -= 2;
    context.font = `bold ${fontSize}px Arial`;
  }
  context.fillStyle = '#ffffff';
  context.fillText(skill.name, LABEL_WIDTH / 2, 180);

  return new THREE.CanvasTexture(canvas);
}
