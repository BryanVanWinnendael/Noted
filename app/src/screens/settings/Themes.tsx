import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import { utils } from "utils"
import Card from "components/customTheme/card"
import { useSettings } from "contexts/SettingsContext"
import { AnimatePresence, motion } from "framer-motion"
import { getStyle } from "styling"

const Themes = () => {
  const { customThemes } = useSettings()
  const themes = Object.keys(customThemes)

  const bg_colorRight_chakra = useColorModeValue("#fff", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  return (
    <Box m={2}>
      <Text fontSize='3xl'>
        Custom themes
      </Text>
      <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Manage your custom themes here</Text>
      <AnimatePresence mode={"popLayout"}>
        { themes.length > 0 ? 
          themes.map((theme) => {
            return (
              <motion.li 
                className="list-none mt-4"
                key={theme}
                layout
                // initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <Card name={theme} colors={customThemes[theme]} deletable={true}/>
              </motion.li>
            )
          }) : "No themes"
        } 
      </AnimatePresence>
    </Box>
  )
}

export default Themes