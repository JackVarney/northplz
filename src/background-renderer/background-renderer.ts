import SimplexNoise from "simplex-noise";
import images from "../images";
import {
  createNumberRotator,
  fiftyFifty,
  hsla,
  lerp,
  range,
  rgba,
} from "../util";

const simplex = new SimplexNoise();

export default async () => {
  const defaultBackground = await images.defaultBackground;

  const hue_min = 180;
  const hue_max = 320;
  const interval = 50;

  let points = range(10).map((i) => ({
    hueRotator: createNumberRotator(
      hue_min,
      hue_max,
      1,
      hue_min + i ** i,
      interval
    ),
    x: window.innerWidth * Math.random(),
    y: 0,
  }));

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = rgba(255, 255, 255, 0.1);

    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.globalAlpha = 1;

    points.forEach((p) => {
      ctx.fillStyle = hsla(p.hueRotator(), 50, 50, 0.6);
      ctx.fillRect(p.x, p.y, 4, 4);

      const i = fiftyFifty(
        100 * simplex.noise2D(p.x, p.y),
        100 * simplex.noise2D(p.x, p.y)
      );
      p.y += i;
      p.x -= i;

      if (p.y >= window.innerHeight || p.y <= 0) {
        p.hueRotator();
        p.y = Math.abs(window.innerHeight * simplex.noise2D(p.x, p.y));
      }

      if (p.x >= window.innerWidth || p.x <= 0) {
        p.hueRotator();
        p.x = window.innerWidth * Math.random();
      }
    });
  };

  return render;
};
