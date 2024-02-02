import { Box, Button, Flex, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useWidget } from "contexts/WidgetContext"
import { BiMerge } from "react-icons/bi"
import { utils } from "utils"
import { useEditor } from "contexts/EditorContext"
import useColors from "hooks/useColors"
import { useMemo, useState } from "react"

interface DateTodoCount {
  date: string | null
  todoCount: number
}

const Index = () => {
  const {
    getAccentColor,
    getIconColor,
    getSecondaryBackgroundColor,
    getTextColor,
  } = useColors()
  const { isConnected, setIsConnected, canConnect, getCompatibleWidget } =
    useWidget()
  const { blocks, time } = useEditor()
  const [lines, setLines] = useState(0)
  const [words, setWords] = useState(0)
  const [dateString, setDateString] = useState("")
  const [timeString, setTimeString] = useState("")
  const { todos } = useWidget()
  const [todosCount, setTodosCount] = useState<DateTodoCount[]>()

  const accent_color = getAccentColor()

  const icon_color = getIconColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  useMemo(async () => {
    if (!blocks) return
    const amountOfLines = blocks.length
    setLines(amountOfLines)
  }, [blocks])

  const countWords = (text: string): number => {
    const words = text.match(/\b\w+\b/g)
    return words ? words.length : 0
  }

  useMemo(async () => {
    if (!blocks) return
    let res = 0
    for (const item of blocks) {
      const wordCount = countWords(item.data.text)
      res += wordCount
    }
    setWords(res)
  }, [blocks])

  useMemo(async () => {
    if (!time) return
    const dateString = utils.getDateString(time)
    setDateString(dateString)
    const timeString = utils.getTimeString(time)
    setTimeString(timeString)
  }, [time])

  useMemo(() => {
    const dateTodoCountMap = new Map<string | null, number>()

    for (const todoItem of todos) {
      const { date } = todoItem
      if (dateTodoCountMap.has(date)) {
        dateTodoCountMap.set(date, dateTodoCountMap.get(date)! + 1)
      } else {
        dateTodoCountMap.set(date, 1)
      }
    }

    const dateTodoCountArray: DateTodoCount[] = Array.from(
      dateTodoCountMap.entries(),
    ).map(([date, todoCount]) => ({
      date: date ? date.replaceAll("-", "/") : null,
      todoCount,
    }))
    setTodosCount(dateTodoCountArray)
  }, [todos])

  return (
    <Box h="300px">
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="xl" color={accent_color} fontWeight="semibold">
          Info
        </Text>
        {canConnect() && (
          <Tooltip
            label={
              isConnected
                ? `Connected to ${getCompatibleWidget("info")}`
                : `Connect to ${getCompatibleWidget("info")}`
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
        <Text color={text_color}>Lines: {lines}</Text>
        <Text color={text_color}>Words: {words}</Text>
        <Text color={text_color}>Last update: </Text>
        <Flex gap={2} mx={5}>
          <Text>{timeString}</Text>
          <Text>{dateString}</Text>
        </Flex>
      </Stack>
      {isConnected && (
        <>
          <Text color={text_color} mt={5}>
            Todos:
          </Text>
          <Stack
            mt={2}
            mx={5}
            overflowY="hidden"
            maxH={20}
            _hover={{ overflowY: "scroll" }}
          >
            {todosCount?.map((todo, index) => {
              return (
                <Flex gap={2} alignItems="center">
                  <Text
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    w="130px"
                    key={index}
                  >
                    {todo.date || "No date"}
                  </Text>
                  <Text
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    w="130px"
                    key={index}
                  >
                    {todo.todoCount}
                  </Text>
                </Flex>
              )
            })}
          </Stack>
        </>
      )}
    </Box>
  )
}

export default Index
