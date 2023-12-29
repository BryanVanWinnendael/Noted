import { EditorState } from "draft-js"

export interface MyWindow extends Window {
  myApp: any
}

export interface FileType {
  filePath: string 
  content: string
  fileName: string
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

export interface FileTypeContext {
  file_path: StringNullObject
  setFile_path: (file_path: StringNullObject) => void
  file_content: StringObject
  setFile_content: (file_content: StringObject) => void
  file_name: StringObject
  setFile_name: (file_name: StringObject) => void
  SaveFile: () => void
  saved: BooleanObject
  setSaved: (saved: BooleanObject) => void
  NewFile: () => void
  setNew_file: (new_file: BooleanObject) => void
  new_file: BooleanObject
  OpenFile: () => void
  currentTab: number
  setCurrentTab: (currentTab: number) => void
  addTab: () => void
  tabs: number[]
  removeTab: (tab: number) => void
}

export interface Theme {
  [key: string]: string
  backgroundColor: string
  secondaryBackgroundColor: string
  textColor: string
  iconColor: string
  accentColor: string
}

export interface HeaderColors {
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
}

export interface SettingsTypeContext {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  sideToolbar: boolean
  setSideToolbar: (sideToolbar: boolean) => void
  setInlineToolbar: (inlineToolbar: boolean) => void
  inlineToolbar: boolean
  readThemeFile: () => void
  theme: Theme | undefined
  setTheme: (theme: Theme) => void
  saveThemeToFile: () => void
  exportTheme: () => void
  importTheme: () => void
  themePath: string
  removeThemePath: () => void
  customHeadersEnabled: boolean
  setCustomHeadersEnabled: (customHeaderEnabled: boolean) => void
  setHeaderColors: (headerColors: HeaderColors| false) => void
  headerColors: HeaderColors | false
  addThemeToEditor: (name: string, customTheme: Theme) => boolean
  customThemes: { [key: string]: Theme}
  deleteCustomTheme: (name: string) => void
}

export interface CommandTypeContext {
  commandsOpen: boolean
  setCommandsOpen: (open: boolean) => void
}

export interface  CommandArgs {
  fileContext: FileTypeContext
  settingsContext: SettingsTypeContext
  editorContext: EditorTypeContext
}

export interface CommandCallback {
  (fileContext: CommandArgs): void
}

export interface CommandsList {
  name: string
  shortcut?: string
  callback: CommandCallback
}

export interface EditorTypeContext{
  editor: EditorState
  setEditor: (editor: EditorState) => void
}