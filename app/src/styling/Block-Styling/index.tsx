import { Box } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { headerStyle } from "styling/Block-Styling/header"
import { codeStyle } from "./code"
import { tableStyle } from "./table"
import useColors from "hooks/useColors"

const Index = ({ children }: { children: JSX.Element }) => {
  const { headerColors, headerColorsEnabled } = useSettings()
  const {
    getTextColor,
    getBackgroundColor,
    getSecondaryBackgroundColorLighter,
    getMutedTextColor,
    getBorderColor,
  } = useColors()

  const text_color = getTextColor()
  const background_color = getBackgroundColor()
  const secondary_background_color = getSecondaryBackgroundColorLighter()
  const muted_text_color = getMutedTextColor()
  const border_color = getBorderColor()

  return (
    <Box
      h="100%"
      css={{
        ...headerStyle(headerColorsEnabled, headerColors, text_color),
        ...codeStyle(
          text_color,
          background_color,
          secondary_background_color,
          muted_text_color,
          border_color,
        ),
        ...tableStyle(
          text_color,
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
