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

export interface ActiveFile {
  path: string
  data: any
}

export interface Tab {
  [key: number]: {
    path: string
    saved: boolean
  }
}

export interface WorkspaceTypeContext {
  openWorkspace: () => void
  workspace: WorkspaceType | undefined
  openFile: (path: string) => void
  activeFile: ActiveFile | undefined
  saveFile: (data: any, path: string) => Promise<void>
  isLoaded: boolean
  addTab: () => void
  activeTab: number
  tabs: Tab
  handleChangeTab: (tab: number) => void
  setTabs: (tabs: Tab) => void
  setActiveFile: (file: ActiveFile) => void
  removeTab: (tab: number) => void
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  openFileInTab: boolean
  setOpenFileInTab: (open: boolean) => void
  openFileInNewTab: (filePath: string) => void
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

export type GlassComponents = "navBar" | "settings" | "widgets" | "window"
 

export type GlassSettings = {
  [key in GlassComponents]: boolean
}

export type Settings =
  | "check_updates"
  | "header_colors"
  | "header_colors_enabled"
  | "glass_background"
  | "glass_background_enabled"
  | "header_colors"
  | "custom_theme"
  | "compact_mode"

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
}

export interface EditorTypeContext {
  editor: EditorJS
  setEditor: (editor: EditorJS) => void
  info: string
  setInfo: (info: string) => void
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
