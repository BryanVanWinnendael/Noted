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
  useDisclosure,
} from "@chakra-ui/react";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import useColors from "hooks/useColors";
import { useCallback, useRef, useState } from "react";
import useCommands from "../../hooks/commands/useCommands";
import ThemeChooser from "./ThemeChooser";

const Index = () => {
  const {
    isOpen: isOpenThemesDialog,
    onOpen: onOpenThemeDialog,
    onClose: onCloseThemeDialog,
  } = useDisclosure();
  const commands = useCommands({
    settingsProps: {
      openThemeDialog: onOpenThemeDialog,
    },
  });

  const [filterdCommands, setFilterdCommands] = useState<string[]>(
    Object.keys(commands),
  );

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
  const { showCmdPalette, setShowCmdPalette } = useWorkspaceStore();
  const [searchCommand, setSearchCommand] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [typing, setTyping] = useState<boolean>(false);

  const handleCommand = (command: string) => {
    handleClose();
    commands[command]();
  };

  const handleClose = () => {
    resetDialog();
    setShowCmdPalette(false);
  };

  const getAllCommands = useCallback(() => {
    const res: string[] = [];
    Object.keys(commands).forEach((key) => {
      res.push(key);
    });
    return res;
  }, [commands]);

  const handleSetSearch = (input: string) => {
    setSearchCommand(input);
    const commands = getAllCommands();
    const filtered = commands.filter((command) => {
      return command.toLowerCase().includes(input.toLowerCase());
    });
    setFilterdCommands(filtered);
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
        handleCommand(filterdCommands[index]);
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
    setSearchCommand("");
    setCurrentIndex(null);
    setFilterdCommands(getAllCommands());
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
          const nextCurrent = (currentIndex + 1) % getAllCommands().length;
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
    [currentIndex, getAllCommands],
  );

  const focusNextButton = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % getAllCommands().length;
    buttonRefs.current[nextIndex]?.focus();
  };

  const focusPreviousButton = (currentIndex: number) => {
    const previousIndex =
      (currentIndex - 1 + getAllCommands().length) % getAllCommands().length;
    buttonRefs.current[previousIndex]?.focus();
  };

  return (
    <>
      <ThemeChooser
        isOpen={isOpenThemesDialog}
        handleCloseThemeChooser={onCloseThemeDialog}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={handleClose}
        isOpen={showCmdPalette}
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
                value={searchCommand}
                onChange={(e) => {
                  handleSetSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const command = filterdCommands[0];
                    handleCommand(command);
                    resetDialog();
                  }
                }}
                placeholder="enter command"
              />
            </InputGroup>
            <Stack maxH={200} overflowY="scroll" mt={2}>
              {filterdCommands.map((command: string, index: number) => (
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
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    bg: secondaryBackgroundColorDarker,
                  }}
                  onClick={() => {
                    handleCommand(command);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  tabIndex={0} // Make the button focusable
                >
                  <Text
                    maxW="full"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {command}
                  </Text>
                  <Flex alignItems="center" gap={1} color={mutedTextColor}>
                    <ArrowForwardIcon />
                  </Flex>
                </Button>
              ))}
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Index;
