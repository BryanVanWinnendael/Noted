import { Box, Text, Divider, Flex, useColorModeValue, Switch, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Icon  } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { getStyle } from "styling"
import { utils } from "utils"
import CustomTheme from "components/customTheme"
import CustomHeaders from "components/customHeaders"
import { FaPalette } from "react-icons/fa"

const Editor = () => {
  const bg_colorRight_chakra = useColorModeValue("#fff", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  const accent_color = getStyle()?.accentColor || "#6488ea"

  const { setSideToolbar , sideToolbar, setInlineToolbar, inlineToolbar } = useSettings()
  

  const changeSideToolbar = () => {
    const flag: boolean = !sideToolbar
    const text_flag: string = String(flag)
    localStorage.setItem("sidetoolbar", text_flag)
    setSideToolbar(flag)
  }    
  
  const changeInlineToolbar = () => {
    const flag: boolean = !inlineToolbar
    const text_flag: string = String(flag)
    localStorage.setItem("inlinetoolbar", text_flag)
    setInlineToolbar(!inlineToolbar)
  } 

  return (
    <Box>
      <Text fontSize='3xl'>
        Appearance
      </Text>
      <Divider mb={4}/>
      <Box boxShadow='md' rounded='md' mr={4} mb={4}>
        <Accordion allowMultiple  defaultIndex={[0]}>
          <AccordionItem border={0}>
            <AccordionButton fill={utils.getTextColor(bg_color)} _expanded={{bg: utils.getTransparent(0.2, accent_color), fill: utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color), color: utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color) }} border={0} _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }} rounded='md'>
              <Flex gap={2} alignItems="center" as="span" flex='1' textAlign='left'>
                <Icon as={FaPalette} w={5} h={5}/>
                <Text fontSize='xl'>Theme</Text>
              </Flex>
              <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomTheme/>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border={0}>
            <AccordionButton fill={utils.getTextColor(bg_color)} _expanded={{bg: utils.getTransparent(0.2, accent_color), fill: utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color), color: utils.getTextColor(accent_color) === "#fff" ? utils.getLighterColor("0.9", accent_color) : utils.getDarkerColor("0.1", accent_color) }} border={0} _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }} rounded='md'>
              <Flex gap={2} alignItems="center" as="span" flex='1' textAlign='left'>
                <svg width="2rem" height="2rem" viewBox="-5 -7 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className="jam jam-header-1"><path d="M2 4h4V1a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0V6H2v3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v3zm9.52.779H10V3h3.36v7h-1.84V4.779z" /></svg>
                <Text fontSize='xl'>Headers</Text>
              </Flex>
              <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel pb={4}>
              <CustomHeaders/>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Text fontSize='3xl'>Toolbar</Text>
      <Divider mb={4}/>
      <Flex mb={5} direction="column">
        <Flex justifyContent="space-between" alignItems="center" mr={5}>
          <Box>
            <Text fontWeight="semibold">
              Side Toolbar
            </Text>
            <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
              Enable or disable side toolbar.
            </Text>
          </Box>
          <Switch sx={{ '.css-j1l0qk[aria-checked=true], .css-j1l0qk[data-checked]': { backgroundColor: accent_color }}} isChecked={sideToolbar} onChange={changeSideToolbar} id="sidetoolbar"/>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
          <Box>
            <Text fontWeight="semibold">
              Inline Toolbar
            </Text>
            <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
              Enable or disable inline toolbar.
            </Text>
          </Box>
          <Switch sx={{ '.css-j1l0qk[aria-checked=true], .css-j1l0qk[data-checked]': { backgroundColor: accent_color }}} isChecked={inlineToolbar} onChange={changeInlineToolbar} id="inlinetoolbar"/>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Editor