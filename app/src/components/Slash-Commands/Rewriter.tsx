import { Box, Button, Textarea } from "@chakra-ui/react"
import useColors from "hooks/useColors"
import { useState } from "react"
import { utils } from "utils/index"
import RewrittenText from "./RewrittenText"

const rewriteText = async (text: string): Promise<{ text: string }> => {
  const url = process.env.REACT_APP_REWRITER_URL + "/api/rewrite"
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
  return res.json()
}

const Rewriter = () => {
  const { getAccentColor, getBorderColor } = useColors()
  const [text, setText] = useState<string>("")
  const [rewrittenText, setRewrittenText] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const border_color = getBorderColor()

  const accent_color = getAccentColor()

  const handleRewrite = () => {
    setLoading(true)
    rewriteText(text).then((res) => {
      setRewrittenText(res.text)
    })
  }

  return (
    <Box>
      {!loading ? (
        <>
          <Textarea
            borderColor={border_color}
            mb={2}
            className="h-4"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            placeholder="Enter text to rewrite"
          />
          <Button
            color={utils.getTextColor(accent_color)}
            onClick={handleRewrite}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
            w="full"
          >
            Rewrite
          </Button>
        </>
      ) : (
        <RewrittenText text={rewrittenText} />
      )}
    </Box>
  )
}

export default Rewriter
