import { Box } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"

const Compact = () => {
  const { getBackgroundColor } = useColors()
  const { glassBackground, glassEnabled } = useSettings()

  const bg_color = getBackgroundColor()

  const isGlassEnabled = glassEnabled && glassBackground.window

  return (
    <Box
      bg={isGlassEnabled ? "transparent" : bg_color}
      w="full"
      h={2}
      className="nav"
    />
  )
}

export default Compact
