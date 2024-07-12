import { Flex } from "@chakra-ui/react";
import { LuListTodo } from "react-icons/lu";
import { CalendarIcon, TimeIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import WidgetIcon from "components/Widget-Bar/WidgetIcon";
import useColors from "hooks/useColors";

const WidgetChooser = () => {
  const { accentColor, secondaryBackgroundColorLighter } = useColors();

  return (
    <Flex
      borderRadius={4}
      alignItems="center"
      w="full"
      opacity={10}
      p={2}
      rounded="lg"
      bg={secondaryBackgroundColorLighter}
      gap={2}
      overflowX="auto"
    >
      <WidgetIcon
        icon={
          <CalendarIcon color={accentColor} />
        }
        name="calendar"
      />
      <WidgetIcon
        icon={<LuListTodo color={accentColor} />}
        name="todo"
      />
      <WidgetIcon
        icon={<TimeIcon color={accentColor} />}
        name="clock"
      />
      <WidgetIcon
        icon={
          <QuestionOutlineIcon
            color={accentColor}
          />
        }
        name="info"
      />
    </Flex>
  );
};

export default WidgetChooser;
