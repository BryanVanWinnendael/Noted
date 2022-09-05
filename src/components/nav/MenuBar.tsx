import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useFile } from '../../contexts/FileContext'
import { MyWindow, FileType, FileTypeContext } from '../../types/index'

declare let window: MyWindow

const MenuBar = () => {
  const ipcRenderer =  window.myApp.getIpcRenderer()
  const { OpenFile, SaveFile, NewFile } = useFile() as FileTypeContext

  const clickOpenTools = () => {
    ipcRenderer.invoke("dialog:openTools")
  }

  return (
    <Menu as="div" className="flex bg-transparent">
      <Menu.Button className="inline-flex justify-center w-full ml-2 focus:outline-none ">
        <svg className='w-5 h-5 cursor-pointer'viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
          />
        </svg>
      </Menu.Button>
        
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-0 mt-6 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">

            <Menu.Item>
                <div
                  onClick={OpenFile}
                  className="flex px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <p className='w-full'>
                  Open File
                  </p>
                  <div className='w-full flex justify-end text-gray-600 mr-5'>
                    <p>
                      Ctrl + O
                    </p>
                  </div>
                </div>
              </Menu.Item>

              <Menu.Item>
                <div
                  onClick={SaveFile}
                  className="flex px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <p className='w-full'>
                  Save File
                  </p>
                  <div className='w-full flex justify-end text-gray-600 mr-5'>
                    <p>
                      Ctrl + S
                    </p>
                  </div>
                </div>
              </Menu.Item>
                
              <Menu.Item>
                <div
                  onClick={NewFile}
                  className="flex px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <p className='w-full'>
                  New File
                  </p>
                  <div className='w-full flex justify-end text-gray-600 mr-5'>
                    <p>
                      Ctrl + N
                    </p>
                  </div>
                </div>
              </Menu.Item>

              {/* <Menu.Item>
                <div
                  onClick={clickOpenTools}
                  className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Dev Tools
                </div>
              </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuBar