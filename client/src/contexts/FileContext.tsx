import { createContext, useContext,useEffect,useState } from "react"
import { FileTypeContext, MyWindow, FileType, BooleanObject, StringObject, StringNullObject} from "types"

const FileContext = createContext<FileTypeContext>({} as FileTypeContext)

export function useFile(){
  return useContext(FileContext)
}

type Props = {
  children: React.ReactNode
}

declare let window: MyWindow


export const FileProvider:React.FC<Props> =  ({ children }: Props) => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [tabs, setTabs] = useState<number[]>([0])
  const [file_path, setFile_path] = useState<StringNullObject>({0 : null})
  const [file_content, setFile_content] = useState<StringObject>({0 : ""})
  const [file_name, setFile_name] = useState<StringObject>({0 : "Untitled"})
  const [saved, setSaved] = useState<BooleanObject>({0 : true})
  const [new_file, setNew_file] = useState<BooleanObject>({0 : true})
  const ipcRenderer =  window.myApp.getIpcRenderer()

  const reconstructMap = (map: any) => {
    // Get the keys from the original map
    let keys = Object.keys(map).map(Number)

    // Sort the keys
    keys.sort((a, b) => a - b)

    // Create a new map with consecutive keys starting from 1
    let newMap: any = {}
    keys.forEach((key, index) => {
      newMap[index] = map[key]
    })
    return newMap
  }

  const reconstructArray = (n: number) => {
    const newArray: number[] = []
    for (let i = 0; i < n; i++) {
      newArray.push(i)
    }
    return newArray
  }


  const removeTab = (index: number) => {
    const newTabs = reconstructArray(tabs.length - 1)
    setTabs(newTabs)

    const newFile_path = {...file_path}
    delete newFile_path[index]
    setFile_path(reconstructMap(newFile_path))

    const newFile_content = {...file_content}
    delete newFile_content[index]
    setFile_content(reconstructMap(newFile_content))

    const newFile_name = {...file_name}
    delete newFile_name[index]
    setFile_name(reconstructMap(newFile_name))

    const newSaved = {...saved}
    delete newSaved[index]
    setSaved(reconstructMap(newSaved))

    const newFile = {...new_file}
    delete newFile[index]
    setNew_file(reconstructMap(newFile))

   
    setCurrentTab(index - 1)
  }

  const addTab = () => {
    const newTabNumber = tabs.length 
    setCurrentTab(newTabNumber)

    const newTabs = [...tabs]
    newTabs.push(newTabNumber)
    setTabs(newTabs)

    const newFile_path = {...file_path}
    newFile_path[newTabNumber] = null
    setFile_path(newFile_path)

    const newFile_name = {...file_name}
    newFile_name[newTabNumber] = "Untitled"
    setFile_name(newFile_name)

    const newFile_content = {...file_content}
    newFile_content[newTabNumber] = ""
    setFile_content(newFile_content)

    const newSaved = {...saved}
    newSaved[newTabNumber] = true
    setSaved(newSaved)

    const newFile = {...new_file}
    newFile[newTabNumber] = true
    setNew_file(newFile)
  }

  const SaveFile = () => {
    try{
      ipcRenderer.invoke("saveFile", { file_path: file_path[currentTab], file_content: file_content[currentTab] })
      .then((res: FileType) => {
        if(res.toString() !== "success"){
          const newSaved = {...saved}
          newSaved[currentTab] = true
          setSaved(newSaved)
          
          const newFile_path = {...file_path}
          newFile_path[currentTab] = res.filePath
          setFile_path(newFile_path)

          const newFile_name = {...file_name}
          newFile_name[currentTab] = res.fileName
          setFile_name(newFile_name)
        } else{
          const newSaved = {...saved}
          newSaved[currentTab] = true
          setSaved(newSaved)
        }
      })
    }
    catch(err){
      console.log(err)
    }
  }

  const openFileInTab = async (openFiled: FileType) => {
    const newFile_path = {...file_path}
    newFile_path[currentTab] = openFiled.filePath
    setFile_path(newFile_path)

    const newFile_name = {...file_name}
    newFile_name[currentTab] = openFiled.fileName
    setFile_name(newFile_name)

    const newSaved = {...saved}
    newSaved[currentTab] = true
    setSaved(newSaved)

    const newFile_content = {...file_content}
    newFile_content[currentTab] = openFiled.content
    setFile_content(newFile_content)
  }

  const openFileInNewTab = async (openFiled: FileType) => {
    const newTabNumber = tabs.length 
    setCurrentTab(newTabNumber)

    const newTabs = [...tabs]
    newTabs.push(newTabNumber)
    setTabs(newTabs)

    const newFile_content = {...file_content}
    newFile_content[newTabNumber] = openFiled.content
    setFile_content(newFile_content)

    const newFile_path = {...file_path}
    newFile_path[newTabNumber] = openFiled.filePath
    setFile_path(newFile_path)

    const newFile_name = {...file_name}
    newFile_name[newTabNumber] = openFiled.fileName
    setFile_name(newFile_name)

    const newSaved = {...saved}
    newSaved[newTabNumber] = true
    setSaved(newSaved)
  }

  const OpenFile = async () => {
    try {
      const openFiled: FileType = await ipcRenderer.invoke("dialog:openFile")

      if (!saved[currentTab]) return await openFileInNewTab(openFiled)
      else openFileInTab(openFiled)
    } catch (err) {
      console.log(err)
    }
  }

  const NewFileInNewTab = () => {
    const newTabNumber = tabs.length 
    setCurrentTab(newTabNumber)

    const newTabs = [...tabs]
    newTabs.push(newTabNumber)
    setTabs(newTabs)

    const newFile_content = {...file_content}
    newFile_content[newTabNumber] = ""
    setFile_content(newFile_content)

    const newFile_path = {...file_path}
    newFile_path[newTabNumber] = null
    setFile_path(newFile_path)

    const newFile_name = {...file_name}
    newFile_name[newTabNumber] = "Untitled"
    setFile_name(newFile_name)

    const newSaved = {...saved}
    newSaved[newTabNumber] = true
    setSaved(newSaved)
  }

  const NewFile = () => {
    if (!saved[currentTab]) return NewFileInNewTab()

    const newSaved = {...saved}
    newSaved[currentTab] = true
    setSaved(newSaved)

    const newFile_content = {...file_content}
    newFile_content[currentTab] = ""
    setFile_content(newFile_content)

    const newFile_path = {...file_path}
    newFile_path[currentTab] = null
    setFile_path(newFile_path)

    const newFile_name = {...file_name}
    newFile_name[currentTab] = "Untitled"
    setFile_name(newFile_name)

    const newFile = {...new_file}
    newFile[currentTab] = true
    setNew_file(newFile)
  }

  useEffect(() => {
    if (currentTab === -1) setCurrentTab(0)
  },[currentTab])

  const value: FileTypeContext = {
    file_path,
    setFile_path,
    file_content,
    setFile_content,
    file_name,
    setFile_name,
    SaveFile,
    saved,
    setSaved,
    NewFile,
    setNew_file,
    new_file,
    OpenFile,
    currentTab,
    setCurrentTab,
    addTab,
    tabs,
    removeTab
  }

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  )
}

