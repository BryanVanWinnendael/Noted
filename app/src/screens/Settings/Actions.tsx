import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MyWindow } from "types";
import useColors from "hooks/useColors";
import { useState } from "react";
import TranslateSetting from "components/TranslateSetting";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const Actions = () => {
  const { accentColor, textColor } = useColors();
  const [key, setKey] = useState<string>(localStorage.getItem("apiKey") || "");

  const handleLink = (link: string) => {
    invoke("openBrowser", link);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    localStorage.setItem("apiKey", e.target.value);
  }

  return (
    <Box color={textColor}>
      <Text fontSize="3xl" mb={4}>
        Actions
      </Text>
      <Stack mr={5} gap={3}>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">API key</Text>
            <Text
              onClick={() =>
                handleLink(
                  "https://console.groq.com/keys",
                )
              }
              cursor="pointer"
              color={accentColor}
            >
             Setup API key <ExternalLinkIcon mx="2px" />
            </Text>
          </Box>

          <Input onChange={handleChange} value={key} width="fit-content" type="password" />
        </Flex>
        <TranslateSetting />
        
      </Stack>
    </Box>
  );
};

export default Actions;
