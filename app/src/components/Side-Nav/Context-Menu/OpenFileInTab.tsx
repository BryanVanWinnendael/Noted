import { Text, MenuItem } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { ContextMenu } from "types/index"
import { utils } from "utils/index"

const OpenFIleInTab = ({ path, name, type }: ContextMenu) => {
  const { getBackgroundColor, getTextColor } = useColors()
  const { openFileInNewTab } = useWorkspace()

  const bg_color = getBackgroundColor()
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color)

  const text_color = getTextColor()

  const handleOpen = async () => {
    openFileInNewTab(path)
  }

  return (
    <>
      <MenuItem
        onClick={handleOpen}
        m={0}
        p={1}
        bg="transparent"
        color={text_color}
        rounded="md"
        px={2}
        _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
      >
        <Text fontSize="sm">Open in New Tab</Text>
      </MenuItem>
    </>
  )
}

export default OpenFIleInTab
