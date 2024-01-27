import {
  Box,
  Text,
  Divider,
  Flex,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Icon,
  Stack,
} from "@chakra-ui/react"
import { utils } from "utils"
import CustomTheme from "components/Custom-Theme"
import CustomHeaders from "components/Custom-Headers"
import { FaPalette } from "react-icons/fa"
import GlassChooser from "components/GlassChooser"
import { GiCrackedGlass } from "react-icons/gi"
import useColors from "hooks/useColors"
import Compact from "components/Compact"

const Editor = () => {
  const { getSecondaryBackgroundColor, getAccentColor } = useColors()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const accent_color = getAccentColor()

  return (
    <Box>
      <Text fontSize="3xl">Appearance</Text>
      <Divider mb={4} />
      <Stack gap={3} mr={5} mb={4}>
        <Box boxShadow="md" rounded="md">
          <Accordion allowMultiple defaultIndex={[0]}>
            <AccordionItem border={0}>
              <AccordionButton
                fill={utils.getTextColor(bg_color)}
                _expanded={{
                  bg: utils.getTransparent(0.2, accent_color),
                  fill:
                    utils.getTextColor(accent_color) === "#fff"
                      ? utils.getLighterColor("0.9", accent_color)
                      : utils.getDarkerColor("0.1", accent_color),
                  color:
                    utils.getTextColor(accent_color) === "#fff"
                      ? utils.getLighterColor("0.9", accent_color)
                      : utils.getDarkerColor("0.1", accent_color),
                }}
                border={0}
                _hover={{
                  bg: utils.getDarkerColor("0.03", bg_color),
                  color: utils.getTextColor(
                    utils.getDarkerColor("0.1", bg_color),
                  ),
                }}
                rounded="md"
              >
                <Flex
                  gap={2}
                  alignItems="center"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  <Icon as={FaPalette} w={5} h={5} />
                  <Text fontSize="xl">Theme</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <CustomTheme />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border={0}>
              <AccordionButton
                fill={utils.getTextColor(bg_color)}
                _expanded={{
                  bg: utils.getTransparent(0.2, accent_color),
                  fill:
                    utils.getTextColor(accent_color) === "#fff"
                      ? utils.getLighterColor("0.9", accent_color)
                      : utils.getDarkerColor("0.1", accent_color),
                  color:
                    utils.getTextColor(accent_color) === "#fff"
                      ? utils.getLighterColor("0.9", accent_color)
                      : utils.getDarkerColor("0.1", accent_color),
                }}
                border={0}
                _hover={{
                  fill: utils.getTextColor(
                    utils.getDarkerColor("0.1", bg_color),
                  ),

                  bg: utils.getDarkerColor("0.03", bg_color),
                  color: utils.getTextColor(
                    utils.getDarkerColor("0.1", bg_color),
                  ),
                }}
                rounded="md"
              >
                <Flex
                  gap={2}
                  alignItems="center"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  <svg
                    width="2rem"
                    height="2rem"
                    viewBox="-5 -7 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin"
                  >
                    <path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm9.52.779H10V3h3.36v7h-1.84V4.779z" />
                  </svg>
                  <Text fontSize="xl">Headers</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <CustomHeaders />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border={0}>
              <AccordionButton
                fill={utils.getTextColor(bg_color)}
                _expanded={{
                  bg: utils.getTransparent(0.2, accent_color),
                  fill:
                    utils.getTextColor(accent_color) === "#fff"
                      ? utils.getLighterColor("0.9", accent_color)
                      : utils.getDarkerColor("0.1", accent_color),
                  color:
                    utils.getTextColor(accent_color) === "#fff"
                      ? utils.getLighterColor("0.9", accent_color)
                      : utils.getDarkerColor("0.1", accent_color),
                }}
                border={0}
                _hover={{
                  bg: utils.getDarkerColor("0.03", bg_color),
                  color: utils.getTextColor(
                    utils.getDarkerColor("0.1", bg_color),
                  ),
                }}
                rounded="md"
              >
                <Flex
                  gap={2}
                  alignItems="center"
                  as="span"
                  flex="1"
                  textAlign="left"
                >
                  <GiCrackedGlass width="2rem" height="2rem" />
                  <Text fontSize="xl">Glassy</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <GlassChooser />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Stack>

      <Text fontSize="3xl">Settings</Text>
      <Divider mb={4} />
      <Compact />
    </Box>
  )
}

export default Editor
