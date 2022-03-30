import SimplexNoise from "simplex-noise";
import images from "./images";
import { log, range } from "./util";

const loadImages = new Promise<HTMLImageElement[]>((res) => {
  const imagePromisified = (url: string) => {
    const image = new Image();
    image.src = url;
    const p = new Promise<HTMLImageElement>((res) => {
      image.onload = () => {
        res(image);
      };
    });

    return p;
  };

  return Promise.all(images.map(imagePromisified)).then(res);
});

const noise = new SimplexNoise();

const createPoint = (
  x: number,
  y: number,
  w: number,
  h: number,
  t: number
) => ({
  x,
  y,
  w,
  h,
  t,
  n: noise.noise2D(x, y),
});

type Point = ReturnType<typeof createPoint>;

function createPoints() {
  const points: Point[] = [];
  const w = window.innerWidth / 100;
  const h = window.innerWidth / 100;

  for (const x of range(w)) {
    for (const y of range(h)) {
      const t = (x * w + y * h) / 40;

      points.push(createPoint(x, y, 100, 100, t));
    }
  }

  points.push(createPoint(0, 0, 0, 0, 1000));

  return points;
}

export default async () => {
  const images = await loadImages;

  let then = Date.now();
  let index = 0;
  const points = createPoints();

  function render(ctx: CanvasRenderingContext2D) {
    const now = Date.now();
    const shouldRender = ({ t }: { t: number }) => now - then > t;
    const shouldRotateImages = points.every(shouldRender);

    if (shouldRotateImages) {
      then = Date.now();

      index += 1;
      if (index === images.length) {
        index = 0;
      }
    }

    for (const { x, y, w, h, t, n } of points) {
      if (shouldRender({ t })) {
        ctx.drawImage(
          images[index],
          x * w, // x pos in spritesheet
          y * h, // y pos in spritesheet
          w, // x distance in spritesheet
          h, // y distance in spritesheet
          x * w, // x pos on canvas
          y * h, // y pos on canvas
          w, // x distance on canvas
          h // y distance on canvas
        );
      }
    }
  }

  return render;
};
