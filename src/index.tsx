import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { FileProvider } from './contexts/FileContext'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
// const root: any = ReactDOM.createRoot<>()

const theme = extendTheme({
  fonts: {
    heading: `Poppins`,
    body: `Poppins`,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <FileProvider>
        <App/>
      </FileProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
