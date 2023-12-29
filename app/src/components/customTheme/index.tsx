import { Box, Flex, Select, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getStyle } from "styling"
import { useSettings } from "contexts/SettingsContext"
import { utils } from "utils"
import CustomColors from "components/customTheme/customColors"


const Index = () => {
  const [chosenTheme, setChosenTheme] = useState<string>("light")
  const { setColorMode } = useColorMode()
  const { readThemeFile, customThemes } = useSettings()
 

  const accent_color = getStyle()?.accentColor || "#6488ea"

  const bg_colorRight_chakra = useColorModeValue("white", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra
  

  const changeTheme = (e: any) => {
    readThemeFile()
    if (e.target.value === "dark") {
      setChosenTheme("dark")
      setColorMode("dark")
      localStorage.setItem("theme", "dark")
    }
    else if (e.target.value === "darkGray") {
      setChosenTheme("darkGray")
      setColorMode("darkGray")
      localStorage.setItem("theme", "darkGray")
    }
    else if(e.target.value === "customTheme"){
      setChosenTheme("customTheme")
      setColorMode("customTheme")
      localStorage.setItem("theme", "customTheme")
    }
    else if (customThemes && Object.keys(customThemes).includes(e.target.value)) {
      setChosenTheme(e.target.value)
      setColorMode(e.target.value)
      localStorage.setItem("theme", e.target.value)
    }
    else{
      setChosenTheme("light")
      setColorMode("light")
      localStorage.setItem("theme", "light")
    }
  }

  useEffect(() => {
    const themeSelected = localStorage.getItem("theme") || "light"
    setChosenTheme(themeSelected)
  }, [accent_color])


  return (
    <Box p={2}>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mb={4}>
        <Box>
          <Text fontWeight="semibold">
            Base color scheme
          </Text>
          <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
            Choose default color scheme.
          </Text>
        </Box>
        <Select value={chosenTheme} width="auto" css={{ "& > *": { background: `${bg_color} !important`} }} onChange={changeTheme} placeholder="Light" h="30px">
          <option className="w-full" value="darkGray">Dark</option>
          <option className="w-full" value="dark">Deep blue</option>
          {customThemes && Object.keys(customThemes).map((theme, index) => <option key={index} className="w-full" value={theme}>{theme}</option>)}
          <option className="w-full" value="customTheme">Custom</option>
        </Select>
      </Flex>
      { chosenTheme === "customTheme" && <CustomColors /> }
    </Box>
  )
}

export default Index