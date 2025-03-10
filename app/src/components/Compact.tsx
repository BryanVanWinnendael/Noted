import { Flex, Box, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import CustomSwitch from "./CustomSwitch";

const Compact = () => {
  const { saveSettings, compactMode } = useSettingsStore();
  const { mutedTextColor } = useColors();

  const handleGlassBackground = () => {
    saveSettings("compact_mode", !compactMode);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Compact mode</Text>
        <Text color={mutedTextColor}>
          Enable or disable compact mode for the app
        </Text>
      </Box>
      <CustomSwitch
        isChecked={compactMode}
        onChange={handleGlassBackground}
        id="compactMode"
      />
    </Flex>
  );
};

export default Compact;
