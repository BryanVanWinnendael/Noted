import { Text, MenuItem } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { ContextMenu } from "types/index"
import { utils } from "utils/index"
import { CgTab } from "react-icons/cg"

const OpenFIleInTab = ({ path, name, type }: ContextMenu) => {
  const { getBackgroundColor, getTextColor, getIconColor } = useColors()
  const { openFileInNewTab } = useWorkspace()

  const bg_color = getBackgroundColor()
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color)

  const text_color = getTextColor()

  const icon_color = getIconColor()

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
        gap={2}
      >
        <CgTab color={icon_color} width={5} height={5} />
        <Text fontSize="sm">Open in New Tab</Text>
      </MenuItem>
    </>
  )
}

export default OpenFIleInTab
