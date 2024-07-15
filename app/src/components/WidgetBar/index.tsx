import { Card, Stack } from "@chakra-ui/react";
import WidgetChooser from "components/WidgetBar/WidgetChooser";
import { MyWindow, WidgetName } from "types";
import { useEffect, useState } from "react";
import { useWidget } from "contexts/WidgetContext";
import ClockWidget from "components/WidgetBar/ClockWdiget";
import CalendarWidget from "components/WidgetBar/CalendarWidget";
import ToDoWidget from "components/WidgetBar/ToDoWidget";
import { useSettings } from "contexts/SettingsContext";
import InfoWidget from "components/WidgetBar/InfoWidget";
import useColors from "hooks/useColors";

declare let window: MyWindow;

type WIDGET = {
  [key in WidgetName]: JSX.Element;
};

const WIDGETS: WIDGET = {
  calendar: <CalendarWidget />,
  todo: <ToDoWidget />,
  clock: <ClockWidget />,
  info: <InfoWidget />,
};

const Index = () => {
  const { borderColor, backgroundColor, getGlassBackground } = useColors();
  const [selectedPanel, setSelectedPanel] = useState<number>(1);
  const { selectedWidgets } = useWidget();
  const { glassBackground, glassEnabled } = useSettings();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const isGlassEnabled = glassEnabled && glassBackground.widgets;

  const getOffset = () => {
    const MAX_HEIGHT = 790;
    if (windowHeight <= MAX_HEIGHT) {
      const res = windowHeight - MAX_HEIGHT;
      return `${res}px`;
    }
    return 0;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Stack>
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
            bg={
              isGlassEnabled
                ? getGlassBackground(backgroundColor)
                : backgroundColor
            }
            className="glass"
            shadow="md"
            rounded="lg"
            p={2}
            border="1px"
            borderColor={borderColor}
            w="full"
          >
            {WIDGETS[widget]}
          </Card>
        );
      })}
    </Stack>
  );
};

export default Index;
