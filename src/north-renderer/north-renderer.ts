import north from "./north-ascii";
import { createNumberRotator, hsla, range, rgba } from "../util";
import createTextRenderer from "./text-renderer";

const row_size = Math.sqrt(north.length);
const col_size = Math.sqrt(north.length);

const hue_min = 140;
const hue_max = 280;
const hue_increment = 1;

const createInstructions = () => {
  const instructions: {
    x: number;
    y: number;
  }[] = [];

  for (const x of range(row_size)) {
    for (const y of range(col_size)) {
      const col = north.split("\n")[y];
      const char = col[x];

      if (char === "-") {
        continue;
      }

      instructions.push({
        x,
        y,
      });
    }
  }

  return instructions;
};

const colourPicker = createNumberRotator(
  hue_min,
  hue_max,
  hue_increment,
  hue_min
);

const instructions = createInstructions();
const textRenderer = createTextRenderer();
function render(ctx: CanvasRenderingContext2D) {
  ctx.globalAlpha = 1;
  const square_size = window.innerWidth / 200;
  const marginLeft = 40;
  const marginTop = 40;

  const gradient = ctx.createLinearGradient(
    0,
    window.innerHeight / 5,
    window.innerWidth / 10,
    0
  );
  const hue = colourPicker();
  gradient.addColorStop(0, hsla(hue, 80, 70, 1));
  gradient.addColorStop(1, hsla(hue + 50, 80, 70, 1));
  ctx.fillStyle = gradient;

  for (const { x, y } of instructions) {
    const xPos = x * square_size;
    const yPos = y * square_size;

    ctx.fillRect(marginLeft + xPos, marginTop + yPos, square_size, square_size);
  }

  textRenderer(ctx, marginLeft + square_size * row_size, marginTop);
}

export default () => {
  return render;
};
