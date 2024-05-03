import { DEFAULT_MATERIAL, DEFAULT_MATERIALS } from "utils/constants"
import { Box, Flex, Select, Text } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import { utils } from "utils"
import useColors from "hooks/useColors"
import { useEffect, useState } from "react"

const MaterialChooser = () => {
  const { getSecondaryBackgroundColor, getMutedTextColor } = useColors()
  const [chosenMaterial, setChosenMaterial] = useState<string>(DEFAULT_MATERIAL)
  const { material, saveSettings } = useSettings()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const muted_text_color = getMutedTextColor()

  const changeMaterial = (e: any) => {
    const chosenMaterial = e.target.value || DEFAULT_MATERIAL
    setChosenMaterial(chosenMaterial)
    saveSettings("material", chosenMaterial)
  }

  useEffect(() => {
    if (material) setChosenMaterial(material)
  }, [material])

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Material</Text>
        <Text color={muted_text_color}>Choose the material for the app</Text>
      </Box>
      <Select
        onChange={changeMaterial}
        maxH="200px"
        value={chosenMaterial}
        width="auto"
        css={{ "& > *": { background: `${bg_color} !important` } }}
        placeholder={DEFAULT_MATERIAL + " (default)"}
        h="30px"
      >
        {DEFAULT_MATERIALS &&
          DEFAULT_MATERIALS.map((material, index) => (
            <option key={index} value={material}>
              {material}
            </option>
          ))}
      </Select>
    </Flex>
  )
}

export default MaterialChooser
