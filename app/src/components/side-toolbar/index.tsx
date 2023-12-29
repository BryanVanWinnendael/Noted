import React, {Fragment, useEffect, useState} from "react"
import {
  Box,
  useColorModeValue
  } from "@chakra-ui/react"
import { Menu, Transition } from "@headlessui/react"
import { RichUtils } from "draft-js"
import { AddIcon } from "@chakra-ui/icons"
import { getStyle } from "styling"
import { utils } from "utils"
import { useEditor } from "contexts/EditorContext"


type Props = {
  setOpenImage: (openImage: boolean) => void
}

const SideToolbar:React.FC<Props> = ({ setOpenImage }: Props) => {
  const { setEditor, editor } = useEditor()
  const [positionOffset, setPositionOffset] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)

  const icon_color_chakra =  useColorModeValue("black", "white")
  const icon_color =  getStyle()?.iconColor || icon_color_chakra

  const bg_color_chakra = useColorModeValue("#fff", "#1a202c")
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra

  const text_color_chakra = useColorModeValue("text-gray-700", "text-gray-300")
  const text_color = getStyle()?.textColor || text_color_chakra
  
  const text_color_hover_chakra = useColorModeValue("hover:text-gray-900", "hover:text-gray-300")
  const text_color_hover = getStyle()?.textColor || text_color_hover_chakra

  const borderColor = useColorModeValue("border-gray-500", "border-gray-100")

  const accent_color = getStyle()?.accentColor || "#6488ea"


  const getSelectedBlockNode = (root: any) => {
    const selection = root.getSelection()
    if (selection.rangeCount === 0) {
      return null
    }
    let node = selection.getRangeAt(0).startContainer
    do {
      if (node.getAttribute && node.getAttribute("data-block") === "true") {
        return node
      }
      node = node.parentNode
    } while (node !== null)
    return null
  }

  const setBlockType = (blockType: string) => {
    const newEditorState = RichUtils.toggleBlockType(editor, blockType)
    setEditor(newEditorState)
  }

  useEffect(() => {
    const node = getSelectedBlockNode(window)

    if (node) setPositionOffset(node.offsetTop)
      
    const currentContent = editor.getCurrentContent()
    const selection = editor.getSelection()
    const currentBlock: any = currentContent.getBlockForKey(selection.getStartKey())

    if(currentBlock.text !== "") {
      setVisible(false)
    } else {
      setVisible(true)
    }

    if(localStorage.getItem("sidetoolbar") === "false") setVisible(false)
  }, [editor])
  return (
    <>
      {
        visible && (
          <Box marginLeft={-7} top={90 + positionOffset} position="absolute">
            <Menu>
              <Menu.Button className="justify-center w-full focus:outline-none" color="#718096" aria-label="Options">
                <AddIcon _hover={{ color: accent_color}} />
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
                <Menu.Items className={`${bg_color} left-2 absolute w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-[1px] border-opacity-20 ${borderColor}`}>
                  <Menu.Item >
                    <Box 
                      color={text_color}
                      className={`${text_color} flex gap-2 items-center px-4 py-2 text-sm cursor-pointer text-gray-700 ${text_color_hover}`}
                      _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
                      onClick={() => {setOpenImage(true)}}
                    >
                      <svg fill={icon_color} width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"/></svg>
                      <p className="w-full text-lg">Image</p>
                    </Box>
                  </Menu.Item>

                  <Menu.Item >
                    <Box 
                      color={text_color}
                      className={`${text_color} flex gap-2 items-center px-4 py-2 text-sm cursor-pointer text-gray-700 ${text_color_hover}`}
                      _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
                      onClick={() => { setBlockType("header-one") }}
                    >
                      <svg fill={icon_color} width="24px" height="24px" viewBox="-5 -7 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-1"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm9.52.779H10V3h3.36v7h-1.84V4.779z" /></svg>
                      <p className="w-full text-lg">Header one</p>
                    </Box>
                  </Menu.Item>

                  <Menu.Item >
                    <Box 
                      color={text_color}
                      className={`${text_color} flex gap-2 items-center px-4 py-2 text-sm cursor-pointer text-gray-700 ${text_color_hover}`}
                      _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
                      onClick={() => { setBlockType("header-two") }}
                    >
                      <svg fill={icon_color} width="24px" height="24px" viewBox="-4.5 -7 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-2"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.88 4.352V10H10V8.986l.1-.246 1.785-1.913c.43-.435.793-.77.923-1.011.124-.23.182-.427.182-.587 0-.14-.04-.242-.127-.327a.469.469 0 0 0-.351-.127.443.443 0 0 0-.355.158c-.105.117-.165.288-.173.525l-.012.338h-1.824l.016-.366c.034-.735.272-1.33.718-1.77.446-.44 1.02-.66 1.703-.66.424 0 .805.091 1.14.275.336.186.606.455.806.8.198.343.3.7.3 1.063 0 .416-.23.849-.456 1.307-.222.45-.534.876-1.064 1.555l-.116.123-.254.229h1.938z" /></svg>
                      <p className="w-full text-lg">Header two</p>
                    </Box>
                  </Menu.Item>

                  <Menu.Item >
                    <Box 
                      color={text_color}
                      className={`${text_color} flex gap-2 items-center px-4 py-2 text-sm cursor-pointer text-gray-700 ${text_color_hover}`}
                      _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
                      onClick={() => { setBlockType("header-three") }}
                    >
                      <svg fill={icon_color} width="24px" height="24px" viewBox="-4.5 -6.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-3"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.453 2.513l.043.055c.254.334.38.728.38 1.172 0 .637-.239 1.187-.707 1.628-.466.439-1.06.658-1.763.658-.671 0-1.235-.209-1.671-.627-.436-.418-.673-.983-.713-1.676L10 7.353h1.803l.047.295c.038.238.112.397.215.49.1.091.23.137.402.137a.566.566 0 0 0 .422-.159.5.5 0 0 0 .158-.38c0-.163-.067-.295-.224-.419-.17-.134-.438-.21-.815-.215l-.345-.004v-1.17l.345-.004c.377-.004.646-.08.815-.215.157-.124.224-.255.224-.418a.5.5 0 0 0-.158-.381.566.566 0 0 0-.422-.159.568.568 0 0 0-.402.138c-.103.092-.177.251-.215.489l-.047.295H10l.022-.37c.04-.693.277-1.258.713-1.675.436-.419 1-.628 1.67-.628.704 0 1.298.22 1.764.658.468.441.708.991.708 1.629a1.892 1.892 0 0 1-.424 1.226z" /></svg>
                      <p className="w-full text-lg">Header three</p>
                    </Box>
                  </Menu.Item>

                  <Menu.Item >
                    <Box 
                      color={text_color}
                      className={`${text_color} flex gap-2 items-center px-4 py-2 text-sm cursor-pointer text-gray-700 ${text_color_hover}`}
                      _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
                      onClick={() => { setBlockType("blockquote") }}
                    >
                    <svg fill={icon_color} width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 6.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.25zM3.75 11a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zM8 12.313a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zm0 5.937a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75z"/></svg>
                      <p className="w-full text-lg">Quote</p>
                    </Box>
                  </Menu.Item>

                  <Menu.Item >
                    <Box 
                      color={text_color}
                      className={`${text_color} flex gap-2 items-center px-4 py-2 text-sm cursor-pointer text-gray-700 ${text_color_hover}`}
                      _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
                      onClick={() => { setBlockType("unordered-list-item") }}
                    >
                      <svg fill={icon_color} width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"/>
                      </svg>
                      <p className="w-full text-lg">List</p>
                    </Box>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </Box>
        )
      }
    </>
  )
}

export default SideToolbar