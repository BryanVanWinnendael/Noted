import { Box, Text, Divider, Select, useColorMode, Flex, useColorModeValue, Switch  } from "@chakra-ui/react"
import { useFile } from "contexts/FileContext"
import { FileTypeContext } from "types"
import { useEffect, useState } from "react"

const Editor = () => {
  const [theme, setTheme] = useState<string>("light")
  const [sideToolbar, setSideToolbar] = useState<boolean>(false)
  const { toggleColorMode } = useColorMode()
  const text_color_muted = useColorModeValue("gray.500", "gray.500")
  const { setInlineToolbar, inlineToolbar } = useFile() as FileTypeContext
  

  const changeTheme = (e: any) => {
    toggleColorMode()
    if (e.target.value === "dark") {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    }
    else{
      setTheme("light")
      localStorage.setItem("theme", "light")
    }
  }

  const changeSideToolbar = () => {
    const flag: boolean = !sideToolbar
    const text_flag: string = String(flag)
    localStorage.setItem("sidetoolbar", text_flag)
    setSideToolbar(!sideToolbar)
  }    
  
  const changeInlineToolbar = () => {
    const flag: boolean = !inlineToolbar
    const text_flag: string = String(flag)
    localStorage.setItem("inlinetoolbar", text_flag)
    setInlineToolbar(!inlineToolbar)
  } 

  useEffect (() => {
    localStorage.getItem("theme") === "dark" ? setTheme("dark") : setTheme("light")
    localStorage.getItem("sidetoolbar") === "false" ? setSideToolbar(false) : setSideToolbar(true)
    localStorage.getItem("inlinetoolbar") === "false" ? setInlineToolbar(false) : setInlineToolbar(true)
  }, [])

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mr={5}>
        <Box>
          <Text fontWeight="semibold">
            Base color scheme
          </Text>
          <Text color={text_color_muted}>
            Choose default color scheme.
          </Text>
        </Box>
        <Select onChange={changeTheme} placeholder="Light" w="100px" h="30px">
          <option selected={theme === "dark"? true:false} value="dark">Dark</option>
        </Select>
      </Flex>
      <Divider mb={2} mt={2}/>
      <Flex justifyContent="space-between" alignItems="center" mr={5}>
        <Box>
          <Text fontWeight="semibold">
            Side Toolbar
          </Text>
          <Text color={text_color_muted}>
            Enable or disable side toolbar.
          </Text>
        </Box>
        <Switch isChecked={sideToolbar} onChange={changeSideToolbar} id="sidetoolbar" colorScheme="blue"/>
      </Flex>
      <Divider mb={2} mt={2}/>
      <Flex justifyContent="space-between" alignItems="center" mr={5}>
        <Box>
          <Text fontWeight="semibold">
            Inline Toolbar
          </Text>
          <Text color={text_color_muted}>
            Enable or disable inline toolbar.
          </Text>
        </Box>
        <Switch isChecked={inlineToolbar} onChange={changeInlineToolbar} id="inlinetoolbar" colorScheme="blue"/>
      </Flex>
    </Box>
  )
}

export default Editor