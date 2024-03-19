import {
  Menu,
  AccordionButton,
  MenuButton,
  Flex,
  AccordionIcon,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useState } from "react"
import { utils } from "utils/index"
import ContextMenu from "./Context-Menu"

const FolderButton = ({ path, name }: { path: string; name: string }) => {
  const { getSecondaryBackgroundColor, getTextColor, getIconColor } =
    useColors()
  const { setActiveFolder, activeFolder } = useWorkspace()
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({})

  const checkIfOpen = (path: string) => {
    if (isOpen[path]) {
      return true
    } else {
      return false
    }
  }

  const icon_color = getIconColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const handleSetActiveFolder = (folderPath: string) => {
    setActiveFolder(folderPath)
  }

  return (
    <Menu
      isOpen={checkIfOpen(path)}
      onClose={() => setIsOpen({ ...isOpen, [path]: false })}
    >
      <AccordionButton w="full" h="fit-content" p={1}>
      <Tooltip
          placement="bottom"
          label={name}
          bg={bg_color}
          color={text_color}
          rounded="md"
        >
        <MenuButton
          bg={
            activeFolder && activeFolder === path
              ? utils.getDarkerColor("0.03", bg_color)
              : "none"
          }
          onContextMenu={() => setIsOpen({ ...isOpen, [path]: true })}
          onClick={() => handleSetActiveFolder(path)}
          color={text_color}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
          rounded="md"
          w="full"
          h="fit-content"
          p={1}
          pl={2}
        >
          <Flex>
            <AccordionIcon color={icon_color} />
            <Text
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              fontSize="sm"
            >
              {name}
            </Text>
          </Flex>
        </MenuButton>
        </Tooltip>
      </AccordionButton>
      <ContextMenu path={path} name={name} type="folder" />
    </Menu>
  )
}

export default FolderButton
