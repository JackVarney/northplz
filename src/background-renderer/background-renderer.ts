import { createNumberRotator, hsla } from "../util";

export default () => {
  const hue_min = 120;
  const hue_max = 320;
  const increment = 1;
  const hueRotator = createNumberRotator(hue_min, hue_max, increment, hue_max);

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = hsla(hueRotator(), 80, 90, 0.01);
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  return render;
};
