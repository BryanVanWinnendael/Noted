import { Box } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { headerStyle } from "styling/Block-Styling/header"
import useColors from "hooks/useColors"

const Index = ({ children }: { children: JSX.Element }) => {
  const { headerColors, headerColorsEnabled } = useSettings()
  const { getTextColor } = useColors()

  const text_color = getTextColor()

  return (
    <Box
      h="100%"
      css={{
        ...headerStyle(headerColorsEnabled, headerColors, text_color),
      }}
    >
      {children}
    </Box>
  )
}

export default Index
