import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { useState } from "react";
import RewrittenText from "./RewrittenText";
import { Spinner } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import { TranslateText } from "lib/actions/ai/translate";

const Translater = () => {
  const { translateLanguage } = useSettingsStore();
  const { accentColor, borderColor, textColor } = useColors();
  const [text, setText] = useState<string>("");
  const [rewrittenText, setRewrittenText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRewrite = async () => {
    setLoading(true);
    const res = await TranslateText(text, translateLanguage);
    if (res) setRewrittenText(res);
    setLoading(false);
  };

  return (
    <Box minW={100} p={2}>
      {!rewrittenText && !loading ? (
        <>
          <Textarea
            borderColor={borderColor}
            mb={2}
            className="h-4"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Enter text to translate"
          />
          <Button
            color={textColor}
            onClick={handleRewrite}
            _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
            h={8}
            bg={accentColor}
            w="full"
          >
            Translate
          </Button>
        </>
      ) : loading ? (
        <Flex justifyContent="center" alignItems="center" h="full" w="full">
          <Spinner />{" "}
        </Flex>
      ) : (
        <RewrittenText text={rewrittenText} />
      )}
    </Box>
  );
};

export default Translater;
