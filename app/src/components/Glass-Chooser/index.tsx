import { Flex, Box, Text, Stack } from "@chakra-ui/react"
import CustomSwitch from "components/CustomSwitch"
import { useSettings } from "contexts/SettingsContext"
import { GlassComponents } from "types"
import useColors from "hooks/useColors"
import MaterialChooser from "./MaterialChooser"

const Index = () => {
  const { glassBackground, saveSettings, glassEnabled } = useSettings()
  const { getMutedTextColor } = useColors()

  const muted_text_color = getMutedTextColor()

  const handleChangeToggle = (component: GlassComponents) => {
    const flag: boolean = !glassBackground[component]
    const new_object = { ...glassBackground, [component]: flag }
    saveSettings("glass_background", new_object)
  }

  const handleGlassBackground = () => {
    saveSettings("glass_background_enabled", !glassEnabled)
  }

  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
        <Box>
          <Text fontWeight="semibold">Glass backgrounds</Text>
          <Text color={muted_text_color}>
            Enable or disable glass effect for components
          </Text>
        </Box>
        <CustomSwitch
          isChecked={glassEnabled}
          onChange={handleGlassBackground}
          id="glassEnabled"
        />
      </Flex>
      {glassEnabled && (
        <Box>
          <Text mt={4} mb={2} fontSize="xl">
            Customize backgrounds
          </Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={muted_text_color}>
              Settings page
            </Text>
            <CustomSwitch
              isChecked={glassBackground.settings}
              onChange={() => handleChangeToggle("settings")}
              id="glassEnabledSettings"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={muted_text_color}>
              Editor
            </Text>
            <CustomSwitch
              isChecked={glassBackground.editor}
              onChange={() => handleChangeToggle("editor")}
              id="glassEnabledEditor"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={muted_text_color}>
              Nav popup
            </Text>
            <CustomSwitch
              isChecked={glassBackground.navBar}
              onChange={() => handleChangeToggle("navBar")}
              id="glassEnabledNavBar"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={muted_text_color}>
              Widgets
            </Text>
            <CustomSwitch
              isChecked={glassBackground.widgets}
              onChange={() => handleChangeToggle("widgets")}
              id="glassEnabledWidgets"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={muted_text_color}>
              Window
            </Text>
            <CustomSwitch
              isChecked={glassBackground.window}
              onChange={() => handleChangeToggle("window")}
              id="glassEnabledWindow"
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mr={5}
            mt={2}
          >
            <Text w="100%" color={muted_text_color}>
              Context menu
            </Text>
            <CustomSwitch
              isChecked={glassBackground.contextMenu}
              onChange={() => handleChangeToggle("contextMenu")}
              id="glassEnabledWindow"
            />
          </Flex>
          <MaterialChooser />
        </Box>
      )}
    </Stack>
  )
}

export default Index
