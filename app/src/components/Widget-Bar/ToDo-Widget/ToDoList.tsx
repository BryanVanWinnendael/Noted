import { CloseIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react"
import { useWidget } from "contexts/WidgetContext"
import { RefObject, useRef } from "react"
import { CiCalendarDate } from "react-icons/ci"
import { utils } from "utils"
import useColors from "hooks/useColors"

const ToDoList = () => {
  const {
    getAccentColor,
    getIconColor,
    getSecondaryBackgroundColor,
    getTextColor,
  } = useColors()
  const { todos, setTodos } = useWidget()
  const todosRef: RefObject<HTMLDivElement> = useRef(null)

  const accent_color = getAccentColor()

  const icon_color = getIconColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const handleDelete = (index: number) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

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
          <Flex gap={2} alignItems="center">
            <CloseIcon
              onClick={() => handleDelete(index)}
              _hover={{ color: accent_color }}
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
                  <CiCalendarDate color={icon_color} />
                </Button>
              </Tooltip>
            )}
          </Flex>
        )
      })}
    </Box>
  )
}

export default ToDoList
