import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useSettingsStore } from "stores/SettingsStore";
import useColors from "hooks/useColors";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

const ThemeChooser = ({
  isOpen,
  handleCloseThemeChooser,
}: {
  isOpen: boolean;
  handleCloseThemeChooser: () => void;
}) => {
  const { customThemes, saveSettings } = useSettingsStore();
  const { setColorMode, colorMode } = useColorMode();
  const [filterdThemes, setFilterdThemes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const cancelRef = useRef();
  const {
    backgroundColor,
    secondaryBackgroundColorDarker,
    textColor,
    mutedTextColor,
    accentColor,
    textAccentColor,
    borderColor,
  } = useColors();
  const [searchFile, setSearchFile] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [typing, setTyping] = useState<boolean>(false);

  const isActiveTheme = (theme: string) => {
    if (theme === "Dark") theme = "dark";
    if (theme === "Light") theme = "light";
    if (theme === "Deep blue") theme = "deep_blue";
    return colorMode === theme;
  };

  const changeTheme = (theme: string) => {
    if (theme === "Dark") theme = "dark";
    if (theme === "Light") theme = "light";
    if (theme === "Deep blue") theme = "deep_blue";

    setColorMode(theme);
    saveSettings("active_theme", theme);
    if (customThemes && customThemes[theme])
      localStorage.setItem("theme-json", JSON.stringify(customThemes[theme]));
  };

  const handleChooseTheme = (theme: string) => {
    changeTheme(theme);
    handleClose();
  };

  const handleClose = () => {
    resetDialog();
    handleCloseThemeChooser();
  };

  const getAllThemes = useCallback(() => {
    return ["Light", "Dark", "Deep blue"].concat(Object.keys(customThemes));
  }, [customThemes]);

  const handleSetSearch = (input: string) => {
    setSearchFile(input);
    const themes = getAllThemes();
    const filtered = themes.filter((theme) => {
      return theme.toLowerCase().includes(input.toLowerCase());
    });
    setFilterdThemes(filtered);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        setTyping(false);
        event.preventDefault();
        focusNextButton(index);
        break;
      case "ArrowUp":
        setTyping(false);
        event.preventDefault();
        focusPreviousButton(index);
        break;
      case "Enter":
        setTyping(false);
        handleChooseTheme(filterdThemes[index]);
        resetDialog();
        break;
      default:
        break;
    }
  };

  const handleHideToolbar = () => {
    const popoverElement = document.querySelector(
      ".ce-popover.ce-popover--opened",
    ) as HTMLDivElement;
    if (popoverElement) {
      popoverElement.style.display = "none";
    }
  };

  const resetDialog = () => {
    setSearchFile("");
    setCurrentIndex(null);
    setFilterdThemes(getAllThemes());
  };

  const handleKeyDialog = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      handleHideToolbar();
      if (event.key === "Tab") {
        setTyping(false);
        event.preventDefault();
        if (currentIndex === null) {
          buttonRefs.current[0]?.focus();
          setCurrentIndex(0);
        } else {
          const nextCurrent = (currentIndex + 1) % getAllThemes().length;
          buttonRefs.current[nextCurrent]?.focus();
          setCurrentIndex(nextCurrent);
        }
      } else if (
        event.key !== "ArrowDown" &&
        event.key !== "ArrowUp" &&
        event.key !== "Enter"
      ) {
        setTyping(true);
        inputRef.current?.focus();
      }
    },
    [currentIndex, getAllThemes],
  );

  const focusNextButton = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % getAllThemes().length;
    buttonRefs.current[nextIndex]?.focus();
  };

  const focusPreviousButton = (currentIndex: number) => {
    const previousIndex =
      (currentIndex - 1 + getAllThemes().length) % getAllThemes().length;
    buttonRefs.current[previousIndex]?.focus();
  };

  useEffect(() => {
    const files = getAllThemes();
    setFilterdThemes(files);
  }, [getAllThemes]);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef as any}
      onClose={handleClose}
      isOpen={isOpen}
    >
      <AlertDialogOverlay onKeyDown={handleKeyDialog} />
      <AlertDialogContent
        onKeyDown={handleKeyDialog}
        shadow="lg"
        bg={backgroundColor}
        color={textColor}
      >
        <AlertDialogBody>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              _focusVisible={{ border: "0 0 1px 0" }}
              borderRadius={0}
              borderRight={"none"}
              borderTop={"none"}
              borderLeft={"none"}
              borderBottom={"1px"}
              borderColor={borderColor}
              autoFocus={true}
              ref={inputRef}
              tabIndex={-1} // Exclude from the natural tab order
              value={searchFile}
              onChange={(e) => {
                handleSetSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const theme = filterdThemes[0];
                  handleChooseTheme(theme);
                  resetDialog();
                }
              }}
              placeholder="Search or enter theme"
            />
          </InputGroup>
          <Stack maxH={200} overflowY="scroll" mt={2}>
            {filterdThemes.map((theme: string, index: number) => (
              <Button
                border="none"
                bg={typing && index === 0 ? accentColor : "transparent"}
                color={typing && index === 0 ? textAccentColor : textColor}
                key={index}
                ref={(el) => (buttonRefs.current[index] = el)}
                autoFocus={index === 0 ? true : false}
                _focusVisible={{
                  bg: accentColor,
                  color: textAccentColor,
                }}
                cursor="pointer"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  bg: secondaryBackgroundColorDarker,
                }}
                onClick={() => {
                  handleChooseTheme(theme);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0} // Make the button focusable
              >
                <Flex alignItems="center" gap={2}>
                  {isActiveTheme(theme) && <FaCheck color={accentColor} />}
                  <Text
                    maxW="full"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {theme}
                  </Text>
                </Flex>
                <Flex alignItems="center" gap={1} color={mutedTextColor}>
                  <Text>Choose</Text>
                  <ArrowForwardIcon />
                </Flex>
              </Button>
            ))}
          </Stack>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ThemeChooser;
