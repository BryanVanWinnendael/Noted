import { Flex, Menu, MenuButton, Text } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useState } from "react"
import { utils } from "utils/index"
import ContextMenu from "./Context-Menu"
import { useSettings } from "contexts/SettingsContext"

const FileButton = ({ name, path }: { name: string; path: string }) => {
  const { getSecondaryBackgroundColor, getTextColor } = useColors()
  const { extensionLabel } = useSettings()
  const { setActiveFolder, activeTab, tabs, openFile } = useWorkspace()
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)
  const extension = path.split(".").pop()
  const tab = tabs[activeTab]

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const handleOpenFile = (filePath: string) => {
    const folderPath = filePath.split("\\")
    folderPath.pop()
    setActiveFolder(folderPath.join("\\"))
    openFile(filePath)
  }

  const getFileName = (path: string) => {
    const lastDotIndex = path.lastIndexOf(".")
    if (lastDotIndex !== -1) {
      return path.substring(0, lastDotIndex)
    }
    return path
  }

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton
        p={1}
        pl={2}
        bg={
          tab?.path === path ? utils.getDarkerColor("0.03", bg_color) : "none"
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
        <Flex gap={2} alignItems="center">
          <Text
            textAlign="left"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            fontSize="sm"
            ml="20px"
          >
            {getFileName(name)}
          </Text>
          {extensionLabel && (
            <Flex
              px={2}
              rounded="md"
              bg={utils.getTransparent(0.6, secondary_background_color)}
            >
              {extension}
            </Flex>
          )}
        </Flex>
      </MenuButton>
      <ContextMenu path={path} name={name} type="file" />
    </Menu>
  )
}

export default FileButton
