import { Menu, MenuButton, Text } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useState } from "react"
import { utils } from "utils/index"
import ContextMenu from "./Context-Menu"

const FileButton = ({ name, path }: { name: string; path: string }) => {
  const { getSecondaryBackgroundColor, getTextColor } = useColors()
  const { openFile, activeFile, setActiveFolder } = useWorkspace()
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const handleOpenFile = (filePath: string) => {
    const folderPath = filePath.split("\\")
    folderPath.pop()
    setActiveFolder(folderPath.join("\\"))
    openFile(filePath)
  }

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton
        p={1}
        pl={2}
        bg={
          activeFile && activeFile.path === path
            ? utils.getDarkerColor("0.03", bg_color)
            : "none"
        }
        onClick={() => handleOpenFile(path)}
        onContextMenu={() => setIsOpen(true)}
        color={text_color}
        _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
        rounded="md"
        w="full"
        h="fit-content"
        cursor="pointer"
      >
        <Text
          textAlign="left"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          fontSize="sm"
          ml="20px"
        >
          {name.split(".noted")[0]}
        </Text>
      </MenuButton>
      <ContextMenu path={path} name={name} type="file" />
    </Menu>
  )
}

export default FileButton
