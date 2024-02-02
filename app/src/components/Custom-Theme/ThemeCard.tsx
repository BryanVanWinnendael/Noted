import { CheckIcon, DeleteIcon, DownloadIcon } from "@chakra-ui/icons"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { useEffect, useRef, useState } from "react"
import { Theme } from "types"
import useColors from "hooks/useColors"

const ThemeCard = ({
  name,
  colors,
  deletable,
}: {
  name: string
  colors: Theme
  deletable: boolean
}) => {
  const { getBackgroundColor, getTextColor, getSecondaryBackgroundColor } =
    useColors()
  const { deleteCustomTheme, addThemeToEditor, customThemes } = useSettings()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sortedColors, setSortedColors] = useState<Theme>()
  const cancelRef = useRef()
  const toast = useToast()
  const { colorMode, setColorMode } = useColorMode()

  const bg_color = getBackgroundColor()

  const text_color = getTextColor()

  const bg_colorLeft = getSecondaryBackgroundColor()

  const handleDelete = () => {
    deleteCustomTheme(name)
    if (colorMode === name) setColorMode("light")
    onClose()
  }

  const checkThemeDownloaded = () => {
    if (!customThemes) return false

    if (customThemes[name]) return customThemes[name].downloaded
    return false
  }

  const handleDownload = async () => {
    const newThemeObject: Theme = { ...colors }
    newThemeObject.downloaded = true
    const res = await addThemeToEditor(name, newThemeObject)

    if (res) {
      toast({
        title: `Theme ${name} downloaded successfully`,
        status: "success",
        isClosable: true,
      })
    } else {
      toast({
        title: `Theme ${name} already exists`,
        status: "error",
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const orderOfKeys: string[] = [
      "backgroundColor",
      "secondaryBackgroundColor",
      "textColor",
      "iconColor",
      "accentColor",
    ]

    const reorderedObject: any = {}
    orderOfKeys.forEach((key: string) => {
      reorderedObject[key] = colors[key]
    })
    setSortedColors(reorderedObject)
  }, [colors])

  return (
    <Box bg={colors.backgroundColor} rounded={"md"} p={2}>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={bg_color} color={text_color} shadow="md">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Theme {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                _hover={{ opacity: 0.6 }}
                borderColor={bg_colorLeft}
                variant="outline"
                ref={cancelRef as any}
                onClick={onClose}
                color={text_color}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg={colors.secondaryBackgroundColor}
        rounded={"md"}
        py={2}
        px={3}
        mb={2}
      >
        <Text color={colors.textColor} fontSize="3xl">
          {name}
        </Text>
        {deletable ? (
          <Tooltip
            label="Delete theme"
            bg={bg_color}
            color={text_color}
            rounded="md"
          >
            <IconButton
              onClick={onOpen}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
              aria-label="delete theme"
              bg={colors.backgroundColor}
              icon={<DeleteIcon color={colors.iconColor} />}
            />
          </Tooltip>
        ) : checkThemeDownloaded() ? (
          <Tooltip
            label="Downloaded!"
            bg={bg_color}
            color={text_color}
            rounded="md"
          >
            <Flex
              justify="center"
              alignItems="center"
              bg={colors.backgroundColor}
              h="2.5rem"
              w="2.5rem"
              rounded="md"
            >
              <CheckIcon color={colors.accentColor} />
            </Flex>
          </Tooltip>
        ) : (
          <Tooltip
            label="Download theme"
            bg={bg_color}
            color={text_color}
            rounded="md"
          >
            <IconButton
              onClick={handleDownload}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.8 }}
              aria-label="download theme"
              bg={colors.backgroundColor}
              icon={<DownloadIcon color={colors.iconColor} />}
            />
          </Tooltip>
        )}
      </Flex>
      {sortedColors && (
        <SimpleGrid columns={3} gap={2} p={1}>
          {Object.keys(sortedColors).map((key, index) => {
            return (
              <Box
                key={index}
                background={sortedColors[key as keyof Theme] as string}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                border={"1px"}
                borderColor={colors.accentColor}
              />
            )
          })}
        </SimpleGrid>
      )}
    </Box>
  )
}

export default ThemeCard
