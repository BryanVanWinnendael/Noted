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
    undefined
  )
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [tabs, setTabs] = useState<Tab>({} as Tab)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const [openFileInTab, setOpenFileInTab] = useState<boolean>(false)

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
        saved: true
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
      localStorage.setItem("workspace_path", openedWorkspace.path)
      setWorkspace(openedWorkspace)
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
      saved: true
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
      saved: true
    }
    openInTab(newTabs, newTabId, "", undefined)
  }

  const removeTab = async (index: number) => {
    const newTabs = { ...tabs }
    delete newTabs[index]
    const reconstructed_tabs = reconstructTabs(newTabs)
    setTabs(reconstructed_tabs)
    const newActiveTab = index === 0 ?  0 : Object.keys(reconstructed_tabs).length - 1
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

  const handleOpenedWorkspace = useCallback(async () => {
    const workspacePath = localStorage.getItem("workspace_path")
    if (workspacePath) {
      try {
        const openedWorkspace: WorkspaceType = await ipcRenderer.invoke(
          "folder:open",
          { folder_path: workspacePath },
        )
        setWorkspace(openedWorkspace)
      } catch (err) {
        console.log(err)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    handleOpenedWorkspace()
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
    setOpenFileInTab,
    openFileInTab,
    openFileInNewTab
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
