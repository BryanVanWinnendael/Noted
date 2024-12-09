import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useWidgetStore } from "stores/WidgetStore";
import { RefObject, useRef } from "react";
import { CiCalendarDate } from "react-icons/ci";
import useColors from "hooks/useColors";

const ToDoList = () => {
  const { accentColor, iconColor, textColor, secondaryBackgroundColorLighter } =
    useColors();
  const { todos, setTodos } = useWidgetStore();
  const todosRef: RefObject<HTMLDivElement> = useRef(null);

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Box
      scrollBehavior="smooth"
      ref={todosRef}
      h="220px"
      overflowY="hidden"
      _hover={{ overflowY: "auto" }}
    >
      {todos.map((todo, index) => {
        return (
          <Flex key={index} gap={2} alignItems="center">
            <CloseIcon
              onClick={() => handleDelete(index)}
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
    </Box>
  );
};

export default ToDoList;
