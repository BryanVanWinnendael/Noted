import { DeleteIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, IconButton, SimpleGrid, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { getStyle } from 'styling'
import { utils } from 'utils'
import { useSettings } from 'contexts/SettingsContext'
import { useRef } from 'react'
import { Theme } from 'types'

const Card = ({ name, colors }: { name:string, colors: Theme }) => {
  const { deleteCustomTheme } = useSettings()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

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
        <IconButton onClick={onOpen} _hover={{ opacity: 0.8 }} _active={{ opacity: 0.8 }} aria-label='Search database' bg={colors.backgroundColor} icon={ <DeleteIcon color={colors.iconColor}/>} />
      </Flex>

      <SimpleGrid columns={3} gap={2} p={1}>
        {Object.keys(colors).map((key, index) => {
          return (
            <Box key={index}
              background={colors[key as keyof Theme]}
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
      
    </Box>
  )
}
// colors[key as keyof Theme]
export default Card