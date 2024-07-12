import {
  Grid,
  Flex,
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { useRef } from "react";
import Appearance from "./Appearance";
import Themes from "./Themes";
import Market from "./Market";
import General from "./General";
import useColors from "hooks/useColors";
import { useWorkspace } from "contexts/WorkspaceContext";
import Shortcuts from "./Shortcuts";
import Background from "./Background";
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import SettingsNavItem from "components/SettingsNavItem";
import Actions from "./Actions";


const SettingsScreen = () => {
  const { secondaryBackgroundColorLighter, accentColor, textColor, secondaryBackgroundColor, getGlassBackground } =
    useColors();
    const { isOpen, onClose, glassBackground, glassEnabled, view, setView} = useSettings();
  const { workspace } = useWorkspace();

  const isGlassEnabled = glassEnabled && glassBackground.settings;

  const finalRef = useRef(null);

  return (
    <Modal
      size="5xl"
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="transparent" />
      <ModalContent h="80vh" ml={5} mr={5} bg={"transparent"}>
        <Grid templateColumns="0.5fr 1fr" w="full" h="full" maxW="full">
          <Flex
            className="glass"
            border="1px"
            borderColor="rgb(220,220,220, 0.2)"
            flexDirection="column"
            bg={
              isGlassEnabled
                ? getGlassBackground(secondaryBackgroundColor)
                : secondaryBackgroundColor
            }
            roundedTopLeft="md"
            roundedBottomLeft="md"
            roundedTopRight={0}
            roundedBottomRight={0}
          >
            <Box m={5}>
              <SettingsNavItem label="General" view={view} setView={setView} />
              {workspace && (
                <>
                  <SettingsNavItem label="Notes" view={view} setView={setView} />
                  <SettingsNavItem label="Actions" view={view} setView={setView} />
                  <SettingsNavItem label="Appearance" view={view} setView={setView} />
                  <SettingsNavItem label="Sidebar" view={view} setView={setView} />
                  <SettingsNavItem label="Background" view={view} setView={setView} />
                  <SettingsNavItem label="Custom themes" view={view} setView={setView} />
                  <SettingsNavItem label="Market" view={view} setView={setView} />
                  <SettingsNavItem label="Shortcuts" view={view} setView={setView} />
                </>
              )}
            </Box>
          </Flex>

          <Flex
            color={textColor}
            border="1px"
            borderColor="rgb(220,220,220, 0.2)"
            borderLeftColor="rgb(220,220,220, 0)"
            flexDirection="column"
            className="glass"
            bg={
              isGlassEnabled
                ? getGlassBackground(secondaryBackgroundColorLighter)
                : secondaryBackgroundColorLighter
            }
            roundedTopRight="md"
            roundedBottomRight="md"
            roundedTopLeft={0}
            roundedBottomLeft={0}
            maxW="full"
            overflow="hidden"
          >
            <Flex justifyContent="flex-end">
              <Box
                cursor="pointer"
                m={2}
                onClick={onClose}
                _hover={{ fill: accentColor }}
                fill="gray"
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
            <Box
              maxW="full"
              minHeight="70vh"
              ml={5}
              maxH="70vh"
              overflow="scroll"
              overflowY="auto"
              overflowX="hidden"
            >
              {
                {
                  General: <General />,
                  Appearance: <Appearance />,
                  Sidebar: <Sidebar />,
                  Background: <Background />,
                  "Custom themes": <Themes />,
                  Market: <Market />,
                  Shortcuts: <Shortcuts />,
                  Notes: <Notes />,
                  Actions: <Actions />,
                }[view]
              }
            </Box>
          </Flex>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default SettingsScreen;
