export type Platforms = "win32" | "linux";

export interface MyWindow extends Window {
  myApp: any;
  [key: string]: any;
}

export interface WorkspaceType {
  items: WorkspaceType[] | undefined;
  name: string;
  path: string;
  type: "file" | "folder";
  id: string;
}

export type BooleanObject = {
  [key: number]: boolean;
};

export type StringObject = {
  [key: number]: string;
};

export type StringNullObject = {
  [key: number]: string | null;
};

export interface ActiveTab {
  path: string;
  splittedPath?: string;
}

export interface Tab {
  [key: number]: ActiveTab;
}

export interface ContextMenu {
  path: string;
  type: "file" | "folder";
  name: string;
}

export type Material = "acrylic" | "mica";

export type OpenAvailbleTypes = "noted" | "pdf";

export interface OpenTypes {
  type: OpenAvailbleTypes;
  splittedType?: OpenAvailbleTypes;
}

export interface Theme {
  [key: string]: string | boolean | undefined;
  backgroundColor: string;
  secondaryBackgroundColor: string;
  textColor: string;
  iconColor: string;
  accentColor: string;
  downloaded?: boolean;
}

export interface HeaderColors {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export type WidgetName = "calendar" | "todo" | "clock" | "info";

export type GlassComponents =
  | "navBar"
  | "settings"
  | "widgets"
  | "window"
  | "editor"
  | "contextMenu";

export type BackgroundColors = "default" | "custom";

export type BackgroundAcrylic =
  | "bubble"
  | "red"
  | "blue"
  | "dark"
  | "light"
  | "mist"
  | "papercut";
export type BackgroundCities = "jp" | "in" | "ny" | "kr" | "ph";

export type BackgroundImages =
  | BackgroundColors
  | BackgroundCities
  | BackgroundAcrylic;

export type GlassSettings = {
  [key in GlassComponents]: boolean;
};

export interface Scrollbar {
  color: string;
  opacity: number;
}

export type Settings =
  | "check_updates"
  | "header_colors"
  | "header_colors_enabled"
  | "glass_background"
  | "glass_background_enabled"
  | "header_colors"
  | "compact_mode"
  | "active_theme"
  | "font_family"
  | "translate_language"
  | "extension_label"
  | "background_image"
  | "blur"
  | "custom_background"
  | "editor_title"
  | "scrollbar"
  | "sidebar_icons"
  | "wallpaper_brightness"
  | "action_bar_opacity"
  | "sidebar_opacity"
  | "material"
  | "sidebar_text_color"
  | "sidebar_icon_color"
  | "markdown";

export interface ToDo {
  date: string | null;
  todo: string;
}

export type CanvasTools = "none" | "pencil" | "text";

export interface CanvasElement {
  id: number;
  clientX: number;
  clientY: number;
  x: number;
  y: number;
  type: string;
  text?: string;
  points?: {
    x: number;
    y: number;
  }[];
}

export interface NoteStyle {
  backgroundColor: string;
  secondaryBackgroundColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
  muted: string;
  accent: string;
  secondaryBackgroundColorLighter: string;
  secondaryBackgroundColorDarker: string;
  font: string;
  headerColors: HeaderColors | false;
}

export interface UserNote {
  user_email: string;
  data: string;
  path: string;
  id: string;
  style: NoteStyle;
}
