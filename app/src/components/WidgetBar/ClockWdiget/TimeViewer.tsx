import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { useWidgetStore } from "stores/WidgetStore";
import useColors from "hooks/useColors";
import { useCallback, useEffect, useState } from "react";

const TimeViewer = () => {
  const { accentColor, textColor } = useColors();
  const { setIntervalId, intervalId } = useWidgetStore();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const currentTime = useCallback(() => {
    const date = new Date();
    const hour: number = date.getHours();
    const min: number = date.getMinutes();
    const sec: number = date.getSeconds();
    const resHour: string = updateTime(hour);
    const resMin: string = updateTime(min);
    const resSec: string = updateTime(sec);
    const y = date.getFullYear();
    const d = new Date();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const n = weekday[d.getDay()];

    const timeStr = String(resHour + " : " + resMin + " : " + resSec);
    setTime(timeStr);
    const dateStr = String(n + " , " + y);
    setDate(dateStr);
  }, []);

  const updateTime = (k: number) => {
    if (k < 10) {
      return "0" + k;
    } else {
      return String(k);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId as any);
    };
  }, [intervalId]);

  useEffect(() => {
    const id = setInterval(function () {
      currentTime();
    }, 1000);
    setIntervalId(id);
  }, [currentTime, setIntervalId]);

  return (
    <Box>
      {time ? (
        <>
          <Text
            fontWeight="bold"
            color={textColor}
            align="center"
            fontSize="4xl"
          >
            {time}
          </Text>
          <Text color={accentColor} align="center" fontSize="lg">
            {date}
          </Text>
        </>
      ) : (
        <Center h="full">
          <Spinner color={accentColor} />
        </Center>
      )}
    </Box>
  );
};

export default TimeViewer;
