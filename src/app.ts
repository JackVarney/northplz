import "./style.css";
import createNorthRenderer from "./north-renderer";
import createImageRenderer from "./image-renderer/image-renderer";
import { hsla, rgba } from "./util";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <canvas id="canvas" />
`;

const all: ReturnType<typeof init>[] = [];

const init = async () => {
  let stop = false;
  const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = hsla(0, 0, 0, 1);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const imageRenderer = await createImageRenderer();
  const { northRenderer, cleanNorthRender } = createNorthRenderer();

  const createHueRotator = () => {
    const hue_min = 190;
    const hue_max = 280;
    let hue = 280;
    let hueInReverse = false;

    return () => {
      if (hue <= hue_min) {
        hueInReverse = false;
      }

      if (hue >= hue_max) {
        hueInReverse = true;
      }

      hue += hueInReverse ? -1 : 1;

      return hue;
    };
  };

  const hueRotator = createHueRotator();
  const render = () => {
    if (stop) {
      cleanNorthRender();
      return;
    }

    ctx.globalAlpha = 1;

    ctx.fillStyle = hsla(hueRotator(), 80, 70, 0.01);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    imageRenderer(ctx);
    northRenderer(ctx);

    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);

  return () => {
    stop = true;
  };
};

window.addEventListener("resize", () => {
  Promise.all(all)
    .then((funcs) => funcs.forEach((f) => f()))
    .then(() => {
      all.push(init());
    });
});

all.push(init());
