import { Settings } from "types"
import { darken } from "polished"
import {
  DEFAULT_COMPACT_MODE,
  DEFAULT_GLASS,
  DEFAULT_GLASS_ENABLED,
  DEFAULT_HEADER_COLORS,
  DEFAULT_HEADER_COLORS_ENABLED,
  DEFAULT_UPDATE,
  REQUIRED_SETTINGS_KEYS,
  THEME_DARK,
  THEME_KEYS,
} from "./constants"

const headerKeys = ["h1", "h2", "h3", "h4", "h5", "h6"]
const glassKeys = ["navBar", "settings", "widgets", "window"]

const isColor = (key: any, color: any): any => {
  try {
    if (typeof key !== "string" || !headerKeys.includes(key)) {
      return false
    }
    darken("0.1", color)
    return true
  } catch {
    return false
  }
}

const isGlassBackground = (key: any, bool: any): any => {
  try {
    if (typeof key !== "string" || !glassKeys.includes(key)) {
      return DEFAULT_GLASS_ENABLED
    }
    if (typeof bool !== "boolean") {
      return DEFAULT_GLASS_ENABLED
    }
    return bool
  } catch {
    return DEFAULT_GLASS_ENABLED
  }
}

const update = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_UPDATE
  }
  return bool
}

const headerColors = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return DEFAULT_HEADER_COLORS
  }
  if (Object.keys(obj).every((key) => isColor(key, obj[key]))) {
    return obj
  }
  return DEFAULT_HEADER_COLORS
}

const headerColorsEnabled = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_HEADER_COLORS_ENABLED
  }
  return bool
}

const glassBackground = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return DEFAULT_GLASS
  }
  const key_array = Object.keys(obj)
  let allGlassBackground = true
  key_array.forEach((val, key) => {
    if (!isGlassBackground(val, obj[val])) {
      allGlassBackground = false
    }
  })
  if (allGlassBackground) {
    return obj
  }
  return DEFAULT_GLASS
}

const glassEnabled = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_GLASS_ENABLED
  }
  return bool
}

const compactMode = (bool: any): any => {
  console.log(bool)
  if (typeof bool !== "boolean") {
    return DEFAULT_COMPACT_MODE
  }
  return bool
}

const customTheme = (obj: any): any => {
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length === 0
  ) {
    return THEME_DARK
  }
  if (Object.keys(obj).every((key) => THEME_KEYS.includes(key))) {
    return obj
  }
  return THEME_DARK
}

export const ensureKeys = (settings: { [key in any]: any }, keys: any[]) => {
  const filteredObject = Object.fromEntries(
    Object.entries(settings).filter(([key]) => keys.includes(key as Settings)),
  )

  for (const key of keys) {
    if (filteredObject[key] === undefined) {
      filteredObject[key] = null
    }
  }
  return filteredObject
}

const settingsChecker = (settings: { [key in Settings]: any }): {
  [key in Settings]: any
} => {
  const filledSettings = ensureKeys(settings, REQUIRED_SETTINGS_KEYS)
  for (const [key, value] of Object.entries(filledSettings)) {
    switch (key) {
      case "check_updates":
        filledSettings[key] = update(value)
        break
      case "header_colors":
        filledSettings[key] = headerColors(value)
        break
      case "header_colors_enabled":
        filledSettings[key] = headerColorsEnabled(value)
        break
      case "glass_background":
        filledSettings[key] = glassBackground(value)
        break
      case "glass_background_enabled":
        filledSettings[key] = glassEnabled(value)
        break
      case "custom_theme":
        filledSettings[key] = customTheme(value)
        break
      case "compact_mode":
        filledSettings[key] = compactMode(value)
        break
      default:
        break
    }
  }
  return filledSettings as { [key in Settings]: any }
}

export const checker = {
  settingsChecker,
}
