import { EditorState, AtomicBlockUtils } from "draft-js"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  ModalCloseButton, 
  } from "@chakra-ui/react"
import React, { useRef } from "react"

type Props = {
  editorState: EditorState
  setEditorState: (editorState: EditorState) => void
  openImage: boolean
  setOpenImage: (openImage: boolean) => void
}

const AddImage:React.FC<Props> = ({ editorState, setEditorState, openImage, setOpenImage }: Props) => {
  const urlRef = useRef<any>()

  const addImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const entityKey = editorState
      .getCurrentContent()
      .createEntity("IMAGE", "MUTABLE", {
        src: urlRef.current.value,
        height: "50px",
        width: "50px",
      }).getLastCreatedEntityKey()
      
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    )
    setEditorState(newEditorState)
    setOpenImage(false)
  }

  return (
  <>
    <Modal isOpen={openImage} onClose={() => {setOpenImage(false)}}>
      <ModalOverlay />
      <ModalContent>
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