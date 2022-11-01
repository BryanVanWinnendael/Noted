import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { FileProvider } from "contexts/FileContext"
import { ScreenProvider } from "contexts/SettingsScreenContext"
import { switchTheme } from "styling/SwitchStyle"
import App from "./App"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: { Switch: switchTheme },
  fonts: {
    heading: `Poppins`,
    body: `Poppins`,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ScreenProvider>
        <FileProvider>
          <App/>
        </FileProvider>
      </ScreenProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
