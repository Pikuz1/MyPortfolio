const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 256;

/**
 * Picks random points inside the filled pixels of the given text and returns
 * them as x, y, z triples in scene units, centred on the origin.
 */
export function sampleTextPoints(text: string, count: number, width = 6): Float32Array {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext('2d')!;
  context.font = 'bold 220px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#ffffff';
  context.fillText(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  const { data } = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const filled: number[] = [];
  for (let pixel = 0; pixel < CANVAS_WIDTH * CANVAS_HEIGHT; pixel++) {
    if (data[pixel * 4 + 3] > 128) {
      filled.push(pixel);
    }
  }

  const scale = width / CANVAS_WIDTH;
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // One random pick per equal slice of the letter pixels, so the points spread evenly
    const pixel = filled[Math.floor((i + Math.random()) * filled.length / count)];
    points[i * 3] = ((pixel % CANVAS_WIDTH) - CANVAS_WIDTH / 2) * scale;
    points[i * 3 + 1] = (CANVAS_HEIGHT / 2 - Math.floor(pixel / CANVAS_WIDTH)) * scale;
    points[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }
  return points;
}
