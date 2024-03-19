import { MenuItem, Text } from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import useColors from "hooks/useColors"
import { ContextMenu } from "types/index"
import { utils } from "utils/index"
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs"

const SplitFile = ({ path }: ContextMenu) => {
  const { getTextColor, getBackgroundColor, getIconColor } = useColors()
  const { split } = useWorkspace()

  const bg_color = getBackgroundColor()
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color)

  const text_color = getTextColor()

  const icon_color = getIconColor()

  const handleSplit = () => {
    split(path)
  }

  return (
    <MenuItem
      onClick={handleSplit}
      m={0}
      p={1}
      bg="transparent"
      color={text_color}
      rounded="md"
      px={2}
      _hover={{ bg: utils.getDarkerColor("0.03", bg_color_lighter) }}
      gap={2}
    >
      <BsReverseLayoutSidebarInsetReverse
        color={icon_color}
        width={5}
        height={5}
      />
      <Text fontSize="sm">Split</Text>
    </MenuItem>
  )
}

export default SplitFile
