import Navbar from "components/nav/Navbar"
import MDEditor from "components/editor"
import { useEffect } from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"
import Settings from "screens/settings"

function App() {
  const bg_color = useColorModeValue("white", "#1A202C")

  useEffect (() => {
    document.getElementsByTagName("html")[0].style.backgroundColor = bg_color
    document.getElementsByTagName("html")[0].style.color = "white"
  }, [bg_color])


  return (
    <Box paddingBottom={5} bg={bg_color}>
      <Navbar />
      <Settings />
      <div className="flex h-full ml-5 mr-5 justify-center ">
        <MDEditor />
      </div>
    </Box>
  )
}

export default App
