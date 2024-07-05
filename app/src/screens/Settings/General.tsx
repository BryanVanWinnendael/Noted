import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { utils } from "utils";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MyWindow } from "types";
import { useSettings } from "contexts/SettingsContext";
import CustomSwitch from "components/CustomSwitch";
import useColors from "hooks/useColors";
import { APP_VERSION } from "utils/constants";
import { useWorkspace } from "contexts/WorkspaceContext";
import useUpdate from "hooks/useUpdate";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const General = () => {
  const { handleCheckUpdate, loadingUpdates } = useUpdate();
  const { getAccentColor, getTextColor, getMutedTextColor } = useColors();
  const { saveSettings, checkUpdates } = useSettings();
  const { setNewVersion } = useWorkspace();

  const text_color = getTextColor();
  const muted_text_color = getMutedTextColor();
  const accent_color = getAccentColor();

  const handleLink = (link: string) => {
    invoke("openBrowser", link);
  };

  const changeCheckUpdates = () => {
    saveSettings("check_updates", !checkUpdates);
  };

  return (
    <Box color={text_color}>
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
              color={accent_color}
            >
              Read changelog <ExternalLinkIcon mx="2px" />
            </Text>
          </Box>

          <Button
            color={utils.getTextColor(accent_color)}
            onClick={handleCheckUpdate}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
            isLoading={loadingUpdates}
          >
            Check for updates
          </Button>
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">What's new</Text>
            <Text color={muted_text_color}>
              Read What's new in {APP_VERSION}
            </Text>
          </Box>

          <Button
            color={utils.getTextColor(accent_color)}
            onClick={() => setNewVersion(true)}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
          >
            Read
          </Button>
        </Flex>
        <Flex alignItems="center" justify="space-between">
          <Box>
            <Text fontWeight="semibold">Check for updates on launch</Text>
            <Text color={muted_text_color}>
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
            <Text color={muted_text_color}>Learn how to use Noted</Text>
          </Box>

          <Button
            color={utils.getTextColor(accent_color)}
            onClick={() => handleLink("https://write-noted.vercel.app/docs")}
            _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
            h={8}
            bg={accent_color}
          >
            Open
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default General;
