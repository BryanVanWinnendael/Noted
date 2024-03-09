import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  MenuItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useEffect, useRef, useState } from "react"
import { ContextMenu } from "types/index"
import { utils } from "utils/index"
import { BiRename } from "react-icons/bi"

const Rename = ({ path, name, type }: ContextMenu) => {
  const { getBackgroundColor, getTextColor, getIconColor } = useColors()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getAccentColor } = useColors()
  const cancelRef = useRef()
  const [newName, setNewName] = useState<string>(name.split(".noted")[0])
  const [inValidName, setInValidName] = useState<boolean>(false)
  const { rename } = useWorkspace()

  const bg_color = getBackgroundColor()
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color)

  const text_color = getTextColor()

  const accent_color = getAccentColor()

  const icon_color = getIconColor()

  const renameFile = async () => {
    const newPath = path.split(name)[0] + newName + ".noted"
    const res = await rename(path, newPath, type)

    if (!res) {
      setInValidName(true)
      return
    }
    onClose()
  }

  const renameFolder = async () => {
    const newPath = path.split(name)[0] + newName
    const res = await rename(path, newPath, type)

    if (!res) {
      setInValidName(true)
      return
    }
    onClose()
  }

  const handleRename = async () => {
    switch (type) {
      case "file":
        renameFile()
        break
      case "folder":
        renameFolder()
        break
    }
  }

  useEffect(() => {
    return () => {
      setNewName(name.split(".noted")[0])
    }
  }, [name])

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          bg={bg_color}
          color={utils.getTextColor(bg_color)}
          shadow="md"
        >
          <AlertDialogBody>
            <Input
              value={newName}
              onChange={(e) => {
                setInValidName(false)
                setNewName(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleRename()
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accent_color}
              errorBorderColor="red.300"
              placeholder="Choose a file name"
            />
            {inValidName && (
              <Text mt={1} color="red.200">
                Name is already in use or in invalid
              </Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <MenuItem
        m={0}
        onClick={onOpen}
        p={1}
        bg="transparent"
        color={text_color}
        rounded="md"
        px={2}
        _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
        gap={2}
      >
        <BiRename color={icon_color} width={5} height={5} />
        <Text fontSize="sm">Rename</Text>
      </MenuItem>
    </>
  )
}

export default Rename
