import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MyWindow } from "types";
import { useSettingsStore } from "stores/SettingsStore";
import CustomSwitch from "components/CustomSwitch";
import useColors from "hooks/useColors";
import { APP_VERSION } from "utils/constants";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useUpdate from "hooks/useUpdate";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const General = () => {
  const { handleCheckUpdate, loadingUpdates } = useUpdate();
  const { accentColor, textColor, mutedTextColor } = useColors();
  const { saveSettings, checkUpdates } = useSettingsStore();
  const { setNewVersion } = useWorkspaceStore();

  const handleLink = (link: string) => {
    invoke("openBrowser", link);
  };

  const changeCheckUpdates = () => {
    saveSettings("check_updates", !checkUpdates);
  };

  return (
    <Box color={textColor}>
      <Text fontSize="3xl" mb={4}>
        General
      </Text>
      <Stack mr={5} gap={3}>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Current version: {APP_VERSION}</Text>
            <Text
              onClick={() =>
                handleLink(
                  "https://github.com/BryanVanWinnendael/Noted/releases/latest",
                )
              }
              cursor="pointer"
              color={accentColor}
            >
              Read changelog <ExternalLinkIcon mx="2px" />
            </Text>
          </Box>

          <Button
            color={textColor}
            onClick={handleCheckUpdate}
            _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
            h={8}
            bg={accentColor}
            isLoading={loadingUpdates}
          >
            Check for updates
          </Button>
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">What's new</Text>
            <Text color={mutedTextColor}>Read What's new in {APP_VERSION}</Text>
          </Box>

          <Button
            color={textColor}
            onClick={() => setNewVersion(true)}
            _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
            h={8}
            bg={accentColor}
          >
            Read
          </Button>
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Check for updates on launch</Text>
            <Text color={mutedTextColor}>
              Get notified when a new version is available
            </Text>
          </Box>

          <CustomSwitch
            isChecked={checkUpdates ?? true}
            onChange={changeCheckUpdates}
            id="checkUpdates"
          />
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Help</Text>
            <Text color={mutedTextColor}>Learn how to use Noted</Text>
          </Box>

          <Button
            color={textColor}
            onClick={() => handleLink("https://write-noted.vercel.app/docs")}
            _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
            h={8}
            bg={accentColor}
          >
            Open
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default General;
