import MenuBar from "./MenuBar"
import { useFile } from "contexts/FileContext"
import { MyWindow, FileTypeContext } from "types/index"
import { SkeletonCircle } from "@chakra-ui/react"

declare let window: MyWindow

const Navbar = () => {
    const ipcRenderer = window.myApp.getIpcRenderer()
    const { file_name, saved  } = useFile() as FileTypeContext
    
    const clickedClose = () => {
        ipcRenderer.invoke("close-window", saved, file_name)
    }

    const clickedMinimize = () => {
        ipcRenderer.invoke("minimize-window")
    }

    const clickedMaximize = () => {
        ipcRenderer.invoke("maximize-window")
    }

    return (
        <nav className="w-full h-8 fixed flex justify-between items-center bg-transparent z-50">
        
            <div className="w-32 flex items-end">
                <MenuBar />
            </div>

            <div className="nav w-full flex justify-center text-gray-600 items-center">
                {!saved && <SkeletonCircle size="3" marginRight={2} />}
                {file_name? file_name : "Untitled"}
            </div>

            <div className="flex w-32 items-center">
                <svg onClick={clickedMinimize} className="w-5 h-5 m-2 hover:fill-CornflowerBlue cursor-pointer" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M3 11h18v2H3z"/></g></svg>
                <svg onClick={clickedMaximize} className="w-5 h-5 hover:stroke-CornflowerBlue m-2 cursor-pointer" stroke="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20H4m0 0v-4m0 4 6-6m6-10h4m0 0v4m0-4-6 6"/></svg>
                <svg onClick={clickedClose} className="w-4 h-4 m-2 hover:fill-CornflowerBlue cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" fill="gray"><path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z"/></svg>
            </div>
        </nav>
    )
}

export default Navbar