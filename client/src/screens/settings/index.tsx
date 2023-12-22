import { Grid, Flex, useColorModeValue, Box, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { useRef, useState } from "react"
import Editor from "./Editor"
import Tutorial from "./Tutorial"
import { getStyle } from "styling"
import { utils } from "utils"
import Themes from "./Themes"
import Market from "./Market"

const SettingsScreen = () => {
  const [section, setSection] = useState<string>("editor")
  const { isOpen, onClose } = useSettings()

  const bg_colorLeft_chakra = useColorModeValue("#E7E7E7", "#222731")
  const bg_colorLeft = getStyle()?.secondaryBackgroundColor || bg_colorLeft_chakra

  const bg_colorRight_chakra = useColorModeValue("#fff", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_colorRight = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  const accent_color = getStyle()?.accentColor || "#6488ea"

  const finalRef = useRef(null)

  return (
  <Modal size="5xl" finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent h="80vh" ml={5} mr={5} color={utils.getTextColor(bg_colorRight)} bg={bg_colorRight}>
      <Grid templateColumns="0.5fr 1fr" w="full" h="full">
        <Flex border="1px" borderColor="rgb(220,220,220, 0.2)" flexDirection="column" bg={bg_colorLeft} roundedTopLeft="md" roundedBottomLeft="md">
          <Box className="w-4 h-4 m-2"></Box>
          <Box ml={5} mr={5}>
            <Box 
              mb={1}  p={1} pl={2} rounded="md"
              color={section === "editor" ? utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color) : utils.getTextColor(bg_colorLeft)} 
              bg={section === "editor" ? utils.getTransparent(0.2, accent_color) :""} 
              onClick={() => {setSection("editor")}} cursor="pointer" 
              _hover={{ bg: utils.getDarkerColor("0.03", section === "editor" ? utils.getTransparent(0.2, accent_color) : bg_colorLeft), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_colorLeft)) }}
            >
              Editor
            </Box>
            <Box 
              mb={1}  p={1} pl={2} rounded="md"
              color={section === "tutorial" ? utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color) : utils.getTextColor(bg_colorLeft)} 
              bg={section === "tutorial" ? utils.getTransparent(0.2, accent_color) :""} 
              onClick={() => {setSection("tutorial")}} cursor="pointer" 
              _hover={{ bg: utils.getDarkerColor("0.03", section === "tutorial" ? utils.getTransparent(0.2, accent_color) : bg_colorLeft), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_colorLeft)) }}
            >
              Tutorial
            </Box>
            <Box 
              mb={1}  p={1} pl={2} rounded="md"
              color={section === "themes" ? utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color) : utils.getTextColor(bg_colorLeft)} 
              bg={section === "themes" ? utils.getTransparent(0.2, accent_color) :""} 
              onClick={() => {setSection("themes")}} cursor="pointer" 
              _hover={{ bg: utils.getDarkerColor("0.03", section === "themes" ? utils.getTransparent(0.2, accent_color) : bg_colorLeft), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_colorLeft)) }}
            >
              Custom themes
            </Box>
            <Box 
              mb={1}  p={1} pl={2} rounded="md"
              color={section === "market" ? utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color) : utils.getTextColor(bg_colorLeft)} 
              bg={section === "market" ? utils.getTransparent(0.2, accent_color) :""} 
              onClick={() => {setSection("market")}} cursor="pointer" 
              _hover={{ bg: utils.getDarkerColor("0.03", section === "market" ? utils.getTransparent(0.2, accent_color) : bg_colorLeft), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_colorLeft)) }}
            >
              Market
            </Box>
          </Box>
          <Flex h="full" alignItems="flex-end">
            <Text color={utils.getMutedTextColor(bg_colorLeft)} m={2}>v3.0</Text>
          </Flex>
        </Flex>

        <Flex border="1px" borderColor="rgb(220,220,220, 0.2)" borderLeftColor="rgb(220,220,220, 0)" flexDirection="column" bg={bg_colorRight} roundedTopRight="md" roundedBottomRight="md">
          <Flex justifyContent="flex-end">
            <Box className="cursor-pointer m-2" onClick={onClose} _hover={{ fill: accent_color }} fill="gray" w="fit-content" h="fit-content">
              <svg className="w-4 h-4 m-2cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52"><path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z"/></svg>
            </Box>
          </Flex>
          <Box minHeight="70vh" ml={5} maxH="70vh" overflow="scroll" overflowY="auto" overflowX="hidden">
            {
              {
                "editor": <Editor />,
                "tutorial": <Tutorial />,
                "themes": <Themes />,
                "market": <Market />
              }[section]
            }
          </Box>
        </Flex>
      </Grid>
    </ModalContent>
  </Modal>
  )
}

export default SettingsScreen