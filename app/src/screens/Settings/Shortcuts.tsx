import { Box, Kbd, Flex, Stack, Text } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { Fragment } from "react";
import shortcuts from "utils/shortcuts.json";

interface ShortcutType {
  name: string;
  description: string;
  hotkey: string[];
}

const Shortcuts = () => {
  const { textColor, mutedTextColor, secondaryBackgroundColor } =
    useColors();

  return (
    <Box color={textColor}>
      <Text fontSize="3xl" mb={4}>
        Shortcuts
      </Text>
      <Stack mr={5} gap={3}>
        {shortcuts.map((shortcut: ShortcutType, index: number) => (
          <Flex alignItems="center" justify="space-between" key={index}>
            <Box>
              <Text fontWeight="semibold">{shortcut.name}</Text>
              <Text color={mutedTextColor}>{shortcut.description}</Text>
            </Box>
            <span>
              {shortcut.hotkey.map((key, index) => (
                <Fragment key={index}>
                  <Kbd bg={secondaryBackgroundColor} color={textColor}>
                    {key}
                  </Kbd>
                  {index < shortcut.hotkey.length - 1 && " + "}
                </Fragment>
              ))}
            </span>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Shortcuts;
