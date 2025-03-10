import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Input,
  Stack,
  Text,
  useDisclosure,
  useNumberInput,
} from "@chakra-ui/react";
import { useWidgetStore } from "stores/WidgetStore";
import useColors from "hooks/useColors";
import { useCallback, useEffect, useRef, useState } from "react";

type timerType = {
  hours: number;
  minutes: number;
  seconds: number;
};

const TimerViewer = () => {
  const { accentColor, secondaryBackgroundColor, textColor, mutedTextColor } =
    useColors();
  const { isConnected, selectedDate } = useWidgetStore();
  const [timer, setTimer] = useState<timerType | undefined>();
  const [inputTimer, setInputTimer] = useState<timerType>({
    hours: 0,
    minutes: 0,
    seconds: 30,
  });
  const [timerPercentage, setTimerPercentage] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();
  const timerInvtervalIdRef = useRef<any>(null);
  const timeStartedRef = useRef<any>(null);

  const { getInputProps: getInputPropsHours } = useNumberInput({
    step: 1,
    defaultValue: 0,
    value: inputTimer.hours,
    min: 0,
    max: 60,
    precision: 0,
    onChange: (_, valueNumber: number) => {
      setInputTimer({ ...inputTimer, hours: valueNumber });
    },
  });

  const { getInputProps: getInputPropsMinutes } = useNumberInput({
    step: 1,
    defaultValue: 0,
    value: inputTimer.minutes,
    min: 0,
    max: 60,
    precision: 0,
    onChange: (_, valueNumber: number) => {
      setInputTimer({ ...inputTimer, minutes: valueNumber });
    },
  });

  const { getInputProps: getInputPropsSeconds } = useNumberInput({
    step: 1,
    defaultValue: 30,
    value: inputTimer.seconds,
    min: 1,
    max: 60,
    precision: 0,
    onChange: (_, valueNumber: number) => {
      setInputTimer({ ...inputTimer, seconds: valueNumber });
    },
  });

  const inputHours = getInputPropsHours();
  const inputMinutes = getInputPropsMinutes();
  const inputSeconds = getInputPropsSeconds();

  const handleClose = () => {
    onClose();
    setInputTimer({ hours: 0, minutes: 0, seconds: 30 });
  };

  const HandleSetTimer = () => {
    const currentDate = new Date();
    const TIME_LOST_IN_TRANSITION = 2;
    const futureDate = new Date(
      currentDate.getTime() +
        inputTimer.hours * 3600000 +
        inputTimer.minutes * 60000 +
        (inputTimer.seconds + TIME_LOST_IN_TRANSITION) * 1000,
    );
    timeStartedRef.current = futureDate;
    handleClose();

    const id = setInterval(() => {
      startTimer();
    }, 1000);
    timerInvtervalIdRef.current = id;
  };

  const stopTimer = useCallback(() => {
    clearInterval(timerInvtervalIdRef.current);
    setTimerPercentage(0);
    setTimer(undefined);
  }, []);

  const startTimer = useCallback(() => {
    const currentTime = new Date();
    const difference = timeStartedRef.current.getTime() - currentTime.getTime();
    const remainingHours = Math.floor(difference / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    const hasTimeRemaining =
      remainingHours > 0 || remainingMinutes > 0 || remainingSeconds > 0;

    if (!hasTimeRemaining) {
      return stopTimer();
    }

    setTimer({
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    });

    const startingSeconds =
      inputTimer.hours * 3600 + inputTimer.minutes * 60 + inputTimer.seconds;
    const totalSeconds =
      remainingHours * 3600 + remainingMinutes * 60 + remainingSeconds;
    const percentage = (totalSeconds / startingSeconds) * 100;
    setTimerPercentage(percentage);
  }, [inputTimer.hours, inputTimer.minutes, inputTimer.seconds, stopTimer]);

  const handleCalculateTimeUntil = () => {
    if (!selectedDate) return;
    const futureDate = new Date(selectedDate.toDate());
    timeStartedRef.current = futureDate;
    const id = setInterval(() => {
      startTimer();
    }, 1000);
    timerInvtervalIdRef.current = id;
  };

  useEffect(() => {
    return () => {
      if (timerInvtervalIdRef.current) stopTimer();
    };
  }, [stopTimer]);

  return (
    <Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg={secondaryBackgroundColor} color={textColor}>
          <AlertDialogBody>
            <Flex>
              <Text color={mutedTextColor} w={100}>
                Hours
              </Text>
              <Text color={mutedTextColor} w={100}>
                Minutes
              </Text>
              <Text color={mutedTextColor} w={100}>
                Seconds
              </Text>
            </Flex>
            <Flex gap={2}>
              <Input focusBorderColor={accentColor} {...inputHours} w={100} />
              <Input focusBorderColor={accentColor} {...inputMinutes} w={100} />
              <Input focusBorderColor={accentColor} {...inputSeconds} w={100} />
              <Button
                bg={accentColor}
                _hover={{ opacity: 0.8 }}
                _active={{ opacity: 0.8 }}
                color={textColor}
                onClick={HandleSetTimer}
              >
                Set timer
              </Button>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      {timer ? (
        <Stack>
          <CircularProgress
            size="120px"
            value={timerPercentage}
            color={accentColor}
          >
            <CircularProgressLabel>
              <Text fontSize="md">
                {timer.hours} : {timer.minutes} : {timer.seconds}
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
          <Button
            borderColor={accentColor}
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.8 }}
            variant="outline"
            color={textColor}
            onClick={stopTimer}
          >
            Stop timer
          </Button>
        </Stack>
      ) : (
        <Stack gap={3}>
          <Button
            borderColor={accentColor}
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.8 }}
            variant="outline"
            color={textColor}
            onClick={onOpen}
          >
            Add timer
          </Button>
          {isConnected && (
            <Stack gap={3}>
              <Button
                borderColor={accentColor}
                _hover={{ opacity: 0.8 }}
                _active={{ opacity: 0.8 }}
                variant="outline"
                color={textColor}
                onClick={handleCalculateTimeUntil}
              >
                Calculate time until
              </Button>
              {selectedDate && (
                <Stack gap={0}>
                  <Text>Date picked: </Text>
                  <Text fontWeight="bold" color={accentColor} display="inline">
                    {selectedDate.format("DD MMMM, YYYY")}
                  </Text>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default TimerViewer;
