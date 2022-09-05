import React, {useEffect, useState} from 'react'
import {
    HeadlineOneButton,
    HeadlineTwoButton,
    BlockquoteButton,
    CodeBlockButton,
} from '@draft-js-plugins/buttons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box
  } from '@chakra-ui/react'
import { EditorState, RichUtils, Modifier  } from 'draft-js'
import { AddIcon, ExternalLinkIcon, RepeatIcon } from '@chakra-ui/icons'
import { IoImageOutline, IoListOutline } from 'react-icons/io5'


type Props = {
    setOpenImage: (openImage: boolean) => void
    editorState: EditorState
    setEditorState: (editorState: EditorState) => void
}

const SideToolbar:React.FC<Props> = ({ setOpenImage, editorState, setEditorState }: Props) => {
    const [positionOffset, setPositionOffset] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(true)

    const getSelectedBlockNode = (root: any) => {
        const selection = root.getSelection()
        if (selection.rangeCount === 0) {
          return null
        }
        let node = selection.getRangeAt(0).startContainer
        do {
          if (node.getAttribute && node.getAttribute('data-block') === 'true') {
            return node
          }
          node = node.parentNode
        } while (node !== null)
        return null
    }

    const setBlockType = (blockType: string) => {
        const newEditorState = RichUtils.toggleBlockType(editorState, blockType)
        setEditorState(newEditorState)
    }

    useEffect(() => {
      
        const node = getSelectedBlockNode(window)

        if (node) {
            setPositionOffset(node.offsetTop)
        }
        const currentContent = editorState.getCurrentContent()
        const selection = editorState.getSelection()
        const currentBlock: any = currentContent.getBlockForKey(selection.getStartKey())

        if(currentBlock.text !== '') {
            setVisible(false)
        }
        else {
            setVisible(true)
        }
       
    }, [ editorState ])

    return (
        <>
            {
                visible && (
                    <Box marginLeft={-7} top={78 + positionOffset} position='absolute'>
                        <Menu>
                            <MenuButton aria-label='Options'>
                                <AddIcon color='#718096'/>
                            </MenuButton>
                            <MenuList>
                                <MenuItem icon={
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z"/></svg>
                                } onClick={() => {setOpenImage(true)}}>
                                    Image
                                </MenuItem>
                                <MenuItem icon={
                                    <svg width="24px" height="24px" viewBox="-5 -7 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-1"><path d='M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm9.52.779H10V3h3.36v7h-1.84V4.779z' /></svg>
                                } onClick={() => { setBlockType('header-one') }}>
                                    Header one
                                </MenuItem>
                                <MenuItem icon={
                                    <svg width="24px" height="24px" viewBox="-4.5 -7 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-2"><path d='M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.88 4.352V10H10V8.986l.1-.246 1.785-1.913c.43-.435.793-.77.923-1.011.124-.23.182-.427.182-.587 0-.14-.04-.242-.127-.327a.469.469 0 0 0-.351-.127.443.443 0 0 0-.355.158c-.105.117-.165.288-.173.525l-.012.338h-1.824l.016-.366c.034-.735.272-1.33.718-1.77.446-.44 1.02-.66 1.703-.66.424 0 .805.091 1.14.275.336.186.606.455.806.8.198.343.3.7.3 1.063 0 .416-.23.849-.456 1.307-.222.45-.534.876-1.064 1.555l-.116.123-.254.229h1.938z' /></svg>
                                } onClick={() => { setBlockType('header-two') }}>
                                    Header two
                                </MenuItem>
                                <MenuItem icon={
                                    <svg width="24px" height="24px" viewBox="-4.5 -6.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-3"><path d='M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm12.453 2.513l.043.055c.254.334.38.728.38 1.172 0 .637-.239 1.187-.707 1.628-.466.439-1.06.658-1.763.658-.671 0-1.235-.209-1.671-.627-.436-.418-.673-.983-.713-1.676L10 7.353h1.803l.047.295c.038.238.112.397.215.49.1.091.23.137.402.137a.566.566 0 0 0 .422-.159.5.5 0 0 0 .158-.38c0-.163-.067-.295-.224-.419-.17-.134-.438-.21-.815-.215l-.345-.004v-1.17l.345-.004c.377-.004.646-.08.815-.215.157-.124.224-.255.224-.418a.5.5 0 0 0-.158-.381.566.566 0 0 0-.422-.159.568.568 0 0 0-.402.138c-.103.092-.177.251-.215.489l-.047.295H10l.022-.37c.04-.693.277-1.258.713-1.675.436-.419 1-.628 1.67-.628.704 0 1.298.22 1.764.658.468.441.708.991.708 1.629a1.892 1.892 0 0 1-.424 1.226z' /></svg>
                                } onClick={() => { setBlockType('header-three') }}>
                                    Header three
                                </MenuItem>
                                <MenuItem icon={
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 6.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.25zM3.75 11a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zM8 12.313a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zm0 5.937a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75z"/></svg>
                                } onClick={() => { setBlockType('blockquote') }}>
                                    Quote
                                </MenuItem>
                                <MenuItem icon={
                                    <svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="icon">
                                    <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"/>
                                    </svg>
                                } onClick={() => { setBlockType('unordered-list-item') }}>
                                    List
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                )
            }
        </>
    )
}

export default SideToolbar