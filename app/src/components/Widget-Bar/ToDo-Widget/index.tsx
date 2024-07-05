import { Box, Button, Flex, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useWidget } from "contexts/WidgetContext";
import { BiMerge } from "react-icons/bi";
import { utils } from "utils";
import ToDoList from "components/Widget-Bar/ToDo-Widget/ToDoList";
import ToDoForm from "components/Widget-Bar/ToDo-Widget/ToDoForm";
import useColors from "hooks/useColors";

const Index = () => {
  const {
    getAccentColor,
    getIconColor,
    getSecondaryBackgroundColor,
    getTextColor,
  } = useColors();
  const { isConnected, setIsConnected, canConnect, getCompatibleWidget } =
    useWidget();

  const accent_color = getAccentColor();
  const icon_color = getIconColor();
  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);
  const text_color = getTextColor();

  return (
    <Box h="300px">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="xl" color={accent_color} fontWeight="semibold">
          ToDos
        </Text>
        {canConnect() && (
          <Tooltip
            label={
              isConnected
                ? `Connected to ${getCompatibleWidget("todo")}`
                : `Connect to ${getCompatibleWidget("todo")}`
            }
            bg={bg_color}
            color={text_color}
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
                color={isConnected ? accent_color : icon_color}
              />
            </Button>
          </Tooltip>
        )}
      </Flex>
      <Stack>
        <ToDoList />
        <ToDoForm />
      </Stack>
    </Box>
  );
};

export default Index;
