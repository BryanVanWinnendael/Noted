import { Flex, Box, Text } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import CustomSwitch from "./CustomSwitch"

const ExtensionLabel = () => {
  const { saveSettings, extensionLabel } = useSettings()
  const { getMutedTextColor } = useColors()

  const muted_text_color = getMutedTextColor()

  const handleGlassBackground = () => {
    saveSettings("extension_label", !extensionLabel)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Extension label</Text>
        <Text color={muted_text_color}>
          Enable or disable the label for the extension
        </Text>
      </Box>
      <CustomSwitch
        isChecked={extensionLabel}
        onChange={handleGlassBackground}
        id="extensionLabel"
      />
    </Flex>
  )
}

export default ExtensionLabel
