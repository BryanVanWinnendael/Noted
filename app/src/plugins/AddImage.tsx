import { EditorState, AtomicBlockUtils } from "draft-js"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  ModalCloseButton,
  useColorModeValue, 
  } from "@chakra-ui/react"
import React, { useRef } from "react"
import { getStyle } from "styling"
import { useEditor } from "contexts/EditorContext"

type Props = {
  openImage: boolean
  setOpenImage: (openImage: boolean) => void
}

const AddImage:React.FC<Props> = ({ openImage, setOpenImage }: Props) => {
  const { editor, setEditor } = useEditor()
  const urlRef = useRef<any>()

  const bg_color_chakra = useColorModeValue("bg-white", "bg-darkMode")
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra

  const addImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const entityKey = editor
      .getCurrentContent()
      .createEntity("IMAGE", "MUTABLE", {
        src: urlRef.current.value,
        height: "50px",
        width: "50px",
      }).getLastCreatedEntityKey()
      
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editor,
      entityKey,
      " "
    )
    setEditor(newEditorState)
    setOpenImage(false)
  }

  return (
  <>
    <Modal isOpen={openImage} onClose={() => {setOpenImage(false)}}>
      <ModalOverlay />
      <ModalContent bg={bg_color} className={`${bg_color}`}>
        <ModalHeader>Add Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={addImage}>
            <Input placeholder="Url" ref={urlRef}/>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
      
  )
}

export default AddImage