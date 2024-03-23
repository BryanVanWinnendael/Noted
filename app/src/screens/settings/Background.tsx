import { Box, Divider, Text } from "@chakra-ui/react"
import BackgroundChooser from "components/Background-Chooser"
import BlurChooser from "components/BlurChooser"

const Background = () => {
  return (
    <Box w="full" maxW="full">
      <Text fontSize="3xl">Background</Text>
      <BlurChooser />
      <Divider my={4} />
      <BackgroundChooser  />
    </Box>
  )
}

export default Background