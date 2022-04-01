import images from "../images";

const loadImages = new Promise<HTMLImageElement[]>((res) => {
  return Promise.all(images.weapons).then(res);
});

export default loadImages;
