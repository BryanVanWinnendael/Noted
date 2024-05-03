import { Box } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { headerStyle } from "styling/Block-Styling/header"
import { codeStyle } from "./code"
import { tableStyle } from "./table"
import useColors from "hooks/useColors"
import { nestedStyle } from "./nestcheck"
import { latexStyle } from "./latex"
import { soundStyle } from "./sound"

const Index = ({ children }: { children: JSX.Element }) => {
  const { headerColors, headerColorsEnabled } = useSettings()
  const {
    getTextColor,
    getBackgroundColor,
    getSecondaryBackgroundColorLighter,
    getMutedTextColor,
    getBorderColor,
    getAccentColor,
    getIconColor,
  } = useColors()

  const text_color = getTextColor()
  const background_color = getBackgroundColor()
  const secondary_background_color = getSecondaryBackgroundColorLighter()
  const muted_text_color = getMutedTextColor()
  const border_color = getBorderColor()
  const accent_color = getAccentColor()
  const icon_color = getIconColor()

  return (
    <Box
      h="100%"
      __css={{
        ...soundStyle(border_color),
        ...latexStyle(icon_color, muted_text_color),
        ...nestedStyle(secondary_background_color, accent_color),
        ...headerStyle(headerColorsEnabled, headerColors, text_color),
        ...codeStyle(background_color),
        ...tableStyle(
          background_color,
          secondary_background_color,
          muted_text_color,
          border_color,
        ),
      }}
    >
      {children}
    </Box>
  )
}

export default Index
