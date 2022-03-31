import images from "../images";

const loadImages = new Promise<HTMLImageElement[]>((res) => {
  const imagePromisified = (url: string) => {
    const image = new Image();
    image.src = url;
    const p = new Promise<HTMLImageElement>((res) => {
      image.onload = () => {
        res(image);
      };
    });

    return p;
  };

  return Promise.all(images.map(imagePromisified)).then(res);
});

export default loadImages;
