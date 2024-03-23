import { BackgroundImages } from "types"

import JPBackground from "assets/images/jp.png"
import INBackground from "assets/images/in.png"
import NYBackground from "assets/images/ny.png"
import KRBackground from "assets/images/kr.png"
import PHBackground from "assets/images/ph.png"

import PastelBackground from "assets/images/pastel.png"
import MistBackground from "assets/images/mist.png"
import PapercutBackground from "assets/images/papercut.png"
import WavesBackground from "assets/images/waves.png"
import Purplebackground from "assets/images/purple.png"

import BubbleBackground from "assets/images/bubble.png"
import RedBackground from "assets/images/red.png"
import BlueBackground from "assets/images/blue.png"
import DarkBackground from "assets/images/dark.png"
import LightBackground from "assets/images/light.png"

type BackgroundImagesObject = {
  [key in BackgroundImages]?: {
    name: string
    image: string
  }
}

export const backgroundColors: BackgroundImagesObject = {
  default: {
    name: "Default",
    image: "",
  },
  pastel: {
    name: "Pastel",
    image: PastelBackground,
  },
  mist: {
    name: "Mist",
    image: MistBackground,
  },
  papercut: {
    name: "Papercut",
    image: PapercutBackground,
  },
  waves: {
    name: "Waves",
    image: WavesBackground,
  },
  purple: {
    name: "Purple",
    image: Purplebackground,
  },
}

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
}

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
}

export const backgrounds = {
  ...backgroundColors,
  ...backgroundCities,
  ...backgroundAcrylic,
}
