import { useDisclosure } from "@chakra-ui/react"
import { MyWindow, Theme, SettingsTypeContext, HeaderColors } from "types"
import { createContext, useContext, useEffect, useState } from "react"

const SettingsContext = createContext<SettingsTypeContext>({} as SettingsTypeContext)

export function useSettings(){
  return useContext(SettingsContext)
}

type Props = {
  children: React.ReactNode
}

declare let window: MyWindow

export const SettingsProvider:React.FC<Props> =  ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sideToolbar, setSideToolbar] = useState<boolean>(false)
  const [inlineToolbar, setInlineToolbar] = useState<boolean>(false)
  const [themePath, setThemePath] = useState<string>("")
  const [theme, setTheme] = useState<Theme | undefined>()
  const [customThemes, setCustomThemes] = useState<{ [key: string]: Theme}>({})
  const [headerColors, setHeaderColors] = useState<HeaderColors | false>(false)
  const [customHeadersEnabled, setCustomHeadersEnabled] = useState<boolean>(false)
  const ipcRenderer =  window.myApp.getIpcRenderer()

  const checkFileFormat = (data: string) => {
    try{
      const parsedData = JSON.parse(data)
      return parsedData["backgroundColor"] && parsedData["secondaryBackgroundColor"] && parsedData["textColor"] && parsedData["iconColor"] && parsedData["accentColor"]
    }
    catch(err){
      return false
    }
  }

  const readThemeFile = async () => {
    try{
      const customTheme = localStorage.getItem("customTheme")
      if (customTheme){
        if (!checkFileFormat(customTheme)) return // TODO: Show error message
        setTheme(JSON.parse(customTheme))
      }

      const localStorageThemePath = localStorage.getItem("themePath")
      if (!localStorageThemePath) return

      const data:any =  await ipcRenderer.invoke("theme:openfile", { filePath: localStorageThemePath })
      if (!checkFileFormat(data)) return // TODO: Show error message
      localStorage.setItem("customTheme", data)
      setTheme(data)
      setThemePath(localStorageThemePath)
    } 
    catch(err){
      console.log(err)
      // TODO: Show error message
    }
  }

  const saveThemeToFile = async () => {
    try{
      if (!themePath || !theme) return
      await ipcRenderer.invoke("theme:savefile", {file_path: themePath, file_content: JSON.stringify(theme) })
    } 
    catch(err){
      console.log(err)
    }
  }

  const exportTheme = async () => {
    try{
      const { filePath } = await ipcRenderer.invoke("theme:export", {file_content: JSON.stringify(theme) })
      localStorage.setItem("themePath", filePath)
      setThemePath(filePath)
    } 
    catch(err){
      console.log(err)
    }
  }


  const importTheme = async () => {
    try{
      const { filePath, data } =  await ipcRenderer.invoke("theme:import")
      if (!checkFileFormat(data)) return // TODO: Show error message
      localStorage.setItem("customTheme", data)
      localStorage.setItem("themePath", filePath)
      setTheme(data)
      setThemePath(filePath)
    } 
    catch(err){
      console.log(err)
    }
  }

  const removeThemePath = () => {
    localStorage.removeItem("themePath")
    setThemePath("")
  }

  const addThemeToEditor = (name :string, theme: Theme) => {
    if (customThemes[name]) return false

    const newCustomThemes = {...customThemes}
    newCustomThemes[name] = theme
    setCustomThemes(newCustomThemes)
    localStorage.setItem("customThemes", JSON.stringify(newCustomThemes))
    return true
  }

  const getCustomThemes = () => {
    const customThemes = localStorage.getItem("customThemes")
    if (customThemes) setCustomThemes(JSON.parse(customThemes))
  }

  const deleteCustomTheme = (name: string) => {
    const newCustomThemes = {...customThemes}
    delete newCustomThemes[name]
    setCustomThemes(newCustomThemes)
    localStorage.setItem("customThemes", JSON.stringify(newCustomThemes))
  }

  const value: SettingsTypeContext = {
    isOpen,
    onOpen,
    onClose,
    sideToolbar,
    setSideToolbar,
    setInlineToolbar,
    inlineToolbar,
    readThemeFile,
    theme,
    setTheme,
    saveThemeToFile,
    exportTheme,
    importTheme,
    themePath,
    removeThemePath,
    customHeadersEnabled,
    setCustomHeadersEnabled,
    setHeaderColors,
    headerColors,
    addThemeToEditor,
    customThemes,
    deleteCustomTheme
  }

  useEffect (() => {
    localStorage.getItem("sidetoolbar") === "false" ? setSideToolbar(false) : setSideToolbar(true)
    localStorage.getItem("inlinetoolbar") === "false" ? setInlineToolbar(false) : setInlineToolbar(true)
    localStorage.getItem("customHeadersEnabled") === "true" ? setCustomHeadersEnabled(true) : setCustomHeadersEnabled(false)
    localStorage.getItem("headerColors") ? setHeaderColors(JSON.parse(localStorage.getItem("headerColors") as string)) : setHeaderColors(false)
    readThemeFile()
    getCustomThemes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

