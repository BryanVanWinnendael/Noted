import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  WorkspaceTypeContext,
  MyWindow,
  WorkspaceType,
  ActiveFile,
  Tab,
} from "types"

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

const ipcRenderer = window.myApp.getIpcRenderer()

export const WorkspaceProvider: React.FC<Props> = ({ children }: Props) => {
  const [workspace, setWorkspace] = useState<WorkspaceType | undefined>()
  const [activeFile, setActiveFile] = useState<ActiveFile | undefined>(
    undefined,
  )
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [tabs, setTabs] = useState<Tab>({} as Tab)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const [showOpenFileInTab, setShowOpenFileInTab] = useState<boolean>(false)
  const [showOpenNewFile, setShowOpenNewFile] = useState<boolean>(false)
  const [activeFolder, setActiveFolder] = useState<string | undefined>()
  const [showSwitcher, setShowSwitcher] = useState<boolean>(false)

  const resetWorkspace = () => {
    setWorkspace(undefined)
    setActiveFile(undefined)
    setTabs({})
    setActiveTab(0)
    setShowSidebar(true)
    setShowOpenNewFile(false)
    setShowOpenFileInTab(false)
    setActiveFolder(undefined)
    setShowSwitcher(false)
    localStorage.setItem("active_file", "")
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

  const readFile = async (filePath: string) => {
    try {
      const openedFile = await ipcRenderer.invoke("file:open", {
        file_path: filePath,
      })
      const json_content = openedFile["fileContent"]
      let content = ""
      if (json_content) {
        content = JSON.parse(json_content)
      }
      const file = {
        path: filePath,
        data: content,
      }
      return file
    } catch (err) {
      return undefined
    }
  }

  const openWorkspace = async () => {
    try {
      const openedWorkspace: WorkspaceType =
        await ipcRenderer.invoke("folder:open-dialog")
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

  const openInTab = async (
    newTabs: Tab,
    index: number,
    file_path: string,
    file: ActiveFile | undefined,
  ) => {
    setTabs(newTabs)
    setActiveTab(index)
    setActiveFile(file)
    localStorage.setItem("active_file", file_path)
    localStorage.setItem("active_tab", index.toString())
  }

  const openFileInNewTab = async (filePath: string) => {
    const newTabs = { ...tabs }
    const newTabId = Object.keys(tabs).length
    newTabs[newTabId] = {
      path: filePath,
    }
    const file = await readFile(filePath)
    openInTab(newTabs, newTabId, filePath, file)
  }

  const handleChangeTab = async (index: number) => {
    const filePath = tabs[index].path
    const file = await readFile(filePath)
    const newTabs = { ...tabs }
    newTabs[index] = file || tabs[index]
    openInTab(newTabs, index, filePath, file)
  }

  const addTab = () => {
    const newTabs = { ...tabs }
    const newTabId = Object.keys(tabs).length
    newTabs[newTabId] = {
      path: "New tab",
    }
    openInTab(newTabs, newTabId, "", undefined)
  }

  const removeTab = async (index: number) => {
    const newTabs = { ...tabs }
    delete newTabs[index]
    const reconstructed_tabs = reconstructTabs(newTabs)
    setTabs(reconstructed_tabs)
    const newActiveTab =
      index === 0 ? 0 : Object.keys(reconstructed_tabs).length - 1
    setActiveTab(newActiveTab)
    const file_path = reconstructed_tabs[newActiveTab].path
    const file = await readFile(file_path)
    openInTab(reconstructed_tabs, newActiveTab, file_path, file)
  }

  const openFile = async (filePath: string) => {
    const file = await readFile(filePath)
    if (!file) return
    const newTabs = { ...tabs }
    const active_tab_index = activeTab | 0
    newTabs[active_tab_index] = file
    openInTab(newTabs, active_tab_index, filePath, file)
  }

  const saveFile = async (data: any, path: string) => {
    try {
      await ipcRenderer.invoke("file:save", {
        file_path: path,
        file_content: JSON.stringify(data),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const openFolder = useCallback(
    async (folderPath: string, reset?: boolean) => {
      try {
        const openedWorkspace: WorkspaceType = await ipcRenderer.invoke(
          "folder:open",
          { folder_path: folderPath },
        )
        if (reset) resetWorkspace()
        localStorage.setItem("workspace_path", openedWorkspace.path)
        setWorkspace(openedWorkspace)
      } catch (err) {
        console.log(err)
      }
    },
    [],
  )

  const handleOpenedWorkspace = useCallback(async () => {
    const workspacePath = localStorage.getItem("workspace_path")
    if (workspacePath) {
      openFolder(workspacePath)
    }
    setIsLoaded(true)
  }, [openFolder])

  const makeNewFile = async (fileName: string, folder_path: string) => {
    try {
      let new_folder_path = ""
      const workspacePath = localStorage.getItem("workspace_path")

      if (!folder_path) new_folder_path = workspacePath || ""
      else new_folder_path = folder_path

      await ipcRenderer.invoke("file:new", {
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

      await ipcRenderer.invoke("folder:new", {
        folder: new_folder_path,
        folder_name: folderName,
      })

      handleOpenedWorkspace()
      setActiveFolder(`${new_folder_path}\\${folderName}`)
      setActiveFile(undefined)
      return true
    } catch (err) {
      return false
    }
  }

  const getTabIndexFromDeletedFile = (filePath: string) => {
    let index = 0
    Object.keys(tabs).forEach((key: any) => {
      if (tabs[key].path === filePath) {
        index = parseInt(key)
      }
    })
    return index
  }

  const resetActiveTab = () => {
    const active_tab = tabs[activeTab]
    active_tab["path"] = "New Tab"
    setActiveFile(undefined)
  }

  const deleteFile = async (filePath: string) => {
    try {
      await ipcRenderer.invoke("file:delete", {
        file_path: filePath,
      })
      handleOpenedWorkspace()
      if (activeFile?.path === filePath) {
        resetActiveTab()
      } else {
        const index = getTabIndexFromDeletedFile(filePath)
        removeTab(index)
      }
      return true
    } catch (err) {
      return false
    }
  }

  const deleteFolder = async (folderPath: string) => {
    try {
      await ipcRenderer.invoke("folder:delete", {
        folder_path: folderPath,
      })
      handleOpenedWorkspace()
      setActiveFolder(undefined)
      setActiveFile(undefined)
      return true
    } catch (err) {
      return false
    }
  }

  const renameFile = async (oldPath: string, newPath: string) => {
    try {
      await ipcRenderer.invoke("file:rename", {
        old_path: oldPath,
        new_path: newPath,
      })
      handleOpenedWorkspace()

      if (activeFile?.path === oldPath) {
        openFile(newPath)
      }
      return true
    } catch (err) {
      return false
    }
  }

  const renameFolder = async (oldPath: string, newPath: string) => {
    try {
      await ipcRenderer.invoke("folder:rename", {
        old_path: oldPath,
        new_path: newPath,
      })
      handleOpenedWorkspace()
      if (activeFolder === oldPath) {
        setActiveFile(undefined)
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

  useEffect(() => {
    handleOpenedWorkspace()
    localStorage.setItem("open_files", JSON.stringify([]))
  }, [handleOpenedWorkspace])

  const value: WorkspaceTypeContext = {
    openWorkspace,
    workspace,
    openFile,
    activeFile,
    saveFile,
    isLoaded,
    addTab,
    activeTab,
    handleChangeTab,
    tabs,
    setTabs,
    setActiveFile,
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
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
