import "./style.css";
import createNorthRenderer from "./north-renderer/north-renderer";
import createImageRenderer from "./image-renderer/image-renderer";
import createBackgroundRenderer from "./background-renderer/background-renderer";
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
  const northRenderer = createNorthRenderer();
  const backgroundRenderer = await createBackgroundRenderer();

  const render = () => {
    if (stop) {
      return;
    }

    backgroundRenderer(ctx);
    northRenderer(ctx);
    imageRenderer(ctx);

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
