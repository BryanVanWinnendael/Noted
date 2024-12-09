import { months, generateDate } from "utils/calendar";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { BiMerge } from "react-icons/bi";
import { useWidgetStore } from "stores/WidgetStore";
import DateViewer from "components/WidgetBar/CalendarWidget/DateViewer";
import useColors from "hooks/useColors";

const Index = () => {
  const {
    accentColor,
    iconColor,
    textColor,
    mutedTextColor,
    secondaryBackgroundColorLighter,
  } = useColors();
  const {
    isConnected,
    setIsConnected,
    canConnect,
    setSelectedDate,
    getCompatibleWidget,
    setShowDateViewer,
    showDateViewer,
  } = useWidgetStore();
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  return (
    <Box h="300px">
      {showDateViewer ? (
        <DateViewer />
      ) : (
        <>
          <Stack gap={0}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex gap={1} alignItems="center">
                <Text color={accentColor} fontWeight="semibold" fontSize="4xl">
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
            <Flex alignItems="center" gap={1}>
              <ChevronLeftIcon
                w={4}
                h={4}
                color={iconColor}
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <Text
                color={textColor}
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                Today
              </Text>
              <ChevronRightIcon
                color={iconColor}
                w={4}
                h={4}
                onClick={() => {
                  setToday(today.month(today.month() + 1));
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
                  color={mutedTextColor}
                >
                  {day}
                </Text>
              );
            })}
          </Grid>

          <Grid templateColumns="repeat(7, minmax(0, 1fr))">
            {generateDate(today.month(), today.year()).map(
              ({ date, today }, index) => {
                return (
                  <Center key={index} h={8} w={8} borderTop="1px">
                    <Text
                      fontSize="sm"
                      _hover={{ color: accentColor }}
                      color={today ? accentColor : textColor}
                      rounded="md"
                      onClick={() => {
                        setSelectedDate(date);
                        setShowDateViewer(true);
                      }}
                    >
                      {date.date()}
                    </Text>
                  </Center>
                );
              },
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};
export default Index;
