import { Flex, Menu, MenuButton, Text, Tooltip } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useState } from "react"
import { utils } from "utils/index"
import ContextMenu from "./Context-Menu"
import { useSettings } from "contexts/SettingsContext"

const FileButton = ({ path, name }: { path: string; name: string }) => {
  const { getSecondaryBackgroundColor, getTextColor, getBackgroundColor } = useColors()
  const { extensionLabel } = useSettings()
  const { setActiveFolder, activeTab, tabs, openFile } = useWorkspace()
  const isActive = tabs[activeTab]?.path === path
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)
  const tab = tabs[activeTab]

  const primary_bg_color = getBackgroundColor()

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

  const extension = name.split(".").pop()

  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} id={path}>
      <Tooltip
          placement="bottom"
          label={getFileName(name)}
          bg={bg_color}
          color={text_color}
          rounded="md"
        >
      <MenuButton
        p={1}
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
                bg={utils.getTransparent(0.6, isActive ? primary_bg_color : secondary_background_color)}
              >
                {extension}
              </Flex>
            )}
          </Flex>
      </MenuButton>
      </Tooltip>

      <ContextMenu path={path} name={name} type="file" />
    </Menu>
  )
}

export default FileButton