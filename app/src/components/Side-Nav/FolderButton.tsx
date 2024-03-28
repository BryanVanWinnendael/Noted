import { Menu, MenuButton, Flex, Text, Tooltip, Icon } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { useState } from "react"
import { utils } from "utils/index"
import ContextMenu from "./Context-Menu"
import { IoIosArrowForward } from "react-icons/io"
import { motion } from "framer-motion"
import { FaRegFolder } from "react-icons/fa"
import { FaRegFolderOpen } from "react-icons/fa"
import { useSettings } from "contexts/SettingsContext"

const FolderButton = ({
  path,
  name,
  onClick,
  expanded,
}: {
  path: string
  name: string
  onClick: () => void
  expanded: boolean
}) => {
  const { getSecondaryBackgroundColor, getTextColor, getIconColor } =
    useColors()
  const { setActiveFolder } = useWorkspace()
  const { sidebarIcons } = useSettings()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const icon_color = getIconColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const handleSetActiveFolder = (folderPath: string) => {
    setActiveFolder(folderPath)
  }

  const handleClick = () => {
    handleSetActiveFolder(path)
    onClick()
  }

  return (
    <Menu id={path} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Tooltip
        placement="bottom"
        label={name}
        bg={bg_color}
        color={text_color}
        rounded="md"
      >
        <MenuButton
          w="full"
          h="fit-content"
          onContextMenu={() => setIsOpen(true)}
          onClick={handleClick}
          color={text_color}
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
          rounded="md"
          p={1}
        >
          <Flex gap={1} alignItems="center">
            {sidebarIcons ? (
              <Icon
                w={4}
                h={4}
                as={expanded ? FaRegFolderOpen : FaRegFolder}
                color={icon_color}
              />
            ) : (
              <motion.span
                animate={{ rotate: expanded ? 90 : 0 }}
                className="flex justify-center items-center"
              >
                <Icon as={IoIosArrowForward} color={icon_color} />
              </motion.span>
            )}

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
      <ContextMenu path={path} name={name} type="folder" />
    </Menu>
  )
}

export default FolderButton
