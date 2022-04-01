import images from "../images";
import { createNumberRotator, hsla } from "../util";

export default async () => {
  const defaultBackground = await images.defaultBackground;

  const hue_min = 0;
  const hue_max = 360;
  const increment = 1;
  const interval = 20;
  const hueRotator = createNumberRotator(
    hue_min,
    hue_max,
    increment,
    hue_max,
    interval
  );

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.globalAlpha = 0.05;

    ctx.drawImage(
      defaultBackground,
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    ctx.fillStyle = hsla(hueRotator(), 100, 20, 0.05);
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  return render;
};
