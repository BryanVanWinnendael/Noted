import { useDisclosure } from "@chakra-ui/react"
import {
  MyWindow,
  Theme,
  SettingsTypeContext,
  HeaderColors,
  GlassSettings,
  Settings,
} from "types"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { checker, ensureKeys } from "utils/checker"
import { utils } from "utils"
import {
  DEFAULT_COMPACT_MODE,
  DEFAULT_FONT,
  DEFAULT_GLASS,
  DEFAULT_GLASS_ENABLED,
  DEFAULT_HEADER_COLORS_ENABLED,
  DEFAULT_UPDATE,
  THEME_DARK,
  THEME_KEYS,
} from "utils/constants"

const SettingsContext = createContext<SettingsTypeContext>(
  {} as SettingsTypeContext,
)

export function useSettings() {
  return useContext(SettingsContext)
}

type Props = {
  children: React.ReactNode
}

declare let window: MyWindow
const ipcRenderer = window.myApp.getIpcRenderer()

export const SettingsProvider: React.FC<Props> = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [themePath, setThemePath] = useState<string>("")
  const [customTheme, setCustomTheme] = useState<Theme | undefined>()
  const [customThemes, setCustomThemes] = useState<{ [key: string]: Theme }>({})
  const [headerColors, setHeaderColors] = useState<HeaderColors | false>(false)
  const [headerColorsEnabled, setHeaderColorsEnabled] = useState<boolean>(
    DEFAULT_HEADER_COLORS_ENABLED,
  )
  const [checkUpdates, setCheckUpdates] = useState<boolean>(DEFAULT_UPDATE)
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false)
  const [glassBackground, setGlassBackground] =
    useState<GlassSettings>(DEFAULT_GLASS)
  const [glassEnabled, setGlassEnabled] = useState<boolean>(
    DEFAULT_GLASS_ENABLED,
  )
  const [compactMode, setCompactMode] = useState<boolean>(DEFAULT_COMPACT_MODE)
  const [activeTheme, setActiveTheme] = useState<string>("")
  const [fontFamily, setFontFamily] = useState<string>(DEFAULT_FONT)

  const readThemeFile = useCallback(async () => {
    const theme_path = localStorage.getItem("theme-path") || ""
    setThemePath(theme_path)
    if (!theme_path) return

    try {
      const data: any = await ipcRenderer.invoke("theme:open-file", {
        filePath: theme_path,
      })

      const parsedData = JSON.parse(data)
      if (!ensureKeys(parsedData, THEME_KEYS)) return

      localStorage.setItem("custom-theme-json", data)
      setCustomTheme(parsedData)
    } catch (err) {
      return console.log(err)
    }
  }, [])

  const saveThemeToFile = async () => {
    try {
      await ipcRenderer.invoke("theme:save-file", {
        file_path: themePath,
        file_content: JSON.stringify(customTheme),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const exportTheme = async () => {
    try {
      const { filePath } = await ipcRenderer.invoke("theme:export", {
        file_content: JSON.stringify(customTheme),
      })
      localStorage.setItem("theme-path", filePath)
      setThemePath(filePath)
    } catch (err) {
      console.log(err)
    }
  }

  const importTheme = async () => {
    try {
      const { filePath, data } = await ipcRenderer.invoke("theme:import")
      const parsedData = JSON.parse(data)
      if (!ensureKeys(parsedData, THEME_KEYS)) return
      localStorage.setItem("custom-theme-json", data)
      localStorage.setItem("theme-path", filePath)
      setCustomTheme(parsedData)
      setThemePath(filePath)
    } catch (err) {
      console.log(err)
    }
  }

  const removeThemePath = () => {
    localStorage.removeItem("theme-path")
    localStorage.setItem("custom-theme-json", JSON.stringify(THEME_DARK))
    setCustomTheme(THEME_DARK)
    setThemePath("")
  }

  const addThemeToEditor = async (name: string, theme: Theme) => {
    try {
      if (customThemes[name]) return false
      const workspace_path = localStorage.getItem("workspace_path")
      const newCustomThemes = { ...customThemes }
      newCustomThemes[name] = theme
      setCustomThemes(newCustomThemes)
      await ipcRenderer.invoke("theme:settings-save", {
        name,
        theme: JSON.stringify(theme),
        workspace_path,
      })
      localStorage.setItem("theme-json", JSON.stringify(theme))
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const getCustomThemes = useCallback(async () => {
    try {
      const workspace_path = localStorage.getItem("workspace_path")
      const data = await ipcRenderer.invoke("theme:settings-get", {
        workspace_path,
      })
      const parsedData = utils.fullParser(data)
      setCustomThemes(parsedData)
      if (activeTheme) {
        const theme = parsedData[activeTheme]
        if (theme) {
          localStorage.setItem("theme-json", JSON.stringify(theme))
        }
      }
    } catch (err) {
      console.log(err)
      setCustomThemes({})
    }
  }, [activeTheme])

  const deleteCustomTheme = (name: string) => {
    try {
      const newCustomThemes = { ...customThemes }
      delete newCustomThemes[name]
      setCustomThemes(newCustomThemes)
      const workspace_path = localStorage.getItem("workspace_path")
      ipcRenderer.invoke("theme:settings-delete", { name, workspace_path })
    } catch (err) {
      console.log(err)
    }
  }

  const checkUpdate = async () => {
    try {
      const res = await ipcRenderer.invoke("updates:check")
      if (res) setUpdateAvailable(true)
      return res
    } catch (err) {
      return false
    }
  }

  const downloadUpdate = async () => {
    try {
      const res = await ipcRenderer.invoke("updates:download")
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const updateAndRestart = async () => {
    try {
      await ipcRenderer.invoke("updates:update-and-restart")
    } catch (err) {
      console.log(err)
    }
  }

  const handleAutoUpdate = useCallback(async () => {
    try {
      if (checkUpdates || localStorage.getItem("checkUpdates") === "true") {
        const res = await checkUpdate()
        if (res) {
          await downloadUpdate()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }, [checkUpdates])

  const saveSettings = async (key: Settings, value: any) => {
    const workspace_path = localStorage.getItem("workspace_path")
    const settings = await getSettings()
    if (!settings) return
    settings[key] = value
    ipcRenderer.invoke("file:settings-save", {
      settings: JSON.stringify(settings),
      workspace_path,
    })
    setSetting(key, value)
  }

  const setSetting = (key: Settings, value: any) => {
    switch (key) {
      case "check_updates":
        setCheckUpdates(value)
        break
      case "header_colors":
        setHeaderColors(value)
        break
      case "header_colors_enabled":
        setHeaderColorsEnabled(value)
        break
      case "glass_background":
        setGlassBackground(value)
        break
      case "glass_background_enabled":
        setGlassEnabled(value)
        break
      case "compact_mode":
        setCompactMode(value)
        break
      case "active_theme":
        setActiveTheme(value)
        break
      case "font_family":
        setFontFamily(value)
        break
      default:
        break
    }
  }

  const setSettings = (settings: { [key in Settings]: any }) => {
    setCheckUpdates(settings["check_updates"])
    setHeaderColors(settings["header_colors"])
    setHeaderColorsEnabled(settings["header_colors_enabled"])
    setGlassBackground(settings["glass_background"])
    setGlassEnabled(settings["glass_background_enabled"])
    setCompactMode(settings["compact_mode"])
    setActiveTheme(settings["active_theme"])
    setFontFamily(settings["font_family"])
  }

  const resetCustomTheme = () => {
    localStorage.setItem("custom-theme-json", JSON.stringify(THEME_DARK))
    setCustomTheme(THEME_DARK)
  }

  const getSettings = useCallback(async () => {
    try {
      const workspace_path = localStorage.getItem("workspace_path")
      const settingsString = await ipcRenderer.invoke("file:settings-get", {
        workspace_path,
      })
      const settings = JSON.parse(settingsString)

      const cleanedSettings = checker.settingsChecker(settings)
      setSettings(cleanedSettings)
      return cleanedSettings
    } catch (err) {
      const cleanedSettings = checker.settingsChecker({} as any)
      setSettings(cleanedSettings)
      return cleanedSettings
    }
  }, [])

  const initSettings = useCallback(() => {
    getSettings()
    getCustomThemes()
    readThemeFile()
    resetCustomTheme()
  }, [getCustomThemes, getSettings, readThemeFile])

  useEffect(() => {
    initSettings()
  }, [initSettings])

  const value: SettingsTypeContext = {
    isOpen,
    onOpen,
    onClose,
    saveThemeToFile,
    exportTheme,
    importTheme,
    themePath,
    removeThemePath,
    headerColors,
    headerColorsEnabled,
    addThemeToEditor,
    customThemes,
    deleteCustomTheme,
    checkUpdates,
    handleAutoUpdate,
    updateAndRestart,
    checkUpdate,
    updateAvailable,
    glassBackground,
    glassEnabled,
    saveSettings,
    initSettings,
    customTheme,
    compactMode,
    setCompactMode,
    setCustomTheme,
    activeTheme,
    fontFamily,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
