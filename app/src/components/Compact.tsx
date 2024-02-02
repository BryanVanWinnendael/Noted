import { Flex, Box, Text } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import CustomSwitch from "./CustomSwitch"

const Compact = () => {
  const { saveSettings, compactMode } = useSettings()
  const { getMutedTextColor } = useColors()

  const muted_text_color = getMutedTextColor()

  const handleGlassBackground = () => {
    saveSettings("compact_mode", !compactMode)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Compact mode</Text>
        <Text color={muted_text_color}>
          Enable or disable compact mode for the app
        </Text>
      </Box>
      <CustomSwitch
        isChecked={compactMode}
        onChange={handleGlassBackground}
        id="compactMode"
      />
    </Flex>
  )
}

export default Compact
