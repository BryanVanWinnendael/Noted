import { Settings } from "types";
import { darken } from "polished";
import {
  DEFAULT_ACTION_BAR_OPACITY,
  DEFAULT_ACTIVE_THEME,
  DEFAULT_BACKGROUND_IMAGE,
  DEFAULT_BLUR,
  DEFAULT_COMPACT_MODE,
  DEFAULT_EDITOR_TITLE,
  DEFAULT_EXTENSION_LABEL,
  DEFAULT_FONT,
  DEFAULT_GLASS,
  DEFAULT_GLASS_ENABLED,
  DEFAULT_HEADER_COLORS,
  DEFAULT_HEADER_COLORS_ENABLED,
  DEFAULT_MATERIAL,
  DEFAULT_MATERIALS,
  DEFAULT_SCROLLBAR,
  DEFAULT_SIDEBAR_ICONS,
  DEFAULT_SIDEBAR_OPACITY,
  DEFAULT_TRANSLATE_LANGUAGE,
  DEFAULT_UPDATE,
  DEFAULT_WALLPAPER_BRIGHTNESS,
  REQUIRED_SETTINGS_KEYS,
  DEFAULT_SIDEBAR_TEXT_COLOR,
  DEFAULT_SIDEBAR_ICON_COLOR,
  DEFAULT_REPO,
} from "../constants";

import languages from "../languages.json";

const headerKeys = ["h1", "h2", "h3", "h4", "h5", "h6"];
const glassKeys = [
  "navBar",
  "settings",
  "widgets",
  "window",
  "editor",
  "contextMenu",
];

const isColor = (key: any, color: any): any => {
  try {
    if (typeof key !== "string" || !headerKeys.includes(key)) {
      return false;
    }
    darken("0.1", color);
    return true;
  } catch {
    return false;
  }
};

const isGlassBackground = (key: any, bool: any): any => {
  if (typeof key !== "string" || !glassKeys.includes(key)) {
    return DEFAULT_GLASS_ENABLED;
  }
  if (typeof bool !== "boolean") {
    return DEFAULT_GLASS_ENABLED;
  }
  return true;
};

const update = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_UPDATE;
  }
  return bool;
};

const headerColors = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return DEFAULT_HEADER_COLORS;
  }
  if (Object.keys(obj).every((key) => isColor(key, obj[key]))) {
    return obj;
  }
  return DEFAULT_HEADER_COLORS;
};

const headerColorsEnabled = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_HEADER_COLORS_ENABLED;
  }
  return bool;
};

const glassBackground = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return DEFAULT_GLASS;
  }
  const key_array = Object.keys(obj);
  let allGlassBackground = true;
  key_array.forEach((val) => {
    if (!isGlassBackground(val, obj[val])) {
      allGlassBackground = false;
    }
  });
  if (allGlassBackground) {
    return obj;
  }
  return DEFAULT_GLASS;
};

const glassEnabled = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_GLASS_ENABLED;
  }
  return bool;
};

const compactMode = (bool: any): any => {
  if (typeof bool !== "boolean") {
    return DEFAULT_COMPACT_MODE;
  }
  return bool;
};

const isCustomThemeString = (theme: any): any => {
  if (typeof theme !== "string") {
    return DEFAULT_ACTIVE_THEME;
  }
  return theme;
};

const isFontFamily = (font: any): any => {
  if (typeof font !== "string") {
    return DEFAULT_FONT;
  }
  return font;
};

const checkLanguage = (lang: any): any => {
  const langArray = Object.keys(languages.translation);
  if (langArray.includes(lang)) {
    return lang;
  }
  return DEFAULT_TRANSLATE_LANGUAGE;
};

const checkExtensionLabel = (label: any): any => {
  if (typeof label !== "boolean") {
    return DEFAULT_EXTENSION_LABEL;
  }
  return label;
};

const checkBackgroundImage = (image: any): any => {
  if (typeof image !== "string") {
    return DEFAULT_BACKGROUND_IMAGE;
  }
  return image;
};

const checkBlur = (blur: any): any => {
  if (typeof blur !== "number") {
    return DEFAULT_BLUR;
  }
  return blur;
};

const checkCustomBackground = (background: any): any => {
  if (typeof background !== "string") {
    return "";
  }
  return background;
};

const checkEditorTitle = (title: any): any => {
  if (typeof title !== "boolean") {
    return DEFAULT_EDITOR_TITLE;
  }
  return title;
};

const checkScrollbar = (scrollbar: any): any => {
  if (typeof scrollbar !== "object" || scrollbar === null) {
    return DEFAULT_SCROLLBAR;
  }
  if (
    typeof scrollbar.color !== "string" ||
    typeof scrollbar.opacity !== "number"
  ) {
    DEFAULT_SCROLLBAR;
  }
  return scrollbar;
};

const checkSidebarIcons = (icons: any): any => {
  if (typeof icons !== "boolean") {
    return DEFAULT_SIDEBAR_ICONS;
  }
  return icons;
};

const checkWallpaperBrightness = (brightness: any): any => {
  if (typeof brightness !== "number") {
    return DEFAULT_WALLPAPER_BRIGHTNESS;
  }
  return brightness;
};

const checkActionbarOpacity = (opacity: any): any => {
  if (typeof opacity !== "number") {
    return DEFAULT_ACTION_BAR_OPACITY;
  }
  return opacity;
};

const checkSidebarOpacity = (opacity: any): any => {
  if (typeof opacity !== "number") {
    return DEFAULT_SIDEBAR_OPACITY;
  }
  return opacity;
};

const checkMaterial = (material: any): any => {
  if (typeof material !== "string" || !DEFAULT_MATERIALS.includes(material)) {
    return DEFAULT_MATERIAL;
  }
  return material;
};

const checkSidebarTextColor = (color: any): any => {
  if (typeof color === "boolean") {
    return color;
  } else if (typeof color === "string") {
    return color;
  }
  return DEFAULT_SIDEBAR_TEXT_COLOR;
};

const checkSidebarIconColor = (color: any): any => {
  if (typeof color === "boolean") {
    return color;
  } else if (typeof color === "string") {
    return color;
  }
  return DEFAULT_SIDEBAR_ICON_COLOR;
};

const checkMarkdown = (markdown: boolean): any => {
  if (typeof markdown !== "boolean") {
    return false;
  }
  return markdown;
};

const checkRepo = (repo: any): any => {
  console.log(repo);
  if (typeof repo !== "string") {
    return DEFAULT_REPO;
  }
  return repo;
};

export const ensureKeys = (settings: { [key in any]: any }, keys: any[]) => {
  const filteredObject = Object.fromEntries(
    Object.entries(settings).filter(([key]) => keys.includes(key as Settings)),
  );

  for (const key of keys) {
    if (filteredObject[key] === undefined) {
      filteredObject[key] = null;
    }
  }
  return filteredObject;
};

const settingsChecker = (settings: { [key in Settings]: any }): {
  [key in Settings]: any;
} => {
  const filledSettings = ensureKeys(settings, REQUIRED_SETTINGS_KEYS);
  for (const [key, value] of Object.entries(filledSettings)) {
    console.log(key);
    switch (key) {
      case "check_updates":
        filledSettings[key] = update(value);
        break;
      case "header_colors":
        filledSettings[key] = headerColors(value);
        break;
      case "header_colors_enabled":
        filledSettings[key] = headerColorsEnabled(value);
        break;
      case "glass_background":
        filledSettings[key] = glassBackground(value);
        break;
      case "glass_background_enabled":
        filledSettings[key] = glassEnabled(value);
        break;
      case "compact_mode":
        filledSettings[key] = compactMode(value);
        break;
      case "active_theme":
        filledSettings[key] = isCustomThemeString(value);
        break;
      case "font_family":
        filledSettings[key] = isFontFamily(value);
        break;
      case "translate_language":
        filledSettings[key] = checkLanguage(value);
        break;
      case "extension_label":
        filledSettings[key] = checkExtensionLabel(value);
        break;
      case "background_image":
        filledSettings[key] = checkBackgroundImage(value);
        break;
      case "blur":
        filledSettings[key] = checkBlur(value);
        break;
      case "custom_background":
        filledSettings[key] = checkCustomBackground(value);
        break;
      case "editor_title":
        filledSettings[key] = checkEditorTitle(value);
        break;
      case "scrollbar":
        filledSettings[key] = checkScrollbar(value);
        break;
      case "sidebar_icons":
        filledSettings[key] = checkSidebarIcons(value);
        break;
      case "wallpaper_brightness":
        filledSettings[key] = checkWallpaperBrightness(value);
        break;
      case "action_bar_opacity":
        filledSettings[key] = checkActionbarOpacity(value);
        break;
      case "sidebar_opacity":
        filledSettings[key] = checkSidebarOpacity(value);
        break;
      case "material":
        filledSettings[key] = checkMaterial(value);
        break;
      case "sidebar_text_color":
        filledSettings[key] = checkSidebarTextColor(value);
        break;
      case "sidebar_icon_color":
        filledSettings[key] = checkSidebarIconColor(value);
        break;
      case "markdown":
        filledSettings[key] = checkMarkdown(value);
        break;
      case "repo":
        filledSettings[key] = checkRepo(value);
        break;
      default:
        break;
    }
  }
  return filledSettings as { [key in Settings]: any };
};

export const checker = {
  settingsChecker,
};
