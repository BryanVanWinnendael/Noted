import { Box, Button, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import { utils } from "utils/index"

const SidebarOpacity = () => {
  const { saveSettings, sidebarOpacity } = useSettings()
  const { getMutedTextColor, getAccentColor } = useColors()

  const muted_text_color = getMutedTextColor()

  const accent_color = getAccentColor()

  const opacityValue = sidebarOpacity * 100

  const handleChange = (value: number) => {
    const opacity = value / 100
    saveSettings("sidebar_opacity", opacity)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Sidebar opacity</Text>
        <Text color={muted_text_color}>Choose the opacity for the sidebar</Text>
      </Box>

      <Flex w="50%" gap={2} alignItems="center">
        <Slider value={opacityValue} aria-label='slider-ex-1' defaultValue={36} onChange={(val) => handleChange(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button
        color={utils.getTextColor(accent_color)}
        _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
        h={8}
        bg={accent_color}
         onClick={() => handleChange(0)}>Reset</Button>
      </Flex>
    </Flex> 
  )
}

export default SidebarOpacity