import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, SimpleGrid, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { getStyle } from 'styling'
import { useSettings } from 'contexts/SettingsContext'
import { useEffect, useRef, useState } from 'react'
import { Theme } from 'types'

const Card = ({ name, colors, deletable }: { name: string, colors: Theme, deletable: boolean}) => {
  const { deleteCustomTheme, addThemeToEditor } = useSettings()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sortedColors, setSortedColors] = useState<Theme>()
  const cancelRef = useRef()
  const toast = useToast()

  const bg_color_chakra = useColorModeValue("white", "#1A202C")
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra 

  const text_color_chakra = useColorModeValue("black", "white")
  const text_color = getStyle()?.textColor || text_color_chakra

  const bg_colorLeft_chakra = useColorModeValue("#E7E7E7", "#222731")
  const bg_colorLeft = getStyle()?.secondaryBackgroundColor || bg_colorLeft_chakra

  const handleDelete = () => {  
    deleteCustomTheme(name)
    onClose()
  }

  const handleDownload = () => {
    const res = addThemeToEditor(name, colors)

    if (res) {
      toast({
        title: `Theme ${name} saved successfully`,
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
    const orderOfKeys: string[] = ['backgroundColor', 'secondaryBackgroundColor', 'textColor', "iconColor", "accentColor"]
    
    const reorderedObject: any = {}
    orderOfKeys.forEach((key: string) => {
      reorderedObject[key] = colors[key]
    })
    setSortedColors(reorderedObject)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <Box bg={colors.backgroundColor} rounded={'md'} p={2}>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={bg_color} color={text_color}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Theme {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button _hover={{ opacity : 0.6 }} borderColor={bg_colorLeft} variant="outline" ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Flex justifyContent="space-between" alignItems="center" bg={colors.secondaryBackgroundColor} rounded={'md'} py={2} px={3}  mb={2}>
        <Text color={colors.textColor} fontSize='3xl'>{name}</Text>
        {deletable ? <IconButton onClick={onOpen} _hover={{ opacity: 0.8 }} _active={{ opacity: 0.8 }} aria-label='Search database' bg={colors.backgroundColor} icon={ <DeleteIcon color={colors.iconColor}/>} />
        : <IconButton onClick={handleDownload} _hover={{ opacity: 0.8 }} _active={{ opacity: 0.8 }} aria-label='Search database' bg={colors.backgroundColor} icon={ <DownloadIcon color={colors.iconColor}/>} />}
        
      </Flex>
      {sortedColors && 
        <SimpleGrid columns={3} gap={2} p={1}>
          {Object.keys(sortedColors).map((key, index) => {
            return (
              <Box key={index}
                background={sortedColors[key as keyof Theme]}
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
      }
    </Box>
  )
}
// colors[key as keyof Theme]
export default Card