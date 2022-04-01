import north from "./north-ascii";
import { createNumberRotator, ensureIsProductOf, hsla, range } from "../util";

const square_size = window.innerWidth / 200;
const row_size = Math.sqrt(north.length);
const col_size = Math.sqrt(north.length);
const marginLeft = window.innerWidth - square_size * row_size;

const hue_min = 190;
const hue_max = 280;
const hue_increment = 1;

const createInstructions = () => {
  const instructions: {
    x: number;
    y: number;
    colourPicker: ReturnType<typeof createNumberRotator>;
  }[] = [];

  for (const x of range(row_size)) {
    for (const y of range(col_size)) {
      const col = north.split("\n")[y];
      const char = col[x];

      if (char === "-") {
        continue;
      }

      const base_hue = hue_max - x - y;
      instructions.push({
        x,
        y,
        colourPicker: createNumberRotator(
          hue_min,
          hue_max,
          hue_increment,
          base_hue
        ),
      });
    }
  }

  return instructions;
};

const instructions = createInstructions();
function render(ctx: CanvasRenderingContext2D) {
  ctx.globalAlpha = 1;
  for (const { x, y, colourPicker } of instructions) {
    const xPos = x * square_size;
    const yPos = y * square_size;

    ctx.fillStyle = hsla(colourPicker(), 100, 80, 1);
    ctx.fillRect(marginLeft + xPos, yPos, square_size, square_size);
  }
}

export default () => {
  return render;
};
