import MenuBar from "./MenuBar"
import { MyWindow } from "types"
import { Box, Flex, Grid, Tooltip } from "@chakra-ui/react"
import Tabs from "components/Tabs"
import { utils } from "utils"
import { useWidget } from "contexts/WidgetContext"
import useColors from "hooks/useColors"
import SidebarButton from "./SidebarButton"
import { useSettings } from "contexts/SettingsContext"
import { useWorkspace } from "contexts/WorkspaceContext"

declare let window: MyWindow

const NavBar = () => {
  const {
    getSecondaryBackgroundColor,
    getBackgroundColor,
    getAccentColor,
    getTextColor,
    getMutedTextColor,
  } = useColors()
  const ipcRenderer = window.myApp.getIpcRenderer()
  const { setWidgetPanel, widgetPanel } = useWidget()
  const { glassBackground, glassEnabled } = useSettings()
  const { workspace } = useWorkspace()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const muted_text_color = getMutedTextColor()

  const nav_bg_color = getBackgroundColor()

  const accent_color = getAccentColor()

  const text_color = getTextColor()

  const isGlassEnabled = (glassEnabled && glassBackground.window) || !workspace

  const clickedClose = () => {
    ipcRenderer.invoke("close-window")
  }

  const clickedMinimize = () => {
    ipcRenderer.invoke("minimize-window")
  }

  const clickedMaximize = () => {
    ipcRenderer.invoke("maximize-window")
  }

  return (
    <Grid
      bg={isGlassEnabled ? "transparent" : nav_bg_color}
      gridTemplateColumns="auto 1fr auto"
      w="full"
      position="fixed"
      zIndex={100}
      top={0}
    >
      <Flex alignItems="center" alignContent="center" pl={2} gap={1}>
        <MenuBar />
        {workspace && <SidebarButton />}
      </Flex>

      <Flex overflow="auto" flexDirection="row" pt={2}>
        <Box maxW="80%" w="fit-content">
          <Tabs />
        </Box>
        <Box className="nav" w="full" h="28px" />
      </Flex>

      <Flex>
        {workspace && (
          <Tooltip
            placement="bottom"
            label={"Ctrl+W"}
            bg={bg_color}
            color={text_color}
            rounded="md"
          >
            <Box
              onClick={() => setWidgetPanel(!widgetPanel)}
              _hover={{ fill: accent_color }}
              cursor="pointer"
              w="fit-content"
              h="fit-content"
              m={2}
              fill={widgetPanel ? accent_color : muted_text_color}
            >
              <svg
                width="1.25rem"
                height="1.25rem"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6.21053C2 4.22567 2 3.23323 2.65901 2.61662C3.31802 2 4.37868 2 6.5 2C8.62132 2 9.68198 2 10.341 2.61662C11 3.23323 11 4.22567 11 6.21053V17.7895C11 19.7743 11 20.7668 10.341 21.3834C9.68198 22 8.62132 22 6.5 22C4.37868 22 3.31802 22 2.65901 21.3834C2 20.7668 2 19.7743 2 17.7895V6.21053Z" />
                <path d="M13 15.4C13 13.3258 13 12.2887 13.659 11.6444C14.318 11 15.3787 11 17.5 11C19.6213 11 20.682 11 21.341 11.6444C22 12.2887 22 13.3258 22 15.4V17.6C22 19.6742 22 20.7113 21.341 21.3556C20.682 22 19.6213 22 17.5 22C15.3787 22 14.318 22 13.659 21.3556C13 20.7113 13 19.6742 13 17.6V15.4Z" />
                <path d="M13 5.5C13 4.4128 13 3.8692 13.1713 3.44041C13.3996 2.86867 13.8376 2.41443 14.389 2.17761C14.8024 2 15.3266 2 16.375 2H18.625C19.6734 2 20.1976 2 20.611 2.17761C21.1624 2.41443 21.6004 2.86867 21.8287 3.44041C22 3.8692 22 4.4128 22 5.5C22 6.5872 22 7.1308 21.8287 7.55959C21.6004 8.13133 21.1624 8.58557 20.611 8.82239C20.1976 9 19.6734 9 18.625 9H16.375C15.3266 9 14.8024 9 14.389 8.82239C13.8376 8.58557 13.3996 8.13133 13.1713 7.55959C13 7.1308 13 6.5872 13 5.5Z" />
              </svg>
            </Box>
          </Tooltip>
        )}
        <Box
          onClick={clickedMinimize}
          fill={muted_text_color}
          m={2}
          _hover={{ fill: accent_color }}
          cursor="pointer"
          w="fit-content"
          h="fit-content"
        >
          <svg
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" fill="none" width="24" height="24" />
            <g>
              <path d="M3 11h18v2H3z" />
            </g>
          </svg>
        </Box>
        <Box
          onClick={clickedMaximize}
          stroke={muted_text_color}
          _hover={{ stroke: accent_color }}
          m={2}
          cursor="pointer"
          w="fit-content"
          h="fit-content"
        >
          <svg
            width="1.25rem"
            height="1.25rem"
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
          fill={muted_text_color}
          _hover={{ fill: accent_color }}
          m={2}
          cursor="pointer"
          w="fit-content"
          h="fit-content"
        >
          <svg
            width="1.1rem"
            height="1.1rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            enable-background="new 0 0 52 52"
          >
            <path d="M31,25.4L44,12.3c0.6-0.6,0.6-1.5,0-2.1L42,8.1c-0.6-0.6-1.5-0.6-2.1,0L26.8,21.2c-0.4,0.4-1,0.4-1.4,0L12.3,8c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l13.1,13.1c0.4,0.4,0.4,1,0,1.4L8,39.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0L25.3,31c0.4-0.4,1-0.4,1.4,0l13.1,13.1c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1L31,26.8C30.6,26.4,30.6,25.8,31,25.4z" />
          </svg>
        </Box>
      </Flex>
    </Grid>
  )
}

export default NavBar
