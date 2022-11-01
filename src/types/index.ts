export interface MyWindow extends Window {
  myApp: any
}

export interface FileType {
  filePath: string 
  content: string
  fileName: string
}

export interface FileTypeContext {
  file_path: string | null
  setFile_path: (file_path: string) => void
  file_content: string
  setFile_content: (file_content: string) => void
  file_name: string
  setFile_name: (file_name: string) => void
  SaveFile: () => void
  saved: boolean
  setSaved: (saved: boolean) => void
  NewFile: () => void
  setNew_file: (new_file: boolean) => void
  new_file: boolean
  OpenFile: () => void
  setInlineToolbar: (inlineToolbar: boolean) => void
  inlineToolbar: boolean
}

export interface ScreenTypeContext{
  setOnScreen: (screen: string) => void
  onScreen: string
}

