import {
  Box,
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import { utils } from "utils/index"

const Opacity = () => {
  const { saveSettings, scrollbar } = useSettings()
  const { getMutedTextColor, getAccentColor } = useColors()
  const opacity = scrollbar.opacity

  const muted_text_color = getMutedTextColor()

  const accent_color = getAccentColor()

  const opacityValue = opacity * 100

  const handleChange = (value: number) => {
    const newOpacity = value / 100
    const newScrollbar = { ...scrollbar, opacity: newOpacity }
    saveSettings("scrollbar", newScrollbar)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Opacity</Text>
        <Text color={muted_text_color}>
          Choose the opacity for the scrollbar
        </Text>
      </Box>

      <Flex w="50%" gap={2} alignItems="center">
        <Slider
          value={opacityValue}
          aria-label="slider-ex-1"
          defaultValue={36}
          onChange={(val) => handleChange(val)}
        >
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
          onClick={() => handleChange(50)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  )
}

export default Opacity
