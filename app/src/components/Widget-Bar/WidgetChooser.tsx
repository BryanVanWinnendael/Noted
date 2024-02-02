import { Flex } from "@chakra-ui/react"
import { utils } from "utils"
import { LuListTodo } from "react-icons/lu"
import { CalendarIcon, TimeIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import WidgetIcon from "components/Widget-Bar/WidgetIcon"
import useColors from "hooks/useColors"

const WidgetChooser = () => {
  const { getSecondaryBackgroundColor, getAccentColor } = useColors()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const accent_color = getAccentColor()

  return (
    <Flex
      borderRadius={4}
      alignItems="center"
      w="full"
      opacity={10}
      p={2}
      rounded="lg"
      bg={utils.getTransparent(0.5, bg_color)}
      gap={2}
      overflowX="auto"
    >
      <WidgetIcon
        icon={
          <CalendarIcon color={utils.getDarkerColor("0.1", accent_color)} />
        }
        name="calendar"
      />
      <WidgetIcon
        icon={<LuListTodo color={utils.getDarkerColor("0.1", accent_color)} />}
        name="todo"
      />
      <WidgetIcon
        icon={<TimeIcon color={utils.getDarkerColor("0.1", accent_color)} />}
        name="clock"
      />
      <WidgetIcon
        icon={
          <QuestionOutlineIcon
            color={utils.getDarkerColor("0.1", accent_color)}
          />
        }
        name="info"
      />
    </Flex>
  )
}

export default WidgetChooser
