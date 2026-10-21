import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { de } from '../../i18n/de';
import { I18nService } from '../../i18n/i18n.service';

describe('SkillsComponent', () => {
  const create = async (platform: 'browser' | 'server') => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [{ provide: PLATFORM_ID, useValue: platform }]
    }).compileComponents();
    return TestBed.createComponent(SkillsComponent);
  };

  describe('in the browser', () => {
    let fixture: ComponentFixture<SkillsComponent>;
    let component: any;

    // Screen position of a sprite, so mouse events can be aimed at it
    const pointAt = (sprite: any) => {
      const rect = component.renderer.domElement.getBoundingClientRect();
      const ndc = sprite.position.clone().project(component.camera);
      return {
        clientX: rect.left + ((ndc.x + 1) / 2) * rect.width,
        clientY: rect.top + ((1 - ndc.y) / 2) * rect.height
      };
    };
    const nearest = () =>
      [...component.skillSprites].sort((a: any, b: any) => b.sprite.position.z - a.sprite.position.z);
    const hover = (sprite: any) => component.onMouseMove(new MouseEvent('mousemove', pointAt(sprite)));
    const emptySpace = () => new MouseEvent('mousemove', { clientX: -5000, clientY: -5000 });

    beforeEach(async () => {
      fixture = await create('browser');
      component = fixture.componentInstance;
      fixture.detectChanges();
      await component.ready;
    });

    afterEach(() => fixture.destroy());

    it('creates one sprite per skill and the category buttons', () => {
      expect(component.skillSprites.length).toBe(component['skillsService'].getSkills().length);
      const buttons = fixture.nativeElement.querySelectorAll('.category-btn');
      expect(buttons.length).toBe(component.skillCategories.length);
    });

    it('filters the sprites by category', () => {
      component.selectCategory('ai');
      expect(component.skillSprites.every((s: any) => s.sprite.visible === (s.skill.category === 'ai'))).toBeTrue();
      component.selectCategory('all');
      expect(component.skillSprites.every((s: any) => s.sprite.visible)).toBeTrue();
    });

    it('highlights a hovered skill and keeps it while the mouse stays on it', () => {
      const { sprite, skill } = nearest()[0];
      hover(sprite);
      expect(component.hoveredSkill).toBe(skill);
      expect(sprite.scale.x).toBe(9);
      expect(sprite.material.color.getHex()).toBe(0x00ff00);

      hover(sprite);
      expect(component.hoveredSkill).toBe(skill);
    });

    it('resets the previous highlight when another skill is hovered', () => {
      const first = nearest()[0];
      // Another sprite that can be reached by the mouse on its own
      const second = nearest().slice(1).find((candidate: any) =>
        component['pickSprite'](new MouseEvent('mousemove', pointAt(candidate.sprite)))?.sprite === candidate.sprite);

      hover(first.sprite);
      hover(second.sprite);

      expect(first.sprite.scale.x).toBe(7.5);
      expect(first.sprite.material.color.getHex()).toBe(0xffffff);
      expect(component.hoveredSkill).toBe(second.skill);
    });

    it('resets the highlight when the mouse leaves the skill', () => {
      const { sprite } = nearest()[0];
      hover(sprite);
      component.onMouseMove(emptySpace());
      expect(component.hoveredSkill).toBeNull();
      expect(sprite.scale.x).toBe(7.5);
    });

    it('ignores mouse movement over empty space', () => {
      component.onMouseMove(emptySpace());
      expect(component.hoveredSkill).toBeNull();
    });

    it('selects a skill on click and clears it on an empty click', () => {
      const { sprite, skill } = nearest()[0];
      component.onCanvasClick(new MouseEvent('click', pointAt(sprite)));
      fixture.detectChanges();
      expect(component.selectedSkill).toBe(skill);
      expect(fixture.nativeElement.querySelector('.skill-details h3').textContent).toContain(skill.name);

      component.onCanvasClick(emptySpace());
      fixture.detectChanges();
      expect(component.selectedSkill).toBeNull();
      expect(fixture.nativeElement.querySelector('.skill-details')).toBeNull();
    });

    it('selects a skill when the canvas itself is clicked', () => {
      const { sprite, skill } = nearest()[0];
      component.renderer.domElement.dispatchEvent(new MouseEvent('click', pointAt(sprite)));
      expect(component.selectedSkill).toBe(skill);
    });

    describe('connections', () => {
      const lines = () => component.connections as any;
      const visibleLinks = () => {
        const visible = new Set(component.skillSprites.filter((s: any) => s.sprite.visible).map((s: any) => s.skill.name));
        return component.skillsService.getSkillLinks().filter(([a, b]: string[]) => visible.has(a) && visible.has(b));
      };

      it('are hidden until switched on', () => {
        expect(lines()).toBeNull();
      });

      it('draw a line for every pair of related skills', () => {
        component.toggleConnections();
        expect(component.showConnections).toBeTrue();
        expect(lines().geometry.getAttribute('position').count).toBe(visibleLinks().length * 2);
        expect(component.scene.children).toContain(lines());
      });

      it('only connect skills of the selected category', () => {
        component.toggleConnections();
        const all = lines().geometry.getAttribute('position').count;
        component.selectCategory('ai');
        expect(lines().geometry.getAttribute('position').count).toBe(visibleLinks().length * 2);
        expect(lines().geometry.getAttribute('position').count).toBeLessThan(all);
      });

      it('are removed when switched off again', () => {
        component.toggleConnections();
        const previous = lines();
        spyOn(previous.geometry, 'dispose');
        component.toggleConnections();
        expect(lines()).toBeNull();
        expect(component.scene.children).not.toContain(previous);
        expect(previous.geometry.dispose).toHaveBeenCalled();
      });

      it('are switched by the button', () => {
        const button = fixture.nativeElement.querySelector('.connections-btn') as HTMLButtonElement;
        expect(button.textContent).toContain('Show connections');
        button.click();
        fixture.detectChanges();
        expect(button.textContent).toContain('Hide connections');
        expect(button.getAttribute('aria-pressed')).toBe('true');
      });
    });

    it('shows a pointer over a skill and a grab hand over empty space', () => {
      const { sprite } = nearest()[0];
      hover(sprite);
      expect(component.renderer.domElement.style.cursor).toBe('pointer');
      component.onMouseMove(emptySpace());
      expect(component.renderer.domElement.style.cursor).toBe('grab');
    });

    it('turns by itself, but holds still while a skill is hovered or open', () => {
      spyOn(window, 'requestAnimationFrame').and.returnValue(1);
      spyOn(component.renderer, 'render');
      const { sprite, skill } = nearest()[0];

      component.animate();
      expect(component.controls.autoRotate).toBeTrue();

      hover(sprite);
      component.animate();
      expect(component.controls.autoRotate).toBeFalse();

      component.onMouseMove(emptySpace());
      component.selectedSkill = skill;
      component.animate();
      expect(component.controls.autoRotate).toBeFalse();

      component.selectedSkill = null;
      component.reducedMotion = true;
      component.animate();
      expect(component.controls.autoRotate).toBeFalse();
    });

    it('keeps the camera between the minimum and maximum distance', () => {
      expect(component.controls.minDistance).toBeLessThan(component.camera.position.length());
      expect(component.controls.maxDistance).toBeGreaterThan(component.camera.position.length());
    });

    it('colours and names categories, with no colour for "all"', () => {
      expect(component.categoryColor('all')).toBeNull();
      expect(component.categoryColor('ai')).toBe('#64ffda');
      expect(component.categoryName('ai')).toBe('AI & LLM');
    });

    it('marks every category button with its colour, except "all"', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.category-btn') as NodeListOf<HTMLElement>;
      expect(buttons[0].querySelector('.dot')).toBeNull();
      expect(buttons[1].querySelector('.dot')).not.toBeNull();
    });

    it('names the category on the skill card', () => {
      const { sprite } = nearest()[0];
      component.onCanvasClick(new MouseEvent('click', pointAt(sprite)));
      fixture.detectChanges();
      const tag = fixture.nativeElement.querySelector('.category-tag') as HTMLElement;
      expect(tag.textContent?.trim()).toBe(component.categoryName(component.selectedSkill.category));
    });

    it('shows the title, the legend and an open skill card in German', () => {
      const { sprite, skill } = nearest()[0];
      component.onCanvasClick(new MouseEvent('click', pointAt(sprite)));
      fixture.detectChanges();
      const card = () => fixture.nativeElement.querySelector('.skill-details p') as HTMLElement;
      expect(card().textContent).toBe(component.describe(skill));

      TestBed.inject(I18nService).set('de');
      fixture.detectChanges();
      expect(card().textContent).toBe(de.skillDescriptions[skill.name]);
      expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Meine Fähigkeiten');
      const buttons = fixture.nativeElement.querySelectorAll('.category-btn') as NodeListOf<HTMLElement>;
      expect(buttons[0].textContent).toContain('Alle Fähigkeiten');
      expect(fixture.nativeElement.querySelector('.connections-btn').textContent).toContain('Verbindungen zeigen');
      expect(fixture.nativeElement.querySelector('.instructions').textContent).toContain('Ziehen zum Drehen');
    });

    it('selects a category from its button', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.category-btn') as NodeListOf<HTMLButtonElement>;
      buttons[1].click();
      fixture.detectChanges();
      expect(component.selectedCategory).toBe(component.skillCategories[1].id);
      expect(buttons[1].classList).toContain('active');
    });

    it('resizes with the window', () => {
      spyOn(component.renderer, 'setSize');
      spyOnProperty(component.canvasContainer.nativeElement, 'clientWidth').and.returnValue(600);
      spyOnProperty(component.canvasContainer.nativeElement, 'clientHeight').and.returnValue(300);
      component.onWindowResize();
      expect(component.camera.aspect).toBe(2);
      expect(component.renderer.setSize).toHaveBeenCalledWith(600, 300);
    });

    it('animates: sprites face the camera and the scene renders', () => {
      spyOn(window, 'requestAnimationFrame').and.returnValue(9);
      spyOn(component.renderer, 'render');
      const sprite = component.skillSprites[0].sprite;
      spyOn(sprite, 'lookAt');
      component.animate();
      expect(sprite.lookAt).toHaveBeenCalledWith(component.camera.position);
      expect(component.renderer.render).toHaveBeenCalled();
      expect(component.frameId).toBe(9);
    });

    it('cancels the animation and releases WebGL when destroyed', () => {
      const cancel = spyOn(window, 'cancelAnimationFrame');
      const dispose = spyOn(component.renderer, 'dispose');
      const loseContext = spyOn(component.renderer, 'forceContextLoss');
      component.frameId = 4;
      fixture.destroy();
      expect(cancel).toHaveBeenCalledWith(4);
      expect(dispose).toHaveBeenCalled();
      expect(loseContext).toHaveBeenCalled();
    });
  });

  describe('on the server', () => {
    it('only prepares the categories and ignores events', async () => {
      const fixture = await create('server');
      const component: any = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.skillCategories.length).toBeGreaterThan(0);
      expect(component.renderer).toBeUndefined();
      expect(() => {
        component.toggleConnections();
        component.selectCategory('ai');
        component.onWindowResize();
        component.onMouseMove(new MouseEvent('mousemove'));
        fixture.destroy();
      }).not.toThrow();
    });
  });

  it('does not start the scene when destroyed while the icon font loads', async () => {
    const fixture = await create('browser');
    const component: any = fixture.componentInstance;
    fixture.detectChanges();
    fixture.destroy();
    await component.ready;
    expect(component.renderer).toBeUndefined();
  });
});
