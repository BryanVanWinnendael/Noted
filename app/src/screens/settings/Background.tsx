import { Box, Divider, Text } from "@chakra-ui/react"
import BackgroundChooser from "components/Background-Chooser"
import BlurChooser from "components/BlurChooser"
import WallpaperBrightness from "components/WallpaperBrightness"

const Background = () => {
  return (
    <Box w="full" maxW="full">
      <Text fontSize="3xl">Background</Text>
      <BlurChooser />
      <WallpaperBrightness />
      <Divider my={4} />
      <BackgroundChooser  />
    </Box>
  )
}

export default Background