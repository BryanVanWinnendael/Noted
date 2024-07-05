import { BackgroundImages } from "types";

import JPBackground from "assets/images/jp.jpg";
import INBackground from "assets/images/in.jpg";
import NYBackground from "assets/images/ny.jpg";
import KRBackground from "assets/images/kr.jpg";
import PHBackground from "assets/images/ph.jpg";

import MistBackground from "assets/images/mist.png";
import PapercutBackground from "assets/images/papercut.jpg";
import BubbleBackground from "assets/images/bubble.jpg";
import RedBackground from "assets/images/red.jpg";
import BlueBackground from "assets/images/blue.jpg";
import DarkBackground from "assets/images/dark.jpg";
import LightBackground from "assets/images/light.jpg";

type BackgroundImagesObject = {
  [key in BackgroundImages]?: {
    name: string;
    image: string;
  };
};

export const backgroundColors: BackgroundImagesObject = {
  default: {
    name: "Default",
    image: "",
  },
};

export const backgroundCities: BackgroundImagesObject = {
  jp: {
    name: "Japan",
    image: JPBackground,
  },
  in: {
    name: "India",
    image: INBackground,
  },
  ny: {
    name: "New York",
    image: NYBackground,
  },
  kr: {
    name: "Korea",
    image: KRBackground,
  },
  ph: {
    name: "Philippines",
    image: PHBackground,
  },
};

export const backgroundAcrylic: BackgroundImagesObject = {
  bubble: {
    name: "Bubble",
    image: BubbleBackground,
  },
  red: {
    name: "Red",
    image: RedBackground,
  },
  blue: {
    name: "Blue",
    image: BlueBackground,
  },
  dark: {
    name: "Dark",
    image: DarkBackground,
  },
  light: {
    name: "Light",
    image: LightBackground,
  },
  mist: {
    name: "Mist",
    image: MistBackground,
  },
  papercut: {
    name: "Papercut",
    image: PapercutBackground,
  },
};

export const backgrounds = {
  ...backgroundColors,
  ...backgroundCities,
  ...backgroundAcrylic,
};
