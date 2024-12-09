import { DEFAULT_MATERIAL, DEFAULT_MATERIALS } from "utils/constants";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import { useEffect, useState } from "react";

const MaterialChooser = () => {
  const { mutedTextColor, secondaryBackgroundColor } = useColors();
  const [chosenMaterial, setChosenMaterial] =
    useState<string>(DEFAULT_MATERIAL);
  const { material, saveSettings, setAppMaterial } = useSettingsStore();

  const changeMaterial = (e: any) => {
    const chosenMaterial = e.target.value || DEFAULT_MATERIAL;
    setChosenMaterial(chosenMaterial);
    setAppMaterial(chosenMaterial);
    saveSettings("material", chosenMaterial);
  };

  useEffect(() => {
    if (material) setChosenMaterial(material);
  }, [material]);

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Material</Text>
        <Text color={mutedTextColor}>Choose the material for the app</Text>
      </Box>
      <Select
        onChange={changeMaterial}
        maxH="200px"
        value={chosenMaterial}
        width="auto"
        css={{
          "& > *": { background: `${secondaryBackgroundColor} !important` },
        }}
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
  );
};

export default MaterialChooser;
