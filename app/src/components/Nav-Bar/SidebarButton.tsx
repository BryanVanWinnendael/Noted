import { IconButton, Tooltip } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { utils } from "utils/index";
import { FiSidebar } from "react-icons/fi";
import { useWorkspace } from "contexts/WorkspaceContext";

const SidebarButton = () => {
  const { setShowSidebar, showSidebar } = useWorkspace()
  const { getSecondaryBackgroundColor, getAccentColor, getTextColor, getMutedTextColor } = useColors()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const accent_color = getAccentColor()

  const text_color = getTextColor()

  const muted_text_color = getMutedTextColor()

  return (
    <Tooltip placement="bottom" label={"Ctrl+s"} bg={bg_color} color={text_color} rounded="md">
      <IconButton
        onClick={() => setShowSidebar(!showSidebar)}
        _hover={{ color: accent_color }}
        _active={{ opacity: 0.8 }}
        aria-label="delete theme"
        color={muted_text_color}
        bg="transparent"
        icon={<FiSidebar />}
      />
    </Tooltip>
    
  )
}

export default SidebarButton