import { switchAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  track: {
    _checked: {
      bg: "#6488ea",
    },
  },
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })