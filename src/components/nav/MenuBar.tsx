import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { useFile } from "contexts/FileContext"
import { useScreen } from "contexts/SettingsScreenContext"
import { FileTypeContext } from "types/index"
import { useColorModeValue } from "@chakra-ui/react"

const MenuBar = () => {
  const { OpenFile, SaveFile, NewFile } = useFile() as FileTypeContext
  const { onOpen } = useScreen()

  const bg_color = useColorModeValue("bg-white", "bg-darkMode")
  const text_color = useColorModeValue("text-gray-700", "text-gray-300")
  const bg_color_hover = useColorModeValue("hover:bg-gray-100", "hover:bg-darkModeHover")
  const text_color_hover = useColorModeValue("hover:text-gray-900", "hover:text-gray-300")
  const text_color_muted = useColorModeValue("text-gray-400", "text-gray-600")

  return (
    <Menu as="div" className="flex">
      <Menu.Button className="inline-flex justify-center w-full ml-2 focus:outline-none">
        <svg className="w-5 h-5 cursor-pointer hover:fill-CornflowerBlue" fill="gray" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"/></svg>
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
        <Menu.Items className={`${bg_color} origin-top-left absolute left-0 mt-6 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="py-1">
            <Menu.Item>
                <div
                  onClick={OpenFile}
                  className={`${text_color} flex px-4 py-2 text-sm cursor-pointer text-gray-700 ${bg_color_hover} ${text_color_hover}`}
                >
                  <p className="w-full">
                  Open File
                  </p>
                  <div className={`w-full flex justify-end ${text_color_muted} mr-5`}>
                    <p>
                      Ctrl + O
                    </p>
                  </div>
                </div>
              </Menu.Item>

              <Menu.Item>
                <div
                  onClick={SaveFile}
                  className={`${text_color} flex px-4 py-2 text-sm cursor-pointer text-gray-700 ${bg_color_hover} ${text_color_hover}`}
                >
                  <p className="w-full">
                  Save File
                  </p>
                  <div className={`w-full flex justify-end ${text_color_muted} mr-5`}>
                    <p>
                      Ctrl + S
                    </p>
                  </div>
                </div>
              </Menu.Item>
                
              <Menu.Item>
                <div
                  onClick={NewFile}
                  className={`${text_color} flex px-4 py-2 text-sm cursor-pointer text-gray-700 ${bg_color_hover} ${text_color_hover}`}
                >
                  <p className="w-full">
                  New File
                  </p>
                  <div className={`w-full flex justify-end ${text_color_muted} mr-5`}>
                    <p>
                      Ctrl + N
                    </p>
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={onOpen}
                  className={`${text_color} flex px-4 py-2 text-sm cursor-pointer text-gray-700 ${bg_color_hover} ${text_color_hover}`}
                >
                  <p className="w-full">
                    Settings
                  </p>
                </div>
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuBar