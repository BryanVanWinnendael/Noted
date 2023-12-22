import MenuBar from "./MenuBar"
import { useFile } from "contexts/FileContext"
import { MyWindow } from "types"
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Grid, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { getStyle } from "styling"  
import FileTabs from "components/fileTabs"
import { useRef } from "react"
import { utils } from "utils"

declare let window: MyWindow

const Navbar = () => {
    const ipcRenderer = window.myApp.getIpcRenderer()
    const { file_name, saved } = useFile()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const bg_colorRight_chakra = useColorModeValue("#fff", "#242a36")
    const style_bg = getStyle()?.secondaryBackgroundColor
    const bg_color = style_bg ? utils.getLighterColor("0.02", style_bg): bg_colorRight_chakra

    const accent_color = getStyle()?.accentColor || "#6488ea"
    
    const clickedClose = () => {
        const unsaved = Object.keys(saved).find((key: string, index: number) => {
            return !saved[parseInt(key)] 
        })
        if (unsaved) {
            onOpen()
        } else{
            ipcRenderer.invoke("close-window")
        }
    }

    const clickedMinimize = () => {
        console.log("minimize")
        ipcRenderer.invoke("minimize-window")
    }

    const clickedMaximize = () => {
        console.log("maximize")
        ipcRenderer.invoke("maximize-window")
    }

    return (
        <>
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
                    There are unsaved files: 
                    {Object.keys(saved).map((key: string, index: number) => {
                        return !saved[parseInt(key)] ? <p className="font-bold">{file_name[parseInt(key)]}</p> : null
                    })}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button bg="transparent" _hover={{ opacity: 0.8 }} variant="outline" borderColor={utils.getLighterColor("0.2", bg_color)} color={utils.getTextColor(bg_color)} ref={cancelRef as any} onClick={onClose}>
                    No
                    </Button>
                    <Button onClick={() => ipcRenderer.invoke("close-window")} colorScheme='red' ml={3}>
                    Yes
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <Grid gridTemplateColumns="auto 1fr auto" className="h-fit flex justify-between items-center bg-transparent z-50">
                <Flex className="w-fit" alignItems="center" alignContent="center">
                    <MenuBar />
                </Flex>

                <Flex overflow="auto" flexDirection="row" className="text-gray-600 w-full" pt={2}>
                    <Box maxW="80%" w="fit-content">
                        <FileTabs />
                    </Box>
                    <Box className="nav w-full" h="28px"/>
                </Flex>

                <Flex className="w-fit">
                    <Box onClick={clickedMinimize} fill="gray" _hover={{ fill: accent_color }} className="cursor-pointer" w="fit-content" h="fit-content">
                        <svg  className="w-5 h-5 m-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M3 11h18v2H3z"/></g></svg>
                    </Box>
                    <Box onClick={clickedMaximize} stroke="gray" _hover={{ stroke: accent_color }} className="cursor-pointer" w="fit-content" h="fit-content">
                        <svg className="w-5 h-5 m-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20H4m0 0v-4m0 4 6-6m6-10h4m0 0v4m0-4-6 6"/></svg>
                    </Box>
                    <Box onClick={clickedClose} fill="gray" _hover={{ fill: accent_color }} className="cursor-pointer" w="fit-content" h="fit-content">
                        <svg  className="w-4 h-4 m-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52"><path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z"/></svg>
                    </Box>
                </Flex>
            </Grid>
        </>
        
    )
}

export default Navbar