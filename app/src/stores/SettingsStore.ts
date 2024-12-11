import { create } from "zustand";
import {
  Theme,
  Settings,
  HeaderColors,
  GlassSettings,
  BackgroundImages,
  Scrollbar,
  Material,
  MyWindow,
} from "types";
import { checker, ensureKeys } from "utils/settings/checker";
import { utils } from "utils";
import {
  DEFAULT_ACTION_BAR_OPACITY,
  DEFAULT_BACKGROUND_IMAGE,
  DEFAULT_BLUR,
  DEFAULT_COMPACT_MODE,
  DEFAULT_EXTENSION_LABEL,
  DEFAULT_FONT,
  DEFAULT_GLASS,
  DEFAULT_GLASS_ENABLED,
  DEFAULT_HEADER_COLORS_ENABLED,
  DEFAULT_MATERIAL,
  DEFAULT_SCROLLBAR,
  DEFAULT_SIDEBAR_ICONS,
  DEFAULT_SIDEBAR_OPACITY,
  DEFAULT_SIDEBAR_TEXT_COLOR,
  DEFAULT_TRANSLATE_LANGUAGE,
  DEFAULT_UPDATE,
  DEFAULT_WALLPAPER_BRIGHTNESS,
  THEME_DARK,
  THEME_KEYS,
} from "utils/constants";

declare let window: MyWindow;
const invoke = window.electron.invoke;

interface SettingsStore {
  isOpen: boolean;
  view: string;
  themePath: string;
  customTheme: Theme | undefined;
  customThemes: { [key: string]: Theme };
  headerColors: HeaderColors | false;
  headerColorsEnabled: boolean;
  checkUpdates: boolean | null;
  glassBackground: GlassSettings;
  glassEnabled: boolean;
  compactMode: boolean;
  activeTheme: string;
  fontFamily: string;
  translateLanguage: string;
  extensionLabel: boolean;
  backgroundImage: BackgroundImages;
  blur: number;
  appSettings: { [key in Settings]: any };
  customBackground: string;
  editorTitle: boolean;
  scrollbar: Scrollbar;
  sidebarIcons: boolean;
  wallpaperBrightness: number;
  sidebarOpacity: number;
  actionbarOpacity: number;
  material: Material;
  sidebarTextColor: string | false;
  sidebarIconColor: string | false;

  // Actions
  onOpen: () => void;
  onClose: () => void;
  setView: (view: string) => void;
  setThemePath: (path: string) => void;
  setCustomTheme: (theme: Theme) => void;
  setCustomThemes: (themes: { [key: string]: Theme }) => void;
  setHeaderColors: (colors: HeaderColors) => void;
  setHeaderColorsEnabled: (enabled: boolean) => void;
  setCheckUpdates: (check: boolean) => void;
  setGlassBackground: (glass: GlassSettings) => void;
  setGlassEnabled: (enabled: boolean) => void;
  setCompactMode: (compact: boolean) => void;
  setActiveTheme: (theme: string) => void;
  setFontFamily: (font: string) => void;
  setTranslateLanguage: (lang: string) => void;
  setExtensionLabel: (label: boolean) => void;
  setBackgroundImage: (image: BackgroundImages) => void;
  setBlur: (blur: number) => void;
  setAppSettings: (settings: { [key in Settings]: any }) => void;
  setCustomBackground: (path: string) => void;
  setEditorTitle: (title: boolean) => void;
  setScrollbar: (scrollbar: Scrollbar) => void;
  setSidebarIcons: (icons: boolean) => void;
  setWallpaperBrightness: (brightness: number) => void;
  setSidebarOpacity: (opacity: number) => void;
  setActionbarOpacity: (opacity: number) => void;
  setMaterial: (material: Material) => void;
  setSidebarTextColor: (color: string | false) => void;
  setSidebarIconColor: (color: string | false) => void;

  readThemeFile: () => Promise<void>;
  saveThemeToFile: () => Promise<void>;
  exportTheme: () => Promise<void>;
  importTheme: () => Promise<void>;
  removeThemePath: () => void;
  addThemeToEditor: (name: string, theme: Theme) => Promise<boolean>;
  getCustomThemes: () => Promise<void>;
  deleteCustomTheme: (name: string) => void;
  checkUpdate: () => Promise<boolean>;
  updateAndRestart: () => Promise<void>;
  saveSettings: (key: Settings, value: any) => void;
  setSetting: (key: Settings, value: any) => void;
  setSettings: (settings: { [key in Settings]: any }) => void;
  resetCustomTheme: () => void;
  getSettings: () => Promise<void>;
  setAppMaterial: (material: Material) => Promise<void>;
  initSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  // State
  isOpen: false,
  view: "General",
  themePath: "",
  customTheme: undefined,
  customThemes: {},
  headerColors: false,
  headerColorsEnabled: DEFAULT_HEADER_COLORS_ENABLED,
  checkUpdates: DEFAULT_UPDATE,
  glassBackground: DEFAULT_GLASS,
  glassEnabled: DEFAULT_GLASS_ENABLED,
  compactMode: DEFAULT_COMPACT_MODE,
  activeTheme: "",
  fontFamily: DEFAULT_FONT,
  translateLanguage: DEFAULT_TRANSLATE_LANGUAGE,
  extensionLabel: DEFAULT_EXTENSION_LABEL,
  backgroundImage: DEFAULT_BACKGROUND_IMAGE,
  blur: DEFAULT_BLUR,
  appSettings: {} as any,
  customBackground: "",
  editorTitle: true,
  scrollbar: DEFAULT_SCROLLBAR,
  sidebarIcons: DEFAULT_SIDEBAR_ICONS,
  wallpaperBrightness: DEFAULT_WALLPAPER_BRIGHTNESS,
  sidebarOpacity: DEFAULT_SIDEBAR_OPACITY,
  actionbarOpacity: DEFAULT_ACTION_BAR_OPACITY,
  material: DEFAULT_MATERIAL,
  sidebarTextColor: DEFAULT_SIDEBAR_TEXT_COLOR,
  sidebarIconColor: DEFAULT_SIDEBAR_TEXT_COLOR,
  // Setters
  setView: (view) => set({ view }),
  setThemePath: (path) => set({ themePath: path }),
  setCustomTheme: (theme) => set({ customTheme: theme }),
  setCustomThemes: (themes) => set({ customThemes: themes }),
  setHeaderColors: (colors) => set({ headerColors: colors }),
  setHeaderColorsEnabled: (enabled) => set({ headerColorsEnabled: enabled }),
  setCheckUpdates: (check) => set({ checkUpdates: check }),
  setGlassBackground: (glass) => set({ glassBackground: glass }),
  setGlassEnabled: (enabled) => set({ glassEnabled: enabled }),
  setCompactMode: (compact) => set({ compactMode: compact }),
  setActiveTheme: (theme) => set({ activeTheme: theme }),
  setFontFamily: (font) => set({ fontFamily: font }),
  setTranslateLanguage: (lang) => set({ translateLanguage: lang }),
  setExtensionLabel: (label) => set({ extensionLabel: label }),
  setBackgroundImage: (image) => set({ backgroundImage: image }),
  setBlur: (blur) => set({ blur }),
  setAppSettings: (settings) => set({ appSettings: settings }),
  setCustomBackground: (path) => set({ customBackground: path }),
  setEditorTitle: (title) => set({ editorTitle: title }),
  setScrollbar: (scrollbar) => set({ scrollbar }),
  setSidebarIcons: (icons) => set({ sidebarIcons: icons }),
  setWallpaperBrightness: (brightness) =>
    set({ wallpaperBrightness: brightness }),
  setSidebarOpacity: (opacity) => set({ sidebarOpacity: opacity }),
  setActionbarOpacity: (opacity) => set({ actionbarOpacity: opacity }),
  setMaterial: (material) => set({ material }),
  setSidebarTextColor: (color) => set({ sidebarTextColor: color }),
  setSidebarIconColor: (color) => set({ sidebarIconColor: color }),

  // Actions
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  readThemeFile: async () => {
    const { setThemePath, setCustomTheme } = get();

    const theme_path = localStorage.getItem("theme-path") || "";
    setThemePath(theme_path);
    if (!theme_path) return;

    try {
      const data: any = await invoke("theme:open-file", {
        filePath: theme_path,
      });

      const parsedData = JSON.parse(data);
      if (!ensureKeys(parsedData, THEME_KEYS)) return;

      localStorage.setItem("custom-theme-json", data);
      setCustomTheme(parsedData);
    } catch (err) {
      return console.log(err);
    }
  },
  saveThemeToFile: async () => {
    try {
      const { themePath, customTheme } = get();
      await invoke("theme:save-file", {
        file_path: themePath,
        file_content: JSON.stringify(customTheme),
      });
    } catch (err) {
      console.log(err);
    }
  },
  exportTheme: async () => {
    try {
      const { customTheme, setThemePath } = get();
      const { filePath } = await invoke("theme:export", {
        file_content: JSON.stringify(customTheme),
      });
      localStorage.setItem("theme-path", filePath);
      setThemePath(filePath);
    } catch (err) {
      console.log(err);
    }
  },
  importTheme: async () => {
    try {
      const { setCustomTheme, setThemePath } = get();
      const { filePath, data } = await invoke("theme:import");
      const parsedData = JSON.parse(data);
      if (!ensureKeys(parsedData, THEME_KEYS)) return;
      localStorage.setItem("custom-theme-json", data);
      localStorage.setItem("theme-path", filePath);
      setCustomTheme(parsedData);
      setThemePath(filePath);
    } catch (err) {
      console.log(err);
    }
  },
  removeThemePath: () => {
    const { setCustomTheme, setThemePath } = get();
    localStorage.removeItem("theme-path");
    localStorage.setItem("custom-theme-json", JSON.stringify(THEME_DARK));
    setCustomTheme(THEME_DARK);
    setThemePath("");
  },
  addThemeToEditor: async (name, theme) => {
    try {
      const { customThemes, setCustomThemes } = get();
      if (customThemes[name]) return false;

      const workspace_path = localStorage.getItem("workspace_path");
      const newCustomThemes = { ...customThemes };
      newCustomThemes[name] = theme;
      setCustomThemes(newCustomThemes);

      await invoke("theme:settings-save", {
        name,
        theme: JSON.stringify(theme),
        workspace_path,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  getCustomThemes: async () => {
    const { setCustomThemes, activeTheme } = get();
    try {
      const workspace_path = localStorage.getItem("workspace_path");
      const data = await invoke("theme:settings-get", {
        workspace_path,
      });
      const parsedData = utils.fullParser(data);
      setCustomThemes(parsedData);
      if (activeTheme) {
        const theme = parsedData[activeTheme];
        if (theme) {
          localStorage.setItem("theme-json", JSON.stringify(theme));
        }
      }
    } catch (err) {
      console.log(err);
      setCustomThemes({});
    }
  },
  deleteCustomTheme: (name) => {
    try {
      const { customThemes, setCustomThemes } = get();
      const newCustomThemes = { ...customThemes };
      delete newCustomThemes[name];
      setCustomThemes(newCustomThemes);
      const workspace_path = localStorage.getItem("workspace_path");
      invoke("theme:settings-delete", { name, workspace_path });
    } catch (err) {
      console.log(err);
    }
  },
  checkUpdate: async () => {
    try {
      const res = await invoke("updates:check");
      return res;
    } catch (err) {
      return false;
    }
  },
  updateAndRestart: async () => {
    try {
      await invoke("updates:update-and-restart");
    } catch (err) {
      console.log(err);
    }
  },
  saveSettings: (key, value) => {
    const { appSettings, setSetting } = get();
    const workspace_path = localStorage.getItem("workspace_path");

    appSettings[key] = value;
    invoke("file:settings-save", {
      settings: JSON.stringify(appSettings),
      workspace_path,
    });

    setSetting(key, value);
  },
  setSetting: (key, value) => {
    const {
      setCheckUpdates,
      setHeaderColors,
      setHeaderColorsEnabled,
      setGlassBackground,
      setGlassEnabled,
      setCompactMode,
      setActiveTheme,
      setFontFamily,
      setTranslateLanguage,
      setExtensionLabel,
      setBackgroundImage,
      setBlur,
      setCustomBackground,
      setEditorTitle,
      setScrollbar,
      setSidebarIcons,
      setWallpaperBrightness,
      setSidebarOpacity,
      setActionbarOpacity,
      setMaterial,
      setSidebarTextColor,
      setSidebarIconColor,
    } = get();
    switch (key) {
      case "check_updates":
        setCheckUpdates(value);
        break;
      case "header_colors":
        setHeaderColors(value);
        break;
      case "header_colors_enabled":
        setHeaderColorsEnabled(value);
        break;
      case "glass_background":
        setGlassBackground(value);
        break;
      case "glass_background_enabled":
        setGlassEnabled(value);
        break;
      case "compact_mode":
        setCompactMode(value);
        break;
      case "active_theme":
        setActiveTheme(value);
        break;
      case "font_family":
        setFontFamily(value);
        break;
      case "translate_language":
        setTranslateLanguage(value);
        break;
      case "extension_label":
        setExtensionLabel(value);
        break;
      case "background_image":
        setBackgroundImage(value);
        break;
      case "blur":
        setBlur(value);
        break;
      case "custom_background":
        setCustomBackground(value);
        break;
      case "editor_title":
        setEditorTitle(value);
        break;
      case "scrollbar":
        setScrollbar(value);
        break;
      case "sidebar_icons":
        setSidebarIcons(value);
        break;
      case "wallpaper_brightness":
        setWallpaperBrightness(value);
        break;
      case "sidebar_opacity":
        setSidebarOpacity(value);
        break;
      case "action_bar_opacity":
        setActionbarOpacity(value);
        break;
      case "material":
        setMaterial(value);
        break;
      case "sidebar_text_color":
        setSidebarTextColor(value);
        break;
      case "sidebar_icon_color":
        setSidebarIconColor(value);
        break;
      default:
        break;
    }
  },
  setSettings: (settings) => {
    set({
      checkUpdates: settings["check_updates"],
      headerColors: settings["header_colors"],
      headerColorsEnabled: settings["header_colors_enabled"],
      glassBackground: settings["glass_background"],
      glassEnabled: settings["glass_background_enabled"],
      compactMode: settings["compact_mode"],
      activeTheme: settings["active_theme"],
      fontFamily: settings["font_family"],
      translateLanguage: settings["translate_language"],
      extensionLabel: settings["extension_label"],
      backgroundImage: settings["background_image"],
      blur: settings["blur"],
      customBackground: settings["custom_background"],
      editorTitle: settings["editor_title"],
      scrollbar: settings["scrollbar"],
      sidebarIcons: settings["sidebar_icons"],
      wallpaperBrightness: settings["wallpaper_brightness"],
      sidebarOpacity: settings["sidebar_opacity"],
      actionbarOpacity: settings["action_bar_opacity"],
      material: settings["material"],
      sidebarTextColor: settings["sidebar_text_color"],
      sidebarIconColor: settings["sidebar_icon_color"],
    });
  },
  resetCustomTheme: () => {
    const { setCustomTheme } = get();
    localStorage.setItem("custom-theme-json", JSON.stringify(THEME_DARK));
    setCustomTheme(THEME_DARK);
  },
  getSettings: async () => {
    const { setSettings } = get();
    try {
      const workspace_path = localStorage.getItem("workspace_path");
      const settingsString = await invoke("file:settings-get", {
        workspace_path,
      });
      const settings = JSON.parse(settingsString);

      const cleanedSettings = checker.settingsChecker(settings);

      set({
        appSettings: cleanedSettings,
      });
      setSettings(cleanedSettings);
    } catch (err) {
      const cleanedSettings = checker.settingsChecker({} as any);
      set({
        appSettings: cleanedSettings,
      });
      setSettings(cleanedSettings);
    }
  },
  setAppMaterial: async (material) => {
    await invoke("change-material", material);
  },
  initSettings: async () => {
    const {
      getSettings,
      getCustomThemes,
      readThemeFile,
      resetCustomTheme,
      setAppMaterial,
    } = get();
    await getSettings();
    await getCustomThemes();
    await readThemeFile();
    resetCustomTheme();
    const { material } = get();
    await setAppMaterial(material);
  },
}));
