import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import ColorPicker from 'components/customTheme/colorPicker'
import { getStyle, getHeaderColors,resetHeaders } from 'styling'
import { utils } from 'utils'
import { useEffect, useState } from 'react'
import { HeaderColors } from "types"
import { useSettings } from 'contexts/SettingsContext'

type keyTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const CustomColors = () => {
  const { setHeaderColors } = useSettings()
  const [colors, setColors] = useState<HeaderColors | false>(false)

  const bg_colorRight_chakra = useColorModeValue("white", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  const accent_color = getStyle()?.accentColor || "#6488ea"

  const onChange = (key: keyTypes , color: string) => {
    if (!colors) return
    const newColors: HeaderColors = {...colors}
    newColors[key] = color
    setColors(newColors)
    setHeaderColors(newColors)
    localStorage.setItem("headerColors", JSON.stringify(newColors))
  }

  const reset = () => {
    if (!colors) return
    const newColors: HeaderColors =  resetHeaders()
    setColors(newColors)
    setHeaderColors(newColors)
  }

  useEffect(() => {
    setColors(getHeaderColors())
  }, [])

  return (
    <Box>
      <Text mt={4} mb={2} fontSize='xl'>Customize headers</Text>
      {colors && 
        <Box> 
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>H1: </Text>
            <Box mr={5}><ColorPicker keyType="h1" onChange={onChange} givenColor={colors.h1}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>H2: </Text>
            <Box mr={5}><ColorPicker keyType="h2" onChange={onChange} givenColor={colors.h2}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>H3: </Text>
            <Box mr={5}><ColorPicker keyType="h3" onChange={onChange} givenColor={colors.h3}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>H4: </Text>
            <Box mr={5}><ColorPicker keyType="h4" onChange={onChange} givenColor={colors.h4}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>H5: </Text>
            <Box mr={5}><ColorPicker keyType="h5" onChange={onChange} givenColor={colors.h5}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>H6: </Text>
            <Box mr={5}><ColorPicker keyType="h6" onChange={onChange} givenColor={colors.h6}/></Box>
          </Flex>
          <Button mt={2} color={utils.getTextColor(accent_color)} onClick={reset} _hover={{ backgroundColor: accent_color, opacity : 0.8 }} h={8} bg={accent_color}>Reset colors</Button>
        </Box>

      }

    </Box>
  )
}

export default CustomColors