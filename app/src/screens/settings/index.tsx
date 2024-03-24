import {
  Grid,
  Flex,
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { useRef, useState } from "react"
import Editor from "./Editor"
import { utils } from "utils"
import Themes from "./Themes"
import Market from "./Market"
import General from "./General"
import useColors from "hooks/useColors"
import { useWorkspace } from "contexts/WorkspaceContext"
import Shortcuts from "./Shortcuts"
import Background from "./Background"

const SettingsScreen = () => {
  const {
    getSecondaryBackgroundColor,
    getAccentColor,
    getTextColor,
  } = useColors()
  const [section, setSection] = useState<string>("general")
  const { isOpen, onClose, glassBackground, glassEnabled } = useSettings()
  const { workspace } = useWorkspace()

  const bg_colorLeft = getSecondaryBackgroundColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_colorRight = utils.getLighterColor(
    "0.02",
    secondary_background_color,
  )

  const text_color = getTextColor()

  const accent_color = getAccentColor()

  const isGlassEnabled = glassEnabled && glassBackground.settings

  const finalRef = useRef(null)

  return (
    <Modal
      size="5xl"
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="transparent" />
      <ModalContent h="80vh" ml={5} mr={5} bg={"transparent"}>
        <Grid templateColumns="0.5fr 1fr" w="full" h="full" maxW="full">
          <Flex
            className="glass"
            border="1px"
            borderColor="rgb(220,220,220, 0.2)"
            flexDirection="column"
            bg={
              isGlassEnabled
                ? utils.getGlassBackground(bg_colorLeft)
                : bg_colorLeft
            }
            roundedTopLeft="md"
            roundedBottomLeft="md"
            roundedTopRight={0}
            roundedBottomRight={0}
          >
            <Box m={5}>
              <Box
                mb={1}
                p={1}
                pl={2}
                rounded="md"
                color={
                  section === "general"
                    ? utils.getDarkerColor("0.1", accent_color)
                    : text_color
                }
                bg={
                  section === "general"
                    ? utils.getTransparent(0.2, accent_color)
                    : ""
                }
                onClick={() => {
                  setSection("general")
                }}
                cursor="pointer"
                _hover={{
                  bg: utils.getDarkerColor(
                    "0.03",
                    section === "general"
                      ? utils.getTransparent(0.2, accent_color)
                      : bg_colorLeft,
                  ),
                }}
              >
                General
              </Box>
              {workspace && (
                <>
                  <Box
                    mb={1}
                    p={1}
                    pl={2}
                    rounded="md"
                    color={
                      section === "editor"
                        ? utils.getDarkerColor("0.1", accent_color)
                        : text_color
                    }
                    bg={
                      section === "editor"
                        ? utils.getTransparent(0.2, accent_color)
                        : ""
                    }
                    onClick={() => {
                      setSection("editor")
                    }}
                    cursor="pointer"
                    _hover={{
                      bg: utils.getDarkerColor(
                        "0.03",
                        section === "editor"
                          ? utils.getTransparent(0.2, accent_color)
                          : bg_colorLeft,
                      ),
                    }}
                  >
                    Editor
                  </Box>
                  <Box
                    mb={1}
                    p={1}
                    pl={2}
                    rounded="md"
                    color={
                      section === "background"
                        ? utils.getDarkerColor("0.1", accent_color)
                        : text_color
                    }
                    bg={
                      section === "background"
                        ? utils.getTransparent(0.2, accent_color)
                        : ""
                    }
                    onClick={() => {
                      setSection("background")
                    }}
                    cursor="pointer"
                    _hover={{
                      bg: utils.getDarkerColor(
                        "0.03",
                        section === "background"
                          ? utils.getTransparent(0.2, accent_color)
                          : bg_colorLeft,
                      ),
                    }}
                  >
                    Background
                  </Box>
                  <Box
                    mb={1}
                    p={1}
                    pl={2}
                    rounded="md"
                    color={
                      section === "shortcuts"
                        ? utils.getDarkerColor("0.1", accent_color)
                        : text_color
                    }
                    bg={
                      section === "shortcuts"
                        ? utils.getTransparent(0.2, accent_color)
                        : ""
                    }
                    onClick={() => {
                      setSection("shortcuts")
                    }}
                    cursor="pointer"
                    _hover={{
                      bg: utils.getDarkerColor(
                        "0.03",
                        section === "shortcuts"
                          ? utils.getTransparent(0.2, accent_color)
                          : bg_colorLeft,
                      ),
                    }}
                  >
                    Shortcuts
                  </Box>
                  <Box
                    mb={1}
                    p={1}
                    pl={2}
                    rounded="md"
                    color={
                      section === "themes"
                        ? utils.getDarkerColor("0.1", accent_color)
                        : text_color
                    }
                    bg={
                      section === "themes"
                        ? utils.getTransparent(0.2, accent_color)
                        : ""
                    }
                    onClick={() => {
                      setSection("themes")
                    }}
                    cursor="pointer"
                    _hover={{
                      bg: utils.getDarkerColor(
                        "0.03",
                        section === "themes"
                          ? utils.getTransparent(0.2, accent_color)
                          : bg_colorLeft,
                      ),
                    }}
                  >
                    Custom themes
                  </Box>
                  <Box
                    mb={1}
                    p={1}
                    pl={2}
                    rounded="md"
                    color={
                      section === "market"
                        ? utils.getDarkerColor("0.1", accent_color)
                        : text_color
                    }
                    bg={
                      section === "market"
                        ? utils.getTransparent(0.2, accent_color)
                        : ""
                    }
                    onClick={() => {
                      setSection("market")
                    }}
                    cursor="pointer"
                    _hover={{
                      bg: utils.getDarkerColor(
                        "0.03",
                        section === "market"
                          ? utils.getTransparent(0.2, accent_color)
                          : bg_colorLeft,
                      ),
                    }}
                  >
                    Market
                  </Box>
                </>
              )}
            </Box>
          </Flex>

          <Flex
            color={text_color}
            border="1px"
            borderColor="rgb(220,220,220, 0.2)"
            borderLeftColor="rgb(220,220,220, 0)"
            flexDirection="column"
            className="glass"
            bg={
              isGlassEnabled
                ? utils.getGlassBackground(bg_colorRight)
                : bg_colorRight
            }
            roundedTopRight="md"
            roundedBottomRight="md"
            roundedTopLeft={0}
            roundedBottomLeft={0}
            maxW="full"
            overflow="hidden"
          >
            <Flex justifyContent="flex-end">
              <Box
                cursor="pointer"
                m={2}
                onClick={onClose}
                _hover={{ fill: accent_color }}
                fill="gray"
                w="fit-content"
                h="fit-content"
              >
                <svg
                  width="1rem"
                  height="1rem"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  enable-background="new 0 0 52 52"
                >
                  <path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z" />
                </svg>
              </Box>
            </Flex>
            <Box
              maxW="full"
              minHeight="70vh"
              ml={5}
              maxH="70vh"
              overflow="scroll"
              overflowY="auto"
              overflowX="hidden"
            >
              {
                {
                  general: <General />,
                  editor: <Editor />,
                  background: <Background />,
                  themes: <Themes />,
                  market: <Market />,
                  shortcuts: <Shortcuts />,
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
