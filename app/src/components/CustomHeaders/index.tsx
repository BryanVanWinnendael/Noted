import { Box, Flex, Text } from "@chakra-ui/react";
import CustomSwitch from "components/CustomSwitch";
import CustomColors from "components/Custom-Headers/CustomColors";
import { useSettings } from "contexts/SettingsContext";
import useColors from "hooks/useColors";

const Index = () => {
  const { mutedTextColor } = useColors();
  const { headerColorsEnabled, saveSettings } = useSettings();

  const handleChangeToggle = () => {
    saveSettings("header_colors_enabled", !headerColorsEnabled);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
        <Box>
          <Text fontWeight="semibold">Rainbow colors</Text>
          <Text color={mutedTextColor}>
            Enable or disable custom rainbow colors for headers
          </Text>
        </Box>
        <CustomSwitch
          isChecked={headerColorsEnabled}
          onChange={handleChangeToggle}
          id="customHeadersEnabled"
        />
      </Flex>
      {headerColorsEnabled && <CustomColors />}
    </Box>
  );
};

export default Index;
