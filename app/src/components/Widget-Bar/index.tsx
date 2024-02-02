import { Card, Stack } from "@chakra-ui/react"
import { utils } from "utils"
import WidgetChooser from "components/Widget-Bar/WidgetChooser"
import { MyWindow, WidgetName } from "types"
import { useEffect, useState } from "react"
import { useWidget } from "contexts/WidgetContext"
import ClockWidget from "components/Widget-Bar/Clock-Wdiget"
import CalendarWidget from "components/Widget-Bar/Calendar-Widget"
import ToDoWidget from "components/Widget-Bar/ToDo-Widget"
import { useSettings } from "contexts/SettingsContext"
import InfoWidget from "components/Widget-Bar/Info-Widget"
import useColors from "hooks/useColors"

declare let window: MyWindow

type WIDGET = {
  [key in WidgetName]: JSX.Element
}

const WIDGETS: WIDGET = {
  calendar: <CalendarWidget />,
  todo: <ToDoWidget />,
  clock: <ClockWidget />,
  info: <InfoWidget />,
}

const Index = () => {
  const { getBorderColor, getBackgroundColor, getTextColor } = useColors()
  const [selectedPanel, setSelectedPanel] = useState<number>(1)
  const { selectedWidgets } = useWidget()
  const { glassBackground, glassEnabled } = useSettings()
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const bg_color = getBackgroundColor()

  const text_color = getTextColor()

  const isGlassEnabled = glassEnabled && glassBackground.widgets
  const isGlassEnabledWindow = glassEnabled && glassBackground.window

  const getOffset = () => {
    const MAX_HEIGHT = 790
    if (windowHeight <= MAX_HEIGHT) {
      const res = windowHeight - MAX_HEIGHT
      return `${res}px`
    }
    return 0
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <Stack bg={isGlassEnabledWindow ? "" : bg_color} gap={2} color={text_color}>
      <WidgetChooser />
      {selectedWidgets.map((widget, index) => {
        return (
          <Card
            key={index}
            onClick={() => setSelectedPanel(index)}
            position="relative"
            top={index === 1 ? getOffset() : 0}
            cursor="pointer"
            zIndex={selectedPanel === index ? 10 : 0}
            bg={isGlassEnabled ? utils.getGlassBackground(bg_color) : bg_color}
            className="glass"
            shadow="md"
            rounded="lg"
            p={2}
            border="1px"
            borderColor={getBorderColor()}
            w="full"
          >
            {WIDGETS[widget]}
          </Card>
        )
      })}
    </Stack>
  )
}

export default Index
