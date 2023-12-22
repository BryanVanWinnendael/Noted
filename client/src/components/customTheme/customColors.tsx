import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogOverlay, Box, Button, Flex, Input, Tag, TagCloseButton, TagLabel, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import ColorPicker from 'components/customTheme/colorPicker'
import { useSettings } from 'contexts/SettingsContext'
import { getStyle, THEME_DARK_GRAY } from 'styling'
import { utils } from 'utils'
import { useEffect, useRef, useState } from 'react'
import { Theme } from "types"

type keyTypes = "backgroundColor" | "secondaryBackgroundColor" | "textColor" | "iconColor" | "accentColor"


const CustomColors = () => {
  const [colors, setColors] = useState<Theme | undefined>()
  const cancelRef = useRef()
  const { setTheme, theme, saveThemeToFile, exportTheme, importTheme, themePath, removeThemePath, addThemeToEditor, customThemes } = useSettings()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [themeName, setThemeName] = useState<string>("")
  const [inValidName, setInValidName] = useState<boolean>(false)
  const toast = useToast()

  const accent_color = getStyle()?.accentColor || "#6488ea"

  const bg_colorRight_chakra = useColorModeValue("white", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra


  const onChange = (key: keyTypes, color: string) => {
    if (!colors) return
    const newColors: Theme = {...colors}
    newColors[key] = color
    setColors(newColors)
    localStorage.setItem("customTheme", JSON.stringify(newColors))
    setTheme(newColors)
  }

  const reset = () => {
    localStorage.setItem("customTheme", JSON.stringify(THEME_DARK_GRAY))
    setColors(THEME_DARK_GRAY)
    setTheme(THEME_DARK_GRAY)
  }

  const handleExport = () => {
    exportTheme()
  }

  const handleImport = () => {
    importTheme()
  }

  const handleRemovePath = () => {
    removeThemePath()
  }

  const handleSave = () => {
    saveThemeToFile()
  }

  const handleSaveThemeAs = () => {
    if (!themeName || !colors) return setInValidName(true)
    if (Object.keys(customThemes).includes(themeName)) return setInValidName(true)
    addThemeToEditor(themeName, colors)
    toast({
      title: `Theme ${themeName} saved successfully`,
      status: "success",
      isClosable: true,
    })
    setThemeName("")
    onClose()
    
  }

  useEffect(() => {
    setColors(getStyle())
  }, [theme])

  return (
    <Box>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg={bg_color} color={utils.getTextColor(bg_color)}>
          <AlertDialogBody>
            <Input 
            value={themeName}
            onChange={e => {
              setInValidName(false)
              setThemeName(e.target.value)}
            }
            onKeyPress={e=> {
              if (e.key === 'Enter') {
                handleSaveThemeAs()
              }
            }}
            isInvalid={inValidName}
            focusBorderColor={inValidName ? "red.300" : accent_color}
            errorBorderColor='red.300'
            placeholder="Choose a name to save this theme as." />
            {inValidName && <Text mt={1} color="red.200">Name is already in use or in invalid</Text>}
          </AlertDialogBody>
          </AlertDialogContent>
      </AlertDialog>
      <Flex gap={4}>
        <Button color={utils.getTextColor(accent_color)} onClick={handleImport} _hover={{ backgroundColor: accent_color, opacity : 0.8 }} h={8} bg={accent_color}>Import</Button>
        {theme &&  <Button onClick={handleExport} _hover={{ opacity : 0.6 }} h={8} borderColor={accent_color} variant="outline">Export</Button> }
        <Button color={utils.getTextColor(accent_color)} onClick={onOpen} _hover={{ backgroundColor: accent_color, opacity : 0.8 }} h={8} bg={accent_color}>Save</Button>
      </Flex>
      <Text mt={1} color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
        Import/ export a theme or save the theme to your editor themes.
      </Text>

      {(themePath && colors ) && 
      <Flex mt={4} gap={2}>
        <Text color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
          Theme path: 
        </Text>
        <Tag
          size={"sm"}
          key={themePath}
          borderRadius='full'
          variant='solid'
          bg={colors.accentColor}
          color={utils.getTextColor(colors.accentColor)}
        >
          <TagLabel>{themePath}</TagLabel>
          <TagCloseButton onClick={handleRemovePath}/>
        </Tag>
      </Flex>}

      <Text mt={4} mb={2} fontSize='xl'>Customize theme</Text>
      {colors && 
        <Box> 
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Background color: </Text>
            <Box mr={5}><ColorPicker keyType="backgroundColor" onChange={onChange} givenColor={colors.backgroundColor}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Secondary background color: </Text>
            <Box mr={5}><ColorPicker keyType="secondaryBackgroundColor" onChange={onChange} givenColor={colors.secondaryBackgroundColor}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Text color: </Text>
            <Box mr={5}><ColorPicker keyType="textColor" onChange={onChange} givenColor={colors.textColor}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Icon color: </Text>
            <Box mr={5}><ColorPicker keyType="iconColor" onChange={onChange} givenColor={colors.iconColor}/></Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>Accent color: </Text>
            <Box mr={5}><ColorPicker keyType="accentColor" onChange={onChange} givenColor={colors.accentColor}/></Box>
          </Flex>
        </Box>
      }
      <Button onClick={reset} _hover={{ opacity : 0.6 }} h={8} borderColor={accent_color} variant="outline">Reset</Button>

      {themePath &&
      <>
        <Flex gap={4}>
          <Button color={utils.getTextColor(accent_color)} onClick={handleSave} _hover={{ backgroundColor: accent_color, opacity : 0.8 }} h={8} bg={accent_color}>Save</Button>
        </Flex>
        <Text mt={2} color={utils.getMutedTextColor(utils.getTextColor(bg_color))}>
         Save the current theme to your stored theme file or reset.
        </Text>
      </>
      }
    </Box>
  )
}

export default CustomColors