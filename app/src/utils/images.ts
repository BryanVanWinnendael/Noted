import { BackgroundImages } from "types";

import JPBackground from "assets/images/jp.jpg";
import INBackground from "assets/images/in.jpg";
import NYBackground from "assets/images/ny.jpg";
import KRBackground from "assets/images/kr.jpg";
import PHBackground from "assets/images/ph.jpg";

import CrystalBackground from "assets/images/crystal.jpg";
import HarmonyBackground from "assets/images/harmony.jpg";
import PopBackground from "assets/images/pop.jpg";
import WavesBackground from "assets/images/waves.jpg";
import FlowBackground from "assets/images/flow.jpg";
import GlowBackground from "assets/images/glow.jpg";

import BlueBackground from "assets/images/blue.jpg";
import LightBackground from "assets/images/light.jpg";
import PinkBackground from "assets/images/pink.jpg";
import PurpleBackground from "assets/images/purple.png";

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

export const backgroundAbstract: BackgroundImagesObject = {
  crystal: {
    name: "Crystal",
    image: CrystalBackground,
  },
  harmony: {
    name: "Harmony",
    image: HarmonyBackground,
  },
  pop: {
    name: "Pop",
    image: PopBackground,
  },
  wave: {
    name: "Waves",
    image: WavesBackground,
  },
  flow: {
    name: "Flow",
    image: FlowBackground,
  },
  glow: {
    name: "Glow",
    image: GlowBackground,
  },
};

export const backgroundGradients: BackgroundImagesObject = {
  purple: {
    name: "Purple",
    image: PurpleBackground,
  },
  light: {
    name: "Light",
    image: LightBackground,
  },
  pink: {
    name: "Pink",
    image: PinkBackground,
  },
  blue: {
    name: "Blue",
    image: BlueBackground,
  },
};

export const backgrounds = {
  ...backgroundColors,
  ...backgroundCities,
  ...backgroundAbstract,
  ...backgroundGradients,
};
