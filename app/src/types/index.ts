import { Dayjs } from "dayjs"
import EditorJS from "@editorjs/editorjs"

export interface MyWindow extends Window {
  myApp: any
  [key: string]: any
}

export interface WorkspaceType {
  items: WorkspaceType[] | undefined
  name: string
  path: string
  type: "file" | "folder"
  id: string
}

export type BooleanObject = {
  [key: number]: boolean
}

export type StringObject = {
  [key: number]: string
}

export type StringNullObject = {
  [key: number]: string | null
}

export interface ActiveTab {
  path: string
  splittedPath?: string
}

export interface Tab {
  [key: number]: ActiveTab
}

export interface ContextMenu {
  path: string
  type: "file" | "folder"
  name: string
}

export type Material = "acrylic" | "mica"

export type OpenAvailbleTypes = "noted" | "pdf"

export interface OpenTypes {
  type: OpenAvailbleTypes
  splittedType?: OpenAvailbleTypes
}

export interface WorkspaceTypeContext {
  openWorkspace: () => void
  openFolder: (path: string, reset?: boolean) => void
  workspace: WorkspaceType | undefined
  openFile: (path: string) => void
  saveFile: (data: any, path: string) => Promise<void>
  isLoaded: boolean
  addTab: () => void
  activeTab: number
  tabs: Tab
  handleChangeTab: (tab: number) => void
  setTabs: (tabs: Tab) => void
  removeTab: (tab: number) => void
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  setShowOpenFileInTab: (show: boolean) => void
  showOpenFileInTab: boolean
  setShowOpenNewFile: (show: boolean) => void
  showOpenNewFile: boolean
  openFileInNewTab: (filePath: string) => void
  makeNewFile: (fileName: string, folderPath: string) => Promise<boolean>
  makeNewFolder: (folderName: string, folderPath: string) => Promise<boolean>
  activeFolder: string | undefined
  setActiveFolder: (folder: string) => void
  deleteFile: (path: string) => Promise<boolean>
  deleteFolder: (path: string) => Promise<boolean>
  rename: (oldPath: string, newPath: string, type: string) => Promise<boolean>
  showSwitcher: boolean
  setShowSwitcher: (show: boolean) => void
  closeWorkspace: () => void
  savePdfFile: (data: any, path: string) => void
  split: (path: string) => Promise<void>
  readFile: (path: string) => Promise<any>
  importBackground: () => Promise<void>
  backgrounds: string[]
  deleteImportedBackground: (path: string) => void
  newVersion: boolean
  setNewVersion: (newVersion: boolean) => void
  openWorkspaceFile: () => Promise<void>
  showConfetti: boolean
  setShowConfetti: (show: boolean) => void
}

export interface Theme {
  [key: string]: string | boolean | undefined
  backgroundColor: string
  secondaryBackgroundColor: string
  textColor: string
  iconColor: string
  accentColor: string
  downloaded?: boolean
}

export interface HeaderColors {
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
}

export type WidgetName = "calendar" | "todo" | "clock" | "info"

export type GlassComponents =
  | "navBar"
  | "settings"
  | "widgets"
  | "window"
  | "editor"
  | "contextMenu"

export type BackgroundColors = "default" | "custom"

export type BackgroundAcrylic =
  | "bubble"
  | "red"
  | "blue"
  | "dark"
  | "light"
  | "mist"
  | "papercut"
export type BackgroundCities = "jp" | "in" | "ny" | "kr" | "ph"

export type BackgroundImages =
  | BackgroundColors
  | BackgroundCities
  | BackgroundAcrylic

export type GlassSettings = {
  [key in GlassComponents]: boolean
}

export interface Scrollbar {
  color: string
  opacity: number
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

export interface SettingsTypeContext {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  saveThemeToFile: () => void
  exportTheme: () => void
  importTheme: () => void
  themePath: string
  removeThemePath: () => void
  headerColors: HeaderColors | false
  headerColorsEnabled: boolean
  addThemeToEditor: (name: string, customTheme: Theme) => Promise<boolean>
  customThemes: { [key: string]: Theme }
  deleteCustomTheme: (name: string) => void
  checkUpdates: boolean
  handleAutoUpdate: () => void
  updateAndRestart: () => void
  checkUpdate: () => any
  updateAvailable: boolean
  glassBackground: GlassSettings
  glassEnabled: boolean
  saveSettings: (key: Settings, value: any) => void
  initSettings: () => void
  customTheme: Theme | undefined
  compactMode: boolean
  setCompactMode: (compact: boolean) => void
  setCustomTheme: (theme: Theme | undefined) => void
  activeTheme: string
  fontFamily: string
  translateLanguage: string
  extensionLabel: boolean
  backgroundImage: BackgroundImages
  blur: number
  customBackground: string
  editorTitle: boolean
  scrollbar: Scrollbar
  sidebarIcons: boolean
  wallpaperBrightness: number
  actionbarOpacity: number
  sidebarOpacity: number
  material: Material
}

export interface EditorTypeContext {
  editor: EditorJS
  setEditor: (editor: EditorJS) => void
  blocks: any[]
  setBlocks: (blocks: any[]) => void
  time: number
  setTime: (time: number) => void
  splittedEditor: EditorJS
  setSplittedEditor: (editor: EditorJS) => void
}

export interface ToDo {
  date: string | null
  todo: string
}

export interface WidgetTypeContext {
  widgetPanel: boolean
  setWidgetPanel: (widgetPanel: boolean) => void
  selectedWidgets: WidgetName[]
  setSelectedWidgets: (selectedWidgets: WidgetName[]) => void
  isConnected: boolean
  setIsConnected: (connect: boolean) => void
  canConnect: () => boolean
  selectedDate: Dayjs | undefined
  setSelectedDate: (date: Dayjs | undefined) => void
  getCompatibleWidget: (widget: WidgetName) => WidgetName | null
  showDateViewer: boolean
  setShowDateViewer: (show: boolean) => void
  todos: ToDo[]
  setTodos: (todos: ToDo[]) => void
  intervalId: NodeJS.Timer | undefined
  setIntervalId: (id: NodeJS.Timer) => void
}

export interface SlashTypeContext {
  slashOpen: boolean
  setSlashOpen: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}

export type CanvasTools = "none" | "pencil" | "text"

export interface CanvasElement {
  id: number
  clientX: number
  clientY: number
  x: number
  y: number
  type: string
  text?: string
  points?: {
    x: number
    y: number
  }[]
}
