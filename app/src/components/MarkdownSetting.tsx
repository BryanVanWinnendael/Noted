import { Flex, Box, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import CustomSwitch from "./CustomSwitch";

const MarkdownSetting = () => {
  const { saveSettings, markdown } = useSettingsStore();
  const { mutedTextColor } = useColors();

  const handleMarkdown = () => {
    saveSettings("markdown", !markdown);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Markdown editor</Text>
        <Text color={mutedTextColor}>Switch to markdown style notes</Text>
      </Box>
      <CustomSwitch
        isChecked={markdown}
        onChange={handleMarkdown}
        id="markdown"
      />
    </Flex>
  );
};

export default MarkdownSetting;
