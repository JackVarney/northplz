import createPoints from "./create-points";
import loadImages from "./load-images";

export default async () => {
  const images = await loadImages;

  let then = Date.now();
  let index = 0;
  let flipped = false;
  let points = createPoints(flipped);

  function render(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 0.5;
    const now = Date.now();
    const shouldRender = ({ t }: { t: number }) => now - then > t;
    const shouldRotateImages = points.every(shouldRender);

    if (shouldRotateImages) {
      then = Date.now();
      flipped = !flipped;
      points = createPoints(flipped);

      index += 1;
      if (index === images.length) {
        index = 0;
      }
    }

    let i = 0;
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

      i += 1;
    }
  }

  return render;
};
