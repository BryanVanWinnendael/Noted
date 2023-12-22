import { AddIcon } from "@chakra-ui/icons"
import { useColorModeValue, SkeletonCircle, Flex, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, Text } from "@chakra-ui/react"
import { useFile } from "contexts/FileContext"
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState } from "react"
import { getStyle } from "styling"
import { utils } from "utils"

const Index = () => {
  const { setCurrentTab, currentTab, addTab, file_name, saved, removeTab, tabs } = useFile()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [deleteTabIndex, setDeleteTabIndex] = useState<number>(0)
  
  const accent_color = getStyle()?.accentColor || "#6488ea"
  
  const bg_colorRight_chakra = useColorModeValue("#E7E7E7", "#242a36")
  const style_bg = getStyle()?.secondaryBackgroundColor
  const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

  const handleCloseTab = (index: number) => {
    setDeleteTabIndex(index)
    if (!saved[index]) {
      onOpen()
    } else {
      removeTab(index)
    }
  }


  return (
    <Flex w="full" alignItems="center">
      <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg={bg_color} color={utils.getTextColor(bg_color)}>
        <AlertDialogHeader>Are you sure you want to quit?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
            <Text>The file <b>{file_name[deleteTabIndex]}</b> is unsaved</Text>
            <Text>Do you want to close it?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
            <Button bg="transparent" _hover={{ opacity: 0.8 }} variant="outline" borderColor={utils.getLighterColor("0.2", bg_color)} color={utils.getTextColor(bg_color)} ref={cancelRef as any} onClick={onClose}>
            No
            </Button>
            <Button onClick={() => {
              removeTab(deleteTabIndex)
              onClose()
            }} colorScheme='red' ml={3}>
            Yes
            </Button>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AnimatePresence mode="popLayout">
        {Object.keys(file_name).map((key, index) => (
          <motion.div
          className="flex min-w-0 overflow-hidden justify-between"
          layout
          animate={{ scale: 1 }}
          key={index}
          >
            <Flex cursor="pointer"
              justifyContent="space-between" 
              minW={0}
              overflow="hidden"
              w={index === currentTab ? "15rem" : "10rem"}
              ml={2} 
              px={2}
              borderRadius={4} h={7} 
              opacity={10} 
              bg={index === currentTab ? utils.getTransparent(100, bg_color) : utils.getTransparent(0.5, bg_color)} 
              color={index === currentTab ? accent_color: utils.getTransparent(0.5, utils.getTextColor(bg_color))} >
                <Flex onClick={() => setCurrentTab(index)} w="full" alignItems="center">
                  {!saved[index] && <SkeletonCircle startColor={accent_color} size="3" marginRight={2} />}
                  {file_name[parseInt(key)]}
                </Flex>
                {(currentTab === index && tabs.length > 1) && 
                  <Flex justifyContent="center" alignItems="center" onClick={() => handleCloseTab(index)} fill={accent_color} _hover={{ fill: accent_color }} className="cursor-pointer" w="fit-content" h="full">
                    <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52"><path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z"/></svg>
                  </Flex>
                }
            </Flex>
          </motion.div>
        ))}
      </AnimatePresence>
      <AddIcon ml={2} onClick={addTab} cursor="pointer" _hover={{ color: accent_color}} />
    </Flex>
  )
}

export default Index