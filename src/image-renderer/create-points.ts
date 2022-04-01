import SimplexNoise from "simplex-noise";
import { log, range } from "../util";

const noise = new SimplexNoise();

const R = 40;

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

function createPoints(flipped: boolean) {
  const points: Point[] = [];
  const w = window.innerWidth / R;
  const h = window.innerWidth / R;

  for (const x of range(w)) {
    for (const y of range(h)) {
      let t = x + y;
      if (flipped) {
        t = w - x + (h - y);
      }

      points.push(createPoint(x, y, R, R, t));
    }
  }

  points.push(createPoint(0, 0, 0, 0, 1500));

  return points;
}

export default createPoints;
