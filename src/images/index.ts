import defaultBackground from "./defaultBackground.jpg";
import fiveSeven from "./weapons/57.png";
import ak from "./weapons/ak.png";
import ak2 from "./weapons/ak2.png";
import aug from "./weapons/aug.png";
import awp from "./weapons/awp.png";
import awp2 from "./weapons/awp2.png";
import bizon from "./weapons/bizon.png";
import cz from "./weapons/cz.png";
import deagle from "./weapons/deagle.png";
import duals from "./weapons/duals.png";
import famas from "./weapons/famas.png";
import galil from "./weapons/galil.png";
import glock from "./weapons/glock.png";
import m4a1 from "./weapons/m4a1.png";
import mac10 from "./weapons/mac10.png";
import mp5 from "./weapons/mp5.png";
import mp9 from "./weapons/mp9.png";
import nova from "./weapons/nova.png";
import p90 from "./weapons/p90.png";
import p250 from "./weapons/p250.png";
import p2502 from "./weapons/p2502.png";
import sawedoff from "./weapons/sawedoff.png";
import scout from "./weapons/scout.png";
import sg from "./weapons/sg.png";
import ump from "./weapons/ump.png";
import ump2 from "./weapons/ump2.png";
import usp from "./weapons/usp.png";
import xm from "./weapons/xm.png";
import fiveSevenFlipped from "./weapons/flipped/57.png";
import akFlipped from "./weapons/flipped/ak.png";
import ak2Flipped from "./weapons/flipped/ak2.png";
import augFlipped from "./weapons/flipped/aug.png";
import awpFlipped from "./weapons/flipped/awp.png";
import awp2Flipped from "./weapons/flipped/awp2.png";
import bizonFlipped from "./weapons/flipped/bizon.png";
import czFlipped from "./weapons/flipped/cz.png";
import deagleFlipped from "./weapons/flipped/deagle.png";
import dualsFlipped from "./weapons/flipped/duals.png";
import famasFlipped from "./weapons/flipped/famas.png";
import galilFlipped from "./weapons/flipped/galil.png";
import glockFlipped from "./weapons/flipped/glock.png";
import m4a1Flipped from "./weapons/flipped/m4a1.png";
import mac10Flipped from "./weapons/flipped/mac10.png";
import mp5Flipped from "./weapons/flipped/mp5.png";
import mp9Flipped from "./weapons/flipped/mp9.png";
import novaFlipped from "./weapons/flipped/nova.png";
import p90Flipped from "./weapons/flipped/p90.png";
import p250Flipped from "./weapons/flipped/p250.png";
import p2502Flipped from "./weapons/flipped/p2502.png";
import sawedoffFlipped from "./weapons/flipped/sawedoff.png";
import scoutFlipped from "./weapons/flipped/scout.png";
import sgFlipped from "./weapons/flipped/sg.png";
import umpFlipped from "./weapons/flipped/ump.png";
import ump2Flipped from "./weapons/flipped/ump2.png";
import uspFlipped from "./weapons/flipped/usp.png";
import xmFlipped from "./weapons/flipped/xm.png";

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

const weapons = [
  glock,
  akFlipped,
  usp,
  m4a1Flipped,
  deagle,
  awpFlipped,
  fiveSeven,
  famasFlipped,
  cz,
  galilFlipped,
  p250,
  scoutFlipped,
  duals,
  augFlipped,
  p2502,
  sgFlipped,
  nova,
  ak2Flipped,
  xm,
  awpFlipped,
  sawedoff,
  umpFlipped,
  mac10,
  mp9Flipped,
  bizon,
  p90Flipped,
  ump2,
  awp2Flipped,
  mp5,
  augFlipped,
].map(imagePromisified);

export default {
  weapons,
  defaultBackground: imagePromisified(defaultBackground),
};
