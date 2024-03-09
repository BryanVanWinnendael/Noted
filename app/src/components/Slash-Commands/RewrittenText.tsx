import { Box, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import Cursor from "./Cursor"

const RewrittenText = ({ text }: { text: string }) => {
  const scrollBoxRef = useRef<HTMLParagraphElement>(null)
  const [displayResponse, setDisplayResponse] = useState<string>("")
  const [completedTyping, setCompletedTyping] = useState<boolean>(false)

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollBoxRef.current) {
        scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight
      }
    }

    setCompletedTyping(false)

    let i = 0
    const stringResponse = text

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i))
      scrollToBottom()

      i++

      if (i > stringResponse.length) {
        clearInterval(intervalId)
        setCompletedTyping(true)
      }
    }, 5)

    return () => clearInterval(intervalId)
  }, [text])

  return text ? (
    <Box>
      <Text ref={scrollBoxRef} maxH={200} overflowY="scroll" maxW={400}>
        {" "}
        {displayResponse}
        {!completedTyping && <Cursor />}
      </Text>
    </Box>
  ) : (
    <Text>No text</Text>
  )
}

export default RewrittenText
