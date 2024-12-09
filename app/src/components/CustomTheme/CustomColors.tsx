import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import { useSettingsStore } from "stores/SettingsStore";
import { useEffect, useRef, useState } from "react";
import { Theme } from "types";
import useColors from "hooks/useColors";
import { THEME_DARK, THEME_KEYS } from "utils/constants";

const CustomColors = () => {
  const {
    accentColor,
    textColor,
    mutedTextColor,
    secondaryBackgroundColorDarker,
  } = useColors();
  const [colors, setColors] = useState<Theme | undefined>();
  const cancelRef = useRef();
  const {
    saveThemeToFile,
    exportTheme,
    importTheme,
    themePath,
    removeThemePath,
    addThemeToEditor,
    customThemes,
    customTheme,
    setCustomTheme,
    saveSettings,
  } = useSettingsStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [themeName, setThemeName] = useState<string>("");
  const [inValidName, setInValidName] = useState<boolean>(false);
  const toast = useToast();

  const onChange = (key: (typeof THEME_KEYS)[number], color: string) => {
    if (!colors) return;
    const newColors: Theme = { ...colors };
    newColors[key] = color;
    setColors(newColors);
    localStorage.setItem("custom-theme-json", JSON.stringify(newColors));
    setCustomTheme(newColors);
  };

  const reset = () => {
    localStorage.setItem("custom-theme-json", JSON.stringify(THEME_DARK));
    setColors(THEME_DARK);
  };

  const handleExport = () => {
    exportTheme();
  };

  const handleImport = () => {
    importTheme();
  };

  const handleRemovePath = () => {
    removeThemePath();
  };

  const handleSave = () => {
    saveThemeToFile();
  };

  const handleSaveThemeAs = () => {
    if (!themeName || !colors) return setInValidName(true);
    if (Object.keys(customThemes).includes(themeName))
      return setInValidName(true);

    addThemeToEditor(themeName, colors);
    toast({
      title: `Theme ${themeName} saved successfully`,
      status: "success",
      isClosable: true,
    });

    setThemeName("");
    saveSettings("active_theme", themeName);
    close();
  };

  const close = () => {
    setThemeName("");
    onClose();
  };

  useEffect(() => {
    if (customTheme) setColors(customTheme);
    return () => {
      setThemeName("");
    };
  }, [customTheme]);

  return (
    <Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={close}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          bg={secondaryBackgroundColorDarker}
          color={textColor}
        >
          <AlertDialogBody>
            <Input
              value={themeName}
              onChange={(e) => {
                setInValidName(false);
                setThemeName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSaveThemeAs();
                }
              }}
              isInvalid={inValidName}
              focusBorderColor={inValidName ? "red.300" : accentColor}
              errorBorderColor="red.300"
              placeholder="Choose a name to save this theme as."
            />
            {inValidName && (
              <Text mt={1} color="red.200">
                Name is already in use or in invalid
              </Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <Flex gap={4}>
        <Button
          color={textColor}
          onClick={handleImport}
          _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
          h={8}
          bg={accentColor}
        >
          Import
        </Button>

        <Button
          color={textColor}
          onClick={handleExport}
          _hover={{ opacity: 0.6 }}
          h={8}
          borderColor={accentColor}
          variant="outline"
        >
          Export
        </Button>
        <Button
          color={textColor}
          onClick={onOpen}
          _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
          h={8}
          bg={accentColor}
        >
          Save
        </Button>
      </Flex>
      <Text mt={1} color={mutedTextColor}>
        Import/export a theme or save the theme to your editor themes
      </Text>

      {themePath && colors && (
        <Flex mt={4} gap={2}>
          <Text color={mutedTextColor}>Theme path:</Text>
          <Tag
            size={"sm"}
            key={themePath}
            borderRadius="full"
            variant="solid"
            bg={colors.accentColor}
            color={textColor}
          >
            <TagLabel>{themePath}</TagLabel>
            <TagCloseButton onClick={handleRemovePath} />
          </Tag>
        </Flex>
      )}

      <Text mt={4} mb={2} fontSize="xl">
        Customize theme
      </Text>
      {colors && (
        <Box>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={mutedTextColor}>
              Background color:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="backgroundColor"
                onChange={onChange}
                givenColor={colors.backgroundColor}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={mutedTextColor}>
              Secondary background color:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="secondaryBackgroundColor"
                onChange={onChange}
                givenColor={colors.secondaryBackgroundColor}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={mutedTextColor}>
              Text color:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="textColor"
                onChange={onChange}
                givenColor={colors.textColor}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={mutedTextColor}>
              Icon color:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="iconColor"
                onChange={onChange}
                givenColor={colors.iconColor}
              />
            </Box>
          </Flex>
          <Flex gap={2} mb={2}>
            <Text w="100%" color={mutedTextColor}>
              Accent color:{" "}
            </Text>
            <Box mr={5}>
              <ColorPicker
                keyType="accentColor"
                onChange={onChange}
                givenColor={colors.accentColor}
              />
            </Box>
          </Flex>
        </Box>
      )}
      <Flex gap={2}>
        {themePath && (
          <>
            <Flex gap={4}>
              <Button
                color={textColor}
                onClick={handleSave}
                _hover={{ backgroundColor: accentColor, opacity: 0.8 }}
                h={8}
                bg={accentColor}
              >
                Save
              </Button>
            </Flex>
          </>
        )}
        <Button
          onClick={reset}
          _hover={{ opacity: 0.8 }}
          _active={{ opacity: 0.8 }}
          h={8}
          borderColor={accentColor}
          variant="outline"
          color={textColor}
        >
          Reset
        </Button>
      </Flex>
      {themePath && (
        <Text mt={1} color={mutedTextColor}>
          Save the theme to the path above or reset the colors to default
        </Text>
      )}
    </Box>
  );
};

export default CustomColors;
