import loadImages from "./load-images";

export default async () => {
  const images = await loadImages;

  let then = Date.now();
  let index = Math.floor(Math.random() * (Math.max(images.length) - 1));
  let flipped = false;

  function render(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 1;
    const now = Date.now();

    if (now - then > 5000) {
      then = Date.now();
      flipped = !flipped;
      index += 1;

      if (index === images.length) {
        index = 0;
      }
    }

    ctx.drawImage(
      images[index],
      0, // x pos in spritesheet
      0, // y pos in spritesheet
      images[index].width, // x distance in spritesheet
      images[index].height, // y distance in spritesheet
      0, // x pos on canvas
      0, // y pos on canvas
      ctx.canvas.width, // x distance on canvas
      ctx.canvas.height // y distance on canvas
    );
  }

  return render;
};
