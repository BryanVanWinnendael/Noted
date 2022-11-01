import { Grid, Flex, useColorModeValue, Box, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { useScreen } from "contexts/SettingsScreenContext"
import { useRef, useState } from "react"
import Editor from "./Editor"
import Tutorial from "./Tutorial"

const SettingsScreen = () => {
  const [section, setSection] = useState<string>("editor")
  const { isOpen, onClose } = useScreen()
  const bg_colorLeft = useColorModeValue("rgb(231, 231, 231)", "#222731")
  const bg_colorRight = useColorModeValue("white", "#242a36")
  const bg_colorHover = useColorModeValue("rgb(204, 202, 202)", "#333a47")
  const text_color_muted = useColorModeValue("gray.500", "gray.500")
  const finalRef = useRef(null)

  return (
    <Modal size="3xl" finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent h="80vh" ml={5} mr={5}>
      <Grid templateColumns="0.5fr 1fr" w="full" h="full">
        <Flex border="1px" borderColor="rgb(220,220,220, 0.2)" flexDirection="column" bg={bg_colorLeft} roundedTopLeft="md" roundedBottomLeft="md">
          <Box className="w-4 h-4 m-2"></Box>
          <Box ml={5} mr={5} color={useColorModeValue("black", "white")}>
            <Box color={section === "editor"? "white" :""} mb={1} bg={section === "editor"? "#6488ea" :""} onClick={() => {setSection("editor")}} cursor="pointer" p={1} pl={2} _hover={{ bg: section === "editor"? "" :bg_colorHover}} rounded="md">Editor</Box>
            <Box color={section === "tutorial"? "white" :""} mb={1} bg={section === "tutorial"? "#6488ea" :""} onClick={() => {setSection("tutorial")}} cursor="pointer" p={1} pl={2} _hover={{ bg: section === "tutorial"? "" :bg_colorHover}} rounded="md">Tutorial</Box>
          </Box>
          <Flex h="full" alignItems="flex-end">
            <Text color={text_color_muted} m={2}>v2.0</Text>
          </Flex>
        </Flex>

        <Flex border="1px" borderColor="rgb(220,220,220, 0.2)" borderLeftColor="rgb(220,220,220, 0)" flexDirection="column" bg={bg_colorRight} roundedTopRight="md" roundedBottomRight="md">
          <Flex justifyContent="flex-end">
            <svg onClick={onClose} className="w-4 h-4 m-2 hover:fill-CornflowerBlue cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" fill="gray"><path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z"/></svg>
          </Flex>
          <Box ml={5} maxH="80vh" overflow="scroll" overflowX="hidden">
          {
            {
              "editor": <Editor />,
              "tutorial": <Tutorial />,
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