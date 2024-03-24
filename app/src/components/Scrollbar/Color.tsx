import { Box, Button, Flex, Text } from "@chakra-ui/react"
import ColorPicker from "components/ColorPicker"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import { DEFAULT_SCROLLBAR } from "utils/constants"
import { utils } from "utils/index"

const Color = () => {
  const { saveSettings, scrollbar } = useSettings()
  const { getMutedTextColor, getAccentColor } = useColors()
  const color = scrollbar.color

  const muted_text_color = getMutedTextColor()

  const accent_color = getAccentColor()

  const handleChange = (_: any, color: string) => {
    const newScrollbar = { ...scrollbar, color: color }
    saveSettings("scrollbar", newScrollbar)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box w="full">
        <Text fontWeight="semibold">Color</Text>
        <Text color={muted_text_color}>Choose the color for the scrollbar</Text>
      </Box>

      <Flex w="full" justifyContent="flex-end">
        <Flex gap={2} alignItems="center">
        <ColorPicker
                  keyType="scrollbar"
                  onChange={handleChange}
                  givenColor={color}
                />
          <Button
          color={utils.getTextColor(accent_color)}
          _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
          h={8}
          bg={accent_color}
          onClick={() => handleChange("", DEFAULT_SCROLLBAR.color)}>Reset</Button>
        </Flex>
      </Flex>
    </Flex> 
  )
}

export default Color