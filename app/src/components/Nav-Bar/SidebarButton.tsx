import { Box, Icon, Tooltip } from "@chakra-ui/react"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import { useWorkspace } from "contexts/WorkspaceContext"
import { BsLayoutSidebarInset } from "react-icons/bs"

const SidebarButton = () => {
  const { setShowSidebar, showSidebar } = useWorkspace()
  const {
    getSecondaryBackgroundColor,
    getAccentColor,
    getTextColor,
    getMutedTextColor,
  } = useColors()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const accent_color = getAccentColor()

  const text_color = getTextColor()

  const muted_text_color = getMutedTextColor()

  return (
    <Tooltip
      placement="bottom"
      label={"Ctrl+S"}
      bg={bg_color}
      color={text_color}
      rounded="md"
    >
      <Box m={2}>
        <Icon
          as={BsLayoutSidebarInset}
          cursor="pointer"
          w="1.1rem"
          h="1.1rem"
          onClick={() => setShowSidebar(!showSidebar)}
          _hover={{ color: accent_color }}
          _active={{ opacity: 0.8 }}
          aria-label="side menu"
          color={muted_text_color}
          bg="transparent"
        />
      </Box>
    </Tooltip>
  )
}

export default SidebarButton
