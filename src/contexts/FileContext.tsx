import React, { useContext,useState } from "react"
import { FileTypeContext, MyWindow, FileType } from '../types/index'

const FileContext = React.createContext<FileTypeContext | null>(null)

export function useFile(){
    return useContext(FileContext)
}

type Props = {
    children: React.ReactNode;
}

declare let window: MyWindow

export const FileProvider:React.FC<Props> =  ({ children }: Props) => {
    const [file_path, setFile_path] = useState<string | null>(null)
    const [file_content, setFile_content] = useState<string>("")
    const [file_name, setFile_name] = useState<string>("")
    const [saved, setSaved] = useState<boolean>(true)
    const [new_file, setNew_file] = useState<boolean>(false)
    const ipcRenderer =  window.myApp.getIpcRenderer()

    const SaveFile = () => {
        try{
            ipcRenderer.invoke("saveFile", { file_path: file_path, file_content: file_content })
            .then((res: FileType) => {
                setSaved(true)
                if(res.toString() !== 'success'){
                    setFile_path(res.filePath)
                    setFile_name(res.fileName)
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const OpenFile = async () => {
        const openFiled: FileType = await ipcRenderer.invoke("dialog:openFile")
        setFile_path(openFiled.filePath)
        setFile_content(openFiled.content)
        setFile_name(openFiled.fileName)
        setSaved(true)
    }

    const NewFile = () => {
        setSaved(true)
        setFile_path(null)
        setFile_content("")
        setFile_name("Untitled")
        setNew_file(true)
    }

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
        OpenFile
    }

    return (
        <FileContext.Provider value={value}>
            {children}
        </FileContext.Provider>
    )
}

