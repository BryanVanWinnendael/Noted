import { Box, Input } from "@chakra-ui/react";
import { useWidget } from "contexts/WidgetContext";
import useColors from "hooks/useColors";
import { useState } from "react";

const ToDoForm = () => {
  const { getAccentColor } = useColors();
  const { isConnected, selectedDate, todos, setTodos } = useWidget();
  const [newTodo, setNewTodo] = useState<string>("");

  const accent_color = getAccentColor();

  const handleTodo = () => {
    if (!newTodo) return;
    if (isConnected && selectedDate) {
      const date = selectedDate.format("DD-MM-YYYY");
      const todoObject = {
        date: date,
        todo: newTodo,
      };
      const newTodos = [...todos, todoObject];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setNewTodo("");
    } else {
      const todoObject = {
        date: null,
        todo: newTodo,
      };
      const newTodos = [...todos, todoObject];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setNewTodo("");
    }
  };

  return (
    <Box>
      <Input
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleTodo();
          }
        }}
        focusBorderColor={accent_color}
        placeholder="Add a new todo"
      />
    </Box>
  );
};

export default ToDoForm;
