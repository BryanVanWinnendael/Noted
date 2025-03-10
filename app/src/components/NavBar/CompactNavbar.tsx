import { Box, Flex } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { MyWindow } from "types/index";
import MenuBar from "./MenuBar";

declare let window: MyWindow;
const invoke = window.electron.invoke;
const CompactNavbar = () => {
  const { accentColor, mutedTextColor } = useColors();

  const clickedClose = () => {
    invoke("close-window");
  };

  const clickedMinimize = () => {
    invoke("minimize-window");
  };

  const clickedMaximize = () => {
    invoke("maximize-window");
  };

  return (
    <Flex w="full" justifyContent="space-between">
      <MenuBar />
      <Box className="nav" width="100%"></Box>
      <Flex>
        <Flex
          onClick={clickedMinimize}
          fill={mutedTextColor}
          m={2}
          _hover={{ fill: accentColor }}
          cursor="pointer"
          w="fit-content"
          h="fit-content"
        >
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" fill="none" width="24" height="24" />
            <g>
              <path d="M3 11h18v2H3z" />
            </g>
          </svg>
        </Flex>
        <Box
          onClick={clickedMaximize}
          stroke={mutedTextColor}
          _hover={{ stroke: accentColor }}
          m={2}
          cursor="pointer"
          w="fit-content"
          h="fit-content"
        >
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 20H4m0 0v-4m0 4 6-6m6-10h4m0 0v4m0-4-6 6"
            />
          </svg>
        </Box>
        <Box
          onClick={clickedClose}
          fill={mutedTextColor}
          _hover={{ fill: accentColor }}
          m={2}
          cursor="pointer"
          w="fit-content"
          h="fit-content"
        >
          <svg
            width="1rem"
            height="1rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            enable-background="new 0 0 52 52"
          >
            <path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z" />
          </svg>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CompactNavbar;
