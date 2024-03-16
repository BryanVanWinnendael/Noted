import hexRgb from "hex-rgb"
import { darken, lighten, rgba } from "polished"

const RED: number = 0.2126
const GREEN: number = 0.7152
const BLUE: number = 0.0722

const GAMMA: number = 2.4

const luminance = (hex: string): number => {
  try {
    const { red, green, blue } = hexRgb(hex)

    const a: number[] = [red, green, blue].map((v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA)
    })

    return a[0] * RED + a[1] * GREEN + a[2] * BLUE
  } catch {
    return 0
  }
}

const contrast = (hex1: string, hex2: string): number => {
  const lum1: number = luminance(hex1) + 0.05
  const lum2: number = luminance(hex2) + 0.05
  const brightest: number = Math.max(lum1, lum2)
  const darkest: number = Math.min(lum1, lum2)

  return brightest / darkest
}

const getTextColor = (bgColor: string): string => {
  return contrast(bgColor, "#fff") > 4.5 ? "#fff" : "#000"
}

const getDarkerColor = (n: string, color: string): string => {
  try {
    return darken(n, color)
  } catch {
    return "#000"
  }
}

const getLighterColor = (n: string, color: string): string => {
  try {
    return lighten(n, color)
  } catch {
    return "#000"
  }
}

const getTransparent = (n: number, color: string): string => {
  try {
    return rgba(color, n)
  } catch {
    return "#000"
  }
}

const getGlassBackground = (bg: string): string => {
  const isDark = utils.getTextColor(bg) === "#fff"
  const bg_color = isDark
    ? getLighterColor("0.2", bg)
    : getDarkerColor("0.2", bg)
  return getTransparent(0.2, bg_color)
}

const getModalBackground = (bg: string): string => {
  const isDark = utils.getTextColor(bg) === "#fff"
  const bg_color = isDark
    ? getTransparent(0.48, "#000")
    : getTransparent(0.48, "#aaa")
  return bg_color
}

const fullParser = (object: any): any => {
  try {
    // go through each value and parse it if it's a string
    const parsedObject: any = {}
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === "string") {
        parsedObject[key] = JSON.parse(object[key])
      } else {
        parsedObject[key] = object[key]
      }
    })
    return parsedObject
  } catch (e) {
    return {}
  }
}

const getDateString = (date: number) => {
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

const getTimeString = (date: number) => {
  const d = new Date(date)
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

const saveToRecentOpened = (data: any, splitted: boolean | undefined) => {
  const pathKey = splitted ? "splitted_active_file" : "active_file"
  const path = localStorage.getItem(pathKey) || ""

  const openFilesJSON = localStorage.getItem("open_files")
  const openFiles: any[] = openFilesJSON ? JSON.parse(openFilesJSON) : []
  const existingFileIndex = openFiles.findIndex((file) => file.path === path)

  if (existingFileIndex !== -1) {
    openFiles[existingFileIndex].data = data
    openFiles.unshift(openFiles.splice(existingFileIndex, 1)[0]) // Move existing file to front
  } else {
    if (openFiles.length === 5) openFiles.pop() // Remove last file if max limit reached
    openFiles.unshift({ path, data }) // Add new file to front
  }

  localStorage.setItem("open_files", JSON.stringify(openFiles))
}

export const utils = {
  contrast,
  getTextColor,
  getDarkerColor,
  getLighterColor,
  getTransparent,
  getGlassBackground,
  getModalBackground,
  fullParser,
  getDateString,
  getTimeString,
  saveToRecentOpened,
}
