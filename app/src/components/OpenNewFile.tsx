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
} from "@chakra-ui/react";
import { useWorkspace } from "contexts/WorkspaceContext";
import useColors from "hooks/useColors";
import { useCallback, useEffect, useRef, useState } from "react";
import { WorkspaceType } from "types/index";
import { utils } from "utils/index";

const OpenFileInTab = () => {
  const [filterdFiles, setFilterdFiles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const cancelRef = useRef();
  const {
    getBackgroundColor,
    getSecondaryBackgroundColor,
    getTextColor,
    getMutedTextColor,
    getAccentColor,
  } = useColors();
  const { showOpenNewFile, setShowOpenNewFile, workspace, openFile } =
    useWorkspace();
  const [searchFile, setSearchFile] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [typing, setTyping] = useState<boolean>(false);

  const bg_color = getBackgroundColor();
  const secondary_background_color = getSecondaryBackgroundColor();
  const secondary_bg_color = utils.getLighterColor(
    "0.02",
    secondary_background_color,
  );
  const text_color = getTextColor();
  const muted_text_color = getMutedTextColor();
  const accent_color = utils.getTransparent(0.2, getAccentColor());
  const text_color_on_accent = utils.getDarkerColor("0.1", getAccentColor());

  const handleOpenTab = (file: string) => {
    openFile(file);
    handleClose();
  };

  const handleClose = () => {
    resetDialog();
    setShowOpenNewFile(false);
  };

  const getAllFiles = useCallback(() => {
    const iterFiles = (folder: WorkspaceType[], res: string[]) => {
      if (!folder) return;
      folder.forEach((file) => {
        if (file.type === "folder") {
          if (!file.items) return;
          iterFiles(file.items, res);
        } else {
          res.push(file.path);
        }
      });
    };
    const res: any[] = [];
    if (!workspace?.items) return res;
    iterFiles(workspace?.items, res);
    return res;
  }, [workspace?.items]);

  const getFilename = (path: string) => {
    const splitted_path = path.split("\\");
    const filename = splitted_path[splitted_path.length - 1];
    const extensionSplit = filename.split(".");
    const extension = extensionSplit[extensionSplit.length - 1];
    const splitted = filename.split("." + extension)[0];
    return splitted;
  };

  const handleSetSearch = (input: string) => {
    setSearchFile(input);
    const files = getAllFiles();
    const filtered = files.filter((file) => {
      const filename = getFilename(file);
      return filename.toLowerCase().includes(input.toLowerCase());
    });
    setFilterdFiles(filtered);
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
        handleOpenTab(filterdFiles[index]);
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
    setFilterdFiles(getAllFiles());
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
          const nextCurrent = (currentIndex + 1) % getAllFiles().length;
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
    [currentIndex, getAllFiles],
  );

  const focusNextButton = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % getAllFiles().length;
    buttonRefs.current[nextIndex]?.focus();
  };

  const focusPreviousButton = (currentIndex: number) => {
    const previousIndex =
      (currentIndex - 1 + getAllFiles().length) % getAllFiles().length;
    buttonRefs.current[previousIndex]?.focus();
  };

  useEffect(() => {
    const files = getAllFiles();
    setFilterdFiles(files);
  }, [workspace?.items, getAllFiles]);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef as any}
      onClose={handleClose}
      isOpen={showOpenNewFile}
    >
      <AlertDialogOverlay onKeyDown={handleKeyDialog} />
      <AlertDialogContent
        onKeyDown={handleKeyDialog}
        shadow="lg"
        bg={bg_color}
        color={utils.getTextColor(bg_color)}
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
              borderColor={utils.getLighterColor("0.2", bg_color)}
              autoFocus={true}
              ref={inputRef}
              tabIndex={-1} // Exclude from the natural tab order
              value={searchFile}
              onChange={(e) => {
                handleSetSearch(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const file = filterdFiles[0];
                  handleOpenTab(file);
                  resetDialog();
                }
              }}
              placeholder="Search or enter file"
            />
          </InputGroup>
          <Stack maxH={200} overflowY="scroll" mt={2}>
            {filterdFiles.map((file: string, index: number) => (
              <Button
                border="none"
                bg={typing && index === 0 ? accent_color : "transparent"}
                color={
                  typing && index === 0 ? text_color_on_accent : text_color
                }
                key={index}
                ref={(el) => (buttonRefs.current[index] = el)}
                autoFocus={index === 0 ? true : false}
                _focusVisible={{
                  bg: accent_color,
                  color: text_color_on_accent,
                }}
                cursor="pointer"
                display="flex"
                justifyContent="space-between"
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  bg: utils.getDarkerColor("0.03", secondary_bg_color),
                }}
                onClick={() => {
                  handleOpenTab(file);
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
                  {getFilename(file)}
                </Text>
                <Flex alignItems="center" gap={1} color={muted_text_color}>
                  <Text>Open</Text>
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

export default OpenFileInTab;
