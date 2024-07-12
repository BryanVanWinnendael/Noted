import { Box, Button, Center, Flex, Stack, Tooltip } from "@chakra-ui/react";
import TimerViewer from "components/Widget-Bar/Clock-Wdiget/TimerViewer";
import TimeViewer from "components/Widget-Bar/Clock-Wdiget/TimeViewer";
import { useWidget } from "contexts/WidgetContext";
import useColors from "hooks/useColors";
import { BiMerge } from "react-icons/bi";

const Index = () => {
  const {
    accentColor,
    iconColor,
    textColor,
    secondaryBackgroundColorLighter
  } = useColors();
  const { isConnected, setIsConnected, canConnect, getCompatibleWidget } =
    useWidget();

  return (
    <Box h="300px">
      <Flex justifyContent="flex-end" alignItems="center">
        {canConnect() && (
          <Tooltip
            label={
              isConnected
                ? `Connected to ${getCompatibleWidget("clock")}`
                : `Connect to ${getCompatibleWidget("clock")}`
            }
            bg={secondaryBackgroundColorLighter}
            color={textColor}
            rounded="md"
            zIndex={10}
          >
            <Button
              bg="transparent"
              w="fit-content"
              h="fit-content"
              _hover={{ bg: "transparent" }}
            >
              <BiMerge
                onClick={() => setIsConnected(!isConnected)}
                color={isConnected ? accentColor : iconColor}
              />
            </Button>
          </Tooltip>
        )}
      </Flex>
      <Stack mt={2} gap={0}>
        <TimeViewer />
        <Center mt={5}>
          <TimerViewer />
        </Center>
      </Stack>
    </Box>
  );
};

export default Index;
