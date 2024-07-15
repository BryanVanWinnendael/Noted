import { Flex, Box, Text, Stack, Tooltip } from "@chakra-ui/react";
import CustomSwitch from "components/CustomSwitch";
import { useSettings } from "contexts/SettingsContext";
import { GlassComponents } from "types";
import useColors from "hooks/useColors";
import MaterialChooser from "./MaterialChooser";
import { useWorkspace } from "contexts/WorkspaceContext";
import { FaInfoCircle } from "react-icons/fa";

const Index = () => {
  const { platform } = useWorkspace();
  const { glassBackground, saveSettings, glassEnabled } = useSettings();
  const { mutedTextColor, iconColor, backgroundColor, textColor } = useColors();

  const isLinux = platform === "linux";

  const handleChangeToggle = (component: GlassComponents) => {
    const flag: boolean = !glassBackground[component];
    const new_object = { ...glassBackground, [component]: flag };
    saveSettings("glass_background", new_object);
  };

  const handleGlassBackground = () => {
    saveSettings("glass_background_enabled", !glassEnabled);
  };

  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
        <Box>
          <Text fontWeight="semibold">Glass backgrounds</Text>
          <Text color={mutedTextColor}>
            Enable or disable glass effect for components
          </Text>
        </Box>
        <CustomSwitch
          isChecked={glassEnabled}
          onChange={handleGlassBackground}
          id="glassEnabled"
        />
      </Flex>
      {glassEnabled && (
        <Box>
          <Text mt={4} mb={2} fontSize="xl">
            Customize backgrounds
          </Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={mutedTextColor}>
              Settings page
            </Text>
            <CustomSwitch
              isChecked={glassBackground.settings}
              onChange={() => handleChangeToggle("settings")}
              id="glassEnabledSettings"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={mutedTextColor}>
              Editor
            </Text>
            <CustomSwitch
              isChecked={glassBackground.editor}
              onChange={() => handleChangeToggle("editor")}
              id="glassEnabledEditor"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={mutedTextColor}>
              Nav popup
            </Text>
            <CustomSwitch
              isChecked={glassBackground.navBar}
              onChange={() => handleChangeToggle("navBar")}
              id="glassEnabledNavBar"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={mutedTextColor}>
              Widgets
            </Text>
            <CustomSwitch
              isChecked={glassBackground.widgets}
              onChange={() => handleChangeToggle("widgets")}
              id="glassEnabledWidgets"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Flex alignItems="center" gap={2}>
              <Text w="100%" color={mutedTextColor}>
                Window
              </Text>
              {isLinux && (
                <Tooltip
                  placement="bottom"
                  label={"Not available on Linux"}
                  bg={backgroundColor}
                  color={textColor}
                  rounded="md"
                >
                  <Box>
                    <FaInfoCircle color={iconColor} size={15} />
                  </Box>
                </Tooltip>
              )}
            </Flex>

            <CustomSwitch
              disabled={isLinux}
              isChecked={isLinux ? false : glassBackground.window}
              onChange={() => handleChangeToggle("window")}
              id="glassEnabledWindow"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={mutedTextColor}>
              Context menu
            </Text>
            <CustomSwitch
              isChecked={glassBackground.contextMenu}
              onChange={() => handleChangeToggle("contextMenu")}
              id="glassEnabledWindow"
            />
          </Flex>
          {!isLinux && <MaterialChooser />}
        </Box>
      )}
    </Stack>
  );
};

export default Index;
