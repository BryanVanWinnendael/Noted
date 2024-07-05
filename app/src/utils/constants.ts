import { Settings, WidgetName } from "types";

export const DEFAULT_HEADER_COLORS = {
  h1: "#6488ea",
  h2: "#CCCCFF",
  h3: "#2AAA8A",
  h4: "#FFFF8F",
  h5: "#FF5F1F",
  h6: "#D22B2B",
};

export const THEME_LIGHT = {
  backgroundColor: "#fff",
  secondaryBackgroundColor: "#E7E7E7",
  textColor: "#000",
  iconColor: "#000",
  accentColor: "#6488ea",
};

export const THEME_DARK = {
  backgroundColor: "#1B1B1D",
  secondaryBackgroundColor: "#2C2C2E",
  textColor: "#fff",
  iconColor: "#fff",
  accentColor: "#6488ea",
};

export const THEME_DEEP_BLUE = {
  backgroundColor: "#1A202C",
  secondaryBackgroundColor: "#222731",
  textColor: "#fff",
  iconColor: "#fff",
  accentColor: "#6488ea",
};

export const THEME_KEYS = [
  "backgroundColor",
  "secondaryBackgroundColor",
  "textColor",
  "iconColor",
  "accentColor",
];

export const REQUIRED_SETTINGS_KEYS: Settings[] = [
  "check_updates",
  "header_colors",
  "header_colors_enabled",
  "glass_background",
  "glass_background_enabled",
  "compact_mode",
  "active_theme",
  "font_family",
  "translate_language",
  "extension_label",
  "background_image",
  "blur",
  "custom_background",
  "editor_title",
  "scrollbar",
  "sidebar_icons",
  "wallpaper_brightness",
  "action_bar_opacity",
  "sidebar_opacity",
  "material",
];

export const DEFAULT_UPDATE = null;

export const DEFAULT_ACTIVE_THEME = "light";

export const DEFAULT_HEADER_COLORS_ENABLED = false;

export const DEFAULT_GLASS = {
  navBar: true,
  settings: true,
  widgets: true,
  window: true,
  editor: true,
  contextMenu: true,
};

export const DEFAULT_GLASS_ENABLED = false;

export const TOAST_ID = "update";

export const CONNECTABLE_WIDGETS: WidgetName[][] = [
  ["calendar", "todo"],
  ["calendar", "clock"],
  ["calendar", "info"],
  ["info", "todo"],
];

export const DEFAULT_COMPACT_MODE = false;

export const DEFAULT_FONT = "Montserrat";

export const DEFAULT_FONTS = [
  "Roboto",
  "Syne",
  "DM Sans Italic",
  "DM Sans",
  "Cormorant Italic",
  "Cormorant",
  "Sora",
  "Vollkorn Italic",
  "Vollkorn",
  "Rubik Italic",
  "Rubik",
  "Archivo Narrow Italic",
  "Archivo Narrow",
  "Montserrat Italic",
  "Poppins",
  "Inter",
];

export const DEFAULT_TRANSLATE_LANGUAGE = "en";

export const DEFAULT_EXTENSION_LABEL = true;

export const DEFAULT_BACKGROUND_IMAGE = "default";

export const DEFAULT_BLUR = 0;

export const DEFAULT_EDITOR_TITLE = true;

export const DEFAULT_SCROLLBAR = {
  color: "#a7a7a7",
  opacity: 0.5,
};

export const DEFAULT_SIDEBAR_ICONS = false;

export const DEFAULT_WALLPAPER_BRIGHTNESS = 1;

export const DEFAULT_ACTION_BAR_OPACITY = 0.8;

export const DEFAULT_SIDEBAR_OPACITY = 0;

export const APP_VERSION = import.meta.env.VITE_APP_VERSION;

export const DEFAULT_MATERIAL = "mica";

export const DEFAULT_MATERIALS = ["acrylic"];
