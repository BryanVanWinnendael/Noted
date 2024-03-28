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

const WallpaperBrightness = () => {
  const { saveSettings, wallpaperBrightness } = useSettings()
  const { getMutedTextColor, getAccentColor } = useColors()

  const muted_text_color = getMutedTextColor()

  const accent_color = getAccentColor()

  const brightnessValue = wallpaperBrightness * 100

  const handleChange = (value: number) => {
    const brightness = value / 100
    saveSettings("wallpaper_brightness", brightness)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Brightness</Text>
        <Text color={muted_text_color}>
          Choose the brightness for the background
        </Text>
      </Box>

      <Flex w="50%" gap={2} alignItems="center">
        <Slider
          value={brightnessValue}
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
          onClick={() => handleChange(100)}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  )
}

export default WallpaperBrightness
