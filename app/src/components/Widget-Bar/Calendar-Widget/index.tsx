import { months, generateDate } from "utils/calendar"
import dayjs from "dayjs"
import { useState } from "react"
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { BiMerge } from "react-icons/bi"
import { useWidget } from "contexts/WidgetContext"
import { utils } from "utils"
import DateViewer from "components/Widget-Bar/Calendar-Widget/DateViewer"
import useColors from "hooks/useColors"

const Index = () => {
  const {
    getAccentColor,
    getIconColor,
    getSecondaryBackgroundColor,
    getTextColor,
    getMutedTextColor,
  } = useColors()
  const {
    isConnected,
    setIsConnected,
    canConnect,
    setSelectedDate,
    getCompatibleWidget,
    setShowDateViewer,
    showDateViewer,
  } = useWidget()
  const days = ["S", "M", "T", "W", "T", "F", "S"]
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)

  const accent_color = getAccentColor()

  const icon_color = getIconColor()

  const muted_text_color = getMutedTextColor()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  return (
    <Box h="300px">
      {showDateViewer ? (
        <DateViewer />
      ) : (
        <>
          <Stack gap={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex gap={1} alignItems="center">
                <Text color={accent_color} fontWeight="semibold" fontSize="4xl">
                  {months[today.month()].substring(0, 3)}
                </Text>
                <Text fontSize="2xl">{today.year()}</Text>
              </Flex>
              {canConnect() && (
                <Tooltip
                  label={
                    isConnected
                      ? `Connected to ${getCompatibleWidget("calendar")}`
                      : `Connect to ${getCompatibleWidget("calendar")}`
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
            <Flex alignItems="center" gap={1}>
              <ChevronLeftIcon
                w={4}
                h={4}
                color={icon_color}
                onClick={() => {
                  setToday(today.month(today.month() - 1))
                }}
              />
              <Text
                color={text_color}
                onClick={() => {
                  setToday(currentDate)
                }}
              >
                Today
              </Text>
              <ChevronRightIcon
                color={icon_color}
                w={4}
                h={4}
                onClick={() => {
                  setToday(today.month(today.month() + 1))
                }}
              />
            </Flex>
          </Stack>
          <Grid templateColumns="repeat(7, minmax(0, 1fr))">
            {days.map((day, index) => {
              return (
                <Text
                  key={index}
                  fontSize="sm"
                  h={6}
                  w={8}
                  textAlign="center"
                  color={muted_text_color}
                >
                  {day}
                </Text>
              )
            })}
          </Grid>

          <Grid templateColumns="repeat(7, minmax(0, 1fr))">
            {generateDate(today.month(), today.year()).map(
              ({ date, today }, index) => {
                return (
                  <Center key={index} h={8} w={8} borderTop="1px">
                    <Text
                      fontSize="sm"
                      _hover={{ color: accent_color }}
                      color={today ? accent_color : text_color}
                      rounded="md"
                      onClick={() => {
                        setSelectedDate(date)
                        setShowDateViewer(true)
                      }}
                    >
                      {date.date()}
                    </Text>
                  </Center>
                )
              },
            )}
          </Grid>
        </>
      )}
    </Box>
  )
}
export default Index
