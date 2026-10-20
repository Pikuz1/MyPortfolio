import { prefersReducedMotion } from './motion';

describe('prefersReducedMotion', () => {
  it('follows the prefers-reduced-motion media query', () => {
    const query = spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    expect(prefersReducedMotion()).toBeTrue();
    expect(query).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');

    query.and.returnValue({ matches: false } as MediaQueryList);
    expect(prefersReducedMotion()).toBeFalse();
  });
});
