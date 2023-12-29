import { Theme } from "types"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Card from "components/customTheme/card"
import { Center, Spinner, Box, Text, useColorModeValue } from "@chakra-ui/react"
import { getStyle } from "styling"
import { utils } from "utils"

const Market = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [loading, setLoading] = useState<boolean>(true)
  const [themes, setThemes] = useState<{[key: string]: Theme}>({})

  const bg_colorRight_chakra = useColorModeValue("#fff", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  const accent_color = getStyle()?.accentColor || "#6488ea"


  useEffect(() => {
    setLoading(true)
    fetch(`${serverUrl}/api/themes`)
    .then(res => res.json())
    .then((data: {[key: string]: Theme}) => {
      if (data) setThemes(data)
      setLoading(false)
    })
    .catch(err => setLoading(false))
  }, [serverUrl])

  return (
    <Box m={2}>
      <Text fontSize='3xl'>
        Market
      </Text>
      <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Download custom themes</Text>
      {!loading ? Object.keys(themes).length > 0 ? 
          Object.keys(themes).map((theme: string) => {
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
                <Card name={theme} colors={themes[theme]} deletable={false}/>
              </motion.li>
            )
          }) : "No themes" : <Center h="full"><Spinner color={accent_color}/></Center>
        } 
    </Box>
  )
}

export default Market