import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { WorkspaceTypeContext, MyWindow, WorkspaceType, Tab } from "types"
import { APP_VERSION } from "utils/constants"

const WorkspaceContext = createContext<WorkspaceTypeContext>(
  {} as WorkspaceTypeContext,
)

export function useWorkspace() {
  return useContext(WorkspaceContext)
}

type Props = {
  children: React.ReactNode
}

declare let window: MyWindow

const invoke = window.electron.invoke

export const WorkspaceProvider: React.FC<Props> = ({ children }: Props) => {
  const [workspace, setWorkspace] = useState<WorkspaceType | undefined>()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [tabs, setTabs] = useState<Tab>({} as Tab)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const [showOpenFileInTab, setShowOpenFileInTab] = useState<boolean>(false)
  const [showOpenNewFile, setShowOpenNewFile] = useState<boolean>(false)
  const [activeFolder, setActiveFolder] = useState<string | undefined>()
  const [showSwitcher, setShowSwitcher] = useState<boolean>(false)
  const [backgrounds, setBackgrounds] = useState<string[]>([])
  const [newVersion, setNewVersion] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  const resetWorkspace = () => {
    setWorkspace(undefined)
    setTabs({})
    setActiveTab(0)
    setShowSidebar(true)
    setShowOpenNewFile(false)
    setShowOpenFileInTab(false)
    setActiveFolder(undefined)
    setShowSwitcher(false)
    localStorage.setItem("active_file", "")
    localStorage.setItem("splitted_active_file", "")
    localStorage.setItem("active_tab", "0")
    localStorage.setItem("open_files", JSON.stringify([]))
  }

  const reconstructTabs = (tabs: Tab) => {
    const newTabs: Tab = {}
    Object.keys(tabs).forEach((key: any, index) => {
      newTabs[index] = tabs[key]
    })
    return newTabs
  }

  const getFile = async (filePath: string) => {
    try {
      const openedFile = await invoke("file:open", {
        file_path: filePath,
      })
      const json_content = openedFile["fileContent"]
      let content = ""
      if (json_content) {
        content = JSON.parse(json_content)
      }

      return content
    } catch (err) {
      return undefined
    }
  }

  const readFile = async (filePath: string) => {
    const extension = filePath.split(".").pop()
    if (extension === "noted" || extension === "excalidraw") {
      return getFile(filePath)
    }

    return undefined
  }

  const openWorkspace = async () => {
    try {
      const openedWorkspace: WorkspaceType = await invoke("folder:open-dialog")
      if (!openedWorkspace) return
      resetWorkspace()
      localStorage.setItem("workspace_path", openedWorkspace.path)
      setWorkspace(openedWorkspace)
    } catch (err) {
      console.log(err)
    }
  }

  const closeWorkspace = async () => {
    try {
      resetWorkspace()
      localStorage.clear()
    } catch (err) {
      console.log(err)
    }
  }

  const openFileInNewTab = async (filePath: string) => {
    const newTabs = { ...tabs }
    const newTabId = Object.keys(tabs).length
    newTabs[newTabId] = {
      path: filePath,
    }
    setTabs(newTabs)
    setActiveTab(newTabId)
  }

  const handleChangeTab = async (index: number) => {
    const path = tabs[index].path
    localStorage.setItem("active_file", path)
    setActiveTab(index)
  }

  const addTab = () => {
    const newTabs = { ...tabs }
    const newTabId = Object.keys(tabs).length
    newTabs[newTabId] = {
      path: "New tab",
    }
    setTabs(newTabs)
    setActiveTab(newTabId)
  }

  const removeTab = async (index: number) => {
    const newTabs = { ...tabs }
    delete newTabs[index]
    const reconstructed_tabs = reconstructTabs(newTabs)
    setTabs(reconstructed_tabs)
    const newActiveTab =
      index === 0 ? 0 : Object.keys(reconstructed_tabs).length - 1
    setActiveTab(newActiveTab)
    const path = reconstructed_tabs[newActiveTab].path
    localStorage.setItem("active_file", path)
  }

  const openFile = async (filePath: string) => {
    localStorage.setItem("active_file", filePath)
    const newTabs = { ...tabs }
    const active_tab_index = activeTab | 0
    newTabs[active_tab_index] = {
      path: filePath,
    }
    setTabs(newTabs)
  }

  const saveFile = async (data: any, path: string) => {
    try {
      await invoke("file:save", {
        file_path: path,
        file_content: JSON.stringify(data),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const savePdfFile = async (data: any, path: string) => {
    try {
      await invoke("file:save-pdf", {
        file_path: path,
        file_content: data,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const openFolder = useCallback(
    async (folderPath: string, reset?: boolean) => {
      try {
        const openedWorkspace: WorkspaceType = await invoke("folder:open", {
          folder_path: folderPath,
        })
        if (reset) resetWorkspace()
        localStorage.setItem("workspace_path", openedWorkspace.path)
        setWorkspace(openedWorkspace)
      } catch (err) {
        console.log(err)
      }
    },
    [],
  )

  const importBackground = async () => {
    const workspacePath = localStorage.getItem("workspace_path")
    if (!workspacePath) return
    const newBackgroundPath = await invoke("file:import-background", {
      workspace_path: workspacePath,
    })

    setBackgrounds([...backgrounds, newBackgroundPath])
  }

  const getImportedBackground = async () => {
    const workspacePath = localStorage.getItem("workspace_path")
    if (!workspacePath) return
    const backgroundPaths = await invoke("file:get-imported-background", {
      workspace_path: workspacePath,
    })

    setBackgrounds(backgroundPaths)
  }

  const deleteImportedBackground = async (backgroundPath: string) => {
    const workspacePath = localStorage.getItem("workspace_path")
    if (!workspacePath) return
    await invoke("file:delete-imported-background", {
      workspace_path: workspacePath,
      background_path: backgroundPath,
    })

    const newBackgrounds = backgrounds.filter(
      (background) => background !== backgroundPath,
    )
    setBackgrounds(newBackgrounds)
  }

  const handleOpenedWorkspace = useCallback(async () => {
    const workspacePath = localStorage.getItem("workspace_path")
    if (workspacePath) {
      openFolder(workspacePath)
    }
    setIsLoaded(true)
    getImportedBackground()
  }, [openFolder])

  const makeNewFile = async (fileName: string, folder_path: string) => {
    try {
      let new_folder_path = ""
      const workspacePath = localStorage.getItem("workspace_path")

      if (!folder_path) new_folder_path = workspacePath || ""
      else new_folder_path = folder_path

      await invoke("file:new", {
        folder: new_folder_path,
        file_name: fileName,
      })

      handleOpenedWorkspace()
      openFile(`${new_folder_path}\\${fileName}`)
      return true
    } catch (err) {
      return false
    }
  }

  const makeNewFolder = async (folderName: string, folder_path: string) => {
    try {
      let new_folder_path = ""
      const workspacePath = localStorage.getItem("workspace_path")

      if (!folder_path) new_folder_path = workspacePath || ""
      else new_folder_path = folder_path

      await invoke("folder:new", {
        folder: new_folder_path,
        folder_name: folderName,
      })

      handleOpenedWorkspace()
      setActiveFolder(`${new_folder_path}\\${folderName}`)
      return true
    } catch (err) {
      return false
    }
  }

  const resetActiveTab = () => {
    const active_tab = tabs[activeTab]
    active_tab["path"] = "New Tab"
    const newTabs = { ...tabs }
    newTabs[activeTab] = active_tab
    setTabs(newTabs)
  }

  const deleteFile = async (filePath: string) => {
    try {
      await invoke("file:delete", {
        file_path: filePath,
      })
      handleOpenedWorkspace()
      const activeFile = localStorage.getItem("active_file")
      if (activeFile === filePath) {
        localStorage.setItem("active_file", "")
        resetActiveTab()
      }
      return true
    } catch (err) {
      return false
    }
  }

  const deleteFolder = async (folderPath: string) => {
    try {
      await invoke("folder:delete", {
        folder_path: folderPath,
      })
      handleOpenedWorkspace()
      if (activeFolder === folderPath) setActiveFolder(undefined)
      const active_file = localStorage.getItem("active_file")
      if (active_file?.includes(folderPath)) {
        localStorage.setItem("active_file", "")
        resetActiveTab()
      }

      return true
    } catch (err) {
      return false
    }
  }

  const renameFile = async (oldPath: string, newPath: string) => {
    try {
      await invoke("file:rename", {
        old_path: oldPath,
        new_path: newPath,
      })
      handleOpenedWorkspace()
      const activeFile = localStorage.getItem("active_file")
      if (activeFile === oldPath) {
        openFile(newPath)
      }
      return true
    } catch (err) {
      return false
    }
  }

  const renameFolder = async (oldPath: string, newPath: string) => {
    try {
      await invoke("folder:rename", {
        old_path: oldPath,
        new_path: newPath,
      })
      handleOpenedWorkspace()
      if (activeFolder === oldPath) {
        setActiveFolder(newPath)
      }

      return true
    } catch (err) {
      return false
    }
  }

  const rename = async (oldPath: string, newPath: string, type: string) => {
    if (type === "file") {
      return renameFile(oldPath, newPath)
    } else {
      return renameFolder(oldPath, newPath)
    }
  }

  const split = async (filePath: string) => {
    try {
      localStorage.setItem("splitted_active_file", filePath)

      const newTabs = { ...tabs }
      const tab = newTabs[activeTab]

      tab.splittedPath = filePath

      setTabs(newTabs)
    } catch (error) {
      console.error(error)
    }
  }

  const checkVersion = async () => {
    const version = localStorage.getItem("version")
    if (!version) {
      localStorage.setItem("version", APP_VERSION)
    } else {
      if (version !== APP_VERSION) {
        setNewVersion(true)
      }
    }
  }

  const openWorkspaceFile = async () => {
    const workspacePath = localStorage.getItem("workspace_path")
    const workspaceName = workspacePath?.split("\\").pop()

    const openedFile = await invoke("file:open-workspace-file", {
      name: workspaceName,
      workspace_path: workspacePath,
    })

    openFile(openedFile["filePath"])
  }

  useEffect(() => {
    handleOpenedWorkspace()
    localStorage.setItem("open_files", JSON.stringify([]))
    checkVersion()
  }, [handleOpenedWorkspace])

  const value: WorkspaceTypeContext = {
    openWorkspace,
    workspace,
    openFile,
    saveFile,
    isLoaded,
    addTab,
    activeTab,
    handleChangeTab,
    tabs,
    setTabs,
    removeTab,
    showSidebar,
    setShowSidebar,
    setShowOpenFileInTab,
    showOpenFileInTab,
    setShowOpenNewFile,
    showOpenNewFile,
    openFileInNewTab,
    makeNewFile,
    setActiveFolder,
    activeFolder,
    makeNewFolder,
    deleteFile,
    deleteFolder,
    rename,
    setShowSwitcher,
    showSwitcher,
    openFolder,
    closeWorkspace,
    savePdfFile,
    split,
    readFile,
    importBackground,
    backgrounds,
    deleteImportedBackground,
    newVersion,
    setNewVersion,
    openWorkspaceFile,
    setShowConfetti,
    showConfetti,
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
