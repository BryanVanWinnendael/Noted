import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { useFile } from "contexts/FileContext"
import { useSettings } from "contexts/SettingsContext"
import { Box, useColorModeValue } from "@chakra-ui/react"
import { getStyle } from "styling"
import { utils } from "utils"

const MenuBar = () => {
  const { OpenFile, SaveFile, NewFile } = useFile()
  const { onOpen } = useSettings()

  const bg_color_chakra = useColorModeValue("#ffff", "#1a202c")
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra
  
  const accent_color = getStyle()?.accentColor || "#6488ea"

  const borderColor = useColorModeValue("border-gray-500", "border-gray-100")


  return (
    <Menu as="div" className="flex">
      <Menu.Button className="inline-flex justify-center w-full ml-2 focus:outline-none">
        <Box _hover={{fill: accent_color}} fill="gray">
          <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"/></svg>
        </Box>
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
         <Menu.Items className={`z-[90] origin-top-left absolute left-2 top-5 mt-6 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-opacity-20 ${borderColor}`}>
          <Box bg={bg_color} className="py-1">
            <Menu.Item>
              <Box
                _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }}
                onClick={OpenFile}
                color={utils.getTextColor(bg_color)}
                className={`flex px-4 py-2 text-sm cursor-pointer text-gray-700`}
              >
                  <p className="w-full">
                  Open File
                  </p>
                  <Box color={utils.getMutedTextColor(utils.getTextColor(bg_color))} className={`w-full flex justify-end mr-5`}>
                    <p>
                      Ctrl + O
                    </p>
                  </Box>
                </Box>
            </Menu.Item>

            <Menu.Item>
              <Box
                _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }}
                onClick={SaveFile}
                color={utils.getTextColor(bg_color)}
                className={`flex px-4 py-2 text-sm cursor-pointer text-gray-700`}
              >
                <p className="w-full">
                Save File
                </p>
                <Box color={utils.getMutedTextColor(utils.getTextColor(bg_color))} className={`w-full flex justify-end mr-5`}>
                  <p>
                    Ctrl + S
                  </p>
                </Box>
              </Box>
            </Menu.Item>
                
              <Menu.Item>
                <Box
                  _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }}
                  onClick={NewFile}
                  color={utils.getTextColor(bg_color)}
                  className={`flex px-4 py-2 text-sm cursor-pointer text-gray-700`}
                >
                  <p className="w-full">
                  New File
                  </p>
                  <Box color={utils.getMutedTextColor(utils.getTextColor(bg_color))} className={`w-full flex justify-end mr-5`}>
                    <p>
                      Ctrl + N
                    </p>
                  </Box>
                </Box>
              </Menu.Item>
              <Menu.Item>
                <Box
                  _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }}
                  onClick={onOpen}
                  color={utils.getTextColor(bg_color)}
                  className={`flex px-4 py-2 text-sm cursor-pointer text-gray-700`}
                >
                  <p className="w-full">
                    Settings
                  </p>
                </Box>
              </Menu.Item>
          </Box>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default MenuBar