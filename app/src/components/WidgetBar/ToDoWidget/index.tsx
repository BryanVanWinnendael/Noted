import { Box, Button, Flex, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useWidget } from "contexts/WidgetContext";
import { BiMerge } from "react-icons/bi";
import ToDoList from "components/Widget-Bar/ToDo-Widget/ToDoList";
import ToDoForm from "components/Widget-Bar/ToDo-Widget/ToDoForm";
import useColors from "hooks/useColors";

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
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="xl" color={accentColor} fontWeight="semibold">
          ToDos
        </Text>
        {canConnect() && (
          <Tooltip
            label={
              isConnected
                ? `Connected to ${getCompatibleWidget("todo")}`
                : `Connect to ${getCompatibleWidget("todo")}`
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
      <Stack>
        <ToDoList />
        <ToDoForm />
      </Stack>
    </Box>
  );
};

export default Index;
