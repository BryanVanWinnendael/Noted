import { Button, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import useColors from "hooks/useColors";

const CopyButton = ({ text }: { text: string }) => {
  const { accentColor, textColor } = useColors();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button
      mx={2}
      color={textColor}
      onClick={copyToClipboard}
      _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
      h={8}
      bg={accentColor}
    >
      Copy
    </Button>
  );
};

const RewrittenText = ({ text }: { text: string }) => {
  const scrollBoxRef = useRef<HTMLParagraphElement>(null);
  const [displayResponse, setDisplayResponse] = useState<string>("");
  const [completedTyping, setCompletedTyping] = useState<boolean>(false);

  const scrollToBottom = () => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = text;

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));
      scrollToBottom();

      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
        scrollToBottom();
      }
    }, 5);

    return () => clearInterval(intervalId);
  }, [text]);

  return text ? (
    <Text ref={scrollBoxRef} maxH={200} overflowY="scroll" maxW={400}>
      {" "}
      {displayResponse}
      {!completedTyping ? <Cursor /> : <CopyButton text={text} />}
    </Text>
  ) : (
    <Text>No text</Text>
  );
};

export default RewrittenText;
