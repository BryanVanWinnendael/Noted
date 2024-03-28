import { Flex, Box, Text } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import CustomSwitch from "./CustomSwitch"

const EditorTitle = () => {
  const { saveSettings, editorTitle } = useSettings()
  const { getMutedTextColor } = useColors()

  const muted_text_color = getMutedTextColor()

  const handleGlassBackground = () => {
    saveSettings("editor_title", !editorTitle)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Editor title</Text>
        <Text color={muted_text_color}>
          Enable or disable the title for the editor
        </Text>
      </Box>
      <CustomSwitch
        isChecked={editorTitle}
        onChange={handleGlassBackground}
        id="editorTitle"
      />
    </Flex>
  )
}

export default EditorTitle
