import { Flex, Box, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import CustomSwitch from "./CustomSwitch";

const EditorTitle = () => {
  const { saveSettings, editorTitle } = useSettingsStore();
  const { mutedTextColor } = useColors();

  const handleGlassBackground = () => {
    saveSettings("editor_title", !editorTitle);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Editor title</Text>
        <Text color={mutedTextColor}>
          Enable or disable the title for the editor
        </Text>
      </Box>
      <CustomSwitch
        isChecked={editorTitle}
        onChange={handleGlassBackground}
        id="editorTitle"
      />
    </Flex>
  );
};

export default EditorTitle;
