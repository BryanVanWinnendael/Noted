import { Box, Flex, Switch, Text, useColorModeValue } from "@chakra-ui/react"
import CustomColors from "components/customHeaders/customColors"
import { useSettings } from "contexts/SettingsContext"
import { getStyle, resetHeaders } from "styling"
import { utils } from "utils"

const Index = () => {
  const { customHeadersEnabled, setCustomHeadersEnabled, setHeaderColors } = useSettings()

  const bg_colorRight_chakra = useColorModeValue("#fff", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  const accent_color = getStyle()?.accentColor || "#6488ea"

  const handleChangeToggle = () => {
    const flag: boolean = !customHeadersEnabled
    const text_flag: string = String(flag)
    localStorage.setItem("customHeadersEnabled", text_flag)
    setCustomHeadersEnabled(!customHeadersEnabled)
    if (!flag) setHeaderColors(false)
    else setHeaderColors(resetHeaders())
  }

  
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
        <Box>
          <Text fontWeight="semibold">
            Rainbow colors
          </Text>
          <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
            Enable or disable custom rainbow colors for headers.
          </Text>
        </Box>
        <Switch sx={{ '.css-j1l0qk[aria-checked=true], .css-j1l0qk[data-checked]': { backgroundColor: accent_color }}} isChecked={customHeadersEnabled} onChange={handleChangeToggle} id="inlinetoolbar"/>
      </Flex>
      {customHeadersEnabled && <CustomColors />}
    </Box>
  )
}

export default Index