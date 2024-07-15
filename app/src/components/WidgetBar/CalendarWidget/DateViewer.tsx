import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Stack, Tooltip, Text } from "@chakra-ui/react";
import { useWidget } from "contexts/WidgetContext";
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { ToDo } from "types";
import useColors from "hooks/useColors";

const CalendarTodo = () => {
  const { textColor, iconColor, accentColor, secondaryBackgroundColorLighter } =
    useColors();
  const { setShowDateViewer, selectedDate, todos, setTodos, setSelectedDate } =
    useWidget();
  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([]);

  const handleDelete = (name: string) => {
    const newTodos = [...todos];
    if (!selectedDate) return;
    const index = newTodos.findIndex(
      (todo: ToDo) =>
        todo.date === selectedDate.format("DD-MM-YYYY") && name === todo.todo,
    );
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleBack = () => {
    setShowDateViewer(false);
    setSelectedDate(undefined);
  };

  useEffect(() => {
    if (!selectedDate) return;
    const filterdTodos = todos.filter(
      (todo: ToDo) => todo.date === selectedDate.format("DD-MM-YYYY"),
    );
    setFilteredTodos(filterdTodos);
  }, [selectedDate, todos]);

  return (
    <Box>
      <Button
        mb={5}
        w="full"
        h="fit-content"
        onClick={handleBack}
        bg="transparent"
        _hover={{ bg: "transparent" }}
      >
        <Flex color={textColor} gap={1} alignItems="center">
          <ChevronLeftIcon color={iconColor} />
          Go back
        </Flex>
      </Button>
      <Stack>
        {filteredTodos.map((todo, index) => {
          return (
            <Flex gap={2} alignItems="center">
              <CloseIcon
                onClick={() => handleDelete(todo.todo)}
                _hover={{ color: accentColor }}
                h={3}
                w={3}
              />
              <Text
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                w="130px"
                key={index}
              >
                {todo.todo}
              </Text>
              {todo.date && (
                <Tooltip
                  label={todo.date}
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
                    <CiCalendarDate color={iconColor} />
                  </Button>
                </Tooltip>
              )}
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
};

export default CalendarTodo;
