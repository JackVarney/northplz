import north from "./north-ascii";
import { createNumberRotator, hsla, range } from "../util";

function render(
  ctx: CanvasRenderingContext2D,
  marginLeft: number,
  marginTop: number
) {
  const fontSize = Math.round(window.innerWidth / 10);
  const quarterFontSize = fontSize / 4;

  ctx.font = `${fontSize}px "VT323", cursive`;
  ctx.fillText(
    "North Holo",
    marginLeft + 60,
    20 + marginTop + quarterFontSize + quarterFontSize
  );
  ctx.fillText(
    "London 2018",
    marginLeft + 52,
    20 +
      marginTop +
      quarterFontSize +
      quarterFontSize +
      quarterFontSize +
      quarterFontSize +
      quarterFontSize
  );
}

export default () => {
  return render;
};
