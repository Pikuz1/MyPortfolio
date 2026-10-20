import { sampleTextPoints } from './text-points';

describe('sampleTextPoints', () => {
  it('returns x, y, z for every requested point', () => {
    expect(sampleTextPoints('PG', 250).length).toBe(750);
  });

  it('keeps the points inside the requested width, centred on the origin', () => {
    const points = sampleTextPoints('PG', 400, 6);
    for (let i = 0; i < points.length; i += 3) {
      expect(Math.abs(points[i])).toBeLessThanOrEqual(3);
      expect(Math.abs(points[i + 1])).toBeLessThanOrEqual(1.5);
      expect(Math.abs(points[i + 2])).toBeLessThanOrEqual(0.15);
    }
  });

  it('spreads the points over the letters', () => {
    const points = sampleTextPoints('PG', 400);
    const xs = Array.from({ length: 400 }, (_, i) => points[i * 3]);
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(1);
  });
});
