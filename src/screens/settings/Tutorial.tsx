import { Box, Image, Text, Highlight, ListItem, UnorderedList, Kbd, useColorModeValue, Divider } from "@chakra-ui/react"

const Tutorial = () => {
  const text_color_muted = useColorModeValue("gray.500", "gray.500")
  const src_code =  useColorModeValue("https://firebasestorage.googleapis.com/v0/b/portfolio-21d2a.appspot.com/o/l_code.gif?alt=media&token=22b7bf11-a629-4246-a70f-b75f160e2c92", "https://firebasestorage.googleapis.com/v0/b/portfolio-21d2a.appspot.com/o/d_code.gif?alt=media&token=bc130bbb-bf00-4a71-957c-496298bb1bde")
  const src_inline =  useColorModeValue("https://firebasestorage.googleapis.com/v0/b/portfolio-21d2a.appspot.com/o/l_inline.gif?alt=media&token=a3f0abca-a475-4325-a498-b9baf493a5aa","https://firebasestorage.googleapis.com/v0/b/portfolio-21d2a.appspot.com/o/d_inline.gif?alt=media&token=267e3c12-d693-4bde-ae17-e59710c04332")

  return (
    <Box>
      <Text fontWeight="semibold">Code block</Text>
      <Box m={5}>
        <UnorderedList>
          <ListItem>
            <Highlight query="```" styles={{ py: "1", fontWeight: "normal", color: "#6488ea" }}>
              Write ```
            </Highlight>
          </ListItem>
          <ListItem>Choose a language</ListItem>
        </UnorderedList>
      </Box>
      <Text p={2} color={text_color_muted}>Note: When clicking on a language from the list, press <Kbd>backspace</Kbd> once.</Text>
      <Image mt={5} pr={5} src={src_code} />
      <Text mt={2}>List of supported languages:</Text>
      <Box ml={5} color={text_color_muted}>
        <UnorderedList>
          <ListItem>java</ListItem>
          <ListItem>python</ListItem>
          <ListItem>javascript</ListItem>
          <ListItem>c</ListItem>
          <ListItem>cpp</ListItem>
          <ListItem>sql</ListItem>
          <ListItem>csharp</ListItem>
          <ListItem>json</ListItem>
          <ListItem>jsx</ListItem>
          <ListItem>typescript</ListItem>
          <ListItem>yaml</ListItem>
        </UnorderedList>
      </Box>
      <Divider mb={2} mt={2}/>
      <Text fontWeight="semibold">Inline Toolbar</Text>
      <Box m={5}>
        <UnorderedList>
          <ListItem>Write text</ListItem>
          <ListItem>Double click on the text</ListItem>
          <ListItem>Choose style</ListItem>
        </UnorderedList>
      </Box>
      <Image mt={5} pr={5} pb={5} src={src_inline} />
    </Box>
  )
}

export default Tutorial