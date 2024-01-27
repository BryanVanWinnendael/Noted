import { MyWindow, Theme } from "types"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ThemeCard from "components/Custom-Theme/ThemeCard"
import { Center, Spinner, Box, Text, Flex } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import useColors from "hooks/useColors"

declare let window: MyWindow

const ipcRenderer = window.myApp.getIpcRenderer()

const Market = () => {
  const { getAccentColor, getMutedTextColor } = useColors()
  const serverUrl = process.env.REACT_APP_SERVER_URL
  const [loading, setLoading] = useState<boolean>(true)
  const [themes, setThemes] = useState<{ [key: string]: Theme }>({})

  const accent_color = getAccentColor()

  const muted_text_color = getMutedTextColor()

  const handleLink = (e: any) => {
    ipcRenderer.invoke("openBrowser", "https://write-noted.vercel.app/")
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${serverUrl}/api/themes`)
      .then((res) => res.json())
      .then((data: { [key: string]: Theme }) => {
        if (data) setThemes(data)
        setLoading(false)
      })
      .catch((err) => setLoading(false))
  }, [serverUrl])

  return (
    <Box>
      <Text fontSize="3xl">Market</Text>
      <Text color={muted_text_color}>
        Download custom themes
      </Text>
      <Flex gap={1}>
        <Text color={muted_text_color}>
          or request your own theme to be uploaded
        </Text>
        <Text onClick={handleLink} cursor="pointer" color={accent_color}>
          here <ExternalLinkIcon mx="2px" />
        </Text>
      </Flex>

      {!loading ? (
        Object.keys(themes).length > 0 ? (
          Object.keys(themes).map((theme: string) => {
            return (
              <motion.li
                className="list-motion"
                key={theme}
                layout
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <ThemeCard
                  name={theme}
                  colors={themes[theme]}
                  deletable={false}
                />
              </motion.li>
            )
          })
        ) : (
          "No themes"
        )
      ) : (
        <Center h="full" mt={5}>
          <Spinner color={accent_color} />
        </Center>
      )}
    </Box>
  )
}

export default Market
