import React from 'react'
import MenuBar from './MenuBar'
import { useFile } from '../../contexts/FileContext'
import { MyWindow, FileTypeContext } from '../../types/index'
import { SkeletonCircle } from '@chakra-ui/react'

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
        <nav className='w-full h-8 fixed flex justify-between items-center bg-transparent z-50'>
        
            <div className='w-32 flex items-end'>
                <MenuBar/>
            </div>

            <div className='nav w-full flex justify-center text-gray-600 items-center'>
                {!saved && <SkeletonCircle size='3' marginRight={2} />}
                {file_name? file_name : "Untitled"}
            </div>

            <div className='flex w-32'>
                <div className='w-12 flex justify-center hover:bg-gray-300 cursor-pointer items-center p-2' onClick={clickedMinimize}>
                    <svg className='w-5 h-5' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14 8v1H3V8h11z"/></svg>
                </div>
                <div className='w-12 flex justify-center hover:bg-gray-300 cursor-pointer items-center p-2' onClick={clickedMaximize}>
                    <svg className='w-5 h-5' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 3C3.67157 3 3 3.67157 3 4.5V11.5C3 12.3284 3.67157 13 4.5 13H11.5C12.3284 13 13 12.3284 13 11.5V4.5C13 3.67157 12.3284 3 11.5 3H4.5ZM4.5 4H11.5C11.7761 4 12 4.22386 12 4.5V11.5C12 11.7761 11.7761 12 11.5 12H4.5C4.22386 12 4 11.7761 4 11.5V4.5C4 4.22386 4.22386 4 4.5 4Z" fill="#212121"/></svg>
                </div>
                <div className='w-12 flex justify-center hover:bg-red-500 cursor-pointer items-center p-2' onClick={clickedClose}>
                    <svg className='w-5 h-5' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"/></svg>
                </div>
            </div>
        </nav>
    )
}

export default Navbar